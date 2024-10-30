'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { events, Acara } from '../utils/event'; // Import events and Acara from utils

const EventComponent = () => {
  // State untuk memunculkan pop-up dan data acara yang dipilih
  const [open, setOpen] = useState(false);
  const [selectedAcara, setSelectedAcara] = useState<Acara | null>(null); // Use the Acara type

  // Buka pop-up dan set acara yang dipilih
  const handleClickOpen = (acara: Acara) => {
    setSelectedAcara(acara);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAcara(null);
  };

  return (
    <Box
      sx={{
        mt: '-100px',
        pt: '120px',
        pb: 6,
        px: { xs: 2, md: 4 },
        backgroundColor: '#227B94',
        backgroundImage: 'url(/lingkaranJadwal.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left -50px top -200px',
        backgroundSize: '700px 700px',
        color: '#fff',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Typography
        variant="h6"
        className="text-white font-medium"
        sx={{ textAlign: 'right', fontFamily: 'Poppins', letterSpacing: '5px' }}
      >
        Cek jadwal Munas di Sini!
      </Typography>
      <Typography
        variant="h6"
        className="text-body font-semibold"
        sx={{ mb: 4, textAlign: 'right', fontSize: '19px' }}
      >
        Catat jadwal kegiatan selama Munas VIII 2024 di Kota Surabaya
      </Typography>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          960: { slidesPerView: 3 },
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                mt: '60px',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '-60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: '100px',
                  backgroundColor: '#78B7D0',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  zIndex: 10,
                }}
              >
                {event.date}
              </Box>

              <Card
                sx={{
                  width: '342px',
                  height: '500px',
                  backgroundColor: '#78B7D0',
                  color: '#000',
                  borderRadius: '10px',
                  boxShadow: 3,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '342px',
                      height: '222px',
                      objectFit: 'cover',
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        filter: 'brightness(50%)',
                      },
                    }}
                    image={event.image}
                    alt="Event Image"
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: '0.3s ease-in-out',
                      '&:hover': {
                        opacity: 1,
                      },
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: '#fff', fontWeight: 600 }}
                    >
                      {event.location}
                    </Typography>
                  </Box>
                </Box>

                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {event.headline}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {event.mainTime}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {event.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mt: 1,
                      maxHeight: '100px', // Set a maximum height for the container
                      overflowY: 'auto', // Enable vertical scroll if content overflows
                    }}
                  >
                    {event.acara.map((acaraItem, idx) => (
                      <Button
                        key={idx}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: '20px',
                          padding: '2px 10px',
                          textTransform: 'none',
                          fontSize: '12px',
                          color: '#3C3C43',
                          borderColor: '#3C3C43',
                          transition: '0.3s',
                          '&:hover': {
                            backgroundColor: '#16325B',
                            color: '#fff',
                            borderColor: '#16325B',
                          },
                        }}
                        onClick={() => handleClickOpen(acaraItem)}
                      >
                        {acaraItem.title}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            width: '450px',
            height: '350px',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: '24px',
            borderBottom: '1px solid #ddd',
            textAlign: 'center',
          }}
        >
          Detail Acara
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {selectedAcara && (
          <DialogContent
            dividers
            sx={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'relative', // Set position relative for absolute positioning inside
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              {selectedAcara.title}
            </Typography>
            <Typography variant="body1">
              <strong>Location: </strong>
              {selectedAcara.location}
            </Typography>
            <Typography variant="body1">
              <strong>Time: </strong>
              {selectedAcara.time}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Description: </strong>
              {selectedAcara.description}
            </Typography>
            <Box
              sx={{
                position: 'absolute', // Position absolute to align it at the bottom right
                bottom: 16,
                right: 16,
              }}
            >
              <Typography variant="body1">
                <strong>Dresscode: </strong>
                {selectedAcara.dresscode}
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default EventComponent;
