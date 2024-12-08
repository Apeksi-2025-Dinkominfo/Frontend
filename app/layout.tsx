'use client';

import './globals.css';
import NavLogo from './components/navbarLogo';
import Footerr from './components/footer';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import AnimatedImage from './components/layout';
import MobileNavbar from './components/mobileNav';
import AdminSidebar from './components/sidebar';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import brokenPhoneImage from '../public/hp.png'; // Sesuaikan path jika diperlukan

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin'); // Cek jika ini halaman admin
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk kontrol sidebar

  const handleToggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Fungsi toggle sidebar

  // Media query untuk deteksi perangkat
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>
        {/* Navbar hanya untuk halaman non-admin */}
        {!isAdminPage && (
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              backgroundColor: 'white',
            }}
          >
            <NavLogo />
          </Box>
        )}

        {/* Konten utama */}
        <Box sx={{ marginLeft: isAdminPage && !isMobile ? '250px' : '0' }}>
          {isAdminPage ? (
            <>
              {/* Tampilkan pesan untuk perangkat mobile */}
              {isMobile ? (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Image
                    src={brokenPhoneImage}
                    alt="Broken phone icon"
                    width={150}
                    height={150}
                    style={{ opacity: 0.7 }}
                  />
                  <Typography variant="h6" sx={{ mt: 2, color: 'gray' }}>
                    Lebih Disarankan Untuk Menggunakan Device Laptop atau PC untuk bagian admin.
                  </Typography>
                </Box>
              ) : (
                <>
                  {/* Sidebar dan konten admin untuk layar lebih besar */}
                  <AdminSidebar
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={handleToggleSidebar}
                    activeButton={1}
                    onButtonClick={() => {}}
                  />
                  <AnimatedImage>
                    <Box sx={{ minHeight: '100vh', width: '100%', marginTop: -6 }}>
                      {children}
                    </Box>
                  </AnimatedImage>
                </>
              )}
            </>
          ) : (
            // Konten untuk halaman non-admin
            <AnimatedImage>
              <Box sx={{ minHeight: '100vh', width: '100%', marginTop: -6 }}>
                {children}
              </Box>
            </AnimatedImage>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            maxWidth: '100%',
            marginLeft: isAdminPage && !isMobile ? (isSidebarOpen ? '100px' : '0') : '0',
            transition: 'margin-left 0.3s ease',
            width: '100%',
          }}
        >
          <Footerr />
        </Box>

        {/* Navbar untuk mobile */}
        <MobileNavbar />
      </body>
    </html>
  );
}
