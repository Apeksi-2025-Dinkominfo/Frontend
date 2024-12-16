'use client';

import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Countdown, { CountdownRendererFn, CountdownRenderProps } from 'react-countdown';

const targetDate = new Date('2025-05-05T00:00:00');

// Renderer countdown
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
        gap:'45px',
      }}
    >
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            padding: { xs: '10px', md: '30px' },
            fontFamily: "Plus Jakarta Sans",
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: { xs: '60px', md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'semi-bold',
              fontSize: { xs: '20px', md: '64px' },
              color: '#1C1C1C',
            }}
          >
            {days}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '10px', md: '19px' }, color: '#1C1C1C' }}
          >
            Days
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            fontFamily: "Plus Jakarta Sans",
            padding: { xs: '10px', md: '30px' },
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: { xs: '60px', md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'semi-bold',
              fontSize: { xs: '20px', md: '64px' },
              color: '#1C1C1C',
            }}
          >
            {hours}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '10px', md: '19px' }, color: '#1C1C1C' }}
          >
            Hours
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            fontFamily: "Plus Jakarta Sans",
            padding: { xs: '10px', md: '30px' },
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: { xs: '60px', md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'semi-bold',
              fontSize: { xs: '20px', md: '64px' },
              color: '#1C1C1C',
            }}
          >
            {minutes}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '10px', md: '19px' }, color: '#1C1C1C' }}
          >
            Minutes
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            padding: { xs: '10px', md: '30px' },
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            minWidth: { xs: '60px', md: '100px' },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'semi-bold',
            fontFamily: "Plus Jakarta Sans",

              fontSize: { xs: '20px', md: '64px' },
              color: '#1C1C1C',
            }}
          >
            {seconds}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '10px', md: '19px' }, color: '#1C1C1C' }}
          >
            Seconds
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default function CountdownComponent() {
  return (
    <Box
      sx={{
        backgroundColor: '#fff', // Semi-transparent background
        borderRadius: '10px',
        width:'1000px',
        paddingBottom:'20px',
        display: 'inline-block',
        mb: 6,
        // maxWidth: '95%', // Membatasi lebar untuk perangkat kecil
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginTop: '20px',
          fontSize: { xs: '18px', md: '29px' },
          fontWeight: 'bold',
          color: '#1C1C1C',
          textAlign: 'center',
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        Menuju Munas Apeksi ke VII
      </Typography>

      <Countdown date={targetDate} renderer={renderer} />
    </Box>
  );
}
