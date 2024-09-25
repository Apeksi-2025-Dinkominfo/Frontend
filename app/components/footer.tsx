import React from 'react';
import { Box, Grid, Typography, IconButton, Container } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import { Facebook, Twitter, Instagram, YouTube, } from '@mui/icons-material';

const FooterComponent = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#FFFFFF', py: 2, borderTop: '1px solid #e0e0e0' }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* Kolom Logo dan Deskripsi */}
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column">
              <img src="/logo-dark.png" alt="Surabaya Logo" width={150} style={{ marginBottom: '16px' }} />
              <Typography variant="body1" color="textSecondary">
                Surabaya dengan bangga menjadi tuan rumah Rakernas Apeksi,<br/> menyambut peserta dari seluruh Indonesia
                untuk berdiskusi<br/> dan berkolaborasi.Kota Pahlawan siap berbagi inovasi dan solusi<br/> dalam pengembangan perkotaan,
                mendorong<br/> kemajuan dan kerjasama antar daerah.
              </Typography>
            </Box>
          </Grid>

          {/* Kolom Informasi Kontak */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Kontak
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Phone sx={{ verticalAlign: 'middle', mr: 1 }} />
              (031) 5475600
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Phone sx={{ verticalAlign: 'middle', mr: 1 }} />
              (031) 9871239
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
              dinkominfo@surabaya.go.id
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
              media_center@surabaya.go.id
            </Typography>
          </Grid>

          {/* Kolom Alamat */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Alamat
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <LocationOn sx={{ verticalAlign: 'middle', mr: 1 }} />
              Jl. Jimerto No. 25-27 Ketabang, Kec. Genteng, Kota SBY, Jawa Timur 60272
            </Typography>
          </Grid>
        </Grid>

        {/* Baris Ikon Sosial Media */}
        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <IconButton href="#" color="inherit" aria-label="Facebook">
            <Facebook />
          </IconButton>
          <IconButton href="#" color="inherit" aria-label="Twitter">
            <Twitter />
          </IconButton>
          <IconButton href="#" color="inherit" aria-label="Instagram">
            <Instagram />
          </IconButton>
          <IconButton href="#" color="inherit" aria-label="YouTube">
            <YouTube />
          </IconButton>
        </Box>

        {/* Copyright */}
        <Box mt={4} textAlign="left">
          <Typography variant="body2" color="textSecondary">
            © 2025 Pemerintah Kota Surabaya™. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterComponent;
