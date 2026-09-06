import API from "../config/api";

export default function EventOpportunityList({ data, reload }) {

  const updateOpportunity = async (id, active) => {
    await fetch(`${API}/event-opportunities/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active }) });
    reload();
  };

  const deleteOpportunity = async (id) => {
    if (!window.confirm("Delete this event requirement and its applications?")) return;
    await fetch(`${API}/event-opportunities/${id}`, { method: "DELETE" });
    reload();
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-orange-400 mb-6">Event Requirements & Applications</h2>
      <div className="space-y-5">
        {data.length === 0 && <p className="text-white/50">No event requirements published yet.</p>}
        {data.map((item) => (
          <article key={item._id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <div><p className="text-[#c7d96b] text-xs uppercase tracking-wider">{item.eventName}</p><h3 className="text-xl font-bold mt-1">{item.title}</h3><p className="text-sm text-white/55 mt-1">{item.description}</p></div>
              <div className="text-right"><p className={item.active ? "text-green-400" : "text-red-400"}>{item.active ? "Open" : "Closed"}</p><p className="text-sm text-white/55">{item.applications.length} / {item.seats} applications</p></div>
            </div>
            <div className="mt-5 space-y-2">
              {item.applications.length === 0 && <p className="text-sm text-white/40">No applications yet.</p>}
              {item.applications.map((application) => (
                <div key={application._id} className="grid sm:grid-cols-5 gap-2 rounded-xl bg-white/5 p-3 text-sm"><span>{application.name}</span><span>{application.studentId}</span><span>{application.course}</span><span>{application.phone}</span><span>{application.year}</span></div>
              ))}
            </div>
            <div className="flex gap-3 mt-5"><button onClick={() => updateOpportunity(item._id, !item.active)} className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold">{item.active ? "Close" : "Open"}</button><button onClick={() => deleteOpportunity(item._id)} className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold">Delete</button></div>
          </article>
        ))}
      </div>
    </section>
  );
}