import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    client:{ type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    refreshToken: { type: String, required: true },
});

const Token = mongoose.model("Token", tokenSchema);
export default Token;
