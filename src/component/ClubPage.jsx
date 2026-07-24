import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

import rockonLogo from "../assets/rockon.png";
import panacheLogo from "../assets/panache.png";
import itechLogo from "../assets/itech.png";
import imagesLogo from "../assets/images.png";
import strideLogo from "../assets/stride.png";
import mfactorLogo from "../assets/mfactor.png";
import triLogo from "../assets/tri.png";
import profileImg from "../assets/profile.png"; 
import API from "../config/api";

const clubInfo = {
  rockon: {
    title: "Rock On",
    logo: rockonLogo,
    color: "#fb7185",
    tagline: "Feel the rhythm. Own the stage.",
    about: "Rock On Club is the cultural heartbeat of Abhiruchi.",
  },
  panache: {
    title: "Panache",
    logo: panacheLogo,
    color: "#a855f7",
    tagline: "Art beyond imagination.",
    about: "Panache focuses on art.",
  },
  itech: {
    title: "I-Tech",
    logo: itechLogo,
    color: "#22d3ee",
    tagline: "Innovate. Build. Lead.",
    about: "I-Tech promotes coding.",
  },
  images: {
    title: "Images",
    logo: imagesLogo,
    color: "#fbbf24",
    tagline: "Stories that stay forever.",
    about: "Images handles media.",
  },
  stride: {
    title: "Stride",
    logo: strideLogo,
    color: "#34d399",
    tagline: "Strength. Speed. Spirit.",
    about: "Stride promotes sports.",
  },
  mfactor: {
    title: "M-Factor",
    logo: mfactorLogo,
    color: "#8b5cf6",
    tagline: "Lead with impact.",
    about: "M-Factor builds leadership.",
  },
  tri: {
    title: "The Responsible Invertian",
    logo: triLogo,
    color: "#fb923c",
    tagline: "Serve beyond self.",
    about: "TRI focuses on social work.",
  },
};

export default function ClubPage() {
  const { clubName } = useParams();
  const club = clubInfo[clubName];

  const [team, setTeam] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ SAFE IMAGE FUNCTION
  const getImage = (photo) => {
    if (!photo) return profileImg;
    if (photo.startsWith("http")) return photo;
    if (photo.startsWith("/uploads")) {
      return `${API.replace("/api", "")}${photo}`;
    }
    return `${API.replace("/api", "")}/uploads/${photo}`;
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API}/members`);
        const data = await res.json();

        const clubData = data.filter(
          (m) => m.club?.toLowerCase().replace(/\s/g, "") === clubName
        );

        setTeam(clubData.filter((m) => m.type === "team"));
        setMembers(clubData.filter((m) => m.type === "member"));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
    window.scrollTo({ top: 0 });
  }, [clubName]);

  if (!club) {
    return (
      <div className="text-center mt-40 text-xl text-white">
        Club not found
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden text-white noise-bg">
      
      {/* BACKGROUND */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          background: `linear-gradient(120deg, ${club.color}, #000 60%)`,
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32">

        {/* HERO */}
        <div className="text-center mb-36">
          <img src={club.logo} className="w-44 mx-auto mb-8" />
          <h1 className="text-6xl md:text-7xl font-extrabold" style={{ color: club.color }}>
            {club.title}
          </h1>
          <p className="mt-4 text-xl text-gray-200">{club.tagline}</p>
        </div>

        {/* ABOUT */}
        <div className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-16 mb-36 border border-white/20">
          <h2 className="text-4xl font-bold mb-6">About the Club</h2>
          <p className="text-lg leading-loose">{club.about}</p>
        </div>

        {/* ⏳ SKELETON UI LOADING STATE */}
        {loading ? (
          <>
            {/* Presidential Team Skeleton */}
            <h2 className="text-4xl font-bold mb-20 text-center">Presidential Team</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-36">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center animate-pulse flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full bg-white/10 mb-4" />
                  <div className="h-5 bg-white/10 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
                  <div className="h-3 bg-white/10 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-white/10 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                </div>
              ))}
            </div>

            {/* Active Members Skeleton */}
            <h2 className="text-4xl font-bold mb-16 text-center">Active Members</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center animate-pulse flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 mb-3" />
                  <div className="h-4 bg-white/10 rounded w-4/5 mb-3" />
                  <div className="h-3 bg-white/10 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-white/10 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                </div>
              ))}
            </div>
          </>
        ) : (
          /* 🚀 REAL DATA STATE */
          <>
            <h2 className="text-4xl font-bold mb-20 text-center">Presidential Team</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-36">
              {team.map((member, i) => (
                <motion.div key={i} whileHover={{ scale: 1.08, rotateY: 8 }}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20">

                  <img src={getImage(member.photo)}
                    className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" />

                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.role}</p>
                  <p className="text-sm mt-2">{member.course}</p>
                  <p className="text-sm">{member.branch}</p>
                  <p className="text-sm">{member.year}</p>
                </motion.div>
              ))}
            </div>

            <h2 className="text-4xl font-bold mb-16 text-center">Active Members</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {members.map((member, i) => (
                <motion.div key={i} whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer bg-white/10 rounded-2xl p-6 text-center border border-white/20">

                  <img src={getImage(member.photo)}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />

                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm">{member.course}</p>
                  <p className="text-sm">{member.branch}</p>
                  <p className="text-sm">{member.year}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {selectedMember && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
          onClick={() => setSelectedMember(null)}>

          <motion.div onClick={(e) => e.stopPropagation()}
            className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 w-[90%] max-w-md text-center">

            <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6">
              <X size={28} />
            </button>

            <img src={getImage(selectedMember.photo)}
              className="w-36 h-36 rounded-full mx-auto mb-6 object-cover border-4 border-white/30" />

            <h2 className="text-2xl font-bold">{selectedMember.name}</h2>

            <p className="text-sm text-gray-300 mt-1">{selectedMember.role}</p>

            <div className="mt-6 space-y-2">
              <p>🎓 {selectedMember.course}</p>
              <p>📘 {selectedMember.branch}</p>
              <p>📅 {selectedMember.year}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}