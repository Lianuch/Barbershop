import express from "express";
import seedData from "../controllers/seed";

const seedRouter = express.Router();

seedRouter.get("/", seedData );

export default seedRouter;
