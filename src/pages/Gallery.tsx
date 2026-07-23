import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Eye, Calendar, User, BookOpen, Clock, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { GALLERY_DATA, BLOG_DATA } from '../data';
import { BlogPost, GalleryItem } from '../types';

export default function GalleryPage() {
  const [activeSection, setActiveSection] = useState<'photos' | 'videos' | 'blog'>('photos');
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<'All' | 'rooms' | 'dining' | 'wellness' | 'events'>('All');

  // Modal / Detailed View states
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [activeVideo, setActiveVideo] = useState<GalleryItem | null>(null);
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  // Filter gallery items
  const photosList = GALLERY_DATA.filter((g) => g.type === 'image');
  const videosList = GALLERY_DATA.filter((g) => g.type === 'video');

  const filteredPhotos = selectedPhotoCategory === 'All'
    ? photosList
    : photosList.filter((g) => g.category === selectedPhotoCategory);

  return (
    <div id="gallery-page" className="bg-[#FAF9F6] text-[#1A1A1A] pt-32 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page title */}
        {!activeArticle && (
          <div className="flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono font-semibold">
              Media & Stories
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide uppercase mt-4">
              Gallery & Curated Blog
            </h1>
            <div className="w-20 h-[1px] bg-[#C5A880] mt-6 mb-12" />

            {/* Sub-section Navigation Tabs */}
            <div className="flex space-x-6 border-b border-black/10 pb-4 mb-12 w-full max-w-md justify-center">
              {(['photos', 'videos', 'blog'] as const).map((sec) => (
                <button
                  key={sec}
                  id={`gallery-tab-${sec}`}
                  onClick={() => setActiveSection(sec)}
                  className={`text-xs uppercase tracking-[0.2em] font-medium font-mono pb-2 relative transition-colors ${
                    activeSection === sec ? 'text-[#C5A880]' : 'text-black/50 hover:text-black'
                  }`}
                >
                  {sec}
                  {activeSection === sec && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Render Panels */}
        <AnimatePresence mode="wait">
          {/* 1. Photos Section */}
          {activeSection === 'photos' && !activeArticle && (
            <motion.div
              key="photos-gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {/* Photo categories filtering */}
              <div className="flex flex-wrap gap-2 justify-center">
                {(['All', 'rooms', 'dining', 'wellness', 'events'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedPhotoCategory(cat)}
                    className={`text-[10px] font-mono uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border transition-all ${
                      selectedPhotoCategory === cat
                        ? 'bg-black text-[#C5A880] border-black'
                        : 'text-black/60 border-black/15 hover:border-black/50 hover:text-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Photo bento-style grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    id={`photo-card-${photo.id}`}
                    onClick={() => setActivePhoto(photo)}
                    className="relative group overflow-hidden rounded-xl h-72 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute bottom-6 left-6 text-left">
                      <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-mono bg-black/60 border border-[#C5A880]/30 rounded px-2 py-0.5">
                        {photo.category}
                      </span>
                      <h4 className="font-serif text-[#FAF9F6] text-base mt-2 tracking-wide uppercase">
                        {photo.title}
                      </h4>
                    </div>

                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-[#C5A880] text-black flex items-center justify-center">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 2. Videos Section */}
          {activeSection === 'videos' && !activeArticle && (
            <motion.div
              key="videos-gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {videosList.map((vid) => (
                <div
                  key={vid.id}
                  id={`video-card-${vid.id}`}
                  className="bg-[#121212] border border-[#C5A880]/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col group text-left text-white"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => setActiveVideo(vid)}
                    className="relative h-64 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-[#C5A880] hover:bg-[#B89047] text-black flex items-center justify-center shadow-2xl scale-95 group-hover:scale-105 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">
                      Esstana Digital Tour
                    </span>
                    <h3 className="font-serif text-lg tracking-wider uppercase text-[#FAF9F6] mt-1 group-hover:text-[#C5A880] transition-colors">
                      {vid.title}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* 3. Blog Section */}
          {activeSection === 'blog' && !activeArticle && (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {BLOG_DATA.map((post) => (
                <article
                  key={post.id}
                  id={`blog-card-${post.id}`}
                  className="bg-white border border-black/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 text-left"
                >
                  <div>
                    {/* Cover image */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-4 left-4 bg-black/85 text-[#C5A880] text-[9px] font-mono px-2.5 py-1 rounded border border-[#C5A880]/30 uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-[10px] text-black/50 font-mono uppercase mb-3">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-[#C5A880]" />
                          <span>{post.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-[#C5A880]" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-lg leading-snug uppercase tracking-wide hover:text-[#C5A880] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-black/70 font-sans leading-relaxed mt-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-[#C5A880]/15 flex items-center justify-center">
                        <User className="w-3 h-3 text-[#C5A880]" />
                      </div>
                      <span className="text-[10px] text-black/60 font-mono font-medium truncate max-w-[120px]">
                        {post.author.split(',')[0]}
                      </span>
                    </div>
                    <button
                      id={`blog-read-btn-${post.id}`}
                      onClick={() => {
                        setActiveArticle(post);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs text-[#C5A880] font-mono tracking-widest uppercase hover:text-black flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <span>Read Suite</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </motion.div>
          )}

          {/* 4. Blog Detailed View */}
          {activeArticle && (
            <motion.div
              key="blog-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto text-left"
            >
              <button
                id="blog-back-btn"
                onClick={() => setActiveArticle(null)}
                className="flex items-center space-x-2 text-xs font-mono text-black/60 hover:text-[#C5A880] uppercase tracking-widest mb-8 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Stories</span>
              </button>

              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#C5A880] font-semibold bg-[#C5A880]/10 border border-[#C5A880]/30 px-3 py-1 rounded-full">
                  {activeArticle.category}
                </span>

                <h1 className="font-serif text-3xl sm:text-5xl leading-tight uppercase">
                  {activeArticle.title}
                </h1>

                <div className="flex flex-wrap gap-6 items-center text-xs text-black/50 font-mono uppercase border-y border-black/10 py-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#C5A880] text-black flex items-center justify-center font-bold">
                      {activeArticle.author.charAt(0)}
                    </div>
                    <div>
                      <span className="block text-black font-semibold">{activeArticle.author}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#C5A880]">Published:</span> {activeArticle.date}
                  </div>
                  <div>
                    <span className="text-[#C5A880]">Estimate:</span> {activeArticle.readTime}
                  </div>
                </div>

                {/* Banner Photo */}
                <div className="h-[450px] overflow-hidden rounded-2xl shadow-xl mt-8">
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Blog content */}
                <div
                  className="prose max-w-none text-sm text-black/80 font-sans leading-relaxed pt-8 space-y-6"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {activeArticle.content}
                </div>

                {/* Closing signature */}
                <div className="border-t border-black/10 pt-10 mt-12 flex flex-col sm:flex-row items-center justify-between text-[11px] text-black/40 font-mono uppercase tracking-widest">
                  <span>Esstana luxury travel magazine</span>
                  <span className="text-[#C5A880]">Dignity hospitality since 1994</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal: Interactive Video Player */}
        <AnimatePresence>
          {activeVideo && (
            <div
              id="video-player-backdrop"
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                id="video-player-modal"
                className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-[#C5A880]/30 shadow-2xl flex flex-col text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#121212] border-b border-[#C5A880]/15 px-6 py-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#C5A880] font-semibold">
                    {activeVideo.title}
                  </span>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="text-white/60 hover:text-[#C5A880] text-xs uppercase font-mono tracking-widest"
                  >
                    [Close]
                  </button>
                </div>

                <div className="relative aspect-video bg-black">
                  <video
                    src={activeVideo.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Interactive Photo Viewer */}
        <AnimatePresence>
          {activePhoto && (
            <div
              id="photo-viewer-backdrop"
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setActivePhoto(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                id="photo-viewer-modal"
                className="w-full max-w-4xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full max-h-[85vh] object-contain rounded-lg border border-[#C5A880]/20 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center text-white space-y-1 w-full">
                  <span className="text-[#C5A880] text-[10px] uppercase font-mono tracking-[0.2em]">
                    {activePhoto.category}
                  </span>
                  <h3 className="font-serif text-lg uppercase tracking-wider">{activePhoto.title}</h3>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute -top-12 right-0 text-white/60 hover:text-[#C5A880] text-xs font-mono uppercase tracking-widest"
                >
                  ✕ Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
