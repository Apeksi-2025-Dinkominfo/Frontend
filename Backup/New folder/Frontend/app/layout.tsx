'use client'; // This tells Next.js that this component should be rendered client-side

import './globals.css';
import NavLogo from './components/navbarLogo';
import Footerr from './components/footer';
import { Box } from '@mui/material';
import AnimatedImage from './components/layout'; // Import the animated image component
import MobileNavbar from './components/mobileNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}
      >
        {/* Navbar */}
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

        {/* Animated Image */}
        <Box>
          <AnimatedImage>
            {/* Children with background color */}
            <Box
              sx={{
                minHeight: '100vh', // Ensure it covers the full height of the viewport
                width: '100%',
              marginTop: -6,
              }}
            >
              {children}
            </Box>
          </AnimatedImage>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: { xs: 4, md: 6 }, maxWidth: '100%' }}>
          <Footerr />
        </Box>

        {/* Mobile Navbar */}
        <MobileNavbar /> {/* Insert MobileNavbar component here */}
      </body>
    </html>
  );
}
