import getToken from "../Config/token.js";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export async function Signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const exitsEmail = await User.findOne({ email });
    if (exitsEmail) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }
    if (password.length <= 6) {
      return res.status(400).json({
        message: "Password must be atleast 6 Character",
      });
    }
    const Hashpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: Hashpassword,
      email,
    });
    const token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({
      message: `Sign up error ${error.message}`,
    });
  }
}

export async function Login(req, res) {
  try {
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not Exists",
      });
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({
      message:`Login error ${error.message}`,
    });
  }
}

export async function Logout(req,res) {
    try {
        res.clearCookie("token")
        res.status(200).json({
            message:"Logout Successfully"
        })
    } catch (error) {
    return res.status(500).json({
      message:`Logout error ${error.message}`,
    });  
    }
}