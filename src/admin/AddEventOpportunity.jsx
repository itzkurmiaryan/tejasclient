import { useState } from "react";
import API from "../config/api";

export default function AddEventOpportunity({ events, reload }) {
  const [form, setForm] = useState({ event: "", title: "", type: "student", description: "", seats: "" });
  const [loading, setLoading] = useState(false);
  const upcomingEvents = events.filter((item) => item.isUpcoming && new Date(item.date) >= new Date());

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API}/event-opportunities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, seats: Number(form.seats) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to publish requirement");
      setForm({ event: "", title: "", type: "student", description: "", seats: "" });
      reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <p className="text-xs uppercase tracking-[.2em] text-[#c7d96b]">Admin console</p>
      <h2 className="text-3xl font-bold mt-2 text-orange-400">Add Event Requirement</h2>
      <p className="text-sm text-white/50 mt-1">This will appear under Who are we looking for? on the selected event.</p>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mt-7">
        <select required name="event" value={form.event} onChange={handleChange} className="input">
          <option value="">Select event</option>
          {upcomingEvents.map((item) => <option key={item._id} value={item._id}>{item.name} ({item.club})</option>)}
        </select>
        <input required name="title" value={form.title} onChange={handleChange} placeholder="Requirement title, e.g. Registration volunteers" className="input" />
        <select name="type" value={form.type} onChange={handleChange} className="input">
          <option value="student">Students</option><option value="volunteer">Volunteers</option><option value="competition">Competition</option><option value="other">Other</option>
        </select>
        <input required type="number" min="1" name="seats" value={form.seats} onChange={handleChange} placeholder="Number of seats" className="input" />
        <textarea required name="description" value={form.description} onChange={handleChange} placeholder="Details / eligibility" className="input md:col-span-2 min-h-24" />
        <button disabled={loading || upcomingEvents.length === 0} className="md:col-span-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 py-3 font-bold disabled:opacity-50">{loading ? "Publishing..." : "Publish requirement"}</button>
      </form>
      {upcomingEvents.length === 0 && <p className="mt-4 text-sm text-amber-300">No upcoming events are available for requirements.</p>}
      <style>{`.input { background: rgba(0,0,0,.25); border: 1px solid rgba(255,255,255,.1); padding: 12px 14px; border-radius: 12px; outline: none; color: white; } .input:focus { border-color: #e86f3d; } option { background: #17121a; }`}</style>
    </section>
  );
}