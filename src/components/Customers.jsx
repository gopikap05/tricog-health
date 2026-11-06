import { useEffect, useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import Section from './Section';
import SectionHeader from './SectionHeader';
import findImage from '../utils/findImage';

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

/* ---------- Images ---------- */
const images = import.meta.glob('../assets/customers/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

/* ---------- Section data ---------- */
const header = {
  label: 'Customers',
  heading: 'Trusted by hospitals, diagnostic chains and governments',
};

const rowOne = [
  { name: 'Neuberg', match: 'neuberg' },
  { name: 'Hitech', match: 'hitech' },
  { name: 'Medall', match: 'medall' },
  { name: 'Redcliffe Labs', match: 'redcliffe' },
  { name: 'Vijaya Diagnostics', match: 'vijaya' },
  { name: 'Aarthi Scans & Labs', match: 'aarti' },
  { name: 'Manipal', match: 'manipal' },
  { name: 'Fortis', match: 'fortis' },
];

const rowTwo = [
  { name: 'Russh', match: 'russh' },
  { name: 'Metropolis', match: 'download' },
  { name: 'Yashoda', match: 'yashoda' },
  { name: 'Kauvery', match: 'kauvery' },
  { name: 'Apollo', match: 'apollo' },
  { name: 'Max Healthcare', match: 'max-logo' },
  { name: 'Sakra World Hospital', match: 'sakara' },
  { name: 'Wish Foundation', match: 'wish-foundation' },
];

const governments = [
  { name: 'Government of Goa', match: 'goa_government' },
  { name: 'Government of Telangana', match: 'telangana' },
  { name: 'Government of Maharashtra', match: 'mh-govt' },
  { name: 'Government of Odisha', match: 'odisha' },
];

const scroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`;

const fade = 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)';

function Tile({ name, match, large = false }) {
  const src = findImage(images, match);
  return (
    <Box
      sx={{
        flexShrink: 0,
        minWidth: large ? 0 : { xs: 190, md: 240 },
        width: large ? '100%' : 'auto',
        height: large ? { xs: 110, md: 150 } : { xs: 90, md: 116 },
        px: 3,
        display: 'grid',
        placeItems: 'center',
        bgcolor: '#fff',
        border: '1px solid #E3EAF5',
        borderRadius: '24px',
      }}
    >
      {src ? (
        <Box
          component="img"
          src={src}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          sx={{
            maxWidth: '100%',
            maxHeight: large ? { xs: 70, md: 96 } : { xs: 52, md: 68 },
            objectFit: 'contain',
          }}
        />
      ) : (
        <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, fontSize: 20 }}>{name}</Typography>
      )}
    </Box>
  );
}

function MarqueeRow({ items, reverse = false, duration = 45 }) {
  return (
    <Box sx={{ overflow: 'hidden', WebkitMaskImage: fade, maskImage: fade }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: 'max-content',
          animation: `${scroll} ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {items.map((item) => (
          <Tile key={item.name} {...item} />
        ))}
        {items.map((item) => (
          <Box key={`${item.name}-copy`} aria-hidden="true" sx={{ display: 'contents' }}>
            <Tile {...item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ---------- Component ---------- */
export default function Customers() {
  return (
    <Section id="customers">
      <Reveal>
        <SectionHeader {...header} />
      </Reveal>

      <Reveal>
        <Stack spacing={2}>
          <MarqueeRow items={rowOne} duration={50} />
          <MarqueeRow items={rowTwo} reverse duration={58} />
        </Stack>
      </Reveal>

      <Reveal delay={0.15}>
        <Typography sx={{ fontSize: 14, color: 'text.secondary', mt: { xs: 4, md: 6 }, mb: 2 }}>
          Governments of Goa, Telangana, Maharashtra and Odisha
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 2,
          }}
        >
          {governments.map((g) => (
            <Tile key={g.name} {...g} large />
          ))}
        </Box>
      </Reveal>
    </Section>
  );
}