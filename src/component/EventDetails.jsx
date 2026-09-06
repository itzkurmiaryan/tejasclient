import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import API from "../config/api";

const typeLabels = {
  volunteer: "Volunteers",
  student: "Students",
  competition: "Competition",
  other: "Event team",
};

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/events/${eventId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then(setEvent)
      .catch(() => setError("This event could not be found."))
      .finally(() => setLoading(false));
  }, [eventId]);

  useEffect(() => {
    fetch(`${API}/event-opportunities/event/${eventId}`)
      .then((res) => res.ok ? res.json() : [])
      .then(setOpportunities)
      .catch(() => setOpportunities([]));
  }, [eventId]);

  if (loading) {
    return <main className="min-h-screen bg-[#101315] text-white px-6 py-32"><div className="max-w-6xl mx-auto h-96 rounded-[2rem] bg-white/10 animate-pulse" /></main>;
  }

  if (error || !event) {
    return <main className="min-h-screen bg-[#101315] text-white flex flex-col items-center justify-center gap-6"><p className="text-white/60">{error}</p><Link to="/events" className="text-[#c7d96b]">Back to events</Link></main>;
  }

  const date = new Date(event.date);
  const activeRequirements = (opportunities.length > 0 ? opportunities : event.requirements || []).filter((item) => item.active !== false);

  return (
    <main className="min-h-screen bg-[#101315] text-white dark-grid overflow-hidden">
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="absolute -right-32 top-20 w-96 h-96 rounded-full border border-[#e86f3d]/25" />
        <Link to="/events" className="relative z-10 inline-flex items-center gap-2 text-xs uppercase tracking-[.2em] text-white/55 hover:text-white transition"><ArrowLeft size={15} /> All events</Link>
        <div className="relative z-10 grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-end mt-10">
          <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#c7d96b] text-xs uppercase tracking-[.24em] font-bold mb-5">{event.club} / Featured event</p>
            <h1 className="display-font text-5xl md:text-7xl font-bold leading-[.95]">{event.name}</h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl mt-7">{event.description}</p>
          </Motion.div>
          <Motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15 }} className="rounded-[2rem] overflow-hidden border border-white/15 shadow-2xl bg-white/5">
            {event.images?.[0] ? <img src={event.images[0]} alt={event.name} className="w-full h-72 object-cover" /> : <div className="h-72 bg-gradient-to-br from-[#e86f3d]/50 to-[#c7d96b]/20" />}
          </Motion.div>
        </div>
        <div className="relative z-10 grid sm:grid-cols-2 gap-3 max-w-xl mt-10">
          <div className="rounded-2xl bg-white/[.06] border border-white/10 p-4 flex items-center gap-3"><CalendarDays className="text-[#e86f3d]" size={21} /><span><small className="block text-white/40 uppercase tracking-widest text-[9px]">When</small>{date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span></div>
          <div className="rounded-2xl bg-white/[.06] border border-white/10 p-4 flex items-center gap-3"><Users className="text-[#c7d96b]" size={21} /><span><small className="block text-white/40 uppercase tracking-widest text-[9px]">Hosted by</small>{event.club}</span></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-[1.1fr_.9fr] gap-8">
        <div className="space-y-8">
          <div className="rounded-[2rem] bg-white/[.06] border border-white/10 p-8 md:p-10">
            <p className="text-[#c7d96b] text-[10px] uppercase tracking-[.24em] font-bold mb-4">01 / About this event</p>
            <h2 className="display-font text-4xl font-bold mb-5">The experience</h2>
            <p className="text-white/70 leading-8">{event.description}</p>
            {event.highlights?.length > 0 && <div className="flex flex-wrap gap-2 mt-8">{event.highlights.map((highlight) => <span key={highlight} className="px-3 py-2 rounded-full bg-[#e86f3d]/15 border border-[#e86f3d]/30 text-sm text-white/80">{highlight}</span>)}</div>}
          </div>
          {event.images?.length > 1 && <div className="rounded-[2rem] bg-white/[.04] border border-white/10 p-6"><p className="text-white/40 text-[10px] uppercase tracking-[.24em] mb-5">Event frames</p><div className="grid sm:grid-cols-2 gap-3">{event.images.slice(1).map((image, index) => <img key={image + index} src={image} alt={`${event.name} ${index + 2}`} className="w-full h-44 object-cover rounded-xl hover:scale-[1.02] transition" />)}</div></div>}
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-[#e86f3d]/20 to-[#c7d96b]/10 border border-white/15 p-8 md:p-10 h-fit lg:sticky lg:top-28">
          <p className="text-[#c7d96b] text-[10px] uppercase tracking-[.24em] font-bold mb-4">02 / Get involved</p>
          <h2 className="display-font text-4xl font-bold">Who are we looking for?</h2>
          {activeRequirements.length > 0 ? <div className="space-y-3 mt-7">{activeRequirements.map((requirement, index) => { const content = <div className="rounded-2xl bg-black/20 border border-white/10 p-4"><div className="flex items-start justify-between gap-3"><div className="flex gap-3"><CheckCircle2 className="text-[#c7d96b] shrink-0 mt-1" size={18} /><div><h3 className="font-bold">{requirement.title || typeLabels[requirement.type]}</h3><p className="text-xs uppercase tracking-wider text-[#e86f3d] mt-1">{typeLabels[requirement.type] || "Event team"}</p></div></div>{(requirement.seats || requirement.capacity) > 0 && <span className="text-xs text-white/50 whitespace-nowrap">{requirement.seats || requirement.capacity} seats</span>}</div>{requirement.description && <p className="text-sm text-white/65 mt-3 pl-7">{requirement.description}</p>}{requirement._id && <div className="mt-4 border-t border-white/10 pt-3 text-sm font-bold text-[#e86f3d]">Click to apply <span aria-hidden="true">→</span></div>}</div>; return requirement._id ? <Link key={requirement._id} to={`/event-opportunities/${requirement._id}`} className="block cursor-pointer rounded-2xl ring-1 ring-transparent transition hover:ring-[#e86f3d]">{content}</Link> : <div key={index}>{content}</div>; })}</div> : <p className="text-white/60 mt-6 leading-relaxed">No special requirements have been added yet. You can still join the wider Tejas community.</p>}
        </div>
      </section>
    </main>
  );
}
