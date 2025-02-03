import { Client } from "../models/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await Client.find()
    .populate("visits")
    .select("-password -emailConfirmed -__v");
    
    if (!clients.length) {
      return res.status(404).json({ error: "Clients not found" });
    }
   
    res.status(200).json(clients)
  } catch (e) {
    next(e);
  }
};

const addClient = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, password, emailConfirmed} = req.body

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const client = new Client({email, password: hashedPassword, emailConfirmed});
        await client.save();
        res.status(200).json(client)
    }
    catch(e){
        next(e);
    }
}


export {getClients, addClient}