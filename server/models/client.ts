import mongoose from "mongoose";

export interface IClient extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;  
  isActivated: boolean;  
  activationLink?: string;
  visits: string[];
  role: "client" | "admin";}

const clientSchema = new mongoose.Schema<IClient>({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    // select: false,
  },

  isActivated: {type: Boolean, default: false},
  activationLink:{
    type: String
  },

  visits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit",
    },
  ],
  role:{
    type: String,
    enum: ["client", "admin"],
    default: "client"
  }
});






const Client = mongoose.model<IClient>("Client", clientSchema);
export { Client };
