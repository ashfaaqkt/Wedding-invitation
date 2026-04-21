'use client'

export default function IslamicBorder() {
  return (
    <div className="relative w-full h-12 overflow-hidden" style={{ background: 'rgba(212,175,55,0.05)' }}>
      <svg
        viewBox="0 0 800 48"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top decorative band */}
        <defs>
          <pattern id="islamicTop" x="0" y="0" width="80" height="48" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8">
              {/* Pointed arch motif */}
              <path d="M40,4 C30,4 20,12 20,24 L20,44 L40,44 L60,44 L60,24 C60,12 50,4 40,4 Z" />
              <path d="M40,8 C32,8 24,14 24,24 L24,44 L40,44 L56,44 L56,24 C56,14 48,8 40,8 Z"
                stroke="rgba(212,175,55,0.3)" />
              {/* Small diamonds at arch top */}
              <rect x="37" y="2" width="6" height="6" transform="rotate(45 40 5)"
                fill="rgba(212,175,55,0.4)" stroke="none" />
              {/* Side connectors */}
              <line x1="0" y1="24" x2="20" y2="24" />
              <line x1="60" y1="24" x2="80" y2="24" />
              {/* Top line */}
              <line x1="0" y1="2" x2="80" y2="2" stroke="rgba(212,175,55,0.4)" />
              <line x1="0" y1="46" x2="80" y2="46" stroke="rgba(212,175,55,0.3)" />
            </g>
          </pattern>
        </defs>
        <rect width="800" height="48" fill="url(#islamicTop)" />
      </svg>
    </div>
  )
}
