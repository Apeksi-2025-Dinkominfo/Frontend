import React from 'react';
import {
  Card, CardContent, Typography, Container, Grid, Box, IconButton
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

function RentalCard() {
  const rentalData = [
    { no: 1, name: 'PT ADI SARANA ARMADA TBK (ASSA)', phone: '081911500369', address: 'Jl. Raya Prapen No.63, Panjang Jiwo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60299' },
    { no: 2, name: 'Kalla Transport & Logistic Surabaya', phone: '08114141116', address: 'Jl. Raya Taman No.113-137, Taman, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257' },
    { no: 3, name: 'TRAC Rental Mobil', phone: '08111873210', address: 'Jl. Raya Jemursari No.224 - 228, Tenggilis Mejoyo, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60292' },
    { no: 4, name: 'CV. Tunas Jaya', phone: '08131518750', address: 'Jl. Musi No. 29, Surabaya' },
    { no: 5, name: 'Fafa Wisata Trans', phone: '081216859936', address: 'Kec. Prambon, Sidoarjo' },
    { no: 6, name: 'CV. PUSAKA LIMA TIGA SURABAYA (Nurhayati)', phone: '08113350606', address: 'Jl. Rungkut Mejoyo selatan V / 21-23' },
  ];

  const formatPhoneLink = (phone) => {
    const formattedPhone = phone.replace(/\s+/g, '').replace(/^0/, '62');
    return `tel:+${formattedPhone}`;
  };

  return (
    <Container sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ color: '#227B94', fontWeight: 'bold', marginBottom: 3 }}>
        Rental Mobil di Surabaya
      </Typography>
      <Grid container spacing={3}>
        {rentalData.map((rental) => (
          <Grid item xs={12} sm={6} md={4} key={rental.no}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #227B94, #34B3CE)',
                color: 'white',
                borderRadius: 3,
                boxShadow: 4,
                minHeight: 200,  // Menyelaraskan tinggi card
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {rental.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <IconButton
                    href={formatPhoneLink(rental.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#25D366',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      p: 1,
                      mr: 1,
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                    }}
                  >
                    <PhoneIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ fontSize: '1rem' }}>{rental.phone}</Typography>
                </Box>
                <Typography variant="body2" sx={{ textAlign: 'justify', fontSize: '0.9rem' }}>
                  {rental.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RentalCard;
