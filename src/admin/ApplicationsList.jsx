import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../config/api";


export default function ApplicationsList() {

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [clubFilter, setClubFilter] = useState("all");

  // LOAD
  const loadData = async () => {
    const res = await fetch(`${API}/applications`);
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  // DELETE
  const deleteApp = async (id) => {
    if (!window.confirm("Delete application?")) return;

    await fetch(`${API}/applications/${id}`, {
      method: "DELETE"
    });

    setSelected(null);
    loadData();
  };

  // STATUS UPDATE
  const updateStatus = async (id, status) => {
    await fetch(`${API}/applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    loadData();
  };

  // FILTER
  const clubs = ["all", ...new Set(data.map(d => d.club))];

  const filtered = data.filter(app =>
    (clubFilter === "all" || app.club === clubFilter) &&
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  // GROUP BY STATUS
  const grouped = {
    pending: filtered.filter(a => !a.status || a.status === "pending"),
    called: filtered.filter(a => a.status === "called"),
    done: filtered.filter(a => a.status === "done"),
  };

  const statuses = ["pending", "called", "done"];

  return (
    <div className="p-6">

      {/* 🔥 FILTER BAR */}
      <div className="flex gap-4 mb-6 flex-wrap">

        <input
          placeholder="🔍 Search..."
          className="px-4 py-2 rounded-xl bg-white/10"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <select
          value={clubFilter}
          onChange={(e)=>setClubFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-white/10"
        >
          {clubs.map(c => <option key={c}>{c}</option>)}
        </select>

      </div>

      {/* 🔥 KANBAN BOARD */}
      <div className="grid md:grid-cols-3 gap-6">

        {statuses.map(status => (

          <div key={status} className="bg-white/5 rounded-2xl p-4 border border-white/10">

            <h2 className="text-lg font-bold mb-4 capitalize text-center">
              {status}
            </h2>

            <div className="space-y-4">

              {grouped[status].map(app => (

                <motion.div
                  key={app._id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelected(app)}
                  className="p-4 rounded-xl bg-white/10 cursor-pointer border border-white/10 hover:shadow-[0_0_20px_rgba(255,165,0,0.4)]"
                >

                  <h3 className="font-bold">{app.name}</h3>
                  <p className="text-xs text-gray-400">{app.club}</p>

                  <div className="flex gap-2 mt-3 flex-wrap">

                    {status !== "pending" && (
                      <button
                        onClick={(e)=>{e.stopPropagation();updateStatus(app._id,"pending")}}
                        className="px-2 py-1 text-xs bg-gray-500 rounded"
                      >Pending</button>
                    )}

                    {status !== "called" && (
                      <button
                        onClick={(e)=>{e.stopPropagation();updateStatus(app._id,"called")}}
                        className="px-2 py-1 text-xs bg-yellow-500 rounded"
                      >Called</button>
                    )}

                    {status !== "done" && (
                      <button
                        onClick={(e)=>{e.stopPropagation();updateStatus(app._id,"done")}}
                        className="px-2 py-1 text-xs bg-green-500 rounded"
                      >Done</button>
                    )}

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        ))}

      </div>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {selected && (

          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
          >

            <motion.div
              initial={{scale:0.8}}
              animate={{scale:1}}
              exit={{scale:0.8}}
              className="bg-slate-900 p-8 rounded-2xl w-[400px]"
            >

              <h2 className="text-xl font-bold">{selected.name}</h2>
              <p className="text-gray-400 mb-4">{selected.club}</p>

              <div className="space-y-2 text-sm">
                <p>📚 {selected.course}</p>
                <p>🌿 {selected.branch}</p>
                <p>🎓 {selected.year}</p>
                <p>📞 {selected.phone}</p>
                <p>✉ {selected.email}</p>
                <p>💡 {selected.skills}</p>
                <p>📷 {selected.instagram}</p>
              </div>

              <div className="flex gap-3 mt-6 flex-wrap">
                <button onClick={()=>updateStatus(selected._id,"called")} className="bg-yellow-500 px-3 py-2 rounded">Called</button>
                <button onClick={()=>updateStatus(selected._id,"done")} className="bg-green-500 px-3 py-2 rounded">Done</button>
                <button onClick={()=>deleteApp(selected._id)} className="bg-red-500 px-3 py-2 rounded">Delete</button>
              </div>

              <button
                onClick={()=>setSelected(null)}
                className="absolute top-3 right-3"
              >✖</button>

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>

    </div>
  );
}