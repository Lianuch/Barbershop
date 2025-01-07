import mongoose from "mongoose";

const barbersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:20
    } ,
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:20
    },
    
})

const Barber = mongoose.model("Barber", barbersSchema);

export {Barber}