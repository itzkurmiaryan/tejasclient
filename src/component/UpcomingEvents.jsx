import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../config/api";

export default function UpcomingEvents() {

  const [events, setEvents] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  // 🔥 IMAGE VIEWER STATE
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ FETCH EVENTS
  useEffect(() => {
    fetch(`${API}/events/upcoming`)
      .then(res => res.json())
      .then(data => setEvents(data.slice(0, 3)))
      .catch(err => console.log(err));
  }, []);

  // ✅ COUNTDOWN
  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date();
      const updated = {};

      events.forEach(event => {

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

  }, [events]);

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">

      <h2 className="text-5xl text-center mb-16 font-extrabold">
        Upcoming <span className="text-orange-400">Events 🚀</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-10 px-10">

        {events.map((event) => {

          const t = timeLeft[event._id];

          return (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.07, rotate: 1 }}
              className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10
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
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.1 }}
                      className="bg-black/60 px-4 py-3 rounded-xl border border-orange-500/20 text-center w-16"
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={t[key]}
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          className="text-2xl font-bold text-orange-400 block"
                        >
                          {t[key]}
                        </motion.span>
                      </AnimatePresence>

                      <span className="text-xs text-gray-400 uppercase">
                        {key}
                      </span>
                    </motion.div>
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
                <motion.img
                  src={event.images[0]}
                  onClick={() => {
                    setCurrentImages(event.images);
                    setCurrentIndex(0);
                    setSelectedImage(event.images[0]);
                  }}
                  whileHover={{ scale: 1.08 }}
                  className="mt-5 rounded-xl h-44 w-full object-cover cursor-pointer"
                />
              )}

            </motion.div>
          );
        })}

      </div>

      {/* 🔥 FULL SCREEN IMAGE VIEWER */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
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
                const newIndex =
                  (currentIndex + 1) % currentImages.length;
                setCurrentIndex(newIndex);
                setSelectedImage(currentImages[newIndex]);
              }}
              className="absolute right-6 text-4xl text-white z-50"
            >
              ›
            </button>

            {/* IMAGE */}
            <motion.img
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

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}