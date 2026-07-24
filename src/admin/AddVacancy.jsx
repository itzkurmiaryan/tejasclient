import { useState } from "react";
import { motion } from "framer-motion";
import API from "../config/api";

const clubs = [
  "Panache – The Arts Club",
  "Rock On – The Cultural Club",
  "I-Tech – The Technical Club",
  "Images – The Publication Club",
  "Stride – The Sports Club",
  "M-Factor – The Management Club",
  "The Responsible Invertian – The Social Cause Club",
];

const posts = [
  "President",
  "Vice President",
  "Secretary",
  "Joint Secretary",
  "Treasurer",
  "Coordinator",
  "Member",
];

export default function AddVacancy({ reload }) {
  const [club, setClub] = useState("");
  const [post, setPost] = useState("Member");
  const [seats, setSeats] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/vacancies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club,
          post,
          seats: Number(seats),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add vacancy");
      }

      alert("🎉 Vacancy Published Successfully!");

      setClub("");
      setPost("Member");
      setSeats("");

      reload && reload();
    } catch (err) {
      alert(`❌ ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mb-12 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* AMBIENT TOP GLOW ACCENT */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500" />
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
            Admin Console
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
            Publish New <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Vacancy</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Create an official recruitment opening for students
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Publishing Mode
        </div>
      </div>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* SELECT CLUB */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Target Club *
          </label>
          <div className="relative">
            <select
              className="w-full bg-slate-950/80 border border-white/10 focus:border-purple-500/80 rounded-2xl px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 appearance-none cursor-pointer"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              required
            >
              <option value="" disabled className="text-slate-500 bg-slate-900">
                -- Select a Club --
              </option>
              {clubs.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* SELECT POST */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Position / Role *
          </label>
          <div className="relative">
            <select
              className="w-full bg-slate-950/80 border border-white/10 focus:border-purple-500/80 rounded-2xl px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 appearance-none cursor-pointer"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            >
              {posts.map((p) => (
                <option key={p} value={p} className="bg-slate-900 text-white">
                  {p}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* INPUT SEATS */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Total Open Seats *
          </label>
          <input
            className="w-full bg-slate-950/80 border border-white/10 focus:border-purple-500/80 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
            type="number"
            min={1}
            placeholder="e.g. 5"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            required
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="md:col-span-2 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.005] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Publishing Openings...</span>
              </>
            ) : (
              <span>Publish Vacancy Spot ✨</span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}