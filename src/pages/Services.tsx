import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Wine, BedDouble, HelpCircle, Briefcase, Users, Car, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { FACILITIES_DATA } from '../data';
import { Facility } from '../types';

export default function Services() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Accommodation' | 'Boardroom' | 'Conference Facilities' | 'Bar' | 'Restaurant' | 'parking'>('All');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const filters: ('All' | 'Accommodation' | 'Boardroom' | 'Conference Facilities' | 'Bar' | 'Restaurant' | 'parking')[] = [
    'All',
    'Accommodation',
    'Boardroom',
    'Conference Facilities',
    'Bar',
    'Restaurant',
    'parking',
  ];

  const filteredFacilities = selectedFilter === 'All'
    ? FACILITIES_DATA
    : FACILITIES_DATA.filter(f => f.category === selectedFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Accommodation':
        return <BedDouble className="w-5 h-5 text-[#C5A880]" />;
      case 'Boardroom':
        return <Briefcase className="w-5 h-5 text-[#C5A880]" />;
      case 'Conference Facilities':
        return <Users className="w-5 h-5 text-[#C5A880]" />;
      case 'Bar':
        return <Wine className="w-5 h-5 text-[#C5A880]" />;
      case 'Restaurant':
        return <Wine className="w-5 h-5 text-[#C5A880]" />;
      case 'parking':
        return <Car className="w-5 h-5 text-[#C5A880]" />;
      default:
        return <HelpCircle className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  const handleVenueReserve = (facility: Facility) => {
    if (facility.category === 'Accommodation') {
      navigate('/booking', { state: { prefill: { roomTypeId: 'deluxe-king' } } });
    } else if (facility.category === 'Boardroom') {
      navigate('/booking', { state: { prefill: { roomTypeId: 'executive-suite' } } });
    } else {
      navigate('/contact');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="services-page" className="bg-[#FAF9F6] text-[#1A1A1A] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Title & Introduction */}
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
          Luxury Facilities
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mt-4 text-center">
          Services & Venues
        </h1>
        <div className="w-20 h-[1px] bg-[#C5A880] mt-6 mb-8" />
        <p className="text-center text-sm text-[#1A1A1A]/70 leading-relaxed font-sans max-w-2xl">
          At Esstana Hotels, we provide a masterfully curated environment for rest, business, and fine dining. Each facility is built with meticulous attention to comfort, performance, and security.
        </p>

        {/* Categories Filtering Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 my-12 bg-black/5 p-2 rounded-xl border border-black/5 w-full max-w-5xl">
          {filters.map((filter) => (
            <button
              key={filter}
              id={`filter-btn-${filter.toLowerCase().replace(' ', '-')}`}
              onClick={() => setSelectedFilter(filter)}
              className={`text-[10px] md:text-xs uppercase tracking-[0.15em] font-medium font-mono px-4 py-2.5 rounded-lg transition-all duration-300 cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-[#121212] text-[#C5A880] shadow-md'
                  : 'text-[#1A1A1A]/60 hover:text-black hover:bg-black/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Facilities Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredFacilities.map((fac) => (
            <motion.div
              key={fac.id}
              layoutId={`fac-container-${fac.id}`}
              id={`facility-card-${fac.id}`}
              className="bg-[#121212] text-[#FAF9F6] rounded-xl overflow-hidden border border-[#C5A880]/15 hover:border-[#C5A880]/40 shadow-xl flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                {/* Photo */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={fac.imageUrl}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/75 border border-[#C5A880]/30 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                    {getCategoryIcon(fac.category)}
                    <span className="text-[9px] uppercase tracking-widest font-mono text-[#C5A880] font-medium">
                      {fac.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                    {fac.tagline}
                  </span>
                  <h3 className="font-serif text-lg tracking-wider uppercase text-[#FAF9F6] mt-2 group-hover:text-[#C5A880] transition-colors">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-[#FAF9F6]/60 leading-relaxed font-sans mt-4 line-clamp-3">
                    {fac.description}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 border-t border-[#C5A880]/10 flex items-center justify-between">
                <button
                  id={`fac-explore-btn-${fac.id}`}
                  onClick={() => setSelectedFacility(fac)}
                  className="text-xs text-[#C5A880] hover:text-white font-mono tracking-widest uppercase flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <button
                  id={`fac-action-btn-${fac.id}`}
                  onClick={() => handleVenueReserve(fac)}
                  className="bg-[#C5A880]/10 hover:bg-[#C5A880] border border-[#C5A880]/30 hover:text-black text-[#C5A880] px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer"
                >
                  {fac.category === 'Accommodation' || fac.category === 'Boardroom' ? 'Book Stay' : 'Enquire'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expandable Details Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <div
            id="facility-modal-backdrop"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFacility(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              id="facility-modal"
              className="bg-[#121212] border border-[#C5A880]/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Image */}
              <div className="relative h-64 sm:h-96">
                <img
                  src={selectedFacility.imageUrl}
                  alt={selectedFacility.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/50" />
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 border border-[#FAF9F6]/25 text-[#FAF9F6] hover:text-[#C5A880] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                  ✕
                </button>
                <div className="absolute bottom-6 left-6 flex items-center space-x-3 bg-black/80 border border-[#C5A880]/40 rounded-xl px-4 py-2 backdrop-blur-sm">
                  {getCategoryIcon(selectedFacility.category)}
                  <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#C5A880]">
                    {selectedFacility.category}
                  </span>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-8 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#C5A880]">
                    {selectedFacility.tagline}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF9F6] uppercase tracking-wide mt-2">
                    {selectedFacility.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column: Description & Capacity */}
                  <div className="md:col-span-2 space-y-6">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#C5A880] font-semibold">
                      Philosophy & Ambience
                    </h4>
                    <p className="text-xs text-[#FAF9F6]/75 leading-relaxed font-sans">
                      {selectedFacility.description}
                    </p>

                    {selectedFacility.capacityInfo && (
                      <div className="bg-black/50 border border-[#C5A880]/10 rounded-xl p-5 flex flex-col space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">
                          Capacity Specifications
                        </span>
                        <p className="text-xs text-[#FAF9F6]/80 font-sans leading-relaxed">
                          {selectedFacility.capacityInfo}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Highlights & Checkmarks */}
                  <div className="space-y-6 bg-black/40 border border-[#C5A880]/10 rounded-xl p-6">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#C5A880] font-semibold">
                      Signature Perks
                    </h4>
                    <ul className="space-y-4">
                      {selectedFacility.highlights.map((high, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                          <span className="text-xs text-[#FAF9F6]/80 leading-normal font-sans">
                            {high}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Modal Action */}
                <div className="border-t border-[#C5A880]/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-widest font-mono">
                    Esstana Hotels • Bespoke Reservation
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedFacility(null)}
                      className="border border-[#FAF9F6]/20 hover:border-[#C5A880] text-[#FAF9F6]/80 hover:text-[#C5A880] px-6 py-3 rounded-lg text-xs uppercase tracking-[0.15em] transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                    <button
                      onClick={() => {
                        handleVenueReserve(selectedFacility);
                        setSelectedFacility(null);
                      }}
                      className="bg-[#C5A880] hover:bg-[#B89047] text-black px-6 py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-semibold transition-all cursor-pointer"
                    >
                      Reserve / Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
