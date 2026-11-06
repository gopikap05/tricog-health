import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Section from './Section';

/* ---------- Section data (content from tricog.com) ---------- */
// Big statement: plain text pieces mixed with small decorative pills
const statement = [
  { text: "CVD is the world's #1" },
  { pill: 'heart' },
  { text: 'killer, causing' },
  { pill: 'pulse' },
  { text: '31%', highlight: true },
  { text: 'of global deaths*' },
];

const pillStyles = {
  heart: { icon: FavoriteBorderIcon, bg: 'linear-gradient(135deg, #dc2b49, #a81c35)' },
  pulse: { icon: MonitorHeartOutlinedIcon, bg: 'linear-gradient(135deg, #01294d, #0b4a80)' },
};

const intro = {
  label: 'THE PROBLEM',
  heading: 'Where the delay begins',
  body:
    'A delay in the cardiac care treatment process causes premature mortality and morbidity. Lack of access, infrastructure, expertise and availability are the major gaps.',
};

const gaps = [
  {
    value: 42,
    title: 'Lack of Timely Access',
    text: 'Poor primary health infrastructure keeps patients from reaching a diagnosis in time.',
    icon: AccessTimeIcon,
    color: '#01294d',
  },
  {
    value: 58,
    title: 'Quality of Care',
    text: 'Skill and availability gaps of doctors and specialists.',
    icon: MedicalServicesOutlinedIcon,
    color: '#dc2b49',
  },
];

const solution = {
  tagline: 'Proprietary AI + Technology + medical expertise',
  result: 'Improved Cardiac Care Pathway',
};

/* ---------- Animations ---------- */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const beat = keyframes`
  0%, 100% { transform: scale(1); }
  14%      { transform: scale(1.12); }
  28%      { transform: scale(1); }
  42%      { transform: scale(1.08); }
  70%      { transform: scale(1); }
`;

/* ---------- Helpers ---------- */
// Becomes true once the element scrolls into view
function useInView(threshold = 0.25) {
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
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function useCountUp(target, start, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return undefined;
    }
    let raf;
    let t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}

const reveal = (inView, delay = 0) => ({
  opacity: 0,
  ...(inView && { animation: `${fadeUp} 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both` }),
});

/* ---------- Pieces ---------- */
function InlinePill({ type }) {
  const { icon: Icon, bg } = pillStyles[type];
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        width: { xs: 52, md: 92 },
        height: { xs: 30, md: 52 },
        mx: { xs: 0.5, md: 1 },
        mb: { xs: 0.5, md: 1 },
        borderRadius: 999,
        background: bg,
        color: '#fff',
        ...(type === 'heart' && { animation: `${beat} 1.6s ease-in-out infinite` }),
      }}
    >
      <Icon sx={{ fontSize: { xs: 18, md: 28 } }} />
    </Box>
  );
}

function GapCard({ value, title, text, icon: Icon, color, inView, delay }) {
  const count = useCountUp(value, inView);
  return (
    <Box
      sx={{
        bgcolor: '#EEF2F9',
        borderRadius: '24px',
        p: { xs: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: { xs: 280, md: 340 },
        ...reveal(inView, delay),
      }}
    >
      {/* Title left, icon pinned right, both vertically centred */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2, m: 0, flex: 1 }}
        >
          {title}
        </Typography>
        <Icon aria-hidden="true" sx={{ color, fontSize: 28, flexShrink: 0, display: 'block' }} />
      </Box>

      <Box>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: { xs: 72, md: 96 },
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color,
          }}
        >
          {count}%
        </Typography>

        {/* Bar shows the same percentage visually */}
        <Box
          role="img"
          aria-label={`${value} percent`}
          sx={{ height: 6, borderRadius: 999, bgcolor: 'rgba(15,27,51,0.08)', mt: 2.5, mb: 2, overflow: 'hidden' }}
        >
          <Box
            sx={{
              height: '100%',
              width: inView ? `${value}%` : '0%',
              bgcolor: color,
              borderRadius: 999,
              transition: 'width 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
            }}
          />
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

/* ---------- Component ---------- */
export default function Problem() {
  const [statementRef, statementInView] = useInView(0.3);
  const [introRef, introInView] = useInView(0.2);
  const [cardsRef, cardsInView] = useInView(0.2);

  return (
    <Section id="problem">
      <Box>
        {/* 1. Big statement */}
        <Box ref={statementRef} sx={{ textAlign: 'center', maxWidth: 980, mx: 'auto', ...reveal(statementInView) }}>
          <Typography
            component="h2"
            variant="h1"
            sx={{ fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.03em', color: 'text.primary' }}
          >
            {statement.map((part, i) =>
              part.pill ? (
                <InlinePill key={i} type={part.pill} />
              ) : (
                <Box
                  key={i}
                  component="span"
                  sx={{ color: part.highlight ? 'secondary.main' : 'inherit', mr: 0.6 }}
                >
                  {part.text}
                </Box>
              )
            )}
          </Typography>
        </Box>

        {/* 2. Intro row: label left, heading + text right */}
        <Box
          ref={introRef}
          sx={{
            mt: { xs: '60px', md: '100px', lg: '120px' },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 2.2fr' },
            gap: { xs: 2, md: 4 },
            ...reveal(introInView),
          }}
        >
          <Typography
            sx={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', color: 'primary.main', pt: { md: 1.5 } }}
          >
            {intro.label}
          </Typography>
          <Box>
            <Typography component="h3" variant="h2" sx={{ fontWeight: 500, letterSpacing: '-0.02em' }}>
              {intro.heading}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: 560 }}>
              {intro.body}
            </Typography>
          </Box>
        </Box>

        {/* 3. Two gap cards */}
        <Box
          ref={cardsRef}
          sx={{
            mt: { xs: 5, md: 7 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {gaps.map((gap, i) => (
            <GapCard key={gap.title} {...gap} inView={cardsInView} delay={i * 0.15} />
          ))}
        </Box>

        {/* 4. Bridge to the solution */}
        <Box
          sx={{
            mt: { xs: 3, md: 4 },
            borderRadius: '24px',
            bgcolor: 'primary.main',
            color: '#fff',
            p: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            ...reveal(cardsInView, 0.35),
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', mb: 0.5 }}>
              {solution.tagline}
            </Typography>
            <Typography
              component="p"
              variant="h3"
              sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, letterSpacing: '-0.01em' }}
            >
              {solution.result}
            </Typography>
          </Box>
          <Button
            href="#solutions"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: 999,
              px: 3,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 500,
              bgcolor: '#fff',
              color: 'text.primary',
              '&:hover': { bgcolor: '#E8EEF8' },
            }}
          >
            See how it works
          </Button>
        </Box>
      </Box>
    </Section>
  );
}