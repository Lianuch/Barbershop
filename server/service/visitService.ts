import Barber from "../models/barbers";
import { Client } from "../models/client";
import { Favor } from "../models/favors";
import Visit from "../models/visit";
import AppError from "../utils/appError";
import mailService from "./mailService";

class VisitService {
  async addVisits(
    date: Date,
    time: string,
    barberId: string,
    favorId: string,
    comment: string | null,
    clientId: string
  ) {
    if (!date || !time || !barberId || !favorId || !clientId) {
      throw AppError.BadRequest("All fields are required");
      }
  
      const clientData = await Client.findById(clientId);
      const visit = await Visit.create({
        date: new Date(date),
        time:time,
        barber: barberId,
        favor: favorId,
        client: clientId,
        comment: comment || null,
      });
  
      await visit.save();
  
      await Promise.all([
        Barber.findByIdAndUpdate(barberId, { $push: { visits: visit._id } }),
        Favor.findByIdAndUpdate(favorId, { $push: { visits: visit._id } }),
        Client.findByIdAndUpdate(clientId, { $push: { visits: visit._id } }),
      ]);
      if (clientData.email) {
        await mailService.sendRecordInformation(clientData.email, date);
      }
  
      return visit;
    
  }
  async getVisits(clientId: string) {

    const visits = await Visit.find({client: clientId})
   
      .populate({
        path: "barber",
        populate: [
          { path: "translation" },
          { path: "barberCategory" },
        ],
      })
      .populate("client", "email")
      // .populate("client") // To populate all fields of the client

      .populate({
        path: "favor",
        populate: { path: "translations" },
      })
      .select("-__v");

    //   if (!visits.length) {
    //   return AppError.BadRequest("Visits not found");
    // }
    return visits;
  }
}

export default new VisitService();  