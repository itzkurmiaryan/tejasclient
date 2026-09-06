import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { clubs } from "../config/clubs";

import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [showClubs, setShowClubs] = useState(false); 

  const navigate = useNavigate(); 

  const words = ["Creativity", "Passion", "Innovation", "Talent", "Excellence"];

  useEffect(() => {
    setFadeIn(true);
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(wordInterval);
  }, [words.length]);

  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] flex flex-col justify-center bg-[#101315] text-white overflow-hidden dark-grid px-6 py-20">
      <div className="absolute -right-32 top-16 w-96 h-96 rounded-full border border-[#c7d96b]/30 opacity-70 float-slow" />
      <div className="absolute right-24 top-36 w-48 h-48 rounded-full border border-[#e86f3d]/40" />
      <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-[#e86f3d]/10 blur-3xl" />
      <div className="absolute left-6 top-10 text-[10px] uppercase tracking-[0.3em] text-white/40 hidden sm:block">Future University / 2026</div>
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
        <div className="text-left">
        <p className={`reveal-up text-[#c7d96b] uppercase tracking-[0.28em] text-xs font-bold mb-7 ${fadeIn ? "opacity-100" : "opacity-0"}`}>A club for the curious</p>
        <h1 className={`display-font text-5xl sm:text-7xl md:text-8xl leading-[.95] font-bold mb-7 transition-all duration-1000 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          Welcome to <span className="text-[#e86f3d]">Tejas</span>
          <span className="block text-white/90 text-3xl sm:text-5xl md:text-6xl mt-4">The Dreamers Club</span>
        </h1>

        <p className={`text-lg sm:text-xl text-white/60 mb-4 transition-all duration-1000 delay-200 ${fadeIn ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          Explore | Learn | Shine
        </p>

        <p className={`text-lg sm:text-xl text-white/85 font-semibold mb-9 transition-all duration-1000 delay-300 ${fadeIn ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          Igniting{" "}
          <span className="text-[#c7d96b] animate-fade-up">
            {words[currentWordIndex]}
          </span>{" "}
          at Future University.
        </p>

        {/* Buttons */}
        <div className={`flex flex-wrap justify-start gap-4 transition-all duration-1000 delay-500 ${fadeIn ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <button
            onClick={() => navigate("/join-us")} 
            className="px-7 py-4 rounded-full bg-[#e86f3d] text-white font-semibold shadow-[0_12px_30px_rgba(232,111,61,0.25)] hover:bg-[#f18452] hover:-translate-y-1 transition duration-300"
          >
            Join Now
          </button>
          <button
            onClick={() => setShowClubs(!showClubs)}
            className="px-7 py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 hover:border-[#c7d96b] transition-all duration-300"
          >
            {showClubs ? "Hide Clubs" : "Explore Clubs"}
          </button>
        </div>
        </div>

        <div className="relative min-h-[440px] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#e86f3d]/10 blur-3xl" />
          <Motion.div
            className="absolute w-[340px] h-[340px] sm:w-[430px] sm:h-[430px] rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
          <Motion.div
            className="absolute w-[250px] h-[250px] sm:w-[330px] sm:h-[330px] rounded-full border border-[#c7d96b]/30 border-dashed"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <Motion.div
            className="relative z-10 w-36 h-36 sm:w-48 sm:h-48 rounded-[2.5rem] bg-[#f5f3ed] p-4 shadow-[0_0_80px_rgba(232,111,61,.35)] flex items-center justify-center"
            animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src="/images/tejas.png" alt="Tejas logo" className="w-full h-full object-contain rounded-[1.75rem]" />
            </Motion.div>
          <span className="absolute bottom-1/2 translate-y-28 z-20 text-[10px] uppercase tracking-[.28em] text-[#101315] bg-[#c7d96b] px-3 py-1 rounded-full font-bold">The dreamers club</span>

          {clubs.map((club, index) => {
            const angle = (index / clubs.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 174;
            return (
              <Motion.button
                key={club.key}
                onClick={() => navigate(`/club/${club.key}`)}
                className="absolute z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl p-2 shadow-xl hover:border-[#c7d96b] hover:bg-white/20 transition"
                style={{ left: `calc(50% + ${Math.cos(angle) * radius}px - 28px)`, top: `calc(50% + ${Math.sin(angle) * radius}px - 28px)` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showClubs ? 1 : .62, scale: showClubs ? 1 : .82 }}
                transition={{ delay: index * .07, duration: .45, type: "spring" }}
                title={club.name}
              >
                <img src={club.logo} alt={club.name} className="w-full h-full object-contain" />
              </Motion.button>
            );
          })}

          <AnimatePresence>
            {showClubs && (
              <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} className="absolute -bottom-3 sm:-bottom-8 w-full max-w-sm z-30 rounded-2xl bg-[#f5f3ed] text-[#101315] p-4 shadow-2xl">
                <p className="text-[10px] uppercase tracking-[.2em] text-[#e86f3d] font-bold mb-2">Choose your orbit</p>
                <div className="grid grid-cols-2 gap-2">
                  {clubs.map((club) => <button key={club.key} onClick={() => navigate(`/club/${club.key}`)} className="text-left text-xs font-semibold hover:text-[#e86f3d] transition truncate">{club.name.replace("The ", "")} <span className="text-black/30">↗</span></button>)}
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Clubs Section */}
      {showClubs && <p className="relative z-10 text-center text-white/40 text-xs uppercase tracking-[.2em] mt-14">Tap any club in the orbit to explore</p>}
    </section>
  );
}

