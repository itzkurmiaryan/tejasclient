import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { clubs as clubCatalog } from "../config/clubs";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeClub, setActiveClub] = useState("All");

  // NEW STATES
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/events`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch events");

      const data = await res.json();

      setEvents(data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const clubs = ["All", ...clubCatalog.map((club) => club.name)];

  const filteredEvents =
    activeClub === "All"
      ? events
      : events.filter((e) => e.club === activeClub);

  return (
    <>
      <section className="bg-[#101315] dark-grid text-white min-h-screen py-24 px-6 relative overflow-hidden">

        <p className="text-center text-[#c7d96b] uppercase tracking-[.25em] text-xs font-bold mb-5">Moments worth showing up for</p>
        <h1 className="display-font text-5xl md:text-7xl font-bold text-center mb-10">
          College{" "}
          <span className="text-[#e86f3d]">
            Events
          </span>
        </h1>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-2 mb-20">
          {clubs.map((club) => (
            <button
              key={club}
              onClick={() => setActiveClub(club)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300
              ${
                activeClub === club
                  ? "bg-[#e86f3d] border-[#e86f3d] text-white shadow-lg scale-105"
                  : "bg-white/5 border-white/10 hover:bg-white/15"
              }`}
            >
              {club}
            </button>
          ))}
        </div>

        {/* ERROR */}
        {error && (
          <div className="max-w-xl mx-auto text-center mb-12">

            <div className="bg-red-500/20 border border-red-500 rounded-xl p-6">

              <p className="text-red-300 mb-5">{error}</p>

              <button
                onClick={fetchEvents}
                className="flex items-center gap-2 mx-auto bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-2 rounded-full"
              >
                <RefreshCw size={18} />
                Retry
              </button>

            </div>

          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="max-w-7xl mx-auto space-y-20">

            {[1, 2, 3].map((item) => (
              <SkeletonCard key={item} />
            ))}

          </div>
        )}

        {/* EVENTS */}
        {!loading && !error && (
          <div className="max-w-7xl mx-auto space-y-28">

            {filteredEvents.length === 0 ? (
              <div className="text-center text-gray-400 text-xl">
                No events found.
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <EventRow
                  key={event._id || index}
                  event={event}
                  onImageClick={setPreviewImage}
                />
              ))
            )}

          </div>
        )}

      </section>

      {/* IMAGE PREVIEW */}

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
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            className="max-h-[90vh] max-w-[90vw] rounded-3xl"
          />
        </motion.div>
      )}
    </>
  );
}
/* ===========================
   PREMIUM SKELETON CARD
=========================== */

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl p-8">

      {/* shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* title */}
      <div className="h-8 w-72 bg-white/10 rounded-lg animate-pulse mb-5"></div>

      {/* club */}
      <div className="h-5 w-40 bg-white/10 rounded animate-pulse mb-6"></div>

      {/* description */}
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-white/10 rounded animate-pulse"></div>
        <div className="h-4 bg-white/10 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
      </div>

      {/* highlights */}
      <div className="flex gap-3 flex-wrap mb-8">
        {[1,2,3,4].map(i=>(
          <div
            key={i}
            className="h-8 w-24 rounded-full bg-white/10 animate-pulse"
          />
        ))}
      </div>

      {/* images */}
      <div className="flex gap-6 overflow-hidden">

        {[1,2,3].map(i=>(
          <div
            key={i}
            className="w-80 h-48 rounded-3xl bg-white/10 animate-pulse flex-shrink-0"
          />
        ))}

      </div>

    </div>
  );
}


/* ===========================
        EVENT ROW
=========================== */

function EventRow({ event, onImageClick }) {

  const sliderRef = useRef(null);

  const scrollLeft = () =>
    sliderRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });

  const scrollRight = () =>
    sliderRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });

  const now = new Date();
  const eventDate = new Date(event.date);

  const isUpcoming = eventDate > now;
  const isExpired = eventDate < now;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5 }}
      whileHover={{
        rotateX: 4,
        rotateY: -4,
        scale: 1.01,
      }}
      className="relative bg-white/[0.06] backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl border border-white/10
      hover:shadow-[0_0_40px_rgba(232,111,61,0.28)] hover:border-white/25
      transition-all duration-500"
    >

      {/* HEADER */}

      <div className="mb-8">

        <div className="flex flex-wrap items-center gap-4">

          <h2 className="display-font text-3xl md:text-5xl font-bold flex items-center gap-3">

            {event.name}

            {isUpcoming && (
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500">
                Upcoming
              </span>
            )}

            {isExpired && (
              <span className="px-3 py-1 rounded-full text-xs bg-red-500">
                Previous
              </span>
            )}

          </h2>

          {event.date && (
            <span className="px-4 py-1 rounded-full text-sm bg-[#c7d96b] text-[#101315] font-semibold">

              {eventDate.toLocaleDateString("en-IN",{
                day:"numeric",
                month:"short",
                year:"numeric",
              })}

            </span>
          )}

        </div>

        <p className="text-[#e86f3d] mt-3 font-semibold">
          {event.club}
        </p>

        <p className="text-gray-300 mt-5 leading-7 max-w-4xl">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-3 mt-5">

          {event.highlights?.map((item,index)=>(
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-white/10 text-sm"
            >
              {item}
            </span>
          ))}

        </div>

      </div>
            {/* IMAGE SLIDER */}
      <div className="relative group">

        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10
          bg-black/60 p-3 rounded-full
          opacity-0 group-hover:opacity-100
          transition"
        >
          <ChevronLeft size={28} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide px-10 pb-4 scroll-smooth"
        >
          {event.images?.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06 }}
              className="relative flex-shrink-0
              w-80 h-48 rounded-[1.25rem] overflow-hidden
              cursor-pointer group"
            >
              <img
                src={img}
                alt={`${event.name} ${i + 1}`}
                loading="lazy"
                decoding="async"
                onClick={() => onImageClick(img)}
                className="w-full h-full object-cover
                transition duration-500
                group-hover:scale-110"
              />

              <div
                className="absolute inset-0
                bg-black/50
                opacity-0
                group-hover:opacity-100
                flex items-center justify-center
                transition"
              >
                <button
                  onClick={() => onImageClick(img)}
                  className="px-4 py-2 rounded-full
                  bg-gradient-to-r
                  from-orange-500
                  to-pink-500
                  font-semibold"
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
          bg-black/60 p-3 rounded-full
          opacity-0 group-hover:opacity-100
          transition"
        >
          <ChevronRight size={28} />
        </button>

      </div>

    </motion.div>
  );
}