import jwt from "jsonwebtoken"

export default async function isAuth(req,res,next){
    try {
        const token =req.cookies.token
        if(!token){
            return res.status(400).json({
                message:"Token not Found"
            })
        }
        const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userid
        next()

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:error.message
        })
    }
}