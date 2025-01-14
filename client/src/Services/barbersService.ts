import { Barbers } from "../Types/Barbers";
import http from "./httpCommon";

const getBarbers = async () => {
    const response = await http.get("api/barbers");
    return response.data;
}

const createBarber = async(barber: Barbers) => {
    const response = await http.post("api/barbers", barber);
    return response.data;
}
const deleteBarber = async(id: string) => {
    const response = await http.delete(`api/barbers/${id}`);
    return response.data;
}

export { getBarbers, createBarber, deleteBarber };