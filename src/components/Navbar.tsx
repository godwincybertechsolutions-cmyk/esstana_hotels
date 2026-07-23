import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Hotel, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  openAIConcierge: () => void;
}

export default function Navbar({ openAIConcierge }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services & Facilities' },
    { path: '/booking', label: 'Booking System' },
    { path: '/attractions', label: 'Attractions' },
    { path: '/gallery', label: 'Gallery & Blog' },
    { path: '/contact', label: 'Contact Us' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#121212]/95 backdrop-blur-md border-b border-[#C5A880]/20 py-4 shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link
          id="logo-brand"
          to="/"
          className="flex items-center space-x-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-[#C5A880] flex items-center justify-center bg-black/40 group-hover:bg-[#C5A880]/10 transition-colors">
            <Hotel className="w-5 h-5 text-[#C5A880] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="block text-xl font-serif tracking-[0.2em] text-[#FAF9F6] font-light leading-none">
              ESSTANA
            </span>
            <span className="block text-[9px] uppercase tracking-[0.3em] text-[#C5A880] mt-1 font-mono font-medium">
              Hotels & Resorts
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                id={`nav-item-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.2em] font-medium font-sans cursor-pointer transition-all duration-300 relative py-2 ${
                    isActive
                      ? 'text-[#C5A880]'
                      : 'text-[#FAF9F6]/80 hover:text-[#C5A880]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A880] transition-all duration-300" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <button
            id="nav-ai-concierge-btn"
            onClick={openAIConcierge}
            className="flex items-center space-x-2 bg-gradient-to-r from-[#C5A880]/20 to-[#C5A880]/10 hover:from-[#C5A880] hover:to-[#B89047] hover:text-black border border-[#C5A880]/40 text-[#C5A880] px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-medium cursor-pointer transition-all duration-500 hover:shadow-[0_0_15px_rgba(197,168,128,0.3)] hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Concierge</span>
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            id="mobile-ai-concierge-btn"
            onClick={openAIConcierge}
            className="p-2 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880]"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#FAF9F6] hover:text-[#C5A880] p-1 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden fixed inset-0 top-[73px] bg-[#0E0E0E] z-40 border-t border-[#C5A880]/10 flex flex-col justify-between py-12 px-8 overflow-y-auto"
        >
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                id={`mobile-nav-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={({ isActive }) =>
                  `text-left text-lg font-serif tracking-widest uppercase transition-colors ${
                    isActive ? 'text-[#C5A880]' : 'text-[#FAF9F6]/80 hover:text-[#C5A880]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-[#C5A880]/10 pt-8 flex flex-col space-y-4">
            <button
              id="mobile-drawer-ai-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAIConcierge();
              }}
              className="flex items-center justify-center space-x-2 bg-[#C5A880] hover:bg-[#B89047] text-black w-full py-3.5 rounded-lg text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>Consult AI Concierge</span>
            </button>
            <div className="text-center">
              <p className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-widest">
                Esstana Guest Services
              </p>
              <p className="text-[11px] text-[#C5A880] mt-1 font-mono">
                +1 (800) ESSTANA
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
