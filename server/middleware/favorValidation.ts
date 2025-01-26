import { Request, Response, NextFunction } from "express";

export const favorValidation = (req: Request, res: Response, next: NextFunction) => {
    const { name, time, price } = req.body;
    if (!name?.ua || !name?.en ||
      !time?.ua || !time?.en ||
      !price) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      next();
}