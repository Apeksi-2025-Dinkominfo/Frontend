'use client';
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Impor Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 

const VideoGallery = () => {
  // Daftar video
  const videos = [
    "/fix.mp4",
    "/fix.mp4",
    "/fix.mp4",
    "/fix.mp4",
    "/fix.mp4",
    "/fix.mp4",
  ];

  // State untuk video yang sedang diputar
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi navigasi video utama
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box>
      {/* Container Card Abu-Abu (Video Utama) */}
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
          borderRadius: "15px",
        }}
      >
        {/* Judul */}
        <Typography
          variant="h4"
          sx={{
            marginBottom: "24px",
            fontSize: { xs: "40px", md: "60px" },
            fontWeight: "bold",
            color: "#FF8C00",
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          Alun Alun Kota Surabaya
        </Typography>

        {/* Video Utama */}
        <Box sx={{ position: "relative", display: "inline-block", width: "100%" }}>
          <video
            key={currentIndex}
            controls
            style={{
              width: "100%",
              borderRadius: "15px",
            }}
          >
            <source src={videos[currentIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Tombol Navigasi */}
          <Button
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: "-40px",
              transform: "translateY(-50%)",
              backgroundColor: "#FF8C00",
              color: "#FFF",
              minWidth: "40px",
              height: "40px",
              padding: 0,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#FFA500",
              },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </Button>

          <Button
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "-40px",
              transform: "translateY(-50%)",
              backgroundColor: "#FF8C00",
              color: "#FFF",
              minWidth: "40px",
              height: "40px",
              padding: 0,
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#FFA500",
              },
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </Button>
        </Box>
      </Box>

      {/* Thumbnail Section (Card Biru dengan Swiper) */}
      <Box
        sx={{
          backgroundColor: "#002E5F",
          padding: "40px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <Swiper
          spaceBetween={60} // Jarak antar slide
          slidesPerView={4} // Jumlah slide yang terlihat
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={index}>
              <Box
                onClick={() => setCurrentIndex(index)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  border: index === currentIndex ? "3px solid #FFA500" : "none",
                  overflow: "hidden", // Supaya video tidak keluar dari card
                }}
              >
                <video
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default VideoGallery;
