import express from "express"
import { Login, Signup } from "../Controllers/auth.controller.js"

const authRouter=express.Router()

authRouter.post("/signup",Signup)
authRouter.post("/signin",Login)
authRouter.get("/logout",Signup)


export default authRouter;
