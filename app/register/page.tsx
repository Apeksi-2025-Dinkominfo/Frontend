'use client';

import React, { useState } from 'react';
import {
  FormControlLabel,
  Checkbox,
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReCAPTCHA from 'react-google-recaptcha';

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
  EventParticipation: string[];
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
    EventParticipation: [],
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaChange = (value: string | null) => {
    setIsCaptchaVerified(!!value); // Set to true if reCAPTCHA value is not null
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Check if reCAPTCHA is verified
    if (!isCaptchaVerified) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please complete the CAPTCHA!',
      });
      return; // Prevent form submission if reCAPTCHA is not verified
    }

    // The rest of your handleSubmit logic here
    const tanggalKedatangan = new Date(
      `${formData.tanggal_kedatangan}T${formData.jam_kedatangan}:00`
    ).toISOString();

    const tanggalKepulangan = new Date(
      `${formData.tanggal_kepulangan}T00:00:00`
    ).toISOString();

    let payload: any = {
      tanggal_kedatangan: tanggalKedatangan,
      tanggal_kepulangan: tanggalKepulangan,
      jumlah_rombongan: Number(formData.jumlah_rombongan),
      asal_kota: formData.asal_kota,
      jam_kedatangan: formData.jam_kedatangan,
      lokasi_menginap: formData.lokasi_menginap,
      nama_ajudan: formData.nama_ajudan,
      nomor_handphone: formData.nomor_handphone,
      transportasi: formData.transportasi,
      ukuran_baju_ibuk: formData.ukuran_baju_ibuk,
      ukuran_baju_bapak: formData.ukuran_baju_bapak,
    };

    if (selectedTab === 'OPTD') {
      payload = {
        ...payload,
        nama: formData.nama,
        instansi: formData.instansi,
        jabatan: formData.jabatan,
        nama_unit_kerja: formData.nama_unit_kerja,
        EventParticipation: formData.EventParticipation.join(', '),
      };
    } else {
      payload.nama_walikota = formData.nama_walikota;
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

      Swal.fire({
        title: 'Success!',
        text: 'Form submitted successfully!',
        icon: 'success',
      }).then(() => {
        showTicketPopup();
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

  // Function to show ticket popup
  const showTicketPopup = () => {
    Swal.fire({
      title: 'Your Registration Ticket',
      html: renderTicketContent(),
      showCancelButton: false,
      showConfirmButton: false,
      footer: `
      <button id="download-ticket" class="swal2-styled">Download Ticket</button>
      <button id="finish" class="swal2-styled">Finish</button>
    `,
      didOpen: () => {
        document
          .getElementById('download-ticket')
          ?.addEventListener('click', downloadTicket);
        document.getElementById('finish')?.addEventListener('click', () => {
          Swal.close(); // Close the popup
          router.push('/'); // Redirect to the home page
        });
      },
    });
  };

  const renderTicketContent = () => `
  <div id="ticket-content" style="text-align: left; font-family: Arial, sans-serif; padding: 20px; width: 300px; height: 533px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
    <p style="font-size: 12px; color: #333; margin-bottom: 5px;">[${
      formData.tanggal_kedatangan
    }][${formData.tanggal_kepulangan}][${formData.transportasi}]</p>
    <div style="text-align: center; margin-top: 10px;">
      <h3 style="color: #e60000; font-size: 18px; font-weight: bold;">E-Ticket</h3>
    </div>
    <div style="text-align: center; margin-top: 10px;">
      <p style="margin: 8px 0 4px; font-size: 12px;">Kontingen: <span style="font-weight: bold;">${
        formData.asal_kota
      }</span></p>
      <p style="font-size: 12px; font-weight: bold; margin-top: 4px;">
        ${selectedTab === 'OPTD' ? formData.nama : formData.nama_walikota}
      </p>
      <div style="margin: 20px auto; text-align: center;">
        <img src="/logoNew.png" alt="QR Code" style="width: 100px; height: 100px; display: block; margin: 0 auto;" />
      </div>
      <p style="font-size: 12px; font-weight: bold; margin-bottom: 0;">Apeksi ke-7 <p style="font-size: 12px; font-weight: light; margin-bottom: 0;">5 - 11 Mei 2025</p> </p>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; margin-top: 10px; font-size: 12px;">
      <span style="margin-right: 5px;">📍</span>
      <p style="margin: 0; font-weight: bold; color: #333;">${
        formData.asal_kota
      }</p>
    </div>
    <p style="font-size: 10px; color: #555; text-align: center;">Stadium Utama Gelora Bung Karno. Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang</p>

    <div style="margin-top: 15px; text-align: center; font-size: 12px; color: #333;">
      ${
        selectedTab === 'OPTD'
          ? `
        <p>Terima kasih telah berpartisipasi dalam acara ini. Anda mengikuti acara: ${formData.EventParticipation.join(
          ', '
        )}.</p>
        <p>Tiket ini adalah tiket resmi dan wajib ditunjukkan saat memasuki venue.</p>
      `
          : `
        <p>Terima kasih atas partisipasi Anda. Kami mengapresiasi kehadiran Anda dalam acara ini.</p>
        <p>Silakan tunjukkan tiket ini saat Anda tiba di venue.</p>
      `
      }
    </div>
  </div>
`;

  // Function to download ticket as PDF
  const downloadTicket = async () => {
    const ticketContent = document.getElementById('ticket-content');

    if (ticketContent) {
      // Convert the ticket content to a canvas
      const canvas = await html2canvas(ticketContent, { scale: 2 }); // Increase scale for better resolution
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF with custom dimensions (9:16 aspect ratio)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px', // Set units to pixels to work directly with the canvas dimensions
        format: [1080, 1920], // Set the PDF size to 9:16 ratio
      });

      // Add the image with adjusted dimensions to fit the 9:16 PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Cover the entire PDF page

      // Save the PDF
      pdf.save('registration_ticket.pdf');
    }
  };

  const handleEventParticipationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      const { EventParticipation } = prevFormData;

      return {
        ...prevFormData,
        EventParticipation: checked
          ? [...EventParticipation, value]
          : EventParticipation.filter((event) => event !== value),
      };
    });
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
          }}
        >
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab value="Walikota" label="Walikota/Wakil Walikota/Sekda" />
            <Tab value="OPTD" label="Pejabat Yang Mewakili" />
          </Tabs>

          <form onSubmit={handleSubmit} className="mt-8">
            <Grid container spacing={2} className="text-body">
              {/* Checkbox Section for OPTD */}
              {selectedTab === 'OPTD' && (
                <Grid item xs={12}>
                  <Typography align="left">
                    Akan Mengikuti Side Event :{' '}
                  </Typography>
                  {['Fun Run', 'Tanam Pohon', 'Pentas Seni', 'ladies program', 'karnaval','youth city change'].map((event) => (
                    <FormControlLabel
                      key={event}
                      control={
                        <Checkbox
                          value={event}
                          checked={formData.EventParticipation.includes(event)}
                          onChange={handleEventParticipationChange}
                        />
                      }
                      label={event}
                    />
                  ))}
                </Grid>
              )}

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
                  {selectedTab === 'OPTD'
                    ? 'Nama (Beserta Gelar)'
                    : 'Nama Walikota (Beserta Gelar)'}
                </Typography>
                <input
                  type="text"
                  name={selectedTab === 'OPTD' ? 'nama' : 'nama_walikota'}
                  value={
                    selectedTab === 'OPTD'
                      ? formData.nama
                      : formData.nama_walikota || ''
                  }
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                />
              </Grid>

              {/* Additional inputs for OPTD */}
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
                        onChange={
                          handleChange as React.ChangeEventHandler<
                            HTMLInputElement | HTMLTextAreaElement
                          >
                        }
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
                <select
                  name="transportasi"
                  value={formData.transportasi}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="" disabled>
                    Pilih transportasi
                  </option>
                  <option value="mobil dinas">Mobil Dinas</option>
                  <option value="kereta api">Kereta Api</option>
                  <option value="pesawat">Pesawat</option>
                  <option value="bus">Bus</option>
                  <option value="kapal">Kapal</option>
                </select>
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

              {selectedTab === 'Walikota' &&
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography align="left">Ukuran Baju Pejabat</Typography>
                      <input
                        name="ukuran_baju_bapak"
                        value={formData.ukuran_baju_bapak}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography align="left">
                        Ukuran Baju Istri / Suami Pejabat
                      </Typography>
                      <input
                        name="ukuran_baju_ibuk"
                        value={formData.ukuran_baju_ibuk}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </Grid>
                  </>
                }

              {selectedTab === 'OPTD' &&
                formData.EventParticipation.includes('Tanam Pohon') && (
                  <>
                    <Grid item xs={12} md={6}>
                      <Typography align="left">Ukuran Baju Pejabat</Typography>
                      <input
                        name="ukuran_baju_bapak"
                        value={formData.ukuran_baju_bapak}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography align="left">
                        Ukuran Baju Istri / Suami Pejabat
                      </Typography>
                      <input
                        name="ukuran_baju_ibuk"
                        value={formData.ukuran_baju_ibuk}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </Grid>
                  </>
                )}

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
                <ReCAPTCHA
                  sitekey="6LcWZmkqAAAAABGoSosV4d1ul_xDi9BCqlKvpXju" // Replace with your actual site key
                  onChange={handleCaptchaChange}

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

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                  style={{ marginTop: '8px' }}
                >
                  Jangan lupa untuk download tiket yang sudah didapatkan dan
                  tunjukkan di venue saat acara. Jika lupa untuk download,
                  segera mungkin hubungi kami.
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
