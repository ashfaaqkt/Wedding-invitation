'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { registerGuest } from '@/lib/guestStore'
import { WEDDING_CONFIG } from '@/config/wedding'
import IslamicBackground from '@/components/IslamicBackground'
import StarField from '@/components/StarField'

type Phase = 'welcome' | 'form' | 'ready'

export default function LandingPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('welcome')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [welcomeText, setWelcomeText] = useState('')
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  const fullWelcome = 'Assalamu Alaikum Wa Rahmatullahi Wa Barakatuh'

  // Typewriter effect
  useEffect(() => {
    if (phase !== 'welcome') return
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullWelcome.length) {
        setWelcomeText(fullWelcome.slice(0, i))
        i++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowSubtitle(true), 400)
        setTimeout(() => setShowBtn(true), 900)
      }
    }, 45)
    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'form') setTimeout(() => nameRef.current?.focus(), 600)
  }, [phase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name'); return }
    if (!phone.trim()) { setError('Please enter your WhatsApp number'); return }
    setError('')
    setLoading(true)
    try {
      await registerGuest({ name: name.trim(), phone: phone.trim() })
      sessionStorage.setItem('guest_name', name.trim())
      sessionStorage.setItem('guest_phone', phone.trim())
      setPhase('ready')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const goToInvitation = () => {
    router.push('/invitation')
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D0A08 0%, #1B2E1A 50%, #0D0A08 100%)' }}>
      {/* Animated background */}
      <IslamicBackground />
      <StarField />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2D6A4F, transparent)' }} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <AnimatePresence mode="wait">

          {/* ── Phase 1: WELCOME ── */}
          {phase === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              {/* Bismillah */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6"
              >
                <p className="bismillah text-4xl md:text-5xl gold-shimmer font-bold leading-relaxed">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </motion.div>

              {/* Ornament */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="ornament-line mb-8 px-8"
              >
                <span className="text-gold text-xl">✦</span>
              </motion.div>

              {/* Typewriter welcome */}
              <div className="mb-6 min-h-[4rem]">
                <h1 className="font-playfair text-xl md:text-2xl text-gold-light leading-relaxed">
                  {welcomeText}
                  {welcomeText.length < fullWelcome.length && (
                    <span className="animate-pulse text-gold">|</span>
                  )}
                </h1>
              </div>

              {/* Subtitle */}
              <AnimatePresence>
                {showSubtitle && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-8"
                  >
                    <p className="text-cream/70 text-sm md:text-base font-inter tracking-widest uppercase mb-4">
                      You have received a personal invitation
                    </p>
                    <div className="relative mx-auto w-fit">
                      <h2 className="font-playfair text-5xl md:text-7xl font-bold gold-shimmer leading-tight">
                        Hisham KP
                      </h2>
                      <p className="font-playfair text-3xl md:text-4xl text-gold/80 italic mt-1">
                        &amp; his beloved
                      </p>
                      <p className="font-playfair text-3xl md:text-5xl font-semibold text-cream mt-1">
                        {WEDDING_CONFIG.bride.name}
                      </p>
                    </div>
                    <p className="text-gold/60 text-sm mt-6 tracking-[0.3em] uppercase">
                      Nikkah · May 24, 2026
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA Button */}
              <AnimatePresence>
                {showBtn && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <button
                      onClick={() => setPhase('form')}
                      className="gold-btn px-10 py-4 rounded-full text-base font-semibold tracking-wider pulse-glow"
                    >
                      Open Your Invitation ✨
                    </button>
                    <p className="text-cream/40 text-xs mt-4 font-inter">
                      Enter your name to receive your personal invitation
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Phase 2: FORM ── */}
          {phase === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md"
            >
              {/* Card */}
              <div className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
                style={{
                  background: 'rgba(27,46,26,0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.2)',
                }}>

                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold/60 rounded-tl-lg" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold/60 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold/60 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold/60 rounded-br-lg" />

                <div className="text-center mb-8">
                  <p className="bismillah text-2xl gold-shimmer mb-3">﷽</p>
                  <h2 className="font-playfair text-2xl text-cream font-semibold">
                    Your Invitation Awaits
                  </h2>
                  <p className="text-cream/60 text-sm mt-2 font-inter">
                    Please share your details to receive your<br />personal invitation
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gold/80 text-xs font-semibold tracking-widest uppercase mb-2">
                      Your Name
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="gold-input w-full px-4 py-3 rounded-xl text-cream placeholder-cream/30 text-sm"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="block text-gold/80 text-xs font-semibold tracking-widest uppercase mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="gold-input w-full px-4 py-3 rounded-xl text-cream placeholder-cream/30 text-sm"
                      autoComplete="tel"
                    />
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 text-xs text-center"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="gold-btn w-full py-4 rounded-xl text-sm font-bold tracking-wider mt-6 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-dark/40 border-t-dark rounded-full animate-spin" />
                        Preparing your invitation...
                      </span>
                    ) : (
                      'Receive My Invitation →'
                    )}
                  </button>
                </form>

                <button
                  onClick={() => setPhase('welcome')}
                  className="mt-4 w-full text-center text-cream/40 text-xs hover:text-cream/60 transition-colors"
                >
                  ← Go back
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Phase 3: READY ── */}
          {phase === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="text-center max-w-lg mx-auto"
            >
              {/* Animated envelope icon */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="text-8xl mb-6"
              >
                💌
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gold/70 text-sm tracking-widest uppercase mb-3 font-inter"
              >
                Your Invitation Is Ready
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-playfair text-3xl md:text-4xl text-cream font-bold mb-2"
              >
                Welcome, <span className="gold-shimmer">{name}</span>!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-cream/60 text-sm mb-10 font-inter leading-relaxed"
              >
                You have been personally invited to witness<br />
                a blessed Nikkah celebration ✨
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  onClick={goToInvitation}
                  className="gold-btn px-12 py-5 rounded-full text-lg font-bold tracking-wider pulse-glow"
                >
                  Open My Invitation 🎊
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 ornament-line px-12"
              >
                <span className="text-gold/60 text-sm font-inter">
                  May Allah bless this union
                </span>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer credit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 w-full text-center z-10"
      >
        <p className="text-cream/25 text-xs font-inter tracking-widest">
          Crafted with love by <span className="text-gold/50">AshTech</span>
        </p>
      </motion.div>
    </div>
  )
}
