'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WEDDING_CONFIG } from '@/config/wedding'
import type { Guest } from '@/lib/guestStore'

type View = 'login' | 'dashboard'

function formatDate(val: unknown): string {
  if (!val) return '—'
  try {
    if (typeof val === 'string') return new Date(val).toLocaleString()
    if (val && typeof val === 'object' && 'seconds' in val) {
      return new Date((val as { seconds: number }).seconds * 1000).toLocaleString()
    }
  } catch {}
  return String(val)
}

export default function AdminPage() {
  const [view, setView] = useState<View>('login')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date')
  const [copied, setCopied] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  const fetchGuests = useCallback(async (pw: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/guests?pw=${encodeURIComponent(pw)}`)
      if (!res.ok) throw new Error('Unauthorized')
      const data = await res.json()
      setGuests(data.guests || [])
      setLastRefresh(new Date())
    } catch {
      setView('login')
      setLoginError('Session expired or unauthorised.')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === (WEDDING_CONFIG.adminPassword || 'ashfaaq321')) {
      sessionStorage.setItem('admin_pw', password)
      setView('dashboard')
      fetchGuests(password)
    } else {
      setLoginError('Incorrect password. Access denied.')
      setTimeout(() => setLoginError(''), 3000)
    }
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw')
    if (saved === (WEDDING_CONFIG.adminPassword || 'ashfaaq321')) {
      setView('dashboard')
      fetchGuests(saved)
    }
  }, [fetchGuests])

  const filtered = guests
    .filter(g =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.includes(search)
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  const exportCSV = () => {
    const header = 'Name,Phone,Registered At\n'
    const rows = guests.map(g =>
      `"${g.name}","${g.phone}","${formatDate(g.registeredAt)}"`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `nikkah-guests-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyList = () => {
    const text = guests.map((g, i) => `${i + 1}. ${g.name} — ${g.phone}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const logout = () => {
    sessionStorage.removeItem('admin_pw')
    setView('login')
    setPassword('')
    setGuests([])
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0D0A08 0%, #1A1510 100%)' }}
    >
      <AnimatePresence mode="wait">

        {/* ── LOGIN ── */}
        {view === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="w-full max-w-sm">
              {/* Lock icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-center mb-8"
              >
                <div
                  className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-4 text-4xl"
                  style={{
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.3)',
                  }}
                >
                  🔐
                </div>
                <h1 className="font-playfair text-2xl text-cream font-semibold">Admin Panel</h1>
                <p className="text-cream/40 text-sm mt-1">Nikkah Guest Management</p>
              </motion.div>

              <form
                onSubmit={handleLogin}
                className="rounded-2xl p-8 space-y-5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div>
                  <label className="block text-gold/80 text-xs font-semibold tracking-widest uppercase mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="gold-input w-full px-4 py-3 rounded-xl text-cream text-sm"
                    autoFocus
                  />
                </div>

                <AnimatePresence>
                  {loginError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs text-center"
                    >
                      {loginError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button type="submit" className="gold-btn w-full py-3 rounded-xl text-sm font-bold">
                  Access Dashboard →
                </button>
              </form>

              <p className="text-center text-cream/20 text-xs mt-6">
                Restricted access · AshTech
              </p>
            </div>
          </motion.div>
        )}

        {/* ── DASHBOARD ── */}
        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            {/* Header */}
            <div
              className="sticky top-0 z-20 px-4 md:px-8 py-4 flex items-center justify-between"
              style={{
                background: 'rgba(13,10,8,0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(212,175,55,0.15)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                  <span className="text-sm">👑</span>
                </div>
                <div>
                  <h1 className="font-playfair text-lg text-cream">Admin Dashboard</h1>
                  <p className="text-cream/40 text-xs">Hisham KP Nikkah 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { const pw = sessionStorage.getItem('admin_pw') || ''; fetchGuests(pw) }}
                  className="px-3 py-1.5 rounded-lg text-xs text-cream/60 hover:text-cream transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  ↻ Refresh
                </button>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-lg text-xs text-red-400/70 hover:text-red-400 transition-colors"
                  style={{ border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  Sign Out
                </button>
              </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">

              {/* Stats cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Guests', value: guests.length, icon: '👥', color: '#D4AF37' },
                  { label: 'Mehendi', value: 'May 23', icon: '🌿', color: '#40916C' },
                  { label: 'Nikkah', value: 'May 24', icon: '🕌', color: '#D4AF37' },
                  { label: 'Reception', value: 'May 25', icon: '✨', color: '#722F37' },
                ].map(stat => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl p-5"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${stat.color}30`,
                    }}
                  >
                    <span className="text-2xl">{stat.icon}</span>
                    <p className="font-playfair text-2xl font-bold mt-2" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                    <p className="text-cream/50 text-xs mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40">🔍</span>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name or phone..."
                    className="gold-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-cream"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'name' | 'date')}
                  className="gold-input px-4 py-2.5 rounded-xl text-sm text-cream bg-transparent"
                >
                  <option value="date" className="bg-neutral-900">Sort by Date</option>
                  <option value="name" className="bg-neutral-900">Sort by Name</option>
                </select>
                <button
                  onClick={copyList}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#F5D77E' }}
                >
                  {copied ? '✅ Copied!' : '📋 Copy List'}
                </button>
                <button
                  onClick={exportCSV}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(64,145,108,0.15)', border: '1px solid rgba(64,145,108,0.3)', color: '#86efac' }}
                >
                  ⬇️ Export CSV
                </button>
              </div>

              {/* Last refresh */}
              {lastRefresh && (
                <p className="text-cream/30 text-xs mb-4">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </p>
              )}

              {/* Guest table */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(212,175,55,0.15)' }}
              >
                {/* Table header */}
                <div
                  className="grid grid-cols-12 px-6 py-3 text-xs font-semibold tracking-widest uppercase"
                  style={{ background: 'rgba(212,175,55,0.08)', color: 'rgba(212,175,55,0.7)' }}
                >
                  <div className="col-span-1">#</div>
                  <div className="col-span-4">Name</div>
                  <div className="col-span-4">Phone</div>
                  <div className="col-span-3">Registered</div>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="py-16 text-center">
                    <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-cream/40 text-sm">Loading guests...</p>
                  </div>
                )}

                {/* Empty */}
                {!loading && filtered.length === 0 && (
                  <div className="py-16 text-center">
                    <span className="text-4xl block mb-3">📭</span>
                    <p className="text-cream/40 text-sm">
                      {search ? 'No guests match your search.' : 'No guests registered yet.'}
                    </p>
                  </div>
                )}

                {/* Rows */}
                {!loading && filtered.map((guest, i) => (
                  <motion.div
                    key={guest.id || i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="grid grid-cols-12 px-6 py-4 items-center group transition-colors"
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.04)',
                      background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    }}
                  >
                    <div className="col-span-1 text-cream/30 text-xs font-mono">
                      {i + 1}
                    </div>
                    <div className="col-span-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: 'rgba(212,175,55,0.2)', color: '#D4AF37' }}
                        >
                          {guest.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-cream text-sm font-medium truncate">{guest.name}</span>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <a
                        href={`https://wa.me/${guest.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-cream/70 hover:text-green-400 transition-colors"
                      >
                        {guest.phone}
                      </a>
                    </div>
                    <div className="col-span-3 text-cream/40 text-xs">
                      {formatDate(guest.registeredAt)}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-cream/20 text-xs">
                  Admin Panel · Hisham KP Nikkah 2026 · Made by{' '}
                  <span className="text-gold/40">AshTech</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
