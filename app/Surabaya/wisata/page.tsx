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
      nameIndonesia: 'Surabaya North Quay',
      address: 'Terminal Penumpang Gapura Surya Nusantara Lt. 3',
      descriptionIndonesia:
        'Berada di lantai 3 area pelabuhan Pelindo 3 Surabaya North Quay (SNQ) beroperasi sejak tahun 2016. SNQ menyuguhkan wisata bertema maritim. Keindahan sunset juga bisa dinikmati dari sini dengan suguhan pemandangan Selat Madura, Jembatan Suramadu, serta aktivitas lalu – lalang kapal di pelabuhan Tanjung Perak. Selain itu, pengunjung juga bisa berwisata kuliner, membeli oleh-oleh serta menikmati sunset di fasilitas Teras Tepi Laut dengan membayar Rp 50.000 untuk ditukar dengan voucher makanan / minuman.',
      latitude: -7.19709,
      longitude: 112.732303,
      touristDestinationFiles: [{ link: '/NorthQuay.jpg' }],
    },
    {
      id: 'dummy2',
      nameIndonesia: 'Ciputra Golf & Family Club',
      address: 'Jl. Citra Raya Utama',
      descriptionIndonesia:
        'Ciputra Golf & Family Club berlokasi di perumahan Ciputra dengan luas + 100 ha. Ciputra Golf & Family Club menyediakan tempat untuk bersantai dan melakukan olahraga dengan suasana nyaman. Olahraga',
      latitude: -7.292831,
      longitude: 112.634417,
      touristDestinationFiles: [{ link: '/golf.png' }],
    },
    {
      id: 'dummy3',
      nameIndonesia: 'Pos Bloc Surabaya',
      address: 'Dummy Address 2',
      descriptionIndonesia:
        'Gedung Kantor Pos Kebonrojo ini dibangun pada tahun 1926, dengan diarsiteki oleh G.P.J.M.Bolsius dari Departemen Burgerlijke Openbare Werken (BOV) Batavia. Sebelum menjadi kantor pos, gedung ini digunakan sebagai Kantor Kabupaten Surabaya sekitar tahun 1800 – 1881. Karena ini jugalah Jalan Kebonrojo dulu dikenal dengan nama Regenstraat. Dan Pada saat digunakan sebagai kantor bupati itu, gedung ini memiliki atap yang rata, tidak menjulang seperti sekarang. Setelah itu, gedung ini beralih fungsi lagi menjadi gedung HBS (Hogere Burgerschool) hingga tahun 1923, dan salah satu lulusannya yang terkenal adalah Soekarno (1915-1920). Selain Soekarno, beberapa tokoh lain yang juga bersekolah di sini adalah Hubertus Jan van Mook (1906-1913) dan Christian Eichholtz (1916-1923). HBS ini meru',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [{ link: '/posblock.jpg' }],
    },
    {
      id: 'dummy4',
      nameIndonesia: 'Pura Agung Jagat Karana',
      address: 'Jl. Ikan Lumba-lumba No. 1',
      descriptionIndonesia:
        'Pura Agung Jagat Karana dibangun pada tahun 1968, dan difungsikan sejak 29 November 1969. Peresmian pura ini pertama kali bertepatan dengan hari Saraswati. Luas areanya 7.703 meter persegi dengan suasana khas Pura Hindu yang sangat kental, tenang dan asri. Ditahun 1987 , Pura ini mengalami pemugaran yang selanjutnya pada tanggal 20 September 1987 diresmikan oleh Gubernur KDH Tingkat I Jawa Timur Bpk. Wahono. Dan digunakan kembali sejak tanggal 26 Sepetember 1987 hingga saat ini. Pura Agung Jagad Karana menjadi salah satu pilihan destinasi wisata unggulan di Surabaya Utara.',
      latitude: -7.2313026,
      longitude: 112.7216732,
      touristDestinationFiles: [{ link: '/puraAgung.jpg' }],
    },
    {
      id: 'dummy5',
      nameIndonesia: 'Masjid Nasional Al Akbar',
      address: 'Jl. Masjid Agung Timur No.1',
      descriptionIndonesia:
        'Masjid Al – Akbar merupakan masjid terbesar kedua di Indonesia setelah masjid Istiqlal yang ada di Jakarta. Berada di selatan kota Surabaya, masjid Al – Akbar menjadi daya tarik bagi wisatawan yang berkunjung ke Surabaya. Masjid berkapasitas 30000 jamaah ini diresmikan pada tanggal 10 Nopember 2000. Masjid Al - Akbar memiliki kubah utama yang berbentuk menyerupai setengah telur dan 4 kubah kecil berbentuk limas. Desain kaligrafi serta ukiran didalam masjid menghiasi seluruh bagian masjid yang memiliki 45 buah pintu yang melambangkan tahun kemerdekaan Indoensia yaitu 1945. Selain itu, MAS juga memiliki fasilitas penunjang lainnya seperti Taman Asmaul Husna berdesain futuristik namun tetap mengusung nilai-nilai religius dengan adanya pilar berbentuk piramida dan bertuliskan asmaul husna, yaitu 99 nama baik Allah. Selain itu ada juga Urban Farming, Edu Park dan menara masjid yang dibuka untuk umum.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [{ link: '/MasjidAgung.jpg' }],
    },
    {
      id: 'dummy6',
      nameIndonesia: 'Masjid Agung Sunan Ampel',
      address: 'Jl. Ampel Masjid no.53',
      descriptionIndonesia:
        'Daya Tarik wisata religi Masjid dan Makam Sunan Ampel adalah tempat peziarahan. Masjid Ampel ini dibangun untuk menghormati Sunan Ampel sebagai salah seorang wali penyebar Agama Islam di Pulau Jawa. Beliau adalah putra Ali Rachmatullah, kemudian menjadi Raden Rachmat yang akhirnya disebut sebagai Sunan Ampel. Beliau wafat pada tahun 1481 dan dimakamkan di sebelah kanan Masjid Ampel. Masjid Ampel banyak dikunjungi sebagai destinasi wisata religi bagi wisatawan muslim pada umumnya dari dalam maupun luar negeri. Bentuk bangunannya juga masih terjaga hingga kini.',
      latitude: -7.257472,
      longitude: 112.752088,
      touristDestinationFiles: [{ link: '/ampel.jpg' }],
    },
    {
      id: 'dummy7',
      nameIndonesia: 'Gedung Nasional Indonesia (GNI) & Museum Dr. Soetomo',
      address: 'JL Bubutan no 85 - 87',
      descriptionIndonesia:
        'Gedung ini ditetapkan sebagai bangunan cagar budaya sejak tahun 1996 dan sejak tahun 2017 di GNI terdapat Museum Dr. Soetomo yang diresmikan oleh Walikota Tri Risma Harini pada November 2017. Merupakan museum khusus yang menampilkan riwayat hidup Dr. Soetomo, tokoh pergerakan sekaligus salah satu pendiri organisasi Boedi Oetomo. Museum ini bertempat di kompleks Pendopo Gedung Nasional Indonesia (GNI) . Museum Dr. Soetomo menyimpan 314 koleksi berupa alat-alat kesehatan dan foto-foto.',
      latitude: -7.2508131,
      longitude: 112.7354375,
      touristDestinationFiles: [{ link: '/soetomo.jpg' }],
    },
    {
      id: 'dummy8',
      nameIndonesia: 'Museum WR Soepratman',
      address: 'Jl. Mangga no.21',
      descriptionIndonesia:
        'Museum W.R Soepratman diresmikan pada tanggal 10 November 2018 oleh Walikota Surabaya Ir. Tri Rismaharini. Museum ini menempati rumah wafat Wage Rudolf Soepratman di Jalan Mangga no 21 Surabaya. Rumah ini menjadi saksi akhir perjuangan sang komposer yang meskipun kondisi sakit tetap berjuang demi kemerdekaan Indonesia dengan caranya sendiri melalui biola. Pencipta lagu Indonesia Raya ini pernah bertempat tinggal di rumah yang dibangun pada abad ke-XX ini bersama Ny. Rokijem (saudari W. R. Soepratman) beserta keluarga. Jumlah koleksi yang terdapat di Museum W.R Soepratman saat ini sebanyak 39 koleksi. Diantaranya terdapat replika pakaian W.R Soepratman, replika biola W.R Soepratman, zona memorabilia, serta zona penghargaan pemerintah Indonesia kepada W.R Soepratman. Pengunjung dapat mempelajari sejarah sosok pahlawan bangsa W.R Soepratman dengan melihat koleksi-koleksi berupa replika dan foto-foto yang didukung dengan zona memorabilia.. Ruang tamu terpampang foto-foto WR. Soepratman dengan teman dan keluarga.',
      latitude: -7.2506354,
      longitude: 112.7537695,
      touristDestinationFiles: [{ link: '/wr.jpg' }],
    },
    {
      id: 'dummy9',
      nameIndonesia: 'Museum Surabaya',
      address: 'Jl.Tunjungan no.1-3, Genteng, Surabaya (Gedung Siola lt.1)',
      descriptionIndonesia:
        'Mari membaca kota ini lebih dekat. Layaknya nasib kota-kota tersohor dunia, Surabaya kerap dibaca melalui lensa dan statistik bombastis; pelabuhan tersibuk, kota pahlawan, hingga terbitnya guru dan pendiri bangsa. Di antara epos dan kejayaan masa lalu Surabaya yang megah, semoga anda bisa menemukan pembacaan dan kisah kemanusiaan yang lekat di hati. Melalui fragmen kehidupan yang dilakoni penduduk Surabaya hingga ke sudut kampung yang ngeye/ meski dikepung gedung menjulang. Museum ini berisi narasi monumental dan figur historis yang membentuk identitas Surabaya yang kita kenal. Namun kisah kota ini tidak harus mandeg di sana. Seperti manusia yang meninggalinya, kota adalah organisme yang hidup dan bertumbuh. Periuk lebur dari keanekaragaman kisah. Buku berjudul Surabaya adalah antologi cerita yang tak pernah selesai. Kita membaca masa lalu Surabaya sebagai modal menuliskan masa depannya. Satu-satunya cara mempertahankan kebudayaan adalah dengan terus menciptakannya. Selamat membaca Surabaya.',
      latitude: -7.2561991,
      longitude: 112.7378506,
      touristDestinationFiles: [{ link: '/msmsby.jpg' }],
    },
    {
      id: 'dummy10',
      nameIndonesia: 'Siropen (pabrik limun dan sirup telasih)',
      address: 'jalan melilwis 5',
      descriptionIndonesia:
        'Pabrik Sirup Siropen yang juga terkenal dengan nama Perusahaan Sirup Telasih berada di kawasan Kota Tua Surabaya.\n Ini merupakan pabrik sirup pertama di Indonesia yang ada sejak tahun 1923 dengan arsitektur bangunan bergaya Indische Empire Style. Pabrik ini Bernama pabrik limun dan sirup “telasih” J.C. Van Drongelen & \n Hellfach. Dalam perjalanannya sempat beberapa kali berpindah tangan. Pada zaman penjajahan Jepang (tahun 1942) pabrik diambil alih oleh Jepang. Namun setelah penjajahan Jepang usai, pabrik kembali dikuasai oleh Belanda yang hingga tahun 1958 ada program Nasionalisasi yang mengharuskan semua perusahaan Belanda diambil alih oleh Pemerintah Indonesia. Zaman dulu mayoritas sirup memiliki warna dasar merah. Dan uniknya orang Surabaya pada masa itu tidak menyebutnya sirup tapi menggunakan kata strup, jadi jika orang Surabaya ingin membeli sirup mereka mengucapkan ingin membeli strup. Siropen memiliki ciri khas rasa yang unik dengan berbagai pilihan varian rasa dan menggunakan gula asli sebagai rasa manisnya. Dimasa kolonial belanda dahulu, sirup ini tidak bisa diminum dan diperjual belikan secara bebas',
      latitude: -7.2373207,
      longitude: 112.737195,
      touristDestinationFiles: [{ link: '/siropen.jpg' }],
    },
    {
      id: 'dummy11',
      nameIndonesia: 'Balai Pemuda dan Alun-alun Surabaya',
      address: 'Jl. Gubernur Suryo no.15',
      descriptionIndonesia:
        'Balai Pemuda was built in 1907 and called as Simpangsche Societeit or Simpangsche Club as a nightlife facility for European elites (especially Dutch citizens) living in Surabaya. At that time the natives had difficulty pronouncing the name of this building so local residents named it Roemah Kamar Bola because there was a bilyard game. Simpangsche Societeit was built by an architect from the Netherlands named Westmaes. The building which is now one of Surabaya cultural heritage is designed in such a way by taking into account the climate of Surabaya. The dome resembling a crown is a landmark of this Youth Hall Building. Now, Balai Pemuda as a center of art and cultural activities equipped with public facilities and a large open area. The newest facility in Balai Pemuda is Alun-alun Surabaya which consists of a basement area and an outdoor area. One of the highlights in the basement area is an exhibition area and skate boarding rink that can be used by public. Currently, Alun-alun Surabaya is also equipped with food court facilities..',
      latitude: -7.2638645,
      longitude: 112.7453065,
      touristDestinationFiles: [{ link: '/Alunalun.jpg' }],
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
    'dummy1',
    'dummy2',
    'dummy3',
    'dummy4',
    'dummy5',
    'dummy6',
    'dummy7',
    'dummy8',
    'dummy9',
    'dummy10',
    'dummy11',
    '9d27647f-7c93-4f5c-a03b-2c3466016141',
    '60b51d0b-e5ae-4102-a3e4-fa781810a442',
    '9192cdb5-1a97-420a-9b24-0957ba842fb3',
    '91e8027f-1948-47e7-98f3-c55c1b143e8f',
    '7bab8aa8-e51f-4a00-9611-df9e2fe636a3',
    '9995f578-5f5d-4379-a104-f1ff1d988715',
    '5f29a051-4673-4fd7-bf7e-9f4508e958e5',
    '83a3b4ae-387a-4d29-90ff-9525df6c2c49',
    'e5291779-2864-4a01-9590-1b507ea7ed4f',
    'b02cfe95-a65a-4888-9c60-9875c1dd3d08',
    'f27745b6-5ba2-45e6-b79e-8c3b06689ccc',
    '9d9279ca-c57c-4c82-a9fe-58a045af594e',
    '757b4340-3dba-4998-85ef-090d59da0f8f',
    '9d9271fb-904a-47cc-9a86-9bd561c08f2d',
    '45283518-ba9f-4a67-96b0-be18e025fc91',
    'ad6d4867-465a-4162-9ccd-b35dcd83c565',
    'a842bc76-25ab-4579-983a-1cc004962f9c',
    'e08de0cc-fa46-41d2-b38b-b67db4daa87a',
    '162c38b1-5cf7-46d0-a39b-b08b22e1ad3b',
    '9996d65c-53d6-4d6b-9c77-3498c3fc528f',
    '',
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
      'https://tourism.surabaya.go.id/destination/ebb04e66-8ad6-49ba-b1b6-fc82875e76ec',
    dummy2:
      'https://tourism.surabaya.go.id/destination/7d44608b-23fb-4fa3-b355-a0171bf7c759',
    dummy3:
      'https://tourism.surabaya.go.id/destination/2d9f955b-8026-4d4d-bbf4-ff2e4e2ac44f',
    dummy4:
      'https://tourism.surabaya.go.id/destination/757b4340-3dba-4998-85ef-090d59da0f8f',
    dummy5:
      'https://tourism.surabaya.go.id/destination/ad3f9432-68aa-4b1b-b653-0f8ff6f9705f',
    dummy6:
      'https://tourism.surabaya.go.id/destination/207f3ae2-ffe2-4036-8d5d-3b508dd560cd',
    dummy7:
      'https://tourism.surabaya.go.id/destination/8c69668a-108a-4407-aa4f-420f28f6ee87',
    dummy8:
      'https://tourism.surabaya.go.id/destination/c05e1e03-2d3f-4f6e-a1a4-6a1e1abf5770',
    dummy9:
      'https://tourism.surabaya.go.id/destination/293bc1b1-f24c-4ee3-ab2f-78f8cdc10125',
    dummy10:
      'https://tourism.surabaya.go.id/destination/51ea2cb1-8aeb-4a94-afd3-41434f0cfdbc',
    dummy11:
      'https://tourism.surabaya.go.id/destination/56d2e7fe-0061-4f14-b276-763dd12659d8',
    '9995f578-5f5d-4379-a104-f1ff1d988715':
      'https://tourism.surabaya.go.id/destination/9995f578-5f5d-4379-a104-f1ff1d988715',
    '91e8027f-1948-47e7-98f3-c55c1b143e8f':
      'https://tourism.surabaya.go.id/destination/91e8027f-1948-47e7-98f3-c55c1b143e8f',
    '9192cdb5-1a97-420a-9b24-0957ba842fb3':
      'https://tourism.surabaya.go.id/destination/9192cdb5-1a97-420a-9b24-0957ba842fb3',
    '7bab8aa8-e51f-4a00-9611-df9e2fe636a3':
      'https://tourism.surabaya.go.id/destination/7bab8aa8-e51f-4a00-9611-df9e2fe636a3',
    '9d27647f-7c93-4f5c-a03b-2c3466016141':
      'https://tourism.surabaya.go.id/destination/9d27647f-7c93-4f5c-a03b-2c3466016141',
    '9d9271fb-904a-47cc-9a86-9bd561c08f2d':
      'https://tourism.surabaya.go.id/destination/9d9271fb-904a-47cc-9a86-9bd561c08f2d',
    '9d9279ca-c57c-4c82-a9fe-58a045af594e':
      'https://tourism.surabaya.go.id/destination/9d9279ca-c57c-4c82-a9fe-58a045af594e',
    '45283518-ba9f-4a67-96b0-be18e025fc91':
      'https://tourism.surabaya.go.id/destination/45283518-ba9f-4a67-96b0-be18e025fc91',
    '83a3b4ae-387a-4d29-90ff-9525df6c2c49':
      'https://tourism.surabaya.go.id/destination/83a3b4ae-387a-4d29-90ff-9525df6c2c49',
    '5f29a051-4673-4fd7-bf7e-9f4508e958e5':
      'https://tourism.surabaya.go.id/destination/5f29a051-4673-4fd7-bf7e-9f4508e958e5',
    '60b51d0b-e5ae-4102-a3e4-fa781810a442':
      'https://tourism.surabaya.go.id/destination/60b51d0b-e5ae-4102-a3e4-fa781810a442',
    'f27745b6-5ba2-45e6-b79e-8c3b06689ccc':
      'https://tourism.surabaya.go.id/destination/f27745b6-5ba2-45e6-b79e-8c3b06689ccc',
    '9996d65c-53d6-4d6b-9c77-3498c3fc528f':
      'https://tourism.surabaya.go.id/destination/9996d65c-53d6-4d6b-9c77-3498c3fc528f',
    'a842bc76-25ab-4579-983a-1cc004962f9c':
      'https://tourism.surabaya.go.id/destination/a842bc76-25ab-4579-983a-1cc004962f9c',
    'e5291779-2864-4a01-9590-1b507ea7ed4f':
      'https://tourism.surabaya.go.id/destination/e5291779-2864-4a01-9590-1b507ea7ed4f',
    'ad6d4867-465a-4162-9ccd-b35dcd83c565':
      'https://tourism.surabaya.go.id/destination/ad6d4867-465a-4162-9ccd-b35dcd83c565',
    'b02cfe95-a65a-4888-9c60-9875c1dd3d08':
      'https://tourism.surabaya.go.id/destination/b02cfe95-a65a-4888-9c60-9875c1dd3d08',
    '162c38b1-5cf7-46d0-a39b-b08b22e1ad3b':
      'https://tourism.surabaya.go.id/destination/162c38b1-5cf7-46d0-a39b-b08b22e1ad3b',
    'e08de0cc-fa46-41d2-b38b-b67db4daa87a':
      'https://tourism.surabaya.go.id/destination/e08de0cc-fa46-41d2-b38b-b67db4daa87a',
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
                <span style={{ fontSize: '20px', lineHeight: '0',fontFamily: "Plus Jakarta Sans" }}>&lt;</span>
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
                  <h2 className="text-[#023E74] text-lg font-semibold">
                    {destination.nameIndonesia}
                  </h2>
                  <p className=" text-[#023E74] italic font-medium">
                    {destination.address}
                  </p>
                  <p style=
                  {{ 
                    fontFamily: "Plus Jakarta Sans",
                    color:"#023E74",
                  }}
                 >
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
                  style={{fontFamily: 'Plus Jakarta Sans', marginTop: '10px', backgroundColor: '#008080',  }}
                >
                  Kunjungi Lokasi
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
