'use client';

import React from 'react';
import { Box, CardMedia,  } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  { src: 'belanja.jpeg', title: 'Gambar 1' },
  { src: 'budaya.jpg', title: 'Gambar 2' },
  { src: 'kuliner.jpg', title: 'Gambar 3' },
];

const Galeri = () => {
  return (
    <Box
      sx={{
        width: '1199px',  // Mengatur lebar secara spesifik
        height: '444px',  // Mengatur tinggi secara spesifik
        margin: 'auto',
        mt: 10,
        boxShadow: 3,
        borderRadius: 5,
        overflow: 'hidden',
      }}
    >
      <Carousel
        navButtonsAlwaysVisible
        PrevIcon={<ArrowBackIosIcon />}
        NextIcon={<ArrowForwardIosIcon />}
        indicators={false}
        animation="slide"
        duration={500}
      >
        {images.map((image, index) => (
          <CardMedia
            key={index}
            component="img"
            height="444"
            width="1199"
            image={image.src}
            alt={`Slide ${index}`}
            sx={{
              objectFit: 'fill',
            }}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default Galeri;
