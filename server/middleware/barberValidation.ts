import { Request, Response, NextFunction } from "express";

export const barberValidation = (req: Request, res: Response, next: NextFunction) => {
    const { name, surname, barberCategory } = req.body;
    if (!name || !surname || !barberCategory) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      next();
}