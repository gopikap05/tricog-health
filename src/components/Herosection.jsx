import { useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import heroImg1 from '../assets/imgs/hs-img.jpg';
import heroImg2 from '../assets/imgs/hs-img01 (1).jpg';
import heroImg3 from '../assets/imgs/hs-img01 (2).jpg';

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

/* ---------- Background slideshow ---------- */
const zoomIn = keyframes`
  from { transform: scale(1); }
  to   { transform: scale(1.12); }
`;
const zoomOutPan = keyframes`
  from { transform: scale(1.14) translateX(2%); }
  to   { transform: scale(1.02) translateX(0); }
`;
const panLeft = keyframes`
  from { transform: scale(1.1) translateX(2.5%); }
  to   { transform: scale(1.1) translateX(-2.5%); }
`;

const SLIDE_INTERVAL = 6500;
const FADE_MS = 1600;
const MOVE_S = 11;

const slides = [
  { src: heroImg1, anim: zoomIn },
  { src: heroImg2, anim: zoomOutPan },
  { src: heroImg3, anim: panLeft },
];

function BackgroundSlideshow() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const id = setInterval(() => {
      setActive((a) => {
        setPrev(a);
        return (a + 1) % slides.length;
      });
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, bgcolor: '#011a31' }}>
        {slides.map((s, i) => {
          const isActive = i === active;
          const isPrev = i === prev;
          return (
            <Box
              key={s.src}
              component="img"
              src={s.src}
              alt=""
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: isActive ? 1 : 0,
                transition: `opacity ${FADE_MS}ms ease-in-out`,
                willChange: 'opacity, transform',
                ...((isActive || isPrev) && {
                  animation: `${s.anim} ${MOVE_S}s ease-out both`,
                }),
              }}
            />
          );
        })}
      </Box>

      <Stack
        direction="row"
        spacing={1}
        role="tablist"
        aria-label="Hero images"
        sx={{ position: 'absolute', top: { xs: 20, md: 28 }, right: { xs: 20, md: 36 }, zIndex: 3 }}
      >
        {slides.map((s, i) => (
          <Box
            key={s.src}
            component="button"
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show image ${i + 1}`}
            onClick={() => {
              if (i === active) return;
              setPrev(active);
              setActive(i);
            }}
            sx={{
              p: 0,
              border: 0,
              cursor: 'pointer',
              height: 6,
              width: i === active ? 28 : 6,
              borderRadius: 999,
              bgcolor: i === active ? '#fff' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.4s ease',
              '&:focus-visible': { outline: '2px solid #fff', outlineOffset: 3 },
            }}
          />
        ))}
      </Stack>
    </>
  );
}

/* ---------- Section data ---------- */
const trustedBy = {
  initials: ['A', 'F', 'M'],
  text: 'Trusted by Apollo, Fortis, Manipal and more',
};

const stats = [
  { value: 42, suffix: 'M+', label: 'Patients diagnosed' },
  { value: 1, suffix: 'M+', label: 'Lives saved' },
  { value: 24, suffix: '×7', label: 'Specialist hub' },
  { value: 500, suffix: '+', label: 'Partner hospitals' }, // placeholder, put your real number
];

/* ---------- Rolling number (odometer) ---------- */
const CELL = 1.1; // digit cell height in em

function RollingDigit({ digit, ready, duration, reduce }) {
  // Two stacked 0-9 strips: start at the top strip's 0, roll through to the digit in the second strip
  const offset = ready ? digit + 10 : 0;
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{ display: 'inline-block', height: `${CELL}em`, lineHeight: `${CELL}em`, overflow: 'hidden', verticalAlign: 'top' }}
    >
      <Box
        component="span"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(-${offset * CELL}em)`,
          transition: reduce ? 'none' : `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
          willChange: 'transform',
        }}
      >
        {Array.from({ length: 20 }, (_, n) => (
          <Box component="span" key={n} sx={{ height: `${CELL}em`, lineHeight: `${CELL}em` }}>
            {n % 10}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function RollingNumber({ value, suffix, startDelay = 900 }) {
  const [ready, setReady] = useState(false);
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduce) {
      setReady(true);
      return undefined;
    }
    const timer = setTimeout(() => setReady(true), startDelay); // start after the page has loaded
    return () => clearTimeout(timer);
  }, [reduce, startDelay]);

  const digits = String(value).split('').map(Number);

  return (
    <Box component="span" aria-label={`${value}${suffix}`} sx={{ display: 'inline-flex', alignItems: 'flex-start' }}>
      {digits.map((d, i) => (
        <RollingDigit key={i} digit={d} ready={ready} reduce={reduce} duration={1.6 + i * 0.35} />
      ))}
      <span aria-hidden="true">{suffix}</span>
    </Box>
  );
}

function StatItem({ value, suffix, label, divider }) {
  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        px: { xs: 1.5, md: 2.25 },
        py: { xs: 1, md: 0.25 },
        ...(divider && {
          '&::before': {
            content: '""',
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            left: 0,
            top: '15%',
            height: '70%',
            width: '1px',
            bgcolor: 'rgba(1,26,49,0.12)',
          },
        }),
      }}
    >
      <Typography
        component="div"
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: { xs: 20, md: 22 },
          fontWeight: 600,
          lineHeight: 1.1,
          color: 'primary.main',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <RollingNumber value={value} suffix={suffix} />
      </Typography>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 0.25, lineHeight: 1.3, whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Box>
  );
}

/* ---------- Component ---------- */
export default function HeroSection() {
  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: 'relative', // anchor for the floating stats card
        bgcolor: 'transparent',
        px: { xs: 1, md: 1.5 },
        pt: '10px',
        pb: { xs: 1, md: 1.5 },
        mb: { xs: 10, md: 0 }, // room for the card hanging below the hero (mobile only)
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: { xs: '20px', md: '28px' },
          minHeight: { xs: 760, md: 700 },
          display: 'flex',
          alignItems: 'flex-end',
          color: '#fff',
        }}
      >
        <BackgroundSlideshow />

        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(1,26,49,0.55) 0%, rgba(1,26,49,0.25) 45%, rgba(1,26,49,0) 72%), linear-gradient(0deg, rgba(1,26,49,0.45) 0%, rgba(1,26,49,0) 40%)',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            p: { xs: 3, md: 6 },
            pb: { xs: 11, md: 6 }, // keeps buttons clear of the floating card on mobile
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            gap: 4,
          }}
        >
          <Box sx={{ maxWidth: 640 }}>
            <Reveal delay={0.1}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <Stack direction="row" aria-hidden="true">
                  {trustedBy.initials.map((letter, i) => (
                    <Box
                      key={letter}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: ['#01294d', '#dc2b49', '#4A5565'][i],
                        border: '2px solid #fff',
                        ml: i === 0 ? 0 : -1,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {letter}
                    </Box>
                  ))}
                </Stack>
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>
                  {trustedBy.text}
                </Typography>
              </Stack>
            </Reveal>

            <Reveal delay={0.25}>
              <Typography
                component="h1"
                variant="h1"
                sx={{ color: '#fff', fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.035em' }}
              >
                Accelerating
                <br />
                Cardiac Care
              </Typography>
            </Reveal>

            <Reveal delay={0.4}>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255,255,255,0.9)', mt: 2.5, maxWidth: 560, fontSize: { xs: 16, md: 19 }, lineHeight: 1.55 }}
              >
                Integrating medical grade Artificial Intelligence, Technology and Human Medical Expertise
              </Typography>
            </Reveal>

            <Reveal delay={0.55}>
              <Stack direction="row" spacing={1.5} sx={{ mt: 4, flexWrap: 'wrap', rowGap: 1.5 }}>
                <Button
                  href="#demo"
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: 999,
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.2, md: 1.5 },
                    fontSize: { xs: 15, md: 17 },
                    textTransform: 'none',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '&:hover': { boxShadow: 'none', bgcolor: '#b8213b' },
                  }}
                >
                  Request a demo
                </Button>
                <Button
                  href="#solutions"
                  sx={{
                    borderRadius: 999,
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.2, md: 1.5 },
                    fontSize: { xs: 15, md: 17 },
                    textTransform: 'none',
                    fontWeight: 500,
                    bgcolor: '#fff',
                    color: 'text.primary',
                    '&:hover': { bgcolor: '#E8EEF8' },
                  }}
                >
                  Know how it&apos;s done
                </Button>
              </Stack>
            </Reveal>
          </Box>
        </Box>
      </Box>

      {/* Floating glass stats card: sits on the section, straddling the hero's bottom edge */}
      <Box
        sx={{
          position: 'absolute',
          zIndex: 5,
          // mobile: hangs over the hero's bottom edge. desktop: sits level with the left content
          // (section px 12 + hero padding 48 = 60, so it lines up with the buttons' bottom edge)
          bottom: { xs: 8, md: 60 },
          left: { xs: 16, md: 'auto' },
          right: { xs: 16, md: 60 },
          transform: { xs: 'translateY(50%)', md: 'none' },
        }}
      >
        <Reveal delay={0.7}>
          <Box
            sx={{
              bgcolor: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(18px) saturate(160%)',
              WebkitBackdropFilter: 'blur(18px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.7)',
              color: 'text.primary',
              borderRadius: '16px',
              py: { xs: 1, md: 1.25 },
              px: { xs: 0.5, md: 0.75 },
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, auto)' },
              alignItems: 'center',
              boxShadow: '0 14px 36px rgba(1,26,49,0.2)',
            }}
          >
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} divider={i !== 0} />
            ))}
          </Box>
        </Reveal>
      </Box>
    </Box>
  );
}