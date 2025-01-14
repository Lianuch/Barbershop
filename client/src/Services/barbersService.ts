import { Barbers } from "../Types/Barbers";
import http from "./httpCommon";

const getBarbers = async () => {
    const response = await http.get("http://localhost:5000/barbers");
    console.log(response.data);
    
    return response.data;
}

const createBarber = async(barber: Barbers) => {
    const response = await http.post("http://localhost:5000/barbers", barber);
    return response.data;
}
const deleteBarber = async(id: string) => {
    const response = await http.delete(`http://localhost:5000/barbers/${id}`);
    return response.data;
}

const updateBarber = async(id: string, barber: Barbers) => {
    const response = await http.put(`http://localhost:5000/barbers/${id}`, barber);
    return response.data;
}

export { getBarbers, createBarber, deleteBarber,updateBarber };