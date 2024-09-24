"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Container, Box, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Define the type for hospital data
interface Facility {
  nama: string;
  alamat: string;
  jenis_sarana_kesehatan?: string;
  jenis_lyn?: string;
  koordinat: string;
}

// Function to open location in Google Maps based on coordinates
const openLocationInMaps = (coordinates: string) => {
  const url = `https://www.google.com/maps?q=${coordinates}`;
  window.open(url, '_blank');
};

// Card component for apotek, klinik, and puskesmas
const GeneralCard: React.FC<Facility & { selectedType: string }> = ({
  nama,
  alamat,
  jenis_sarana_kesehatan,
  jenis_lyn,
  koordinat,
  selectedType,
}) => {
  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: '#f0f4f8',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#0d47a1', mb: 1 }}>
          {nama}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon sx={{ color: '#0288d1', mr: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ color: '#546e7a' }}>
            {alamat}
          </Typography>
        </Box>

        {/* Conditionally render fields based on selected type */}
        {selectedType === 'apotek' || selectedType === 'klinik' ? (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#546e7a' }}>
              Type: {jenis_sarana_kesehatan}
            </Typography>
          </Box>
        ) : selectedType === 'puskesmas' ? (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#546e7a' }}>
              Service: {jenis_lyn}
            </Typography>
          </Box>
        ) : null}

        <Button
          variant="contained"
          onClick={() => openLocationInMaps(koordinat)}
          sx={{
            backgroundColor: '#0288d1',
            textTransform: 'none',
            padding: '6px 16px',
            '&:hover': {
              backgroundColor: '#0277bd',
            },
          }}
        >
          Location
        </Button>
      </CardContent>
    </Card>
  );
};

// Card component for hospitals (unchanged)
const HospitalCard: React.FC<Facility> = ({ nama, alamat, koordinat }) => {
  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: '#f0f4f8',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#0d47a1', mb: 1 }}>
          {nama}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon sx={{ color: '#0288d1', mr: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ color: '#546e7a' }}>
            {alamat}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => openLocationInMaps(koordinat)}
          sx={{
            backgroundColor: '#0288d1',
            textTransform: 'none',
            padding: '6px 16px',
            '&:hover': {
              backgroundColor: '#0277bd',
            },
          }}
        >
          Location
        </Button>
      </CardContent>
    </Card>
  );
};

// Main component combining LandingPage and HospitalList
const FacilityList: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('rumah_sakit'); // Default type: rumah sakit

  const API_URLS: { [key: string]: string } = {
    rumah_sakit: 'https://satupeta.surabaya.go.id/eksternal/open-spatial/rumah_sakit',
    apotek: 'https://satupeta.surabaya.go.id/eksternal/open-spatial/apotek',
    klinik: 'https://satupeta.surabaya.go.id/eksternal/open-spatial/klinik',
    puskesmas: 'https://satupeta.surabaya.go.id/eksternal/open-spatial/puskesmas',
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URLS[selectedType]);
        const data = await response.json();
        setFacilities(
          data.map((item: any) => ({
            nama: item.nama,
            alamat: item.alamat,
            jenis_sarana_kesehatan: item.jenis_sarana_kesehatan || '',
            jenis_lyn: item.jenis_lyn || '',
            koordinat: item.koordinat || '',
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant={selectedType === 'rumah_sakit' ? 'contained' : 'outlined'}
          onClick={() => setSelectedType('rumah_sakit')}
          sx={{ margin: '0 10px' }}
        >
          Rumah Sakit
        </Button>
        <Button
          variant={selectedType === 'apotek' ? 'contained' : 'outlined'}
          onClick={() => setSelectedType('apotek')}
          sx={{ margin: '0 10px' }}
        >
          Apotek
        </Button>
        <Button
          variant={selectedType === 'klinik' ? 'contained' : 'outlined'}
          onClick={() => setSelectedType('klinik')}
          sx={{ margin: '0 10px' }}
        >
          Klinik
        </Button>
        <Button
          variant={selectedType === 'puskesmas' ? 'contained' : 'outlined'}
          onClick={() => setSelectedType('puskesmas')}
          sx={{ margin: '0 10px' }}
        >
          Puskesmas
        </Button>
      </Box>

      <Grid container spacing={2}>
        {facilities.map((facility, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {selectedType === 'rumah_sakit' ? (
              <HospitalCard {...facility} />
            ) : (
              <GeneralCard {...facility} selectedType={selectedType} />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FacilityList;
