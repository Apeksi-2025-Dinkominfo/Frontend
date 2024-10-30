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
        headline: 'Hari Pertam',
        mainTime: '19:00 - Selesai',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Exibition Grand City Lantai 1',
        acara: [
          {
            title: 'Loading Pameran  City Expo',
            time: '19:00 - Selesai',
            location: 'Exibition Grand City Lantai 1',
            description: 'MIndonesia City Expo berlangsung mulai tanggal 28 April - 3 Mei 2025',
            dresscode: 'Formal',
          },
        ],
      },
    
      {
        date: '27 April',
        image: '/balaikota.webp',
        headline: 'Hari Ke Dua',
        mainTime: '06:00 - 19:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Taman Suroboyo, Taman Harmoni (sisi bangunan kementrian PUPR)',
            
        acara: [
          {
            title: 'Fun Run',
            time: '06:00 - 07:00',
            location: 'Taman Suroboyo, Taman Harmoni (sisi bangunan kementrian PUPR)',
            description: 'Mendapatkan Kaos, Medali dan goody Bag',
            dresscode: 'Baju Bebas',
          },
          {
            title: 'Tanam Pohon',
            time: '07:00 - 07:30',
            location: 'Taman Suroboyo, Taman Harmoni (sisi bangunan kementrian PUPR)',
            description: 'Penanaman Pohon',
            dresscode: 'Baju Bebas Rapi',
          },
          {
            title: 'Sarapan Pagi Bersama',
            time: '18:00 - 20:00',
            location: 'Taman Suroboyo, Taman Harmoni (sisi bangunan kementrian PUPR)',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          },
          {
            title: 'Acara Bebas',
            time: '07:00 - 09:00',
            location: 'Hotel Masing Masing',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          },
          {
            title: 'Persiapan Gala Diner',
            time: '17:00 - 18:00',
            location: 'Hotel Masing Masing',
            description: 'Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          },
          {
            title: 'Gala Dinner',
            time: '18:00 - Selesai',
            location: 'Halaman Taman Surabaya',
            description: 'Makan Malam bersama',
            dresscode: 'Casual',
          },
          
          
        ],
      },
    
    
      {
        date: '28 April',
        image: '/balaikota.webp',
        headline: 'Hari Ke Tiga',
        mainTime: '08:00 - 15:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Pembukaan MUNAS APEKSI',
            time: '08:00 - 12:00',
            location: 'Grand Ballroom',
            description: 'Makan malam mewah dengan tamu kehormatan',
            dresscode: 'Formal',
          },
          {
            title: 'Ishoma',
            time: ':12:00 - 13:00',
            location: '',
            description: 'Istirahat, Sholat, Makan',
            dresscode: '',
          },
          {
            title: 'Pembukaan Indonesia City Expo',
            time: '13:00 - 15:00',
            location: 'Exihibition Grand City Lantai 1',
            description: '',
            dresscode: 'Formal',
          },
          {
            title: 'Sidang MUNAS APEKSI',
            time: '15:00 - selesai',
            location: 'Ballroom Grand City Lantai 4',
            description: 'Melanjutkan sidang MUNAS APEKSI',
            dresscode: 'Formal',
          },
          {
            title: 'City Tour',
            time: '15:00 - selesai',
            location: 'To Be Announced',
            description: 'Berkeliling Kota Surabaya, opsional atau diperuntukkan bagi peserta pendamping Walikota',
            dresscode: 'Casual',
          },
        ],
      },
    
    
      {
        date: '29 April',
        image: '/balaikota.webp',
        headline: 'Hari Ke Empat',
        mainTime: '08:00 - 18:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Sidang Pleno MUNAS APEKSI',
            time: '08:00 - 12:00',
            location: 'Ballroom Grand City Lantai 4',
            description: '',
            dresscode: 'Formal',
          },
          {
            title: 'Ishoma',
            time: ':12:00 - 13:00',
            location: '',
            description: 'Istirahat, Sholat, Makan',
            dresscode: '',
          },
          {
            title: 'Sidang Pleno MUNAS APEKSI',
            time: '12:00 - 13:00',
            location: 'Ballroom Grand City Lantai 4',
            description: '',
            dresscode: 'Formal',
          },
          {
            title: 'Karnaval Budaya',
            time: '18:00 - selesai',
            location: 'Depan SIola, Jalan Tunjungan',
            description: 'Karnaval Pertunjukan seni budaya tradisional',
            dresscode: 'Casual',
          }
        ],
      },
    
    
      {
        date: '30 April',
        image: '/balaikota.webp',
        headline: 'Hari Ke Lima',
        mainTime: '08:00 - selesai',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Side Event',
            time: '08:00 - selesai',
            location: 'To Be Announced',
            description: 'Side Event TIK (Dinas Komunikasi dan Informatika) dan Lingkungan (Dinas Lingkungan Hidup) dengan mengundang masing-masing Kepala OPD dari 98 Kota. Kegiatan ini tidak harus dihadiri oleh Walikota',
            dresscode: 'Formal',
          },
          {
            title: 'Pentas Seni',
            time: '09:00 - selesai',
            location: 'Parkiran Exhibition Grand City',
            description: 'Pentas seni dari peserta APEKSI. Kegiatan ini tidak harus dihadiri oleh Walikota',
            dresscode: 'Batiks',
          }
        ],
      },
    
    
    
      {
        date: '2-3 Mei',
        image: '/balaikota.webp',
        headline: 'Hari ke Enam dan Tujuh',
        mainTime: '08:00 - 21:00',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Youth City Changer',
            time: '08:00 - 21:00',
            location: 'Kodikal AAL Graha Samudra Bumi Moro, Perak',
            description: '',
            dresscode: '',
          }
        ],
      },
    
      {
        date: '3 Mei',
        image: '/balaikota.webp',
        headline: 'Hari Ke Tujuh',
        mainTime: '09:00 - selesai',
        description: 'Please add your content here. Keep it short and simple.',
        location: 'Balai Kota',
        acara: [
          {
            title: 'Penutupan Indonesia City Expo',
            time: '09:00 - seelsai',
            location: 'Exhibition Grand City Lantai 1',
            description: 'Pengumuman pemenang: 1. Stand Terbaik; 2. Pentas Seni',
            dresscode: 'Formal',
          },
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
  