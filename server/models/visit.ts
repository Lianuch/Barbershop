import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  comment: { type: String, required: true },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  favor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Favor",
    required: true,
  },
});

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;
