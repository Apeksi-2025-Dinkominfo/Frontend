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
  day:string;
  headline: string;
  mainTime: string;
  description: string;
  location: string;
  acara: Acara[];
}

export const events: Event[] = [
  {
      date: '4 Mei',
      day:'Minggu',
      image: '/balaikota.webp',
      headline: 'Hari Pertama',
      mainTime: '06.00 - 21.00 WIB',
      description: 'Kedatangan Peserta Youth City Changers',
      location: 'Exibition Grand City Lantai 1',
      acara: [
        {
          title: 'Kedatangan Peserta Youth City Changers',
          time: '06.00 - 21.00 WIB',
          location: 'Exibition Grand City Lantai 1',
          description: 'Menyambut Kedatangan Peserta Youth City Changers',
          dresscode: 'Tidak Diketahui',
        },
      ],
    },
  
    {
      date: '5 Mei',
      day:'Senin',
      image: '/balaikota.webp',
      headline: 'Hari Ke Dua',
      mainTime: '08.00 - SELESAI',
      description: 'Please add your content here. Keep it short and simple.',
      location: 'Exhibition Grand City Lantai 1',
          
      acara: [
        {
          title: 'Loading Pameran Indonesia City expo',
          time: '08:00 WIB - SELESAI',
          location: 'Exhibition Grand City Lantai 1 && Open Space Grandcity',
          description: 'Mendapatkan Kaos, Medali dan goody Bag, Loading UMKM ( Makanan, minuman, pakaian, dll)',
          dresscode: 'Baju Bebas',
        },
        {
          title: 'Youth Changers',
          time: '18:00 - 12:00',
          location: 'Taman Suroboyo, Taman Harmoni (sisi bangunan kementrian PUPR)',
          description: 'Pembukaan Youth City Changers',
          dresscode: 'Casual',
        },
        {
          title: 'ISHOMA',
          time: '12:00 - 13:00',
          location: 'Terserah',
          description: 'Istirahat Sholat Makan',
          dresscode: 'Terserah',
        },
        {
          title: 'Youth City Changer',
          time: '13:00 WIB - SELESAI',
          location: 'Kodikal AAL Graha Samudra Bumi Moro, Perak',
          description: 'Pertunjukan seni budaya tradisional',
          dresscode: 'Casual',
        },
    
      ],
    },

    {
      date: '6 Mei',
      day:'Selasa',
      image: '/balaikota.webp',
      headline: 'Hari Ke Tiga',
      mainTime: '08.00 - SELESAI',
      description: 'Please add your content here. Keep it short and simple.',
      location: 'Exhibition Grand City Lantai 1',
          
      acara: [
        {
          title: 'Youth City Changers',
          time: '08:00 - 12:00 WIB',
          location: 'Kodikal AAL Graha Samudra Bumi Moro, Perak',
          description: '',
          dresscode: '',
        },
        {
          title: 'ISHOMA',
          time: '12:00 - 13:00 WIB',
          location: 'Terserah',
          description: 'Istirahat Sholat Makan',
          dresscode: 'Terserah',
        },
        {
          title: 'Youth City Changer',
          time: '13:00 WIB - SELESAI',
          location: 'Kodikal AAL Graha Samudra Bumi Moro, Perak',
          description: '',
          dresscode: '',
        },
        {
          title: 'Gala Dinner Peserta Muna APEKSI / Wali Kota',
          time: '18:00 WIB - SELESAI',
          location: 'Halaman Taman Surya',
          description: '',
          dresscode: '',
        },
    
      ],
    },

    {
      date: '7 Mei',
      day:'Rabu',
      image: '/balaikota.webp',
      headline: 'Hari Ke Empat',
      mainTime: '08.00 - SELESAI',
      description: 'Please add your content here. Keep it short and simple.',
      location: 'Exhibition Grand City Lantai 1',
          
      acara: [
        {
          title: 'Pembukaan Munas Apeksi',
          time: '08:00 - 12:00 WIB',
          location: '(Ballroom Grand City Lantai 4 / Convention Hall Lantai 3',
          description: '',
          dresscode: '',
        },
        {
          title: 'ISHOMA',
          time: '12:00 - 13:00 WIB',
          location: 'Terserah',
          description: 'Istirahat Sholat Makan',
          dresscode: 'Terserah',
        },
        {
          title: 'Pembukaan Indonesia City Expo',
          time: '13:00 - 15:00 WIB',
          location: 'Kodikal AAL Graha Samudra Bumi Moro, Perak',
          description: '',
          dresscode: '',
        },
        {
          title: 'Karnaval Budaya',
          time: '18:00 WIB - SELESAI',
          location: 'Depan Siola, Jl. Tunjungan',
          description: '',
          dresscode: '',
        },
    
      ],
    },

    {
      date: '8 Mei',
      day:'Kamis',
      image: '/balaikota.webp',
      headline: 'Hari Ke Lima',
      mainTime: '08.00 - SELESAI',
      description: 'Please add your content here. Keep it short and simple.',
      location: 'Exhibition Grand City Lantai 1',
          
      acara: [
        {
          title: 'Fun Run',
          time: '06:00 - 07:00 WIB',
          location: '1. Taman Suroboyo atau 2. Taman Harmoni (sisi bangunan kementerian PUPR)',
          description: '',
          dresscode: '',
        },
        {
          title: 'Tanam Pohon',
          time: '07:00 - 07:30 WIB',
          location: '1. Taman Suroboyo atau 2. Taman Harmoni (sisi bangunan kementerian PUPR)',
          description: '',
          dresscode: '',
        },
        {
          title: 'Sarapan Pagi Bersama',
          time: '07:30 - 09:00 WIB',
          location: '1. Taman Suroboyo atau 2. Taman Harmoni (sisi bangunan kementerian PUPR)',
          description: '',
          dresscode: '',
        },
        {
          title: 'Sidang Pleno Munas APEKSI',
          time: '11:00 - 16:00 WIB',
          location: 'Ballroom Grand City Lantai 4 / Convention Hall Lantai 3',
          description: '',
          dresscode: '',
        },
        {
          title: 'Side Event',
          time: '09:00 WIB - SELESAI',
          location: 'TIK (Dinas Komunikasi dan Informatika Lingkungan (Dinas Lingkungan Hidup) (Meeting Room tipe Diamond (100 orang)dan Crystal (75 orang)',
          description: '',
          dresscode: '',
        },
        {
          title: 'City Tour',
          time: '16:00 WIB - SELESAI',
          location: 'Balai Kota',
          description: 'Optional, diperuntukkan bagi Wali Kota atau peserta pendamping Wali Kota',
          dresscode: '',
        },
        {
          title: 'Pentas Seni',
          time: '18:00 WIB - SELESAI',
          location: 'Parkiran Exhibition Grand City',
          description: '(Optional, apabila peserta pentas seni banyak, dapat di mulai pukul 16.00 WIB -  selesai) Diikuti oleh delegasi',
          dresscode: '',
        },
          
      ],
    },
  
    {
      date: '9 Mei',
      day:'Jumat',
      image: '/balaikota.webp',
      headline: 'Hari Ke Enam',
      mainTime: '09.00 WIB - SELESAI',
      description: 'Penutupan Indonesia Cit Expo',
      location: 'Exibition Grand City Lantai 1',
      acara: [
        {
          title: 'Penutupan Indonesia Cit Expo',
          time: '09.00 WIB - SELESAI',
          location: 'Exibition Grand City Lantai 1',
          description: 'Penghargaan untuk Stand terbaik dan Pentas seni terbaik',
          dresscode: 'Tidak Diketahui',
        },
      ],
    },

    {
      date: '10 Mei',
      day:'Sabtu',
      image: '/balaikota.webp',
      headline: 'Hari Ke Tujuh',
      mainTime: '06.00 - 21:00 WIB',
      description: 'Kepulangan Peserta',
      location: 'Rumah Masing Masing',
      acara: [
        {
          title: 'Kepulangan Peserta',
          time: '09.00 WIB - SELESAI',
          location: 'Rumah Masing Masing',
          description: 'Pulang Membawa Kenangan Bahagia dan Manis',
          dresscode: 'Terserah',
        },
      ],
    },
    
  
   
];


      // {
      //   date: '3 Mei',
      //   image: '/balaikota.webp',
      //   headline: 'Headline 1',
      //   mainTime: '07:00 - 09:00',
      //   description: 'Please add your content here. Keep it short and simple.',
      //   location: 'Balai Kota',
      //   acara: [
      //     {
      //       title: 'Gala Dinner',
      //       time: '19:00 - 21:00',
      //       location: 'Grand Ballroom',
      //       description: 'Makan malam mewah dengan tamu kehormatan',
      //       dresscode: 'Formal',
      //     },
      //   ],
      // },
    
      // {
      //   date: '4 Mei',
      //   image: '/balaikota.webp',
      //   headline: 'Headline 1',
      //   mainTime: '07:00 - 09:00',
      //   description: 'Please add your content here. Keep it short and simple.',
      //   location: 'Balai Kota',
      //   acara: [
      //     {
      //       title: 'Gala Dinner',
      //       time: '19:00 - 21:00',
      //       location: 'Grand Ballroom',
      //       description: 'Makan malam mewah dengan tamu kehormatan',
      //       dresscode: 'Formal',
      //     },
      //     {
      //       title: 'Malam Apresiasi',
      //       time: '21:30 - 23:00',
      //       location: 'Convention Center',
      //       description: 'Acara penghargaan bagi para anggota',
      //       dresscode: 'Batiks',
      //     },
      //     {
      //       title: 'Pentas Budaya',
      //       time: '18:00 - 20:00',
      //       location: 'Teater Terbuka',
      //       description: 'Pertunjukan seni budaya tradisional',
      //       dresscode: 'Casual',
      //     }
      //   ],
      // },
  