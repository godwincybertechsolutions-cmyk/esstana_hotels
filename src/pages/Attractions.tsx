import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, Clock, Check, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { ATTRACTIONS_DATA } from '../data';

export default function AttractionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Culture' | 'Shopping' | 'Nature'>('All');
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  const [itineraryDays, setItineraryDays] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<string>('Refined Culture');

  // AI Generated itinerary states
  const [itineraryResult, setItineraryResult] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorGenerating, setErrorGenerating] = useState('');

  const filteredAttractions = selectedCategory === 'All'
    ? ATTRACTIONS_DATA
    : ATTRACTIONS_DATA.filter((a) => a.category === selectedCategory);

  const toggleSelectAttraction = (id: string) => {
    setSelectedAttractions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGenerateItinerary = async () => {
    setIsGenerating(true);
    setErrorGenerating('');
    setItineraryResult('');

    const attractionNames = ATTRACTIONS_DATA.filter((a) => selectedAttractions.includes(a.id))
      .map((a) => a.name)
      .join(', ');

    const prompt = `Act as the Esstana Hotel virtual Head Butler. Draft a beautifully formatted, elegant, hour-by-hour travel itinerary for an Esteemed Guest.
Stay Details:
- Number of Days: ${itineraryDays} Days
- Travel Style: ${travelStyle}
- Preferred Local Attractions selected: ${attractionNames || 'Showcase all available near the hotel'}

Structure your answer with:
1. A warm, formal greeting in character.
2. A day-by-day sequence with specific, sophisticated hours (e.g. '09:00 AM - Organic Breakfast at L’Ambroisie', '03:00 PM - Champagne Balcony at Opera').
3. Include recommendations on when to transit back to the hotel for a signature cocktail at The Gilded Vault Bar.
Keep the layout extremely neat with standard bullet points and markdown highlights. Do not write a continuous long paragraph.`;

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
      });

      const data = await res.json();
      if (data.reply) {
        setItineraryResult(data.reply);
      } else {
        throw new Error('Could not draft itinerary.');
      }
    } catch (err) {
      setErrorGenerating('Failed to communicate with our AI Butler. Please verify key setup.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="attractions-page" className="bg-[#FAF9F6] text-[#1A1A1A] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
            Bespoke Guide
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mt-4">
            Curated Local Attractions
          </h1>
          <div className="w-20 h-[1px] bg-[#C5A880] mt-6 mb-8" />
          <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans max-w-2xl">
            Step outside our elegant doors into a rich tapestry of history, high-fashion boutiques, and scenic botanicals. Review our handpicked selection of city landmarks.
          </p>

          {/* Filtering tabs */}
          <div className="flex space-x-2 my-10 bg-black/5 p-1 rounded-lg">
            {(['All', 'Culture', 'Shopping', 'Nature'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] md:text-xs uppercase tracking-[0.15em] font-mono font-semibold px-4 py-2 rounded-md transition-all ${
                  selectedCategory === cat ? 'bg-[#121212] text-[#C5A880]' : 'text-black/60 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredAttractions.map((att) => {
            const isSelected = selectedAttractions.includes(att.id);
            return (
              <div
                key={att.id}
                id={`attraction-card-${att.id}`}
                className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row"
              >
                {/* Photo Column */}
                <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                  <img
                    src={att.imageUrl}
                    alt={att.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 text-[#C5A880] text-[9px] font-mono px-2.5 py-1 rounded border border-[#C5A880]/30 uppercase tracking-widest">
                    {att.category}
                  </div>
                </div>

                {/* Content Column */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-1.5 text-[10px] text-[#C5A880] font-mono uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{att.distance}</span>
                    </div>
                    <h3 className="font-serif text-lg tracking-wide uppercase mt-2">
                      {att.name}
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans mt-3 line-clamp-3">
                      {att.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {att.highlights.slice(0, 2).map((high, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] bg-[#FAF9F6] border border-black/5 text-[#1A1A1A]/75 px-2 py-0.5 rounded"
                        >
                          {high}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Selector Toggle */}
                  <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="text-[10px] text-[#1A1A1A]/40 uppercase tracking-wider font-mono">
                      Include in itinerary
                    </span>
                    <button
                      id={`attraction-toggle-${att.id}`}
                      onClick={() => toggleSelectAttraction(att.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#C5A880] border-[#C5A880] text-black scale-105 shadow-md'
                          : 'border-black/20 text-black/40 hover:border-black/50 hover:text-black'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Itinerary Planner Panel */}
        <div className="mt-24 bg-[#121212] text-[#FAF9F6] border border-[#C5A880]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full filter blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Planner Left: Configurations */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="flex items-center space-x-2 text-[#C5A880] font-mono text-[10px] uppercase tracking-[0.3em]">
                <Sparkles className="w-4 h-4" />
                <span>AI Stay Customizer</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-light uppercase tracking-wide">
                Bespoke Itinerary Generator
              </h2>
              <p className="text-xs text-[#FAF9F6]/65 leading-relaxed font-sans">
                Let our AI Head Butler arrange your stay. Select your preferred attractions above, specify your travel details, and receive an exquisite custom schedule instantly.
              </p>

              {/* Day count select */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                    Stay Duration
                  </label>
                  <select
                    value={itineraryDays}
                    onChange={(e) => setItineraryDays(Number(e.target.value))}
                    className="bg-black/60 border border-[#C5A880]/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    {[1, 2, 3].map((d) => (
                      <option key={d} value={d} className="bg-[#121212] text-white">
                        {d} {d === 1 ? 'Day' : 'Days'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-[#C5A880] font-mono">
                    Travel Ambience
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="bg-black/60 border border-[#C5A880]/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  >
                    {['Refined Culture', 'High Luxury Shopping', 'Leisure & Botanical', 'Executive Fast-Track'].map(
                      (style) => (
                        <option key={style} value={style} className="bg-[#121212] text-white">
                          {style}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Generate Trigger */}
              <button
                id="generate-itinerary-btn"
                onClick={handleGenerateItinerary}
                disabled={isGenerating}
                className="w-full bg-[#C5A880] hover:bg-[#B89047] disabled:bg-[#FAF9F6]/10 text-black disabled:text-white/40 font-semibold text-xs uppercase tracking-widest py-3.5 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Butler is drafting...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4" />
                    <span>Generate Bespoke Itinerary</span>
                  </>
                )}
              </button>
            </div>

            {/* Planner Right: Result Window */}
            <div className="lg:col-span-7 bg-black/60 border border-[#C5A880]/20 rounded-2xl h-[400px] flex flex-col overflow-hidden text-left shadow-2xl">
              {/* Result Header */}
              <div className="bg-[#1A1A1A] border-b border-[#C5A880]/15 px-6 py-3 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-mono font-bold flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Drawn Agenda Portfolio</span>
                </span>
                {itineraryResult && (
                  <button
                    onClick={handleGenerateItinerary}
                    className="text-[#FAF9F6]/50 hover:text-[#C5A880] text-[9px] font-mono flex items-center space-x-1 uppercase"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Redraft</span>
                  </button>
                )}
              </div>

              {/* Result Body scrollable */}
              <div className="flex-1 overflow-y-auto p-6 text-xs text-[#FAF9F6]/90 leading-relaxed font-sans">
                {isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                    <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#C5A880] animate-pulse">
                        Arranging schedules with Esstana concierge...
                      </p>
                      <p className="text-[10px] text-[#FAF9F6]/40 mt-1">
                        Securing private theater boxes and table allocations
                      </p>
                    </div>
                  </div>
                ) : errorGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <p className="text-rose-400 font-medium">{errorGenerating}</p>
                    <p className="text-[10px] text-[#FAF9F6]/40 mt-2">
                      Please verify that your GEMINI_API_KEY is active in the secrets panel.
                    </p>
                  </div>
                ) : itineraryResult ? (
                  <div className="space-y-4 whitespace-pre-wrap font-sans leading-relaxed">
                    {itineraryResult}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#FAF9F6]/40 max-w-sm mx-auto">
                    <Compass className="w-10 h-10 text-[#C5A880]/30 mb-4" />
                    <p className="font-serif italic text-sm text-[#FAF9F6]/60">
                      "An itinerary is a beautiful plan, drawn with elegant hospitality."
                    </p>
                    <p className="text-[10px] mt-2 leading-relaxed">
                      Select your travel duration, pick some local sites above, and hit generate to draft a highly tailored lifestyle schedule.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
