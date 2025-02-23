import { Favor } from "../models/favors";
import { NextFunction, Request, Response } from "express";
import { FavorTranslations } from "../models/favorTranslations";
import { barberCategoryFavor } from "../models/barberCategoryFavor";
import Visit from "../models/visit";

const getFavors = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const favors = await Favor.find()
    .populate("visits", "date comment")
    .populate("favorTranslations", "language name")
    .populate("BarberCategoryFavor")
    .select("-__v")



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
      const { time, price, BarberCategoryFavor, visits, favorTranslations } = req.body;
      
    
        const favor = new Favor({ time, price, BarberCategoryFavor, visits, favorTranslations });
        if(!favor){
          return res.status(404).json({error: "Missing fields"})
        }
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

      await barberCategoryFavor.deleteMany({favor: id})
      await FavorTranslations.deleteMany({favor: id})
      await Visit.deleteMany({favor: id})

      res.status(200).json(favor)
   }
   catch(e){
    next(e)
   }
}
const updateFavor = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {id} = req.params
    const { time, price, BarberCategoryFavor, visits, favorTranslations } = req.body;

    const favor = await Favor.findById(id)
    if(!favor){
      return res.status(404).json({error: "Favor not found"})
    }

    const updatedFavor = await Favor.findByIdAndUpdate(
      id,
      {time, price, BarberCategoryFavor, visits, favorTranslations},
      {new: true}
    )

   
      if(favorTranslations){
        for(const trans of favorTranslations){
          await FavorTranslations.findOneAndUpdate(
            { favor: id, language: trans.language }, 
            { name: trans.name }, 
            { upsert: true } 
          );
        }
      }


    res.status(200).json(updatedFavor)
    
 }
 catch(e){
  next(e)
 }
}

export {getFavors, addFavor,deleteFavor, updateFavor}