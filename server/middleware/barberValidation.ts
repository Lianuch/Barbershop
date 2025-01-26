import { Request, Response, NextFunction } from "express";

export const barberValidation = (req: Request, res: Response, next: NextFunction) => {
    const { name, surname, barberCategory,image } = req.body;
    if (!name?.ua || !name?.en ||
      !surname?.ua || !surname?.en ||
      !barberCategory?.ua || !barberCategory?.en || !image) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      next();
}