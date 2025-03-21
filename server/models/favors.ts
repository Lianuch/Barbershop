import mongoose from "mongoose";

const favorsSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 7,
  },
  price: {
    type: Number,
    required: true,
    minlength: 1,
  },

  translations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FavorTranslation" },
  ],

  visits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Visit" }],

  BarberCategoryFavor: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BarberCategoryFavor" },
  ],
});

export const Favor = mongoose.model("Favor", favorsSchema);
