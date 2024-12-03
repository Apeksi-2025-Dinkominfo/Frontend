"use client";
import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Countdown, { CountdownRendererFn, CountdownRenderProps } from 'react-countdown';

const videos = [
  '/fix.mp4',
  '/fix.mp4',
  '/fix.mp4',
  '/fix.mp4',
  '/fix.mp4',
  '/fix.mp4',
];

const targetDate = new Date('2025-05-05T00:00:00');

const renderer: CountdownRendererFn = ({
  days,
  hours,
  minutes,
  seconds,
}: CountdownRenderProps) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        marginTop: 2,
        flexWrap: 'nowrap',
      }}
    >
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            padding: { xs: '10px', md: '20px' },
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: { xs: '60px', md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '20px', md: '30px' },
              color: '#1C1C1C',
            }}
          >
            {days}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '10px', md: '15px' }, color: '#1C1C1C' }}
          >
            Days
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            padding: { xs: '10px', md: '20px' },
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: { xs: '60px', md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '20px', md: '30px' },
              color: '#1C1C1C',
            }}
          >
            {hours}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '10px', md: '15px' }, color: '#1C1C1C' }}
          >
            Hours
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            padding: { xs: '10px', md: '20px' },
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: { xs: '60px', md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '20px', md: '30px' },
              color: '#1C1C1C',
            }}
          >
            {minutes}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '10px', md: '15px' }, color: '#1C1C1C' }}
          >
            Minutes
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            padding: { xs: '10px', md: '20px' },
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: { xs: '60px', md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '20px', md: '30px' },
              color: '#1C1C1C',
            }}
          >
            {seconds}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '10px', md: '15px' }, color: '#1C1C1C' }}
          >
            Seconds
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const VideoPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: '#ffffff',
        padding: { xs: '16px', md: '24px' },
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <video
        key={currentIndex}
        controls
        style={{ width: '100%', borderRadius: '10px' }}
      >
        <source src={videos[currentIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Button
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '0',
          transform: 'translateY(-50%)',
          backgroundColor: '#333',
          color: '#fff',
          minWidth: 'auto',
          padding: '10px',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        <ArrowBackIcon />
      </Button>

      <Button
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: '0',
          transform: 'translateY(-50%)',
          backgroundColor: '#333',
          color: '#fff',
          minWidth: 'auto',
          padding: '10px',
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        <ArrowForwardIcon />
      </Button>
    </Box>
  );
};

const WalikotaVideos: React.FC = () => {
  return (
    <Box
      sx={{
        padding: { xs: '16px', md: '24px' },
        borderRadius: '15px',
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundImage: 'url("/Gembiliwonokromo3.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
          borderRadius: '10px',
          padding: '15px',
          display: 'inline-block',
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: '24px',
            fontSize: { xs: '20px', md: '39.8px' },
            color: '#1C1C1C',
          }}
          className="text-body font-semibold"
        >
          Ucapan Dari Para Walikota Hebat
        </Typography>
      </Box>

      <VideoPlayer />
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
          borderRadius: '10px',
          padding: '15px',
          display: 'inline-block',
          mb: 6,
        }}
      >
      <Typography
        variant="h5"
        sx={{
          marginTop: '20px',
          fontSize: { xs: '18px', md: '25px' },
          fontWeight: 'bold',
          color: '#1C1C1C',
        }}
      >
        Menuju Munas APEKSI Ke VII
      </Typography>

      <Countdown date={targetDate} renderer={renderer} />
    </Box>
    </Box>
  );
};


export default WalikotaVideos;
