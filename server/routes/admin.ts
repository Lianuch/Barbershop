import express from "express";
// import client from "../controllers/client";
import admin from "../controllers/adminController";

import { authMiddleware } from "../middleware/authMiddleware";

const adminRouter = express.Router();

// adminRouter.post("/register", authMiddleware, admin.registration);
adminRouter.post("/create-admin",  admin.registration);

export { adminRouter };