import express from "express";

import { addFavorTranslations, getFavorTranslations } from "../controllers/favorTranslations";

const favorTranslationsRouter = express.Router();

favorTranslationsRouter.get("/", getFavorTranslations);

favorTranslationsRouter.post("/",addFavorTranslations);
export { favorTranslationsRouter };
