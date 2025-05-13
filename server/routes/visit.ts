import express from "express";
import { addVisits, getAllVisits, getVisits } from "../controllers/visit";
import tempAuthMiddleware from "../middleware/tempAuthMiddleware";
import {authMiddleware} from "../middleware/authMiddleware";
import mailService from "../service/mailService";

const visitRouter = express.Router()

visitRouter.get("/all-visits", getAllVisits)
visitRouter.get("/",tempAuthMiddleware, getVisits)
visitRouter.post("/",tempAuthMiddleware, addVisits)

export {visitRouter}