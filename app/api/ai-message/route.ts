import { NextRequest, NextResponse } from 'next/server'

const FALLBACK_MESSAGES = [
  (name: string) => `Dear ${name}, may Allah's blessings shower upon you as you join us on this most joyous occasion. Your presence at our Nikkah celebration will fill our hearts with immeasurable joy. We are grateful that Allah has brought us together in this beautiful bond of friendship. May you and your family always be under His divine protection and mercy. Barakallahu feekum. 💛`,
  (name: string) => `Dearest ${name}, receiving your response has filled our hearts with warmth and gratitude. As we embark on this sacred journey of Nikkah, knowing that you will be part of this blessed moment makes it even more special. May Allah grant you happiness, health, and success in all your endeavours. We look forward to celebrating together, insha'Allah. ✨`,
  (name: string) => `Beloved ${name}, we are so honoured to have you join us as we begin this blessed chapter. The Prophet ﷺ said that Nikkah is half of the deen — and having beloved ones like you witness this moment makes it truly complete. May Allah bless you with love, joy, and peace in your life. See you soon, insha'Allah! 🌙`,
]

export async function POST(req: NextRequest) {
  const { guestName } = await req.json()

  // Try Claude API if key is configured
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (apiKey && !apiKey.startsWith('your_')) {
    try {
      const Anthropic = (await import('@anthropic-ai/sdk')).default
      const client = new Anthropic({ apiKey })

      const message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        system: `You are writing a warm, heartfelt personal wedding invitation message for a Muslim Nikkah ceremony. The message should be personal, warm, include Islamic blessings (like "Barakallahu feekum", "insha'Allah", "Alhamdulillah"), and reference the blessed nature of Nikkah in Islam. Keep it to 3-4 sentences. Do not include quotation marks at start/end.`,
        messages: [
          {
            role: 'user',
            content: `Write a personal message for guest named "${guestName}" who is attending our Nikkah celebration. Make it warm and personal, addressing them by name, including Islamic blessings.`,
          },
        ],
      })

      const text = message.content[0].type === 'text' ? message.content[0].text : null
      if (text) return NextResponse.json({ message: text, source: 'ai' })
    } catch (err) {
      console.error('Claude API error:', err)
    }
  }

  // Fallback to pre-written messages
  const fallback = FALLBACK_MESSAGES[Math.floor(Math.random() * FALLBACK_MESSAGES.length)]
  return NextResponse.json({ message: fallback(guestName), source: 'fallback' })
}
