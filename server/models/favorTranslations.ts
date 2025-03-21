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
    minlength: 2,
  },
  favor: { type: mongoose.Schema.Types.ObjectId, ref: "Favor", required: true },


});

export const FavorTranslations = mongoose.model("FavorTranslation", favorTranslationsSchema);
