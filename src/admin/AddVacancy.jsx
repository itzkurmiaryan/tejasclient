import { useState } from "react";
import API from "../config/api";

/* ===== CLUB DATA (same as JoinUs) ===== */
const clubsData = [
  "Panache – The Arts Club",
  "Rock On – The Cultural Club",
  "I-Tech – The Technical Club",
  "Images – The Publication Club",
  "Stride – The Sports Club",
  "M-Factor – The Management Club",
  "The Responsible Invertian – The Social Cause Club"
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

    if (!form.club.trim() || !form.seats) {
      alert("All fields required");
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
      console.log("RESPONSE:", data);

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("✅ Vacancy Added");

      setForm({
        club: "",
        post: "Member",
        seats: ""
      });

      reload();

    } catch (err) {
      console.log(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white/5 rounded-2xl mb-6">

      <h2 className="text-xl mb-4 text-orange-400">Add Vacancy</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">

        {/* ✅ CHANGE 1: Club select dropdown instead of text input */}
        <select
          value={form.club}
          onChange={(e) => setForm({ ...form, club: e.target.value })}
          className="p-2 rounded bg-black/30"
          required
        >
          <option value="">Select Club</option>
          {clubsData.map((club, i) => (
            <option key={i} value={club}>{club}</option>
          ))}
        </select>

        <select
          value={form.post}
          onChange={(e) => setForm({ ...form, post: e.target.value })}
          className="p-2 rounded bg-black/30"
        >
          <option value="President">President</option>
          <option value="Vice President">Vice President</option>
          <option value="Member">Secretary</option>
          <option value="Coordinator">Joint Secretary</option>
          <option value="Lead">Treasurer</option>
          <option value="Lead">Member</option>
        </select>

        <input
          type="number"
          min="1"
          placeholder="Seats"
          value={form.seats}
          onChange={(e) => setForm({ ...form, seats: e.target.value })}
          className="p-2 rounded bg-black/30"
          required
        />

        <button className="bg-orange-500 px-4 py-2 rounded">
          {loading ? "Adding..." : "Add Vacancy"}
        </button>

      </form>
    </div>
  );
}