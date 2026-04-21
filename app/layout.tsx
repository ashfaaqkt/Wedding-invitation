import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'You\'re Invited — Ashfaaq\'s Nikkah 2026',
  description: 'A personal invitation to celebrate the blessed Nikkah of Ashfaaq. Join us for Mehendi (May 23), Nikkah (May 24) & Reception (May 25), 2026.',
  openGraph: {
    title: 'You\'re Invited — Ashfaaq\'s Nikkah 2026',
    description: 'Join us in celebrating this blessed union. ✨',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
