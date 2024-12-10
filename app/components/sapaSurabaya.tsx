'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';

const cardData = [
  { img: '/belanjaIcon.png', link: '/surabaya/belanja' },
  { img: '/WisataIcon.png', link: '/surabaya/wisata' },
  { img: '/Kuliner.png', link: '/surabaya/kuliner' },
  { img: '/transportasi.png', link: '/surabaya/transportasi' },
  { img: '/Kesehatan.png', link: '/hospital' },
  { img: '/event.png', link: '/surabaya/event' }, // Tambahkan card event
  { img: '/Travel1.png', link: '/surabaya/travel' }, // Tambahkan card event
];

export default function CityTourComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleNext = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  const handlePrev = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length
    );

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen relative"
      
    >

      <Link href="https://forms.gle/rpkMZ237aK8tczW78" passHref>
        <button
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-second text-white px-4 py-2 rounded-full shadow-lg hover:bg-body transition"
        >
          City Tour
        </button>
      </Link>

      <div className="text-center mb-8">
        <Typography
          style={{
            fontWeight: 'bold',
            color: 'transparent',
            fontFamily: 'Gotham, sans-serif',
            letterSpacing: '2px',
            WebkitTextStroke: '5px #E63946',
            animation: isHovered ? 'strokeAnimation 1s infinite' : 'none',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative text-6xl md:text-9xl"
        >
          Ayo Jelajahi Kota <br /> Surabaya
        </Typography>
      </div>

      <div className=" carousel-container flex flex-col items-center justify-center z-50 " style={{ height: '50px', marginBottom: '350px'  }}>

        <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
          <button
            onClick={handlePrev}
            className="absolute mt-72 md:left-10 z-10 bg-gray-600 text-white rounded-full p-3"
          >
            &larr;
          </button>
          <div
            style={{ marginRight: 450, marginBottom: 10 }}
            className="carousel-3d flex items-center justify-center relative"
          >
            {cardData.map((card, index) => {
              let offset =
                (index - currentIndex + cardData.length) % cardData.length;
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
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                    }}
                  >
                    <img
                      className="carousel-image mb-30 w-full h-full object-cover"
                      src={card.img}
                      alt="Carousel Card"
                      style={{
                        width: '500px',
                        height: '300px',
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
          <button
            onClick={handleNext}
            className="absolute mt-72 md:right-10 mt:30 z-10 bg-gray-600 text-white rounded-full p-3"
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
          @keyframes strokeAnimation {
            0% {
              -webkit-text-stroke-color: #e63946;
            }
            25% {
              -webkit-text-stroke-color: #f4a261;
            }
            50% {
              -webkit-text-stroke-color: #e9c46a;
            }
            75% {
              -webkit-text-stroke-color: #2a9d8f;
            }
            100% {
              -webkit-text-stroke-color: #264653;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
