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

  const [loading, setLoading] = useState(false);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImage = (photo) => {
    if (!photo) {
      return "https://via.placeholder.com/300x300?text=Member";
    }

    // Cloudinary / external URL
    if (
      photo.startsWith("http://") ||
      photo.startsWith("https://")
    ) {
      return photo;
    }

    // Old uploads path support
    const backendUrl = API.replace(/\/api\/?$/, "");

    if (photo.startsWith("/uploads/")) {
      return `${backendUrl}${photo}`;
    }

    if (photo.startsWith("uploads/")) {
      return `${backendUrl}/${photo}`;
    }

    return `${backendUrl}/uploads/${photo}`;
  };

  // =====================================================
  // FILTERS
  // =====================================================

  const clubs = [
    "all",
    ...new Set(
      members
        .map((m) => m.club)
        .filter(Boolean)
    ),
  ];

  const filtered = members.filter((m) => {
    const matchesClub =
      clubFilter === "all" ||
      m.club === clubFilter;

    const matchesType =
      typeFilter === "all" ||
      m.type === typeFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      m.name?.toLowerCase().includes(searchText) ||
      m.club?.toLowerCase().includes(searchText) ||
      m.role?.toLowerCase().includes(searchText);

    return (
      matchesClub &&
      matchesType &&
      matchesSearch
    );
  });

  // =====================================================
  // DELETE
  // =====================================================

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/members/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to delete member"
        );
      }

      setSelected(null);

      reload();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EDIT START
  // =====================================================

  const startEdit = (member) => {
    setEditing(true);

    setForm({
      ...member,
    });

    setNewPhoto(null);
  };

  // =====================================================
  // SAVE EDIT
  // =====================================================

  const saveEdit = async () => {
    if (!form.name?.trim()) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("club", form.club || "");
      formData.append("type", form.type || "member");
      formData.append("name", form.name || "");
      formData.append("role", form.role || "");
      formData.append("course", form.course || "");
      formData.append("branch", form.branch || "");
      formData.append("year", form.year || "");

      if (newPhoto) {
        formData.append("photo", newPhoto);
      }

      const res = await fetch(
        `${API}/members/${form._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update member"
        );
      }

      setEditing(false);
      setNewPhoto(null);
      setSelected(null);

      reload();
    } catch (err) {
      console.error("SAVE MEMBER ERROR:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div>
      {/* TOP BAR */}

      <div className="flex flex-wrap gap-4 mb-8">
        <input
          placeholder="🔍 Search member..."
          className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/10 outline-none"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={clubFilter}
          onChange={(e) =>
            setClubFilter(e.target.value)
          }
          className="px-4 py-3 rounded-xl bg-white/10 border border-white/10"
        >
          {clubs.map((club) => (
            <option
              key={club}
              value={club}
            >
              {club === "all"
                ? "All Clubs"
                : club}
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value)
          }
          className="px-4 py-3 rounded-xl bg-white/10 border border-white/10"
        >
          <option value="all">
            All Members
          </option>

          <option value="team">
            Presidential Team
          </option>

          <option value="member">
            Active Members
          </option>
        </select>
      </div>

      {/* EMPTY */}

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          No members found.
        </div>
      )}

      {/* GRID */}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((member) => (
          <motion.div
            key={member._id}
            whileHover={{
              scale: 1.05,
              y: -5,
            }}
            onClick={() =>
              setSelected(member)
            }
            className="cursor-pointer p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(0,255,200,0.4)] transition"
          >
            <img
              src={getImage(member.photo)}
              alt={member.name}
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/300x300?text=Member";
              }}
              className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-cyan-400"
            />

            <h3 className="text-center mt-4 font-bold text-lg">
              {member.name}
            </h3>

            <p className="text-center text-sm text-gray-400">
              {member.role || "Member"}
            </p>

            <p className="text-center text-xs text-gray-500 mt-2">
              {member.club}
            </p>

            <div className="flex justify-center mt-3">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                {member.type === "team"
                  ? "Presidential"
                  : "Member"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelected(null);
              setEditing(false);
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="relative bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md"
            >
              {/* CLOSE */}

              <button
                onClick={() => {
                  setSelected(null);
                  setEditing(false);
                }}
                className="absolute top-4 right-4 text-xl"
              >
                ✖
              </button>

              {editing ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">
                    Edit Member
                  </h2>

                  {/* CLUB */}

                  <select
                    className="input"
                    value={form.club || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        club: e.target.value,
                      })
                    }
                  >
                    {clubs
                      .filter(
                        (c) => c !== "all"
                      )
                      .map((club) => (
                        <option
                          key={club}
                          value={club}
                        >
                          {club}
                        </option>
                      ))}
                  </select>

                  {/* TYPE */}

                  <select
                    className="input"
                    value={
                      form.type || "member"
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="team">
                      Presidential Team
                    </option>

                    <option value="member">
                      Active Member
                    </option>
                  </select>

                  <input
                    className="input"
                    placeholder="Name"
                    value={form.name || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    className="input"
                    placeholder="Role"
                    value={form.role || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        role: e.target.value,
                      })
                    }
                  />

                  <input
                    className="input"
                    placeholder="Course"
                    value={form.course || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        course: e.target.value,
                      })
                    }
                  />

                  <input
                    className="input"
                    placeholder="Branch"
                    value={form.branch || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        branch: e.target.value,
                      })
                    }
                  />

                  <input
                    className="input"
                    placeholder="Year"
                    value={form.year || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        year: e.target.value,
                      })
                    }
                  />

                  {/* PHOTO */}

                  <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">
                      Replace Photo
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setNewPhoto(
                          e.target.files?.[0] ||
                            null
                        )
                      }
                    />
                  </div>

                  {/* BUTTONS */}

                  <div className="flex gap-3">
                    <button
                      onClick={saveEdit}
                      disabled={loading}
                      className="btn-green"
                    >
                      {loading
                        ? "Saving..."
                        : "Save"}
                    </button>

                    <button
                      onClick={() => {
                        setEditing(false);
                        setNewPhoto(null);
                      }}
                      className="btn-gray"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* IMAGE */}

                  <img
                    src={getImage(
                      selected.photo
                    )}
                    alt={selected.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x300?text=Member";
                    }}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-cyan-400"
                  />

                  <h2 className="text-center text-2xl font-bold mt-5">
                    {selected.name}
                  </h2>

                  <p className="text-center text-gray-400 mt-1">
                    {selected.role ||
                      "Member"}
                  </p>

                  <p className="text-center text-cyan-400 text-sm mt-2">
                    {selected.club}
                  </p>

                  <div className="mt-6 space-y-3 text-sm">
                    <p>
                      📚 {selected.course ||
                        "Not specified"}
                    </p>

                    <p>
                      🌿 {selected.branch ||
                        "Not specified"}
                    </p>

                    <p>
                      🎓 {selected.year ||
                        "Not specified"}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-7">
                    <button
                      onClick={() =>
                        startEdit(selected)
                      }
                      className="btn-blue"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteMember(
                          selected._id
                        )
                      }
                      className="btn-red"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .input {
          width: 100%;
          margin-bottom: 12px;
          padding: 11px 13px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          outline: none;
          color: white;
        }

        .input:focus {
          border-color: #22d3ee;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.3);
        }

        .input option {
          background: #0f172a;
        }

        .btn-green {
          background: #22c55e;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          flex: 1;
        }

        .btn-blue {
          background: #3b82f6;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          flex: 1;
        }

        .btn-red {
          background: #ef4444;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          flex: 1;
        }

        .btn-gray {
          background: #6b7280;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          flex: 1;
        }
      `}</style>
    </div>
  );
}