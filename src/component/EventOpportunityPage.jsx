import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import API from "../config/api";

const initialForm = { name: "", studentId: "", course: "", phone: "", year: "" };

export default function EventOpportunityPage() {
  const { opportunityId } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: true, error: "", submitted: false });

  useEffect(() => {
    fetch(`${API}/event-opportunities/${opportunityId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Opportunity not found");
        return res.json();
      })
      .then((data) => setOpportunity(data))
      .catch(() => setStatus({ loading: false, error: "This opportunity is no longer available.", submitted: false }))
      .finally(() => setStatus((current) => ({ ...current, loading: false })));
  }, [opportunityId]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus((current) => ({ ...current, loading: true, error: "" }));

    try {
      const response = await fetch(`${API}/event-opportunities/${opportunityId}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to submit application");
      setStatus({ loading: false, error: "", submitted: true });
    } catch (error) {
      setStatus((current) => ({ ...current, loading: false, error: error.message }));
    }
  };

  if (status.loading && !opportunity) {
    return <main className="min-h-screen bg-[#101315] text-white px-6 py-32"><div className="max-w-2xl mx-auto h-96 rounded-3xl bg-white/10 animate-pulse" /></main>;
  }

  if (status.error && !opportunity) {
    return <main className="min-h-screen bg-[#101315] text-white flex flex-col items-center justify-center gap-6 px-6"><p className="text-white/65">{status.error}</p><Link to="/events" className="text-[#c7d96b]">Back to events</Link></main>;
  }

  return (
    <main className="min-h-screen bg-[#101315] text-white dark-grid px-6 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <Link to={`/events/${opportunity.event}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-[.2em] text-white/55 hover:text-white"><ArrowLeft size={15} /> Back to event</Link>
        <Motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="mt-10 rounded-[2rem] border border-white/15 bg-white/[.06] p-7 md:p-12 shadow-2xl">
          <p className="text-[#c7d96b] text-xs uppercase tracking-[.24em] font-bold">{opportunity.eventName}</p>
          <h1 className="display-font text-4xl md:text-6xl font-bold mt-4">{opportunity.title}</h1>
          {opportunity.description && <p className="text-white/65 leading-relaxed mt-5">{opportunity.description}</p>}
          <div className="flex items-center gap-2 text-sm text-[#e86f3d] mt-5"><CheckCircle2 size={17} /> {opportunity.seats - opportunity.applications.length} spots remaining</div>

          {status.submitted ? (
            <div className="mt-10 rounded-2xl border border-[#c7d96b]/30 bg-[#c7d96b]/10 p-7 text-center"><CheckCircle2 className="mx-auto text-[#c7d96b]" size={42} /><h2 className="text-2xl font-bold mt-4">Application submitted</h2><p className="text-white/65 mt-2">Your details have been sent to the admin team.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5 mt-10">
              {[
                ["name", "Name", "Your full name"],
                ["studentId", "Student ID", "Your student ID"],
                ["course", "Course", "B.Tech / BCA / MBA"],
                ["phone", "Contact number", "+91 9876543210"],
                ["year", "Year", "1st / 2nd / 3rd / 4th year"],
              ].map(([name, label, placeholder]) => (
                <label key={name} className="flex flex-col gap-2 text-sm font-semibold text-white/75">
                  {label} *
                  <input required name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none focus:border-[#e86f3d] placeholder:text-white/30" />
                </label>
              ))}
              {status.error && <p className="sm:col-span-2 text-sm text-red-300">{status.error}</p>}
              <button disabled={status.loading} className="sm:col-span-2 rounded-xl bg-[#e86f3d] py-4 font-bold hover:bg-[#f18452] disabled:opacity-50">{status.loading ? "Submitting..." : "Submit application"}</button>
            </form>
          )}
        </Motion.div>
      </div>
    </main>
  );
}