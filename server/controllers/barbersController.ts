import { Barber } from "../models/barbersModel";
import { Request, Response } from "express";
const getBarbers = async (req: Request, res:Response) => {
  const barbers = await Barber.find();
  res.json(barbers);
};

const addBarber = async (req: Request, res:Response) => {
    const {name, surname} = req.body;
    const newBarber = await Barber.create({name,surname})
    res.json(newBarber);

};

const deleteBarber = async (req: Request, res:Response) => {
    const {id} = req.params;
    const deletedBarber = await Barber.findByIdAndDelete(id);
    res.json(deletedBarber); 
}

export { getBarbers, addBarber, deleteBarber };