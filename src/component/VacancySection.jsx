import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../config/api";
import { clubs } from "../config/clubs";

const clubLogos = Object.fromEntries(clubs.map((club) => [club.name, club.logo]));

export default function VacancySection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/vacancies/all`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mb-14 px-2 relative">
      {/* AMBIENT BACKGROUND GLOW EFFECTS */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-orange-400/20 blur-3xl rounded-full pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 px-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-700 text-xs font-semibold mb-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Recruitment Drive
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
            Current{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
              Vacancies
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Choose your passion and apply for open executive roles
          </p>
        </div>

        <div className="self-start sm:self-auto bg-white/80 backdrop-blur-xl border border-gray-200/80 text-gray-800 text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow-sm flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
          </span>
          <span>{data.length} Positions Available</span>
        </div>
      </div>

      {/* CONTROLLED SCROLL CONTAINER */}
      <div className="relative z-10 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar p-1">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-lg">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 rounded-full border-4 border-purple-200 animate-pulse"></div>
              <div className="w-12 h-12 rounded-full border-4 border-purple-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="text-xs text-purple-700 font-bold tracking-wide mt-4 uppercase">
              Loading Opportunities...
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-2xl rounded-3xl border border-white shadow-xl">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-purple-100 text-2xl">
              ✨
            </div>
            <h3 className="text-gray-800 font-bold text-base">No Open Vacancies Right Now</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              You can still submit a general application form below to join Tejas!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence>
              {data.map((v, index) => {
                const filled = Number(v.filled) || 0;
                const seats = Number(v.seats) || 1;
                const percentage = Math.min(Math.round((filled / seats) * 100), 100);
                const logo = clubLogos[v.club];

                return (
                  <motion.div
                    key={v._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="relative group bg-white/70 hover:bg-white/95 backdrop-blur-2xl border border-white/90 hover:border-purple-300/80 p-5 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* TOP ACCENT LINE */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* CARD HEADER */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            {logo ? (
                              <img
                                src={logo}
                                alt={v.club}
                                className="w-12 h-12 object-contain p-1.5 rounded-2xl bg-gradient-to-br from-white to-purple-50/50 border border-purple-100/80 shadow-sm group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-sm">
                                🎨
                              </div>
                            )}
                          </div>

                          <div>
                            <span className="text-[10px] font-black tracking-widest uppercase bg-purple-100/80 text-purple-700 px-2.5 py-0.5 rounded-md border border-purple-200/50 inline-block mb-1">
                              {v.club}
                            </span>
                            <h3 className="text-base font-extrabold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                              {v.post}
                            </h3>
                          </div>
                        </div>

                        {/* STATUS BADGE */}
                        <span
                          className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shrink-0 shadow-2xs ${
                            v.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              v.isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                            }`}
                          />
                          {v.isActive ? "Open" : "Closed"}
                        </span>
                      </div>
                    </div>

                    {/* SEATS & PROGRESS */}
                    <div className="mt-2 pt-3 border-t border-gray-100/80">
                      <div className="flex justify-between items-center text-xs font-semibold text-gray-600 mb-2">
                        <span className="text-gray-400 font-medium text-[11px]">Availability</span>
                        <span className="text-gray-800 font-bold">
                          <span className="text-purple-700">{filled}</span> / {seats} Seats ({percentage}%)
                        </span>
                      </div>

                      {/* PROGRESS BAR WITH GLOW */}
                      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-gray-200/50">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full transition-all relative ${
                            percentage >= 100
                              ? "bg-rose-500"
                              : percentage >= 75
                              ? "bg-gradient-to-r from-amber-400 to-orange-500"
                              : "bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400"
                          }`}
                        />
                      </div>

                      {/* CALL TO ACTION LINK */}
                      <div className="mt-3 flex items-center justify-between text-[11px]">
                        <span className="text-gray-400 font-medium">
                          {v.isActive ? "⚡ Instant consideration" : "🔒 Registration paused"}
                        </span>
                        <span className="text-purple-600 font-extrabold group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                          Apply Below
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}