import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Express app
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // Supabase Setup
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  let supabase: any = null;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-supabase-project')) {
    try {
      supabase = createClient(supabaseUrl, supabaseKey);
      console.log('✅ Supabase Client initialized successfully.');
    } catch (err) {
      console.warn('⚠️ Could not initialize Supabase Client:', err);
    }
  } else {
    console.log('ℹ️ Supabase environment variables not set or default. Using local JSON store for bookings.');
  }

  // In-memory bookings fallback and file-path configuration
  const BOOKINGS_FILE = path.join(process.cwd(), 'bookings_store.json');
  let bookingsMemory: any[] = [];

  // Load initial bookings from storage file if it exists
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
      bookingsMemory = JSON.parse(data);
    } else {
      // Seed initial dummy booking for presentation
      bookingsMemory = [
        {
          id: 'EST-98214A',
          roomTypeId: 'executive-suite',
          roomName: 'Executive Suite',
          guestName: 'Esteemed Visitor',
          guestEmail: 'visitor@esstana.com',
          guestPhone: '+1 (555) 019-2831',
          checkIn: '2026-08-15',
          checkOut: '2026-08-18',
          guests: 2,
          totalPrice: 1350,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        }
      ];
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookingsMemory, null, 2), 'utf8');
    }
  } catch (error) {
    console.error('Failed to load bookings database:', error);
  }

  // Lazy-loaded Gemini AI client to prevent crash on startup if API key is missing
  let aiClient: any = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not defined. Please add it to your Secrets panel.');
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // ----------------- API Endpoints -----------------

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      database: supabase ? 'supabase' : 'local_json',
      serverTime: new Date().toISOString()
    });
  });

  // Get all bookings
  app.get('/api/bookings', async (req, res) => {
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        // Map database snake_case keys to camelCase for frontend compatibility
        const mapped = data.map((b: any) => ({
          id: b.id,
          roomTypeId: b.room_type_id,
          roomName: b.room_name,
          guestName: b.guest_name,
          guestEmail: b.guest_email,
          guestPhone: b.guest_phone,
          checkIn: b.check_in,
          checkOut: b.check_out,
          guests: b.guests,
          totalPrice: b.total_price,
          status: b.status,
          createdAt: b.created_at
        }));
        return res.json(mapped);
      }
      res.json(bookingsMemory);
    } catch (err: any) {
      console.error('Supabase fetch error, falling back to local memory:', err.message);
      res.json(bookingsMemory);
    }
  });

  // Create a new booking
  app.post('/api/bookings', async (req, res) => {
    try {
      const { roomTypeId, roomName, guestName, guestEmail, guestPhone, checkIn, checkOut, guests, totalPrice } = req.body;
      
      if (!roomTypeId || !guestName || !guestEmail || !checkIn || !checkOut) {
        return res.status(400).json({ error: 'Missing required fields for booking.' });
      }

      // Generate elegant reference ID
      const randomHex = Math.floor(100000 + Math.random() * 900000).toString();
      const referenceId = `EST-${randomHex}`;

      const newBooking = {
        id: referenceId,
        roomTypeId,
        roomName,
        guestName,
        guestEmail,
        guestPhone: guestPhone || 'N/A',
        checkIn,
        checkOut,
        guests: Number(guests) || 1,
        totalPrice: Number(totalPrice) || 0,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      if (supabase) {
        const { error } = await supabase
          .from('bookings')
          .insert([{
            id: referenceId,
            room_type_id: roomTypeId,
            room_name: roomName,
            guest_name: guestName,
            guest_email: guestEmail,
            guest_phone: guestPhone || 'N/A',
            check_in: checkIn,
            check_out: checkOut,
            guests: Number(guests) || 1,
            total_price: Number(totalPrice) || 0,
            status: 'confirmed',
            created_at: newBooking.createdAt
          }]);

        if (error) {
          console.error('Supabase insert error:', error.message);
          // Save to local memory fallback if Supabase table doesn't exist yet
          bookingsMemory.unshift(newBooking);
          fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookingsMemory, null, 2), 'utf8');
        }
      } else {
        bookingsMemory.unshift(newBooking);
        fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookingsMemory, null, 2), 'utf8');
      }

      res.status(201).json(newBooking);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'An error occurred while creating your reservation.' });
    }
  });

  // Cancel a booking
  app.delete('/api/bookings/:id', async (req, res) => {
    try {
      const bookingId = req.params.id;

      if (supabase) {
        const { data, error } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('id', bookingId)
          .select();

        if (!error && data && data.length > 0) {
          const b = data[0];
          return res.json({
            id: b.id,
            roomTypeId: b.room_type_id,
            roomName: b.room_name,
            guestName: b.guest_name,
            guestEmail: b.guest_email,
            guestPhone: b.guest_phone,
            checkIn: b.check_in,
            checkOut: b.check_out,
            guests: b.guests,
            totalPrice: b.total_price,
            status: b.status,
            createdAt: b.created_at
          });
        }
      }

      const index = bookingsMemory.findIndex((b) => b.id === bookingId);
      if (index === -1) {
        return res.status(404).json({ error: 'Reservation reference not found.' });
      }

      bookingsMemory[index].status = 'cancelled';
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookingsMemory, null, 2), 'utf8');

      res.json(bookingsMemory[index]);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'An error occurred while cancelling your reservation.' });
    }
  });

  // AI Concierge service via Gemini API
  app.post('/api/concierge', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message content is required.' });
      }

      const ai = getGeminiClient();

      // Setup rich system instruction outlining the hotel assets
      const systemInstruction = `You are Esstana, the virtual AI Head Concierge for the ultra-luxury Esstana Hotels. Your character is sophisticated, highly professional, warm, refined, and extremely polite.
You should refer to the guest as 'Esteemed Guest' or 'sir/madam' with exquisite dignity.
You have deep, complete knowledge of the hotel services and facilities:
- Accommodation: Deluxe King Room ($280/night), Executive Suite ($450/night), Grand Presidential Suite ($1200/night).
- The Crown Boardroom: Premium boardrooms with 98" 4K interactive presentation display and teleconferencing. Accommodates up to 16 delegates.
- Conference Facilities: Esstana Grand Ballroom and Conference Hall, up to 500 guests, professional audio-visual, banquet catering.
- Bar: The Gilded Vault Bar, serving premium whiskies and hand-crafted botanical cocktails in a low-lit sanctuary with live jazz.
- Restaurant: L’Ambroisie Restaurant, fine dining Michelin-style 7-course tasting menu by Executive Chef Marc Laurent using fresh local organic estate ingredients.
- Parking: Secure Executive underground parking, direct elevators to floors, EV fast-charging stations, and premium complimentary valet.
- Local Attractions: Royal Opera & Fine Arts Centre, The Golden Promenade & Luxury Boutiques, Serene Botanical Sanctuary, Museum of Contemporary Masterpieces.

If the guest asks about room pricing, services, or dining, explain them with sensory detail and cordially invite them to use our direct Booking System on the web interface.
You can also assist in drafting custom travel itineraries (e.g., 1-day, 2-day travel plans around the city visiting attractions).
Keep your answers elegantly formatted with neat bullet points, utilizing bold labels for emphasis. Embody the absolute pinnacle of luxury butler hospitality. Ensure your responses are concise and never overly wordy.`;

      // Build chat contents including the history and system instructions
      const chatHistory = history || [];
      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: chatHistory
      });

      const response = await chat.sendMessage({ message });
      const reply = response.text;

      // Extract new history entries to send back
      const updatedHistory = await chat.getHistory();

      res.json({ reply, history: updatedHistory });
    } catch (err: any) {
      console.error('Gemini API Concierge error:', err);
      // Return a polite message in-character even if AI fails or key is missing
      const fallbackReply = `*Esstana steps forward with a deep, apologetic bow.*\n\n"My deepest apologies, Esteemed Guest. I am currently experiencing a momentary connectivity lapse. However, please rest assured that our human team at the Front Desk is fully available to assist you. \n\nIf you are seeing this, the server's **GEMINI_API_KEY** may need configuration in the AI Studio Secrets panel. Rest assured, our local booking and inquiry systems are fully operational!"`;
      res.json({ 
        reply: fallbackReply, 
        error: err.message || 'API key missing or configuration needed.'
      });
    }
  });

  // ----------------- Vite / Static Serving -----------------

  if (process.env.NODE_ENV !== 'production') {
    console.log('Mounting Vite Developer Middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('Serving Production Assets...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Esstana Hotels Senior Fullstack backend listening on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Fatal server startup error:', error);
});
