import clientService from "../service/clientService";
import { validationResult } from "express-validator";
import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";

class AdminController {
  async registration(req: Request, res: Response, next: NextFunction) {
    // const user = req.client;
    // if (!user || user.role !== "admin") {
    //   return next(AppError.ForbiddenError());
    // }

     const {name, email, password} = req.body;

     const data = await clientService.registration(name, email, password, "admin");
     res.json(data);
  }
}

export default new AdminController();