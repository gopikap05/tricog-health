// Oriel-style header: small label on the left, heading + text on the right.
import { Box, Typography } from '@mui/material';

export default function SectionHeader({ label, heading, body, light = false }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 2.2fr' },
        gap: { xs: 2, md: 4 },
        mb: { xs: 5, md: 7 },
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: light ? 'rgba(255,255,255,0.7)' : 'primary.main',
          pt: { md: 1.5 },
        }}
      >
        {label}
      </Typography>
      <Box>
        <Typography
          component="h2"
          variant="h2"
          sx={{ fontWeight: 500, letterSpacing: '-0.02em', color: light ? '#fff' : 'text.primary' }}
        >
          {heading}
        </Typography>
        {body && (
          <Typography
            variant="body1"
            sx={{ color: light ? 'rgba(255,255,255,0.8)' : 'text.secondary', mt: 2, maxWidth: 560 }}
          >
            {body}
          </Typography>
        )}
      </Box>
    </Box>
  );
}