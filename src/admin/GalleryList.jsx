import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryList({ galleries, reload }) {

  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({});
  const [newImages, setNewImages] = useState([]);

  const deleteGallery = async (id) => {
    await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE"
    });
    reload();
  };

  const startEdit = (g) => {
    setEditing(g._id);
    setForm(g);
  };

  const saveEdit = async () => {
    const formData = new FormData();

    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    newImages.forEach(img => {
      formData.append("images", img);
    });

    await fetch(`http://localhost:5000/api/gallery/${editing}`, {
      method: "PUT",
      body: formData
    });

    setEditing(null);
    setNewImages([]);
    reload();
  };

  return (
    <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">

      <h2 className="text-3xl mb-6 text-pink-400 font-bold">
        All Galleries 📸
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {galleries.map((g) => (

          <motion.div
            key={g._id}
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${g.gradient}`}
          >

            {/* COVER IMAGE */}
            {g.images?.[0] && (
              <img
                src={g.images[0]}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-5 bg-black/50 backdrop-blur">

              <h3 className="text-xl font-bold">{g.title}</h3>
              <p className="text-gray-300 text-sm mb-3">{g.caption}</p>

              <button
                onClick={() =>
                  setExpanded(expanded === g._id ? null : g._id)
                }
                className="text-sm text-pink-300"
              >
                {expanded === g._id ? "Hide" : "View Details"}
              </button>

              {/* EXPANDED */}
              <AnimatePresence>
                {expanded === g._id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4"
                  >

                    {/* IMAGES GRID */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {g.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          className="h-20 w-full object-cover rounded"
                        />
                      ))}
                    </div>

                    {editing === g._id ? (
                      <>
                        <input
                          className="input mb-2"
                          value={form.title}
                          onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                          }
                        />

                        <input
                          className="input mb-2"
                          value={form.caption}
                          onChange={(e) =>
                            setForm({ ...form, caption: e.target.value })
                          }
                        />

                        <input
                          className="input mb-2"
                          value={form.gradient}
                          onChange={(e) =>
                            setForm({ ...form, gradient: e.target.value })
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
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(g)}
                          className="btn-blue"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteGallery(g._id)}
                          className="btn-red"
                        >
                          Delete
                        </button>
                      </div>
                    )}

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        ))}
      </div>

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