import { db, isFirebaseConfigured } from './firebase'
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'

export interface Guest {
  id?: string
  name: string
  phone: string
  aiMessage?: string
  registeredAt: string | Timestamp | null
}

const LOCAL_KEY = 'wedding_guests'

export async function registerGuest(guest: Omit<Guest, 'id' | 'registeredAt'>): Promise<string> {
  if (isFirebaseConfigured() && db) {
    const docRef = await addDoc(collection(db, 'guests'), {
      ...guest,
      registeredAt: serverTimestamp(),
    })
    return docRef.id
  }
  // Fallback: localStorage (client-side only)
  if (typeof window !== 'undefined') {
    const guests = getLocalGuests()
    const id = Date.now().toString()
    guests.push({ ...guest, id, registeredAt: new Date().toISOString() })
    localStorage.setItem(LOCAL_KEY, JSON.stringify(guests))
    return id
  }
  return Date.now().toString()
}

export async function getAllGuests(): Promise<Guest[]> {
  if (isFirebaseConfigured() && db) {
    const q = query(collection(db, 'guests'), orderBy('registeredAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Guest[]
  }
  // Server context: no localStorage available
  if (typeof window !== 'undefined') {
    return getLocalGuests().reverse()
  }
  return []
}

function getLocalGuests(): Guest[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  } catch {
    return []
  }
}

export function getLocalGuestsClient(): Guest[] {
  if (typeof window === 'undefined') return []
  return getLocalGuests().reverse()
}
