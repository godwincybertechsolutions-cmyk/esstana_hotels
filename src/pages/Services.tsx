import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Wine, BedDouble, HelpCircle, Briefcase, Users, Car, Sparkles, MapPin, CheckCircle, DollarSign } from 'lucide-react';
import { FACILITIES_DATA, ROOMS_DATA } from '../data';
import { Facility, RoomType } from '../types';

type FilterType = 'All' | 'Accommodation' | 'Boardroom' | 'Conference Facilities' | 'Bar' | 'Restaurant' | 'parking' | 'Room Types';

export default function Services() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const filters: FilterType[] = [
    'All',
    'Accommodation',
    'Room Types',
    'Boardroom',
    'Conference Facilities',
    'Bar',
    'Restaurant',
    'parking',
  ];

  const filteredFacilities = selectedFilter === 'All' || selectedFilter === 'Room Types'
    ? (selectedFilter === 'Room Types' ? [] : FACILITIES_DATA)
    : FACILITIES_DATA.filter(f => f.category === selectedFilter);

  const filteredRooms = selectedFilter === 'All' || selectedFilter === 'Room Types' || selectedFilter === 'Accommodation'
    ? ROOMS_DATA
    : [];

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
          Our Amenities
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mt-4 text-center">
          Services & Facilities
        </h1>
        <div className="w-20 h-[1px] bg-[#C5A880] mt-6 mb-8" />
        <p className="text-center text-sm text-[#1A1A1A]/70 leading-relaxed font-sans max-w-2xl">
          Esstana Hotels offers world-class amenities for relaxation, conferences, and corporate events. Every facility is designed with guest comfort, safety, and exceptional service as our priority.
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

        {/* Rooms Section Header */}
        {(selectedFilter === 'All' || selectedFilter === 'Accommodation' || selectedFilter === 'Room Types') && (
          <div className="w-full mb-12 mt-12 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-mono">
              Room Types
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide uppercase mt-2 text-[#1A1A1A] text-center">
              Our Accommodations
            </h2>
            <div className="w-16 h-[1px] bg-[#C5A880] mt-4" />
          </div>
        )}

        {/* Rooms Layout */}
        {(selectedFilter === 'All' || selectedFilter === 'Accommodation' || selectedFilter === 'Room Types') && filteredRooms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                layoutId={`room-container-${room.id}`}
                id={`room-card-${room.id}`}
                className="bg-[#121212] text-[#FAF9F6] rounded-xl overflow-hidden border border-[#C5A880]/15 hover:border-[#C5A880]/40 shadow-xl flex flex-col justify-between group transition-all duration-300 cursor-pointer hover:shadow-2xl"
                onClick={() => setSelectedRoom(room)}
              >
                {/* Photo */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 flex items-center space-x-2 bg-black/75 border border-[#C5A880]/30 rounded-lg px-2.5 py-1 backdrop-blur-sm">
                    <BedDouble className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-[9px] uppercase tracking-widest font-mono text-[#C5A880] font-medium">
                      {room.bedType}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-[#C5A880] text-black px-2.5 py-1 rounded-lg font-mono text-[10px] font-semibold">
                    KSh {room.pricePerNight.toLocaleString()}/night
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-serif text-base tracking-wider uppercase text-[#FAF9F6] group-hover:text-[#C5A880] transition-colors">
                    {room.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3 text-[10px] text-[#FAF9F6]/60 font-mono uppercase tracking-wider">
                    <span>{room.size}</span>
                    <span>{room.capacity} Guest(s)</span>
                  </div>
                  <p className="text-xs text-[#FAF9F6]/60 leading-relaxed font-sans mt-3 line-clamp-2">
                    {room.description}
                  </p>
                </div>

                {/* Actions Footer */}
                <div className="p-4 border-t border-[#C5A880]/10 flex items-center justify-between gap-2">
                  <button
                    id={`room-details-btn-${room.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoom(room);
                    }}
                    className="text-xs text-[#C5A880] hover:text-white font-mono tracking-widest uppercase flex items-center space-x-1 transition-colors cursor-pointer flex-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                  <button
                    id={`room-book-btn-${room.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/booking', { state: { prefill: { roomTypeId: room.id } } });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-[#C5A880]/10 hover:bg-[#C5A880] border border-[#C5A880]/30 hover:text-black text-[#C5A880] px-3 py-2 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer flex-1"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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

        {/* Room Details Modal */}
        {selectedRoom && (
          <div
            id="room-modal-backdrop"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              id="room-modal"
              className="bg-[#121212] border border-[#C5A880]/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Image */}
              <div className="relative h-64 sm:h-96">
                <img
                  src={selectedRoom.imageUrl}
                  alt={selectedRoom.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/50" />
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 border border-[#FAF9F6]/25 text-[#FAF9F6] hover:text-[#C5A880] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                  ✕
                </button>
                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                  <div className="flex items-center space-x-3 bg-black/80 border border-[#C5A880]/40 rounded-xl px-4 py-2 backdrop-blur-sm">
                    <BedDouble className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#C5A880]">
                      {selectedRoom.bedType}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-[#C5A880] text-black px-4 py-2 rounded-xl font-mono text-xs font-semibold w-fit">
                    <DollarSign className="w-4 h-4" />
                    <span>KSh {selectedRoom.pricePerNight.toLocaleString()}/night</span>
                  </div>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-8 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#C5A880]">
                    Room Type
                  </span>
                  <h2 className="font-serif text-2xl sm:text-4xl text-[#FAF9F6] uppercase tracking-wide mt-2">
                    {selectedRoom.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column: Description & Specs */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#C5A880] font-semibold mb-3">
                        Room Description
                      </h4>
                      <p className="text-xs text-[#FAF9F6]/75 leading-relaxed font-sans">
                        {selectedRoom.description}
                      </p>
                    </div>

                    <div className="bg-black/50 border border-[#C5A880]/10 rounded-xl p-5 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono block mb-2">
                          Room Size
                        </span>
                        <p className="text-xs text-[#FAF9F6]/80 font-sans">
                          {selectedRoom.size}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono block mb-2">
                          Guest Capacity
                        </span>
                        <p className="text-xs text-[#FAF9F6]/80 font-sans">
                          Up to {selectedRoom.capacity} guests
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono block mb-2">
                          Price Per Night
                        </span>
                        <p className="text-xs text-[#C5A880] font-mono font-semibold">
                          KSh {selectedRoom.pricePerNight.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono block mb-2">
                          Available Rooms
                        </span>
                        <p className="text-xs text-[#FAF9F6]/80 font-sans">
                          {selectedRoom.totalRooms} rooms
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Amenities */}
                  <div className="space-y-6 bg-black/40 border border-[#C5A880]/10 rounded-xl p-6">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-[#C5A880] font-semibold">
                      Room Amenities
                    </h4>
                    <ul className="space-y-3">
                      {selectedRoom.amenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                          <span className="text-xs text-[#FAF9F6]/80 leading-normal font-sans">
                            {amenity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Modal Action */}
                <div className="border-t border-[#C5A880]/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[10px] text-[#FAF9F6]/40 uppercase tracking-widest font-mono">
                    Esstana Hotels • Room Reservation
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedRoom(null)}
                      className="border border-[#FAF9F6]/20 hover:border-[#C5A880] text-[#FAF9F6]/80 hover:text-[#C5A880] px-6 py-3 rounded-lg text-xs uppercase tracking-[0.15em] transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                    <button
                      onClick={() => {
                        navigate('/booking', { state: { prefill: { roomTypeId: selectedRoom.id } } });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-[#C5A880] hover:bg-[#B89047] text-black px-6 py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-semibold transition-all cursor-pointer"
                    >
                      Book This Room
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
