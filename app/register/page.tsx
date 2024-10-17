'use client';

import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
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


  const [isOPTD, setIsOPTD] = useState(false);
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
  
    // Remove jam_kedatangan from the payload, as it's not necessary
    let payload = {
      ...formData,
      tanggal_kedatangan: tanggalKedatangan,
      tanggal_kepulangan: tanggalKepulangan,
      jumlah_rombongan: Number(formData.jumlah_rombongan),
    };
  
    if (isOPTD) {
      payload = {
        ...payload,
        nama: formData.nama,
        instansi: formData.instansi,
        jabatan: formData.jabatan,
        nama_unit_kerja: formData.nama_unit_kerja,
      };
    } else {
      // Remove OPTD-specific fields if not registering as OPTD
      delete payload.nama;
      delete payload.instansi;
      delete payload.jabatan;
      delete payload.nama_unit_kerja;
    }
  
    const endpoint = isOPTD
      ? 'http://localhost:5000/optd'
      : 'http://localhost:5000/peserta';
  
    try {
      console.log('Payload:', payload); // Log the payload before sending
  
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
        pesawat: '',
        tanggal_kepulangan: '',
        lokasi_menginap: '',
        jumlah_rombongan: '',
        instansi: '',
        jabatan: '',
        nama_unit_kerja: '',
        nama: '',
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
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            align="left"
            gutterBottom
            className="font-bold text-body mb-11"
          >
            {isOPTD ? 'Register for OPTD' : 'Register'}
          </Typography>

          <FormControlLabel
            control={
              <Checkbox checked={isOPTD} onChange={() => setIsOPTD(!isOPTD)} />
            }
            label="Register as OPTD"
            sx={{ mb: 2, display: 'block', textAlign: 'left' }}
          />

          <form onSubmit={handleSubmit}>
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
                  {isOPTD ? 'Nama' : 'Nama Walikota'}
                </Typography>
                <input
                  type="text"
                  name={isOPTD ? 'nama' : 'nama_walikota'}
                  value={isOPTD ? formData.nama : formData.nama_walikota || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              {isOPTD && (
                <>
                  {[
                    { label: 'Instansi', name: 'instansi', type: 'text' },
                    { label: 'Jabatan', name: 'jabatan', type: 'text' },
                    {
                      label: 'Nama Unit Kerja',
                      name: 'nama_unit_kerja',
                      type: 'text',
                    },
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
                {
                  label: 'Nomor Handphone',
                  name: 'nomor_handphone',
                  type: 'tel',
                },
                { label: 'Pesawat', name: 'pesawat', type: 'text' },
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

              {/* Date fields */}
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
                <Typography align="left">Lokasi Menginap</Typography>
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
                <Typography align="left">Jumlah Rombongan</Typography>
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