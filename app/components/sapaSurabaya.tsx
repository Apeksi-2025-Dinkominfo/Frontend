import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const cardData = [
  { title: 'Belanja', img: '/belanja2.JPG', link: '/Surabaya/belanja' }, // New card for Belanja
  { title: 'Tempat Wisata', img: '/Wisata2.JPG', link: '/Surabaya/wisata' },
  { title: 'Kuliner', img: '/KulinerNew.jpg', link: '/Surabaya/kuliner' },
  {
    title: 'Transportasi',
    img: '/Transport.jpg',
    link: '/Surabaya/transportasi',
  },
  { title: 'Heritage', img: '/Heritage.jpg', link: '/Surabaya/heritage' },
  { title: 'Budaya', img: '/budaya.jpg', link: '/Surabaya/budaya' },
  { title: 'Rumah Sakit', img: '/rumahsakit.jpeg', link: '/hospital' },
];

export default function CityTourComponent() {
  return (
    <div className="relative h-screen flex flex-col items-center justify-between px-8 md:px-16">
      <div className="flex flex-col md:flex-row items-center md:items-start w-full md:justify-between mt-8">
        <div className="text-body font-bold text-2xl md:text-4xl text-center md:text-left mb-4 md:mb-0">
          Ada apa di
          <br />
          Surabaya
        </div>
        <button className="px-4 py-2 bg-blue-300 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 w-full md:w-auto text-center md:ml-8">
          Registrasi City Tour
        </button>
      </div>

      <div className="mt-12 w-full">
        <Grid container spacing={3}>

          {/* New "Belanja" Card */}
          <Grid item xs={12} sm={6} md={12}>
            <Link href={cardData[0].link} passHref>
              <Card
                className="rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                style={{ width: '100%', height: '300px', cursor: 'pointer' }}
              >
                <div
                  style={{
                    backgroundImage: `url(${cardData[0].img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                  }}
                >
                  <CardContent className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-white font-bold text-center"
                    >
                      {cardData[0].title}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Grid>

          {/* First 3 Cards (Tempat Wisata, Kuliner, Transportasi) */}
          {cardData.slice(1, 4).map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link href={card.link} passHref>
                <Card
                  className="h-48 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                  style={{ width: '100%', height: '300px', cursor: 'pointer' }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${card.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '100%',
                    }}
                  >
                    <CardContent className="flex items-center justify-center h-full bg-black bg-opacity-50">
                      <Typography
                        variant="h6"
                        component="div"
                        className="text-white font-bold text-center"
                      >
                        {card.title}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </Grid>
          ))}

          {/* Next Cards */}
          <Grid item xs={12} sm={6} md={6}>
            <Link href={cardData[4].link} passHref>
              <Card
                className="rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                style={{ width: '100%', height: '300px', cursor: 'pointer' }}
              >
                <div
                  style={{
                    backgroundImage: `url(${cardData[4].img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                  }}
                >
                  <CardContent className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-white font-bold text-center"
                    >
                      {cardData[4].title}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Link href={cardData[5].link} passHref>
              <Card
                className="rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                style={{ width: '100%', height: '300px', cursor: 'pointer' }}
              >
                <div
                  style={{
                    backgroundImage: `url(${cardData[5].img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                  }}
                >
                  <CardContent className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-white font-bold text-center"
                    >
                      {cardData[5].title}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Link href={cardData[6].link} passHref>
              <Card
                className="rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                style={{ width: '100%', height: '300px', cursor: 'pointer' }}
              >
                <div
                  style={{
                    backgroundImage: `url(${cardData[6].img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                  }}
                >
                  <CardContent className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-white font-bold text-center"
                    >
                      {cardData[6].title}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
