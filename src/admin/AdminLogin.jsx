import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import tejasLogo from "../assets/tejas.png";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [launch, setLaunch] = useState(false); // rocket animation
  const [showOverlay, setShowOverlay] = useState(false); // blur + overlay

  const navigate = useNavigate();

  // TYPEWRITER EFFECT
  const fullText = "Secure Admin Access...";
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isAdmin", "true");

      // START animation
      setShowOverlay(true);
      setLaunch(true);

      // 5 sec animation + redirect
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 5000);
    } else {
      alert("Wrong credentials ❌");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">

      {/* BACKGROUND PARTICLES */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
          style={{ top: Math.random() * 100 + "%", left: Math.random() * 100 + "%" }}
        />
      ))}

      {/* GLOW BLOBS */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/30 blur-3xl rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-pink-500/30 blur-3xl rounded-full bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* SCAN LINE */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.05),transparent)] animate-[scan_4s_linear_infinite]" />

      {/* OVERLAY FOR BLUR + LAUNCH */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 backdrop-blur-xl flex items-center justify-center flex-col gap-4"
          >
            {/* Rocket animation */}
            <motion.img
              src={tejasLogo}
              alt="Rocket"
              className="w-24 h-24"
              initial={{ y: 0, scale: 1, rotate: 0 }}
              animate={{ y: -500, scale: 0.5, rotate: 720 }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />

            {/* Loading text */}
            <motion.h2
              className="text-2xl font-bold text-orange-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
            >
              Launching Admin Panel...
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN FORM */}
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, scale: 0.7, rotateX: 30 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ rotateY: 5, rotateX: 5 }}
        className={`relative z-10 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 w-[360px] transition-all ${
          showOverlay ? "blur-xl pointer-events-none" : ""
        }`}
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Admin Login
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-mono">
            {text}<span className="animate-pulse">|</span>
          </p>
        </div>

        {/* USERNAME */}
        <div className="relative mb-5">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-orange-500 outline-none transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/40 border border-white/10 focus:ring-2 focus:ring-pink-500 outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={() => setShow(!show)} className="absolute right-3 top-3 cursor-pointer text-gray-400">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-orange-500 to-pink-600 shadow-lg overflow-hidden"
        >
          <span className="relative z-10">🚀 Login</span>
          <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition"></span>
        </motion.button>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-xs mt-6">
          ⚡ Powered by AlphaAryX System
        </p>
      </motion.form>
    </div>
  );
}