import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../config/api";

export default function GalleryList({ galleries, reload }) {
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [form, setForm] = useState({});
  const [newImages, setNewImages] = useState([]);

  // =========================
  // DELETE GALLERY
  // =========================
  const deleteGallery = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery?"
    );

    if (!confirmDelete) return;

    try {
      console.log("Deleting:", id);

      const res = await fetch(`${API}/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      console.log("Delete Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Delete Failed");
      }

      alert("Gallery Deleted Successfully");
      reload();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // =========================
  // START EDIT
  // =========================
  const startEdit = (g) => {
    setEditing(g._id);
    setForm(g);
  };

  // =========================
  // SAVE EDIT
  // =========================
  const saveEdit = async () => {
    try {
      const formData = new FormData();

      formData.append("title", form.title || "");
      formData.append("caption", form.caption || "");
      formData.append("gradient", form.gradient || "");

      newImages.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch(`${API}/gallery/${editing}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update Failed");
      }

      setEditing(null);
      setNewImages([]);
      reload();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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
            className={`rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${g.gradient || "from-purple-500 to-pink-500"
              }`}
          >
            {g.images?.[0] && (
              <img
                src={g.images[0]}
                alt={g.title}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-5 bg-black/50 backdrop-blur">
              <h3 className="text-xl font-bold">{g.title}</h3>

              <p className="text-gray-300 text-sm mb-3">
                {g.caption}
              </p>

              <button
                onClick={() =>
                  setExpanded(expanded === g._id ? null : g._id)
                }
                className="text-sm text-pink-300"
              >
                {expanded === g._id
                  ? "Hide Details"
                  : "View Details"}
              </button>

              <AnimatePresence>
                {expanded === g._id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4"
                  >
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {g.images?.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt=""
                          className="h-20 w-full object-cover rounded"
                        />
                      ))}
                    </div>

                    {editing === g._id ? (
                      <>
                        <input
                          className="input mb-2"
                          value={form.title || ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              title: e.target.value,
                            })
                          }
                        />

                        <input
                          className="input mb-2"
                          value={form.caption || ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              caption: e.target.value,
                            })
                          }
                        />

                        <input
                          className="input mb-2"
                          value={form.gradient || ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              gradient: e.target.value,
                            })
                          }
                        />

                        <input
                          type="file"
                          multiple
                          onChange={(e) =>
                            setNewImages(
                              Array.from(e.target.files)
                            )
                          }
                        />

                        <div className="flex gap-3 mt-3">
                          <button
                            onClick={saveEdit}
                            className="btn-green"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setEditing(null)}
                            className="btn-gray"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-3 mt-4">
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
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px;
          border-radius: 10px;
          width: 100%;
          color: white;
        }

        .btn-blue {
          background: #3b82f6;
          padding: 8px 14px;
          border-radius: 8px;
        }

        .btn-red {
          background: #ef4444;
          padding: 8px 14px;
          border-radius: 8px;
        }

        .btn-green {
          background: #22c55e;
          padding: 8px 14px;
          border-radius: 8px;
        }

        .btn-gray {
          background: #6b7280;
          padding: 8px 14px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}