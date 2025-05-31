import { Favors } from "./Favors";

export type NewFavor = Omit<Favors, "_id" | "translations"> & {
  translations: {
    language: string;
    name: string;
  }[];
};