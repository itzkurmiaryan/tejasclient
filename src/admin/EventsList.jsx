import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import API from "../config/api";

export default function EventsList({ events, reload }) {

  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [search, setSearch] = useState("");
  const [timeLeft, setTimeLeft] = useState({});

  // 🔥 FILTER
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.club.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 AUTO COUNTDOWN + LIVE
  useEffect(() => {
    const timer = setInterval(() => {

      const times = {};

      events.forEach(event => {
        const diff = new Date(event.date) - new Date();

        if (diff <= 0) {
          times[event._id] = "LIVE";
        } else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const m = Math.floor((diff / (1000 * 60)) % 60);

          times[event._id] = `${d}d ${h}h ${m}m`;
        }
      });

      setTimeLeft(times);

    }, 1000);

    return () => clearInterval(timer);
  }, [events]);

  // 🔥 DELETE
  const deleteEvent = async (id) => {
    await fetch(`${API}/events/${id}`, { method: "DELETE" });
    reload();
  };

  // 🔥 EDIT START
  const startEdit = (event) => {
    setEditing(event._id);
    setForm(event);
  };

  // 🔥 SAVE EDIT
  const saveEdit = async () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, key === "requirements" ? JSON.stringify(form[key] || []) : form[key]);
    });

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

        {filteredEvents.map((event) => {

          const isLive = timeLeft[event._id] === "LIVE";
          const isExpired = new Date(event.date) < new Date();

          return (

            <Motion.div
              key={event._id}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-lg overflow-hidden hover:shadow-[0_0_25px_rgba(255,115,0,0.4)] transition"
            >

              {/* HEADER */}
              <div
                onClick={() =>
                  setExpanded(expanded === event._id ? null : event._id)
                }
                className="flex justify-between p-5 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">

                    {event.name}

                    {/* 🟢 LIVE */}
                    {isLive && (
                      <span className="px-2 py-1 text-xs bg-green-500 rounded-full animate-pulse">
                        LIVE
                      </span>
                    )}

                    {/* ⏳ UPCOMING */}
                    {event.isUpcoming && !isLive && !isExpired && (
                      <span className="px-2 py-1 text-xs bg-blue-500 rounded-full">
                        Upcoming
                      </span>
                    )}

                    {/* ❌ EXPIRED */}
                    {isExpired && (
                      <span className="px-2 py-1 text-xs bg-red-500 rounded-full">
                        Expired
                      </span>
                    )}

                  </h3>

                  <p className="text-gray-400 text-sm">
                    {event.club} • {event.date}
                  </p>

                  {/* ⏳ COUNTDOWN */}
                  {!isExpired && (
                    <p className="text-xs text-orange-400 mt-1">
                      ⏳ {timeLeft[event._id]}
                    </p>
                  )}

                </div>

                <span>{expanded === event._id ? "▲" : "▼"}</span>
              </div>

              {/* DETAILS */}
              <AnimatePresence>
                {expanded === event._id && (
                  <Motion.div
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

                        <div className="mb-4 rounded-xl border border-white/10 p-3">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <p className="text-sm font-semibold text-orange-300">Event requirements</p>
                            <button type="button" onClick={() => setForm({ ...form, requirements: [...(form.requirements || []), { title: "New requirement", type: "student", description: "", capacity: 0, active: true }] })} className="text-xs px-2 py-1 rounded bg-orange-500">+ Add</button>
                          </div>
                          {(form.requirements || []).map((requirement, index) => (
                            <div key={requirement._id || index} className="flex items-center gap-3 mb-2 text-sm">
                              <input
                                type="checkbox"
                                checked={requirement.active !== false}
                                onChange={(e) => setForm({ ...form, requirements: form.requirements.map((item, i) => i === index ? { ...item, active: e.target.checked } : item) })}
                              />
                              <span className="flex-1">{requirement.title || requirement.type}</span>
                              <button type="button" onClick={() => setForm({ ...form, requirements: form.requirements.filter((_, i) => i !== index) })} className="text-red-300">Remove</button>
                            </div>
                          ))}
                          {(!form.requirements || form.requirements.length === 0) && <p className="text-xs text-white/45">No requirements added.</p>}
                        </div>

                        {/* 🔥 UPCOMING TOGGLE */}
                        <label className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={form.isUpcoming || false}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                isUpcoming: e.target.checked
                              })
                            }
                          />
                          Upcoming Event
                        </label>

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

                        {/* IMAGES */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {event.images?.map((img, i) => (
                            <img
                              key={i}
                              src={`${API}/${img}`}
                              className="h-24 w-full object-cover rounded-lg hover:scale-110 transition"
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

                  </Motion.div>
                )}
              </AnimatePresence>

            </Motion.div>
          );
        })}
      </div>

      {/* STYLES */}
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