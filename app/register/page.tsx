"use client";

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

interface FormData {
  perwakilan: string;
  namaPenanggungJawab: string;
  jumlahKontingen: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    perwakilan: '',
    namaPenanggungJawab: '',
    jumlahKontingen: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <Grid
      container
      sx={{ minHeight: '100vh' }}
    >
      <Grid
        item
        xs={12} md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/apeksi.png" 
          alt="Medium Image"
          sx={{
            width: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
          }}
        />
      </Grid>

      <Grid
        item
        xs={12} md={6}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="img"
          src="/sby.png"
          alt="Logo"
          sx={{
            width: 50,
            height: 'auto',
            mb: 3,
          }}
        />

        <Box
          sx={{
            width: 400,
            p: 4,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <TextField
              label="Perwakilan"
              name="perwakilan"
              value={formData.perwakilan}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Penanggung Jawab"
              name="namaPenanggungJawab"
              value={formData.namaPenanggungJawab}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Berapa Kontingen yang Dibawa"
              name="jumlahKontingen"
              type="number"
              value={formData.jumlahKontingen}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
