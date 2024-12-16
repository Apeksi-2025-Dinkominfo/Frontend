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
import CircularProgress from '@mui/material/CircularProgress';

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

  const initialDisplayIds = [
    '7fba3dba-d9bd-4df2-8790-f2af713b1adf',
    '28be4fed-be52-4969-ac60-f89cf346dfd0',
    'ccecd068-f611-492f-98e6-38beb39a771f',
    '3312a584-de71-405f-be4d-75e2a09bf6af',
  ];

  // Filter culinary data for prioritized items and the rest
  const filteredCulinary = culinaryData.filter(
    (item) =>
      item.culinaryFiles &&
      Array.isArray(item.culinaryFiles) &&
      item.culinaryFiles.length > 0
  );

  const prioritizedCulinary = filteredCulinary.filter(item =>
    initialDisplayIds.includes(item.id)
  );

  const otherCulinary = filteredCulinary.filter(
    item => !initialDisplayIds.includes(item.id)
  );

  const combinedCulinary = [...prioritizedCulinary, ...otherCulinary];

  // Set interval to change images every 3 seconds
  useEffect(() => {
    if (combinedCulinary.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % combinedCulinary.length);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval); // Clear interval when component unmounts
    }
  }, [combinedCulinary]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height to center vertically
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
          paddingLeft: isMobile ? '0' : '20px',
          paddingRight: isMobile ? '0' : '20px',
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          style={{ fontFamily: 'Plus Jakarta Sans', }}
          className="font-bold "
          sx={{
            fontSize: { xs: '3rem', sm: '4rem' },
            lineHeight: { xs: '1.2', sm: '1.4' },
            textAlign: { xs: 'left', sm: 'left' },
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          KULINER <br /> SURABAYA
        </Typography>
      </Box>

      {/* Carousel Section */}
      {combinedCulinary.length > 0 && (
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
            src={combinedCulinary[currentIndex].culinaryFiles[0].link}
            alt={combinedCulinary[currentIndex].name}
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
                  prevIndex === 0 ? combinedCulinary.length - 1 : prevIndex - 1
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
                  prevIndex === combinedCulinary.length - 1 ? 0 : prevIndex + 1
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

      {/* Display All Culinary Items */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
        sx={{
          '@media (max-width: 600px)': {
            '& > .MuiGrid-item': {
              width: '50%',
              padding: '8px',
            },
            '& .MuiButton-root': {
              position: 'relative',
              width: '100%',
              borderRadius: '50px',
              marginTop: '20px',
            },
          },
          '@media (min-width: 600px)': {
            '& > .MuiGrid-item': {
              width: '33.33%',
              padding: '12px',
            },
          },
        }}
      >
        {combinedCulinary.map((item) => (
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
                  style={{ color:"#023E74", fontFamily: 'Plus Jakarta Sans', marginBottom: '50px' }}
                  className="font-semibold"
                >
                  {item.name}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  '@media (max-width: 600px)': {
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
                    fontFamily: "Plus Jakarta Sans",
                    width: '100%',
                    borderRadius: '50px',
                    padding: '10px 0',
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
