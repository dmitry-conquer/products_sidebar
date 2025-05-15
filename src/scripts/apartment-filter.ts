import { isPrimitive, isArrayOfStringOrNumber } from "./type-guards";

export default class ApartmentFilter {
  private apartments: Apartment[] = [];

  constructor(apartments: Apartment[]) {
    this.apartments = apartments;
  }

  // Apply filters to the apartments based on the criteria
  public applyFilters(criteria: FilterCriteria) {
    const filtered = this.apartments.filter((apartment: Apartment) => this.matchesCriteria(apartment, criteria));
    console.log(filtered);
  }

  // Check if the apartment matches all criteria
  private matchesCriteria(apartment: Apartment, criteria: FilterCriteria) {
    return Object.entries(criteria).every(([key, value]) => {
      const [filterType, property] = key.split("_") as [string, string];
      const apartmentValue = apartment[property];
      const criteriaValue = value;

      if (filterType === "equals" && isPrimitive(apartmentValue) && isPrimitive(criteriaValue)) {
        return this.filters.equals(apartmentValue, criteriaValue);
      }
      if (
        filterType === "contains" &&
        isArrayOfStringOrNumber(apartmentValue) &&
        isArrayOfStringOrNumber(criteriaValue)
      ) {
        return this.filters.contains(apartmentValue, criteriaValue);
      }
      console.log(`Filter type "${filterType}" is not recognized or types do not match.`);
      return false; // If the filter type is not recognized or types do not match, return false
    });
  }

  // Define the filter functions
  private filters = {
    contains: (apartmentValue: (string | number)[], criteriaValue: (string | number)[]) =>
      Array.isArray(apartmentValue) &&
      Array.isArray(criteriaValue) &&
      criteriaValue.every(item => apartmentValue.includes(item)),
    equals: (apartmentValue: string | number | boolean, criteriaValue: string | number | boolean) =>
      apartmentValue === criteriaValue,
  };
}
