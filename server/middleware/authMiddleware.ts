import tokenService from "../service/tokenService";
import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(AppError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if(!accessToken){
            return next(AppError.UnauthorizedError());
        }

        const clientData = tokenService.validateAccessToken(accessToken);
        if(!clientData){
            return next(AppError.UnauthorizedError());
        }
        req.client=clientData;
        next();

    }
    catch(e){
        return next(AppError.UnauthorizedError())

    }
}
