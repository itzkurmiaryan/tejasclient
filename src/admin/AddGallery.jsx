import { useState } from "react";
import { motion } from "framer-motion";
import API from "../config/api";


export default function AddGallery({ reload }) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [gradient, setGradient] = useState("from-purple-500 to-pink-500");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("gradient", gradient);
    images.forEach((img) => formData.append("images", img));

    try {
      await fetch(`${API}/gallery`, {
        method: "POST",
        body: formData
      });

      setTitle("");
      setCaption("");
      setGradient("from-purple-500 to-pink-500");
      setImages([]);
      reload();
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(255,0,150,0.2)]"
    >
      <h2 className="text-3xl font-bold mb-6 text-pink-400">
        Create Gallery 🎨
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        <input
          placeholder="Gallery Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          required
        />

        <select
          value={gradient}
          onChange={(e) => setGradient(e.target.value)}
          className="input"
        >
          <option value="from-purple-500 to-pink-500">
            🟣 Purple → Pink
          </option>

          <option value="from-blue-500 to-cyan-500">
            🔵 Blue → Cyan
          </option>

          <option value="from-indigo-600 via-purple-600 to-pink-500">
            🚀 AI Startup
          </option>

          <option value="from-green-500 to-emerald-500">
            🟢 Green → Emerald
          </option>

          <option value="from-orange-500 to-red-500">
            🟠 Orange → Red
          </option>

          <option value="from-yellow-400 to-orange-500">
            🌅 Sunset
          </option>

          <option value="from-teal-500 to-cyan-500">
            🌊 Ocean
          </option>

          <option value="from-fuchsia-500 to-rose-500">
            🌸 Rose
          </option>

          <option value="from-violet-600 to-indigo-600">
            💎 Premium Violet
          </option>

          <option value="from-slate-800 via-slate-900 to-black">
            ⚫ Dark Premium
          </option>

          <option value="from-pink-500 via-purple-500 to-indigo-500">
            🌈 Aurora
          </option>

          <option value="from-lime-500 to-green-600">
            🍃 Nature
          </option>
        </select>

        <textarea
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="input md:col-span-2 h-24"
        />

        {/* IMAGE UPLOAD */}
        <div className="md:col-span-2">
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
          />

          <div className="grid grid-cols-4 gap-3 mt-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="h-20 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="md:col-span-2 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold shadow-lg"
        >
          {loading ? "Uploading..." : "Add Gallery"}
        </motion.button>

      </form>

      <style jsx>{`
        .input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px;
          border-radius: 12px;
          outline: none;
        }
        .input:focus {
          border-color: #ec4899;
          box-shadow: 0 0 10px rgba(236,72,153,0.5);
        }
      `}</style>
    </motion.div>
  );
}