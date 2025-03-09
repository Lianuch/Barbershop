export type Barbers = {
  _id: string;
  image: string;
  barberCategory: {
    _id: string;
    categoryName: string;
  };
  translation: {
    _id: string;
    language: string;
    name: string;
    surname: string;
  }[];
};
