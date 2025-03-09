import { NextFunction, Request, Response } from "express";
import Visit from "../models/visit";
import { Client } from "../models/client";
import Barber from "../models/barbers";
import { Favor } from "../models/favors";

const getVisits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const visits = await Visit.find()
      .populate("barber", "image barberCategory translation")
      .populate("client", "email")
      .populate("favor", "time price")
      .select("-__v")

    if (!visits.length) {
      return res.status(404).json({ error: "Visits  not found" });
    }

    res.status(200).json(visits);
  } catch (e) {
    next(e);
  }
};
const addVisits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, comment, barber, client, favor } = req.body;
    if (!date || !comment || !barber || !client || !favor) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const visit = new Visit({ date, comment, barber, client, favor });

    await visit.save();

    await Barber.findByIdAndUpdate(barber, { $push: { visits: visit._id } });
    await Client.findByIdAndUpdate(client, { $push: { visits: visit._id } });
    await Favor.findByIdAndUpdate(favor, { $push: { visits: visit._id } });

    res.status(200).json(visit);
  } catch (e) {
    next(e);
  }
};

export { getVisits, addVisits };
