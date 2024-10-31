"use client";

import { useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';

export default function Navbar() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <nav className="sticky top-0 bg-white z-1000 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Home Icon on the left */}
        <div className="flex items-center">
          <HomeIcon 
            onClick={handleHomeClick} 
            className="cursor-pointer text-gray-700" 
            fontSize="large" 
          />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-4">
            <img
              src="/sby.png"
              alt="Gambar 1"
              className="h-13 w-12"
            />
            <img
              src="/logoNew.png"
              alt="Gambar 2"
              className="h-12 w-15"
            />
          </div>
        </div>
        
        {/* Empty right side to balance layout */}
        <div></div>
      </div>
    </nav>
  );
}
