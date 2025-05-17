import { isPrimitive, isArrayOfStringOrNumber } from "./type-guards";

export default class Filter {
  private readonly selectors: Record<string, string> = {
    container: "[data-results-container]",
  };

  private items: Item[] = [];
  private resultsContainer: HTMLElement | null = null;

  constructor(items: Item[]) {
    this.items = items;
    this.resultsContainer = document.querySelector(this.selectors.container);
  }

  // Apply filters to the apartments based on the criteria
  public applyFilters(criteria: FilterCriteria) {
    const filtered = this.items.filter((item: Item) => this.matchesCriteria(item, criteria));
    this.renderResults(filtered);
    console.log(filtered);
  }

  // Check if the apartment matches all criteria
  private matchesCriteria(item: Item, criteria: FilterCriteria) {
    return Object.entries(criteria).every(([key, value]) => {
      const [filterType, property] = key.split("_") as [string, string];
      const itemValue = item[property];
      const criteriaValue = value;

      if (filterType === "equals" && isPrimitive(itemValue) && isPrimitive(criteriaValue)) {
        return this.filters.equals(itemValue.toString(), criteriaValue.toString());
      }
      if (filterType === "contains" && isArrayOfStringOrNumber(itemValue) && isArrayOfStringOrNumber(criteriaValue)) {
        return this.filters.contains(itemValue, criteriaValue);
      }
      console.log(`Filter type "${filterType}" is not recognized or types do not match.`);
      return false; // If the filter type is not recognized or types do not match, return false
    });
  }

  // Define the filter functions
  private filters = {
    contains: (itemValue: (string | number)[], criteriaValue: (string | number)[]) =>
      Array.isArray(itemValue) &&
      Array.isArray(criteriaValue) &&
      criteriaValue.every(item => itemValue.toString().includes(item.toString())),
    equals: (apartmentValue: string | number | boolean, criteriaValue: string | number | boolean) =>
      apartmentValue === criteriaValue,
  };

  // Render the filtered results
  private renderResults(results: Item[]) {
    if (!this.resultsContainer) return;
    this.resultsContainer.innerHTML = "";

    const template = this.createTemplate(results);
    this.resultsContainer.innerHTML = template;
  }

  private createTemplate(results: Item[]): string {
    let template = "";

    if (results.length === 0) {
      template = "<p>No results found</p>";
    } else {
      template = results
        .map(item => {
          return `
        <div class="apartment">
          <h2>${item.name}</h2>
          <p>Price: ${item.price}</p>
          <p>Kitchens: ${item.kitchens}</p>
          <p>Bathrooms: ${item.bathrooms}</p>
          <p>Type: ${item.type}</p>
          <p>Area: ${item.area}</p>
          <p>Features: ${Array.isArray(item.features) ? item.features.join(", ") : item.features}</p>
        </div>
      `;
        })
        .join("");
    }

    return template;
  }
}
