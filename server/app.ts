import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { DB_URL, PORT } from "./config/config";
import { barberRouter } from "./routes/barbers";
import { favorRouter } from "./routes/favors";
import { clientRouter } from "./routes/client";
import { barberTranslationsRouter } from "./routes/barberTranslation";
import { barberCategoryRouter } from "./routes/barberCategory";
import seedRouter from "./routes/seed";
import { visitRouter } from "./routes/visit";
import { favorTranslationsRouter } from "./routes/favorTranslations";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();
app.use(express.json({ limit: "500kb" }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api/barbers", barberRouter);  
app.use("/api/barberCategory", barberCategoryRouter); 
app.use("/api/barberTranslations", barberTranslationsRouter);  
app.use("/api/favors", favorRouter);  
app.use("/api/favorTranslations", favorTranslationsRouter);  
app.use("/api/visits", visitRouter);  
app.use("/api/seed", seedRouter); 

app.use("/api/clients", clientRouter); 
app.use(errorMiddleware);

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
