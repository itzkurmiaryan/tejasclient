import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import API from "../config/api";
import VacancySection from "./VacancySection";
import { clubsData } from "../config/clubs";

/* ===== CLUB LOGOS ===== */

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    branch: "",
    year: "",
    studentId: "",
    club: "",
    phone: "",
    email: "",
    skills: "",
    instagram: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ===== CURSOR MOUSE POSITION FOR AMBIENT GLOW ===== */
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const selectedClub = clubsData.find((c) => c.name === formData.club);
  const otherClubs = clubsData.filter((c) => c.name !== formData.club);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // SAVE TO DB
      const res = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("DB Error");

      // EMAIL
      if (selectedClub) {
        await emailjs.send(
          "service_maakix5",
          "template_trfcjfd",
          {
            to_email: selectedClub.email,
            student_name: formData.name,
            student_course: formData.course,
            student_branch: formData.branch,
            student_year: formData.year,
            student_id: formData.studentId,
            student_phone: formData.phone,
            student_email: formData.email,
            student_skills: formData.skills,
            student_instagram: formData.instagram,
            club_name: selectedClub.name
          },
          "v0cKW4tBmTPXbvdBl"
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101315] text-white px-4 py-16 md:py-24 relative overflow-hidden font-sans selection:bg-[#c7d96b] selection:text-[#101315] dark-grid">
      {/* 1. MOUSE FOLLOW AMBIENT LIGHT */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 111, 61, 0.14), transparent 80%)`
        }}
      />

      {/* 2. DYNAMIC GRID BACKGROUND OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff09_1px,transparent_1px),linear-gradient(to_bottom,#ffffff09_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 3. MULTI-LAYER NEON BACKGROUND BLURS */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#e86f3d]/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#c7d96b]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#e86f3d]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* VACANCY SECTION AT TOP */}
      <VacancySection />

      {/* 4. FLOATING CLUB BADGES BANNER */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-10 overflow-hidden py-2 mask-linear-gradient">
        <div className="flex gap-3 justify-center flex-wrap">
          {clubsData.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all duration-300 cursor-default ${
                formData.club === c.name
                  ? "bg-[#e86f3d]/20 border-[#e86f3d] text-white shadow-lg shadow-[#e86f3d]/20"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200"
              }`}
            >
              <img src={c.logo} alt={c.name} className="w-4 h-4 object-contain" />
              <span className="truncate max-w-[140px] sm:max-w-none">{c.name.split("–")[0]}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MAIN FORM CONTAINER WRAPPER WITH OUTER GLOW */}
      <div className="relative z-10 flex items-center justify-center mt-8">
        {/* FORM CONTAINER AURA EFFECT */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#e86f3d] via-[#c7d96b] to-[#e86f3d] rounded-[36px] blur-xl opacity-20 pointer-events-none" />

        {/* PREMIUM LOADING OVERLAY */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center"
            >
              <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px]">
                {/* CENTER LOGO */}
                {selectedClub && (
                  <motion.img
                    src={selectedClub.logo}
                    className="absolute left-1/2 top-1/2 w-28 sm:w-36 z-20 shadow-2xl p-2 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20"
                    style={{ transform: "translate(-50%, -50%)" }}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* ROTATING CLUBS */}
                {otherClubs.map((club, i) => {
                  const angle = (360 / otherClubs.length) * i;
                  const radius = 150;
                  const rad = (angle * Math.PI) / 180;

                  return (
                    <motion.img
                      key={i}
                      src={club.logo}
                      className="absolute w-12 h-12 object-contain p-1 rounded-xl bg-white/5 border border-white/10"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                      }}
                      animate={{
                        x: Math.cos(rad) * radius,
                        y: Math.sin(rad) * radius,
                        scale: [0.8, 1, 0.8],
                        opacity: [0.4, 0.9, 0.4]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}

                <motion.p
                  className="absolute -bottom-12 w-full text-center text-sm font-bold tracking-widest text-purple-300 uppercase"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  Submitting Application...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FORM / SUCCESS CARD (EXACT ORIGINAL FORM STYLING PRESERVED) */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl bg-white/[0.07] backdrop-blur-2xl border border-white/15 p-8 sm:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#e86f3d] via-[#c7d96b] to-[#e86f3d]" />

              <div className="text-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#c7d96b]/10 border border-[#c7d96b]/20 text-[#c7d96b]">
                  Registration Form
                </span>
                <h2 className="display-font text-4xl sm:text-6xl font-bold mt-4">
                  Join <span className="text-[#e86f3d]">Tejas</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Fill out your details to become an official member
                </p>
              </div>

              {/* GRID FORM LAYOUT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* FULL NAME */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Full Name *</label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/25 border border-white/10 focus:border-[#e86f3d]/80 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#e86f3d]/20 text-white placeholder-white/35"
                  />
                </div>

                {/* STUDENT ID */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Student ID *</label>
                  <input
                    required
                    type="text"
                    name="studentId"
                    placeholder="2024101001"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="w-full bg-black/25 border border-white/10 focus:border-[#e86f3d]/80 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#e86f3d]/20 text-white placeholder-white/35"
                  />
                </div>

                {/* COURSE */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Course *</label>
                  <input
                    required
                    type="text"
                    name="course"
                    placeholder="B.Tech / BCA / MBA"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-purple-500/80 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500"
                  />
                </div>

                {/* BRANCH */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Branch *</label>
                  <input
                    required
                    type="text"
                    name="branch"
                    placeholder="CSE / ECE / Finance"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-purple-500/80 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500"
                  />
                </div>

                {/* YEAR */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Academic Year *</label>
                  <input
                    required
                    type="text"
                    name="year"
                    placeholder="1st / 2nd / 3rd / 4th"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-purple-500/80 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500"
                  />
                </div>

                {/* PHONE */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-300">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-purple-500/80 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500"
                  />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Email Address *</label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="student@invertis.org"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-purple-500/80 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500"
                  />
                </div>

                {/* CLUB SELECTION */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Select Club *</label>
                  <select
                    name="club"
                    required
                    value={formData.club}
                    onChange={handleChange}
                    className="w-full bg-[#171b1d] border border-white/10 focus:border-[#e86f3d]/80 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#e86f3d]/20 text-white"
                  >
                    <option value="" className="bg-slate-900 text-slate-400">
                      -- Choose a Club --
                    </option>
                    {clubsData.map((c, i) => (
                      <option key={i} value={c.name} className="bg-slate-900 text-white">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SKILLS */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Skills / Interests *</label>
                  <input
                    required
                    type="text"
                    name="skills"
                    placeholder="e.g. Graphic Design, Video Editing, Anchoring, Public Speaking"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-purple-500/80 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500"
                  />
                </div>

                {/* INSTAGRAM */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300">Instagram Handle (Optional)</label>
                  <input
                    type="text"
                    name="instagram"
                    placeholder="@yourusername"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full bg-slate-900/60 border border-white/10 focus:border-purple-500/80 rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="w-full mt-8 py-4 rounded-xl bg-[#e86f3d] text-white font-extrabold text-sm shadow-lg hover:bg-[#f18452] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
              >
                Submit Application
              </button>
            </motion.form>
          ) : (
            /* SUCCESS STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl text-center max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500" />

              {selectedClub && (
                <div className="w-24 h-24 mx-auto mb-6 p-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md shadow-xl flex items-center justify-center">
                  <img src={selectedClub.logo} alt={selectedClub.name} className="w-full h-full object-contain" />
                </div>
              )}

              <h2 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                Application Submitted! 🎉
              </h2>

              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Thank you for applying. Your response has been registered for <br />
                <b className="text-white font-semibold">{selectedClub?.name}</b>.
              </p>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    course: "",
                    branch: "",
                    year: "",
                    studentId: "",
                    club: "",
                    phone: "",
                    email: "",
                    skills: "",
                    instagram: ""
                  });
                }}
                className="mt-8 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all"
              >
                Submit Another Application
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JoinUs;