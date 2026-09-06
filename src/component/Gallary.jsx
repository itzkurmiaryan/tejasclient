import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import API from "../config/api";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [slidingImages, setSlidingImages] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading State Add Ki
  const imageCount = slidingImages.length;

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
      className="bg-[#171b1d] text-white py-16 md:py-20 overflow-hidden dark-grid relative"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e86f3d] to-transparent" />

      {/* Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 mb-10"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 text-left">
          <div>
            <p className="text-[#c7d96b] uppercase tracking-[0.25em] text-xs font-bold mb-4">The archive / 01</p>
            <h2 className="display-font text-4xl sm:text-5xl md:text-6xl font-bold leading-[.95]">
              Tejas <span className="text-[#e86f3d]">Gallery</span>
            </h2>
          </div>
          <div className="max-w-sm md:text-right">
            <p className="text-white/60 leading-relaxed">Moments, creativity, culture and energy from the people who make Tejas feel alive.</p>
            <div className="flex md:justify-end items-center gap-3 mt-5 text-[10px] uppercase tracking-[.2em] text-white/40">
              <span className="w-2 h-2 rounded-full bg-[#e86f3d] animate-pulse" />
              {imageCount || "--"} captured moments
            </div>
          </div>
        </div>
      </Motion.div>

      {/* 🔥 SLIDER AREA */}
      <div className="relative mb-12 overflow-hidden py-4 border-y border-white/10 bg-white/[0.025]">
        <div className="absolute left-6 top-2 z-10 text-[9px] uppercase tracking-[.25em] text-white/35">Selected frames / Drag to explore</div>
        {loading ? (
          // ⏳ Slider Skeleton: Blink karte hue grey blocks
          <div className="flex gap-6 animate-pulse px-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-60 h-32 min-w-[15rem] bg-white/10 rounded-xl"
              />
            ))}
          </div>
        ) : (
          // 🚀 Real Slider
          <Motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          >
            {[...slidingImages, ...slidingImages].map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveItem({ image: img })}
                className="w-60 h-32 min-w-[15rem] rounded-xl object-cover opacity-80 cursor-pointer hover:opacity-100 hover:-translate-y-1 hover:rotate-1 transition duration-500 ring-1 ring-white/10 shadow-2xl"
                alt=""
              />
            ))}
          </Motion.div>
        )}
      </div>

      {/* 🔥 CARDS AREA */}
      <div className="max-w-6xl mx-auto px-6 mb-3 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[.25em] text-white/35">Memory boards</p>
        <span className="text-[10px] uppercase tracking-[.2em] text-[#c7d96b]">Tap a board to open</span>
      </div>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-3 px-6">
        {loading
          ? // ⏳ Cards Skeleton: Layout ke according blank gradient cards
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="relative h-44 rounded-2xl p-5 bg-white/5 border border-white/10 animate-pulse flex flex-col justify-between"
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
              <Motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.025, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
                onClick={() => setActiveItem(item)}
                className={`relative cursor-pointer h-52 ${i === 0 ? "lg:col-span-2 lg:h-[20rem]" : ""} rounded-2xl p-5
              bg-gradient-to-br ${item.gradient || "from-purple-500 to-pink-500"}
              shadow-2xl overflow-hidden group border border-white/10`}
              >
                {/* background image */}
                <img
                  src={item.images?.[0]}
                  className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-110 transition duration-700"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-95" />
                <div className="absolute inset-x-5 bottom-5 z-10 text-left">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-[#c7d96b] text-[10px] uppercase tracking-[.2em] font-bold">Memory {String(i + 1).padStart(2, "0")}</p>
                    <span className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white/80 group-hover:bg-[#e86f3d] group-hover:border-[#e86f3d] transition duration-300">↗</span>
                  </div>
                  <h3 className={`${i === 0 ? "text-3xl md:text-5xl" : "text-2xl"} display-font font-bold text-white leading-tight`}>{item.title || item.name || "Tejas Memory"}</h3>
                  <p className="text-white/80 text-sm mt-2 max-w-xl line-clamp-2">{item.caption || item.description || "A captured moment from the Tejas community."}</p>
                  <span className="inline-block mt-3 text-[10px] uppercase tracking-[.18em] font-bold text-white/65 group-hover:text-[#c7d96b] transition">View memories</span>
                </div>
              </Motion.div>
            ))}
      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {activeItem && (
          <Motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setActiveItem(null);
              setPreviewImage(null);
            }}
          >
            <Motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-[#101315] border border-white/15 rounded-[2rem] p-6 max-w-4xl w-full shadow-2xl"
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
                className="mt-6 text-[#c7d96b] hover:underline block mx-auto text-sm uppercase tracking-[.15em]"
              >
                Close
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* 🔥 PREVIEW */}
      <AnimatePresence>
        {previewImage && (
          <Motion.div
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center px-6"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              className="max-h-[90vh] rounded-2xl object-contain"
              alt=""
            />
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;