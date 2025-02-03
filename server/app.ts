
import mongoose from "mongoose";
import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { DB_URL, PORT } from "./config/config";
import { barberRouter } from "./routes/barbers";
import { favorRouter } from "./routes/favors";
import { errorHandler } from "./middleware/errorHandler";
import { clientRouter } from "./routes/client";
import { barberTranslationsRouter } from "./routes/barberTranslation";
import {barberCategoryRouter} from "./routes/barberCategory"
import seedRouter from "./routes/seed";
import { visitRouter } from "./routes/visit";

const app = express();
app.use(cors())
app.use(bodyParser.json({limit:"500kb"}));
app.use("/barbers", barberRouter);
app.use("/barberCategory", barberCategoryRouter);
app.use("/barberTranslations", barberTranslationsRouter);
app.use("/favors", favorRouter);
app.use("/clients", clientRouter);
app.use("/visits", visitRouter);

app.use('/seed', seedRouter)

app.use(errorHandler)
console.log(mongoose.modelNames());

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