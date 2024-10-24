'use client';

import React, { useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import { City } from '../utils/listKota';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface FormData {
  asal_kota: string;
  nama_walikota?: string;
  nama_ajudan: string;
  nomor_handphone: string;
  tanggal_kedatangan: string;
  jam_kedatangan: string;
  pesawat: string;
  tanggal_kepulangan: string;
  lokasi_menginap: string;
  jumlah_rombongan: string;
  instansi?: string;
  jabatan?: string;
  nama_unit_kerja?: string;
  nama?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    asal_kota: '',
    nama_ajudan: '',
    nomor_handphone: '',
    tanggal_kedatangan: '',
    jam_kedatangan: '',
    pesawat: '',
    tanggal_kepulangan: '',
    lokasi_menginap: '',
    jumlah_rombongan: '',
    instansi: '',
    jabatan: '',
    nama_unit_kerja: '',
    nama: '',
  });

  const [userType, setUserType] = useState<'walikota' | 'optd'>('walikota');
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const tanggalKedatangan = new Date(
      `${formData.tanggal_kedatangan}T${formData.jam_kedatangan}:00`
    ).toISOString();
    const tanggalKepulangan = new Date(
      `${formData.tanggal_kepulangan}T00:00:00`
    ).toISOString();

    let payload = {
      ...formData,
      tanggal_kedatangan: tanggalKedatangan,
      tanggal_kepulangan: tanggalKepulangan,
      jumlah_rombongan: Number(formData.jumlah_rombongan),
    };

    if (userType === 'optd') {
      payload = {
        ...payload,
        nama: formData.nama,
        instansi: formData.instansi,
        jabatan: formData.jabatan,
        nama_unit_kerja: formData.nama_unit_kerja,
      };
    } else {
      delete payload.nama;
      delete payload.instansi;
      delete payload.jabatan;
      delete payload.nama_unit_kerja;
    }

    const endpoint =
      userType === 'optd' ? 'http://localhost:5000/optd' : 'http://localhost:5000/peserta';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Failed to submit data');
      }

      Swal.fire({
        title: 'Success!',
        text: 'Form submitted successfully!',
        icon: 'success',
      }).then(() => {
        router.push('/');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          component="img"
          src="/logoNew.png"
          alt="Medium Image"
          sx={{ width: '90%', maxHeight: '90%', objectFit: 'contain' }}
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
          sx={{
            width: { xs: '100%', md: 600 },
            p: 4,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
            position: 'relative', // to position "Tipe Pendaftaran" inside the form
          }}
        >
          {/* Tipe Pendaftaran di kanan atas */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography align="left">Tipe Pendaftaran</Typography>
            <select
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value as 'walikota' | 'optd')}
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="walikota">Walikota</option>
              <option value="optd">Pejabat Daerah</option>
            </select>
          </Box>

          <Typography variant="h5" align="left" gutterBottom className="font-bold text-body mb-11">
            {userType === 'optd' ? 'Register for OPTD' : 'Register'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography align="left">Asal Kota</Typography>
                <select
                  name="asal_kota"
                  value={formData.asal_kota}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all mt-3"
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

              <Grid item xs={12} md={6}>
                <Typography align="left">
                  {userType === 'optd'
                    ? 'Nama (Lengkap dengan Gelar)'
                    : 'Nama Walikota (Lengkap dengan Gelar)'}
                </Typography>
                <input
                  type="text"
                  name={userType === 'optd' ? 'nama' : 'nama_walikota'}
                  value={userType === 'optd' ? formData.nama : formData.nama_walikota || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              {/* Other form fields */}
              {userType === 'optd' && (
                <>
                  {/* Additional Fields for OPTD */}
                  {[
                    { label: 'Instansi', name: 'instansi', type: 'text' },
                    { label: 'Jabatan', name: 'jabatan', type: 'text' },
                    { label: 'Nama Unit Kerja', name: 'nama_unit_kerja', type: 'text' },
                  ].map((input) => (
                    <Grid item xs={12} md={6} key={input.name}>
                      <Typography align="left">{input.label}</Typography>
                      <input
                        type={input.type}
                        name={input.name}
                        value={formData[input.name as keyof FormData]}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </Grid>
                  ))}
                </>
              )}

              {[
                { label: 'Nomor Handphone Ajudan', name: 'nomor_handphone', type: 'tel' },
                { label: 'Kendaraan', name: 'pesawat', type: 'text' },
                { label: 'Nama Ajudan', name: 'nama_ajudan', type: 'text' },
                { label: 'Tanggal Kedatangan', name: 'tanggal_kedatangan', type: 'date' },
                { label: 'Jam Kedatangan', name: 'jam_kedatangan', type: 'time' },
                { label: 'Tanggal Kepulangan', name: 'tanggal_kepulangan', type: 'date' },
                { label: 'Lokasi Menginap', name: 'lokasi_menginap', type: 'text' },
                { label: 'Jumlah Rombongan', name: 'jumlah_rombongan', type: 'number' },
              ].map((input) => (
                <Grid item xs={12} md={6} key={input.name}>
                  <Typography align="left">{input.label}</Typography>
                  <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name as keyof FormData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, bgcolor: '#1B82D1', '&:hover': { bgcolor: '#1565c0' } }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
