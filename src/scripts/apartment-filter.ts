export default class ApartmentFilter {
  private apartments: Apartment[] = [];
  private criteria: FilterCriteria = [];

  constructor(apartments: Apartment[], criteria: FilterCriteria) {
    this.apartments = apartments;
    this.criteria = criteria;
  }

  public applyFilters() {
    const filtered = this.apartments.filter((apartment: Apartment) => this.matchesCriteria(apartment));
    console.log(filtered);
  }

  private matchesCriteria(apartment: Apartment) {
    return Object.entries(this.criteria).every(([key, value]) => {
      const [filterType, property] = key.split("_") as [string, string];
      const apartmentValue = apartment[property];
      const criteriaValue = value;

      const filter = this.filters[filterType as keyof typeof this.filters];
      if (!filter) {
        console.error(`Filter type "${filterType}" is not supported.`);
        return true; // Skip filtering if the filter type is not supported
      }
      return filter(apartmentValue, criteriaValue);
    });
  }

  private filters = {
    contains: (apartmentValue: (string | number)[], criteriaValue: (string | number)[]) =>
      Array.isArray(apartmentValue) && criteriaValue.every(item => apartmentValue.includes(item)),
    equals: (apartmentValue: string | number | boolean, criteriaValue: string | number | boolean) =>
      apartmentValue === criteriaValue,
  };
}
