import express from "express";
import { Client } from "../models/client";
import { addClient, getClients } from "../controllers/client";
import { clientValidation } from "../middleware/clientValidation";

const clientRouter = express.Router()

clientRouter.get("/", getClients)
clientRouter.post("/",clientValidation, addClient)

export {clientRouter}