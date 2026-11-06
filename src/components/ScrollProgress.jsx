// Thin red bar at the top of the page that fills as you scroll.
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 3,
        zIndex: 2000,
        bgcolor: 'secondary.main',
        transformOrigin: 'left',
        transform: `scaleX(${progress})`,
        pointerEvents: 'none',
      }}
    />
  );
}