import { useEffect, useRef, useState } from 'react';
import { Box, Button, Chip, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Section from './Section';
import SectionHeader from './SectionHeader';
import findImage from '../utils/findImage';

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

/* ---------- Images ---------- */
const images = import.meta.glob('../assets/team/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

/* ---------- Section data ---------- */
const header = {
  label: 'Our team',
  heading: 'The people behind Tricog',
  body: 'The founders and leadership team working to accelerate cardiac care.',
};

const founders = [
  {
    name: 'Dr. Charit Bhograj',
    role: 'Founder & CEO',
    tag: 'Founder',
    note: 'An interventional cardiologist with 18+ years of experience. Started Tricog in 2014.',
    bio: "An interventional cardiologist with 18+ years of experience. He pioneers advanced cardiology solutions and leads Tricog's mission to transform cardiac care.",
    highlights: ['18+ years in cardiology', 'Started Tricog in 2014'],
    linkedin: 'https://in.linkedin.com/in/dr-charit-bhograj-a13b2a5a',
    match: 'charit',
  },
  {
    name: 'Dr. Zainul Charbiwala',
    role: 'Co-Founder & CTO',
    tag: 'Co-Founder',
    note: 'An expert in Embedded Systems and Machine Learning.',
    bio: "An expert in embedded systems and machine learning, he owns Tricog's technology roadmap, from hardware to algorithms.",
    highlights: ['PhD, UCLA', '7 patents', '30 publications'],
    linkedin: 'https://www.linkedin.com/in/zainulcharbiwala/',
    match: 'zainul',
  },
];

const leaders = [
  {
    name: 'Sandeep Banerjee',
    role: 'CBO – Diagnostic Technologies',
    note: '30+ years of experience, largely in healthcare.',
    bio: "Over 30 years of experience, mostly in healthcare, including leading cross-functional teams and building businesses from the ground up. He focuses on a scalable, profitable business for Tricog's diagnostic technologies.",
    highlights: ['30+ years of experience', 'Healthcare'],
    linkedin: 'https://www.linkedin.com/in/sandeepbanerjeeismimt/',
    match: 'sandeep',
  },
  {
    name: 'Prateek Golecha',
    role: 'Chief Growth Officer',
    note: 'Leads growth at Tricog Health.',
    bio: 'Leads growth across marketing, digital health and strategic partnerships, with nearly two decades of experience scaling healthcare models in 20+ countries.',
    highlights: ['MBA, IIM Ahmedabad', 'Executive education, Kellogg', '20+ countries'],
    linkedin: 'https://in.linkedin.com/in/prateekgolecha',
    match: 'prateek',
  },
  {
    name: 'Ujjwal Agrawal',
    role: 'SVP – Finance',
    note: 'Over four years of experience as Finance Controller.',
    bio: 'A finance controller with over four years at Tricog, covering accounting, budgeting, investor reporting and controls. He works with the CEO on strategy, financial planning and reporting.',
    highlights: ['4+ years at Tricog', 'Accounting & budgeting', 'Investor reporting'],
    linkedin: 'https://in.linkedin.com/in/ujjwal-agrawal-80715b3b',
    match: 'ujjwal',
  },
  {
    name: 'Rajib Das',
    role: 'SVP – Public Health Affairs',
    note: '29+ years of experience in building people, culture and businesses.',
    bio: '29+ years in healthcare across pharma, medical devices and health technology. He has built businesses and teams, with a focus on making care accessible to the last mile.',
    highlights: ['29+ years of experience', 'Pharma, devices, health tech'],
    linkedin: 'https://in.linkedin.com/in/rajib-das-506938b',
    match: 'rajib',
  },
  {
    name: 'Dr. Sudha Ram Mohan',
    role: 'VP – Medical Operations',
    note: 'Anaesthetist and Intensivist with more than three decades of clinical experience.',
    bio: "An anaesthetist and intensivist with over three decades of clinical experience. She leads Tricog's medical team with a focus on faster, better cardiac care.",
    highlights: ['30+ years of clinical experience', 'Anaesthesia & intensive care'],
    linkedin: 'https://in.linkedin.com/in/dr-sudha-ram-mohan-16a9a8202',
    match: 'sudha',
  },
  {
    name: 'Sukhbir Singh',
    role: 'VP – SEA',
    note: '25+ years in healthcare and health-tech.',
    bio: 'Over 25 years in healthcare and health-tech, from selling medical imaging equipment to driving telecardiology adoption across Southeast Asia. He leads sales and builds networks of cardiologists in the ASEAN region.',
    highlights: ['25+ years of experience', 'Telecardiology', 'ASEAN region'],
    linkedin: 'https://ph.linkedin.com/in/sukhbir-singh-b439b145',
    match: 'sukhbir',
  },
];

const initials = (name) =>
  name
    .replace('Dr. ', '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

function Photo({ person }) {
  const src = findImage(images, person.match);
  if (!src) {
    return (
      <Box
        aria-hidden="true"
        sx={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          bgcolor: '#EEF2F9',
          color: 'primary.main',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 40,
          fontWeight: 500,
        }}
      >
        {initials(person.name)}
      </Box>
    );
  }
  return (
    <Box
      component="img"
      src={src}
      alt={`${person.name}, ${person.role}`}
      loading="lazy"
      decoding="async"
      sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
    />
  );
}

function ProfilePanel({ person, open, onClose }) {
  if (!person) return null;
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          role: 'dialog',
          'aria-modal': true,
          'aria-labelledby': 'team-profile-name',
          sx: {
            width: { xs: '100%', sm: 480 },
            borderRadius: { xs: 0, sm: '32px 0 0 32px' },
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          color: '#fff',
          px: 4,
          pt: 3,
          pb: 4,
          background:
            'radial-gradient(circle at 100% 0%, rgba(220,43,73,0.35), transparent 55%), linear-gradient(160deg, #01294d, #011a31)',
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ position: 'relative', mb: 3, width: '100%' }}>
          <Typography sx={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.75 }}>
            Profile
          </Typography>
          <IconButton
            onClick={onClose}
            aria-label="Close profile"
            sx={{ ml: 'auto', color: '#fff', border: '1px solid rgba(255,255,255,0.35)' }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={2.5} alignItems="center" sx={{ position: 'relative' }}>
          <Box
            sx={{
              width: 112,
              height: 112,
              flexShrink: 0,
              overflow: 'hidden',
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.9)',
              bgcolor: '#EEF2F9',
              '& img': { transform: 'scale(1.05)' },
            }}
          >
            <Photo person={person} />
          </Box>
          <Box>
            <Typography
              id="team-profile-name"
              component="h3"
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: { xs: 26, sm: 30 },
                fontWeight: 500,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                mb: 0.75,
              }}
            >
              {person.name}
            </Typography>
            <Typography sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{person.role}</Typography>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 4, py: 4 }}>
        <Typography
          sx={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'primary.main', mb: 1.5 }}
        >
          About
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 4 }}>
          {person.bio}
        </Typography>

        <Typography
          sx={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'primary.main', mb: 1.5 }}
        >
          Highlights
        </Typography>
        <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
          {person.highlights.map((h) => (
            <Chip
              key={h}
              label={h}
              sx={{ bgcolor: '#EEF2F9', height: 36, borderRadius: 999, fontSize: 13, fontWeight: 500 }}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ px: 4, py: 3, borderTop: '1px solid #E3EAF5' }}>
        <Button
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} on LinkedIn (opens in a new tab)`}
          startIcon={<LinkedInIcon />}
          fullWidth
          sx={{
            borderRadius: 999,
            py: 1.3,
            textTransform: 'none',
            fontWeight: 500,
            color: '#fff',
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: '#011d38' },
          }}
        >
          View on LinkedIn
        </Button>
      </Box>
    </Drawer>
  );
}

/* ---------- Component ---------- */
export default function Team() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const openProfile = (person) => {
    setSelected(person);
    setOpen(true);
  };

  return (
    <Section id="team">
      <Reveal>
        <SectionHeader {...header} />
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
        }}
      >
        {founders.map((f, i) => (
          <Reveal key={f.name} delay={i * 0.12}>
            <Box
              component="article"
              sx={{
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                borderRadius: { xs: '28px', md: '36px' },
                color: '#fff',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '0.9fr 1.1fr' },
                background:
                  i === 0
                    ? 'radial-gradient(circle at 100% 0%, rgba(220,43,73,0.3), transparent 50%), #01294d'
                    : 'radial-gradient(circle at 100% 100%, rgba(220,43,73,0.3), transparent 50%), #011a31',
              }}
            >
              <Box
                aria-hidden="true"
                sx={{ position: 'absolute', left: 0, right: 0, bottom: '16%', opacity: 0.14, pointerEvents: 'none' }}
              >
                <EcgLine color="#fff" width={2} duration={7} sx={{ width: '140%', height: 'auto' }} />
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  m: { xs: 1.5, md: 2 },
                  borderRadius: { xs: '22px', md: '26px' },
                  overflow: 'hidden',
                  aspectRatio: { xs: '4 / 4.2', sm: 'auto' },
                  minHeight: { sm: 380 },
                  bgcolor: 'rgba(255,255,255,0.08)',
                }}
              >
                <Box sx={{ position: { sm: 'absolute' }, inset: 0, height: '100%' }}>
                  <Photo person={f} />
                </Box>
              </Box>

              <Stack
                justifyContent="space-between"
                sx={{ position: 'relative', p: { xs: 3, md: 4 }, pl: { sm: 2 }, gap: 4 }}
              >
                <Typography
                  sx={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}
                >
                  {f.tag}
                </Typography>
                <Box>
                  <Box aria-hidden="true" sx={{ width: 40, height: 3, borderRadius: 2, bgcolor: 'secondary.main', mb: 2 }} />
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: { xs: 28, md: 36 },
                      fontWeight: 500,
                      lineHeight: 1.1,
                      letterSpacing: '-0.03em',
                      mb: 1,
                    }}
                  >
                    {f.name}
                  </Typography>
                  <Typography sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.9)', mb: 1.5 }}>{f.role}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)', mb: 2.5 }}>
                    {f.note}
                  </Typography>
                  <Button
                    onClick={() => openProfile(f)}
                    aria-label={`Learn more about ${f.name}`}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      borderRadius: 999,
                      px: 2.5,
                      textTransform: 'none',
                      fontWeight: 500,
                      bgcolor: '#fff',
                      color: 'text.primary',
                      '&:hover': { bgcolor: '#E8EEF8' },
                    }}
                  >
                    Learn more
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Reveal>
        ))}
      </Box>

      <Reveal>
        <Typography
          component="h3"
          sx={{
            mt: { xs: 5, md: 8 },
            mb: 3,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: { xs: 24, md: 32 },
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          Leadership
        </Typography>
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 3 },
        }}
      >
        {leaders.map((p, i) => (
          <Reveal key={p.name} delay={(i % 3) * 0.1}>
            <Box
              component="article"
              sx={{
                height: '100%',
                bgcolor: '#EEF2F9',
                borderRadius: '28px',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2, md: 2.5 },
              }}
            >
              <Box
                sx={{
                  width: { xs: 96, md: 128 },
                  height: { xs: 96, md: 128 },
                  flexShrink: 0,
                  overflow: 'hidden',
                  borderRadius: '50%',
                  bgcolor: '#EEF2F9',
                  '& img': { transform: 'scale(1.05)' },
                }}
              >
                <Photo person={p} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="h4"
                  sx={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: { xs: 19, md: 22 },
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    mb: 0.5,
                  }}
                >
                  {p.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 0.75 }}>
                  {p.role}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {p.note}
                </Typography>
                <Button
                  onClick={() => openProfile(p)}
                  aria-label={`Learn more about ${p.name}`}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 0,
                    minWidth: 0,
                    textTransform: 'none',
                    fontWeight: 600,
                    color: 'secondary.main',
                    '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                  }}
                >
                  Learn more
                </Button>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>

      <ProfilePanel person={selected} open={open} onClose={() => setOpen(false)} />
    </Section>
  );
}