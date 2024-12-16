"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, Container, Box, CircularProgress, Tabs, Tab, Pagination, useMediaQuery } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CategoryIcon from '@mui/icons-material/Category';
import { useTheme } from '@mui/material/styles';

interface Facility {
  nama: string;
  alamat: string;
  penyelenggara?: string; 
  klasifikasi_rumah_sakit?: string;  
  tipe_rumah_sakit?: string;  
  jenis_sarana_kesehatan?: string; 
  jenis_lyn?: string; 
  koordinat: string;
}

const openLocationInMaps = (coordinates: string) => {
  const url = `https://www.google.com/maps?q=${coordinates}`;
  window.open(url, '_blank');
};




const FacilityCard: React.FC<{ facility: Facility, loading: boolean, selectedTab: string }> = ({ facility, loading, selectedTab }) => {

  const getIcon = () => {
    switch (selectedTab) {
      case 'hospitals':
        return <LocalHospitalIcon sx={{fontFamily: 'Plus Jakarta Sans', color: '#0288d1', mr: 1 }} />;
      case 'puskesmas':
        return <CategoryIcon sx={{ fontFamily: 'Plus Jakarta Sans',color: '#0288d1', mr: 1 }} />;
      case 'klinik':
        return <BusinessIcon sx={{fontFamily: 'Plus Jakarta Sans', color: '#0288d1', mr: 1 }} />;
      case 'apotek':
        return <BusinessIcon sx={{ fontFamily: 'Plus Jakarta Sans',color: '#0288d1', mr: 1 }} />;
      default:
        return <LocationOnIcon sx={{ fontFamily: 'Plus Jakarta Sans',color: '#0288d1', mr: 1 }} />;
    }
  };

  
  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        position: 'relative',
        backgroundColor: '#f0f4f8',
        height: '100%', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '300px',
        '&:hover': {
          boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.15)', 
        }
      }}
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <CardContent sx={{ paddingBottom: '0px' }}>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 'bold', color: '#0d47a1', mb: 1 }}>
            {facility.nama}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOnIcon sx={{ color: '#0288d1', mr: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Plus Jakarta Sans', color: '#546e7a' }}>
              {facility.alamat}
            </Typography>
          </Box>

          {/* Display penyelenggara for hospitals */}
          {selectedTab === 'hospitals' && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {getIcon()}
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Plus Jakarta Sans', color: '#546e7a' }}>
                  Penyelenggara: {facility.penyelenggara}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalHospitalIcon sx={{ color: '#0288d1', mr: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Plus Jakarta Sans', color: '#546e7a' }}>
                  Fasilitas: {facility.klasifikasi_rumah_sakit}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CategoryIcon sx={{ color: '#0288d1', mr: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Plus Jakarta Sans',  }}>
                  Tipe Rumah Sakit: {facility.tipe_rumah_sakit}
                </Typography>
              </Box>
            </>
          )}

          {selectedTab === 'puskesmas' && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getIcon()}
              <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Plus Jakarta Sans', color: '#546e7a' }}>
                Tipe Fasilitas: {facility.jenis_lyn}
              </Typography>
            </Box>
          )}

          {selectedTab === 'klinik' && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getIcon()} 
              <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Plus Jakarta Sans', color: '#546e7a' }}>
                Tipe Fasilitas: {facility.jenis_sarana_kesehatan}
              </Typography>
            </Box>
          )}

          {selectedTab === 'apotek' && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getIcon()}
              <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Plus Jakarta Sans', color: '#546e7a' }}>
                Tipe Fasilitas: {facility.jenis_sarana_kesehatan}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Button 
              variant="contained"
              startIcon={<LocationOnIcon />}
              onClick={() => openLocationInMaps(facility.koordinat)}
              sx={{
                fontFamily: 'Plus Jakarta Sans',
                backgroundColor: '#0288d1',
                borderRadius: '24px',
                textTransform: 'none',
                padding: '6px 16px',
                '&:hover': {
                  backgroundColor: '#0277bd',
                },
              }}
            >
              Location
            </Button>
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

  
  

const FacilityList: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('hospitals');
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 12;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Define API endpoints for different types of facilities
  const apiUrls: { [key: string]: string } = {
    hospitals: 'https://satupeta.surabaya.go.id/eksternal/open-spatial/rumah_sakit',
    puskesmas: 'https://satupeta.surabaya.go.id/eksternal/open-spatial/puskesmas',
    klinik: 'https://satupeta.surabaya.go.id/eksternal/open-spatial/klinik',
    apotek: 'https://satupeta.surabaya.go.id/eksternal/open-spatial/apotek',
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiUrls[selectedTab]);
        const data: Facility[] = await response.json();
        setFacilities(data.map(item => ({
          nama: item.nama,
          alamat: item.alamat,
          penyelenggara: item.penyelenggara,
          klasifikasi_rumah_sakit: item.klasifikasi_rumah_sakit,
          tipe_rumah_sakit: item.tipe_rumah_sakit,
          jenis_sarana_kesehatan: item.jenis_sarana_kesehatan,
          jenis_lyn: item.jenis_lyn,
          koordinat: item.koordinat,
        })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    setCurrentPage(1); // Reset to first page when switching tabs
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = facilities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(facilities.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container className='font-plus'>
      <LandingPage selectedTab={selectedTab} />
      <Tabs value={selectedTab} onChange={handleTabChange} centered sx={{ marginBottom: '20px', color:'white', fontFamily: 'Plus Jakarta Sans' }}>
        <Tab label="Rumah Sakit" value="hospitals" sx={{ fontFamily: 'Plus Jakarta Sans' }}/>
        <Tab label="Puskesmas" value="puskesmas" sx={{ fontFamily: 'Plus Jakarta Sans' }}/>
        <Tab label="Klinik" value="klinik" sx={{ fontFamily: 'Plus Jakarta Sans' }}/>
        <Tab label="Apotek" value="apotek" sx={{ fontFamily: 'Plus Jakarta Sans' }}/>
      </Tabs>

      <Grid container spacing={4}>
        {currentItems.map((facility, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <FacilityCard facility={facility} loading={loading} selectedTab={selectedTab} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          siblingCount={isMobile ? 0 : 1}
        />
      </Box>
    </Container>
  );
};

const LandingPage: React.FC<{ selectedTab: string }> = ({ selectedTab }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Update heading based on selected tab
    const getPageHeading = () => {
      switch (selectedTab) {
        case 'hospitals':
          return 'Rumah Sakit';
        case 'puskesmas':
          return 'Puskesmas';
        case 'klinik':
          return 'Klinik';
        case 'apotek':
          return 'Apotek';
        default:
          return 'Healthcare Facilities';
      }
    };

    return (
      <Box
        sx={{
          width: '100%',
          height: isMobile ? 'auto' : '300px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', // Distribute space between text and image
          alignItems: 'center',
          padding: '20px',
          mb: 4,
        }}
      >
        {/* Text Section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant={isMobile ? 'h4' : 'h2'} component="div" sx={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 'bold', }}>
            {getPageHeading()}
          </Typography>
          <Typography variant={isMobile ? 'body1' : 'h6'} component="div" sx={{ fontFamily: 'Plus Jakarta Sans', mt: 2, }}>
          Temukan rumah sakit dan fasilitas layanan kesehatan terdekat yang siap menolong jika mengalami masalah kesehatan.
          </Typography>
        </Box>

        {/* Image Section */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mt: isMobile ? 3 : 0 }}>
          <img
            src="/hsptl.png"
            alt="Healthcare Facility"
            style={{ maxWidth: '65%', height: 'auto', borderRadius: '8px' }}
          />
        </Box>
      </Box>
    );
};

export default FacilityList;
