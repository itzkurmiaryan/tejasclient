import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../config/api";


export default function MembersList({ members, reload }) {

  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);

  const [search, setSearch] = useState("");
  const [clubFilter, setClubFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // FILTER
  const clubs = ["all", ...new Set(members.map(m => m.club))];

  const filtered = members.filter(m =>
    (clubFilter === "all" || m.club === clubFilter) &&
    (typeFilter === "all" || m.type === typeFilter) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  // DELETE
  const deleteMember = async (id) => {
    await fetch(`${API}/members/${id}`, {
      method: "DELETE"
    });
    reload();
    setSelected(null);
  };

  // EDIT START
  const startEdit = (m) => {
    setEditing(true);
    setForm(m);
  };

  // SAVE
  const saveEdit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach(k => formData.append(k, form[k]));
    if (newPhoto) formData.append("photo", newPhoto);

    await fetch(`${API}/members/${form._id}`, {
      method: "PUT",
      body: formData
    });

    setEditing(false);
    setSelected(null);
    reload();
  };

  return (
    <div className="p-6">

      {/* 🔥 TOP BAR */}
      <div className="flex flex-wrap gap-4 mb-8">

        <input
          placeholder="🔍 Search member..."
          className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={clubFilter}
          onChange={(e) => setClubFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10"
        >
          {clubs.map(c => <option key={c}>{c}</option>)}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10"
        >
          <option value="all">All</option>
          <option value="team">Presidential</option>
          <option value="member">Members</option>
        </select>

      </div>

      {/* 🔥 GRID CARDS */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filtered.map(m => (

          <motion.div
            key={m._id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(m)}
            className="cursor-pointer p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(0,255,200,0.4)] transition"
          >

            <img
              src={m.photo ? `${API}${m.photo}` : "https://via.placeholder.com/150"}
              className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-cyan-400"
            />

            <h3 className="text-center mt-4 font-bold text-lg">{m.name}</h3>

            <p className="text-center text-sm text-gray-400">
              {m.role}
            </p>

            <p className="text-center text-xs text-gray-500 mt-1">
              {m.club}
            </p>

          </motion.div>

        ))}

      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {selected && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-slate-900 p-8 rounded-2xl w-[400px]"
            >

              {editing ? (

                <>
                  <input className="input"
                    value={form.name}
                    onChange={(e)=>setForm({...form,name:e.target.value})}
                  />

                  <input className="input"
                    value={form.role}
                    onChange={(e)=>setForm({...form,role:e.target.value})}
                  />

                  <input className="input"
                    value={form.course}
                    onChange={(e)=>setForm({...form,course:e.target.value})}
                  />

                  <input className="input"
                    value={form.branch}
                    onChange={(e)=>setForm({...form,branch:e.target.value})}
                  />

                  <input className="input"
                    value={form.year}
                    onChange={(e)=>setForm({...form,year:e.target.value})}
                  />

                  <input type="file"
                    onChange={(e)=>setNewPhoto(e.target.files[0])}
                  />

                  <button onClick={saveEdit} className="btn-green mt-4">Save</button>

                </>

              ) : (

                <>
                  <img
                    src={selected.photo ? `${API}${selected.photo}` : ""}
                    className="w-24 h-24 mx-auto rounded-full"
                  />

                  <h2 className="text-center text-xl mt-4">{selected.name}</h2>

                  <p className="text-center text-gray-400">{selected.role}</p>

                  <div className="mt-4 space-y-2 text-sm">
                    <p>📚 {selected.course}</p>
                    <p>🌿 {selected.branch}</p>
                    <p>🎓 {selected.year}</p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button onClick={() => startEdit(selected)} className="btn-blue">Edit</button>
                    <button onClick={() => deleteMember(selected._id)} className="btn-red">Delete</button>
                  </div>
                </>

              )}

              <button
                onClick={() => {
                  setSelected(null);
                  setEditing(false);
                }}
                className="absolute top-3 right-3 text-white"
              >
                ✖
              </button>

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>

      <style jsx>{`
        .input {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
        }
        .btn-green {
          background: green;
          padding: 10px;
          border-radius: 10px;
          width: 100%;
        }
        .btn-blue {
          background: blue;
          padding: 10px;
          border-radius: 10px;
        }
        .btn-red {
          background: red;
          padding: 10px;
          border-radius: 10px;
        }
      `}</style>

    </div>
  );
}