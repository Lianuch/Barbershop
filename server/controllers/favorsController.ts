import { Favor } from "../models/favorsModel";
import { NextFunction, Request, Response } from "express";

const getFavors = async (req: Request, res: Response, next: NextFunction) => {
  const lang = req.query.lang || "ua";

  try {
    const favors = await Favor.find();
    if (!favors.length) {
      return res.status(404).json({ error: "Favors not found" });
    }
    const localizedFavors = favors.map((favor) => ({
      _id: favor._id,
      name: favor.name[lang],
      time: favor.time[lang],
      price: favor.price
    }))
    res.status(200).json(localizedFavors)
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

const deleteFavor = async (req: Request, res: Response, next: NextFunction) => {
   try{
      const {id} = req.params

      const favor = await Favor.findByIdAndDelete(id)
      if(!favor){
        return res.status(404).json({error: "Favor not found"})
      }
      res.status(200).json(favor)
   }
   catch(e){
    next(e)
   }
}
const updateFavor = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {id} = req.params
    const {name, time, price} = req.body

    const favor = await Favor.findByIdAndUpdate(
      id,
      {name, time, price},
      {new: true}
    )

    res.status(200).json(favor)
    
 }
 catch(e){
  next(e)
 }
}

export {getFavors, addFavor,deleteFavor, updateFavor}