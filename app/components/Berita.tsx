import { Box, Grid, Typography, Button, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from 'react';
import { mainNews, beritaItems, getTruncatedBody, getTruncatedTitle } from '../utils/beritaData';


const Berita = () => {
  const maxItemsToShow = 14; // Limit to maximum 14 items
  const visibleItemsCount = 7; // Display only 7 items at a time

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect if the screen is small (mobile)
  
  const sortedItems = [...beritaItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const [currentItems] = useState(sortedItems.slice(0, maxItemsToShow)); // Limit the sorted items
  const [currentIndex, setCurrentIndex] = useState(0); // State for current index

  // Only display the visibleItemsCount (7) at a time
  const displayedItems = currentItems.slice(currentIndex, currentIndex + visibleItemsCount);

  // Automatic slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + visibleItemsCount) % currentItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentItems]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - visibleItemsCount + currentItems.length) % currentItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleItemsCount) % currentItems.length);
  };

  return (
    <Box sx={{ mt: 4, px: 4, backgroundColor: '#1A4C63', py: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, color: '#FFFFFF' }}>
        Berita Seputar APEKSI
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {/* Menampilkan hanya mainNews pada tampilan mobile */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={mainNews.image}
            alt={mainNews.title}
            sx={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFFFFF', mb: 1 }}>
              {getTruncatedTitle(mainNews.title)} {/* Use truncated title */}
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ color: '#CCCCCC' }}>
              {mainNews.location} - {mainNews.date}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: '#FFFFFF' }}>
              {getTruncatedBody(mainNews.body)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {!isMobile && (
  <Box textAlign="center" sx={{ mt: 4 }}>
    <Button
      variant="outlined"
      sx={{
        borderColor: '#8AB393',
        color: '#8AB393',
        borderRadius: '25px',
        padding: '10px 20px',
        '&:hover': {
          borderColor: '#8AB393',
          backgroundColor: '#F0FFF4',
        },
      }}
      href="/berita" // Redirect ke halaman /berita
    >
      Lihat semua berita
    </Button>
  </Box>
)}


      {/* Jika bukan mobile, tampilkan seluruh berita lainnya */}
      {!isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left arrow for going back */}
          <IconButton sx={{ color: '#FFFFFF' }} onClick={handlePrev} disabled={currentIndex === 0}>
            <ArrowBackIosIcon />
          </IconButton>

          <Grid container spacing={2}>
            {displayedItems.map((item, index) => (
              <Grid item key={index}>
                <Box
                  sx={{
                    width: 172,
                    height: 150,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box component="img" src={item.image} alt={item.title} sx={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                  <Box sx={{ padding: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: '0.8rem',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {getTruncatedTitle(item.title)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
                      {item.location} - {item.date}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Right arrow for going forward */}
          <IconButton sx={{ color: '#FFFFFF' }} onClick={handleNext} disabled={currentIndex + visibleItemsCount >= currentItems.length}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default Berita;
