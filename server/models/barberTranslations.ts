import mongoose from "mongoose";

const barberTranslationSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["ua", "en"], 
  },
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  surname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber",
    required: true,
  },  });
  
  const BarberTranslation = mongoose.model("BarberTranslation", barberTranslationSchema);
  
  export { BarberTranslation };
  