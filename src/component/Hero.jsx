import React, { useState, useEffect } from "react";
import { ArrowDownCircle } from "lucide-react";

// 🔹 Logos
import panacheLogo from "../assets/panache.png";
import rockonLogo from "../assets/rockon.png";
import itechLogo from "../assets/itech.png";
import imagesLogo from "../assets/images.png";
import strideLogo from "../assets/stride.png";
import mfactorLogo from "../assets/mfactor.png";
import triLogo from "../assets/tri.png";

import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [showClubs, setShowClubs] = useState(false); 

  const navigate = useNavigate(); 

  const words = ["Creativity", "Passion", "Innovation", "Talent", "Excellence"];

  const clubs = [
    { title: "Panache – The Arts Club", desc: "Explore painting, crafts, modeling, and design to express your creativity.", gradient: "from-pink-400 to-pink-500", logo: panacheLogo },
    { title: "Rock On – The Cultural Club", desc: "Learn music, singing, dancing, and perform on stage to showcase talent.", gradient: "from-red-400 to-red-500", logo: rockonLogo },
    { title: "I-Tech – The Technical Club", desc: "Innovate with Robotics, IoT, AI, and Ethical Hacking projects.", gradient: "from-blue-400 to-blue-500", logo: itechLogo },
    { title: "Images – The Publication Club", desc: "Develop writing and communication skills, publish thought-provoking articles.", gradient: "from-green-400 to-green-500", logo: imagesLogo },
    { title: "Stride – The Sports Club", desc: "Promote fitness and sportsmanship through indoor and outdoor games.", gradient: "from-emerald-400 to-emerald-500", logo: strideLogo },
    { title: "M-Factor – The Management Club", desc: "Build managerial and leadership skills through teamwork and planning.", gradient: "from-cyan-400 to-cyan-500", logo: mfactorLogo },
    { title: "The Responsible Invertian – The Social Cause Club", desc: "Organize social initiatives to become a responsible citizen.", gradient: "from-orange-400 to-orange-500", logo: triLogo },
  ];

  useEffect(() => {
    setFadeIn(true);
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Abhiruchi
          </span>
          <br />
          <span className="text-xl sm:text-3xl md:text-4xl text-gray-700">
            The Creative Hub
          </span>
        </h1>

        <p className={`text-lg sm:text-xl text-gray-600 mb-4 transition-all duration-1000 delay-200 ${fadeIn ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          Explore | Learn | Shine
        </p>

        <p className={`text-lg sm:text-xl text-gray-700 font-semibold mb-8 transition-all duration-1000 delay-300 ${fadeIn ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          Igniting{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-fade-up">
            {words[currentWordIndex]}
          </span>{" "}
          at Invertis University
        </p>

        {/* Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 ${fadeIn ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <button
            onClick={() => navigate("/join-us")} 
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Join Now
          </button>
          <button
            onClick={() => setShowClubs(!showClubs)}
            className="px-8 py-4 rounded-full border-2 border-purple-400 text-purple-600 font-semibold hover:bg-purple-50 transition-all duration-300"
          >
            {showClubs ? "Hide Clubs" : "Explore Clubs"}
          </button>
        </div>
      </div>

      {/* Clubs Section */}
      {showClubs && (
        <div className="max-w-5xl mx-auto flex flex-col gap-16 mt-16">
          {clubs.map((club, index) => (
            <ClubCard key={index} title={club.title} desc={club.desc} gradient={club.gradient} logo={club.logo} reverse={index % 2 !== 0} />
          ))}
        </div>
      )}
    </section>
  );
}

// ClubCard Component
const ClubCard = ({ title, desc, gradient, logo, reverse }) => (
  <div className={`flex flex-col sm:flex-row items-center ${reverse ? "sm:flex-row-reverse" : ""} bg-white rounded-3xl shadow-lg overflow-hidden`}>
    <div className={`sm:w-1/3 w-full h-48 sm:h-72 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-4`}>
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-md bg-white p-2 overflow-hidden flex items-center justify-center">
        <img src={logo} alt={`${title} Logo`} className="w-full h-full object-cover object-center" style={{ transform: "scale(1.8)" }} />
      </div>
      <h3 className="text-2xl font-bold text-white text-center px-6">{title}</h3>
    </div>
    <div className="sm:w-2/3 w-full p-8 bg-gray-50">
      <p className="text-slate-700 text-lg leading-relaxed">{desc}</p>
    </div>
  </div>
);
