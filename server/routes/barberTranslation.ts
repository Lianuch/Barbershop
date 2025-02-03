import express from "express";
import { addBarberTranslations, getBarberTranslations } from "../controllers/barberTranslations";

const barberTranslationsRouter = express.Router();

barberTranslationsRouter.get("/", getBarberTranslations);
barberTranslationsRouter.post("/", addBarberTranslations);


export { barberTranslationsRouter };
