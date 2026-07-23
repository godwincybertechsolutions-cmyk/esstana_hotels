import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import Services from './pages/Services';
import BookingPage from './pages/Booking';
import AttractionsPage from './pages/Attractions';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';
import { ToastProvider } from './components/Toast';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="flex-grow"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ToastProvider>
      <div id="esstana-app-root" className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-black">
        {/* Navigation Menu */}
        <Navbar openAIConcierge={() => setIsChatOpen(true)} />

        {/* Main Page Area with Animated Routing */}
        <main className="flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>

        {/* Footer Details */}
        <Footer />

        {/* AI Head Concierge Assistant */}
        <AIChatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </div>
    </ToastProvider>
  );
}
