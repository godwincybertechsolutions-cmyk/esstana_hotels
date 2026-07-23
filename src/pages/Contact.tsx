import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Award, Send, CheckCircle, Clock, Shield } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General Room Reservation',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate luxury API sending securely
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'General Room Reservation',
        message: '',
      });
    }, 1500);
  };

  const inquiryTypes = [
    'General Room Reservation',
    'Bespoke Suite Customization',
    'The Crown Boardroom Booking',
    'Grand Ballroom Conference Inquiry',
    'L’Ambroisie Private Dining Table',
    'Private Aviation / Helipad Landing Access',
    'Concierge Chauffeur Request',
  ];

  return (
    <div id="contact-page" className="bg-[#FAF9F6] text-[#1A1A1A] pt-32 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
            Concierge Desk
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mt-4">
            Connect with Esstana
          </h1>
          <div className="w-20 h-[1px] bg-[#C5A880] mt-6 mb-12" />
          <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans max-w-2xl">
            Whether arranging private air access, customizing sensory room controls, or requesting high-stakes boardroom amenities, our elite hosting crew remains at your absolute disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-[#121212] border border-[#C5A880]/20 text-[#FAF9F6] rounded-2xl p-8 space-y-6 shadow-2xl">
              <h3 className="font-serif text-lg tracking-wider uppercase">
                Direct Channels
              </h3>
              <p className="text-xs text-[#FAF9F6]/60 leading-relaxed font-sans">
                Our front desk coordinates are online 24 hours a day, 365 days a year. All lines are secured with military-grade privacy.
              </p>

              <div className="w-12 h-[1px] bg-[#C5A880]" />

              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest font-mono text-[#C5A880]">
                      The Sanctuary Location
                    </span>
                    <span className="block text-xs font-sans mt-1 leading-relaxed text-[#FAF9F6]/85">
                      72 Promenade Royale, Central District, Brussels 1000, Belgium
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest font-mono text-[#C5A880]">
                      Dignitary Reservations
                    </span>
                    <span className="block text-xs font-mono mt-1 text-[#FAF9F6]/85">
                      +32 (2) 555-0192 (International toll-free)
                    </span>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest font-mono text-[#C5A880]">
                      Secure Email Correspondences
                    </span>
                    <span className="block text-xs font-sans mt-1 text-[#FAF9F6]/85">
                      concierge@esstana.com
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Credibility certifications */}
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xl flex items-center space-x-4">
              <div className="p-3 bg-[#C5A880]/10 rounded-full shrink-0">
                <Shield className="w-6 h-6 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="font-serif text-sm uppercase tracking-wide">
                  Encrypted Confidentiality
                </h4>
                <p className="text-[11px] text-black/50 font-sans leading-relaxed mt-1">
                  We guarantee absolute non-disclosure for public figures, diplomats, and high-net-worth delegates.
                </p>
              </div>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-xl flex items-center space-x-4">
              <div className="p-3 bg-[#C5A880]/10 rounded-full shrink-0">
                <Clock className="w-6 h-6 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="font-serif text-sm uppercase tracking-wide">
                  24-Hour Active Butler Service
                </h4>
                <p className="text-[11px] text-black/50 font-sans leading-relaxed mt-1">
                  Once checked in, your dedicated valet remains on-call instantly for any sensory room adjustments.
                </p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#C5A880]/20 rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="border-b border-[#C5A880]/15 pb-4">
                    <h3 className="font-serif text-lg tracking-wider uppercase">
                      Transmission of Inquiry
                    </h3>
                    <p className="text-[10px] text-[#C5A880] font-mono uppercase tracking-widest mt-1">
                      Our Head Concierge will reply within twelve minutes.
                    </p>
                  </div>

                  {/* Name input */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#C5A880]">
                      Your Full Name & Honorifics
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Arthur Pendelton"
                      className="bg-black/40 border border-[#C5A880]/25 rounded-lg p-3 text-xs focus:outline-none focus:border-[#C5A880] text-white placeholder-white/20"
                      required
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-[#C5A880]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. arthur@domain.com"
                        className="bg-black/40 border border-[#C5A880]/25 rounded-lg p-3 text-xs focus:outline-none focus:border-[#C5A880] text-white placeholder-white/20"
                        required
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-[#C5A880]">
                        Direct Phone Contact
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +32 499 123 456"
                        className="bg-black/40 border border-[#C5A880]/25 rounded-lg p-3 text-xs focus:outline-none focus:border-[#C5A880] text-white placeholder-white/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Inquiry Type select */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#C5A880]">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="bg-black/40 border border-[#C5A880]/25 rounded-lg p-3 text-xs focus:outline-none focus:border-[#C5A880] text-white"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#121212] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message box */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-[#C5A880]">
                      Elaborate Requirements
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please delineate dietary limits, specific room acoustic requirements, pillow choices, or landing schedules."
                      className="bg-black/40 border border-[#C5A880]/25 rounded-lg p-3 text-xs focus:outline-none focus:border-[#C5A880] text-white placeholder-white/20 font-sans"
                      required
                    />
                  </div>

                  {/* Trigger secure send */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#C5A880] hover:bg-[#B89047] disabled:bg-white/10 text-black disabled:text-white/40 font-semibold text-xs uppercase tracking-widest py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>Transmitting Securely...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Confidential Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  className="py-12 text-center space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 border border-[#C5A880] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-[#C5A880]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-mono block">
                    Transmission complete
                  </span>
                  <h2 className="font-serif text-2xl uppercase tracking-widest">
                    Message Dispatched
                  </h2>
                  <div className="w-12 h-[1px] bg-[#C5A880]/30 mx-auto" />
                  <p className="text-xs text-[#FAF9F6]/75 leading-relaxed font-sans max-w-sm mx-auto">
                    Your request has been routed with high-priority encryption to our Head Concierge. An elite representative will verify and correspond back within twelve minutes.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 border border-[#C5A880]/40 hover:border-[#C5A880] text-[#C5A880] hover:text-white px-6 py-2.5 rounded-lg text-[10px] uppercase tracking-widest font-mono transition-colors cursor-pointer"
                  >
                    Send Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
