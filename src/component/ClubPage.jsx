import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import profileImg from "../assets/profile.png"; 
import API from "../config/api";
import { clubsByKey } from "../config/clubs";

const clubInfo = {
  ...clubsByKey,
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
      <div className="text-center mt-40 text-xl text-[#101315]">
        Club not found
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden text-white bg-[#101315] dark-grid">
      
      {/* BACKGROUND */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          background: `radial-gradient(circle at 75% 15%, ${club.color}, transparent 35%), linear-gradient(120deg, #101315, #101315 60%)`,
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* HERO */}
        <div className="grid lg:grid-cols-[.8fr_1.2fr] items-center gap-12 mb-28 min-h-[440px]">
          <motion.div initial={{ opacity: 0, scale: .8, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .8 }} className="relative mx-auto lg:mx-0">
            <div className="absolute inset-0 rounded-[3rem] blur-3xl opacity-50" style={{ backgroundColor: club.color }} />
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[3rem] border border-white/20 bg-white/[0.08] backdrop-blur-xl flex items-center justify-center rotate-3 hover:rotate-0 transition duration-700">
              <img src={club.logo} alt={`${club.name} logo`} className="w-48 h-48 object-contain drop-shadow-2xl -rotate-3" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .15 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs uppercase tracking-[.2em] mb-8 transition"><ArrowLeft size={15} /> All clubs</Link>
            <p className="uppercase tracking-[.25em] text-xs font-bold mb-5" style={{ color: club.color }}>Explore the community</p>
            <h1 className="display-font text-5xl sm:text-7xl font-bold leading-none" style={{ color: club.color }}>{club.name}</h1>
            <p className="mt-6 text-xl text-white/70 max-w-2xl leading-relaxed">{club.shortDescription}</p>
            <div className="flex items-center gap-3 mt-8 text-sm text-white/50"><span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: club.color }} /> Click a member to discover their story</div>
          </motion.div>
        </div>

        {/* ABOUT */}
        <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 mb-32">
          <div className="bg-white/[0.06] backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-white/10">
            <p className="text-xs uppercase tracking-[.22em] text-white/40 mb-5">01 / The idea</p>
            <h2 className="display-font text-4xl md:text-5xl font-bold mb-6">About the Club</h2>
            <p className="text-lg leading-loose text-white/70">{club.about}</p>
          </div>
          <div className="rounded-[2rem] p-8 md:p-12 border border-white/10" style={{ background: `linear-gradient(135deg, ${club.color}22, rgba(255,255,255,.04))` }}>
            <p className="text-xs uppercase tracking-[.22em] text-white/40 mb-5">02 / The energy</p>
            <h3 className="display-font text-4xl md:text-5xl font-bold mb-8">Key Activities</h3>
            <ul className="grid sm:grid-cols-2 gap-4 text-white/80">
              {club.activities.map((activity, index) => (
                <li key={activity} className="flex items-center gap-3 border-b border-white/10 pb-3" style={{ borderColor: `${club.color}55` }}>
                  <span className="text-xs font-bold" style={{ color: club.color }}>0{index + 1}</span>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ⏳ SKELETON UI LOADING STATE */}
        {loading ? (
          <>
            {/* Presidential Team Skeleton */}
            <h2 className="display-font text-4xl md:text-5xl font-bold mb-14">Presidential Team</h2>
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
            <h2 className="display-font text-4xl md:text-5xl font-bold mb-12">Active Members</h2>
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
            <div className="flex items-end justify-between mb-14"><div><p className="text-xs uppercase tracking-[.22em] text-white/40 mb-3">The people behind it</p><h2 className="display-font text-4xl md:text-5xl font-bold">Presidential Team</h2></div><ArrowUpRight className="text-white/30 hidden sm:block" size={34} /></div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-36">
              {team.map((member, i) => (
                <motion.div key={i} whileHover={{ scale: 1.08, rotateY: 8 }}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer bg-white/[0.06] backdrop-blur-xl rounded-[1.5rem] p-7 text-left border border-white/10 hover:border-white/30 hover:-translate-y-2 transition duration-500">

                  <img src={getImage(member.photo)}
                    className="w-28 h-28 rounded-2xl mx-auto mb-5 object-cover" />

                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.role}</p>
                  <p className="text-sm mt-2">{member.course}</p>
                  <p className="text-sm">{member.branch}</p>
                  <p className="text-sm">{member.year}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex items-end justify-between mt-32 mb-12"><div><p className="text-xs uppercase tracking-[.22em] text-white/40 mb-3">The wider circle</p><h2 className="display-font text-4xl md:text-5xl font-bold">Active Members</h2></div></div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {members.map((member, i) => (
                <motion.div key={i} whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer bg-white/[0.05] rounded-[1.25rem] p-6 text-left border border-white/10 hover:border-white/30 hover:-translate-y-1 transition duration-500">

                  <img src={getImage(member.photo)}
                    className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover" />

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
            className="relative bg-[#171b1d] backdrop-blur-2xl border border-white/20 rounded-[2rem] p-10 w-[90%] max-w-md text-center shadow-2xl">

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