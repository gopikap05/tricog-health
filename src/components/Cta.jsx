import { useEffect, useRef, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
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
const roles = ['Hospital', 'Diagnostic centre', 'Clinic', 'Government/Public health', 'Other'];

const times = ['Morning (9 am – 12 pm)', 'Afternoon (12 pm – 4 pm)', 'Evening (4 pm – 7 pm)'];

const contacts = [
  { icon: PhoneOutlinedIcon, label: 'Sales', value: '080-4718-9181', href: 'tel:08047189181' },
  { icon: PhoneOutlinedIcon, label: 'Support', value: '080-4075-3333', href: 'tel:08040753333' },
  { icon: PlaceOutlinedIcon, label: 'Offices', value: 'Bengaluru and Singapore' },
];

const emptyForm = { name: '', phone: '', email: '', role: '', time: '', city: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name';
  if (!/^[0-9+\-\s]{8,15}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number';
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Enter a valid email address';
  if (!values.role) errors.role = 'Please choose one';
  if (!values.time) errors.time = 'Please choose a preferred time';
  return errors;
}

const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: '#F8FAFD' },
};

const placeholder = (text) => (
  <Box component="span" sx={{ color: 'text.secondary' }}>
    {text}
  </Box>
);

/* ---------- Component ---------- */
export default function Cta() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) setSubmitted(true);
  };

  const reset = () => {
    setValues(emptyForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <Section id="demo">
      <Reveal>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: '28px', md: '40px' },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.15fr' },
            background:
              'radial-gradient(circle at 0% 0%, #0a3d6b 0%, transparent 55%), radial-gradient(circle at 100% 100%, rgba(220,43,73,0.4), transparent 50%), #01294d',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              color: '#fff',
              p: { xs: 3, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 5,
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Typography
                sx={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.75, mb: 2 }}
              >
                Get started
              </Typography>
              <Typography
                component="h2"
                variant="h2"
                sx={{ fontWeight: 500, letterSpacing: '-0.02em', fontSize: { md: 48 } }}
              >
                Request a demo
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: 'rgba(255,255,255,0.85)', maxWidth: 420 }}>
                Tell us a little about you and the Tricog team will get in touch.
              </Typography>
            </Box>

            <Stack spacing={2} sx={{ position: 'relative' }}>
              {contacts.map((c) => {
                const Icon = c.icon;
                return (
                  <Stack key={c.label} direction="row" spacing={1.5} alignItems="center">
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.14)',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 12, opacity: 0.7 }}>{c.label}</Typography>
                      {c.href ? (
                        <Typography
                          component="a"
                          href={c.href}
                          sx={{
                            color: '#fff',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {c.value}
                        </Typography>
                      ) : (
                        <Typography sx={{ fontWeight: 500 }}>{c.value}</Typography>
                      )}
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>

          <Box
            sx={{
              position: 'relative',
              bgcolor: '#fff',
              m: { xs: 1, md: 1.5 },
              borderRadius: { xs: '22px', md: '30px' },
              p: { xs: 3, md: 5 },
            }}
          >
            {submitted ? (
              <Stack
                spacing={2}
                alignItems="flex-start"
                justifyContent="center"
                role="status"
                aria-live="polite"
                sx={{ minHeight: 400 }}
              >
                <CheckCircleOutlineIcon sx={{ fontSize: 56, color: 'primary.main' }} />
                <Typography component="h3" variant="h3" sx={{ fontWeight: 500 }}>
                  Thank you, {values.name.split(' ')[0]}.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  We have received your request and will contact you shortly.
                </Typography>
                <Button
                  onClick={reset}
                  sx={{ borderRadius: 999, textTransform: 'none', px: 3, bgcolor: '#EEF2F9', color: 'text.primary' }}
                >
                  Send another request
                </Button>
              </Stack>
            ) : (
              <Box component="form" noValidate onSubmit={handleSubmit} aria-label="Request a demo form">
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 2.5,
                  }}
                >
                  <TextField
                    name="name"
                    label="Name"
                    required
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    autoComplete="name"
                    fullWidth
                    sx={fieldSx}
                  />
                  <TextField
                    name="phone"
                    label="Phone number"
                    type="tel"
                    required
                    value={values.phone}
                    onChange={handleChange}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                    autoComplete="tel"
                    fullWidth
                    sx={fieldSx}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    autoComplete="email"
                    fullWidth
                    sx={fieldSx}
                  />
                  <TextField
                    select
                    name="role"
                    label="What best describes you?"
                    required
                    value={values.role}
                    onChange={handleChange}
                    error={Boolean(errors.role)}
                    helperText={errors.role}
                    fullWidth
                    sx={fieldSx}
                    slotProps={{
                      inputLabel: { shrink: true },
                      select: {
                        displayEmpty: true,
                        renderValue: (v) => (v ? v : placeholder('Please Select')),
                      },
                    }}
                  >
                    {roles.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    name="time"
                    label="Preferred time to connect with you"
                    required
                    value={values.time}
                    onChange={handleChange}
                    error={Boolean(errors.time)}
                    helperText={errors.time}
                    fullWidth
                    sx={fieldSx}
                    slotProps={{
                      inputLabel: { shrink: true },
                      select: {
                        displayEmpty: true,
                        renderValue: (v) => (v ? v : placeholder('Please Select')),
                      },
                    }}
                  >
                    {times.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    name="city"
                    label="City"
                    value={values.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    fullWidth
                    sx={fieldSx}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                                            borderRadius: 999,
                      py: 1.4,
                      textTransform: 'none',
                      fontWeight: 500,
                      boxShadow: 'none',
                      '&:hover': { boxShadow: 'none', bgcolor: '#b8213b' },
                    }}
                  >
                    Request a demo
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}