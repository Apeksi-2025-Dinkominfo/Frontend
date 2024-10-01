'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

export default function CulinaryPage() {
  const [culinaryData, setCulinaryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const page1 = await fetch(
          'https://tourism.surabaya.go.id/api/kominfo/culinary?page=1'
        );
        const page2 = await fetch(
          'https://tourism.surabaya.go.id/api/kominfo/culinary?page=2'
        );

        const data1 = await page1.json();
        const data2 = await page2.json();

        const data1Array = Array.isArray(data1?.data.data)
          ? data1.data.data
          : [];
        const data2Array = Array.isArray(data2?.data.data)
          ? data2.data.data
          : [];

        const combinedData = [...data1Array, ...data2Array];
        setCulinaryData(combinedData);
      } catch (error) {
        console.error('Error fetching culinary data:', error);
        setError('Failed to load culinary data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredCulinary = culinaryData.filter(
    (item) =>
      item.culinaryFiles &&
      Array.isArray(item.culinaryFiles) &&
      item.culinaryFiles.length > 0
  );

  const openLocationInMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-5/6 mx-auto">
      {/* Landing Page Section */}
      <Box
        mb={4}
        display="flex"
        sx={{
          textAlign: { sm: 'left' },
          paddingLeft: isMobile ? '0' : '20px', // Set padding sesuai kondisi mobile
          paddingRight: isMobile ? '0' : '20px', // Set padding sesuai kondisi mobile
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          style={{ fontFamily: 'Poppins', color: 'black' }}
          className="font-bold "
          sx={{
            fontSize: { xs: '3rem', sm: '4rem' },
            lineHeight: { xs: '1.2', sm: '1.4' },
            textAlign: { xs: 'left', sm: 'left' },
            fontFamily:"Poppins"
          }}
        >
          KULINER <br /> SUROBOYO
        </Typography>
      </Box>

      {/* Carousel Section */}
      {filteredCulinary.length > 0 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          margin="0 auto"
          padding="0"
          mb={4} // Add margin to separate from card grid
        >
          <img
            src={filteredCulinary[currentIndex].culinaryFiles[0].link}
            alt={filteredCulinary[currentIndex].name}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />

          <Box
            position="absolute"
            left="10px"
            bottom="20px"
            width="calc(100% - 20px)"
          >
            <Button
              onClick={() =>
                setCurrentIndex((prevIndex) =>
                  prevIndex === 0 ? filteredCulinary.length - 1 : prevIndex - 1
                )
              }
              variant="outlined"
              style={{
                borderRadius: '50%',
                minWidth: '40px',
                minHeight: '40px',
                padding: '0',
                borderColor: 'white',
                color: 'white',
              }}
            >
              <span style={{ fontSize: '20px', lineHeight: '0' }}>&lt;</span>
            </Button>

            <Button
              onClick={() =>
                setCurrentIndex((prevIndex) =>
                  prevIndex === filteredCulinary.length - 1 ? 0 : prevIndex + 1
                )
              }
              variant="outlined"
              style={{
                borderRadius: '50%',
                minWidth: '40px',
                minHeight: '40px',
                padding: '0',
                borderColor: 'white',
                color: 'white',
                marginLeft: '10px',
              }}
            >
              <span style={{ fontSize: '20px', lineHeight: '0' }}>&gt;</span>
            </Button>
          </Box>
        </Box>
      )}

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
        sx={{
          '@media (max-width: 600px)': {
            // Two cards per row on mobile
            '& > .MuiGrid-item': {
              width: '50%',
              padding: '8px',
            },
            // Move the button to the bottom and make it rounded on mobile
            '& .MuiButton-root': {
              position: 'relative',
              width: '100%', // Full width for mobile
              borderRadius: '50px', // Oval shape
              marginTop: '20px', // Space between content and button
            },
          },
          '@media (min-width: 600px)': {
            // Three cards per row on larger screens
            '& > .MuiGrid-item': {
              width: '33.33%',
              padding: '12px',
            },
          },
        }}
      >
        {filteredCulinary.map((item) => (
          <Grid item key={item.id} xs={6} sm={4}>
            <Card
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative',
              }}
              className="shadow-md"
            >
              {item.culinaryFiles.length > 0 && (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.culinaryFiles[0].link}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
              )}
              <CardContent style={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  style={{ fontFamily: 'Poppins', marginBottom: '50px' }}
                  className="font-semibold"
                >
                  {item.name}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  '@media (max-width: 600px)': {
                    // Make sure button is placed below content on mobile
                    position: 'relative',
                    bottom: 'unset',
                    left: 'unset',
                    right: 'unset',
                    textAlign: 'center',
                  },
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                }}
              >
                <Button
                  onClick={() =>
                    openLocationInMaps(item.latitude, item.longitude)
                  }
                  variant="contained"
                  color="primary"
                  style={{
                    width: '100%',
                    borderRadius: '50px', // Oval button
                    padding: '10px 0', // Make it oval by adjusting padding
                  }}
                >
                  Menuju Lokasi
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
