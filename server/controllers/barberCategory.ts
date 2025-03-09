import { NextFunction, Request, Response } from "express";
import BarberCategory  from "../models/barberCategory";
const getBarberCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const barberCategories = await BarberCategory.find()
    .populate("barbers")
    .populate("categoryFavor");

    if (!barberCategories.length) {
      return res.status(404).json({ error: "BarberCategories not found" });
    }
 
    res.status(200).json(barberCategories);
  } catch (e) {
    next(e);
  }
};

const addBarberCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryName, barbers, categoryFavor } = req.body;
  
    const barber = new BarberCategory({ categoryName, barbers, categoryFavor });
    await barber.save();

    res.status(200).json(barber);
  } catch (e) {
    next(e);
  }
};



const updateBarberCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { categoryName, barbers, categoryFavor } = req.body;
  try {
    const barberCategory = await BarberCategory.findByIdAndUpdate(
        id,
        { categoryName, barbers, categoryFavor },
        { new: true }
    ).populate("barbers").populate("categoryFavor");
    if (!barberCategory ) {
      return res.status(404).json({ error: "BarberCategory not found" });
    }

    res.status(200).json(barberCategory);
  } catch (e) {
    next(e);
  }
};

export { getBarberCategories, addBarberCategory, updateBarberCategory };
