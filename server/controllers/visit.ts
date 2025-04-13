import { NextFunction, Request, Response } from "express";
import Visit from "../models/visit";
import { Client } from "../models/client";
import Barber from "../models/barbers";
import { Favor } from "../models/favors";
import AppError from "../utils/appError";
import mailService from "../service/mailService";
import VisitService from "../service/visitService";
const getVisits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const visits = await VisitService.getVisits();

    res.status(200).json(visits);
  } catch (e) {
    next(e);
  }
};
const addVisits = async (req: Request, res: Response, next: NextFunction) => {
  const { date, time, barberId, favorId, comment, clientId } = req.body;
  try {
    const visit = await VisitService.addVisits(
      date,
      time,
      barberId,
      favorId,
      comment,
      clientId
    );

    res.status(200).json(visit);
  } catch (e) {
    next(e);
  }
};

// console.log("date:",date,"time:", time,"barberid", barberId,"favorid", favorId,"comment:", comment,"clientid:", clientId);
// const addVisits = async (req: Request, res: Response, next: NextFunction) => {
//   const { date, time, barberId, favorId, comment, clientId } = req.body;

//   if (!date || !time || !barberId || !favorId || !clientId) {
//     return next(AppError.BadRequest("All fields are required"));
//   }
//   try {
//     const visit = await Visit.create({
//       date: new Date(date),
//       time: time,
//       barber: barberId,
//       favor: favorId,
//       client: clientId,
//       comment: comment || null,
//     });

//     res.status(200).json(visit);
//   } catch (e) {
//     next(e);
//   }
// };

export { getVisits, addVisits };
