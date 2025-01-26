import mongoose from "mongoose";

const barbersSchema = new mongoose.Schema({
  name: {
    ua: {
      type: String,
      required: true,
      maxlength: 20,
    },
    en: {
      type: String,
      required: true,
      maxlength: 20,
    },
  },
  surname: {
    ua: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    en: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
  },
  barberCategory: {
    ua: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    en: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
  },
  image: {
    type: String,
    required: false,
  },
});

const Barber = mongoose.model("Barber", barbersSchema);

export { Barber };
