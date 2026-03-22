import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Logos
import abhiruchiLogo from "../assets/abhiruchi1.png";
import panacheLogo from "../assets/panache.png";
import rockonLogo from "../assets/rockon.png";
import itechLogo from "../assets/itech.png";
import imagesLogo from "../assets/images.png";
import strideLogo from "../assets/stride.png";
import mfactorLogo from "../assets/mfactor.png";
import triLogo from "../assets/tri.png";

const clubs = [
  { name: "panache", title: "Panache", tag: "Arts & Creativity", logo: panacheLogo, gradient: "from-pink-400 to-pink-600" },
  { name: "rockon", title: "Rock On", tag: "Music & Dance", logo: rockonLogo, gradient: "from-red-400 to-red-600" },
  { name: "itech", title: "I-Tech", tag: "Technology", logo: itechLogo, gradient: "from-blue-400 to-blue-600" },
  { name: "images", title: "Images", tag: "Publication", logo: imagesLogo, gradient: "from-green-400 to-green-600" },
  { name: "stride", title: "Stride", tag: "Sports", logo: strideLogo, gradient: "from-emerald-400 to-emerald-600" },
  { name: "mfactor", title: "M-Factor", tag: "Management", logo: mfactorLogo, gradient: "from-cyan-400 to-cyan-600" },
  { name: "tri", title: "RI", tag: "Social Responsibility", logo: triLogo, gradient: "from-orange-400 to-orange-600" },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-28 px-6 bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <img src={abhiruchiLogo} className="w-48 mx-auto mb-6" />
        <h2 className="text-5xl font-extrabold mb-6">
          <span className="text-amber-600">Abhiruchi</span> – Hobby Club
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Abhiruchi is the official hobby club ecosystem of Invertis University.
          It empowers students to explore interests beyond academics and express
          creativity in a safe and supportive environment.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          With clubs spanning cultural, technical, artistic, sports, management,
          and social responsibility domains, Abhiruchi nurtures talents, develops
          leadership, teamwork, and real-world skills among students.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Each club under Abhiruchi encourages students to turn hobbies into
          lifelong skills, confidence, and excellence.
        </p>
      </div>

      {/* Clubs Cards */}
      <div className="flex flex-wrap justify-center gap-10">
        {clubs.map((club, i) => (
          <motion.div
            key={i}
            onClick={() => navigate(`/club/${club.name}`)}
            initial={{ y: 0 }}
            whileHover={{
              scale: 1.1,
              y: -10,
              boxShadow: "0px 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.2)",
            }}
            className={`w-56 h-56 rounded-full bg-gradient-to-br ${club.gradient}
              flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative overflow-hidden`}
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
              className="w-20 mb-2 relative z-10"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <h3 className="text-white text-xl font-bold relative z-10">{club.title}</h3>
            <p className="text-white text-sm relative z-10">{club.tag}</p>

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
