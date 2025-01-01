'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/material';
const CarouselEmbla = ({ cardData }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="text-center mb-8">
        <Typography
          style={{
            // fontWeight: 'bold',
            color: 'transparent',
            fontFamily: 'Plus Jakarta Sans',
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

      <div className="embla">
        <button
          onClick={scrollPrev}
          className="embla__button embla__button--prev"
        >
          <span>&larr;</span>
        </button>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {cardData.map((card, index) => (
              <div className="embla__slide" key={index}>
                <Link href={card.link}>
                  <div className="embla__slide__inner">
                    <Image
                      src={card.img}
                      alt={card.alt}
                      width={400}
                      height={400}
                      className={`embla__slide__img ${
                        selectedIndex === index ? 'scale-110' : 'scale-100'
                      }`}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={scrollNext}
          className="embla__button embla__button--next"
        >
          <span>&rarr;</span>
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
    </>
    
  );
};

export default CarouselEmbla;
