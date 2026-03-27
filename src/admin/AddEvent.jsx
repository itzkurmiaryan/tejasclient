import { useState } from "react";
import { motion } from "framer-motion";
import API from "../config/api";

export default function AddEvent({ reload }) {

  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [highlights, setHighlights] = useState("");
  const [isUpcoming, setIsUpcoming] = useState(true); // 🔥 NEW
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("club", club);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("highlights", highlights);

    // 🔥 IMPORTANT
    formData.append("isUpcoming", isUpcoming);

    images.forEach((img) => formData.append("images", img));

    try {
      await fetch(`${API}/events`, {
        method: "POST",
        body: formData
      });

      // RESET
      setName("");
      setClub("");
      setDate("");
      setDescription("");
      setImages([]);
      setHighlights("");
      setIsUpcoming(true);

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
      className="mb-10 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(255,115,0,0.2)]"
    >
      <h2 className="text-3xl font-bold mb-6 text-orange-400">
        Add New Event 🚀
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        <input
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />

        <input
          placeholder="Club Name"
          value={club}
          onChange={(e) => setClub(e.target.value)}
          className="input"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
          required
        />

        <input
          placeholder="Highlights (comma separated)"
          value={highlights}
          onChange={(e) => setHighlights(e.target.value)}
          className="input"
        />

        {/* 🔥 NEW CHECKBOX */}
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={isUpcoming}
            onChange={(e) => setIsUpcoming(e.target.checked)}
          />
          Mark as Upcoming Event
        </label>

        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input md:col-span-2 h-28"
          required
        />

        {/* IMAGE UPLOAD */}
        <div className="md:col-span-2">
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="mb-3"
          />

          <div className="flex gap-3 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="md:col-span-2 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 font-bold shadow-lg"
        >
          {loading ? "Uploading..." : "Add Event"}
        </motion.button>

      </form>

      <style jsx>{`
        .input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px;
          border-radius: 12px;
          outline: none;
          transition: 0.3s;
        }
        .input:focus {
          border-color: #ff6a00;
          box-shadow: 0 0 10px rgba(255,115,0,0.5);
        }
      `}</style>
    </motion.div>
  );
}