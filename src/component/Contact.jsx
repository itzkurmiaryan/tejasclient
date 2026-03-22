import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

/* ===== CLUB LOGOS ===== */
import panache from "../assets/panache.png";
import rockon from "../assets/rockon.png";
import itech from "../assets/itech.png";
import images from "../assets/images.png";
import stride from "../assets/stride.png";
import mfactor from "../assets/mfactor.png";
import responsible from "../assets/tri.png";
import API from "../config/api";


const clubLogos = [panache, rockon, itech, images, stride, mfactor, responsible];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);

  try {
    // 1️⃣ SAVE TO BACKEND (MongoDB)
    await fetch(`${API}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // 2️⃣ SEND EMAIL (EmailJS)
    await emailjs.send(
      "service_3eggz79",
      "template_mwc7olk",
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      },
      "v0cKW4tBmTPXbvdBl"
    );

    setSent(true);
    setFormData({ name: "", email: "", message: "" });

  } catch (error) {
    alert("Message failed ❌");
    console.error(error);
  } finally {
    setTimeout(() => setSending(false), 3500);
  }
};

  return (
    <>
      {/* ================= LOADING SCREEN ================= */}
      <AnimatePresence>
        {sending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center"
          >
            <div className="relative w-[420px] h-[420px] flex items-center justify-center">

              {/* ===== GLOWING CENTER RING ===== */}
              <motion.div
                className="absolute w-44 h-44 rounded-full border-4 border-gradient-to-r from-orange-400 via-red-500 to-pink-500 shadow-[0_0_50px_rgba(255,115,0,0.6)]"
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 360, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ===== CENTER TEXT ===== */}
              <motion.h3
                className="absolute text-white text-2xl sm:text-3xl font-bold tracking-widest"
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Sending…
              </motion.h3>

              {/* ===== BIG ORBITING CLUB LOGOS ===== */}
              {clubLogos.map((logo, i) => {
                const angle = (360 / clubLogos.length) * i;
                const radius = 160;
                const rad = (angle * Math.PI) / 180;

                return (
                  <motion.img
                    key={i}
                    src={logo}
                    alt={`Club ${i}`}
                    className="absolute w-20 sm:w-24 rounded-full border-2 border-white/20 shadow-xl"
                    style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                    animate={{
                      x: Math.cos(rad) * radius,
                      y: Math.sin(rad) * radius,
                      scale: [0.9, 1.25, 0.9],
                      rotate: [0, 25, -25, 0],
                      opacity: [0.5, 1, 0.5],
                      filter: [
                        "drop-shadow(0 0 10px #fff)",
                        "drop-shadow(0 0 30px #ff4500)",
                        "drop-shadow(0 0 10px #fff)"
                      ]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.12
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CONTACT SECTION ================= */}
      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-[#0a0a14] via-[#11121f] to-[#1c1c1c] py-28 px-6 text-white"
      >
        {/* Decorative Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
              Let’s Connect
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Got an idea, suggestion or collaboration in mind? We’re just one message away.
          </p>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_0_50px_rgba(255,115,0,0.2)] hover:shadow-[0_0_60px_rgba(255,115,0,0.4)] transition"
          >
            <h3 className="text-3xl font-bold mb-10 text-orange-400">Contact Info</h3>
            <div className="space-y-8">
              <div className="flex items-center gap-5"><Mail className="w-7 h-7 text-orange-400" /> abhiruchi@invertisuniversity.ac.in</div>
              <div className="flex items-center gap-5"><Phone className="w-7 h-7 text-orange-400" /> +91 7524917394</div>
              <div className="flex items-center gap-5"><MapPin className="w-7 h-7 text-orange-400" /> Invertis University, Bareilly, UP</div>
            </div>
          </motion.div>

          {/* Contact Form */}
          {!sent ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 60, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_0_50px_rgba(255,0,0,0.2)] hover:shadow-[0_0_60px_rgba(255,0,0,0.4)] transition relative"
            >
              <h3 className="text-3xl font-bold mb-10 text-red-400">Send Message</h3>
              <div className="space-y-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                ></textarea>
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-orange-500/50 transition disabled:opacity-60"
                >
                  <Send className="w-5 h-5" />
                  {sending ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10 shadow-lg">
              <h2 className="text-4xl font-bold text-green-400 mb-4">Message Sent ✅</h2>
              <p className="text-gray-300">Team Abhiruchi will contact you soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Contact;
