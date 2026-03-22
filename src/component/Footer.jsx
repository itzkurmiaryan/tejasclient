import React from "react";
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Phone,
  Mail,
} from "lucide-react";

import abhiruchiLogo from "../assets/abhiruchi1.png";
import invertisLogo from "../assets/invertis.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0b0f1a] text-gray-300">

      {/* 🌌 Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* 🌈 Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-14">

        {/* 🧠 Brand Section */}
        <div className="space-y-5">
          {/* Abhiruchi Logo */}
          <img src={abhiruchiLogo} alt="Abhiruchi Logo" className="h-16 w-16 mb-2" />

          <h2 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            Abhiruchi
          </h2>

          <p className="text-gray-400 leading-relaxed max-w-sm">
            Abhiruchi – The Hobby Club of Invertis University.  
            Where creativity, innovation & passion grow beyond classrooms.
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Mail size={16} />
            abhiruchi@invertisuniversity.ac.in
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
              { icon: Instagram, link: "https://www.instagram.com/abhiruchi_invertisuniversity/" },
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
            <img src={invertisLogo} alt="Invertis University Logo" className="h-20 w-auto" />
          </div>
        </div>
      </div>

      {/* 🔻 Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Abhiruchi – The Hobby Club, Invertis University
        <span className="block mt-1 text-gray-600">
          Designed & Developed by <span className="text-orange-400">AlphaAryx (Aryan)</span>
        </span>
      </div>
    </footer>
  );
}
