import mongoose from "mongoose";

const barbersSchema = new mongoose.Schema({
  image: { type: String, required: true },
  barberCategory: { type: mongoose.Schema.Types.ObjectId, ref: "BarberCategory" },
  translation: [{ type: mongoose.Schema.Types.ObjectId, ref: "BarberTranslation" }],
  visits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Visit" }],
});

const Barber = mongoose.model("Barber", barbersSchema);
export default Barber;
