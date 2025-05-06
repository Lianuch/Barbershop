import { Barbers } from "../Types/Barbers";

export interface AdminState {
    barbers: Barbers[];
    isAdmin: boolean;
    loading: boolean;
    error: string | null;
}