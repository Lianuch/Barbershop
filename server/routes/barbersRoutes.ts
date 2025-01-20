import express from "express";
import { addBarber, deleteBarber, getBarbers, updateBarber } from "../controllers/barbersController";
import { barberValidation } from "../middleware/barberValidation";

const barberRouter = express.Router();

barberRouter.get("/", getBarbers);
barberRouter.post("/", barberValidation, addBarber);
barberRouter.delete("/:id", deleteBarber);
barberRouter.put("/:id", barberValidation, updateBarber);

export { barberRouter };
