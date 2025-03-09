import { NextFunction, Request, Response } from "express";
import { BarberTranslation } from "../models/barberTranslations";
import { cloudinary } from "../config/cloudinaryConfig";
import Barber from "../models/barbers";
import Visit from "../models/visit";

const getBarbers = async (req: Request, res: Response, next: NextFunction) => {
  const { language } = req.query;

  try {
    const barbers = await Barber.find()
      .populate("barberCategory", "categoryName")
      // .populate({
      //   path: "translation",
      //   match: { language: language ?? "en" },
      //   select: "language name surname barber",
      // })
      .populate(
        "translation",
      "language name surname barber",
      )
      .populate("visits", "date comment client")
      .select("-__v")


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
    const { image, barberCategory, translation, visits } = req.body;
    const barber = new Barber({ image, barberCategory, translation, visits });

    if (!barber) {
      return res.status(404).json({ error: "Missing fields" });
    }

    await barber.save();

    res.status(201).json(barber);
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
  const { image, barberCategory, translation, visits } = req.body;
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
      { image: updatedImage, barberCategory, translation, visits },
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
