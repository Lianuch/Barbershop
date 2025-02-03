import { Request, Response, NextFunction } from "express";
import { Client } from "../models/client";

export const clientValidation =  async(req: Request, res: Response, next: NextFunction) => {
    const {email, password, emailConfirmed} = req.body
    if(!email || !password || !emailConfirmed){
        return res.status(400).json({error: "Missing required fields"});
    }
    const existingClient = await Client.findOne({email});
    if(existingClient){
        return res.status(400).json({error: "Client already exists"});
    }

}