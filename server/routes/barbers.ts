import express from "express";
import { addBarber, deleteBarber, getBarbers, updateBarber } from "../controllers/barbers";
import { barberValidation } from "../middleware/barberValidation";
import { upload } from "../config/cloudinaryConfig";

const barberRouter = express.Router();

barberRouter.get("/", getBarbers);
barberRouter.post("/", barberValidation, addBarber);
barberRouter.delete("/:id", deleteBarber);
barberRouter.put("/:id",upload.single("image"), updateBarber);

export { barberRouter };
