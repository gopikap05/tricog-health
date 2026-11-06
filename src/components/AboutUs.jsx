import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import Section from './Section';
import SectionHeader from './SectionHeader';
import useInView from '../hooks/useInView';

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
  label: 'About Tricog',
  heading: 'Started in 2014 to change the odds of a heart attack',
};

const vision =
  "To change the 80% chance that a heart attack will take one's life to an 80% chance that the patient survives.";

let seen = 0;
const visionWords = vision.split(' ').map((w) => {
  if (w.includes('80%')) {
    seen += 1;
    return { w, color: seen === 1 ? '#dc2b49' : '#01294d' };
  }
  return { w };
});

const approach = {
  label: 'Our approach',
  text: 'Integrating medical grade Artificial Intelligence, Technology and Human Medical Expertise.',
};

const wordIn = keyframes`
  from { opacity: 0.12; transform: translateY(10px); }
  to   { opacity: 1;    transform: translateY(0); }
`;

/* ---------- Component ---------- */
export default function AboutUs() {
  const [visionRef, visionInView] = useInView(0.3);

  return (
    <Section id="about">
      <Reveal>
        <SectionHeader {...header} />
      </Reveal>

      <Typography
        ref={visionRef}
        component="p"
        variant="h1"
        aria-label={vision}
        sx={{ fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.03em', maxWidth: 1150 }}
      >
        {visionWords.map((item, i) => (
          <Box
            key={i}
            component="span"
            aria-hidden="true"
            sx={{
              display: 'inline-block',
              mr: '0.26em',
              opacity: 0.12,
              color: item.color || 'text.primary',
              ...(visionInView && { animation: `${wordIn} 0.6s ease ${i * 0.07}s forwards` }),
            }}
          >
            {item.w}
          </Box>
        ))}
      </Typography>

      <Reveal>
        <Box
          sx={{
            mt: { xs: 3, md: 5 },
            borderRadius: '32px',
            bgcolor: 'primary.main',
            color: '#fff',
            p: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 2, md: 6 },
          }}
        >
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: { xs: 64, md: 96 },
              lineHeight: 1,
              letterSpacing: '-0.05em',
            }}
          >
            2014
          </Typography>
          <Box>
            <Typography
              sx={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.75, mb: 1 }}
            >
              {approach.label}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 560 }}>
              {approach.text}
            </Typography>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}