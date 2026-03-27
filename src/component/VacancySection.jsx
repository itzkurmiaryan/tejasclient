import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../config/api";

/* ===== CLUB LOGOS & DATA ===== */
import panache from "../assets/panache.png";
import rockon from "../assets/rockon.png";
import itech from "../assets/itech.png";
import images from "../assets/images.png";
import stride from "../assets/stride.png";
import mfactor from "../assets/mfactor.png";
import responsible from "../assets/tri.png";

const clubsData = [
  { name: "Panache – The Arts Club", logo: panache, color: "from-purple-50 via-purple-100 to-pink-50" },
  { name: "Rock On – The Cultural Club", logo: rockon, color: "from-pink-50 via-pink-100 to-orange-50" },
  { name: "I-Tech – The Technical Club", logo: itech, color: "from-blue-50 via-blue-100 to-teal-50" },
  { name: "Images – The Publication Club", logo: images, color: "from-yellow-50 via-yellow-100 to-orange-50" },
  { name: "Stride – The Sports Club", logo: stride, color: "from-green-50 via-green-100 to-teal-50" },
  { name: "M-Factor – The Management Club", logo: mfactor, color: "from-indigo-50 via-indigo-100 to-purple-50" },
  { name: "The Responsible Invertian – The Social Cause Club", logo: responsible, color: "from-red-50 via-red-100 to-pink-50" }
];

export default function VacancySection() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    fetch(`${API}/vacancies/all`)
      .then(res => res.json())
      .then(setVacancies)
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto mb-16 px-4 relative">

      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 mb-12 relative">
        🔥 Current Openings
      </h2>

      {/* Vacancy Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {vacancies.map((v, i) => {
          const clubData = clubsData.find(c => c.name === v.club);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.07, rotateY: 5, rotateX: 2 }}
              className={`relative rounded-3xl shadow-2xl border border-gray-200 overflow-hidden cursor-pointer group bg-gradient-to-br ${clubData?.color || "from-gray-50 via-gray-100 to-gray-50"} p-6`}
            >

              {/* Floating orbs / spark animation */}
              <motion.div
                className="absolute top-0 left-0 w-8 h-8 bg-white rounded-full opacity-20 blur-2xl pointer-events-none"
                animate={{ x: [0, 20, 0], y: [0, -15, 0], opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", delay: i * 0.2 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full opacity-15 blur-3xl pointer-events-none"
                animate={{ x: [0, -25, 0], y: [0, 20, 0], opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", delay: i * 0.3 }}
              />

              {/* Club Logo */}
              {clubData && (
                <motion.img
                  src={clubData.logo}
                  className="absolute left-1/2 top-4 w-24 h-24 object-cover rounded-full z-20"
                  style={{ transform: "translateX(-50%)" }}
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Club Info */}
              <h3 className="mt-28 text-xl sm:text-2xl font-bold text-indigo-700 mb-2 group-hover:text-pink-600 transition-colors">
                {v.club}
              </h3>

              <p className="text-gray-600 mt-1 sm:text-base">
                Post: <b>{v.post}</b>
              </p>

              <p className="mt-2 sm:text-sm">
                Seats: <span className="font-semibold">{v.filled}/{v.seats}</span>
              </p>

              <p className={`mt-2 font-bold text-lg
                ${v.isActive ? "text-green-500 animate-pulse" : "text-red-500 animate-pulse"}`}>
                {v.isActive ? "🟢 Open" : "🔴 Closed"}
              </p>

              {!v.isActive && (
                <p className="text-xs text-gray-500 mt-1">
                  You can still apply manually
                </p>
              )}

              {/* Gradient shine / swirl on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-70 rounded-3xl pointer-events-none"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}