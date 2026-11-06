import { useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Section from './Section';
import SectionHeader from './SectionHeader';

/* ---------- Inlined Reveal ---------- */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

function Reveal({ children, delay = 0, sx = {} }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: 0,
        ...(inView && { animation: `${fadeUp} 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both` }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/* ---------- Section data ---------- */
const header = {
  label: 'Testimonials',
  heading: 'What our customers say',
  body: 'Real stories from hospitals, diagnostic centres, and health programmes across India.',
};

const testimonials = [
  {
    quote:
      'We have been using Tricog since 2020, and have expanded our usage to include 11 more units. In 2020 we were a new cath lab facility looking to establish better relationships with peripheral centres and ensure timely detection, transfer, and treatment of critical cardiac cases from primary centres.',
    name: 'Dr. A.S. Cheema',
    role: 'Director - Mohali, Punjab',
  },
  {
    quote:
      'InstaECG by Tricog is a lifesaver at our hospital. The wifi and 4G sim options both work with the machine, so connectivity has never been an issue. Reports come in immediately within 1-2 minutes through the Tricog mobile app. If there are any problems, customer support is available to help right away!',
    name: 'Dr. Aastha Midha Likhyani',
    role: 'Midhacare Super Speciality Hospital, Mohali, Punjab',
  },
  {
    quote:
      'Tricog\u2019s services are excellent, prompt, and accurate. We are using their solution for over a year now. Our entire team is satisfied and would give 5 stars to Tricog for their excellent support and service. We also want to give a shout-out to their support team who is very helpful even over the smallest task.',
    name: 'Dr. Ashpak A Shah',
    role: 'Dhanwantari Hospital And Critical Care Centre, Nandurbar',
  },
  {
    quote:
      'Our patients have benefited from Tricog\u2019s ECG notifications that are prompt and accurate. We have been using the platform for over 2 years and are extremely pleased with the timely reporting and increase in referrals from peripheral centres. Through the installation of Tricog machines in our referral centres, we have been able to increase our visibility and improve our relationship with them.',
    name: 'Saghir Siddiqui',
    role: 'Regional COO - KMC, Mangalore',
  },
];

const initials = (name) =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const swap = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const AUTOPLAY_MS = 6000;
const SIDE_COUNT = 3;

/* ---------- Component ---------- */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  // Autoplay through all 4 testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  // Pick which 3 testimonials sit in the side column:
  // the 3 that are NOT currently in the big card.
  const sideList = testimonials
    .map((t, i) => ({ ...t, originalIndex: i }))
    .filter((t) => t.originalIndex !== index)
    .slice(0, SIDE_COUNT);

  return (
    <Section id="testimonials">
      <Reveal>
        <SectionHeader {...header} />
      </Reveal>

      <Reveal>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* ---------- BIG CARD ---------- */}
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: { xs: 380, md: 460 },
              borderRadius: '32px',
              p: { xs: 3, md: 6 },
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background:
                'radial-gradient(circle at 90% 0%, rgba(220,43,73,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(1,41,77,0.9), transparent 55%), #011a31',
            }}
          >
            <FormatQuoteIcon
              aria-hidden="true"
              sx={{ position: 'absolute', right: 24, top: 8, fontSize: { xs: 140, md: 220 }, opacity: 0.1 }}
            />

            <Box key={index} sx={{ position: 'relative', animation: `${swap} 0.6s ease both` }}>
              <Typography
                component="blockquote"
                sx={{
                  m: 0,
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: { xs: 20, md: 32 },
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  fontWeight: 400,
                  maxWidth: 820,
                }}
              >
                {current.quote}
              </Typography>
            </Box>

            <Stack direction="row" alignItems="center" sx={{ position: 'relative', mt: 4 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.16)',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 600,
                  }}
                >
                  {initials(current.name)}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{current.name}</Typography>
                  <Typography sx={{ fontSize: 13, opacity: 0.75 }}>{current.role}</Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* ---------- 3 SMALL CARDS ---------- */}
          <Stack spacing={2} role="tablist" aria-label="Choose a testimonial">
            {sideList.map((t) => (
              <Box
                key={t.name}
                component="button"
                type="button"
                role="tab"
                aria-selected={false}
                onClick={() => setIndex(t.originalIndex)}
                sx={{
                  flex: 1,
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: '1px solid #E3EAF5',
                  borderRadius: '24px',
                  p: 3,
                  bgcolor: '#EEF2F9',
                  color: 'text.primary',
                  font: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': { bgcolor: '#fff', borderColor: 'primary.main' },
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 600,
                    bgcolor: '#fff',
                    color: 'primary.main',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {initials(t.name)}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 15 }}>{t.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{t.role}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Reveal>
    </Section>
  );
}