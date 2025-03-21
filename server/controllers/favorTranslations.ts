import { NextFunction, Request, Response } from "express";

import { Favor } from "../models/favors";
import { FavorTranslations } from "../models/favorTranslations";

const getFavorTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const translations = await FavorTranslations.find()
      .populate("favor", "time price")
      .select("-__v");

    if (!translations.length || translations.length === 0) {
      return res.status(404).json({ error: "FavorTranslations not found" });
    }

    res.status(200).json(translations);
  } catch (e) {
    next(e);
  }
};

const addFavorTranslations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, language, favor } = req.body;
    const favorExist = await Favor.findById(favor);
    if (!favorExist) {
      return res.status(404).json({ error: "Favor doesnt exist" });
    }

    const favorTranslation = new FavorTranslations({
      name,
      language,
      favor,
    });

    await favorTranslation.save();

    await Favor.findByIdAndUpdate(favor, {
      $push: { translation: favorTranslation._id },
    });
    res.status(200).json(favorTranslation);
  } catch (e) {
    next(e);
  }
};

export { getFavorTranslations, addFavorTranslations };
