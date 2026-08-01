import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Users, Award, Shield, Compass, Sparkles, MapPin, Phone, Zap } from 'lucide-react';
import { ROOMS_DATA, ATTRACTIONS_DATA } from '../data';
import OptionWheel from '../components/OptionWheel';
import FallingText from '../components/FallingText';
import '../components/FallingText.css';

export default function Home() {
  const navigate = useNavigate();
  const [quickCheck, setQuickCheck] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    guests: 2,
  });
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const roomNames = ROOMS_DATA.map(r => r.name);

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
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center bg-black py-20">
        {/* Background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/esstana_hotel_lobby_1784642184817.jpg"
            alt="Esstana Lobby Entrance"
            className="w-full h-full object-cover opacity-60 filter saturate-[0.85] scale-105 animate-subtle-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
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
            <span>YOUR PERFECT GETAWAY</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="w-full max-w-5xl"
          >
            <FallingText
              text="ESSTANA HOTELS"
              highlightWords={['ESSTANA']}
              highlightClass="highlighted"
              trigger="scroll"
              fontSize="3.5rem"
              gravity={0.8}
              backgroundColor="transparent"
              className="falling-text-hero"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="mt-6 text-sm md:text-lg font-light tracking-wide text-[#FAF9F6]/90 max-w-3xl font-sans leading-relaxed"
          >
            Esstana Hotels is the perfect getaway to indulge yourself in sumptuous meals, highly affordable accommodation, conducive environments for conferences, board meetings, outings, parties and a host of other treats for yourself. We are just a call away and you are most welcome.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
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
            <a
              href="tel:+254707937736"
              className="border border-[#C5A880] hover:bg-[#C5A880]/20 text-[#FAF9F6] px-8 py-4 rounded-lg text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>+254 707 937 736</span>
            </a>
          </motion.div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#FAF9F6]/40 font-mono text-[9px] uppercase tracking-[0.3em] animate-bounce">
          <span>Scroll down</span>
          <div className="w-[1px] h-6 bg-[#C5A880]/30 mt-2" />
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

      {/* The Esstana Philosophy & Location Intro */}
      <section id="philosophy-section" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
              Welcome to Embu, Kenya
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight uppercase">
              Sumptuous Comfort & Convenience
            </h2>
            <div className="w-20 h-[1px] bg-[#C5A880]" />
            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans">
              Esstana Hotels is the perfect getaway to indulge yourself in sumptuous meals, highly affordable accommodation, conducive environments for conferences, board meetings, outings, parties and a host of other treats for yourself.
            </p>
            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans">
              Esstana Hotels is just 200m away from the main highway; Embu-Meru highway. Just the most appropriate distance for you to have the perfect environment without noisy intrusions and perfect distance affording you the easy access to all necessities of security, movement and necessary ammenities. Embu Town centre is just 5 minutes ride from the hotel.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-lg">
                  <Shield className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-semibold font-mono">Secure Environment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-lg">
                  <Award className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-semibold font-mono">Sumptuous Meals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#C5A880]/10 rounded-lg">
                  <Compass className="w-5 h-5 text-[#C5A880]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest font-semibold font-mono">Local Attractions</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 border border-[#C5A880]/20 rounded-2xl -z-10" />
            <img
              src="/src/assets/images/esstana_luxury_suite_1784642199789.jpg"
              alt="Esstana Executive Accommodation"
              className="w-full h-[450px] object-cover rounded-xl shadow-2xl filter saturate-[0.9]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 right-6 bg-[#121212] text-[#FAF9F6] p-6 rounded-lg max-w-xs shadow-xl border-l-2 border-[#C5A880]">
              <span className="block text-xl font-serif text-[#C5A880]">"The Perfect Getaway."</span>
              <p className="text-[10px] text-[#FAF9F6]/80 mt-2 font-sans italic leading-relaxed">
                "Affordable luxury, delicious food, quiet environments for our corporate retreat, and easy access from the highway."
              </p>
              <span className="block text-[9px] uppercase tracking-widest text-[#C5A880] mt-3 font-mono">
                — Visitor Feedback
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Showcase */}
      <section id="suites-showcase" className="py-24 bg-[#121212] text-[#FAF9F6] px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono">
            Affordable Accommodation
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mt-4 text-center">
            Our Guest Rooms
          </h2>
          <div className="w-20 h-[1px] bg-[#C5A880] mt-6 mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
            {ROOMS_DATA.map((room) => (
              <div
                key={room.id}
                id={`suite-card-${room.id}`}
                className="bg-[#1C1C1C] border border-[#C5A880]/15 hover:border-[#C5A880]/40 rounded-xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 group"
              >
                {/* Room Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-[#121212]/95 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono px-3 py-1 rounded-md font-semibold">
                    from Ksh {room.pricePerNight}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base tracking-wider uppercase text-[#FAF9F6] group-hover:text-[#C5A880] transition-colors">
                      {room.name}
                    </h3>
                    <div className="flex space-x-3 text-[10px] text-[#C5A880] font-mono mt-1 uppercase tracking-wider">
                      <span>{room.size}</span>
                      <span>•</span>
                      <span>{room.bedType}</span>
                    </div>
                    <p className="text-xs text-[#FAF9F6]/60 leading-relaxed font-sans mt-3 line-clamp-3">
                      {room.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#C5A880]/10 pt-4 flex items-center justify-between">
                    <button
                      onClick={() => handleSelectRoom(room.id)}
                      className="text-xs text-[#C5A880] font-mono tracking-widest uppercase hover:text-[#FAF9F6] flex items-center space-x-1.5 transition-colors group/btn cursor-pointer"
                    >
                      <span>Book Room</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Interactive Room Selection */}
      <section id="interactive-rooms" className="py-32 bg-gradient-to-b from-[#FAF9F6] to-[#F5F4F1] px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-16"
          >
            <div className="flex items-center space-x-2 text-[#C5A880] uppercase tracking-[0.3em] text-xs font-mono mb-4">
              <Zap className="w-4 h-4" />
              <span>Interactive Experience</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mb-6">
              Explore Your Perfect Room
            </h2>
            <p className="text-sm text-[#1A1A1A]/70 max-w-2xl leading-relaxed">
              Discover our curated selection of premium accommodations using our interactive room explorer. Scroll, drag, or click to find your ideal getaway.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full items-start">
            {/* Option Wheel */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <OptionWheel
                items={roomNames}
                defaultSelected={selectedRoomIndex}
                onChange={(index) => setSelectedRoomIndex(index)}
                textColor="#1A1A1A"
                activeColor="#C5A880"
                fontSize={1.8}
                spacing={1.6}
                curve={1}
                tilt={8}
                blur={1}
                fade={0.2}
                minOpacity={0.1}
                smoothing={250}
                inset={60}
                loop={true}
                draggable={true}
                className="shadow-lg"
              />
            </motion.div>

            {/* Room Details Card */}
            <motion.div
              key={selectedRoomIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2"
            >
              {ROOMS_DATA[selectedRoomIndex] && (
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#C5A880]/10 h-full flex flex-col">
                  {/* Room Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={ROOMS_DATA[selectedRoomIndex].imageUrl}
                      alt={ROOMS_DATA[selectedRoomIndex].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 right-4 bg-[#C5A880] text-black px-4 py-2 rounded-lg font-semibold text-sm">
                      KSh {ROOMS_DATA[selectedRoomIndex].pricePerNight.toLocaleString()}/night
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="font-serif text-3xl font-light text-[#1A1A1A] mb-2">
                      {ROOMS_DATA[selectedRoomIndex].name}
                    </h3>
                    <div className="w-12 h-[2px] bg-[#C5A880] mb-4" />

                    <p className="text-sm text-[#1A1A1A]/75 leading-relaxed mb-6">
                      {ROOMS_DATA[selectedRoomIndex].description}
                    </p>

                    {/* Room Specs Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y border-[#C5A880]/10">
                      <div className="text-center">
                        <span className="block text-xs text-[#C5A880] uppercase tracking-widest font-mono mb-1">Size</span>
                        <span className="text-lg font-semibold text-[#1A1A1A]">{ROOMS_DATA[selectedRoomIndex].size}</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-xs text-[#C5A880] uppercase tracking-widest font-mono mb-1">Guests</span>
                        <span className="text-lg font-semibold text-[#1A1A1A]">{ROOMS_DATA[selectedRoomIndex].capacity}</span>
                      </div>
                      <div className="text-center">
                        <span className="block text-xs text-[#C5A880] uppercase tracking-widest font-mono mb-1">Available</span>
                        <span className="text-lg font-semibold text-[#1A1A1A]">{ROOMS_DATA[selectedRoomIndex].totalRooms}</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-6 flex-grow">
                      <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-mono font-semibold mb-3">
                        Room Amenities
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {ROOMS_DATA[selectedRoomIndex].amenities.slice(0, 6).map((amenity, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-[#1A1A1A]/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleSelectRoom(ROOMS_DATA[selectedRoomIndex].id)}
                      className="w-full bg-[#C5A880] hover:bg-[#B89047] text-black font-semibold py-3 rounded-lg uppercase tracking-widest text-xs transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Reserve</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culinary & Events section */}
      <section id="culinary-highlight" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 border border-[#C5A880]/20 rounded-2xl -z-10" />
            <img
              src="/src/assets/images/esstana_restaurant_1784642212536.jpg"
              alt="Esstana Dining & Events"
              className="w-full h-[450px] object-cover rounded-xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="order-1 lg:order-2 flex flex-col space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
              Sumptuous Treats
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight uppercase text-right lg:text-left">
              Dining, Meetings & Celebrations
            </h2>
            <div className="w-20 h-[1px] bg-[#C5A880] self-end lg:self-start" />
            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans text-right lg:text-left">
              Indulge yourself in sumptuous meals crafted to satisfy all tastes. Our dining space provides a warm and hospitable setting for breakfast, lunch, and dinner.
            </p>
            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans text-right lg:text-left">
              We also feature highly conducive environments for your corporate conferences, executive board meetings, family outings, and vibrant parties.
            </p>
            <div className="flex justify-end lg:justify-start pt-4">
              <button
                onClick={() => {
                  navigate('/services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border border-[#C5A880] hover:bg-[#C5A880] hover:text-black text-black px-6 py-3.5 rounded-lg text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer"
              >
                Explore Services & Facilities
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Quick Info Banner */}
      <section id="contact-banner" className="py-20 bg-[#121212] text-[#FAF9F6] border-t border-[#C5A880]/15 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-mono font-semibold">Address</span>
            <p className="text-xs text-[#FAF9F6]/80 font-sans">
              Esstana Hotels<br />
              Piai - Murinduko Rd<br />
              P.O. Box 2547 - 60100<br />
              Embu Kenya
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-mono font-semibold">Direct Calls</span>
            <p className="text-xs text-[#FAF9F6]/80 font-mono">
              Tel: +254 707 937 736<br />
              Tel: +254 786 242 544<br />
              Email: info@esstanahotels.com
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-mono font-semibold">Easy Access</span>
            <p className="text-xs text-[#FAF9F6]/80 font-sans">
              Just 200m from the Embu-Meru highway. Embu Town centre is 5 minutes away. Perfect distance for peace and access.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
