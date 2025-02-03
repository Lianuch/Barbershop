import mongoose from "mongoose";

const barberCategoryFavorSchema = new mongoose.Schema({
 barberCategory: { type: mongoose.Schema.Types.ObjectId, ref: "BarberCategory", required: true },
 favor: { type: mongoose.Schema.Types.ObjectId, ref: "Favor", required: true },
});

const barberCategoryFavor = mongoose.model("BarberCategoryFavor", barberCategoryFavorSchema);
export { barberCategoryFavor };
