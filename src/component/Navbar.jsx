import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', id: 'about' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Join Us', path: '/join-us' }, 
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setIsOpen(false);

    if (link.path) {
      navigate(link.path);
      return;
    }

    // Only scroll if on homepage
    if (location.pathname === '/') {
      const el = document.getElementById(link.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: link.id } });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500 ${
          isScrolled
            ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-2xl'
            : 'bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">

            {/* LOGO */}
            <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group">
              <img src="/images/abhiruchi.png" className="h-12 w-12 group-hover:scale-125 transition" />
              <div>
                <h1 className={`font-extrabold ${isScrolled ? 'text-white' : 'text-purple-800'}`}>Abhiruchi</h1>
                <p className={`${isScrolled ? 'text-gray-200' : 'text-purple-600'}`}>The Hobby Club</p>
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`uppercase text-sm font-medium px-3 py-2 rounded-lg transition ${
                    isScrolled
                      ? 'text-white hover:text-amber-400'
                      : 'text-purple-800 hover:text-pink-500'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* MOBILE */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white px-6 py-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="block w-full text-left py-3 font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* spacer so content not hidden under navbar */}
      <div className="h-20" />
    </>
  );
}
