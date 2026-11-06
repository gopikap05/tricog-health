import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Section from '../components/Section';
import logo from '../assets/imgs/Tricog-Logo.webp';

/* ---------- Footer data ---------- */
const LEGAL_URL = 'https://tricog.com/legal/';

const brand = {
  tagline: 'Accelerating Cardiac Care',
  line: 'AI-powered cardiac diagnostics.',
};

const phones = [
  { label: 'Sales', text: '080-4718-9181', href: 'tel:08047189181' },
  { label: 'Support', text: '080-4075-3333', href: 'tel:08040753333' },
];

const emails = [
  { label: 'Strategic Partnership', href: 'mailto:marketing@tricog.com' },
  { label: 'Career Opportunities', href: 'mailto:careers@tricog.com' },
  { label: 'Support', href: 'mailto:support@tricog.com' },
];

const socials = [
  { label: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/tricog/', hover: '#1877F2' },
  { label: 'X', icon: XIcon, href: 'https://x.com/tricoghealth', hover: '#000000' },
  {
    label: 'Instagram',
    icon: InstagramIcon,
    href: 'https://www.instagram.com/tricoghealth/',
    hover: 'linear-gradient(45deg, #F09433 0%, #E6683C 25%, #DC2743 50%, #CC2366 75%, #BC1888 100%)',
  },
  { label: 'YouTube', icon: YouTubeIcon, href: 'https://www.youtube.com/channel/UCV-uGseptgruiCZrFuPz9SA', hover: '#FF0000' },
  { label: 'LinkedIn', icon: LinkedInIcon, href: 'https://in.linkedin.com/company/tricog-health', hover: '#0A66C2' },
];

const linkGroups = [
  {
    title: 'Company',
    links: [
      { label: 'About us', href: 'https://tricog.com/about-us/' },
      { label: 'Careers', href: 'https://tricog.com/careers/' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'InstaECG', href: 'https://tricog.com/instaecg/' },
      { label: 'InstaECHO', href: 'https://tricog.com/instaecho/' },
      { label: 'KeeboHealth', href: 'https://keebohealth.com/' },
      { label: 'VCardia', href: 'https://tricog.com/vcardia/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'News & Articles', href: 'https://tricog.com/news' },
      { label: 'Academy', href: 'https://tricog.com/academy' },
      { label: 'Quality & Regulatory Compliance', href: 'https://tricog.com/regulatory-compliance/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Use', href: LEGAL_URL },
      { label: 'Privacy & Data Protection Policy', href: LEGAL_URL },
    ],
  },
];

const locations = [
  {
    city: 'Singapore',
    lines: ['Tricog Health, PTE Ltd 20, Bendemeer Road, #3-12 BS Bendemeer Center, Singapore — 339914'],
  },
  {
    city: 'Bangalore',
    lines: [
      'Tricog Health India Private Limited.',
      'Old No. 82, New No. 3, PID No. 5-24-3, Second Main Road, Vyalikaval Extension, Bangalore, Karnataka, India, 560003',
    ],
  },
];

const columnTitleSx = {
  fontSize: 12,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.55)',
  mb: 2,
};

const footerLinkSx = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  fontSize: 15,
  transition: 'color 0.2s ease, transform 0.2s ease',
  display: 'inline-block',
  '&:hover': { color: '#dc2b49', transform: 'translateX(4px)' },
};

const externalProps = { target: '_blank', rel: 'noopener noreferrer' };

/* ---------- Component ---------- */
export default function Footer() {
  return (
    <Section
      bgcolor="#011a31"
      sx={{
        color: '#fff',
        // Bottom padding halved at EVERY breakpoint (Section default: 40 / 60 / 80 / 100).
        pb: { xs: '20px', sm: '30px', md: '40px', lg: '50px' },
        background:
          'radial-gradient(circle at 0% 0%, rgba(1,41,77,0.9), transparent 55%), radial-gradient(circle at 100% 100%, rgba(220,43,73,0.22), transparent 45%), #011a31',
      }}
    >
      <Box component="footer">
        {/* Brand row */}
        <Box
          sx={{
            pb: { xs: 4, md: 5 },
            mb: { xs: 4, md: 6 },
            borderBottom: '1px solid rgba(255,255,255,0.14)',
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Tricog"
            sx={{
              display: 'block',
              height: { xs: 40, md: 48 },
              width: 'auto',
              mb: 2,
              // Turns the logo white for the dark background. Remove this line if the logo is already light.
              filter: 'brightness(0) invert(1)',
            }}
          />
          <Typography
            component="p"
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: { xs: 24, md: 30 },
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              mb: 0.75,
            }}
          >
            {brand.tagline}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {brand.line}
          </Typography>
        </Box>

        {/* Columns */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1.1fr 1fr 1fr 1.3fr' },
            gap: { xs: 5, md: 6 },
            alignItems: 'start',
          }}
        >
          {/* Call / Email / Connect */}
          <Stack spacing={4}>
            <Box>
              <Typography component="p" sx={columnTitleSx}>
                Call us
              </Typography>
              <Stack spacing={1}>
                {phones.map((p) => (
                  <Typography key={p.label} sx={{ fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>
                    <Box component="span" sx={{ fontWeight: 600, color: '#fff' }}>
                      {p.label}:{' '}
                    </Box>
                    <Link href={p.href} sx={{ ...footerLinkSx, '&:hover': { color: '#dc2b49' } }}>
                      {p.text}
                    </Link>
                  </Typography>
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography component="p" sx={columnTitleSx}>
                Email us
              </Typography>
              <Stack spacing={1.25} alignItems="flex-start">
                {emails.map((e) => (
                  <Link
                    key={e.label}
                    href={e.href}
                    sx={{
                      color: '#dc2b49',
                      fontWeight: 600,
                      fontSize: 15,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {e.label}
                  </Link>
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography component="p" sx={columnTitleSx}>
                Let&apos;s connect
              </Typography>
              <Stack direction="row" spacing={1}>
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <IconButton
                      key={s.label}
                      href={s.href}
                      {...externalProps}
                      aria-label={`Tricog on ${s.label} (opens in a new tab)`}
                      sx={{
                        width: 40,
                        height: 40,
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.3)',
                        transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                        '&:hover': {
                          background: s.hover,
                          borderColor: s.label === 'X' ? 'rgba(255,255,255,0.6)' : 'transparent',
                          color: '#fff',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </IconButton>
                  );
                })}
              </Stack>
            </Box>
          </Stack>

          {/* Company + Products */}
          <Stack spacing={4} component="nav" aria-label="Company and products">
            {linkGroups.slice(0, 2).map((group) => (
              <Box key={group.title}>
                <Typography component="p" sx={columnTitleSx}>
                  {group.title}
                </Typography>
                <Stack spacing={1.5} alignItems="flex-start">
                  {group.links.map((link) => (
                    <Link key={link.label} href={link.href} sx={footerLinkSx}>
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>

          {/* Resources + Legal */}
          <Stack spacing={4} component="nav" aria-label="Resources and legal">
            {linkGroups.slice(2).map((group) => (
              <Box key={group.title}>
                <Typography component="p" sx={columnTitleSx}>
                  {group.title}
                </Typography>
                <Stack spacing={1.5} alignItems="flex-start">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      {...(group.title === 'Legal' ? externalProps : {})}
                      sx={footerLinkSx}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>

          {/* Headquarters */}
          <Box>
            <Typography component="p" sx={columnTitleSx}>
              Headquarters location
            </Typography>
            <Stack spacing={3}>
              {locations.map((loc) => (
                <Box key={loc.city} component="address" sx={{ fontStyle: 'normal' }}>
                  <Typography sx={{ fontWeight: 600, mb: 0.5 }}>{loc.city}</Typography>
                  {loc.lines.map((line) => (
                    <Typography key={line} variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                      {line}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.14)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)' }}>
            Copyright © 2026 Tricog Health | All rights reserved
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={{ xs: 1.5, sm: 2 }}
            sx={{ pr: { md: 9 } }} // keeps links clear of the floating WhatsApp button
          >
            <Link
              href={LEGAL_URL}
              {...externalProps}
              sx={{ ...footerLinkSx, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', '&:hover': { color: '#dc2b49' } }}
            >
              Privacy &amp; Data Protection Policy
            </Link>
            <Link
              href={LEGAL_URL}
              {...externalProps}
              sx={{ ...footerLinkSx, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', '&:hover': { color: '#dc2b49' } }}
            >
              Terms of Use
            </Link>
          </Stack>
        </Box>
      </Box>
    </Section>
  );
}