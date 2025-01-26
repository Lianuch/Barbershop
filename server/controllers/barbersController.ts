import { Barber } from "../models/barbersModel";
import { NextFunction, Request, Response } from "express";
import { cloudinary } from "../config/cloudinaryConfig";
const getBarbers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const barbers = await Barber.find();
    if (!barbers.length) {
      return res.status(404).json({ error: "Barbers not found" });
    }
    res.status(200).json(barbers);
  } catch (e) {
    next(e);
  }
};

const addBarber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, surname, barberCategory, image } = req.body;
  
    const barber = new Barber({ name, surname, barberCategory, image });
    await barber.save();

    res.status(200).json(barber);
  } catch (e) {
    next(e);
  }
};

const deleteBarber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const barber = await Barber.findByIdAndDelete(id);
    if (!barber) {
      return res.status(404).json({ error: "Barber not found" });
    }
    res.status(200).json(barber);
  } catch (e) {
    next(e);
  }
};

const updateBarber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, surname, barberCategory, image } = req.body;
  try {
    const barber = await Barber.findById(id);
    if (!barber) {
      return res.status(404).json({ error: "Barber not found" });
    }
    let updatedImage = barber.image;

    if (image) {
      updatedImage = image;
    } else if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "barbers",
      });
      updatedImage = result.secure_url;
    }
    

    const updatedBarber = await Barber.findByIdAndUpdate(
      id,
      { name, surname, barberCategory, image: updatedImage },
      { new: true }
    );

    res.status(200).json(updatedBarber);
  } catch (e) {
    next(e);
  }
};

export { getBarbers, addBarber, deleteBarber, updateBarber };
