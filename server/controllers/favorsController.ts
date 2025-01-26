import { Favor } from "../models/favorsModel";
import { NextFunction, Request, Response } from "express";

const getFavors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const favors = await Favor.find();
    if (!favors.length) {
      return res.status(404).json({ error: "Favors not found" });
    }
    res.status(200).json(favors)
  } catch (e) {
    next(e);
  }
};

const addFavor = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, time, price} = req.body
        const favor = new Favor({name, time, price});
        await favor.save();
        res.status(200).json(favor)
    }
    catch(e){
        next(e);
    }
}

export {getFavors, addFavor}