import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import API from "../config/api";
import { useNavigate } from "react-router-dom";

export default function UpcomingEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const [loading, setLoading] = useState(true); // ✅ Loading state add ki

  // 🔥 IMAGE VIEWER STATE
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ FETCH EVENTS
  useEffect(() => {
    fetch(`${API}/events/upcoming`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.slice(0, 3));
        setLoading(false); // ✅ Data aate hi loading state false
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Error ke case mein bhi screen block na ho
      });
  }, []);

  // ✅ COUNTDOWN
  useEffect(() => {
    if (loading || events.length === 0) return; // Loading ke time countdown na chale

    const timer = setInterval(() => {
      const now = new Date();
      const updated = {};

      events.forEach((event) => {
        const eventDate = new Date(event.date);
        if (isNaN(eventDate)) return;

        const diff = eventDate - now;

        if (diff <= 0) {
          updated[event._id] = "LIVE";
        } else {
          updated[event._id] = {
            d: Math.floor(diff / (1000 * 60 * 60 * 24)),
            h: Math.floor((diff / (1000 * 60 * 60)) % 24),
            m: Math.floor((diff / (1000 * 60)) % 60),
            s: Math.floor((diff / 1000) % 60),
          };
        }
      });

      setTimeLeft(updated);
    }, 1000);

    return () => clearInterval(timer);
  }, [events, loading]);

  return (
    <section className="py-28 bg-[#101315] text-white relative overflow-hidden dark-grid">
      <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border border-[#e86f3d]/30" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
      <p className="text-center uppercase tracking-[0.25em] text-xs text-[#c7d96b] font-bold mb-4">Make some noise</p>
      <h2 className="display-font text-5xl md:text-7xl text-center mb-16 font-bold">
        Upcoming <span className="text-[#e86f3d]">Events</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-7">
        {loading
          ? // ⏳ SKELETON UI: Jab tak server data load kar raha hai
            [1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 animate-pulse flex flex-col space-y-4"
              >
                {/* Event Title Skeleton */}
                <div className="h-7 bg-white/10 rounded-xl w-3/4"></div>
                {/* Club Name Skeleton */}
                <div className="h-4 bg-orange-500/20 rounded-lg w-1/3"></div>

                {/* Countdown Timer Skeletons */}
                <div className="flex gap-3 pt-2">
                  {[1, 2, 3, 4].map((box) => (
                    <div
                      key={box}
                      className="bg-white/5 h-16 w-16 rounded-xl border border-white/5"
                    ></div>
                  ))}
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 pt-2">
                  <div className="h-3 bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-white/10 rounded w-5/6"></div>
                </div>

                {/* Image Skeleton */}
                <div className="h-44 bg-white/10 rounded-xl w-full pt-2"></div>
              </div>
            ))
          : // 🚀 REAL CARDS: Jab data successfully fetch ho jaye
            events.map((event) => {
              const t = timeLeft[event._id];

              return (
                <Motion.div
                  key={event._id}
                  onClick={() => navigate(`/events/${event._id}`)}
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.07, rotate: 1 }}
                  className="relative p-7 rounded-[1.5rem] bg-white/[0.06] backdrop-blur-xl border border-white/10 cursor-pointer
                  shadow-[0_0_30px_rgba(255,115,0,0.2)]
                  hover:shadow-[0_0_60px_rgba(255,115,0,0.7)]
                  transition-all duration-500 overflow-hidden"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 blur-2xl opacity-0 hover:opacity-100 transition" />

                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 z-10 relative">
                    {event.name}

                    {t === "LIVE" && (
                      <span className="px-3 py-1 text-xs bg-green-500 rounded-full animate-pulse">
                        LIVE
                      </span>
                    )}
                  </h3>

                  <p className="text-orange-400 mb-3">{event.club}</p>

                  {/* COUNTDOWN */}
                  {t && t !== "LIVE" && (
                    <div className="flex gap-3 mt-4">
                      {["d", "h", "m", "s"].map((key) => (
                        <Motion.div
                          key={key}
                          whileHover={{ scale: 1.1 }}
                          className="bg-black/60 px-4 py-3 rounded-xl border border-orange-500/20 text-center w-16"
                        >
                          <AnimatePresence mode="wait">
                            <Motion.span
                              key={t[key]}
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 20, opacity: 0 }}
                              className="text-2xl font-bold text-orange-400 block"
                            >
                              {t[key]}
                            </Motion.span>
                          </AnimatePresence>

                          <span className="text-xs text-gray-400 uppercase">
                            {key}
                          </span>
                        </Motion.div>
                      ))}
                    </div>
                  )}

                  {t === "LIVE" && (
                    <p className="mt-4 text-green-400 animate-pulse">
                      Event is Live Now 🔥
                    </p>
                  )}

                  <p className="text-gray-400 mt-5 line-clamp-3">
                    {event.description}
                  </p>

                  {/* 🔥 IMAGE CLICK */}
                  {event.images?.[0] && (
                    <Motion.img
                      src={event.images[0]}
                      onClick={(clickEvent) => {
                        clickEvent.stopPropagation();
                        setCurrentImages(event.images);
                        setCurrentIndex(0);
                        setSelectedImage(event.images[0]);
                      }}
                      whileHover={{ scale: 1.08 }}
                      className="mt-5 rounded-xl h-44 w-full object-cover cursor-pointer"
                    />
                  )}
                </Motion.div>
              );
            })}
      </div>
      </div>

      {/* 🔥 FULL SCREEN IMAGE VIEWER */}
      <AnimatePresence>
        {selectedImage && (
          <Motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white text-3xl z-50"
            >
              ✕
            </button>

            {/* PREV */}
            <button
              onClick={() => {
                const newIndex =
                  (currentIndex - 1 + currentImages.length) %
                  currentImages.length;
                setCurrentIndex(newIndex);
                setSelectedImage(currentImages[newIndex]);
              }}
              className="absolute left-6 text-4xl text-white z-50"
            >
              ‹
            </button>

            {/* NEXT */}
            <button
              onClick={() => {
                const newIndex = (currentIndex + 1) % currentImages.length;
                setCurrentIndex(newIndex);
                setSelectedImage(currentImages[newIndex]);
              }}
              className="absolute right-6 text-4xl text-white z-50"
            >
              ›
            </button>

            {/* IMAGE */}
            <Motion.img
              key={selectedImage}
              src={selectedImage}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-[0_0_60px_rgba(255,115,0,0.6)]"
            />

            {/* INDEX */}
            <div className="absolute bottom-6 text-gray-400 text-sm">
              {currentIndex + 1} / {currentImages.length}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}