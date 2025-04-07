import express from "express";
import { addVisits, getVisits } from "../controllers/visit";
import tempAuthMiddleware from "../middleware/tempAuthMiddleware";
import {authMiddleware} from "../middleware/authMiddleware";
import mailService from "../service/mailService";

const visitRouter = express.Router()

visitRouter.get("/", getVisits)
visitRouter.post("/",tempAuthMiddleware, addVisits)
// visitRouter.get("/test-email", async(req, res)=>{
//     try{
//         await mailService.sendRecordInformation("relaxo2002@gmail.com",new Date())
//         res.send("email sent")
//     }
//     catch(e){
//         console.log(e)
//     }
// } )

export {visitRouter}