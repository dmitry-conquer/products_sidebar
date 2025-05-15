type Apartment = {
  id: number;
  name: string;
  [key: string]: (string | number | boolean) | (string | number)[];
};

type FilterCriteria = {
  [key: string]: (string | number | boolean) | (string | number)[];
};
