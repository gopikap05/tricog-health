// One layout wrapper for every section:
//  - left/right padding 5%
//  - top/bottom padding 100px (lg), 80px (md), 60px (sm), 40px (xs)
//  - inner container 1350px wide, centred
import { Box } from '@mui/material';

export default function Section({ id, bgcolor = '#F8FAFD', decor = null, children, sx = {}, innerSx = {} }) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: 'relative',
        overflow: 'clip', // clips decorations but still allows position: sticky inside
        bgcolor,
        px: '5%',
        py: { xs: '40px', sm: '60px', md: '80px', lg: '100px' },
        ...sx,
      }}
    >
      {decor}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: '1350px', mx: 'auto', ...innerSx }}>
        {children}
      </Box>
    </Box>
  );
}