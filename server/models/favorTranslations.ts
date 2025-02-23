import mongoose from "mongoose";

const favorTranslationsSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["ua", "en"],
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
  },

  favor: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: "Favor",
  },
});

const FavorTranslations = mongoose.model(
  "FavorTranslations",
  favorTranslationsSchema
);
export { FavorTranslations };
