import { Barbers } from "../Types/Barbers";
import $api from "./httpCommon";

const getBarbers = async (lang="ua") => {
    const response = await $api.get(`/barbers?lang=${lang}`);
    return response.data;
}
type NewBarber = Omit<Barbers, "_id" | "translation"> & {
  translation: {
    language: string;
    name: string;
    surname: string;
  }[];
};

const createBarber = async (barber: NewBarber) => {
  console.log("Payload being sent to backend:", barber);
  
  const response = await $api.post("/barbers", barber);
  return response.data;
};

const deleteBarber = async(id: string) => {
    const response = await $api.delete(`/barbers/${id}`);
    return response.data;
}

const updateBarber = async(id: string, barber: Barbers) => {
    const response = await $api.put(`/barbers/${id}`, barber);
    return response.data;
}

export { getBarbers, createBarber, deleteBarber,updateBarber };