'use client';
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { fetchGambarData, Gambar } from "../utils/gambardata";

const GalleryComponent = () => {
  const [images, setImages] = useState<Gambar[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGambarData = async () => {
      const data = await fetchGambarData();
      setImages(data);
      setLoading(false); // Stop loading
    };

    getGambarData();

    // Injecting styles dynamically for animations
    const styles = `
      @keyframes moveRight {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      @keyframes moveLeft {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      @keyframes moveRightFast {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      .animated-row {
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
      }

      .row-1 {
        animation: moveRight 20s linear infinite;
      }

      .row-2 {
        animation: moveLeft 20s linear infinite;
      }

      .row-3 {
        animation: moveRight 20s linear infinite; /* Faster animation */
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <>
      {/* Header Background */}
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

      {/* Gallery Container */}
      <Container maxWidth={false} sx={{ padding: 0 }}>
        {/* Section Title */}
        <Box mb={4} position="relative">
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#227B94"
            sx={{ fontFamily: "serif", textAlign: "center" }}
          >
            Galeri APEKSI
          </Typography>
        </Box>

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : images && images.length > 0 ? (
          <>
            {/* Row 1 */}
            <Box className="animated-row row-1">
              {images.slice(0, 4).map((image, index) => (
                <Card
                  key={index}
                  sx={{ borderRadius: "20px", overflow: "hidden", margin: "0 10px 20px 0" }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <CardMedia
                    component="img"
                    alt={image.photoType || `Image ${index + 1}`}
                    image={image.url}
                    loading="lazy"
                    sx={{
                      objectFit: "cover",
                      width: "300px",
                      height: "150px",
                      // aspectRatio: "20/10",
                    }}
                  />
                </Card>
              ))}
              <Typography className="gallery-title" fontSize="7rem" sx={{ position: "absolute", bottom: 10, left: "74%", transform: "translateX(-30%)", fontFamily: "serif", color: "#227B94", fontWeight: "bold" }}>
                MUNAS
              </Typography>
            </Box>

            {/* Row 2 */}
            <Box className="animated-row row-2">
              {images.slice(4, 8).map((image, index) => (
                <Card
                  key={index}
                  sx={{ borderRadius: "20px", overflow: "hidden", margin: "0 10px 20px 0" }}
                  onClick={() => setLightboxIndex(index + 4)}
                >
                  <CardMedia
                    component="img"
                    alt={image.photoType || `Image ${index + 5}`}
                    image={image.url}
                    loading="lazy"
                    sx={{
                      objectFit: "cover",
                      width: "300px",
                      height: "150px",
                    }}
                  />
                </Card>
              ))}
              <Typography className="gallery-title" fontSize="7rem" sx={{ position: "absolute", bottom: 20, left: "74%", transform: "translateX(-30%)", fontFamily: "serif", color: "#227B94", fontWeight: "bold" }}>
                APEKSI
              </Typography>
            </Box>

            {/* Row 3 */}
            <Box className="animated-row row-3">
              {images.slice(8, 12).map((image, index) => (
                <Card
                  key={index}
                  sx={{ borderRadius: "20px", overflow: "hidden", margin: "0 10px 20px 0" }}
                  onClick={() => setLightboxIndex(index + 8)}
                >
                  <CardMedia
                    component="img"
                    alt={image.photoType || `Image ${index + 9}`}
                    image={image.url}
                    loading="lazy"
                    sx={{
                      objectFit: "cover",
                      width: "300px",
                      height: "150px",
                    }}
                  />
                </Card>
              ))}
              <Typography className="gallery-title" fontSize="7rem" sx={{ position: "absolute", bottom: 20, left: "74%", transform: "translateX(-50%)", fontFamily: "serif", color: "#227B94", fontWeight: "bold" }}>
                2025
              </Typography>
            </Box>
          </>
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", color: "#aaa" }}>
            Gambar tidak tersedia
          </Typography>
        )}
      </Container>

      {/* Lightbox for Image Preview */}
      {lightboxIndex !== null && (
        <Lightbox
          mainSrc={images[lightboxIndex].url}
          nextSrc={images[(lightboxIndex + 1) % images.length].url}
          prevSrc={images[(lightboxIndex + images.length - 1) % images.length].url}
          onCloseRequest={() => setLightboxIndex(null)}
          onMovePrevRequest={() =>
            setLightboxIndex((lightboxIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setLightboxIndex((lightboxIndex + 1) % images.length)
          }
        />
      )}
    </>
  );
};

export default GalleryComponent;


