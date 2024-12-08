'use client';
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
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
      {/* Gambar Header Full Width */}
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
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {/* Gambar pertama */}
          {images.length > 0 && (
            <>
              <Grid item xs={2}>
                <Card sx={{ borderRadius: "20px", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    alt={images[0].photoType}
                    image={images[0].url}
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      aspectRatio: "1/1",
                    }}
                  />
                </Card>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: "'Georgia', serif",
                    fontStyle: "italic",
                    color: "#227B94",
                  }}
                >
                  Bangga
                </Typography>
              </Grid>
            </>
          )}

          {/* Gambar lainnya */}
          {images.slice(1, 4).map((image, index) => (
            <Grid key={index} item xs={2}>
              <Card sx={{ borderRadius: "20px", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  alt={image.photoType}
                  image={image.url}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1/1",
                  }}
                />
              </Card>
            </Grid>
          ))}

          {/* Baris kedua */}
          {images.slice(4, 7).map((image, index) => (
            <Grid key={index} item xs={2}>
              <Card sx={{ borderRadius: "20px", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  alt={image.photoType}
                  image={image.url}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1/1",
                  }}
                />
              </Card>
            </Grid>
          ))}
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                color: "#227B94",
                'letter-spacing': '-0.05em',
              }}
            >
              Menyapa
            </Typography>
          </Grid>

          {/* Baris ketiga */}
          {images.slice(7).map((image, index) => (
            <Grid key={index} item xs={2}>
              <Card sx={{ borderRadius: "20px", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  alt={image.photoType}
                  image={image.url}
                  sx={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1/1",
                  }}
                />
              </Card>
            </Grid>
          ))}
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                color: "#227B94",
              }}
            >
              Warga
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GalleryComponent;
