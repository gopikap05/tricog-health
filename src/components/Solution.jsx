import { useEffect, useRef, useState } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
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
  label: 'How it works',
  heading: 'From ECG to final report in four steps',
  body: 'Proprietary AI, technology and medical expertise working as one cardiac care pathway.',
};

const steps = [
  {
    title: 'ECG is taken',
    text: 'The ECG is taken at the remote centre using the Tricog 12-Lead ECG machine.',
    icon: MonitorHeartOutlinedIcon,
  },
  {
    title: 'AI reads it',
    text: 'Data goes to the Tricog Cloud, where the AI engine makes a preliminary diagnosis.',
    icon: CloudQueueIcon,
  },
  {
    title: 'Specialists verify',
    text: "Cardiac specialists at Tricog's 24×7 medical hub verify it and generate the final report.",
    icon: MedicalServicesOutlinedIcon,
  },
  {
    title: 'Report delivered',
    text: 'The report is sent by mobile app and email within minutes, ready for the treating doctor to act on.',
    icon: PhoneIphoneIcon,
  },
];

const tech = [
  { name: 'VCardia', note: '12-lead ECG device' },
  { name: 'Communicator', note: 'sends ECG data over GSM or WiFi' },
  { name: 'Cardionet', note: 'STEMI care coordination' },
];

const signal = keyframes`
  0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(220,43,73,0);    background-color: rgba(255,255,255,0.35); }
  15%      { transform: scale(1.5);  box-shadow: 0 0 0 10px rgba(220,43,73,0.3); background-color: #dc2b49; }
  35%      { transform: scale(1);    box-shadow: 0 0 0 18px rgba(220,43,73,0);   background-color: rgba(255,255,255,0.35); }
`;

const darkBg =
  'radial-gradient(circle at 12% 0%, rgba(1,41,77,0.65), transparent 50%), radial-gradient(circle at 95% 100%, rgba(220,43,73,0.28), transparent 45%), #011a31';

/* ---------- Component ---------- */
export default function Solution() {
  return (
    <Section id="solutions" sx={{ background: darkBg, color: '#fff' }}>
      <Reveal>
        <SectionHeader {...header} light />
      </Reveal>

      {/* Top dots + lines: dot and line share the same centre line */}
      <Box
        aria-hidden="true"
        sx={{ display: { xs: 'none', lg: 'grid' }, gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 3 }}
      >
        {steps.map((s, i) => (
          <Box key={s.title} sx={{ position: 'relative', height: 14 }}>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 14,
                height: 14,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.35)',
                animation: `${signal} 4.8s ease-out ${i * 1.2}s infinite`,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: 26,
                right: 0,
                top: '50%',
                height: '1px',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.18)',
              }}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
          gap: { xs: 2, lg: 3 },
        }}
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          const last = i === steps.length - 1;
          return (
            <Reveal key={step.title} delay={i * 0.12}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: { xs: 280, md: 360 },
                  borderRadius: '28px',
                  p: { xs: 3, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: last
                    ? 'linear-gradient(160deg, #0b4a80 0%, #01294d 100%)'
                    : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Number left, icon right, both centred on the same line */}
                <Box
                  sx={{
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
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: { xs: 64, md: 88 },
                      lineHeight: 0.8,
                      letterSpacing: '-0.04em',
                      color: 'transparent',
                      WebkitTextStroke: '1px rgba(255,255,255,0.5)',
                    }}
                  >
                    0{i + 1}
                  </Typography>
                  <Box
                    aria-hidden="true"
                    sx={{
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'rgba(255,255,255,0.12)',
                    }}
                  >
                    <Icon sx={{ display: 'block' }} />
                  </Box>
                </Box>

                <Box>
                  <Typography
                    component="h3"
                    variant="h3"
                    sx={{ fontWeight: 500, letterSpacing: '-0.01em', mb: 1.25 }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, minHeight: { lg: '5.1em' } }}
                  >
                    {step.text}
                  </Typography>
                </Box>
              </Box>
            </Reveal>
          );
        })}
      </Box>

      <Reveal delay={0.2}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 1.5, md: 2 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          sx={{ mt: { xs: 4, md: 6 } }}
        >
          <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Powered by</Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {tech.map((t) => (
              <Chip
                key={t.name}
                label={`${t.name} · ${t.note}`}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: 13,
                  height: 38,
                  borderRadius: 999,
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Reveal>
    </Section>
  );
}