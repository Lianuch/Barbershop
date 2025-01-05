import mongoose from "mongoose"
import express from "express"
import { DB_URL, Port } from "./config/config";
import { barberRouter } from "./routes/barbersRoutes";
const app = express()

app.use("/api/barbers",barberRouter)
const main = async () =>{
    try{
        mongoose.connect(DB_URL)
        console.log("Connected to DB");
        
        app.listen(Port,()=>{
            console.log(`Server started on port ${Port}`);
            
        })

    }
    catch(e){
        console.log(e);
        
    }
}
main()

process.on("SIGINT", async ()=>{
    await mongoose.disconnect()
    process.exit()
})