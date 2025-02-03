import { NextFunction, Request, Response } from "express";
import { BarberTranslation } from "../models/barberTranslations";
import Barber from "../models/barbers";
import { updateBarber } from "./barbers";
const getBarberTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const translations = await BarberTranslation.find().populate("barber");
    if (!translations) {
      return res.status(404).json({ error: "Translations not found" });
    }
    res.status(200).json(translations);
  } catch (e) {
    next(e);
  }
};

const addBarberTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {  language ,name, surname, barber } = req.body;
    if (!language || !name || !surname || !barber) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const translation = new BarberTranslation({
      language,
      name,
      surname,
      barber,
    });
    
    await translation.save();
    await Barber.findByIdAndUpdate(
       barber ,
      {
        $push: { translation: translation._id },
      }
    );

    if(!updateBarber){
      return res.status(404).json({ error: "Barber not found" });
    }

    res.status(200).json(translation);
  } catch (e) {
    next(e);
  }
};

export { getBarberTranslations, addBarberTranslations };
