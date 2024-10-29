"use client";

import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';

const budayaData = [
  {
    imageSrc: '/Remo.jpg',
    title: 'Tari Remo',
    description: 'Secara historis, tarian remo adalah tarian yang khusus dipentaskan oleh penari pria. Hal ini terkait dengan lakon yang dipentaskan dalam tarian ini, karena membawa tema perjuangan. Berdasarkan perkembangan historis tarian Remo, dulunya merupakan tarian yang dipentaskan sebagai pembuka dalam pertunjukan seni Ludruk. Namun seiring waktu, tarian remo mulai bergeser menjadi tarian penyambutan untuk tamu dan acara hiburan lainnya. Selain itu, tarian remo juga sering dipentaskan dalam festival seni daerah sebagai upaya untuk melestarikan budaya Jawa Timur. Sekarang, tarian remo tidak hanya dipentaskan oleh penari pria, tetapi juga oleh penari wanita.',
  },
  {
    imageSrc: '/Ludruk.jpg',
    title: 'Ludruk',
    description: 'Teater tradisional yang dipentaskan oleh sekelompok seniman dengan cerita kehidupan sehari-hari, sejarah, dan dongeng. Karakteristik Ludruk selalu menggunakan dialek lokal (Suroboyoan) dalam dialognya, disertai dengan musik gamelan, tarian remo, parikan, kidungan, dan juga hiburan lawak yang sangat menghibur.',
  },
  {
    imageSrc: '/ogoh-ogoh.jpg',
    title: 'Pawai Ogoh-Ogoh',
    description: 'Sehari sebelum Nyepi, ritual "Buta Yadnya" dilaksanakan. "Buta Yadnya" adalah serangkaian upacara untuk mengusir kehadiran "Buta Kala" yang merupakan manifestasi dari unsur-unsur negatif dalam kehidupan manusia. Dalam rangkaian "Buta Yadnya", terdapat tradisi parade ogoh-ogoh, yang merupakan festival tahunan yang meriah dan telah menjadi daya tarik wisata. Ogoh-ogoh adalah boneka atau patung dari berbagai macam yang melambangkan unsur-unsur negatif, sifat buruk, dan kejahatan yang mengelilingi kehidupan manusia. Boneka ini terbuat dari rangka bambu yang dilapisi dengan kertas.',
  },
  {
    imageSrc: '/reog.jpg',
    title: 'Reog',
    description: 'Reog adalah jenis tarian tradisional yang menggambarkan cerita rakyat. Ini menggambarkan pertemuan antara Raja Kelono Suwandoni dari kerajaan Bantar Anggun dan Raja Singo Barong dari kerajaan Lodoyo. Pertemuan kedua terjadi untuk memenuhi persyaratan kontes Putri Songgo Langit. Dia adalah putri Kerajaan Kediri yang terkenal sangat cantik. Singkat cerita bahwa Raja Kelono Suwandono berhasil memenuhi persyaratan yang diminta oleh Putri Songgo Langit. Acara yang dilakukan pada penerimaan pernikahan putri akhirnya disebut seni "Reog".',
  },
  {
    imageSrc: '/Sedekah Bumi-8173.jpg',
    title: 'Sedekah Bumi',
    description: '"Sedekah Bumi" merupakan salah satu tradisi lokal yang diselenggarakan sekali setahun untuk bersyukur atas kelimpahan rezeki. Sebagai warisan nenek moyang dan generasi, Sedekah Bumi masih dapat ditemukan di beberapa daerah di Surabaya. Ritual sedekah bumi menjadi tempat berkumpulnya masyarakat. Mereka bekerja sama untuk membangun tumpeng raksasa dari hasil bumi yang mereka miliki, kemudian membawanya bersama-sama ke balai desa untuk mengadakan ritual tradisional dan doa bersama. Setelah itu, hasil bumi tersebut didistribusikan kepada warga secara berdesakan.',
  },
  {
    imageSrc: '/manten.jpg',
    title: 'Manten Pegon',
    description: 'Ini adalah asal-usul tradisi pernikahan Surabaya yang disebut "Manten Pegon" yang muncul dari campuran budaya Tionghoa, Eropa, India, dan Arab yang dulunya tinggal berdampingan dengan harmonis di Surabaya. Pluralisme dalam tata rias dan pakaian mencerminkan harmoni dan mengekspresikan tradisi budaya etnis mereka.',
  },
];

const BudayaPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="grid grid-cols-1 gap-8 place-items-center w-full max-w-3xl">
        {budayaData.map((item, index) => (
          <Card
            key={index}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              width: '100%',
              height: '400px',
              backgroundColor: '#FDE68A',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.imageSrc}
                alt={item.title}
                layout="fill"
                className="object-cover"
              />
              {hoveredIndex === index && (
                <CardContent className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-6">
                  <Typography variant="h5" className="text-white mb-2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" className="text-white">
                    {item.description}
                  </Typography>
                </CardContent>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BudayaPage;
