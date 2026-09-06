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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#101315]/95 backdrop-blur-xl shadow-[0_12px_35px_rgba(16,19,21,0.18)]'
            : 'bg-[#f5f3ed]/85 backdrop-blur-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center h-[76px]">

            {/* LOGO */}
            <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer group">
              <img src="/images/tejas.png" alt="Tejas logo" className="h-11 w-11 rounded-full object-cover ring-2 ring-[#e86f3d]/70 group-hover:rotate-6 group-hover:scale-110 transition duration-500" />
              <div>
                <h1 className={`display-font text-xl font-bold leading-none ${isScrolled ? 'text-white' : 'text-[#101315]'}`}>Tejas</h1>
                <p className={`text-[10px] uppercase tracking-[0.22em] mt-1 ${isScrolled ? 'text-white/60' : 'text-[#59605e]'}`}>The Dreamers Club</p>
              </div>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                    className={`uppercase text-[11px] tracking-[0.16em] font-semibold px-4 py-2 rounded-full transition ${
                    isScrolled
                        ? 'text-white/75 hover:text-[#c7d96b] hover:bg-white/10'
                        : 'text-[#59605e] hover:text-[#101315] hover:bg-black/5'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* MOBILE */}
            <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} className={`md:hidden p-2 rounded-full ${isScrolled ? 'text-white bg-white/10' : 'text-[#101315] bg-black/5'}`}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className={`md:hidden px-6 py-4 border-t ${isScrolled ? 'bg-[#101315] border-white/10' : 'bg-[#f5f3ed] border-black/10'}`}>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`block w-full text-left py-3 font-semibold text-sm uppercase tracking-[0.14em] ${isScrolled ? 'text-white/80' : 'text-[#101315]'}`}
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
