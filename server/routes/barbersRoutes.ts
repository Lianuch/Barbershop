import express from "express";
import { addBarber, deleteBarber, getBarbers, updateBarber } from "../controllers/barbersController";
import { barberValidation } from "../middleware/barberValidation";
import { upload } from "../config/cloudinaryConfig";

const barberRouter = express.Router();

barberRouter.get("/", getBarbers);
barberRouter.post("/",upload.single("image"), barberValidation, addBarber);
barberRouter.delete("/:id", deleteBarber);
barberRouter.put("/:id",upload.single("image"), barberValidation, updateBarber);

export { barberRouter };
