'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Grid, CardMedia, Typography } from '@mui/material';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { fetchGambarData, Gambar } from '../utils/gambardata';

const Galeri = () => {
  const [images, setImages] = useState<Gambar[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'day' | 'event' | 'venue'>('day');
  const [selectedDay, setSelectedDay] = useState<string>('Day 1');
  const [selectedEvent, setSelectedEvent] = useState<string>('Event 1');
  const [selectedVenue, setSelectedVenue] = useState<string>('Venue 1');

  useEffect(() => {
    const getGambarData = async () => {
      const data = await fetchGambarData();
      setImages(data);
      console.log(data);
    };

    getGambarData();
  }, []);

  const getGalleryImages = () => {
    // Mengembalikan gambar berdasarkan kategori yang dipilih
    return images.filter((image) => {
      if (selectedCategory === 'day') return image.photoType === 'day';
      if (selectedCategory === 'event') return image.photoType === 'event';
      if (selectedCategory === 'venue') return image.photoType === 'venue';
      return false;
    });
  };

  return (
    <>
      <Box
        sx={{
          width: '1199px',
          height: '444px',
          margin: 'auto',
          mt: 8,
          boxShadow: 1,
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
          navButtonsWrapperProps={{
            style: {
              top: '35%',
              transform: 'translateY(-50%)',
            },
          }}
          navButtonsProps={{
            style: {
              backgroundColor: 'rgb(1, 2, 0, 0.5)',
              borderRadius: '100%',
            },
          }}
        >
          {getGalleryImages().map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="444"
              width="1199"
              image={image.url}
              alt={`Slide ${index}`}
              sx={{
                objectFit: 'contain',
              }}
            />
          ))}
        </Carousel>
      </Box>

      <Box sx={{ width: '90%', margin: 'auto', mt: 5 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Galeri
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
          {/* Dropdown untuk Day */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                {selectedDay} <ArrowDropDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Day Selection" style={{ backgroundColor: '#78B7D0', borderRadius: '20px' }}>
              <DropdownItem key="day1" onClick={() => { setSelectedDay('Day 1'); setSelectedCategory('day'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Day 1
              </DropdownItem>
              <DropdownItem key="day2" onClick={() => { setSelectedDay('Day 2'); setSelectedCategory('day'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Day 2
              </DropdownItem>
              <DropdownItem key="day3" onClick={() => { setSelectedDay('Day 3'); setSelectedCategory('day'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Day 3
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Dropdown untuk Event */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                {selectedEvent} <ArrowDropDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Event Selection" style={{ backgroundColor: '#78B7D0', borderRadius: '20px' }}>
              <DropdownItem key="event1" onClick={() => { setSelectedEvent('Event 1'); setSelectedCategory('event'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Event 1
              </DropdownItem>
              <DropdownItem key="event2" onClick={() => { setSelectedEvent('Event 2'); setSelectedCategory('event'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Event 2
              </DropdownItem>
              <DropdownItem key="event3" onClick={() => { setSelectedEvent('Event 3'); setSelectedCategory('event'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Event 3
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Dropdown untuk Venue */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                {selectedVenue} <ArrowDropDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Venue Selection" style={{ backgroundColor: '#78B7D0', borderRadius: '20px' }}>
              <DropdownItem key="venue1" onClick={() => { setSelectedVenue('Venue 1'); setSelectedCategory('venue'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Venue 1
              </DropdownItem>
              <DropdownItem key="venue2" onClick={() => { setSelectedVenue('Venue 2'); setSelectedCategory('venue'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Venue 2
              </DropdownItem>
              <DropdownItem key="venue3" onClick={() => { setSelectedVenue('Venue 3'); setSelectedCategory('venue'); }} style={{ backgroundColor: '#78B7D0', color: '#1A1A1A', borderRadius: '20px' }}>
                Venue 3
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Box>

        <Grid container spacing={2}>
          {getGalleryImages().map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="190"
                  width="188"
                  image={image.url}
                  alt={image.photoType}
                  sx={{
                    width: '188%',
                    height: '190px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Galeri;
