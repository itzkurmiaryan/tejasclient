import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import API from "../config/api";
import VacancySection from "./VacancySection";

/* ===== CLUB LOGOS ===== */
import panache from "../assets/panache.png";
import rockon from "../assets/rockon.png";
import itech from "../assets/itech.png";
import images from "../assets/images.png";
import stride from "../assets/stride.png";
import mfactor from "../assets/mfactor.png";
import responsible from "../assets/tri.png";

/* ===== CLUB DATA ===== */
const clubsData = [
  { name: "Panache – The Arts Club", logo: panache, email: "panache@gmail.com" },
  { name: "Rock On – The Cultural Club", logo: rockon, email: "rockon@gmail.com" },
  { name: "I-Tech – The Technical Club", logo: itech, email: "itech@gmail.com" },
  { name: "Images – The Publication Club", logo: images, email: "images@gmail.com" },
  { name: "Stride – The Sports Club", logo: stride, email: "stride@gmail.com" },
  { name: "M-Factor – The Management Club", logo: mfactor, email: "mfactor@gmail.com" },
  { name: "The Responsible Invertian – The Social Cause Club", logo: responsible, email: "responsible@gmail.com" }
];

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

  const selectedClub = clubsData.find(c => c.name === formData.club);
  const otherClubs = clubsData.filter(c => c.name !== formData.club);

  // INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ SAVE TO DB
      const res = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("DB Error");

      // ✅ EMAIL
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
      alert("❌ Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (

    // ❗ CHANGE 1: flex remove kiya (warna vacancy center me aa jaati)
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-50 to-pink-100 px-4 py-10 relative overflow-hidden">

      {/* ✅ ADD: Vacancy Section TOP pe */}
      <VacancySection />

      {/* ❗ CHANGE 2: form ko center karne ke liye alag wrapper */}
      <div className="flex items-center justify-center">


        {/* 🔥 PREMIUM LOADING ANIMATION */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
            >
              <div className="relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]">

                {/* CENTER CLUB */}
                {selectedClub && (
                  <motion.img
                    src={selectedClub.logo}
                    className="absolute left-1/2 top-1/2 w-28 sm:w-36 z-20"
                    style={{ transform: "translate(-50%, -50%)" }}
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
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
                      className="absolute w-14"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                      }}
                      animate={{
                        x: Math.cos(rad) * radius,
                        y: Math.sin(rad) * radius,
                        scale: [1, 0.8, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  );
                })}

                <motion.p
                  className="absolute -bottom-16 w-full text-center text-white"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity }}
                >
                  Submitting Application...
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* FORM / SUCCESS */}
        <AnimatePresence>
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg flex flex-col gap-4"
            >
              <h2 className="text-3xl font-bold text-center text-purple-700">
                Join Abhiruchi
              </h2>

              {[
                "name","course","branch","year",
                "studentId","skills","instagram","phone","email"
              ].map((field, i) => (
                <input
                  key={i}
                  required
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.toUpperCase()}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border-b-2 border-gray-300 focus:border-pink-500 outline-none py-2"
                />
              ))}

              <select
                name="club"
                required
                value={formData.club}
                onChange={handleChange}
                className="border-b-2 border-gray-300 py-2"
              >
                <option value="">Select Club</option>
                {clubsData.map((c, i) => (
                  <option key={i}>{c.name}</option>
                ))}
              </select>

              <button className="mt-3 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                Submit
              </button>
            </motion.form>
          ) : (
            <motion.div className="bg-white p-8 rounded-3xl text-center">
              {selectedClub && (
                <img src={selectedClub.logo} className="w-24 mx-auto mb-4" />
              )}
              <h2 className="text-3xl font-bold text-green-600">
                Application Submitted 🎉
              </h2>
              <p className="mt-3">
                Welcome to <b>{selectedClub?.name}</b>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div> {/* ✅ wrapper close */}

    </div>
  );
};

export default JoinUs;