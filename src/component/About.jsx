import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { clubs } from "../config/clubs";

// Logos
import tejasLogo from "../assets/tejas.png";

const About = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="site-grid py-28 px-6 bg-[#f5f3ed]">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#59605e] mb-7">
          <img src={tejasLogo} alt="Tejas logo" className="w-7 h-7 rounded-full object-cover" />
          Our creative ecosystem
        </div>
        <h2 className="display-font text-5xl md:text-7xl font-bold mb-7">
          <span className="text-[#e86f3d]">Tejas</span> — The Dreamers Club
        </h2>
        <p className="text-[#59605e] text-lg leading-relaxed mb-4 max-w-3xl mx-auto">
          Tejas is the official dreamers club ecosystem of Future University.
          It empowers students to explore interests beyond academics and express
          creativity in a safe and supportive environment.
        </p>
        <p className="text-[#59605e] text-lg leading-relaxed mb-4 max-w-3xl mx-auto">
          With clubs spanning cultural, technical, artistic, sports, management,
          and social responsibility domains, Tejas nurtures talents, develops
          leadership, teamwork, and real-world skills among students.
        </p>
        <p className="text-[#59605e] text-lg leading-relaxed max-w-3xl mx-auto">
          Each club under Tejas encourages students to turn hobbies into
          lifelong skills, confidence, and excellence.
        </p>
      </div>

      {/* Clubs Cards */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
        {clubs.map((club, i) => (
          <motion.div
            key={i}
            onClick={() => navigate(`/club/${club.key}`)}
            initial={{ y: 0 }}
            whileHover={{
              scale: 1.1,
              y: -10,
              boxShadow: "0px 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.2)",
            }}
            className={`w-60 h-60 rounded-[2rem] bg-gradient-to-br ${club.gradient}
              flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden shadow-xl`}
          >
            {/* Glow effect behind logo */}
            <motion.span
              className="absolute w-40 h-40 bg-white/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.3, opacity: 0.6 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            />

            {/* Logo */}
            <motion.img
              src={club.logo}
              className="w-20 h-20 object-contain mb-3 relative z-10 drop-shadow-xl"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <h3 className="text-white text-xl font-bold relative z-10">{club.name}</h3>
            <p className="text-white/85 text-sm relative z-10 text-center px-5 line-clamp-2">{club.shortDescription}</p>

            {/* Click hint */}
            <span className="absolute bottom-3 text-xs text-white/70 opacity-80 z-10">
              Click to explore →
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
