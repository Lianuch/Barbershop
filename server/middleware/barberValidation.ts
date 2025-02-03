import { Request, Response, NextFunction } from "express";

export const barberValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { image, barberCategory, translation, visits } = req.body;
  
  if (!image || !barberCategory || !translation || !visits) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
};
