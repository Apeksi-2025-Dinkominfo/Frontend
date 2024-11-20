'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';

const cardData = [
  { img: '/belanjaIcon.png', link: '/surabaya/belanja' },
  { img: '/WisataIcon.png', link: '/surabaya/wisata' },
  { img: '/Kuliner.png', link: '/surabaya/kuliner' },
  { img: '/transportIcon.png', link: '/surabaya/transportasi' },
  { img: '/heritageIcon.png', link: '/surabaya/heritage' },
  { img: '/budayaIcon.png', link: '/surabaya/budaya' },
  { img: '/fasilitasKesehatan.png', link: '/hospital' },
];

export default function CityTourComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setCirclePosition({ x: offsetX - 250, y: offsetY - 500 });
  };

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
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: '#78B7D0' }} // Mengganti warna latar belakang
    >
      <div className="text-center mt-4 mb-0">
        <Typography
          style={{
            fontWeight: 'bold',
            color: 'transparent',
            fontFamily: 'Gotham, sans-serif',
            letterSpacing: '2px',
            WebkitTextStroke: '5px #E63946',
            animation: isHovered ? 'strokeAnimation 1s infinite' : 'none',
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative text-9xl"
        >
          Ayo Jelajahi Kota <br /> Surabaya
        </Typography>
      </div>

      {/* Carousel Section */}
      <div className="carousel-container flex flex-col items-center justify-center h-screen " style={{marginBottom:-60}}>
        <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-10 z-10 bg-gray-800 text-white rounded-full p-3"
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
                      transform: `rotateY(${rotationAngle}deg) translateX(${
                        offset * 250
                      }px) scale(${scale})`,
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
            className="absolute right-4 md:right-10 mt:30 z-10 bg-gray-800 text-white rounded-full p-3"
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
              -webkit-text-stroke-color: #E63946;
            }
            25% {
              -webkit-text-stroke-color: #F4A261;
            }
            50% {
              -webkit-text-stroke-color: #E9C46A;
            }
            75% {
              -webkit-text-stroke-color: #2A9D8F;
            }
            100% {
              -webkit-text-stroke-color: #264653;
            }
          }
        `}</style>
      </div>

     {/* Batik Remo Image Section */}
    <div
    className="batik-remo-container flex justify-center items-center mb-20 relative"
    style={{
    backgroundImage: "url('/sparkling21.png')",
    backgroundSize: 'contain', // Agar gambar tidak terpotong
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom', // Fokus pada bagian bawah gambar
    width: '100%',
    height: '400px', // Tinggi diperbesar untuk menonjolkan batik
    marginBottom: "8px",
    }}
    >
    <div
    className="overlay absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0"
    ></div>
    </div>
    </div>
  );
}
