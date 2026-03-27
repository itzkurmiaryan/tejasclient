import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Image,
  Users,
  MessageSquare,
  FileText,
  Bell
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import AddEvent from "./AddEvent";
import EventsList from "./EventsList";
import AddGallery from "./AddGallery";
import GalleryList from "./GalleryList";
import AddMember from "./AddMember";
import MembersList from "./MembersList";
import ApplicationsList from "./ApplicationsList";
// 🔥 ADD THESE (NEW)
import AddVacancy from "./AddVacancy";
import VacancyList from "./VacancyList";

import ContactList from "./ContactList";
import API from "../config/api";

export default function AdminDashboard() {

  const [events, setEvents] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [members, setMembers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);

    // 🔥 NEW STATE
  const [vacancies, setVacancies] = useState([]);



  const [activePage, setActivePage] = useState("dashboard");
  const [showNotif, setShowNotif] = useState(false);

  // LOAD DATA
  const loadData = async () => {
    const [e, g, m, a, c] = await Promise.all([
      fetch(`${API}/events`).then(r => r.json()),
      fetch(`${API}/gallery`).then(r => r.json()),
      fetch(`${API}/members`).then(r => r.json()),
      fetch(`${API}/applications`).then(r => r.json()),
      fetch(`${API}/contact`).then(r => r.json())
    ]);

    setEvents(e);
    setGalleries(g);
    setMembers(m);
    setApplications(a);
    setContacts(c);
  };

  // AUTO REFRESH
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // NOTIFICATIONS
  const notifications = [
    ...contacts.slice(0, 3).map(c => `📩 ${c.name} sent a message`),
    ...applications.slice(0, 3).map(a => `📝 ${a.name} applied`)
  ];

  // GRAPH DATA
  const chartData = [
    { name: "Events", value: events.length },
    { name: "Members", value: members.length },
    { name: "Requests", value: applications.length },
    { name: "Messages", value: contacts.length }
  ];

  const menu = [
    { key: "dashboard", icon: LayoutDashboard },
    { key: "events", icon: Calendar },
    { key: "gallery", icon: Image },
    { key: "members", icon: Users },
     { key: "vacancies", icon: Users }, // 🔥 NEW
    { key: "applications", icon: FileText },
    { key: "contacts", icon: MessageSquare }
  ];

  return (
    
    <div className="relative flex min-h-screen bg-gradient-to-br from-[#0a0a14] via-[#11121f] to-[#1c1c1c] text-white">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="w-96 h-96 bg-orange-500/20 blur-3xl rounded-full absolute top-10 left-10 animate-pulse"></div>
        <div className="w-96 h-96 bg-pink-500/20 blur-3xl rounded-full absolute bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* SIDEBAR */}
      <div className="w-72 p-6 backdrop-blur-xl bg-white/5 border-r border-white/10 relative">
        <h1 className="text-3xl font-bold mb-10 text-orange-400">
          Admin Panel
        </h1>

        <div className="space-y-3">
          {menu.map(({ key, icon: Icon }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActivePage(key)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl capitalize ${
                activePage === key
                  ? "bg-gradient-to-r from-orange-500 to-red-500"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon size={20} />
              {key}
            </motion.button>
          ))}
        </div>

        {/* STATUS */}
        <div className="absolute bottom-6 left-6 text-sm text-gray-400">
          System: <span className="text-green-400">● Online</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-10 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-4xl font-bold capitalize">{activePage}</h1>
            <p className="text-gray-400 text-sm">
              {new Date().toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4">

            <input
              placeholder="Search..."
              className="bg-white/10 px-4 py-2 rounded-xl outline-none"
            />
            

            {/* NOTIFICATION */}
            <div className="relative">
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="bg-white/10 p-3 rounded-xl relative"
              >
                <Bell />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-3 w-72 bg-black border border-white/10 rounded-xl p-4">
                  {notifications.map((n, i) => (
                    <div key={i} className="mb-2 text-sm">{n}</div>
                  ))}
                </div>
              )}
            </div>
            <button
  onClick={() => {
    localStorage.removeItem("isAdmin"); // ✅ logout
    window.location.href = "/admin";    // redirect to login
  }}
  className="mt-6 p-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
>
  Logout
</button>

          </div>
        </div>

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <>
            {/* HERO */}
            <div className="mb-10 p-8 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-white/10">
              <h2 className="text-3xl font-bold">Welcome Back 👑</h2>
            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-5 gap-6">
              <Card title="Events" value={events.length} />
              <Card title="Members" value={members.length} />
              <Card title="Requests" value={applications.length} />
              <Card title="Messages" value={contacts.length} />
              <Card title="Images"
                value={
                  events.reduce((a, e) => a + (e.images?.length || 0), 0) +
                  galleries.reduce((a, g) => a + (g.images?.length || 0), 0)
                }
              />
            </div>

            {/* MULTI GRAPHS */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <Graph title="Overview" data={chartData} />

              <Graph title="Growth" data={[
                { name: "Members", value: members.length },
                { name: "Events", value: events.length }
              ]} />

              <Graph title="User Activity" data={[
                { name: "Requests", value: applications.length },
                { name: "Messages", value: contacts.length }
              ]} />

            </div>

            {/* LIVE ACTIVITY */}
            <div className="mt-10 bg-white/5 p-6 rounded-2xl">
              <h2 className="text-xl mb-4">Live Activity</h2>

              {[...contacts.slice(0,3), ...applications.slice(0,3)].map((item, i) => (
                <div key={i} className="flex justify-between p-3 border-b border-white/10">
                  <p>
                    {item.message 
                      ? `📩 ${item.name} sent a message`
                      : `📝 ${item.name} applied`}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

          {/* 🔥 NEW VACANCY PAGE */}
        {activePage === "vacancies" && (
          <>
            <AddVacancy reload={loadData} />
            <VacancyList data={vacancies} reload={loadData} />
          </>
        )}

        {/* OTHER PAGES SAME */}
        {activePage === "events" && (
          <>
            <AddEvent reload={loadData} />
            <EventsList events={events} reload={loadData} />
          </>
        )}

        {activePage === "gallery" && (
          <>
            <AddGallery reload={loadData} />
            <GalleryList galleries={galleries} reload={loadData} />
          </>
        )}

        {activePage === "members" && (
          <>
            <AddMember reload={loadData} />
            <MembersList members={members} reload={loadData} />
          </>
        )}

        {activePage === "applications" && (
          <ApplicationsList data={applications} reload={loadData} />
        )}

        {activePage === "contacts" && (
          <ContactList data={contacts} reload={loadData} />
        )}

      </div>
    </div>
  );
}

// CARD
function Card({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:shadow-[0_0_25px_rgba(255,115,0,0.3)] transition"
    >
      <h2 className="text-gray-400">{title}</h2>
      <p className="text-4xl font-bold mt-3">{value}</p>
    </motion.div>
  );
}

// GRAPH
function Graph({ title, data }) {
  return (
    <div className="bg-white/5 p-6 rounded-2xl">
      <h3 className="mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}