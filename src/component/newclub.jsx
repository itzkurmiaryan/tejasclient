import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

/* LOGOS */
import rockonLogo from "../assets/rockon.png";
import panacheLogo from "../assets/panache.png";
import itechLogo from "../assets/itech.png";
import imagesLogo from "../assets/images.png";
import strideLogo from "../assets/stride.png";
import mfactorLogo from "../assets/mfactor.png";
import triLogo from "../assets/tri.png";

/* IMAGES */
import profileImg from "../assets/profile.png";
import sp from "../assets/stride/p.png";

import Riddhima from "../assets/images/1.jpg";
import Nitin from "../assets/images/2.jpg";
import Harshdeep from "../assets/images/3.jpg";
import Shagun from "../assets/images/4.jpg";
import Eshan from "../assets/images/5.jpg";
import Jessica from "../assets/images/6.jpg";
import Kavya from "../assets/images/7.jpg";
import Sukhman from "../assets/images/8.jpg";
import Yuvika from "../assets/images/a.jpg";
import Vishesh from "../assets/images/b.jpg";
import Khushi from "../assets/images/c.jpg";
import Shreya from "../assets/images/d.jpg";
import Vinayak from "../assets/images/e.jpg";

/* ================== CLUB DATA ================== */

const clubsData = {
  rockon: {
    title: "Rock On",
    logo: rockonLogo,
    color: "#fb7185",
    tagline: "Feel the rhythm. Own the stage.",
    about:
      "Rock On Club is the cultural heartbeat of Abhiruchi. It nurtures talent in music, dance and stage performances.",
    team: [
      {
        role: "President",
        name: "Dipasha Saxena",
        course: "BBA",
        branch: " ",
        year: "3rd Year",
        photo: profileImg,
      },
      {
        role: "Vice President",
        name: "Sneha  Srivastav",
        course: "Btech",
        branch: "Cse",
        year: "3rd Year",
        photo: profileImg,
      },
      {
        role: "Secretary",
        name: "Saudamini Trivedi ",
        course: "BA LLB",
        branch: " ",
        year: "3rd Year",
        photo: profileImg,
      },
      {
        role: "Joint Secretary",
        name: "Akshima Kohli",
        course: "B.A LLB",
        branch: " ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Treasurer",
        name: "Divyansh Shakya",
        course: "B.SC",
        branch: "(Forensic Sc) ",
        year: "2nd Year",
        photo: profileImg,
      },

    ],

    members: [
      { name: "Neha", course: "BA", branch: "Music", year: "2nd Year", photo: profileImg },
      { name: "Amit", course: "B.Tech", branch: "CSE", year: "1st Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
    ],
  },

  panache: {
    title: "Panache",
    logo: panacheLogo,
    color: "#a855f7",
    tagline: "Art beyond imagination.",
    about: "Panache focuses on art, painting and creative crafts.",
    team: [
      {
        role: "President",
        name: "Saloni Rajpoot",
        course: "B.A BED",
        branch: " ",
        year: "3rd Year",
        photo: profileImg,
      },
      {
        role: "Vice President",
        name: "Sayan Biswas",
        course: "Btech",
        branch: "BioTech",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Secretary",
        name: "Akshara Rawat",
        course: "B.Com",
        branch: "Hons ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Joint Secretary",
        name: "Harsh Pratap Singh ",
        course: "BCA",
        branch: " ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Treasurer",
        name: "Shreya Gupta",
        course: "BCA",
        branch: " ",
        year: "2nd Year",
        photo: profileImg,
      },

    ],

    members: [
      { name: "Neha", course: "BA", branch: "Music", year: "2nd Year", photo: profileImg },
      { name: "Amit", course: "B.Tech", branch: "CSE", year: "1st Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
    ],
  },
  itech: {
    title: "I-Tech",
    logo: itechLogo,
    color: "#22d3ee",
    tagline: "Innovate. Build. Lead.",
    about: "I-Tech promotes coding, robotics, AI and innovation culture.",
    team: [
      {
        role: "President",
        name: "Kushal Saxena",
        course: "BTech",
        branch: "CSe ",
        year: "3rd Year",
        photo: profileImg,
      },
      {
        role: "Vice President",
        name: "Mitali Singh",
        course: "BCA",
        branch: "",
        year: "3rd Year",
        photo: profileImg,
      },
      {
        role: "Secretary",
        name: "Deeksha Kshatriya",
        course: "BSc",
        branch: "BioTech ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Joint Secretary",
        name: "Naitik Kashyap ",
        course: "BCA",
        branch: " ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Treasurer",
        name: "Uttkarsh Vashisht",
        course: "BTech",
        branch: "Cse ",
        year: "3rd Year",
        photo: profileImg,
      },

    ],

    members: [
      { name: "Neha", course: "BA", branch: "Music", year: "2nd Year", photo: profileImg },
      { name: "Amit", course: "B.Tech", branch: "CSE", year: "1st Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
    ],
  },
  images: {
    title: "Images",
    logo: imagesLogo,
    color: "#fbbf24",
    tagline: "Stories that stay forever.",
    about: "Images handles media, content and documentation.",
    team: [
      {
        role: "President",
        name: "Yuvika Saxena",
        course: "BA",
        branch: "English(Hons) ",
        year: "2nd Year",
        photo: Yuvika,
      },
      {
        role: "Vice President",
        name: "Vishesh Arora",
        course: "B.A LLB",
        branch: "",
        year: "2nd Year",
        photo: Vishesh,
      },
      {
        role: "Secretary",
        name: "Khushi Saxena",
        course: "BTech",
        branch: "BioTech ",
        year: "3rd Year",
        photo: Khushi,
      },
      {
        role: "Joint Secretary",
        name: "Shreya Verma ",
        course: "BTech",
        branch: "AI ",
        year: "2nd Year",
        photo: Shreya,
      },
      {
        role: "Treasurer",
        name: "Vinayak Varshney",
        course: "BTech",
        branch: "Cse ",
        year: "2nd Year",
        photo: Vinayak,
      },

    ],

    members: [
      { name: "Nitin Patel", course: "BTech", branch: "CSE", year: "1st Year", photo: Nitin },
      { name: "Riddhima", course: "B.Tech", branch: "CSE", year: "1st Year", photo: Riddhima },
      { name: "Harshdeep Singh", course: "BBA", branch: "", year: "1st Year", photo: Harshdeep },
      { name: "SukhmanPreet Kaur", course: "BBA", branch: "", year: "1st Year", photo: Sukhman },
      { name: "Shagun Rai", course: "BA", branch: "Dance", year: "1st Year", photo: Shagun },
      { name: "Eshan Bhardwaj", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: Eshan },
      { name: "Jessica Gupta", course: "Btech", branch: "BioTech", year: "3rd Year", photo: Jessica },
      { name: "Kavya Wadhwa", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: Kavya },
    ],
  },
  stride: {
    title: "Stride",
    logo: strideLogo,
    color: "#34d399",
    tagline: "Strength. Speed. Spirit.",
    about: "Stride promotes sportsmanship and fitness.",
    team: [
      {
        role: "President",
        name: "Deepak Mehra",
        course: "MBA",
        branch: "",
        year: "2nd Year",
        photo: sp,
      },
      {
        role: "Vice President",
        name: "Harshit Pandey ",
        course: "BSC",
        branch: "ZBC",
        year: "3rd Year",
        photo: profileImg,
      },

      {
        role: "Joint Secretary",
        name: "Parul Sengar ",
        course: "BTech",
        branch: "BioTech ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Treasurer",
        name: "Shravani Gautam",
        course: "BBA",
        branch: " ",
        year: "2nd Year",
        photo: profileImg,
      },

    ],

    members: [
      { name: "Neha", course: "BA", branch: "Music", year: "2nd Year", photo: profileImg },
      { name: "Amit", course: "B.Tech", branch: "CSE", year: "1st Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
    ],
  },
  mfactor: {
    title: "M-Factor",
    logo: mfactorLogo,
    color: "#8b5cf6",
    tagline: "Lead with impact.",
    about: "M-Factor builds leadership and management skills.",
    team: [
      {
        role: "President",
        name: "Tejas Sharma",
        course: "BTech",
        branch: "BioTech ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Vice President",
        name: "Aanya Gupta",
        course: "BTech",
        branch: "BioTech",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Secretary",
        name: "Shubhi Shukla",
        course: "BBA",
        branch: "",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Joint Secretary",
        name: "Jayesh Kudesia ",
        course: "BSC",
        branch: "Forensic Sc ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Treasurer",
        name: "Dhruv Kumar",
        course: "BCA",
        branch: "",
        year: "3rd Year",
        photo: profileImg,
      },

    ],

    members: [
      { name: "Neha", course: "BA", branch: "Music", year: "2nd Year", photo: profileImg },
      { name: "Amit", course: "B.Tech", branch: "CSE", year: "1st Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
    ],
  },
  tri: {
    title: "The Responsible Invertian",
    logo: triLogo,
    color: "#fb923c",
    tagline: "Serve beyond self.",
    about: "TRI focuses on social responsibility and welfare.",
    team: [
      {
        role: "President",
        name: "Aarambh Awasthi ",
        course: "BSC Hons ",
        branch: "Agriculture ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Vice President",
        name: "Shrishti Gambhir",
        course: "BCOM",
        branch: "Hons",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Secretary",
        name: "Shreya Rastogi",
        course: "BBA LLB",
        branch: "",
        year: "3rd Year",
        photo: profileImg,
      },
      {
        role: "Joint Secretary",
        name: "Somnath Arora",
        course: "BBA",
        branch: " ",
        year: "2nd Year",
        photo: profileImg,
      },
      {
        role: "Treasurer",
        name: "Abhishek Singh",
        course: "BBA",
        branch: "",
        year: "2nd Year",
        photo: profileImg,
      },

    ],

    members: [
      { name: "Neha", course: "BA", branch: "Music", year: "2nd Year", photo: profileImg },
      { name: "Amit", course: "B.Tech", branch: "CSE", year: "1st Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
      { name: "Riya", course: "BA", branch: "Dance", year: "3rd Year", photo: profileImg },
      { name: "Kunal", course: "B.Com", branch: "Commerce", year: "2nd Year", photo: profileImg },
    ],
  },
};

/* ================== COMPONENT ================== */

export default function ClubPage() {
  const { clubName } = useParams();
  const club = clubsData[clubName];
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!club) {
    return <div className="text-white text-center mt-40 text-xl">Club not found</div>;
  }

  return (
    <section className="relative min-h-screen text-white bg-black">
      {/* SIMPLE BACKGROUND */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(120deg, ${club.color}, #000 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32">
        {/* HERO */}
        <div className="text-center mb-32">
          <img src={club.logo} className="w-40 mx-auto mb-6" />
          <h1 className="text-6xl font-extrabold" style={{ color: club.color }}>
            {club.title}
          </h1>
          <p className="mt-4 text-lg text-gray-200">{club.tagline}</p>
        </div>

        {/* ABOUT */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-14 mb-32 border border-white/20">
          <h2 className="text-3xl font-bold mb-4">About the Club</h2>
          <p className="text-lg">{club.about}</p>
        </div>

        {/* TEAM */}
        <h2 className="text-4xl font-bold mb-20 text-center">Presidential Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-32">
          {club.team.map((m) => (
            <div
              key={m.name}
              onClick={() => setSelectedMember(m)}
              className="cursor-pointer bg-white/10 rounded-3xl p-8 text-center border border-white/20 hover:scale-105 transition"
            >
              <img src={m.photo} loading="lazy" className="w-28 h-28 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-sm text-gray-300">{m.role}</p>
              <p className="text-sm mt-2">{m.course}</p>
              <p className="text-sm">{m.branch}</p>
              <p className="text-sm">{m.year}</p>
            </div>
          ))}
        </div>

        {/* MEMBERS */}
        <h2 className="text-4xl font-bold mb-16 text-center">Active Members</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {club.members.map((m) => (
            <div
              key={m.name}
              onClick={() => setSelectedMember(m)}
              className="cursor-pointer bg-white/10 rounded-2xl p-6 text-center border border-white/20 hover:scale-105 transition"
            >
              <img src={m.photo} loading="lazy" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
              <h4 className="font-semibold">{m.name}</h4>
              <p className="text-sm">{m.course}</p>
              <p className="text-sm">{m.branch}</p>
              <p className="text-sm">{m.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedMember(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-[90%] max-w-md text-center"
          >
            <button onClick={() => setSelectedMember(null)} className="absolute top-5 right-5">
              <X />
            </button>
            <img src={selectedMember.photo} className="w-36 h-36 rounded-full mx-auto mb-6 object-cover" />
            <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
            <p className="mt-4">🎓 {selectedMember.course}</p>
            <p>📘 {selectedMember.branch}</p>
            <p>📅 {selectedMember.year}</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
