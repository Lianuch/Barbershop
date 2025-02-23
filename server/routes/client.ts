import express from "express";
import client from "../controllers/client";

import { body } from "express-validator";
import { authMiddleware } from "../middleware/authMiddleware";

const clientRouter = express.Router();

clientRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  client.registration
);

clientRouter.post('/login', client.login)
clientRouter.post('/logout', client.logout)
clientRouter.get("/activate/:link", client.activate);  
clientRouter.get('/refresh', client.refresh)
clientRouter.get("/", authMiddleware, client.getClients); 

export { clientRouter };
