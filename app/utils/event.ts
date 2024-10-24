// utils/Jadwal.ts

export interface Acara {
    title: string;
    time: string;
    location: string;
    description: string;
    dresscode: string;
  }
  
  export interface Event {
    date: string;
    image: string;
    headline: string;
    mainTime: string;
    description: string;
    location: string;
    acara: Acara[];
  }
  
  export const events: Event[] = [
    {
        date: '26 April',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
      {
        date: '27 April',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
    
      {
        date: '28 April',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
    
      {
        date: '29 April',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
    
      {
        date: '30 April',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
    
    
      {
        date: '1 Mei',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
      {
        date: '2 Mei',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
      {
        date: '3 Mei',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
      {
        date: '4 Mei',
        image: '/balaikota.webp',
        headline: 'Headline 1',
        mainTime: '07:00 - 09:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Gala Dinner',
            time: '19:00 - 21:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Malam Apresiasi',
            time: '21:30 - 23:00',
            location: 'Convention Center',
            description: 'Acara penghargaan bagi para anggota',
            dresscode: 'Batiks',
          },
          {
            title: 'Pentas Budaya',
            time: '18:00 - 20:00',
            location: 'Teater Terbuka',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
  ];
  