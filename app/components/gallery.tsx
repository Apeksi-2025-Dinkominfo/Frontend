"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardMedia, Link, Container } from "@mui/material";
import { fetchGambarData, Gambar } from "../utils/gambardata";

const GalleryComponent = () => {
  const [images, setImages] = useState<Gambar[]>([]);

  useEffect(() => {
    const getGambarData = async () => {
      const data = await fetchGambarData();
      setImages(data);
      console.log(data);
    };

    getGambarData();
  }, []);

  return (
    <>
{/* Gambar Batik Full Width */}
<Box
  sx={{
    backgroundImage: "url('/kintirkintiran4.png')",
    backgroundSize: "cover", // Agar gambar memenuhi lebar penuh
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100vw", // Lebar penuh halaman
    height: "200px", // Sesuaikan tinggi sesuai kebutuhan
    marginBottom: "50px", // Tambahkan jarak ke bawah agar tidak menempel
  }}
></Box>

{/* Kontainer untuk Galeri */}
<Container maxWidth="lg" sx={{ marginTop: "50px" }}> {/* Tambahkan jarak ke atas di kontainer galeri */}
  {/* Bagian Header */}
  <Box mb={2} position="relative">
    {/* Judul Galeri */}
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      <Typography variant="h4" fontWeight="bold" color="#227B94">
        Galeri APEKSI
      </Typography>
      <Link
        href="/Gallery"
        sx={{
          fontSize: "16px",
          color: "#78B7D0",
          textDecoration: "underline",
          transition: "color 0.3s ease",
          "&:hover": {
            color: "#227B94",
          },
        }}
      >
        Lihat semua
      </Link>
    </Box>
  </Box>

  {/* Grid Gambar */}
  <Grid container spacing={4}>
    {images.map((image, index) => (
      <Grid item xs={6} sm={4} md={2.4} key={index}>
        <Card sx={{ borderRadius: "30px", overflow: "hidden" }}>
          <CardMedia
            component="img"
            alt={image.photoType}
            height="150"
            image={image.url}
            sx={{ objectFit: "cover" }}
          />
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>
    </>
  );
};

export default GalleryComponent;
