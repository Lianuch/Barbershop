import express from "express";
import {
  addFavor,
  deleteFavor,
  getFavors,
  updateFavor,
} from "../controllers/favors";
import { favorValidation } from "../middleware/favorValidation";
import { Favor } from "../models/favors";

const favorRouter = express.Router();

favorRouter.get("/", getFavors);

favorRouter.post("/",  addFavor);
favorRouter.delete("/:id", deleteFavor);
favorRouter.put("/:id", favorValidation, updateFavor);
export { favorRouter };
