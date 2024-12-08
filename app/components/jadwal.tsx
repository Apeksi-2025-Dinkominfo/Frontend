'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Navigation, Pagination } from 'swiper/modules';
import { events, Acara } from '../utils/event'; // Import events and Acara from utils

// const EventComponent = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);

//   const handleClickOpen = (date: string) => {
//     setSelectedDate(date);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedDate(null);
//   };
const EventComponent = () => {
  const [expanded, setExpanded] = useState<string | false>(false); // Untuk kontrol accordion yang dibuka

  // Fungsi untuk mengatur accordion yang terbuka
  const handleChange = (event: React.SyntheticEvent, panel: string) => {
    setExpanded(expanded === panel ? false : panel);
  };

  return (
    <Box
    sx={{
      mt: '-90px',
      pt: '120px',
      // pb: 6,
      // px: { xs: 2, md: 4 },
      backgroundColor: '#227B94',
      backgroundImage: 'url(/abhiboyo31.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left -60px top -50px',
      backgroundSize: '400px 400px',
      color: '#fff',
      position: 'relative',
      zIndex: 1,
    }}
  >
    <Typography
      variant="h6"
      className="text-white font-medium"
      sx={{ textAlign: 'center', fontFamily: 'Poppins', letterSpacing: '5px' }}
    >
      Cek jadwal Munas di Sini!
    </Typography>
    <Typography
      variant="h6"
      className="text-body font-semibold"
      sx={{ mb: 4, textAlign: 'center', fontSize: '19px' }}
    >
      Catat jadwal kegiatan selama Munas VIII 2024 di Kota Surabaya
    </Typography>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 3,
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      {events.map((event, index) => (
        <Button
          key={index}
          variant="outlined"
          size="small"
          sx={{
            width: '88px',
            height: '104px',
            borderRadius: '19px',
            textTransform: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: '#000000',
            backgroundColor: '#43A5CC',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#16325B',
              borderColor: '#fff',
            },
          }}
          onClick={() => setExpanded(expanded === event.date ? false : event.date)}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontSize: '40px', fontWeight: 'bold', lineHeight: 1 }}
          >
            {event.date.split(' ')[0]}
          </Typography>
          <Typography variant="body2" component="div">
            {event.day}
          </Typography>
        </Button>
      ))}
    </Box>
   
   <Box className="bg-white w-full mt-10 pt-6 flex flex-col items-center  ">


    {/* Accordion untuk detail acara */}
    {events.map((event, index) => (

      
      <Accordion
        key={index}
        expanded={expanded === event.date}
        onChange={(e) => handleChange(e, event.date)}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '19px',
          width:'500px',
          marginBottom: 2,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: 'rgba(120, 183, 208, 0.25)',
            color: '#16325B',
            borderRadius: '19px',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {event.headline}
          </Typography>
        </AccordionSummary>
        <AccordionDetails  sx={{
          backgroundColor: '#fff',
          borderRadius: '50px',
        }}>
          <Typography variant="body2">
            <strong>Waktu:</strong> {event.mainTime}
          </Typography>
          <Typography variant="body2">
            <strong>Lokasi:</strong> {event.location}
          </Typography>
          <Typography variant="body2">
            <strong>Deskripsi:</strong> {event.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Detail Acara:
            </Typography>
            {event.acara.map((acara, idx) => (
              <Box key={idx} sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>{acara.title}</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>Waktu:</strong> {acara.time}
                </Typography>
                <Typography variant="body2">
                  <strong>Lokasi:</strong> {acara.location}
                </Typography>
                <Typography variant="body2">
                  <strong>Dresscode:</strong> {acara.dresscode}
                </Typography>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    ))}</Box>
  </Box>
);
};

export default EventComponent;