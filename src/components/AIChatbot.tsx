import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, X, Bot, User, CornerDownLeft, Loader2, RefreshCw } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface AIChatbotProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

export default function AIChatbot({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }: AIChatbotProps = {}) {
  const [localIsOpen, setLocalIsOpen] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
  const setIsOpen = controlledSetIsOpen !== undefined ? controlledSetIsOpen : setLocalIsOpen;
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [messages, setMessages] = useState<{ id: string; role: 'user' | 'assistant'; text: string; time: string }[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Good day, Esteemed Guest. I am Esstana, your dedicated AI Head Concierge. It is my absolute pleasure to assist you. \n\nWhether you wish to enquire about our suites, reserve a table at L’Ambroisie, check parking arrangements, or request a bespoke itinerary for our city’s landmarks, please let me know. How may I serve you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const userText = textToSend;
    
    setMessages(prev => [
      ...prev,
      {
        id: userMsgId,
        role: 'user',
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    
    setMessage('');
    setIsTyping(true);

    const modelHistory = chatHistory;
    const newHistoryEntry: ChatMessage = {
      role: 'user',
      parts: [{ text: userText }]
    };

    try {
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          history: [...modelHistory, newHistoryEntry]
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.reply) {
        setMessages(prev => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            text: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        if (data.history) {
          setChatHistory(data.history);
        } else {
          setChatHistory(prev => [
            ...prev,
            newHistoryEntry,
            {
              role: 'model',
              parts: [{ text: data.reply }]
            }
          ]);
        }
      } else {
        throw new Error('No reply from concierge.');
      }
    } catch (error) {
      console.error('Error talking to concierge:', error);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: 'assistant',
          text: 'My sincerest apologies, Esteemed Guest. It seems I am experiencing a temporary connection delay. Please feel free to make direct inquiries with our front desk or attempt your message again shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const quickPrompts = [
    { label: '🍷 L’Ambroisie Menu', text: 'What dining options do you have, and who is the chef?' },
    { label: '👑 Suites & Rates', text: 'Tell me about your available suites, sizes, and pricing per night.' },
    { label: '🚗 Executive Valet', text: 'Tell me about your parking arrangements and valet services.' },
    { label: '🗺️ 2-Day City Tour', text: 'Could you build a bespoke 2-day cultural and shopping itinerary around the city attractions?' }
  ];

  return (
    <div id="ai-concierge-root" className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-concierge-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22 }}
            className="w-[360px] sm:w-[420px] h-[580px] bg-[#121212]/95 backdrop-blur-md border border-[#C5A880]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-left mb-4"
          >
            {/* Header */}
            <div className="bg-[#1A1A1A] border-b border-[#C5A880]/20 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-black border border-[#C5A880] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#121212] rounded-full" />
                </div>
                <div>
                  <h4 className="font-serif text-[#FAF9F6] text-sm tracking-widest uppercase">
                    Esstana Concierge
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    Virtual Head Butler • Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#FAF9F6]/60 hover:text-[#C5A880] transition-colors p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gradient-to-b from-[#121212] to-black scrollbar-thin scrollbar-thumb-[#C5A880]/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-[#C5A880]" />
                      </div>
                    )}
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-[#C5A880] text-black rounded-tr-none font-sans font-medium'
                            : 'bg-[#1C1C1C] text-[#FAF9F6]/90 border border-[#FAF9F6]/5 rounded-tl-none font-sans white-space-pre-line'
                        }`}
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {msg.text}
                      </div>
                      <span className="block text-[9px] text-[#FAF9F6]/40 mt-1 font-mono text-right px-1">
                        {msg.time}
                      </span>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-full bg-[#FAF9F6]/10 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-4 h-4 text-[#FAF9F6]/60" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 bg-[#1C1C1C] px-3 py-2 rounded-xl border border-[#C5A880]/20">
                    <Loader2 className="w-4 h-4 text-[#C5A880] animate-spin" />
                    <span className="text-[10px] text-[#C5A880] font-mono tracking-widest uppercase animate-pulse">
                      Esstana is composing...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-4 py-2.5 bg-[#141414] border-t border-[#C5A880]/10">
              <p className="text-[9px] uppercase tracking-widest text-[#C5A880]/70 mb-1.5 font-mono font-semibold">
                Suggested Curated Enquiries
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qp.text)}
                    className="text-[10px] bg-black hover:bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#FAF9F6]/90 hover:text-[#C5A880] rounded-full px-2.5 py-1 transition-all duration-300 cursor-pointer"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <div className="p-4 bg-[#1A1A1A] border-t border-[#C5A880]/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(message);
                }}
                className="flex items-center space-x-2 bg-black border border-[#C5A880]/30 rounded-xl px-3 py-2 focus-within:border-[#C5A880] transition-colors"
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enquire with Esstana..."
                  className="flex-1 bg-transparent border-none text-[#FAF9F6] text-xs focus:outline-none placeholder-[#FAF9F6]/30 font-sans"
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isTyping}
                  className="p-1.5 rounded-lg bg-[#C5A880] hover:bg-[#B89047] disabled:bg-[#FAF9F6]/10 text-black disabled:text-[#FAF9F6]/30 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 text-[9px] text-[#FAF9F6]/40 font-mono uppercase tracking-widest">
                <span>Esstana Butler Intelligence</span>
                <span className="flex items-center">
                  Press enter <CornerDownLeft className="w-2.5 h-2.5 ml-1" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        id="ai-concierge-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-3 bg-gradient-to-r from-[#C5A880] to-[#B89047] hover:shadow-[0_0_30px_rgba(197,168,128,0.5)] text-black px-5 py-3.5 rounded-full font-serif font-medium tracking-widest text-xs uppercase cursor-pointer shadow-2xl transition-shadow"
      >
        <div className="relative">
          <Sparkles className="w-4 h-4 text-black animate-pulse" />
        </div>
        <span>Concierge</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
        </span>
      </motion.button>
    </div>
  );
}
