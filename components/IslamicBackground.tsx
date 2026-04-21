'use client'
import { motion } from 'framer-motion'

export default function IslamicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large rotating geometric ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] opacity-[0.06]"
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="195" stroke="#D4AF37" strokeWidth="1" strokeDasharray="8 4" />
          <circle cx="200" cy="200" r="160" stroke="#D4AF37" strokeWidth="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180
            const x1 = 200 + 160 * Math.cos(angle)
            const y1 = 200 + 160 * Math.sin(angle)
            const x2 = 200 + 195 * Math.cos(angle)
            const y2 = 200 + 195 * Math.sin(angle)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="0.5" />
          })}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180
            return (
              <polygon
                key={i}
                points="200,40 220,180 200,200 180,180"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.4"
                transform={`rotate(${i * 45} 200 200)`}
              />
            )
          })}
        </svg>
      </motion.div>

      {/* Smaller rotating ring bottom-left */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-[0.05]"
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="195" stroke="#D4AF37" strokeWidth="1" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180
            const x = 200 + 195 * Math.cos(angle)
            const y = 200 + 195 * Math.sin(angle)
            return <circle key={i} cx={x} cy={y} r="4" fill="#D4AF37" opacity="0.6" />
          })}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180
            return (
              <polygon
                key={i}
                points="200,10 230,190 200,200 170,190"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.4"
                transform={`rotate(${i * 60} 200 200)`}
              />
            )
          })}
        </svg>
      </motion.div>

      {/* Center decorative mandala */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180
            const x1 = 200 + 180 * Math.cos(angle)
            const y1 = 200 + 180 * Math.sin(angle)
            return (
              <line
                key={i}
                x1="200" y1="200"
                x2={x1} y2={y1}
                stroke="#D4AF37"
                strokeWidth="0.5"
                opacity="0.6"
              />
            )
          })}
          {[40, 80, 120, 160].map((r, i) => (
            <circle key={i} cx="200" cy="200" r={r} stroke="#D4AF37" strokeWidth="0.3" strokeDasharray="3 3" />
          ))}
        </svg>
      </motion.div>

      {/* Islamic pattern grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.5'%3E%3Cpolygon points='40,5 55,20 55,60 40,75 25,60 25,20'/%3E%3Cpolygon points='40,15 50,25 50,55 40,65 30,55 30,25'/%3E%3Cline x1='40' y1='5' x2='40' y2='75'/%3E%3Cline x1='25' y1='20' x2='55' y2='60'/%3E%3Cline x1='55' y1='20' x2='25' y2='60'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
