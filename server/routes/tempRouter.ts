import express from "express";
import mailService from "../service/mailService";

const tempRouter = express.Router()

tempRouter.get("/", async(req, res)=>{
    try{
        await mailService.sendRecordInformation("relaxo2002@gmail.com",new Date())
        res.send("email sent")
    }
    catch(e){
        console.log(e)
    }
} )

export {tempRouter}