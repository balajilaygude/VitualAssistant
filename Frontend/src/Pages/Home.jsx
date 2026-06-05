import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";

export default function Home() {
  const { userdata, serverURL, setUserData, geminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [ham ,setHam]=useState(false)
  const isSpeaking = useRef(false);
  const recognitionRef = useRef(false);
  const isRecognitionRef = useRef(false);
  const synth = window.speechSynthesis;

  async function handleLogout(params) {
    try {
      const result = await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error.response?.data);
    }
  }
  const startrecognition = () => {
          if (!isSpeaking.current && !isRecognitionRef.current) {
        try {
          recognitionRef.current.start();
          console.log("Recognition Requested to start");
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error("start Error", error);
          }
        }
      }
  };

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text);
    //
    utterence.lang = "hi-IN";
    const voice = window.speechSynthesis.getVoices();
    const hindiVoice = voice.find((v) => v.lang === "hi-IN");
    if (hindiVoice) {
      utterence.voice = hindiVoice;
    }

    //

    isSpeaking.current = true;
    utterence.onend = () => {
      setAiText("");
      isSpeaking.current = false;
      setTimeout(()=>{
        startrecognition()
      }, 800)
    };
    synth.cancel()
    synth.speak(utterence);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.google.com/search?q=${query}`,
        "_blank",
      );
    }
    if (type === "calculator_open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }
    if (type === "facebook_open") {
      window.open(`https://www.facebook.com`, "_blank");
    }
    if (type === "instagram_open") {
      window.open(`https://www.instagram.com`, "_blank");
    }
    if (type === "weather_show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }
    if (type === "youtube_search" || type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults=false

    recognitionRef.current = recognition;

    let isMounted=true;

    const startTieout=setTimeout(()=>{
      if (isMounted && !isSpeaking.current && !isRecognitionRef.current) {
        try {
          recognition.start()
          console.log("Recognition Requested to start");
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error(error);
          }          
        }
      }
    },1000);

    recognition.onstart = () => {
      console.log("Recognition srarted.");
      isRecognitionRef.current = true;
      setListening(true);
    };
    recognition.onend = () => {
      console.log("Recognition ended.");
      isRecognitionRef.current = false;
      setListening(false);

      if (isMounted && !isSpeaking.current) {
        setTimeout(()=>{
          if(isMounted){
            try {
              recognition.start()
              console.log("Recognition Restarted ")
            } catch (error) {
              if(error.name!=="InvalidStateError"){
                console.error(error)
              }
            }
          }
        },1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error ", event.error);
      isRecognitionRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && isMounted && !isSpeaking.current) {
        setTimeout(() => {
          if(isMounted){
            try {
              recognition.start()
              console.log("Recognition restarted after error")
            } catch (error) {
              if(error.name!=="InvalidStateError"){
                console.error(error)
              }
            }
          }
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log("Heard :", transcript);
      if (
        transcript.toLowerCase().includes(userdata.assistantName.toLowerCase())
      ) {
        console.log("request");
        setAiText("");
        setUserText(transcript);
        recognition.stop();
        isRecognitionRef.current = false;
        setListening(false);
        const data = await geminiResponse(transcript);
        console.log(data);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      }
    };

    const greeting=new SpeechSynthesisUtterance(`Hello ${userdata.name} what can i help you with ?`);
    greeting.lang="hi-IN"
    window.speechSynthesis.speak(greeting)


    return () => {
      isMounted=false
      clearTimeout(startTieout)
      recognition.stop();
      setListening(false);
      isRecognitionRef.current = false;
    };
  }, []);

  return (
    <div className="w-full p-5 min-h-screen bg-linear-to-t from-black to-indigo-900 flex flex-col justify-center items-center">
      <div className="w-full h-4/5 flex justify-center items-center flex-col ">
        <GiHamburgerMenu className="text-white absolute top-4 right-5 text-xl sm:text-2xl" onClick={()=>setHam(true)}/>
        <div className={`absolute top-0 w-full h-full bg-blue-500/20 backdrop-blur-sm  
        flex-col justify-start items-center ${ham?"translate-x-0 flex":"translate-x-full hidden"} transition-transform`}>
          <RxCross1 className="text-white absolute top-5 right-5 text-2xl" onClick={()=>setHam(false)}/>
          <button
            className=" cursor-pointer w-28  mt-4 min-h-8 p-2 bg-white rounded-full font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className=" w-52 cursor-pointer  mt-4 min-h-8 p-2 bg-white rounded-full font-semibold"
            onClick={() => navigate("/customize")}
          >
            Customize Assistant
          </button>

          <div className="w-9/10 h-0.5 my-4 bg-gray-300"></div>
                <h2 className="text-white text-2xl mb-3 font-semibold">
                  History
                </h2>
            <div className="text-white w-9/10 h-3/5 overflow-auto flex flex-col gap-2 ">
              {userdata.history?.map((his,id)=>(
                <span key={id} className="text-white">{his}</span>
              ))}

            </div>

        </div>

        <img
          src={userdata?.assistantImage}
          className="w-80 h-90 rounded-4xl shadow-xl object-cover shadow-blue-400  mb-8"
        />
        <h2 className="text-white text-2xl mb-3 font-semibold">
          Hello, I am{" "}
          <span className="text-blue-600">{userdata?.assistantName}</span>
        </h2>
        {!aiText && <img src={userImg} className="w-50" />}
        {aiText && <img src={aiImg} className="w-50" />}
        <h2 className="text-white text-2xl mb-3 font-semibold">
          {userText ? userText : aiText ? aiText : null}
        </h2>
      </div>
    </div>
  );
}
