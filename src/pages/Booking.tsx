import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Mail, Phone, User, CheckCircle, Trash2, Clock, ShieldCheck, CreditCard, Loader2, ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';
import { ROOMS_DATA } from '../data';
import { Booking } from '../types';
import { useToast } from '../components/Toast';

export default function BookingPage() {
  const location = useLocation();
  const { showToast } = useToast();
  const prefill = location.state?.prefill;

  const [activeSubTab, setActiveSubTab] = useState<'wizard' | 'list'>('wizard');
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Wizard state variables
  const [checkIn, setCheckIn] = useState(prefill?.checkIn || new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(
    prefill?.checkOut || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [guests, setGuests] = useState(prefill?.guests || 2);
  const [roomTypeId, setRoomTypeId] = useState(prefill?.roomTypeId || ROOMS_DATA[0].id);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // UI state variables
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle prefill updates when navigated from Home/Services
  useEffect(() => {
    if (prefill) {
      if (prefill.checkIn) setCheckIn(prefill.checkIn);
      if (prefill.checkOut) setCheckOut(prefill.checkOut);
      if (prefill.guests) setGuests(prefill.guests);
      if (prefill.roomTypeId) setRoomTypeId(prefill.roomTypeId);
    }
  }, [prefill]);

  // Fetch bookings list from backend API
  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error('Failed to fetch reservations list:', err);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === roomTypeId) || ROOMS_DATA[0];

  // Calculate prices
  const getNightsCount = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const difference = end.getTime() - start.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days > 0 ? days : 1;
  };

  const nights = getNightsCount();
  const basePrice = selectedRoom.pricePerNight * nights;
  const luxuryTax = Math.round(basePrice * 0.15); // 15% luxury tax & service charge
  const totalPrice = basePrice + luxuryTax;

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setErrorMessage('Please specify valid check-in and check-out dates.');
      return;
    }
    setErrorMessage('');
    setWizardStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) {
      setErrorMessage('Please provide your full name and email address.');
      return;
    }
    setErrorMessage('');
    setWizardStep(3);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingInProgress(true);
    setErrorMessage('');

    const bookingPayload = {
      roomTypeId,
      roomName: selectedRoom.name,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      specialRequests
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (res.ok) {
        const data = await res.json();
        setConfirmedBooking(data);
        showToast('Reservation Locked', `Reference code ${data.id} confirmed for ${guestName}.`, 'success');
        // Reset inputs
        setGuestName('');
        setGuestEmail('');
        setGuestPhone('');
        setSpecialRequests('');
        setWizardStep(1);
        fetchBookings();
      } else {
        const errData = await res.json();
        setErrorMessage(errData.error || 'Failed to register reservation.');
        showToast('Reservation Failed', errData.error || 'Check input details.', 'error');
      }
    } catch (err) {
      setErrorMessage('Network connection lost. Please verify backend state.');
      showToast('Connection Error', 'Backend server unreachable.', 'error');
    } finally {
      setBookingInProgress(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('Booking Cancelled', `Reservation ${id} has been marked as cancelled.`, 'info');
        fetchBookings();
      }
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      showToast('Cancellation Error', 'Could not update booking status.', 'error');
    }
  };

  return (
    <div id="booking-page" className="bg-[#FAF9F6] text-[#1A1A1A] pt-32 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Title & Sub Navigation */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
            Bespoke Reservation
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mt-4">
            Reservations Desk
          </h1>
          <div className="w-20 h-[1px] bg-[#C5A880] mt-6 mb-12" />

          {/* Sub Tabs */}
          <div className="flex space-x-4 border-b border-[#C5A880]/20 pb-4 mb-12 w-full max-w-md justify-center">
            <button
              id="wizard-sub-tab"
              onClick={() => {
                setActiveSubTab('wizard');
                setConfirmedBooking(null);
              }}
              className={`text-xs uppercase tracking-[0.2em] font-medium font-mono pb-2 relative transition-colors cursor-pointer ${
                activeSubTab === 'wizard' ? 'text-[#C5A880]' : 'text-[#1A1A1A]/50 hover:text-black'
              }`}
            >
              Configure Stay
              {activeSubTab === 'wizard' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880]" />
              )}
            </button>
            <button
              id="list-sub-tab"
              onClick={() => {
                setActiveSubTab('list');
                fetchBookings();
              }}
              className={`text-xs uppercase tracking-[0.2em] font-medium font-mono pb-2 relative transition-colors cursor-pointer ${
                activeSubTab === 'list' ? 'text-[#C5A880]' : 'text-[#1A1A1A]/50 hover:text-black'
              }`}
            >
              My Reservations ({bookings.length})
              {activeSubTab === 'list' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880]" />
              )}
            </button>
          </div>
        </div>

        {/* Wizard Panel */}
        <AnimatePresence mode="wait">
          {activeSubTab === 'wizard' && !confirmedBooking && (
            <motion.div
              key="booking-wizard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Form Input Columns */}
              <div className="lg:col-span-7 bg-[#121212] border border-[#C5A880]/20 rounded-2xl p-6 sm:p-8 text-[#FAF9F6] space-y-6 shadow-2xl flex flex-col justify-between">
                <div>
                  {/* Stepper Progress Bar */}
                  <div className="flex items-center justify-between border-b border-[#C5A880]/15 pb-6 mb-6">
                    {[
                      { step: 1, label: 'Lodging & Dates' },
                      { step: 2, label: 'Guest Details' },
                      { step: 3, label: 'Secure & Lock' },
                    ].map((s) => (
                      <div key={s.step} className="flex items-center space-x-2">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-colors ${
                            wizardStep === s.step
                              ? 'bg-[#C5A880] text-black font-bold'
                              : wizardStep > s.step
                              ? 'bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]'
                              : 'bg-black/50 text-white/40 border border-white/10'
                          }`}
                        >
                          {wizardStep > s.step ? <Check className="w-3.5 h-3.5" /> : s.step}
                        </div>
                        <span
                          className={`hidden sm:inline text-[10px] uppercase tracking-wider font-mono ${
                            wizardStep === s.step ? 'text-[#C5A880] font-semibold' : 'text-white/40'
                          }`}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {errorMessage && (
                    <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs p-4 rounded-lg mb-6">
                      {errorMessage}
                    </div>
                  )}

                  {/* STEP 1: Dates & Room */}
                  {wizardStep === 1 && (
                    <motion.form
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleNextToStep1 => handleNextToStep2(handleNextToStep1)}
                      className="space-y-6"
                    >
                      <div className="border-b border-[#C5A880]/10 pb-4">
                        <h3 className="font-serif text-lg tracking-wider uppercase text-[#FAF9F6]">
                          Step 1: Choose Sanctuary & Dates
                        </h3>
                        <p className="text-[10px] text-[#C5A880] font-mono uppercase tracking-widest mt-1">
                          Select stay duration and accommodations.
                        </p>
                      </div>

                      {/* Date Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                            Check-In Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-[#C5A880]" />
                            <input
                              type="date"
                              value={checkIn}
                              min={new Date().toISOString().split('T')[0]}
                              onChange={(e) => setCheckIn(e.target.value)}
                              className="w-full bg-black/40 border border-[#C5A880]/20 rounded-lg py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                            Check-Out Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-[#C5A880]" />
                            <input
                              type="date"
                              value={checkOut}
                              min={checkIn || new Date().toISOString().split('T')[0]}
                              onChange={(e) => setCheckOut(e.target.value)}
                              className="w-full bg-black/40 border border-[#C5A880]/20 rounded-lg py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Room Select and Guest Count */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="sm:col-span-2 flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                            Select Sanctuary Room
                          </label>
                          <select
                            value={roomTypeId}
                            onChange={(e) => setRoomTypeId(e.target.value)}
                            className="w-full bg-black/40 border border-[#C5A880]/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                          >
                            {ROOMS_DATA.map((room) => (
                              <option key={room.id} value={room.id} className="bg-[#121212] text-white">
                                {room.name} (${room.pricePerNight}/night)
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                            Guests count
                          </label>
                          <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full bg-black/40 border border-[#C5A880]/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                          >
                            {[1, 2, 3, 4].map((num) => (
                              <option key={num} value={num} className="bg-[#121212] text-white">
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="bg-[#C5A880] hover:bg-[#B89047] text-black font-semibold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-2"
                        >
                          <span>Proceed to Guest Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* STEP 2: Guest Information */}
                  {wizardStep === 2 && (
                    <motion.form
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleNextToStep3}
                      className="space-y-6"
                    >
                      <div className="border-b border-[#C5A880]/10 pb-4">
                        <h3 className="font-serif text-lg tracking-wider uppercase text-[#FAF9F6]">
                          Step 2: Guest Contact Details
                        </h3>
                        <p className="text-[10px] text-[#C5A880] font-mono uppercase tracking-widest mt-1">
                          Provide primary occupant credentials for confirmation docket.
                        </p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                          Full Name (Main Guest)
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-4 h-4 text-[#C5A880]" />
                          <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="e.g. Baroness Sofia de Groote"
                            className="w-full bg-black/40 border border-[#C5A880]/20 rounded-lg py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#C5A880] placeholder-white/30"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-[#C5A880]" />
                            <input
                              type="email"
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              placeholder="e.g. guest@esstana.com"
                              className="w-full bg-black/40 border border-[#C5A880]/20 rounded-lg py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#C5A880] placeholder-white/30"
                              required
                            />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3.5 w-4 h-4 text-[#C5A880]" />
                            <input
                              type="tel"
                              value={guestPhone}
                              onChange={(e) => setGuestPhone(e.target.value)}
                              placeholder="e.g. +32 (2) 555-0192"
                              className="w-full bg-black/40 border border-[#C5A880]/20 rounded-lg py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#C5A880] placeholder-white/30"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                          Bespoke Requests / Dietary Preferences (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="e.g. High floor preference, lavender diffusers, late arrival..."
                          className="w-full bg-black/40 border border-[#C5A880]/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A880] placeholder-white/30 resize-none"
                        />
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setWizardStep(1)}
                          className="border border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] px-6 py-3.5 rounded-lg text-xs uppercase tracking-[0.15em] font-mono cursor-pointer flex items-center space-x-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          className="bg-[#C5A880] hover:bg-[#B89047] text-black font-semibold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-2"
                        >
                          <span>Review & Confirm</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* STEP 3: Final Security & Lock */}
                  {wizardStep === 3 && (
                    <motion.form
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSubmitBooking}
                      className="space-y-6"
                    >
                      <div className="border-b border-[#C5A880]/10 pb-4">
                        <h3 className="font-serif text-lg tracking-wider uppercase text-[#FAF9F6]">
                          Step 3: Review & Lock Reservation
                        </h3>
                        <p className="text-[10px] text-[#C5A880] font-mono uppercase tracking-widest mt-1">
                          Verify details before initializing docket.
                        </p>
                      </div>

                      <div className="bg-black/50 border border-[#C5A880]/20 rounded-xl p-5 space-y-3 font-mono text-xs">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-white/50 uppercase">Primary Guest:</span>
                          <span className="text-white font-sans">{guestName}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-white/50 uppercase">Sanctuary:</span>
                          <span className="text-[#C5A880]">{selectedRoom.name}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-white/50 uppercase">Dates:</span>
                          <span className="text-white">{checkIn} to {checkOut} ({nights} nights)</span>
                        </div>
                        <div className="flex justify-between pt-1 font-serif text-sm">
                          <span className="text-white/60">Total Cost:</span>
                          <span className="text-[#C5A880] font-bold">${totalPrice}</span>
                        </div>
                      </div>

                      {/* Luxury Guidelines Disclaimer */}
                      <div className="flex items-start space-x-3 bg-black/20 p-4 rounded-xl border border-[#C5A880]/10">
                        <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                        <p className="text-[10px] text-[#FAF9F6]/60 leading-relaxed font-sans">
                          Guaranteed Rate Lock: In alignment with our 5-star service protocols, no dynamic charges will be applied. Valet parking and high-speed Wi-Fi access are fully included in this rate.
                        </p>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="border border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] px-6 py-3.5 rounded-lg text-xs uppercase tracking-[0.15em] font-mono cursor-pointer flex items-center space-x-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          disabled={bookingInProgress}
                          className="bg-[#C5A880] hover:bg-[#B89047] disabled:bg-[#FAF9F6]/15 text-black font-semibold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-2"
                        >
                          {bookingInProgress ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Encrypting Reservation...</span>
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4" />
                              <span>Lock In Your Stay</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </div>
              </div>

              {/* Right Side Stay Summary Panel */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xl space-y-6">
                  <h3 className="font-serif text-md tracking-wider uppercase">
                    Your Curated Stay
                  </h3>
                  <div className="w-10 h-[1px] bg-[#C5A880]" />

                  {/* Selected Room Details */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedRoom.imageUrl}
                      alt={selectedRoom.name}
                      className="w-24 h-24 object-cover rounded-xl border border-black/5 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif text-sm uppercase tracking-wide">
                        {selectedRoom.name}
                      </h4>
                      <p className="text-[10px] text-[#C5A880] uppercase tracking-widest font-mono font-medium mt-1">
                        ${selectedRoom.pricePerNight} / Night
                      </p>
                    </div>
                  </div>

                  {/* Amenities Quick list */}
                  <div className="bg-[#FAF9F6] rounded-xl p-4 border border-black/5">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-black/50">
                      Included Premium Amenities
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {selectedRoom.amenities.slice(0, 4).map((ame, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] bg-black/5 border border-black/5 text-black/75 px-2 py-0.5 rounded-md"
                        >
                          {ame}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-4 pt-4 border-t border-black/5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-black/60">Base Rate ({nights} nights)</span>
                      <span className="font-medium">${basePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60">Luxury Tax & Service (15%)</span>
                      <span className="font-medium">${luxuryTax}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-4 border-t border-black/5 font-serif font-semibold">
                      <span>Grand Total</span>
                      <span className="text-[#B89047]">${totalPrice}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#121212] border border-[#C5A880]/20 rounded-2xl p-6 text-[#FAF9F6] flex flex-col justify-center items-center text-center">
                  <span className="w-10 h-10 rounded-full border border-[#C5A880] flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-[#C5A880]" />
                  </span>
                  <h4 className="font-serif text-xs uppercase tracking-widest text-[#FAF9F6]">
                    Immediate Virtual Butler Assistance
                  </h4>
                  <p className="text-[10px] text-[#FAF9F6]/60 leading-relaxed font-sans mt-2 max-w-xs">
                    Need custom accommodations, private transport or specific allergen menus? Click the Concierge button to discuss directly with our virtual butler.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success Screen Panel */}
          {activeSubTab === 'wizard' && confirmedBooking && (
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto bg-[#121212] border-2 border-[#C5A880] text-[#FAF9F6] rounded-2xl p-8 text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-[#C5A880]/15 border border-[#C5A880] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#C5A880]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-mono block">
                Stay Confirmed
              </span>
              <h2 className="font-serif text-2xl uppercase tracking-widest mt-2">
                Reservation Secured
              </h2>
              <div className="w-16 h-[1px] bg-[#C5A880]/30 mx-auto my-6" />

              <div className="bg-black/60 rounded-xl p-6 border border-[#C5A880]/15 text-left font-mono space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/50 uppercase">Booking Reference</span>
                  <span className="text-[#C5A880] font-bold text-sm tracking-widest">
                    {confirmedBooking.id}
                  </span>
                </div>
                <div className="border-t border-[#C5A880]/10 pt-3 text-xs flex justify-between">
                  <span className="text-white/50 uppercase">Sanctuary</span>
                  <span className="text-white font-serif">{confirmedBooking.roomName}</span>
                </div>
                <div className="text-xs flex justify-between">
                  <span className="text-white/50 uppercase">Check-In</span>
                  <span className="text-white">{confirmedBooking.checkIn}</span>
                </div>
                <div className="text-xs flex justify-between">
                  <span className="text-white/50 uppercase">Check-Out</span>
                  <span className="text-white">{confirmedBooking.checkOut}</span>
                </div>
                <div className="text-xs flex justify-between">
                  <span className="text-white/50 uppercase">Registered Guest</span>
                  <span className="text-white font-sans">{confirmedBooking.guestName}</span>
                </div>
                <div className="border-t border-[#C5A880]/10 pt-3 text-xs flex justify-between font-serif">
                  <span className="text-white/50 uppercase">Total Locked Cost</span>
                  <span className="text-[#C5A880] text-sm">${confirmedBooking.totalPrice}</span>
                </div>
              </div>

              <p className="text-[11px] text-[#FAF9F6]/60 leading-relaxed font-sans mt-8 max-w-sm mx-auto">
                A confirmation docket has been initialized for <strong className="text-white">{confirmedBooking.guestEmail}</strong>. High-end airport limousine service details will follow shortly.
              </p>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => setActiveSubTab('list')}
                  className="bg-black border border-[#C5A880]/40 text-[#C5A880] hover:text-white hover:border-[#C5A880] px-5 py-3 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Manage Reservation List
                </button>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="bg-[#C5A880] hover:bg-[#B89047] text-black px-5 py-3 rounded-lg text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Book Another Sanctuary
                </button>
              </div>
            </motion.div>
          )}

          {/* List Panel */}
          {activeSubTab === 'list' && (
            <motion.div
              key="booking-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-5xl mx-auto space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-black/5">
                <h3 className="font-serif text-lg tracking-wider uppercase">
                  Active Reservoirs Ledger
                </h3>
                <button
                  onClick={fetchBookings}
                  className="text-xs font-mono text-[#C5A880] hover:text-[#B89047] cursor-pointer"
                >
                  [Synchronize Ledger]
                </button>
              </div>

              {loadingBookings ? (
                <div className="text-center py-20 flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin" />
                  <span className="text-xs font-mono tracking-widest uppercase">
                    Syncing Ledger entries...
                  </span>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-20 border border-black/5 rounded-2xl bg-white">
                  <p className="text-xs text-[#1A1A1A]/60 font-sans">
                    No active reservations are currently matching your browser session state.
                  </p>
                  <button
                    onClick={() => setActiveSubTab('wizard')}
                    className="mt-6 bg-[#C5A880] text-black px-6 py-3 rounded-lg text-[10px] uppercase tracking-widest font-mono cursor-pointer"
                  >
                    Create New Reservation
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      id={`ledger-card-${booking.id}`}
                      className={`border p-6 rounded-2xl shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
                        booking.status === 'cancelled'
                          ? 'bg-[#FAF9F6]/50 border-black/5 opacity-50'
                          : 'bg-white border-black/10 hover:border-[#C5A880]/50'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-xs text-white bg-black px-3 py-1 rounded-md tracking-wider">
                            {booking.id}
                          </span>
                          <span
                            className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded font-mono font-bold ${
                              booking.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <h4 className="font-serif text-lg tracking-wide uppercase">
                          {booking.roomName}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 font-sans text-xs text-[#1A1A1A]/60">
                          <div>
                            <strong className="text-black/80">Guest:</strong> {booking.guestName}
                          </div>
                          <div>
                            <strong className="text-black/80">Check-In:</strong> {booking.checkIn}
                          </div>
                          <div>
                            <strong className="text-black/80">Check-Out:</strong> {booking.checkOut}
                          </div>
                          <div>
                            <strong className="text-black/80">Cost:</strong> ${booking.totalPrice}
                          </div>
                        </div>
                      </div>

                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="flex items-center space-x-1.5 border border-rose-200 hover:bg-rose-50 hover:border-rose-300 text-rose-600 px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold font-mono transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Cancel Stay</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
