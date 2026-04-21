export const WEDDING_CONFIG = {
  groom: {
    name: 'Ashfaaq',
    fullName: 'Mohamed Ashfaaq',
  },
  bride: {
    name: 'Bride Name',
    fullName: 'Bride Full Name',
  },
  events: {
    mehendi: {
      title: 'Mehendi Ceremony',
      date: 'May 23, 2026',
      day: 'Saturday',
      time: '5:00 PM onwards',
      venue: 'Family Residence',
      address: 'Address to be updated',
      mapsLink: 'https://maps.google.com/?q=Your+Venue+Address',
      color: '#40916C',
      icon: '🌿',
      description: 'Join us for an evening of henna, music and celebration',
    },
    nikkah: {
      title: 'Nikkah Ceremony',
      date: 'May 24, 2026',
      day: 'Sunday',
      time: '10:00 AM',
      venue: 'Grand Mosque / Banquet Hall',
      address: 'Address to be updated',
      mapsLink: 'https://maps.google.com/?q=Your+Nikkah+Venue',
      color: '#D4AF37',
      icon: '🕌',
      description: 'Witness the sacred union blessed by Allah',
    },
    reception: {
      title: 'Wedding Reception',
      date: 'May 25, 2026',
      day: 'Monday',
      time: '7:00 PM onwards',
      venue: 'Grand Banquet Hall',
      address: 'Address to be updated',
      mapsLink: 'https://maps.google.com/?q=Your+Reception+Venue',
      color: '#722F37',
      icon: '✨',
      description: 'Celebrate with us at the grand reception dinner',
    },
  },
  hashtag: '#AshfaaqNikkah2026',
  adminPassword: 'ashfaaq321',
  createdBy: 'AshTech',
}

export type WeddingEvent = typeof WEDDING_CONFIG.events.nikkah
