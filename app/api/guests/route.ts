import { NextRequest, NextResponse } from 'next/server'
import { getAllGuests, registerGuest } from '@/lib/guestStore'

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get('pw')
  if (pw !== (process.env.ADMIN_PASSWORD || 'ashfaaq321')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const guests = await getAllGuests()
    return NextResponse.json({ guests, total: guests.length })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch guests' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone } = body
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone required' }, { status: 400 })
    }
    const id = await registerGuest({ name, phone })
    return NextResponse.json({ success: true, id })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to register guest' }, { status: 500 })
  }
}
