import { Barber } from "../models/barbersModel";
import { Request, Response } from "express";

const resStatus500 = (res: Response, error: Error) => {
  return res.status(500).json({ error: error.toString() });
};

const getBarbers = async (req: Request, res: Response) => {
  try {
    const barbers = await Barber.find();
    res.status(200).json(barbers);
  } catch (e) {
    resStatus500(res, e);
  }
};

const addBarber = async (req: Request, res: Response) => {
  try {
    const { name, surname } = req.body;

    const barber = new Barber({ name, surname });
    const result = await barber.save();

    res.status(200).json(result);
  } catch (e) {
    resStatus500(res, e);
  }
};

const deleteBarber = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const barber = await Barber.findByIdAndDelete(id);
    res.status(200).json(barber);
  } catch (e) {
    resStatus500(res, e);
  }
};

export { getBarbers, addBarber, deleteBarber };
