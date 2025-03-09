import { Barbers } from "../Types/Barbers";
import $api from "./httpCommon";

const getBarbers = async (lang="ua") => {
    const response = await $api.get(`http://localhost:5000/barbers?lang=${lang}`);
    
    return response.data;
}

const createBarber = async(barber: Barbers) => {
    const response = await $api.post("http://localhost:5000/barbers", barber);
    return response.data;
}
const deleteBarber = async(id: string) => {
    const response = await $api.delete(`http://localhost:5000/barbers/${id}`);
    return response.data;
}

const updateBarber = async(id: string, barber: Barbers) => {
    const response = await $api.put(`http://localhost:5000/barbers/${id}`, barber);
    return response.data;
}

export { getBarbers, createBarber, deleteBarber,updateBarber };