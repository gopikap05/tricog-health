import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import Section from './Section';
import SectionHeader from './SectionHeader';
import findImage, { fileLabel } from '../utils/findImage';

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
const certImages = import.meta.glob('../assets/Certifications/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});
const awardImages = import.meta.glob('../assets/awards/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

/* ---------- Section data ---------- */
const header = {
  label: 'Trust & compliance',
  heading: 'Certified for clinical and data standards',
};

const certifications = [
  { name: 'CE', match: 'ce-600' },
  { name: 'CDSCO', match: 'cdsco' },
  { name: 'ISO/IEC 27001', match: 'iso-iec' },
  { name: 'ISO 13485', match: 'q-r-compliance' },
];

const awardAlt = {
  draper: 'Draper Venture Network award',
  nasscom: 'NASSCOM AI Game Changer award',
};

const awardsCaption = 'ET Startup Award 2019 · NASSCOM AI Game Changer 2018 · Express IT Award 2019';

const awards = Object.entries(awardImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const label = fileLabel(path);
    return { src, alt: awardAlt[label.toLowerCase()] || `Tricog award (${label})` };
  });

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/* ---------- Component ---------- */
export default function Certifications() {
  return (
    <Section id="certifications">
      <Reveal>
        <SectionHeader {...header} />
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: { xs: 2, md: 4 },
        }}
      >
        {certifications.map((cert, i) => {
          const src = findImage(certImages, cert.match);
          return (
            <Reveal key={cert.name} delay={i * 0.12}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 260,
                    aspectRatio: '1 / 1',
                    mx: 'auto',
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '2px dashed rgba(1,41,77,0.45)',
                      animation: `${spin} ${30 + i * 6}s linear infinite`,
                      animationDirection: i % 2 ? 'reverse' : 'normal',
                    }}
                  />
                  <Box
                    className="seal-inner"
                    sx={{
                      position: 'absolute',
                      inset: '9%',
                      borderRadius: '50%',
                      bgcolor: '#fff',
                      boxShadow: '0 18px 40px rgba(1,41,77,0.14)',
                      display: 'grid',
                      placeItems: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {src ? (
                      <Box
                        component="img"
                        src={src}
                        alt={`${cert.name} certification logo`}
                        loading="lazy"
                        sx={{ width: '68%', height: '68%', objectFit: 'contain' }}
                      />
                    ) : (
                      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: 22, fontWeight: 500 }}>
                        {cert.name}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Typography sx={{ mt: 2, fontSize: 15, fontWeight: 500 }}>{cert.name}</Typography>
              </Box>
            </Reveal>
          );
        })}
      </Box>

      <Reveal delay={0.1}>
        <Typography sx={{ mt: { xs: 5, md: 8 }, mb: 2, fontSize: 14, color: 'text.secondary' }}>
          Recognised with
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(7, 1fr)',
            },
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {awards.map((award) => (
            <Box
              key={award.src}
              sx={{
                height: { xs: 100, md: 120 },
                px: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: '#fff',
                border: '1px solid #E3EAF5',
                borderRadius: '24px',
              }}
            >
              <Box
                component="img"
                src={award.src}
                alt={award.alt}
                loading="lazy"
                sx={{ maxWidth: '100%', maxHeight: { xs: 64, md: 76 }, objectFit: 'contain' }}
              />
            </Box>
          ))}
        </Box>
        <Typography sx={{ mt: 2, fontSize: 13, color: 'text.secondary' }}>{awardsCaption}</Typography>
      </Reveal>
    </Section>
  );
}