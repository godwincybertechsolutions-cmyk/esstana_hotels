import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Mail, Phone, MapPin, Compass, Shield, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-[#0E0E0E] text-[#FAF9F6] border-t border-[#C5A880]/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand Intro */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border border-[#C5A880] flex items-center justify-center bg-black/40">
              <Hotel className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <span className="block text-xl font-serif tracking-[0.2em] leading-none">ESSTANA</span>
              <span className="block text-[9px] uppercase tracking-[0.3em] text-[#C5A880] mt-1 font-mono">Hotels & Resorts</span>
            </div>
          </div>
          <p className="text-xs text-[#FAF9F6]/60 leading-relaxed font-sans max-w-sm">
            Esstana Hotels is the perfect getaway to indulge yourself in sumptuous meals, highly affordable accommodation, conducive environments for conferences, board meetings, outings, and parties for yourself and your loved ones.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[11px] text-[#C5A880] font-mono">
              <Award className="w-4 h-4" />
              <span>5-Star Premium Resort</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-[#C5A880] font-mono">
              <Shield className="w-4 h-4" />
              <span>Secure & Safe</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono font-semibold">
            The Estates
          </h4>
          <ul className="space-y-3">
            {[
              { path: '/', label: 'Lobby & Suites' },
              { path: '/services', label: 'Services & Amenities' },
              { path: '/booking', label: 'Reservations Desk' },
              { path: '/attractions', label: 'Curated Guide' },
              { path: '/gallery', label: 'Portraits & Stories' },
              { path: '/contact', label: 'Concierge Desk' }
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-xs text-[#FAF9F6]/70 hover:text-[#C5A880] transition-colors cursor-pointer block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services & Venues */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono font-semibold">
            Our Facilities
          </h4>
          <ul className="space-y-3 text-xs text-[#FAF9F6]/70">
            <li>Esstana Main Restaurant</li>
            <li>The Gilded Lounge & Bar</li>
            <li>The Crown Boardroom</li>
            <li>Twin Bed Rooms & Suites</li>
            <li>Conference Hall & Events</li>
            <li>Secure Guest Parking</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono font-semibold">
            Contact Info
          </h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-xs text-[#FAF9F6]/70">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>Piai - Murinduko Rd, P.O. Box 2547 - 60100, Embu Kenya</span>
            </li>
            <li className="flex items-center space-x-3 text-xs text-[#FAF9F6]/70">
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>+254 707 937 736</span>
            </li>
            <li className="flex items-center space-x-3 text-xs text-[#FAF9F6]/70">
              <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>+254 786 242 544</span>
            </li>
            <li className="flex items-center space-x-3 text-xs text-[#FAF9F6]/70">
              <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span>info@esstanahotels.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copy & Fine Print */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-[#C5A880]/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#FAF9F6]/40">
        <p>© 2026 Esstana Hotels. All Rights Reserved. Your Perfect Getaway in Embu, Kenya.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 font-sans">
          <a href="#privacy" className="hover:text-[#C5A880] transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-[#C5A880] transition-colors">Terms of Stay</a>
          <a href="#aviation" className="hover:text-[#C5A880] transition-colors">Private Aviation Access</a>
        </div>
      </div>
    </footer>
  );
}
