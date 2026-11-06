// src/components/WhatsAppButton.jsx
// Floating WhatsApp button, bottom right. Pops in, pulses, and shows a label on hover.
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=918045680039&text=Hello%2C+I%E2%80%99d+like+to+get+more+information+about+your+offerings&type=phone_number&app_absent=0';

const WHATSAPP_GREEN = '#25D366'; // WhatsApp brand colour, kept so the button is instantly recognisable

/* ---------- Animations ---------- */
const pop = keyframes`
  0%   { transform: scale(0);    opacity: 0; }
  60%  { transform: scale(1.18); opacity: 1; }
  100% { transform: scale(1);    opacity: 1; }
`;
const ring = keyframes`
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(2.2); opacity: 0; }
`;
const wiggle = keyframes`
  0%, 84%, 100% { transform: rotate(0deg); }
  88%           { transform: rotate(-16deg); }
  92%           { transform: rotate(14deg); }
  96%           { transform: rotate(-8deg); }
`;

/* ---------- Component ---------- */
export default function WhatsAppButton() {
  return (
    <Box
      component="a"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Tricog on WhatsApp (opens in a new tab)"
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 28 },
        bottom: { xs: 16, md: 28 },
        zIndex: 1500,
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        animation: `${pop} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s both`,
        '&:hover .wa-label': { maxWidth: 220, opacity: 1, pl: 2.5 },
        '&:hover .wa-circle': { transform: 'scale(1.1)' },
        '&:focus-visible .wa-label': { maxWidth: 220, opacity: 1, pl: 2.5 },
      }}
    >
      {/* Label that slides out on hover (desktop only) */}
      <Box
        className="wa-label"
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          height: 48,
          maxWidth: 0,
          opacity: 0,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          bgcolor: '#fff',
          borderRadius: 999,
          boxShadow: '0 10px 30px rgba(1,26,49,0.18)',
          mr: '-28px',
          pr: '40px',
          transition: 'max-width 0.45s ease, opacity 0.3s ease, padding 0.45s ease',
        }}
      >
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>Chat on WhatsApp</Typography>
      </Box>

      {/* Green circle with pulse rings */}
      <Box
        className="wa-circle"
        sx={{
          position: 'relative',
          width: { xs: 56, md: 64 },
          height: { xs: 56, md: 64 },
          borderRadius: '50%',
          bgcolor: WHATSAPP_GREEN,
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 12px 30px rgba(37,211,102,0.5)',
          transition: 'transform 0.3s ease',
        }}
      >
        {[0, 1].map((i) => (
          <Box
            key={i}
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              bgcolor: WHATSAPP_GREEN,
              zIndex: -1,
              animation: `${ring} 2.4s ease-out ${i * 1.2}s infinite`,
            }}
          />
        ))}
        <WhatsAppIcon
          aria-hidden="true"
          sx={{ fontSize: { xs: 30, md: 36 }, animation: `${wiggle} 5s ease-in-out 3s infinite` }}
        />
      </Box>
    </Box>
  );
}