import express from "express"
import dotenv from "dotenv"
dotenv.config()
import dbConnect from "./Config/db.js"
import authRouter from "./Routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./Routes/user.routes.js"
import { geminiResponse } from "./gemini.js"

const app=express()
const port=process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://vitualassistant.onrender.com",
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

app.get("/", async (req,res)=>{
    const prompt=req.query.prompt;
        if (!prompt) {
      return res.status(400).json({
        error: "prompt is required",
      });
    }

    console.log("\n\n\n\n",prompt,"\n\n\n\n")
    let data=await geminiResponse(prompt)
        console.log("\n\n\n\n",data,"\n\n\n\n")
    res.json(data)
})

app.listen(port,()=>{
    console.log("Server Started On ",port)
    dbConnect()
})
