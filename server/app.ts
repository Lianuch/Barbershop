
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import { DB_URL, Port } from "./config/config";
import { barberRouter } from "./routes/barbersRoutes";

const main = async () => {
  try {
    const app = express();

    await mongoose.connect(DB_URL);
    console.log("Connected to DB");

    app.use(bodyParser.json({limit:"500kb"}));
    app.use("/barbers", barberRouter);

    app.listen(Port, () => {
      console.log("Server started on port 3000");
    });
  } catch (e) {
    console.log(e);
  }
};

main();