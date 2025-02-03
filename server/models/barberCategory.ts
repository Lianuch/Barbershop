import mongoose from "mongoose";

const barberCategorySchema = new mongoose.Schema({
  
    categoryName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    barbers :[{
        type: mongoose.Schema.Types.ObjectId,ref : "Barber"
    }],
    categoryFavor :[{
        type: mongoose.Schema.Types.ObjectId,ref : "BarberCategoryFavor"
    }],
    
  });
  
  const BarberCategory = mongoose.model("BarberCategory", barberCategorySchema);
  
  export default BarberCategory;
  