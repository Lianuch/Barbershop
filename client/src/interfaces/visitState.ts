import IVisit from "./IVisit";

export interface visitState  {
    visits: IVisit[];
    loading: boolean;
    error: string | null;
}