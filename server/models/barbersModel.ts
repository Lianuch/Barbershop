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
    barberCategory:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:12
    }
    
})

const Barber = mongoose.model("Barber", barbersSchema);

export {Barber}