import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../config/api";


export default function AddMember({ reload }) {

  const [form, setForm] = useState({
    club: "",
    type: "team",
    role: "",
    name: "",
    course: "",
    branch: "",
    year: ""
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH CLUBS
  useEffect(() => {
    fetch(`${API}/clubs`)
      .then(res => res.json())
      .then(data => {
        setClubs(data);
        if (data.length > 0) {
          setForm(prev => ({ ...prev, club: data[0].name }));
        }
      });
  }, []);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (photo) formData.append("photo", photo);

      await fetch(`${API}/members`, {
        method: "POST",
        body: formData
      });

      setForm({
        club: clubs[0]?.name || "",
        type: "team",
        role: "",
        name: "",
        course: "",
        branch: "",
        year: ""
      });

      setPhoto(null);
      setPreview(null);
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
      className="mb-10 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,255,200,0.2)]"
    >

      <h2 className="text-3xl font-bold mb-6 text-green-400">
        Add Member 👥
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        {/* CLUB */}
        <select
          value={form.club}
          onChange={e => setForm({ ...form, club: e.target.value })}
          className="input"
        >
          {clubs.map(c => (
            <option key={c._id}>{c.name}</option>
          ))}
        </select>

        {/* TYPE */}
        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          className="input"
        >
          <option value="team">Team</option>
          <option value="member">Member</option>
        </select>

        <input
          placeholder="Role"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="input"
        />

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="input"
        />

        <input
          placeholder="Course"
          value={form.course}
          onChange={e => setForm({ ...form, course: e.target.value })}
          className="input"
        />

        <input
          placeholder="Branch"
          value={form.branch}
          onChange={e => setForm({ ...form, branch: e.target.value })}
          className="input"
        />

        <input
          placeholder="Year"
          value={form.year}
          onChange={e => setForm({ ...form, year: e.target.value })}
          className="input"
        />

        {/* IMAGE UPLOAD */}
        <div className="md:col-span-2">
          <input
            type="file"
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {preview && (
            <img
              src={preview}
              className="w-24 h-24 mt-3 rounded-full object-cover border-2 border-green-400"
            />
          )}
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="md:col-span-2 py-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 font-bold shadow-lg"
        >
          {loading ? "Adding..." : "Add Member"}
        </motion.button>

      </form>

      {/* STYLE */}
      <style jsx>{`
        .input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px;
          border-radius: 12px;
          outline: none;
        }
        .input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 10px rgba(34,197,94,0.5);
        }
      `}</style>

    </motion.div>
  );
}