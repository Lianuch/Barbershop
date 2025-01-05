import express from "express";
import { addBarber, deleteBarber, getBarbers } from "../controllers/barbersController";

const barberRouter = express.Router();
const jsonParser = express.json();

barberRouter.get("/",getBarbers)
barberRouter.post("/",jsonParser,addBarber)
barberRouter.delete("/:id",deleteBarber)

export {barberRouter};