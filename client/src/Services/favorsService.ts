import { Favors } from "../Types/Favors";
import $api from "./httpCommon";

const getFavors = async (lang="ua") => {
    const response = await $api.get(`/favors?lang=${lang}`);
    // console.log(response.data);
    
    return response.data;
}

const createFavor = async(favor: Favors) => {
    const response = await $api.post("/favors", favor);
    return response.data;
}
const deleteFavor = async(id: string) => {
    const response = await $api.delete(`/favors/${id}`);
    return response.data;
}

const updateFavor = async(id: string, favor: Favors) => {
    const response = await $api.put(`/favors/${id}`, favor);
    return response.data;
}

export { getFavors, createFavor };