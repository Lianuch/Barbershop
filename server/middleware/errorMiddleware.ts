import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction) => {
  console.log(err);
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res
    .status(500)
    .json({ status: "error", message: "Something went wrong" });
};
