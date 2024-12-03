// components/AnimatedImage.tsx

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';


type Props = {
  children: ReactNode;
};

const AnimatedImage = (props: Props) => {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      {visible && (
        <motion.img
          src="/logoNew.png" // Path to the image in the public folder
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '50%',
            height: 'auto',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto',
          }}
        />
      )}
      {!visible && (
        <Box sx={{ mt: { xs: 4, md: 6 }, minHeight: '80vh', maxWidth: '100%' }}>
          {props.children}
        </Box>
      )}
    </>
  );
};

export default AnimatedImage;
