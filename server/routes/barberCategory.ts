import express from "express";
import { getBarberCategories, addBarberCategory, updateBarberCategory } from "../controllers/barberCategory";

const barberCategoryRouter = express.Router();

barberCategoryRouter.get("/",getBarberCategories );
barberCategoryRouter.post("/",addBarberCategory );
barberCategoryRouter.put("/:id", updateBarberCategory);

export { barberCategoryRouter };
