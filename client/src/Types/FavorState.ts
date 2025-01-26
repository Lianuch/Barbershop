import { Favors } from "./Favors"

export type FavorsState={
    favors: Favors[],
    loading:boolean,
    error:null | string
}