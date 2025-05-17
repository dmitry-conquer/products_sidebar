export default class Criteria {
  private readonly selectors: Record<string, string> = {
    container: "[data-filter-container]",
  };

  private filtersContainer: HTMLElement | null = null;
  public criteria: FilterCriteria = {};

  constructor() {
    this.filtersContainer = document.querySelector(this.selectors.container);
  }

  public get(): FilterCriteria {
    this.addEqualsCriteria();
    this.addContainsCriteria();
    console.log(this.criteria);
    return this.criteria;
  }

  private addContainsCriteria() {
    if (!this.filtersContainer) return;
    const checkboxes = Array.from(this.filtersContainer?.querySelectorAll(`input[type="checkbox"]:checked`));
    const checkboxGroups: { [name: string]: string[] } = {};
    checkboxes.forEach(checkbox => {
      const name = (checkbox as HTMLInputElement).name;
      if (!checkboxGroups[name]) {
        checkboxGroups[name] = [];
      }
      checkboxGroups[name]?.push((checkbox as HTMLInputElement).value);
      Object.entries(checkboxGroups).forEach(([key, value]) => {
        this.criteria[`contains_${key}`] = value;
      });
    });
  }

  private addEqualsCriteria() {
    if (!this.filtersContainer) return;
    const inputs = Array.from(
      this.filtersContainer.querySelectorAll(`input[type="radio"]:checked, input[type="text"], input[type="number"]`)
    );
    inputs.forEach(input => {
      const name = (input as HTMLInputElement).name;
      const value = (input as HTMLInputElement).value;
      if (name && value) {
        this.criteria[`equals_${name}`] = value;
      }
    });
  }
}
