'use client';

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { fetchGambarData, Gambar } from "../utils/gambardata"; // Mengambil data dari API
import { saveAs } from 'file-saver'; // Pustaka untuk download file

const GalleryComponent = () => {
  // State
  const [images, setImages] = useState<Gambar[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mengambil data gambar dari API
    const getGambarData = async () => {
      try {
        const data = await fetchGambarData();
        setImages(data); // Menyimpan gambar ke state
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false); // Set loading selesai
      }
    };

    getGambarData();

    // Menambahkan animasi CSS ke dalam dokumen
    const styles = `      
      @keyframes moveRight {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes moveLeft {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      .animated-row {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
      }
      .row-right {
        animation: moveRight 20s linear infinite;
      }
      .row-left {
        animation: moveLeft 20s linear infinite;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Membersihkan gaya saat komponen di-unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Membagi gambar menjadi baris
  const generateRows = (images: Gambar[], rowTexts: string[]) => {
    const rows = [];
    let imageIndex = 0;

    for (let i = 0; i < rowTexts.length; i++) {
      const row = [];
      const textPosition = i % 2 === 0 ? 1 : 3; // Pola posisi teks

      for (let j = 0; j < 5; j++) {
        if (j === textPosition) {
          row.push({ type: "text", text: rowTexts[i] });
        } else {
          if (imageIndex < images.length) {
            row.push({ type: "image", image: images[imageIndex] });
            imageIndex++;
          }
        }
      }
      rows.push(row);
    }

    return rows;
  };

  // Teks baris
  const rowTexts = ["MUNAS", "APEKSI", "2025"];
  const rows = generateRows(images, rowTexts);

  // Fungsi untuk download gambar
  const downloadImage = (imageUrl: string) => {
    saveAs(imageUrl, 'image.jpg');
  };

  return (
    <>
      <Container maxWidth={false} sx={{ padding: 0 }}>
        <Box mb={4} position="relative">
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontFamily: "Plus Jakarta Sans", textAlign: "center" }}
          >
            Galeri APEKSI
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          rows.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              className={`animated-row ${
                rowIndex % 2 === 0 ? "row-right" : "row-left"
              }`}
            >
              <Grid container spacing={2} justifyContent="center">
                {row.map((item, index) => {
                  if (item.type === "text") {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={2.4} key={`text-${rowIndex}`}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "10px",
                            height: "150px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "5rem",
                              fontFamily: "Plus Jakarta Sans",
                              fontStyle: "italic",
                              fontWeight: "bold",
                              textAlign: "center",
                              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            {item.text}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  }

                  // Render gambar
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={2.4} key={item.image?.id}>
                      {item.image ? (
                        <Card
                          sx={{
                            borderRadius: "20px",
                            overflow: "hidden",
                          }}
                          onClick={() =>
                            setLightboxIndex(rowIndex * 5 + index)
                          }
                        >
                          <CardMedia
                            component="img"
                            alt={`Image ${index + 1}`}
                            image={item.image.url}
                            loading="lazy"
                            sx={{
                              objectFit: "cover",
                              width: "100%",
                              height: "150px",
                            }}
                          />
                        </Card>
                      ) : (
                        <Box>Image not available</Box>
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ))
        )}
      </Container>

      {lightboxIndex !== null && images.length > 0 && (
        <Lightbox
          mainSrc={images[lightboxIndex]?.url}
          nextSrc={images[(lightboxIndex + 1) % images.length]?.url}
          prevSrc={images[(lightboxIndex + images.length - 1) % images.length]?.url}
          onCloseRequest={() => setLightboxIndex(null)}
          onMovePrevRequest={() =>
            setLightboxIndex((lightboxIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setLightboxIndex((lightboxIndex + 1) % images.length)
          }
          toolbarButtons={[
            <Button
              key="download"
              variant="contained"
              color="primary"
              onClick={() => downloadImage(images[lightboxIndex]?.url)}
            >
              Download
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default GalleryComponent;
