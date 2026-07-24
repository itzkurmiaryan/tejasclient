import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../config/api";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [slidingImages, setSlidingImages] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading State Add Ki

  // ✅ FETCH DATA
  useEffect(() => {
    fetch(`${API}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setGalleryItems(data);

        // slider ke liye sab images nikaal lo
        const allImages = data.flatMap((item) => item.images || []);
        setSlidingImages(allImages);
        setLoading(false); // ✅ Data aate hi loading false
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Error aane par bhi handle ho jaye
      });
  }, []);

  return (
    <section
      id="gallery"
      className="bg-slate-950 text-white py-20 overflow-hidden min-h-screen"
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-extrabold">
          Abhiruchi <span className="text-amber-400">Gallery</span>
        </h2>
        <p className="text-white/70 mt-3">
          Moments • Creativity • Culture • Energy
        </p>
      </motion.div>

      {/* 🔥 SLIDER AREA */}
      <div className="relative mb-24 overflow-hidden">
        {loading ? (
          // ⏳ Slider Skeleton: Blink karte hue grey blocks
          <div className="flex gap-6 animate-pulse px-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-72 h-44 min-w-[18rem] bg-slate-800 rounded-2xl"
              />
            ))}
          </div>
        ) : (
          // 🚀 Real Slider
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...slidingImages, ...slidingImages].map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveItem({ image: img })}
                className="w-72 h-44 min-w-[18rem] rounded-2xl object-cover opacity-80 cursor-pointer hover:opacity-100 transition"
                alt=""
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* 🔥 CARDS AREA */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {loading
          ? // ⏳ Cards Skeleton: Layout ke according blank gradient cards
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="relative h-56 rounded-3xl p-6 bg-slate-900 border border-slate-800 animate-pulse flex flex-col justify-between"
              >
                <div>
                  <div className="h-6 bg-slate-800 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-slate-800 rounded w-1/3 mt-4"></div>
              </div>
            ))
          : // 🚀 Real Cards
            galleryItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                onClick={() => setActiveItem(item)}
                className={`relative cursor-pointer h-56 rounded-3xl p-6
              bg-gradient-to-br ${item.gradient || "from-purple-500 to-pink-500"}
              shadow-2xl overflow-hidden`}
              >
                {/* background image */}
                <img
                  src={item.images?.[0]}
                  className="absolute inset-0 w-full h-full object-cover opacity-15"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-white/80 text-sm mt-2">{item.caption}</p>
                  <span className="inline-block mt-4 text-sm underline">
                    View Memories →
                  </span>
                </div>
              </motion.div>
            ))}
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setActiveItem(null);
              setPreviewImage(null);
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-slate-900 rounded-3xl p-6 max-w-4xl w-full"
            >
              {/* MULTIPLE IMAGES */}
              {activeItem.images && (
                <>
                  <h3 className="text-3xl font-bold mb-2">
                    {activeItem.title}
                  </h3>
                  <p className="text-white/70 mb-6">{activeItem.caption}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {activeItem.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        onClick={() => setPreviewImage(img)}
                        className="rounded-xl w-full h-44 object-cover cursor-pointer hover:scale-105 transition"
                        alt=""
                      />
                    ))}
                  </div>
                </>
              )}

              {/* SINGLE IMAGE */}
              {activeItem.image && (
                <img
                  src={activeItem.image}
                  className="rounded-2xl w-full max-h-[80vh] object-contain"
                  alt=""
                />
              )}

              <button
                onClick={() => {
                  setActiveItem(null);
                  setPreviewImage(null);
                }}
                className="mt-6 text-amber-400 hover:underline block mx-auto"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 PREVIEW */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center px-6"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              className="max-h-[90vh] rounded-2xl object-contain"
              alt=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;