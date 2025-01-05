import mongoose from "mongoose";

const barbersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    
})

const Barber = mongoose.model("Barber", barbersSchema);

export {Barber}