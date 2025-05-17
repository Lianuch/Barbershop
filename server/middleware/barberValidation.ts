import { Request, Response, NextFunction } from "express";

export const barberValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { image, barberCategory, translation } = req.body;
  
  if (!image || !barberCategory || !translation ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
};
