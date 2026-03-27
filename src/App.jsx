import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

// Home sections
import Hero from "./component/Hero";
import About from "./component/About";
import Gallery from "./component/Gallary"; 
import Contact from "./component/Contact";

// Pages
import Events from "./component/events";   
import JoinUs from "./component/JoinUs";   
import ClubPage from "./component/ClubPage";

import AdminLogin from "./admin/AdminLogin"
import AdminDashboard from "./admin/AdminDashboard"
import ProtectedRoute from "./admin/ProtectedRoute";

import UpcomingEvents from "./component/UpcomingEvents";
function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <UpcomingEvents />
      <Gallery />
      <Contact />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/club/:clubName" element={<ClubPage />} />
        <Route path="/admin" element={<AdminLogin />} />

        
<Route 
  path="/admin/dashboard" 
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  } 
/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
