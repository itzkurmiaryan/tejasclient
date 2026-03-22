import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../config/api";


export default function EventsList({ events, reload }) {
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [search, setSearch] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.club.toLowerCase().includes(search.toLowerCase())
  );

  const deleteEvent = async (id) => {
    await fetch(`${API}/events/${id}`, {
      method: "DELETE"
    });
    reload();
  };

  const startEdit = (event) => {
    setEditing(event._id);
    setForm(event);
  };

  const saveEdit = async () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) =>
      formData.append(key, form[key])
    );

    newImages.forEach((img) =>
      formData.append("images", img)
    );

    await fetch(`${API}/events/${editing}`, {
      method: "PUT",
      body: formData
    });

    setEditing(null);
    setNewImages([]);
    reload();
  };

  return (
    <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">

      <h2 className="text-3xl mb-6 text-orange-400 font-bold">
        All Events 🎯
      </h2>

      {/* SEARCH */}
      <input
        placeholder="Search event or club..."
        className="w-full mb-6 p-4 rounded-xl bg-black/30 border border-white/10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-6">

        {filteredEvents.map((event) => (

          <motion.div
            key={event._id}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-lg overflow-hidden"
          >

            {/* HEADER */}
            <div
              onClick={() =>
                setExpanded(expanded === event._id ? null : event._id)
              }
              className="flex justify-between p-5 cursor-pointer"
            >
              <div>
                <h3 className="text-xl font-bold">{event.name}</h3>
                <p className="text-gray-400 text-sm">
                  {event.club} • {event.date}
                </p>
              </div>
              <span>{expanded === event._id ? "▲" : "▼"}</span>
            </div>

            {/* DETAILS */}
            <AnimatePresence>
              {expanded === event._id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 border-t border-white/10"
                >

                  {editing === event._id ? (
                    <>
                      <input
                        className="input mb-2"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />

                      <textarea
                        className="input mb-2"
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                      />

                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          setNewImages(Array.from(e.target.files))
                        }
                      />

                      <button onClick={saveEdit} className="btn-green">
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="btn-gray ml-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-300 mb-4">
                        {event.description}
                      </p>

                      {/* IMAGES GRID */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        {event.images?.map((img, i) => (
                          <img
                            key={i}
                            src={`${API}/${img}`}
                            className="h-24 w-full object-cover rounded-lg hover:scale-105 transition"
                          />
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(event)}
                          className="btn-blue"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEvent(event._id)}
                          className="btn-red"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}

                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        ))}
      </div>

      {/* BUTTON STYLES */}
      <style jsx>{`
        .input {
          background: rgba(255,255,255,0.05);
          padding: 10px;
          border-radius: 10px;
          width: 100%;
        }
        .btn-blue { background:#3b82f6; padding:8px 14px; border-radius:8px; }
        .btn-red { background:#ef4444; padding:8px 14px; border-radius:8px; }
        .btn-green { background:#22c55e; padding:8px 14px; border-radius:8px; }
        .btn-gray { background:#6b7280; padding:8px 14px; border-radius:8px; }
      `}</style>
    </div>
  );
}