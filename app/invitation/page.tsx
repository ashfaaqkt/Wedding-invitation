'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { WEDDING_CONFIG } from '@/config/wedding'
import AddToCalendar from '@/components/AddToCalendar'
import CountdownTimer from '@/components/CountdownTimer'
import IslamicBorder from '@/components/IslamicBorder'
import IslamicBackground from '@/components/IslamicBackground'
import StarField from '@/components/StarField'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
})

const events = [
  {
    ...WEDDING_CONFIG.events.mehendi,
    gradient: 'from-emerald-900 to-green-800',
    border: '#40916C',
    light: '#86efac',
    emoji: '🌿',
  },
  {
    ...WEDDING_CONFIG.events.nikkah,
    gradient: 'from-yellow-900 to-amber-800',
    border: '#D4AF37',
    light: '#F5D77E',
    emoji: '🕌',
  },
  {
    ...WEDDING_CONFIG.events.reception,
    gradient: 'from-rose-900 to-red-900',
    border: '#722F37',
    light: '#ffffff',
    emoji: '✨',
  },
]

export default function InvitationPage() {
  const router = useRouter()
  const [guestName, setGuestName] = useState('Valued Guest')
  const [aiMessage, setAiMessage] = useState('')
  const [aiLoading, setAiLoading] = useState(true)
  const [activeEvent, setActiveEvent] = useState<number | null>(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  useEffect(() => {
    const name = sessionStorage.getItem('guest_name')
    if (name) setGuestName(name)
    else router.replace('/')
  }, [router])

  useEffect(() => {
    if (guestName === 'Valued Guest') return
    fetchAIMessage(guestName)
  }, [guestName])

  const fetchAIMessage = async (name: string) => {
    try {
      const res = await fetch('/api/ai-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName: name }),
      })
      const data = await res.json()
      setAiMessage(data.message)
    } catch {
      setAiMessage(
        `May Allah bless you, ${name}, for gracing us with your presence on this joyous occasion. Your company at our Nikkah celebration means the world to us. May your journey to us be safe and may Allah's blessings surround you always. Barakallahu feekum. 💛`
      )
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #0D0A08 0%, #1B2E1A 50%, #0D0A08 100%)' }}>
      <IslamicBackground />
      <StarField />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 md:py-20">

        {/* ── TOP INVITATION CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden mb-8"
          style={{
            background: 'rgba(13,10,8,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 30px 100px rgba(0,0,0,0.6)',
          }}
        >
          <IslamicBorder />

          <div className="p-8 md:p-12 text-center">
            {/* Bismillah */}
            <motion.div {...fadeUp(0.2)} className="mb-6">
              <p className="bismillah text-4xl md:text-5xl gold-shimmer">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.4)} className="ornament-line mb-6 px-6">
              <span className="text-gold text-sm font-inter tracking-[0.2em]">
                IN THE NAME OF ALLAH, THE MOST GRACIOUS, THE MOST MERCIFUL
              </span>
            </motion.div>

            {/* Guest welcome */}
            <motion.div {...fadeUp(0.55)} className="mb-8">
              <p className="text-cream/60 text-xs font-inter tracking-[0.3em] uppercase mb-2">
                Personal Invitation for
              </p>
              <h1 className="font-playfair text-4xl md:text-5xl gold-shimmer font-bold">
                {guestName}
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.7)} className="mb-10">
              <p className="text-cream/70 font-inter leading-relaxed mb-4">
                Together with our families, we joyfully request the honour of your presence<br className="hidden md:block" />
                to celebrate the blessed union of
              </p>

              {/* Names display */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
                </div>
                <div className="relative flex items-center justify-center gap-6 md:gap-10">
                  <div className="text-center">
                    <p className="text-cream/50 text-xs tracking-widest uppercase mb-1">Groom</p>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold gold-shimmer">
                      {WEDDING_CONFIG.groom.name}
                    </h2>
                  </div>
                  <div className="text-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center">
                      <span className="text-gold font-amiri text-2xl">&</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-cream/50 text-xs tracking-widest uppercase mb-1">Bride</p>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-cream">
                      {WEDDING_CONFIG.bride.name}
                    </h2>
                  </div>
                </div>
              </div>

              <p className="text-gold/60 text-sm tracking-[0.3em] uppercase font-inter">
                {WEDDING_CONFIG.hashtag}
              </p>
            </motion.div>

            {/* Quranic verse */}
            <motion.div
              {...fadeUp(0.85)}
              className="rounded-xl p-5 mb-6"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
            >
              <p className="bismillah text-xl leading-relaxed mb-2 font-bold" style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff' }}>
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
              </p>
              <p className="text-cream/50 text-xs font-inter italic">
                "And of His signs is that He created for you mates from among yourselves..." — Quran 30:21
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── COUNTDOWN TIMER ── */}
        <motion.div {...fadeUp(0.9)} className="mb-8">
          <CountdownTimer targetDate="2026-05-24T10:00:00" />
        </motion.div>

        {/* ── THREE EVENTS ── */}
        <motion.div {...fadeUp(1.0)} className="mb-8">
          <h2 className="text-center font-playfair text-2xl gold-shimmer mb-6">
            Celebration Events
          </h2>
          <div className="grid gap-4">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.15, duration: 0.6 }}
                onClick={() => setActiveEvent(activeEvent === i ? null : i)}
                className="rounded-2xl overflow-hidden cursor-pointer event-card"
                style={{
                  background: `rgba(13,10,8,0.8)`,
                  border: `1px solid ${event.border}50`,
                  boxShadow: activeEvent === i ? `0 0 30px ${event.border}40` : 'none',
                }}
              >
                <div className="p-5 flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `${event.border}25`, border: `1px solid ${event.border}60` }}
                  >
                    {event.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-playfair text-lg font-semibold" style={{ color: event.light }}>
                        {event.title}
                      </h3>
                      <span className="text-cream/40 text-lg">
                        {activeEvent === i ? '▲' : '▼'}
                      </span>
                    </div>
                    <p className="text-cream/70 text-sm mt-1">
                      <span className="font-semibold">{event.day},</span> {event.date}
                    </p>
                    <p className="text-cream/50 text-xs mt-0.5">{event.time}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {activeEvent === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t" style={{ borderColor: `${event.border}30` }}>
                        <p className="text-cream/60 text-sm mt-4 italic">{event.description}</p>
                        <div className="flex items-start gap-2 mt-3">
                          <span className="text-sm mt-0.5">📍</span>
                          <div>
                            <p className="text-cream/80 text-sm font-medium">{event.venue}</p>
                            <p className="text-cream/50 text-xs">{event.address}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <a
                            href={event.mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                            style={{
                              background: `${event.border}30`,
                              border: `1px solid ${event.border}60`,
                              color: event.light,
                            }}
                          >
                            🗺️ Open in Maps
                          </a>
                          <button
                            onClick={e => { e.stopPropagation(); setCalendarOpen(true) }}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                            style={{
                              background: 'rgba(212,175,55,0.15)',
                              border: '1px solid rgba(212,175,55,0.4)',
                              color: '#F5D77E',
                            }}
                          >
                            📅 Add to Calendar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── AI PERSONALIZED MESSAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="rounded-2xl p-6 md:p-8 mb-8"
          style={{
            background: 'rgba(13,10,8,0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
              <span className="text-sm">✨</span>
            </div>
            <h3 className="font-playfair text-lg text-white">A Personal Message for You</h3>
            <span className="ml-auto text-xs text-gold/60 bg-gold/10 px-2 py-1 rounded-full border border-gold/20">
              AI ✦
            </span>
          </div>

          {aiLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-4 rounded-full bg-gold/10 animate-pulse"
                  style={{ width: `${90 - i * 10}%` }} />
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-cream/80 text-sm leading-relaxed font-inter italic"
            >
              &ldquo;{aiMessage}&rdquo;
            </motion.p>
          )}
        </motion.div>

        {/* ── ADD TO CALENDAR MODAL ── */}
        <AnimatePresence>
          {calendarOpen && (
            <AddToCalendar onClose={() => setCalendarOpen(false)} />
          )}
        </AnimatePresence>

        {/* ── ACTION BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="grid grid-cols-2 gap-4 mb-12"
        >
          <button
            onClick={() => setCalendarOpen(true)}
            className="flex flex-col items-center gap-2 p-5 rounded-2xl transition-all hover:scale-105"
            style={{
              background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.3)',
            }}
          >
            <span className="text-3xl">📅</span>
            <span className="text-cream/80 text-sm font-semibold">Add to Calendar</span>
            <span className="text-cream/40 text-xs">Never miss the date</span>
          </button>

          <a
            href={WEDDING_CONFIG.events.nikkah.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-5 rounded-2xl transition-all hover:scale-105"
            style={{
              background: 'rgba(45,106,79,0.2)',
              border: '1px solid rgba(64,145,108,0.4)',
            }}
          >
            <span className="text-3xl">🗺️</span>
            <span className="text-cream/80 text-sm font-semibold">Get Directions</span>
            <span className="text-cream/40 text-xs">Navigate to venue</span>
          </a>

        </motion.div>

        {/* ── FOOTER ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.7 }}
          className="text-center space-y-3"
        >
          <div className="ornament-line px-8">
            <span className="text-gold/60 text-sm font-playfair italic">
              Barakallahu Lakuma Wa Baraka Alaykuma
            </span>
          </div>
          <p className="bismillah text-xl text-white">
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا
          </p>
          <p className="text-cream/30 text-xs font-inter tracking-[0.2em] mt-6">
            Crafted with ❤️ by{' '}
            <span className="text-gold/50">AshTech</span>
          </p>
        </motion.div>

      </div>
    </div>
  )
}
