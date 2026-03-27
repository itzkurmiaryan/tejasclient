import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";
import API from "../config/api";

export default function Events() {

  const [events, setEvents] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeClub, setActiveClub] = useState("All");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/events`)
      .then(res => res.json())
      .then(data => {
        if (data?.length > 0) setEvents(data);
      })
      .catch(err => console.log(err));
  }, []);

  const clubs = [
    "All",
    "I-Tech Club",
    "Rock On Club",
    "Stride Club",
    "Panache Club",
    "Images Club",
    "Responsible Invertians",
    "M Factor",
  ];

  const filteredEvents =
    activeClub === "All"
      ? events
      : events.filter((e) => e.club === activeClub);

  return (
    <>
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white min-h-screen py-20 px-6">

        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-10">
          College{" "}
          <span className="bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
            Events
          </span>
        </h1>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {clubs.map((club) => (
            <button
              key={club}
              onClick={() => setActiveClub(club)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300
              ${
                activeClub === club
                  ? "bg-gradient-to-r from-amber-400 to-pink-500 text-black shadow-lg scale-110"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {club}
            </button>
          ))}
        </div>

        {/* EVENTS */}
        <div className="max-w-7xl mx-auto space-y-28">
          {filteredEvents.map((event, index) => (
            <EventRow
              key={event._id || index}
              event={event}
              onImageClick={setPreviewImage}
            />
          ))}
        </div>

      </section>

      {/* 🔥 FULLSCREEN IMAGE VIEW */}
      {previewImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
        >

          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={36} />
          </button>

          <motion.img
            src={previewImage}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-[0_0_60px_rgba(255,115,0,0.6)]"
          />

        </motion.div>
      )}
    </>
  );
}


/* ================= EVENT ROW ================= */

function EventRow({ event, onImageClick }) {

  const sliderRef = useRef(null);

  const scrollLeft = () =>
    sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });

  const scrollRight = () =>
    sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });

  const now = new Date();
  const eventDate = new Date(event.date);

  const isUpcoming = eventDate > now;
  const isExpired = eventDate < now;

  return (
    <motion.div
      whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl 
      hover:shadow-[0_0_40px_rgba(255,115,0,0.5)] transition-all duration-500"
    >

      {/* HEADER */}
      <div className="mb-8">

        <div className="flex flex-wrap items-center gap-4">

          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
            {event.name}

            {/* 🔥 STATUS BADGES */}
            {isUpcoming && (
              <span className="px-3 py-1 text-xs bg-blue-500 rounded-full">
                Upcoming
              </span>
            )}

            {isExpired && (
              <span className="px-3 py-1 text-xs bg-red-500 rounded-full">
                Previous
              </span>
            )}

          </h2>

          {/* 🔥 CLEAN DATE */}
          {event.date && (
            <span className="px-4 py-1 rounded-full text-sm
            bg-gradient-to-r from-amber-400 to-pink-500 text-black">
              {eventDate.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </span>
          )}

        </div>

        <p className="text-amber-400 mt-2">
          {event.club}
        </p>

        <p className="text-gray-300 mt-4 max-w-3xl">
          {event.description}
        </p>

        {/* HIGHLIGHTS */}
        <div className="flex flex-wrap gap-3 mt-4">
          {event.highlights?.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-white/10 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>

      </div>

      {/* SLIDER */}
      <div className="relative group">

        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10
          bg-black/60 p-3 rounded-full opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={28} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-scroll scrollbar-hide px-10 pb-4"
        >
          {event.images?.map((img, i) => (

            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="relative flex-shrink-0 w-80 h-48 rounded-3xl overflow-hidden cursor-pointer group"
            >

              <img
                src={img}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />

              {/* 🔥 OVERLAY VIEW BUTTON */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">

                <button
                  onClick={() => onImageClick(img)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full font-semibold"
                >
                  👁 View
                </button>

              </div>

            </motion.div>

          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10
          bg-black/60 p-3 rounded-full opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={28} />
        </button>

      </div>

    </motion.div>
  );
}