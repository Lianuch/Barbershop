import { Favors } from "../Types/Favors";
import $api from "./httpCommon";

const getFavors = async (lang="ua") => {
    const response = await $api.get(`http://localhost:5000/favors?lang=${lang}`);
    return response.data;
}

const createFavor = async(favor: Favors) => {
    const response = await $api.post("http://localhost:5000/favors", favor);
    return response.data;
}
const deleteFavor = async(id: string) => {
    const response = await $api.delete(`http://localhost:5000/favors/${id}`);
    return response.data;
}

const updateFavor = async(id: string, favor: Favors) => {
    const response = await $api.put(`http://localhost:5000/favors/${id}`, favor);
    return response.data;
}

export { getFavors, createFavor };