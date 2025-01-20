
import mongoose from "mongoose";
import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { DB_URL, PORT } from "./config/config";
import { barberRouter } from "./routes/barbersRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors())
app.use(bodyParser.json({limit:"500kb"}));
app.use("/barbers", barberRouter);
app.use(errorHandler)
const main = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to DB");


    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

main();