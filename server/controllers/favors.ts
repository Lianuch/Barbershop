import { Favor } from "../models/favors";
import { NextFunction, Request, Response } from "express";
import { FavorTranslations } from "../models/favorTranslations";
import { barberCategoryFavor } from "../models/barberCategoryFavor";
import Visit from "../models/visit";
import AppError from "../utils/appError";

const getFavors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favors = await Favor.find()

      .populate("translations", "language name favor")
      .populate("BarberCategoryFavor")
      .populate("visits", "date comment")
      .select("-__v");

    if (!favors.length || favors.length === 0) {
      return res.status(404).json({ error: "Favors not found" });
    }

    res.status(200).json(favors);
  } catch (e) {
    next(e);
  }
};

const addFavor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { time, price, BarberCategoryFavor, visits, translations } = req.body;

    if (!time || !price || !translations || !Array.isArray(translations)) {
      return next(AppError.BadRequest("Missing required fields: time, price, or translations"));
    }

    const favor = new Favor({
      time,
      price,
      BarberCategoryFavor: BarberCategoryFavor || [],
      visits: visits || [],
    });

    await favor.save();

    const translationDocs = await FavorTranslations.insertMany(
      translations.map((t: any) => ({
        language: t.language,
        name: t.name,
        favor: favor._id,
      }))
    );

    favor.translations = translationDocs.map((t: any) => t._id);
    await favor.save();

    res.status(200).json(favor);
  } catch (e) {
    next(e);
  }
};

const deleteFavor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const favor = await Favor.findByIdAndDelete(id);
    if (!favor) {
      return res.status(404).json({ error: "Favor not found" });
    }

    await barberCategoryFavor.deleteMany({ favor: id });
    await FavorTranslations.deleteMany({ favor: id });
    await Visit.deleteMany({ favor: id });

    res.status(200).json(favor);
  } catch (e) {
    next(e);
  }
};
const updateFavor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { time, price, BarberCategoryFavor, visits, translations } = req.body;

    const favor = await Favor.findById(id);
    if (!favor) {
      return res.status(404).json({ error: "Favor not found" });
    }

    const updatedFavor = await Favor.findByIdAndUpdate(
      id,
      {
        time,
        price,
        BarberCategoryFavor,
        visits,
        translation: translations,
      },
      { new: true }
    );

    if (translations) {
      for (const trans of translations) {
        await FavorTranslations.findOneAndUpdate(
          { favor: id, language: trans.language },
          { name: trans.name },
          { upsert: true }
        );
      }
    }

    res.status(200).json(updatedFavor);
  } catch (e) {
    next(e);
  }
};

export { getFavors, addFavor, deleteFavor, updateFavor };
