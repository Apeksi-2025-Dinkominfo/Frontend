'use client';
import React, { useEffect, useState } from "react";
import { Box, Typography, Link, Container, Grid, Card, CardMedia } from "@mui/material";
import { fetchGambarData, Gambar } from "../utils/gambardata";

const GalleryComponent = () => {
  const [images, setImages] = useState<Gambar[]>([]);

  useEffect(() => {
    const getGambarData = async () => {
      const data = await fetchGambarData();
      setImages(data);
    };

    getGambarData();
  }, []);

  // Kata-kata untuk disisipkan
  const words = ["Bangga", "Menyapa", "Warga"];

  return (
    <>
      {/* Gambar Batik Full Width */}
      <Box
        sx={{
          backgroundImage: "url('/kintirkintiran4.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100vw",
          height: "200px",
          marginBottom: "50px",
        }}
      ></Box>

      {/* Kontainer Galeri */}
      <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
        {/* Bagian Header Galeri */}
        <Box mb={4} position="relative">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#227B94"
              sx={{ fontFamily: "serif" }}
            >
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
        <Grid container spacing={1}>
          {images.map((image, index) => (
            <React.Fragment key={index}>
              {/* Setiap gambar */}
              <Grid item xs={6} sm={4} md={2.5}>
                <Card sx={{ borderRadius: "30px", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    alt={image.photoType}
                    image={image.url}
                    sx={{
                      objectFit: "cover",
                      aspectRatio: "1 / 1", // Pastikan gambar berbentuk persegi
                      width: "100%",
                    }}
                  />
                </Card>
              </Grid>

              {/* Sisipkan kata setiap dua kartu */}
              {index % 2 === 1 && (
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="#227B94"
                    sx={{
                      textAlign: "center",
                      fontFamily: "serif",
                      marginY: "20px",
                    }}
                  >
                    {words[Math.floor(index / 2) % words.length]}
                  </Typography>
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default GalleryComponent;
