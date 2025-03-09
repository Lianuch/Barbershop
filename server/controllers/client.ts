import clientService from "../service/clientService";
import { validationResult } from "express-validator";
import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";

class ClientController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new AppError(400, "Validation error", errors.array()));
      }
      const { email, password } = req.body;
      const clientData = await clientService.registration(email, password);
      res.cookie("refreshToken", clientData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(clientData);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const clientData = await clientService.login(email, password);
      res.cookie('refreshToken', clientData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(clientData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await clientService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      
      const activationLink = req.params.link;
      await clientService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const clientData = await clientService.refresh(refreshToken);
      res.cookie("refreshToken", clientData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(clientData);
    }
    catch(e){
      next(e)
    }
  }

  async getClients(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await clientService.getAllClients();
      return res.json(clients);
    } catch (e) {
      next(e);
    }
  }

}

export default new ClientController();