'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calculate()
    const id = setInterval(calculate, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (!mounted) return null

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{
        background: 'rgba(13,10,8,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(212,175,55,0.2)',
      }}
    >
      <p className="text-cream/50 text-xs font-inter tracking-[0.25em] uppercase mb-5">
        Nikkah Begins In
      </p>
      <div className="grid grid-cols-4 gap-3">
        {units.map(({ label, value }) => (
          <motion.div
            key={label}
            className="flex flex-col items-center"
          >
            <div
              className="w-full py-4 rounded-xl mb-2 relative overflow-hidden"
              style={{
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}
            >
              <motion.span
                key={value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-playfair text-2xl md:text-3xl font-bold gold-shimmer"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </div>
            <span className="text-cream/50 text-xs tracking-wider uppercase">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
