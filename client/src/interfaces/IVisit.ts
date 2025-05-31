import { Barbers } from "../Types/Barbers";
import { Favors } from "../Types/Favors";

export default interface IVisit {
    _id: string;
    date: Date;
    comment: string;
   
    barber: Barbers;
    client: {
        _id: string;
        name: string;
        email: string;
    };
    favor: Favors;
}