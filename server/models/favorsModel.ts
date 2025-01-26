import mongoose from "mongoose";

const favorsSchema = new mongoose.Schema({
  name: {
    ua:{
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    en:{

      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    }
  },
  time: {
    ua: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 6,
    },
    en:{

      type: String,
      required: true,
      minlength: 1,
      maxlength: 6,
    }
  },
  price: {
    type: Number,
    required: true,
  }
});

const Favor = mongoose.model("Favor", favorsSchema);
export { Favor };
