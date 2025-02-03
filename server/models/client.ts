import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
 email:{
    type: String,
    required: true,
    minlength: 3,
 },
 password:{
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
 },
 emailConfirmed: {
    type: Boolean,
    default: false
 },
 visits:[{
    type: mongoose.Schema.Types.ObjectId,ref : "Visit"
  }],
 
});

const Client = mongoose.model("Client", clientSchema);
export { Client };
