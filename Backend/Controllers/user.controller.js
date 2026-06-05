import { UploadOnClaudinary } from "../Config/cloudinary.js";
import { geminiResponse } from "../gemini.js";
import User from "../Models/user.model.js";
import { response } from "express";
import moment from "moment";

export async function GetCurrentUser(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "User Not Found ",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function updateAssistant(req, res) {
  try {
    const { assistantName, imageURL } = req.body;
    let assistantImage;
    if (req.file) {
      assistantImage = await UploadOnClaudinary(req.file.path);
    } else {
      assistantImage = imageURL;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        assistantName,
        assistantImage,
      },
      {
        returnDocument: "after",
      },
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Update Assistant error",
    });
  }
}

export async function askToAssistant(req, res) {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);

    user.history.push(command)
    user.save()

    const userName = user.name;

    const assistantName = user.assistantName;
    const result = await geminiResponse(command, assistantName, userName);
    if (!result) {
      return res.status(500).json({
        response: "Gemini did not return a valid response",
      });
    }
    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(400).json({
        response: "sorry i can't understand",
      });
    }
    const gemResult = JSON.parse(jsonMatch[0]);
    console.log(gemResult);
    const type = gemResult.type;

    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get_time":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current time is ${moment().format("hh:mm:A")}`,
        });
      case "get_day":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${moment().format("dddd")}`,
        });
      case "get_month":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current month is ${moment().format("MMMM")}`,
        });
      case "general":
      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "instagram_open":
      case "facebook_open":
      case "calculator_open":
      case "weather_show":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });
      default:
        return res.status(400).json({
          response: "i don't understand that command",
        });
    }
  } catch (error) {
    return res.status(500).json({
      response: `ask assistant error ${error}`,
    });
  }
}
