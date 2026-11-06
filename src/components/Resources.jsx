import { useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
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
  label: 'Articles',
  heading: 'Latest from Tricog',
  body: 'Reading on cardiac diagnostics, from the Tricog blog and news.',
};

const articles = [
  {
    tag: 'Article',
    title: "Reducing ECG Diagnosis Time with Tricog's AI-Driven ECG Solutions",
    text: "How Tricog's AI-driven approach aims to shorten the time it takes to diagnose an ECG.",
    href: 'https://tricog.com/reducing-ecg-diagnosis-time-with-tricogs-ai-driven-ecg-solutions/',
    gradient: 'linear-gradient(135deg, #01294d 0%, #0b4a80 100%)',
  },
  {
    tag: 'Article',
    title: 'Integrating Cardiac Diagnostics into Preventive Health Checkups',
    text: 'Why routine checkups benefit from cardiac diagnostics for early detection of heart conditions.',
    href: 'https://tricog.com/integrating-cardiac-diagnostics-into-preventive-health-checkups/',
    gradient: 'linear-gradient(135deg, #dc2b49 0%, #a81c35 100%)',
  },
  {
    tag: 'News',
    title: 'Government of Karnataka Launches STEMI Program in Partnership with Tricog Health',
    text: 'A statewide program to enable rapid diagnosis of heart disease at taluka and district health facilities.',
    href: 'https://tricog.com/author/tricoghealth/',
    gradient: 'linear-gradient(135deg, #011a31 0%, #01294d 100%)',
  },
];

/* ---------- Component ---------- */
export default function Resources() {
  return (
    <Section id="articles">
      <Reveal>
        <SectionHeader {...header} />
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 3 },
        }}
      >
        {articles.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.12}>
            <Box
              component="a"
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${a.title} (opens in a new tab)`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                textDecoration: 'none',
                color: 'text.primary',
                bgcolor: '#fff',
                border: '1px solid #E3EAF5',
                borderRadius: '28px',
                p: 1.5,
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 24px 50px rgba(1,41,77,0.14)' },
                '&:hover .thumb-ecg': { transform: 'scale(1.12)' },
                '&:hover .arrow': { bgcolor: 'primary.main', color: '#fff' },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: { xs: 180, md: 210 },
                  borderRadius: '20px',
                  background: a.gradient,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Box
                  className="thumb-ecg"
                  aria-hidden="true"
                  sx={{ width: '130%', transition: 'transform 0.6s ease' }}
                >
                  <EcgLine color="#fff" width={3} duration={3.5 + i} opacity={0.9} sx={{ width: '100%', height: 'auto' }} />
                </Box>
                <Typography
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: 16,
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: '#fff',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: 999,
                    px: 1.5,
                    py: 0.5,
                  }}
                >
                  {a.tag}
                </Typography>
              </Box>

              <Stack justifyContent="space-between" sx={{ flex: 1, p: { xs: 2, md: 2.5 }, gap: 2 }}>
                <Box>
                  <Typography
                    component="h3"
                    variant="h3"
                    sx={{ fontWeight: 500, letterSpacing: '-0.01em', mb: 1.25, fontSize: { md: 21 } }}
                  >
                    {a.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {a.text}
                  </Typography>
                </Box>
                <Box
                  className="arrow"
                  aria-hidden="true"
                  sx={{
                    alignSelf: 'flex-end',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: '#EEF2F9',
                    color: 'primary.main',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ArrowOutwardIcon fontSize="small" />
                </Box>
              </Stack>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}