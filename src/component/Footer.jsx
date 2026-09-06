import React from "react";
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Phone,
  Mail,
} from "lucide-react";

import tejasLogo from "../assets/tejas.png";
import invertisLogo from "../assets/future.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0d1011] text-gray-300 dark-grid">

      {/* 🌌 Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* 🌈 Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e86f3d] to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-14">

        {/* 🧠 Brand Section */}
        <div className="space-y-5">
          {/* Tejas Logo */}
          <img src={tejasLogo} alt="Tejas Logo" className="h-16 w-16 mb-2" />

          <h2 className="display-font text-3xl font-bold tracking-wide text-[#e86f3d]">
            Tejas – The Dreamers Club
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-sm">
            Tejas – The Dreamers Club of Future University.
            Where creativity, innovation & passion grow beyond classrooms.
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Mail size={16} />
            tejas@futureuniversity.ac.in
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Phone size={16} />
            +91 7524917394
          </div>
        </div>

        {/* 🧭 Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {["Home", "About", "Gallery", "Events", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={item === "Events" ? "/events" : `#${item.toLowerCase()}`}
                  className="group inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 🌐 Social Media */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">
            Follow Us
          </h3>

          <div className="flex gap-5 flex-wrap">
            {[
              { icon: Phone, link: "https://wa.me/7524917394" },
              { icon: Instagram, link: "https://www.instagram.com/tejas_invertisuniversity/" },
              { icon: Facebook, link: "https://www.facebook.com/profile.php?id=100078066442257" },
              { icon: Twitter, link: "https://x.com/InvertisUni" },
              { icon: Linkedin, link: "https://www.linkedin.com/school/invertisuniversity/posts/?feedView=all" },
            ].map(({ icon: Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition"
              >
                <Icon
                  size={20}
                  className="text-gray-400 group-hover:text-orange-400 transition"
                />
                {/* Glow Ring */}
                <span className="absolute inset-0 rounded-xl bg-orange-500/20 opacity-0 group-hover:opacity-100 blur-xl transition"></span>
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-500 max-w-xs">
            Stay connected for events, announcements & creative moments.
          </p>

          {/* Invertis University Logo bigger, visually matching icons */}
          <div className="mt-4 flex justify-center">
            <img src={invertisLogo} alt="Future University Logo" className="h-40 w-auto" />
          </div>
        </div>
      </div>

      {/* 🔻 Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tejas – The Dreamers Club, Future University
        <span className="block mt-1 text-gray-600">
          Designed & Developed by 
          <a
            href="https://alphaaryx.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e86f3d] hover:underline inline-flex items-center"
          >
            AlphaAryX (Aryan)
          </a>
        </span>
      </div>
    </footer>
  );
}
