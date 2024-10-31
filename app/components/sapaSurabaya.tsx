'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';

const cardData = [
  { title: 'Belanja', img: '/belanja2.JPG', link: '/surabaya/belanja' },
  { title: 'Tempat Wisata', img: '/Wisata2.JPG', link: '/surabaya/wisata' },
  { title: 'Kuliner', img: '/KulinerNew.jpg', link: '/surabaya/kuliner' },
  { title: 'Transportasi', img: '/Transport.jpg', link: '/surabaya/transportasi' },
  { title: 'Heritage', img: '/Heritage.jpg', link: '/surabaya/heritage' },
  { title: 'Budaya', img: '/budaya.jpg', link: '/surabaya/budaya' },
  { title: 'Fasilitas Kesehatan', img: '/rumahsakit.jpeg', link: '/hospital' },
];

export default function CityTourComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  const handlePrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: '#78B7D0' }} // Mengganti warna latar belakang
    >
      <div className="text-center mt-4 mb-2">
        <Typography
          variant="h2"
          style={{
            fontWeight: 'bold',
            color: '#E63946',
            textShadow: '2px 2px #1D3557',
            letterSpacing: '2px',
          }}
        >
          Muter Muter<br />
          Suroboyo
        </Typography>
      </div>
      <div className="carousel-container flex flex-col items-center justify-center h-screen mb-5">
        <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-10 z-10 bg-gray-800 text-white rounded-full p-3"
          >
            &larr;
          </button>
          <div
            style={{ marginRight: 450, marginBottom: 300 }}
            className="carousel-3d flex items-center justify-center relative"
          >
            {cardData.map((card, index) => {
              let offset = (index - currentIndex + cardData.length) % cardData.length;
              if (offset > 1 && offset < cardData.length - 1) return null;

              if (offset === cardData.length - 1) offset = -1;

              const rotationAngle = offset * 15;
              const scale = offset === 0 ? 1.1 : 0.95;
              const opacity = offset === 0 ? 1 : 0.7;

              return (
                <Link href={card.link} passHref key={index}>
                  <div
                    className="carousel-card absolute rounded-xl shadow-lg overflow-hidden transition-transform transform"
                    style={{
                      transform: `rotateY(${rotationAngle}deg) translateX(${offset * 250}px) scale(${scale})`,
                      opacity: opacity,
                      width: '500px',
                      height: '300px',
                      cursor: 'pointer',
                      zIndex: offset === 0 ? 2 : 1,
                    }}
                  >
                    <div
                      className="carousel-image rounded-xl"
                      style={{
                        backgroundImage: `url(${card.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                    <div className="absolute bottom-4 w-full text-center text-white font-bold text-lg">
                      {card.title}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-10 z-10 bg-gray-800 text-white rounded-full p-3"
          >
            &rarr;
          </button>
        </div>
        <style jsx>{`
          .carousel-container {
            perspective: 1200px;
          }
          .carousel-3d {
            transform-style: preserve-3d;
            transition: transform 0.5s;
          }
          .carousel-card {
            transition: transform 0.5s ease, opacity 0.5s ease;
          }
          @media (max-width: 768px) {
            .carousel-card {
              width: 250px;
              height: 150px;
            }
            .carousel-3d {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
