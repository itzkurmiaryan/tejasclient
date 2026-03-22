import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../config/api";



export default function ContactList() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // LOAD
  const loadData = async () => {
    const res = await fetch(`${API}/contact`);
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  // DELETE
  const deleteMsg = async (id) => {
    if (!window.confirm("Delete message?")) return;

    await fetch(`${API}/contact/${id}`, {
      method: "DELETE"
    });

    setSelected(null);
    loadData();
  };

  // FILTER
  const filtered = data.filter(msg =>
    msg.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">

      {/* 🔥 LEFT SIDE (LIST) */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 h-[80vh] overflow-y-auto">

        <h2 className="text-xl mb-4 text-orange-400">Messages</h2>

        <input
          placeholder="🔍 Search..."
          className="w-full mb-4 px-4 py-2 rounded-xl bg-white/10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-3">
          {filtered.map(msg => (

            <motion.div
              key={msg._id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(msg)}
              className={`p-3 rounded-xl cursor-pointer border transition ${
                selected?._id === msg._id
                  ? "bg-orange-500/20 border-orange-400"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >

              <h3 className="font-semibold">{msg.name}</h3>
              <p className="text-xs text-gray-400 truncate">
                {msg.message}
              </p>

            </motion.div>

          ))}
        </div>
      </div>

      {/* 🔥 RIGHT SIDE (DETAIL VIEW) */}
      <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

        {!selected ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a message to view 📩
          </div>
        ) : (
          <motion.div
            key={selected._id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
          >

            <h2 className="text-2xl font-bold mb-2">
              {selected.name}
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              {selected.email}
            </p>

            <p className="mb-6 text-gray-200 leading-relaxed">
              {selected.message}
            </p>

            <p className="text-xs text-gray-500 mb-6">
              {new Date(selected.createdAt).toLocaleString()}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-4">

              <a
                href={`mailto:${selected.email}`}
                className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition"
              >
                Reply ✉️
              </a>

              <button
                onClick={() => deleteMsg(selected._id)}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
              >
                Delete 🗑
              </button>

            </div>

          </motion.div>
        )}

      </div>

    </div>
  );
}