'use client'; // This tells Next.js that this component should be rendered client-side

import './globals.css';
import NavLogo from './components/navbarLogo';
import Footerr from './components/footer';
import { Box } from '@mui/material';
import AnimatedImage from './components/layout'; // Import the animated image component

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%', // Ensure this box takes full width
            overflow: 'hidden', // Prevent overflow
            padding: 2, // Optional: Add some padding to prevent edge cases
          }}
        >
          <AnimatedImage>
            {children}
          </AnimatedImage>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: { xs: 4, md: 6 }, maxWidth: '100%' }}>
          <Footerr />
        </Box>
      </body>
    </html>
  );
}
