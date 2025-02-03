import express from "express";
import { addVisits, getVisits } from "../controllers/visit";

const visitRouter = express.Router()

visitRouter.get("/", getVisits)
visitRouter.post("/",addVisits)

export {visitRouter}