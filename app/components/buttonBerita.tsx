import React from 'react';
import { Box, Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CardNewsButton() {
  return (
    <Box className="absolute bottom-4 right-4">
      <Link href="/berita" passHref>
        <Button
          variant="text"
          endIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          className="
            group
            text-emerald-600 hover:text-emerald-700
            bg-emerald-50 hover:bg-emerald-100
            rounded-full
            py-1.5 px-4
            text-sm font-medium
            transition-all duration-300 ease-in-out
            hover:shadow-md
            flex items-center
          "
        >
          Lihat semua berita
        </Button>
      </Link>
    </Box>
  );
}

