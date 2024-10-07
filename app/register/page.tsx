'use client';

import React, { useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';

interface FormData {
  asalKota: string;
  nama: string;
  namaAjudan: string;
  nomorHandphone: string;
  tanggalDatang: string;
  waktuDatang: string;
  pesawat: string;
  tanggalPulang: string;
  lokasiMenginap: string;
  jumlahRombongan: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    asalKota: '',
    nama: '',
    namaAjudan: '',
    nomorHandphone: '',
    tanggalDatang: '',
    waktuDatang: '',
    pesawat: '',
    tanggalPulang: '',
    lokasiMenginap: '',
    jumlahRombongan: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    const payload = {
      data: {
        asal_kota: formData.asalKota,
        Nama: formData.nama,
        nama_ajudan: formData.namaAjudan,
        nomor_handphone: formData.nomorHandphone,
        tanggal_datang: formData.tanggalDatang,
        waktu_datang: `${formData.waktuDatang}:00`,  // Ensure seconds are added
        pesawat: formData.pesawat,
        tanggal_pulang: formData.tanggalPulang,
        lokasi_menginap: formData.lokasiMenginap,
        jumlah_rombongan: Number(formData.jumlahRombongan),
      },
    };
  
    console.log("Submitting payload:", payload);
  
    try {
      const response = await fetch('http://localhost:1337/api/pendaftars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        throw new Error('Failed to submit data');
      }
  
      const result = await response.json();
      console.log('Form Submitted Successfully:', result);
  
      // Reset form if needed
      setFormData({
        asalKota: '',
        nama: '',
        namaAjudan: '',
        nomorHandphone: '',
        tanggalDatang: '',
        waktuDatang: '',
        pesawat: '',
        tanggalPulang: '',
        lokasiMenginap: '',
        jumlahRombongan: '',
      });
  
      alert('Pendaftaran berhasil!');
  
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Pendaftaran gagal. Silakan coba lagi.');
    }
  };
  
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid
        item
        xs={12}
        md={6}
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
        xs={12}
        md={6}
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
            width: { xs: '100%', md: 600 }, // Responsive width
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
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid item xs={12} md={6}>
                <Typography>Asal Kota</Typography>
                <input
                  type="text"
                  name="asalKota"
                  value={formData.asalKota}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Nama</Typography>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} md={6}>
                <Typography>Nama Ajudan</Typography>
                <input
                  type="text"
                  name="namaAjudan"
                  value={formData.namaAjudan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Nomor Handphone</Typography>
                <input
                  type="tel"
                  name="nomorHandphone"
                  value={formData.nomorHandphone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} md={6}>
                <Typography>Tanggal Datang</Typography>
                <input
                  type="date"
                  name="tanggalDatang"
                  value={formData.tanggalDatang}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Waktu Datang</Typography>
                <input
                  type="time"
                  name="waktuDatang"
                  value={formData.waktuDatang}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>

              {/* Row 4 */}
              <Grid item xs={12} md={6}>
                <Typography>Pesawat</Typography>
                <input
                  type="text"
                  name="pesawat"
                  value={formData.pesawat}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Tanggal Pulang</Typography>
                <input
                  type="date"
                  name="tanggalPulang"
                  value={formData.tanggalPulang}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>

              {/* Row 5 */}
              <Grid item xs={12} md={6}>
                <Typography>Lokasi Menginap</Typography>
                <input
                  type="text"
                  name="lokasiMenginap"
                  value={formData.lokasiMenginap}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>Jumlah Rombongan</Typography>
                <input
                  type="number"
                  name="jumlahRombongan"
                  value={formData.jumlahRombongan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
                />
              </Grid>
            </Grid>

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