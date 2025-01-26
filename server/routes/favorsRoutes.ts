import express from "express";
import { addFavor, getFavors } from "../controllers/favorsController";

const favorRouter = express.Router()

favorRouter.get("/", getFavors)
favorRouter.post("/", addFavor)

export {favorRouter}