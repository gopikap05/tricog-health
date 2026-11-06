import { useEffect, useRef, useState } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
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
  label: 'Products',
  heading: 'Diagnostic tools built around the heart',
  body: 'AI-aided interpretation services and devices that work together.',
};

const products = [
  {
    name: 'InstaECG',
    text: 'AI-aided ECG interpretation service.',
    tags: ['Launched 2015', '6000+ active users'],
    href: '#demo',
  },
  {
    name: 'InstaEcho',
    text: 'AI-aided comprehensive echo interpretation.',
    tags: ['Launched 2021', '400+ customers'],
    href: '#demo',
  },
  {
    name: 'VCardia',
    text: '12-lead ECG device.',
    tags: ['Device'],
    href: '#demo',
  },
  {
    name: 'KeeboHealth',
    text: 'Available on its own website.',
    tags: ['keebohealth.com'],
    href: 'https://keebohealth.com',
    external: true,
  },
];

// How long (ms) each card stays blue before the highlight moves to the next one
const HIGHLIGHT_INTERVAL = 2500;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const handleMove = (event) => {
  if (reducedMotion()) return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateX = (y / rect.height - 0.5) * -10;
  const rotateY = (x / rect.width - 0.5) * 10;
  card.style.setProperty('--x', `${x}px`);
  card.style.setProperty('--y', `${y}px`);
  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
};

const handleLeave = (event) => {
  event.currentTarget.style.transform = '';
};

/* ---------- Component ---------- */
export default function Product() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Move the blue highlight to the next card on a timer
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % products.length);
    }, HIGHLIGHT_INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <Section id="products">
      <Reveal>
        <SectionHeader {...header} />
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
          gap: { xs: 2, md: 3 },
        }}
      >
        {products.map((p, i) => {
          const dark = i === active;
          return (
            <Reveal key={p.name} delay={i * 0.1}>
              <Box
                component="a"
                href={p.href}
                {...(p.external && { target: '_blank', rel: 'noopener noreferrer' })}
                aria-label={p.external ? `${p.name} (opens in a new tab)` : `${p.name}: request a demo`}
                onMouseEnter={() => {
                  setActive(i);
                  setPaused(true);
                }}
                onMouseMove={handleMove}
                onMouseLeave={(e) => {
                  handleLeave(e);
                  setPaused(false);
                }}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: { xs: 260, md: 380 },
                  textDecoration: 'none',
                  borderRadius: '28px',
                  p: 3.5,
                  bgcolor: dark ? 'primary.main' : '#EEF2F9',
                  color: dark ? '#fff' : 'text.primary',
                  transition: 'transform 0.25s ease-out, background-color 0.6s ease, color 0.6s ease',
                  willChange: 'transform',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    background: dark
                      ? 'radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.22), transparent 60%)'
                      : 'radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(1,41,77,0.16), transparent 60%)',
                  },
                  '&:hover::before': { opacity: 1 },
                }}
              >
                <Typography
                  aria-hidden="true"
                  sx={{ position: 'relative', fontFamily: '"DM Sans", sans-serif', fontSize: 15, opacity: 0.6 }}
                >
                  0{i + 1}
                </Typography>

                <Box sx={{ position: 'relative' }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: { xs: 34, md: 40 },
                      fontWeight: 500,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.05,
                      mb: 1.5,
                    }}
                  >
                    {p.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: dark ? 'rgba(255,255,255,0.85)' : 'text.secondary',
                      mb: 2.5,
                      transition: 'color 0.6s ease',
                    }}
                  >
                    {p.text}
                  </Typography>
                  <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                    {p.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: dark ? 'rgba(255,255,255,0.18)' : '#fff',
                          color: dark ? '#fff' : 'text.primary',
                          fontSize: 12,
                          transition: 'background-color 0.6s ease, color 0.6s ease',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Reveal>
          );
        })}
      </Box>
    </Section>
  );
}