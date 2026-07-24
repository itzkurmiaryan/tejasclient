import { useState } from "react";
import API from "../config/api";

/* ===== CLUB DATA ===== */
const clubsData = [
  "Panache – The Arts Club",
  "Rock On – The Cultural Club",
  "I-Tech – The Technical Club",
  "Images – The Publication Club",
  "Stride – The Sports Club",
  "M-Factor – The Management Club",
  "The Responsible Invertian – The Social Cause Club"
];

/* ===== POSITIONS DATA ===== */
const positionsData = [
  "President",
  "Vice President",
  "Secretary",
  "Joint Secretary",
  "Treasurer",
  "Member",
  "Coordinator"
];

export default function AddVacancy({ reload }) {
  const [form, setForm] = useState({
    club: "",
    post: "Member",
    seats: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.club.trim() || !form.post.trim() || !form.seats) {
      alert("❌ All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/vacancies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          club: form.club.trim(),
          post: form.post.trim(),
          seats: Number(form.seats)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = Array.isArray(data.details) 
          ? data.details.join(", ") 
          : (data.message || JSON.stringify(data));
        alert(`❌ Server Rejected: ${errorMsg}`);
        return;
      }

      alert(`✅ Vacancy Successfully Added for ${form.post}!`);

      setForm({
        club: "",
        post: "Member",
        seats: ""
      });

      if (reload) reload();

    } catch (err) {
      console.error("FRONTEND CATCH ERROR:", err);
      alert(`💥 Connection Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-neutral-900/40 border border-white/10 backdrop-blur-xl rounded-[2rem] mb-10 shadow-2xl shadow-black/50">
      <h2 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 flex items-center gap-2">
        ✨ Post New Opening / Vacancy
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-5 flex-wrap items-end">
        
        {/* Club Dropdown */}
        <div className="flex flex-col gap-2 min-w-[260px] flex-1">
          <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider px-1">Select Target Club</label>
          <select
            value={form.club}
            onChange={(e) => setForm({ ...form, club: e.target.value })}
            className="p-3 rounded-2xl bg-black/50 border border-white/5 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all w-full cursor-pointer h-12"
            required
          >
            <option value="" className="bg-neutral-950 text-gray-500">-- Choose Club --</option>
            {clubsData.map((club, i) => (
              <option key={i} value={club} className="bg-neutral-950 text-white">{club}</option>
            ))}
          </select>
        </div>

        {/* Position Dropdown */}
        <div className="flex flex-col gap-2 min-w-[200px] flex-1">
          <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider px-1">Designation</label>
          <select
            value={form.post}
            onChange={(e) => setForm({ ...form, post: e.target.value })}
            className="p-3 rounded-2xl bg-black/50 border border-white/5 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all w-full cursor-pointer h-12"
            required
          >
            {positionsData.map((pos, i) => (
              <option key={i} value={pos} className="bg-neutral-950 text-white">{pos}</option>
            ))}
          </select>
        </div>

        {/* Seats Count */}
        <div className="flex flex-col gap-2 w-28">
          <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider px-1">Openings</label>
          <input
            type="number"
            min="1"
            placeholder="Qty"
            value={form.seats}
            onChange={(e) => setForm({ ...form, seats: e.target.value })}
            className="p-3 rounded-2xl bg-black/50 border border-white/5 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all w-full text-center h-12"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-white hover:bg-gray-100 text-black font-bold px-8 rounded-2xl shadow-lg hover:shadow-white/5 active:scale-95 transition-all h-12 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>

      </form>
    </div>
  );
}