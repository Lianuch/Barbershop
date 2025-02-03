import mongoose from "mongoose";

const favorsSchema = new mongoose.Schema({
  time:{
    type: String,
    required: true,
    minlength: 1,
    maxlength:7
  },
  price:{
    type: Number,
    required: true,
    minlength: 1,
    
  },
 
  BarberCategoryFavor:[{
    type: mongoose.Schema.Types.ObjectId,ref : "BarberCategoryFavor"
  }],
  visits:[{
    type: mongoose.Schema.Types.ObjectId,ref : "Visit"
  }],
  favorTranslations:[{
    type: mongoose.Schema.Types.ObjectId,ref : "FavorTranslations"
  }]
});

const Favor = mongoose.model("Favor", favorsSchema);
export { Favor };
