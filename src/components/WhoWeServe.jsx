import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Section from './Section';
import SectionHeader from './SectionHeader';

/* ---------- Inlined EcgLine ---------- */
const draw = keyframes`
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
`;

function EcgLine({ color = '#fff', width = 3, opacity = 1, duration = 4, sx = {} }) {
  return (
    <Box component="svg" viewBox="0 0 1200 200" aria-hidden="true" sx={{ display: 'block', ...sx }}>
      <path
        d="M0 100 H260 L290 100 L320 40 L360 170 L390 100 H560 L590 100 L620 55 L655 150 L685 100 H900 L930 100 L960 30 L1000 175 L1030 100 H1200"
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        style={{ opacity, animation: `${draw} ${duration}s ease-in-out infinite alternate` }}
      />
    </Box>
  );
}

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
  label: 'Who we serve',
  heading: 'One platform, every point of cardiac care',
  body: 'From the first consultation to the hospital ICU, Tricog fits the way each team already works.',
};

const audiences = [
  {
    title: 'Clinics / General Physicians',
    text: 'Timely, accurate ECG diagnosis at the first point of consultation.',
    icon: MedicalServicesOutlinedIcon,
  },
  {
    title: 'Hospitals',
    text: 'Digitises the ECG workflow with cloud access, connects referral centres to the main hospital to treat STEMI within the golden hour, and gives round-the-clock diagnosis for in-patients, casualty, ICU and pre/post-surgical cases.',
    icon: LocalHospitalOutlinedIcon,
  },
  {
    title: 'Diagnostics',
    text: 'Integrates with your existing LIS, with on-time reporting validated by cardiac specialists.',
    icon: BiotechOutlinedIcon,
  },
  {
    title: 'Public Health',
    text: 'Screening at PHCs and CHCs to manage STEMI and improve door-to-balloon time.',
    icon: HealthAndSafetyOutlinedIcon,
  },
  {
    title: 'Home Health Services',
    text: 'ECG diagnosis for patients at home, with reports reviewed by cardiac specialists.',
    icon: HomeWorkOutlinedIcon,
  },
  {
    title: 'Pharma & Others',
    text: 'Cardiac diagnostic support for pharma programmes and other healthcare partners.',
    icon: MedicationOutlinedIcon,
  },
];

/* ---------- Component ---------- */
export default function WhoWeServe() {
  const [active, setActive] = useState(1);

  return (
    <Section id="serve">
      <Reveal>
        <SectionHeader {...header} />
      </Reveal>

      <Reveal>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            height: { md: 560 },
          }}
        >
          {audiences.map((a, i) => {
            const Icon = a.icon;
            const on = active === i;
            return (
              <Box
                key={a.title}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: '28px',
                  p: { xs: 3, md: 4 },
                  minHeight: { xs: 300, md: 'auto' },
                  flex: { xs: 'none', md: on ? 3.4 : 1 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  bgcolor: on ? 'primary.main' : '#EEF2F9',
                  color: on ? '#fff' : 'text.primary',
                  transition:
                    'flex 0.7s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s ease, color 0.5s ease',
                  outlineOffset: 3,
                }}
              >
                <Box
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '24%',
                    opacity: on ? 0.22 : 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <EcgLine color="#fff" width={2} duration={5} sx={{ width: '160%', height: 'auto' }} />
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Typography
                    aria-hidden="true"
                    sx={{
                      display: 'block',
                      m: 0,
                      lineHeight: 1,
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 15,
                      opacity: 0.7,
                    }}
                  >
                    0{i + 1}
                  </Typography>
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: 52,
                      height: 52,
                      flexShrink: 0,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: on ? 'rgba(255,255,255,0.16)' : '#fff',
                      color: on ? '#fff' : 'primary.main',
                      transition: 'all 0.5s ease',
                    }}
                  >
                    <Icon sx={{ display: 'block' }} />
                  </Box>
                </Box>

                <Typography
                  aria-hidden="true"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    left: 28,
                    bottom: 32,
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 22,
                    fontWeight: 500,
                    opacity: on ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {a.title}
                </Typography>

                <Box
                  sx={{
                    position: { xs: 'static', md: 'absolute' },
                    left: { md: 40 },
                    right: { md: 40 },
                    bottom: { md: 40 },
                    maxWidth: { md: 440 },
                    boxSizing: 'border-box',
                    opacity: { xs: 1, md: on ? 1 : 0 },
                    transform: { md: on ? 'none' : 'translateY(18px)' },
                    transition: 'opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s',
                    pointerEvents: { md: on ? 'auto' : 'none' },
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h3"
                    sx={{ fontWeight: 500, letterSpacing: '-0.01em', mb: 1.5 }}
                  >
                    {a.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.88, mb: 2.5 }}>
                    {a.text}
                  </Typography>
                  <Button
                    href="#demo"
                    endIcon={<ArrowOutwardIcon />}
                    tabIndex={on ? 0 : -1}
                    sx={{
                      borderRadius: 999,
                      px: 2.5,
                      textTransform: 'none',
                      fontWeight: 500,
                      bgcolor: on ? '#fff' : 'primary.main',
                      color: on ? 'text.primary' : '#fff',
                      '&:hover': { bgcolor: '#E8EEF8', color: 'text.primary' },
                    }}
                  >
                    Request a demo
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Reveal>
    </Section>
  );
}