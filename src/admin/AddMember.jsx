import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../config/api";
import { clubs as clubCatalog } from "../config/clubs";

export default function AddMember({ reload }) {
  const [form, setForm] = useState({
    club: clubCatalog[0]?.name || "",
    type: "team",
    role: "",
    name: "",
    course: "",
    branch: "",
    year: "",
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const clubs = clubCatalog;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // IMAGE SELECT
  // =====================================================

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setPhoto(file);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (!form.club) {
      setError("Please select a club.");
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter member name.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("club", form.club);
      formData.append("type", form.type);
      formData.append("role", form.role);
      formData.append("name", form.name);
      formData.append("course", form.course);
      formData.append("branch", form.branch);
      formData.append("year", form.year);

      if (photo) {
        formData.append("photo", photo);
      }

      const res = await fetch(`${API}/members`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to add member"
        );
      }

      console.log("MEMBER ADDED:", data);

      // Reset
      setForm({
        club: clubs[0]?.name || "",
        type: "team",
        role: "",
        name: "",
        course: "",
        branch: "",
        year: "",
      });

      setPhoto(null);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview("");

      reload();

      alert("Member added successfully ✅");
    } catch (err) {
      console.error("ADD MEMBER ERROR:", err);
      setError(err.message || "Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,255,200,0.2)]"
    >
      <h2 className="text-3xl font-bold mb-8 text-green-400">
        Add Member 👥
      </h2>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* CLUB */}

        <select
          value={form.club}
          onChange={(e) =>
            setForm({
              ...form,
              club: e.target.value,
            })
          }
          className="input"
          required
        >
          {clubs.length === 0 ? (
            <option value="">Loading clubs...</option>
          ) : (
            clubs.map((club) => (
              <option key={club._id} value={club.name}>
                {club.name}
              </option>
            ))
          )}
        </select>

        {/* TYPE */}

        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
          className="input"
        >
          <option value="team">
            Presidential Team
          </option>

          <option value="member">
            Active Member
          </option>
        </select>

        {/* NAME */}

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="input"
          required
        />

        {/* ROLE */}

        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          className="input"
        />

        {/* COURSE */}

        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) =>
            setForm({
              ...form,
              course: e.target.value,
            })
          }
          className="input"
        />

        {/* BRANCH */}

        <input
          placeholder="Branch"
          value={form.branch}
          onChange={(e) =>
            setForm({
              ...form,
              branch: e.target.value,
            })
          }
          className="input"
        />

        {/* YEAR */}

        <input
          placeholder="Year"
          value={form.year}
          onChange={(e) =>
            setForm({
              ...form,
              year: e.target.value,
            })
          }
          className="input"
        />

        {/* PHOTO */}

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-300 mb-2">
            Member Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full text-sm"
          />

          {preview && (
            <div className="mt-5 flex items-center gap-5">
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 rounded-full object-cover border-2 border-green-400"
              />

              <div>
                <p className="text-green-400 font-semibold">
                  Image selected ✓
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Maximum size: 5 MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* BUTTON */}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="md:col-span-2 py-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-600 font-bold shadow-lg disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Member"}
        </motion.button>
      </form>

      <style jsx>{`
        .input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 12px;
          outline: none;
          color: white;
          width: 100%;
        }

        .input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
        }

        .input option {
          background: #111827;
          color: white;
        }
      `}</style>
    </motion.div>
  );
}