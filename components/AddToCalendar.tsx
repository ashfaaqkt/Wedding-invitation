'use client'
import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '@/config/wedding'

interface Props {
  onClose: () => void
}

function formatGoogleDate(dateStr: string, timeStr: string): string {
  const months: Record<string, string> = {
    'May': '05',
  }
  const [month, day, year] = dateStr.replace(',', '').split(' ')
  const hour = timeStr.includes('10:00') ? '10' : timeStr.includes('5:00') ? '17' : '19'
  return `${year}${months[month]}${day.padStart(2, '0')}T${hour}0000`
}

function makeGoogleUrl(event: typeof WEDDING_CONFIG.events.nikkah, title: string) {
  const start = formatGoogleDate(event.date, event.time)
  const endHour = parseInt(start.slice(9, 11)) + 3
  const end = start.slice(0, 9) + String(endHour).padStart(2, '0') + start.slice(11)
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title + ' - Ashfaaq & ' + WEDDING_CONFIG.bride.name)}&dates=${start}/${end}&details=${encodeURIComponent('You are personally invited! ' + event.description)}&location=${encodeURIComponent(event.venue + ', ' + event.address)}`
}

function makeOutlookUrl(event: typeof WEDDING_CONFIG.events.nikkah, title: string) {
  const start = formatGoogleDate(event.date, event.time)
  const endHour = parseInt(start.slice(9, 11)) + 3
  const end = start.slice(0, 9) + String(endHour).padStart(2, '0') + start.slice(11)
  return `https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${start.slice(0,4)}-${start.slice(4,6)}-${start.slice(6,8)}T${start.slice(9,11)}:00:00&enddt=${end.slice(0,4)}-${end.slice(4,6)}-${end.slice(6,8)}T${end.slice(9,11)}:00:00&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.venue)}`
}

function makeICS(event: typeof WEDDING_CONFIG.events.nikkah, title: string): string {
  const start = formatGoogleDate(event.date, event.time)
  const endHour = parseInt(start.slice(9, 11)) + 3
  const end = start.slice(0, 9) + String(endHour).padStart(2, '0') + start.slice(11)
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AshTech//NikkahInvitation//EN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title} - Ashfaaq & ${WEDDING_CONFIG.bride.name}`,
    `DESCRIPTION:You are personally invited to this blessed occasion.`,
    `LOCATION:${event.venue}, ${event.address}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadICS(event: typeof WEDDING_CONFIG.events.nikkah, title: string) {
  const ics = makeICS(event, title)
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title.toLowerCase().replace(/ /g, '-')}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

const eventList = [
  { key: 'mehendi', label: 'Mehendi Ceremony', event: WEDDING_CONFIG.events.mehendi, emoji: '🌿' },
  { key: 'nikkah', label: 'Nikkah Ceremony', event: WEDDING_CONFIG.events.nikkah, emoji: '🕌' },
  { key: 'reception', label: 'Wedding Reception', event: WEDDING_CONFIG.events.reception, emoji: '✨' },
]

export default function AddToCalendar({ onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: '#0D0A08',
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
        }}
      >
        <div className="p-6 border-b border-gold/20">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-xl text-cream">Add to Calendar</h3>
            <button onClick={onClose} className="text-cream/40 hover:text-cream/70 text-2xl transition-colors">×</button>
          </div>
          <p className="text-cream/50 text-xs mt-1">Choose an event and calendar app</p>
        </div>

        <div className="p-6 space-y-6">
          {eventList.map(({ key, label, event, emoji }) => (
            <div key={key}>
              <p className="text-gold/70 text-xs font-semibold tracking-widest uppercase mb-2">
                {emoji} {label} · {event.date}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={makeGoogleUrl(event, label)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all hover:scale-105 text-center"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)' }}
                >
                  <span className="text-xl">📅</span>
                  <span className="text-cream/70 text-xs font-semibold">Google</span>
                </a>
                <a
                  href={makeOutlookUrl(event, label)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all hover:scale-105 text-center"
                  style={{ background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.25)' }}
                >
                  <span className="text-xl">📆</span>
                  <span className="text-cream/70 text-xs font-semibold">Outlook</span>
                </a>
                <button
                  onClick={() => downloadICS(event, label)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <span className="text-xl">🍎</span>
                  <span className="text-cream/70 text-xs font-semibold">Apple</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
