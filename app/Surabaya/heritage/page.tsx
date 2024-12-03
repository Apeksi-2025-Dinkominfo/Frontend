'use client';
import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, Container } from '@mui/material';

interface TouristDestinationFile {
  link: string;
}

interface Destination {
  id: string;
  nameIndonesia: string;
  address: string;
  descriptionIndonesia: string;
  latitude: number;
  longitude: number;
  touristDestinationFiles: TouristDestinationFile[];
}

export default function HeritagePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hardcoded dummy data sesuai dengan permintaan bu novi
  const dummyData: Destination[] = [
    {
      id: 'dummy1',
      nameIndonesia: 'Surabaya Kota Lama',
      address: 'jalan kalimas barat, cendrawasih, merak, krembangan timur',
      descriptionIndonesia:
      'Kota Lama Surabaya adalah warisan sejarah dengan daya tarik arsitektur bangunan kolonial yang megah, jalan-jalan yang sarat sejarah, dan suasana nostalgik yang kental. Berpusat di jalan Rajawali gugusan bangunan cagar budaya dalam kawasan tersebut merekam sejarah panjang perkembangan Surabaya sebagai kota sejak abad ke-17. Kawasan Kota Lama Surabaya dibagi menjadi 4 zona; Zona Eropa, Zona Pecinan, Zona Arab, dan Zona Melayu.',
      latitude:-7.2359250783848985,
      longitude:  112.73749143639084,
      touristDestinationFiles: [{ link: '/kotalama.jpg' }],
    },
    {
      id: 'dummy2',
      nameIndonesia: 'Tunjungan Romansa',
      address: 'Jl.Tunjungan',
      descriptionIndonesia:
      'Daya tarik wisata kawasan Tunjungan sangat banyak, didominasi bangunan tua dan bangunan cagar budaya disepanjang Jalan Tunjungan. Memori bersejarah perobekan bendera Belanda menjadi bendera Merah Putih juga terjadi di salah satu hotel di jalan ini yang keberadaan hotelnya masih eksis hingga sekarang. Di tahun 1920-an Tunjungan terkenal ',
      latitude:-7.259247055643365,
      longitude: 112.73886940335856,
      touristDestinationFiles: [{ link: '/tunjungan.jpg' }],
    },
    {
      id: 'dummy3',
      nameIndonesia: 'Sumur Jobong',
      address: 'Jl. Pandean Gang I',
      descriptionIndonesia:
      'Kawasan Peneleh adalah kawasan delta yang menjadi tujuan pemukim atau munculnya sebuah peradaban. Dalam buku Asia Maior “Soerabaia 1900-1950”, diiilustrasikan kondisi alami di kawasan Bunguran (utara Peneleh), masih berupa tanah berair dan berawa-rawa. Bisa jadi, semakin ke utara seperti di kawasan Ampel, kondisi alamnya masih semak belukar dengan lahan yang berlumpur. Tanahnya belum sepadat dan sekeras jika dibandingkan dengan di kawasan selatan (kini kawasan kelurahan Peneleh). Di ujung selatan kawasan delta Kalimas  inilah peradaban kuno Surabaya yang mulai bergeliat, lebih awal jika dibandingkan dengan kawasan yang kelak bernama Surabaya (1275) lalu Ngampel (1420). Penemuan arkeologi sumur Jobong di kampung Pandean menjadi pembukti adanya peradaban di delta Kalimas ini.',
      latitude: -7.251703025960602,
      longitude: 112.74026197355091,
      touristDestinationFiles: [{ link: '/jobong.jpeg' }],
    },
    {
      id: 'dummy4',
      nameIndonesia: 'Kampung lawang seketeng',
      address: 'Jl. Lawang Seketeng Gg. 1, Peneleh, Kec. Genteng, Kota SBY',
      descriptionIndonesia:
        'Resmi dijadikan sebagai kampong wisata di tahun 2019 lalu, Kampung Lawang Seketeng adalah salah satu kampong tertua di Surabaya yang menyimpan berbagai sejarah. Terdapat Langgar Dukur Kayu yang dahulu tempat mengaji Presiden Soekarno saat masih kecil. Selain itu ada Terakota, Sumur Tua, Makam Mbah Pitono, Makam Mbah Dimo, Makam Syekh Zen Zaini Assegaf, Rumah Kayu, Rumah Jengki dan Rumah Puing yang menjadi pusat daya tarik wisata.',
      latitude: -7.2504745208817285,
      longitude:  112.74078626137934,
      touristDestinationFiles: [
        { link: '/sekoteng.jpg' },
      ],
    },
    {
      id: 'dummy5',
      nameIndonesia: 'Museum resolusi jihad',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy6',
      nameIndonesia: 'Pos Bloc Surabaya',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy7',
      nameIndonesia: 'Perkumpulan Hwie Tiauw Ka',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy8',
      nameIndonesia: 'Rumah Abu Keluarga Tjoa',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy9',
      nameIndonesia: 'Rumah Abu Keluarga The',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy10',
      nameIndonesia: 'Siropen',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy11',
      nameIndonesia: 'Panti Asuhan Don Bosco',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy12',
      nameIndonesia: 'Rumah Sakit Darmo',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy13',
      nameIndonesia: 'Perpustakaan Bank Indonesia',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
    {
      id: 'dummy14',
      nameIndonesia: 'Makam Sunan Bungkul',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Deskripsi dummy untuk museum yang berlokasi di Surabaya.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [
        { link: 'https://dummyimage.com/600x400/000/fff&text=Museum+Dummy' },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const allDestinations: Destination[] = [...dummyData]; // Start with dummy data
      for (let page = 1; page <= 10; page++) {
        const res = await fetch(
          `https://tourism.surabaya.go.id/api/kominfo/destination?page=${page}`
        );
        const result = await res.json();
        allDestinations.push(...(result.data?.data || []));
      }
      setDestinations(allDestinations);
    };
    fetchData();
  }, []);

  //data yang tidak termasuk heritage
  const excludedIds = [
    '9192cdb5-1a97-420a-9b24-0957ba842fb3',
    '91e8027f-1948-47e7-98f3-c55c1b143e8f',
    '7bab8aa8-e51f-4a00-9611-df9e2fe636a3',
    '9995f578-5f5d-4379-a104-f1ff1d988715',
    '5f29a051-4673-4fd7-bf7e-9f4508e958e5',
    '83a3b4ae-387a-4d29-90ff-9525df6c2c49',
    'e5291779-2864-4a01-9590-1b507ea7ed4f',
    'b02cfe95-a65a-4888-9c60-9875c1dd3d08',
    '8ff3eb3d-da1d-49f6-a259-379623f7bf7c',
    'f27745b6-5ba2-45e6-b79e-8c3b06689ccc',
    '9d9279ca-c57c-4c82-a9fe-58a045af594e'
  ];

  const filteredDestinations = destinations
    .filter(
      (destination) =>
        destination.touristDestinationFiles.length > 0 &&
        excludedIds.includes(destination.id)
    )
    .sort((a, b) => {
      // IDs to show at the beginning
      const firstIds = [
        '91e8027f-1948-47e7-98f3-c55c1b143e8f', 
        '9995f578-5f5d-4379-a104-f1ff1d988715',
        '9192cdb5-1a97-420a-9b24-0957ba842fb3',
      ];

      if (firstIds.includes(a.id)) return -1;
      if (firstIds.includes(b.id)) return 1;
      return 0;
    });

  const truncateDescription = (description: string) => {
    return description.length > 222
      ? description.slice(0, 222) + '...'
      : description;
  };

  const openLocationInMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const customLinks: { [key: string]: string } = {
    dummy1: 
      'https://tourism.surabaya.go.id/destination/60b51d0b-e5ae-4102-a3e4-fa781810a442',
    dummy2:
      'https://tourism.surabaya.go.id/destination/e5291779-2864-4a01-9590-1b507ea7ed4f',
    dummy3:
      'https://tourism.surabaya.go.id/destination/0982c216-942f-4ed6-beee-fd03c1b40ddf',
    dummy4:
      'https://tourism.surabaya.go.id/destination/08b55ee3-e7a6-4188-995b-9ce3911160c3',
    dummy5:
      'https://tourism.surabaya.go.id/destination/8b87356a-163d-4ada-a570-34d59eafe45b',
    dummy6:
      'https://tourism.surabaya.go.id/destination/2d9f955b-8026-4d4d-bbf4-ff2e4e2ac44f',
    dummy7:
      'https://tourism.surabaya.go.id/destination/89c0fe97-d625-4861-87da-11dfa4f4c0e3',
    dummy8:
      'https://tourism.surabaya.go.id/destination/c9085d7a-9a9e-424e-96cc-0d7de7ee7dbd',
    dummy9:
      'https://tourism.surabaya.go.id/destination/9df85020-5ab1-46e7-9bf2-7ef76c856ccd',
    dummy10:
      'https://tourism.surabaya.go.id/destination/51ea2cb1-8aeb-4a94-afd3-41434f0cfdbc',
    dummy11:
      'https://tourism.surabaya.go.id/destination/0edff9d2-b75e-420a-8dd4-d196e22fd236',
    dummy12:
      'https://tourism.surabaya.go.id/destination/76a5a601-ba12-4567-bda1-83d102e7875c',
    dummy13:
      'https://tourism.surabaya.go.id/destination/fd8f975b-1c7e-4687-a281-1895c8587a17',
    dummy14:
      'https://tourism.surabaya.go.id/destination/803c25fe-e528-4f87-9482-50ec9d02ec2f',
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        mb={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {filteredDestinations.length > 0 && (
          <>
            <img
              src={
                filteredDestinations[currentIndex].touristDestinationFiles[0]
                  .link
              }
              alt={filteredDestinations[currentIndex].nameIndonesia}
              style={{
                width: '100%',
                height: '500px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              position="absolute"
              left="20px"
              bottom="20px"
              width="auto"
            >
              <Button
                onClick={() =>
                  setCurrentIndex((prevIndex) =>
                    prevIndex === 0
                      ? filteredDestinations.length - 1
                      : prevIndex - 1
                  )
                }
                variant="outlined"
                style={{
                  borderRadius: '50%',
                  minWidth: '40px',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                  borderColor: 'white',
                  color: 'white',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: '0' }}>&lt;</span>
              </Button>
              <Button
                onClick={() =>
                  setCurrentIndex((prevIndex) =>
                    prevIndex === filteredDestinations.length - 1
                      ? 0
                      : prevIndex + 1
                  )
                }
                variant="outlined"
                style={{
                  borderRadius: '50%',
                  minWidth: '40px',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                  borderColor: 'white',
                  color: 'white',
                  marginLeft: '10px',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: '0' }}>&gt;</span>
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Grid container spacing={4}>
        {filteredDestinations.map((destination) => (
          <Grid item xs={12} sm={6} md={4} key={destination.id}>
            <div
              className="bg-[#add8e6] rounded-lg shadow-md p-4 flex flex-col justify-between h-full cursor-pointer"
              onClick={() =>
                customLinks[destination.id]
                  ? window.open(customLinks[destination.id], '_blank')
                  : openLocationInMaps(
                      destination.latitude,
                      destination.longitude
                    )
              }
            >
              {destination.touristDestinationFiles.length > 0 && (
                <img
                  src={destination.touristDestinationFiles[0].link}
                  alt={destination.nameIndonesia}
                  className="w-full h-56 object-cover rounded-t-lg"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div
                className="p-4"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {destination.nameIndonesia}
                  </h2>
                  <p className="text-sm italic font-medium">{destination.address}</p>
                  <p className="text-sm">
                    {truncateDescription(destination.descriptionIndonesia)}
                  </p>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    openLocationInMaps(
                      destination.latitude,
                      destination.longitude
                    );
                  }}
                  variant="contained"
                  style={{ marginTop: '10px', backgroundColor: '#008080' }}
                >
                  Buka di Google Maps
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
