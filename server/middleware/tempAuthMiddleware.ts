import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";
import tokenService from '../service/tokenService';
import { Client } from '../models/client';

interface AuthRequest extends Request {
  headers:{
    authorization?: string;

  },
  client?: {
    id: string;
    name: string;
    email: string;
    isActivated: boolean;
  };
}
const tempAuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(AppError.UnauthorizedError());
  }

  try {
   
  
    const clientData = tokenService.validateAccessToken(token);

    if (!clientData) {
      return next(AppError.UnauthorizedError());
    }

    const client = await Client.findById(clientData.id);

    if (!client) {
      return next(AppError.BadRequest("User not found"));
    }

    req.client = {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      isActivated: client.isActivated,
    };

    next();
  } catch (err) {
    return next(AppError.UnauthorizedError());
  }
};

export default tempAuthMiddleware;