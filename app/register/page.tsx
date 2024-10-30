'use client';

import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
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
  transportasi: string;
  tanggal_kepulangan: string;
  lokasi_menginap: string;
  jumlah_rombongan: string;
  instansi?: string;
  jabatan?: string;
  nama_unit_kerja?: string;
  nama?: string;
  ukuran_baju_ibuk?: string;
  ukuran_baju_bapak?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    asal_kota: '',
    nama_ajudan: '',
    nomor_handphone: '',
    tanggal_kedatangan: '',
    jam_kedatangan: '',
    transportasi: '',
    tanggal_kepulangan: '',
    lokasi_menginap: '',
    jumlah_rombongan: '',
    instansi: '',
    jabatan: '',
    nama_unit_kerja: '',
    nama: '',
    ukuran_baju_ibuk: '',
    ukuran_baju_bapak: '',
  });

  const [selectedTab, setSelectedTab] = useState('Walikota');
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setSelectedTab(newValue);
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

    let payload = {
      ...formData,
      tanggal_kedatangan: tanggalKedatangan,
      tanggal_kepulangan: tanggalKepulangan,
      jumlah_rombongan: Number(formData.jumlah_rombongan),
    };

    if (selectedTab === 'OPTD') {
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
      selectedTab === 'OPTD'
        ? 'http://localhost:5000/optd'
        : 'http://localhost:5000/peserta';

    try {
      console.log('Payload:', payload);

      const response = await fetch(endpoint, {
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
        nama_ajudan: '',
        nomor_handphone: '',
        tanggal_kedatangan: '',
        jam_kedatangan: '',
        transportasi: '',
        tanggal_kepulangan: '',
        lokasi_menginap: '',
        jumlah_rombongan: '',
        instansi: '',
        jabatan: '',
        nama_unit_kerja: '',
        nama: '',
        ukuran_baju_ibuk: '',
        ukuran_baju_bapak: '',
      });

      Swal.fire({
        title: 'Success!',
        text: 'Form submitted successfully!',
        icon: 'success',
      }).then(() => {
        router.push('/');
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
          src="/apeksi.png"
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
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
          >
            <Tab value="Walikota" label="Walikota / Wakil Walikota" />
            <Tab value="OPTD" label="Pejabat Yang Mewakili" />
          </Tabs>

          <form onSubmit={handleSubmit} className='mt-8'>
            <Grid container spacing={2} className="text-body">
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

              <Grid item xs={12} md={6}>
                <Typography align="left">
                  {selectedTab === 'OPTD' ? 'Nama (Beserta Gelar)' : 'Nama Walikota (Beserta Gelar)'}
                </Typography>
                <input
                  type="text"
                  name={selectedTab === 'OPTD' ? 'nama' : 'nama_walikota'}
                  value={selectedTab === 'OPTD' ? formData.nama : formData.nama_walikota || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              {selectedTab === 'OPTD' && (
                <>
                  {[
                    { label: 'Instansi', name: 'instansi' },
                    { label: 'Jabatan', name: 'jabatan' },
                    { label: 'Nama Unit Kerja', name: 'nama_unit_kerja' },
                  ].map((input) => (
                    <Grid item xs={12} md={6} key={input.name}>
                      <Typography align="left">{input.label}</Typography>
                      <TextField
                        name={input.name}
                        value={formData[input.name as keyof FormData]}
                        onChange={handleChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}
                        fullWidth
                        required
                      />
                    </Grid>
                  ))}
                </>
              )}

              <Grid item xs={12} md={6}>
                <Typography align="left">Nomor Ajudan</Typography>
                <input
                  type="text"
                  name="nomor_handphone"
                  value={formData.nomor_handphone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">Nama Ajudan</Typography>
                <input
                  type="text"
                  name="nama_ajudan"
                  value={formData.nama_ajudan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">Transportasi</Typography>
                <input
                  type="text"
                  name="transportasi"
                  value={formData.transportasi}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">Tanggal Kedatangan</Typography>
                <input
                  type="date"
                  name="tanggal_kedatangan"
                  value={formData.tanggal_kedatangan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">Jam Kedatangan</Typography>
                <input
                  type="time"
                  name="jam_kedatangan"
                  value={formData.jam_kedatangan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">Tanggal Kepulangan</Typography>
                <input
                  type="date"
                  name="tanggal_kepulangan"
                  value={formData.tanggal_kepulangan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">Tempat Menginap</Typography>
                <input
                  type="text"
                  name="lokasi_menginap"
                  value={formData.lokasi_menginap}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">Ukuran Baju Walikota/Wakil</Typography>
                <input
                  name="ukuran_baju_bapak"
                  value={formData.ukuran_baju_bapak}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">Ukuran Baju Istri</Typography>
                <input
                  name="ukuran_baju_ibuk"
                  value={formData.ukuran_baju_ibuk}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography align="left">
                  Jumlah Rombongan yang dibawa
                </Typography>
                <input
                  type="number"
                  name="jumlah_rombongan"
                  value={formData.jumlah_rombongan}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="bg-blue-500 text-white hover:bg-blue-600"
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
