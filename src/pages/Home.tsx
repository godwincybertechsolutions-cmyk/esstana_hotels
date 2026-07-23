import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Users, Award, Shield, Compass, Sparkles } from 'lucide-react';
import { ROOMS_DATA } from '../data';

export default function Home() {
  const navigate = useNavigate();
  const [quickCheck, setQuickCheck] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    guests: 2,
  });

  const handleQuickCheck = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/booking', {
      state: {
        prefill: {
          checkIn: quickCheck.checkIn,
          checkOut: quickCheck.checkOut,
          guests: Number(quickCheck.guests),
        }
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoom = (roomTypeId: string) => {
    navigate('/booking', {
      state: {
        prefill: {
          checkIn: quickCheck.checkIn,
          checkOut: quickCheck.checkOut,
          guests: Number(quickCheck.guests),
          roomTypeId,
        }
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-page" className="bg-[#FAF9F6] text-[#1A1A1A] overflow-hidden">
      {/* Hero Section */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center bg-black">
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/esstana_hotel_lobby_1784642184817.jpg"
            alt="Esstana Lobby Entrance"
            className="w-full h-full object-cover opacity-60 filter saturate-[0.85] scale-105 animate-subtle-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-[#FAF9F6] flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex items-center space-x-2 text-[#C5A880] uppercase tracking-[0.4em] text-xs font-mono mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Sanctuary of Sensory Serenity</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-serif text-4xl md:text-7xl font-light tracking-[0.15em] leading-tight uppercase max-w-4xl"
          >
            ESSTANA HOTELS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="mt-6 text-sm md:text-lg font-light tracking-widest text-[#FAF9F6]/80 max-w-2xl font-sans"
          >
            A prestigious escape tailored for executive clarity, Michelin-calibre dining, and deep acoustic peace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-10"
          >
            <button
              onClick={() => {
                navigate('/booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#C5A880] hover:bg-[#B89047] text-black px-8 py-4 rounded-lg text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(197,168,128,0.3)] cursor-pointer"
            >
              Reserve Your Stay
            </button>
          </motion.div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#FAF9F6]/40 font-mono text-[9px] uppercase tracking-[0.3em] animate-bounce">
          <span>Scroll down</span>
          <div className="w-[1px] h-8 bg-[#C5A880]/30 mt-2" />
        </div>
      </section>

      {/* Quick Check-in Bar */}
      <section id="quick-check-in-bar" className="relative z-20 max-w-6xl mx-auto px-6 -mt-16">
        <form
          onSubmit={handleQuickCheck}
          className="bg-[#121212]/95 backdrop-blur-md border border-[#C5A880]/30 rounded-xl p-6 md:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-6 text-[#FAF9F6]"
        >
          {/* Check In */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono font-medium flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Check In</span>
            </label>
            <input
              type="date"
              value={quickCheck.checkIn}
              onChange={(e) => setQuickCheck({ ...quickCheck, checkIn: e.target.value })}
              className="bg-black/50 border border-[#C5A880]/20 rounded-lg p-3 text-xs focus:outline-none focus:border-[#C5A880] text-white"
              required
            />
          </div>

          {/* Check Out */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono font-medium flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Check Out</span>
            </label>
            <input
              type="date"
              value={quickCheck.checkOut}
              onChange={(e) => setQuickCheck({ ...quickCheck, checkOut: e.target.value })}
              className="bg-black/50 border border-[#C5A880]/20 rounded-lg p-3 text-xs focus:outline-none focus:border-[#C5A880] text-white"
              required
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono font-medium flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>Guests</span>
            </label>
            <select
              value={quickCheck.guests}
              onChange={(e) => setQuickCheck({ ...quickCheck, guests: Number(e.target.value) })}
              className="bg-black/50 border border-[#C5A880]/20 rounded-lg p-3 text-xs focus:outline-none focus:border-[#C5A880] text-white"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num} className="bg-black text-white">
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Action */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#C5A880] hover:bg-[#B89047] text-black font-semibold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Verify Rates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </section>

      {/* The Esstana Philosophy */}
      <section id="philosophy-section" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
              Modern Masterpiece
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight uppercase">
              The Art of Restful Architecture
            </h2>
            <div className="w-20 h-[1px] bg-[#C5A880]" />
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
              Founded on the concept of quiet opulence, Esstana Hotels provides an absolute sanctuary for high-performing individuals, executives, and couples seeking perfect recovery.
            </p>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
              Our structures emphasize clean lines, balanced negative space, and premium materials. Every surface is crafted from natural marble, polished brass, or brushed walnut timber to resonate a profound, soothing calmness.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-lg">
                  <Shield className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-semibold font-mono">Acoustic Shield</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-lg">
                  <Award className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-semibold font-mono">Michelin Dining</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-lg">
                  <Compass className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-semibold font-mono">Curated Tours</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 border border-[#C5A880]/20 rounded-2xl -z-10" />
            <img
              src="/src/assets/images/esstana_luxury_suite_1784642199789.jpg"
              alt="Presidential Suite Sunset"
              className="w-full h-[450px] object-cover rounded-xl shadow-2xl filter saturate-[0.9]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 right-6 bg-[#121212] text-[#FAF9F6] p-6 rounded-lg max-w-xs shadow-xl border-l-2 border-[#C5A880]">
              <span className="block text-2xl font-serif text-[#C5A880]">"Sublime."</span>
              <p className="text-[10px] text-[#FAF9F6]/60 mt-2 font-sans italic leading-relaxed">
                "An incredible hotel where the focus is entirely on acoustic peace and custom luxury. Truly a masterpiece."
              </p>
              <span className="block text-[9px] uppercase tracking-widest text-[#C5A880] mt-3 font-mono">
                — Financial Times Review
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Suites Showcase */}
      <section id="suites-showcase" className="py-24 bg-[#121212] text-[#FAF9F6] px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            Curated Sanctuaries
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mt-4 text-center">
            Our Private Accommodations
          </h2>
          <div className="w-20 h-[1px] bg-[#C5A880] mt-6 mb-16" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
            {ROOMS_DATA.map((room) => (
              <div
                key={room.id}
                id={`suite-card-${room.id}`}
                className="bg-[#1C1C1C] border border-[#C5A880]/15 hover:border-[#C5A880]/40 rounded-xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 group"
              >
                {/* Room Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-[#121212]/95 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono px-3.5 py-1.5 rounded-md">
                    From ${room.pricePerNight} / Night
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg tracking-wider uppercase text-[#FAF9F6] group-hover:text-[#C5A880] transition-colors">
                      {room.name}
                    </h3>
                    <div className="flex space-x-4 text-[10px] text-[#C5A880] font-mono mt-2 uppercase tracking-wider">
                      <span>{room.size}</span>
                      <span>•</span>
                      <span>{room.bedType}</span>
                    </div>
                    <p className="text-xs text-[#FAF9F6]/60 leading-relaxed font-sans mt-4 line-clamp-3">
                      {room.description}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-[#C5A880]/10 pt-6 flex items-center justify-between">
                    <button
                      onClick={() => handleSelectRoom(room.id)}
                      className="text-xs text-[#C5A880] font-mono tracking-widest uppercase hover:text-[#FAF9F6] flex items-center space-x-2 transition-colors group/btn cursor-pointer"
                    >
                      <span>Configure Booking</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[9px] text-[#FAF9F6]/30 uppercase tracking-widest font-mono">
                      {room.totalRooms} available
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary highlight section */}
      <section id="culinary-highlight" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 border border-[#C5A880]/20 rounded-2xl -z-10" />
            <img
              src="/src/assets/images/esstana_restaurant_1784642212536.jpg"
              alt="L'Ambroisie Dining"
              className="w-full h-[450px] object-cover rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="order-1 lg:order-2 flex flex-col space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
              Gourmet Heritage
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight uppercase text-right lg:text-left">
              L’Ambroisie Gastronomy
            </h2>
            <div className="w-20 h-[1px] bg-[#C5A880] self-end lg:self-start" />
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans text-right lg:text-left">
              Curated by the highly acclaimed Michelin-style master Executive Chef Marc Laurent, L'Ambroisie offers an extraordinary culinary symphony using ingredients picked daily from our private organic country estate.
            </p>
            <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans text-right lg:text-left">
              Complement your summer 7-course tasting menu with fine wine pairings selected by our Head Sommelier, from our majestic vaulted cellar housing over 800 vintage bottles.
            </p>
            <div className="flex justify-end lg:justify-start pt-4">
              <button
                onClick={() => {
                  navigate('/services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border border-[#C5A880] hover:bg-[#C5A880] hover:text-black text-black px-6 py-3.5 rounded-lg text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer"
              >
                Explore Gastronomy & Venues
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Prestige Testimonials */}
      <section id="prestige-testimonials" className="py-24 bg-[#FAF9F6] border-t border-[#C5A880]/10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            SOCIETY RECOGNITION
          </span>
          <h2 className="font-serif text-3xl font-light uppercase mt-3">
            Dignified Guest Appraisals
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A880] mt-4 mb-12" />

          <div className="flex flex-col space-y-12">
            <blockquote className="relative">
              <p className="font-serif text-lg md:text-2xl font-light italic leading-relaxed text-[#1A1A1A]">
                "The quietness of Esstana is unparalleled. For someone who spends hours in boardrooms, the extreme dedication to acoustical architecture and privacy is an absolute luxury. I leave restored and focused."
              </p>
              <cite className="block text-xs uppercase tracking-[0.2em] text-[#C5A880] mt-6 font-mono font-semibold">
                — Baroness Sofia de Groote • European Finance Forum Chair
              </cite>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
}
