import Barber from "../models/barbers";
import { Client } from "../models/client";
import { Favor } from "../models/favors";
import Visit from "../models/visit";
import AppError from "../utils/appError";
import mailService from "./mailService";

class VisitService {
  async addVisits(
    date: Date,
    comment: string,
    barber: string,
    favor: string,
    clientId: string
  ) {
    if (!date || !barber || !favor || !clientId) {
      throw AppError.BadRequest("All fields are required");
      }
  
      const [barberExists, favorExists, clientData] = await Promise.all([
        Barber.findById(barber),
        Favor.findById(favor),
        Client.findById(clientId),
      ]);
      if(!barberExists || !favorExists || !clientData) {
        throw AppError.BadRequest("Data not found");
      }
      const visit = new Visit({
        date,
        comment,
        client: clientId,
        barber,
        favor,
      });
  
      await visit.save();
  
      await Promise.all([
        Barber.findByIdAndUpdate(barber, { $push: { visits: visit._id } }),
        Favor.findByIdAndUpdate(favor, { $push: { visits: visit._id } }),
      ]);
      if (clientData.email) {
        await mailService.sendRecordInformation(clientData.email, date);
      }
  
      return visit;
    
  }
  
  async getVisits() {
    const visits = await Visit.find()
      .populate("barber", "image barberCategory translation")
      .populate("client", "email")
      .populate("favor", "time price")
      .select("-__v");

    if (!visits.length) {
      return AppError.BadRequest("Visits not found");
    }
    return visits;
  }
}

export default new VisitService();  