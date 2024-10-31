'use client';

import React, { useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import { City } from '../utils/listKota';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
interface FormData {
  asal_kota: string;
  nama_walikota: string;
  nama_ajudan: string;
  nomor_handphone: string;
  tanggal_kedatangan: string;
  jam_kedatangan: string;
  pesawat: string;
  tanggal_kepulangan: string;
  lokasi_menginap: string;
  jumlah_rombongan: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    asal_kota: '',
    nama_walikota: '',
    nama_ajudan: '',
    nomor_handphone: '',
    tanggal_kedatangan: '',
    jam_kedatangan: '',
    pesawat: '',
    tanggal_kepulangan: '',
    lokasi_menginap: '',
    jumlah_rombongan: '',
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    if (name === 'asal_kota') {
      setFormData({
        ...formData,
        [name]: value as City,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const tanggalKedatangan = new Date(
      `${formData.tanggal_kedatangan}T${formData.jam_kedatangan}:00`
    ).toISOString();
    const tanggalKepulangan = new Date(
      `${formData.tanggal_kepulangan}T00:00:00`
    ).toISOString();

    const payload = {
      asal_kota: formData.asal_kota,
      nama_walikota: formData.nama_walikota,
      nama_ajudan: formData.nama_ajudan,
      nomor_handphone: formData.nomor_handphone,
      jam_kedatangan: formData.jam_kedatangan,
      pesawat: formData.pesawat,
      tanggal_kepulangan: tanggalKepulangan,
      lokasi_menginap: formData.lokasi_menginap,
      jumlah_rombongan: Number(formData.jumlah_rombongan),
      tanggal_kedatangan: tanggalKedatangan,
    };

    try {
      const response = await fetch('http://localhost:5000/peserta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        throw new Error('Failed to submit data');
      }

      const result = await response.json();
      console.log('Form Submitted Successfully:', result);

      setFormData({
        asal_kota: '',
        nama_walikota: '',
        nama_ajudan: '',
        nomor_handphone: '',
        tanggal_kedatangan: '',
        jam_kedatangan: '',
        pesawat: '',
        tanggal_kepulangan: '',
        lokasi_menginap: '',
        jumlah_rombongan: '',
      });

      Swal.fire({
        title: "Selamat Datang Rek!",
        text: "Anda Terdaftar di Munas 2025!",
        icon: "success"
      }).then(() => {
        router.push('/'); 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
        {/* <Box
          component="img"
          src="/sby.png"
          alt="Logo"
          sx={{
            width: 50,
            height: 'auto',
            mb: 3,
          }}
        /> */}

        <Box
          sx={{
            width: { xs: '100%', md: 600 },
            p: 4,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" align="left" gutterBottom className='font-bold text-body mb-11'>
            Register
          </Typography> 

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} className='text-body'>
              <Grid item xs={12} md={6}>
                <Typography align="left">Asal Kota</Typography>
                <select
                  name="asal_kota"
                  value={formData.asal_kota}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="" disabled>
                    Select Kota
                  </option>
                  {Object.values(City).map((kota) => (
                    <option key={kota} value={kota}>
                      {kota.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </Grid>

              {[
                {
                  label: 'Nama Walikota',
                  name: 'nama_walikota',
                  type: 'text',
                  required: true,
                },
                { label: 'Nama Ajudan', name: 'nama_ajudan', type: 'text' },
                {
                  label: 'Nomor Handphone',
                  name: 'nomor_handphone',
                  type: 'tel',
                  required: true,
                },
                {
                  label: 'Tanggal Datang',
                  name: 'tanggal_kedatangan',
                  type: 'date',
                  required: true,
                },
                {
                  label: 'Waktu Datang',
                  name: 'jam_kedatangan',
                  type: 'time',
                  required: true,
                },
                { label: 'Pesawat', name: 'pesawat', type: 'text' },
                {
                  label: 'Tanggal Pulang',
                  name: 'tanggal_kepulangan',
                  type: 'date',
                  required: true,
                },
                {
                  label: 'Lokasi Menginap',
                  name: 'lokasi_menginap',
                  type: 'text',
                },
                {
                  label: 'Jumlah Rombongan',
                  name: 'jumlah_rombongan',
                  type: 'number',
                  required: true,
                },
              ].map((input) => (
                <Grid item xs={12} md={6} key={input.name}>
                  <Typography align="left">{input.label}</Typography>
                  <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name as keyof FormData]}
                    onChange={handleChange}
                    required={input.required}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              type="submit"
              variant="contained"
              className='bg-second'
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
