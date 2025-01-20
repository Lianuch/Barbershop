import { Barbers } from "./Barbers";

export type BarbersState = {
    list: Barbers[],
    loading: boolean;
    error: null | string; 
}