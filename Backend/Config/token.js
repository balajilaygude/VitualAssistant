import jwt from "jsonwebtoken"

async function getToken(userid) {
    try {
       const token =await jwt.sign({userid},process.env.JWT_SECRET,{expiresIn:"10d"})
       return token 
    } catch (error) {
        console.log(error)
    }
}

export default getToken;
