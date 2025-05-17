import { NextFunction, Request, Response } from "express";
import { BarberTranslation } from "../models/barberTranslations";
import { cloudinary } from "../config/cloudinaryConfig";
import Barber from "../models/barbers";
import Visit from "../models/visit";
import BarberCategory from "../models/barberCategory";

const getBarbers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const barbers = await Barber.find()
      .populate("barberCategory", "categoryName")
      .populate("translation", "language name surname barber")
      .populate("visits", "date comment client")
      .select("image barberCategory coef translation visits")
      .select("-__v");

    if (!barbers || barbers.length === 0) {
      return res.status(404).json({ error: "Barbers not found" });
    }

    res.status(200).json(barbers);
  } catch (e) {
    next(e);
  }
};

const addBarber = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { image, barberCategory, translation, visits, coef } = req.body;

    // Check if required fields are provided
    if (!image || !barberCategory || !translation || !Array.isArray(translation)) {
      return res.status(400).json({ error: "Missing required fields: image, barberCategory, or translation" });
    }

    const category = await BarberCategory.findById(barberCategory);
    if (!category) {
      return res.status(404).json({ error: "Barber category not found" });
    }

    const barber = new Barber({
      image,
      barberCategory,
      visits: visits || [], 
      coef: coef ?? 1.0,     
    });

    const translationDocs = await BarberTranslation.insertMany(
      translation.map((t: any) => ({
        language: t.language,
        name: t.name,
        surname: t.surname,
        barber: barber._id
      }))
    );

    barber.translation = translationDocs.map((t: any) => t._id);
    await barber.save();
    if(!category.barbers.includes(barber._id)){
      
      category.barbers.push(barber._id);
    }
    await category.save();

    res.status(201).json(barber);
  } catch (e) {
    console.error("Error adding barber:", e);
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
    await BarberTranslation.deleteMany({ barber: id });
    await Visit.deleteMany({ barber: id });
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
  const { image, barberCategory, translation, visits, coef } = req.body;
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
      {
        image: updatedImage,
        barberCategory,
        translation,
        visits,
        coef: coef ?? 1.0,
      },
      { new: true }
    );

    if (translation) {
      for (const trans of translation) {
        await BarberTranslation.findOneAndUpdate(
          { barber: id, language: trans.language },
          { name: trans.name, surname: trans.surname },
          { upsert: true }
        );
      }
    }

    res.status(200).json(updatedBarber);
  } catch (e) {
    next(e);
  }
};

export { getBarbers, addBarber, deleteBarber, updateBarber };
