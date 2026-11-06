import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Section from './Section';

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
const intro = {
  label: 'FAQ',
  heading: 'Questions, answered',
  body: 'The basics of how Tricog works and how to get started.',
};

const faqs = [
  {
    q: 'What is InstaECG?',
    a: 'InstaECG is an AI-aided ECG interpretation service launched in 2015 and used by 6000+ active users. An ECG taken at your centre goes to the Tricog Cloud, the AI engine makes a preliminary diagnosis, and cardiac specialists verify it.',
  },
  {
    q: 'How fast are reports delivered?',
    a: "Cardiac specialists at Tricog's 24×7 medical hub verify the AI's preliminary diagnosis and generate the final report. It is then sent by mobile app and email within minutes.",
  },
  {
    q: 'Which devices work with Tricog?',
    a: 'You can use the Tricog 12-Lead ECG machine (VCardia). The Communicator is an IoT device that sends ECG data over GSM or WiFi and is compatible with more than 12 ECG brands.',
  },
  {
    q: 'Who can use it?',
    a: 'Clinics and general physicians, hospitals, diagnostic centres and public health programmes, as well as home health services, pharma and others.',
  },
  {
    q: 'How do I get started?',
    a: 'Fill in the demo form below or call our sales team on 080-4718-9181. For support, call 080-4075-3333.',
  },
];

/* ---------- Component ---------- */
export default function FAQ() {
  return (
    <Section id="faq">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
          gap: { xs: 4, md: 8 },
          alignItems: 'start',
        }}
      >
        <Box sx={{ position: { md: 'sticky' }, top: { md: 120 } }}>
          <Reveal>
            <Typography
              sx={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.12em', color: 'primary.main', mb: 2 }}
            >
              {intro.label}
            </Typography>
            <Typography component="h2" variant="h2" sx={{ fontWeight: 500, letterSpacing: '-0.02em' }}>
              {intro.heading}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, maxWidth: 420 }}>
              {intro.body}
            </Typography>

            <Box
              sx={{
                mt: 4,
                borderRadius: '28px',
                p: 3.5,
                bgcolor: 'primary.main',
                color: '#fff',
                maxWidth: 420,
              }}
            >
              <Typography sx={{ fontSize: 13, opacity: 0.75, mb: 0.5 }}>Still have a question?</Typography>
              <Typography
                component="p"
                variant="h3"
                sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 500, mb: 2.5 }}
              >
                Talk to our sales team
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', rowGap: 1.5 }}>
                <Button
                  href="tel:08047189181"
                  startIcon={<PhoneOutlinedIcon />}
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
                  080-4718-9181
                </Button>
                <Button
                  href="#demo"
                  sx={{
                    borderRadius: 999,
                    px: 2.5,
                    textTransform: 'none',
                    fontWeight: 500,
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.45)',
                  }}
                >
                  Request a demo
                </Button>
              </Stack>
            </Box>
          </Reveal>
        </Box>

        <Box>
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.06}>
              <Accordion
                disableGutters
                elevation={0}
                square
                sx={{
                  bgcolor: '#EEF2F9',
                  borderRadius: '24px !important',
                  mb: 1.5,
                  border: '1px solid transparent',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                  '&::before': { display: 'none' },
                  '&.Mui-expanded': { bgcolor: '#fff', borderColor: '#DDE5F1' },
                }}
              >
                <AccordionSummary
                  expandIcon={<AddIcon sx={{ color: 'primary.main' }} />}
                  aria-controls={`faq-${i}-content`}
                  id={`faq-${i}-header`}
                  sx={{
                    px: 3,
                    py: 1,
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(45deg)' },
                    '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 2 },
                  }}
                >
                  <Typography
                    aria-hidden="true"
                    sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: 14, color: 'text.secondary' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </Typography>
                  <Typography component="h3" variant="h3" sx={{ fontWeight: 500, letterSpacing: '-0.01em' }}>
                    {item.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pl: { xs: 3, md: 8 } }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640 }}>
                    {item.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  );
}