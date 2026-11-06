import { useCallback, useEffect, useRef, useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import tricogLogo from '../assets/imgs/Tricog-Logo.webp';

const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Who we serve', href: '#serve' },
  { label: 'Products', href: '#products' },
  { label: 'Customers', href: '#customers' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
];

const sectionIds = [
  'home',
  'problem',
  'solutions',
  'serve',
  'products',
  'customers',
  'testimonials',
  'certifications',
  'about',
  'team',
  'faq',
  'articles',
  'demo',
];

const NAV_BG = '#01294d';

const DESKTOP = 'lg';

const SPACING = '0.4px';
const SPACING_HOVER = '1.4px';

const flow = keyframes`
  from { background-position: 0% 50%; }
  to   { background-position: 200% 50%; }
`;

const gradientText = (colors) => ({
  backgroundImage: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[0]})`,
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${flow} 1.6s linear infinite`,
});

// Colour pairs (blue + red) for each background
const ON_DARK = ['#5eb5ff', '#ff4d6d']; // nav links on the navy bar
const ON_WHITE = ['#0b5fd6', '#e0314f']; // Contact button (white)
const ON_RED = ['#FFFFFF', '#9fd0ff']; // Request a demo button (red)

// One consistent text style for every label and button in the navbar
const NAV_TEXT = {
  fontSize: 16,      // 16px everywhere
  lineHeight: 1.5,   // same line-height everywhere
  fontWeight: 500,
  letterSpacing: SPACING,
  textTransform: 'none',
  whiteSpace: 'nowrap',
};

// Label that grows its letter spacing on hover WITHOUT pushing neighbours:
// the hidden ::before reserves the widest width up front.
function Label({ children, colors }) {
  return (
    <Box
      component="span"
      className="nav-label"
      data-label={children}
      sx={{
        position: 'relative',
        display: 'inline-block',
        textAlign: 'center',
        letterSpacing: SPACING,
        transition: 'letter-spacing 0.35s ease',
        '&::before': {
          content: 'attr(data-label)',
          display: 'block',
          height: 0,
          overflow: 'hidden',
          visibility: 'hidden',
          letterSpacing: SPACING_HOVER,
        },
        // Triggered by hovering/focusing the parent button
        '*:hover > &, *:focus-visible > &': {
          letterSpacing: SPACING_HOVER,
          ...gradientText(colors),
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '*:hover > &, *:focus-visible > &': { animation: 'none' },
        },
      }}
    >
      {children}
    </Box>
  );
}

// Shared pill-button feel (no lift / no scale): smooth colour + glow only
const BUTTON_MOTION = {
  position: 'relative',
  overflow: 'hidden',
  transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
};

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState('home');
  const [scrolledDown, setScrolledDown] = useState(false);
  const lastY = useRef(0);
  const menuOpen = Boolean(anchorEl);

  // One reliable scroll helper for the logo, every link and Contact.
  // Works in a single click, even if images above the target load late.
  const goTo = useCallback((id) => {
    const getTop = () => {
      if (id === 'home') return 0;
      if (id === 'footer') {
        const footer =
          document.getElementById('footer') || document.querySelector('footer');
        // Footer missing or short: just go to the very bottom
        if (!footer) return document.documentElement.scrollHeight;
        return Math.min(
          footer.getBoundingClientRect().top + window.scrollY,
          document.documentElement.scrollHeight - window.innerHeight
        );
      }
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    };

    const top = getTop();
    if (top === null) return;
    window.scrollTo({ top, behavior: 'smooth' });

    // Correct the position once, in case the layout shifted while scrolling
    window.setTimeout(() => {
      const again = getTop();
      if (again !== null && Math.abs(again - window.scrollY) > 4) {
        window.scrollTo({ top: again, behavior: 'smooth' });
      }
    }, 700);
  }, []);

  const handleNav = (id) => (e) => {
    e.preventDefault();
    setAnchorEl(null);
    setScrolledDown(false);
    goTo(id);
  };

  // Hide the bar while scrolling down, show it again when scrolling up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;
      if (y < 80) {
        setScrolledDown(false); // always visible near the top
      } else if (diff > 8) {
        setScrolledDown(true);
      } else if (diff < -8) {
        setScrolledDown(false);
      }
      if (Math.abs(diff) > 8 || y < 80) lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hidden = scrolledDown && !menuOpen;

  // Scroll-spy: mark the link whose section is in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      component="header"
      onFocus={() => setScrolledDown(false)} // keyboard users always see the bar
      sx={{
        // Outer wrapper: full width, 5% side padding like every other section
        top: { xs: 10, md: 16 },
        left: 0,
        right: 0,
        width: '100%',
        bgcolor: 'transparent',
        boxShadow: 'none',
        color: '#FFFFFF',
        px: '5%',
        pointerEvents: 'none', // only the pill itself is clickable
        transform: hidden ? 'translateY(calc(-100% - 24px))' : 'translateY(0)',
        transition: 'transform 0.35s ease',
      }}
    >
      {/* The floating pill */}
      <Box
        component="nav"
        aria-label="Main navigation"
        sx={{
          width: '100%',
          maxWidth: 1440,
          mx: 'auto',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: { xs: 56, md: 68 },
          px: { xs: 2, md: 3 },
          bgcolor: alpha(NAV_BG, 0.94),
          backdropFilter: 'blur(14px)',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 12px 40px rgba(1, 41, 77, 0.35)',
        }}
      >
        {/* Logo */}
        <Box
          component="a"
          href="#home"
          aria-label="Tricog home"
          onClick={handleNav('home')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#FFFFFF',
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={tricogLogo}
            alt="Tricog"
            sx={{
              height: { xs: 28, md: 36 },
              width: 'auto',
              display: 'block',
            }}
          />
        </Box>

        {/* Desktop links (centered) */}
        <Box
          sx={{
            display: { xs: 'none', [DESKTOP]: 'flex' },
            alignItems: 'center',
            gap: 0.25,
          }}
        >
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const on = active === id;
            return (
              <Button
                key={link.label}
                href={link.href}
                onClick={handleNav(id)}
                color="inherit"
                disableRipple
                aria-current={on ? 'true' : undefined}
                sx={{
                  ...NAV_TEXT,
                  position: 'relative',
                  px: 1.5,
                  color: on ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
                  '&:hover': { bgcolor: 'transparent' }, // no background on hover
                  // Underline: stays for the active link, slides in on hover
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 12,
                    right: 12,
                    bottom: 4,
                    height: 2,
                    borderRadius: 2,
                    bgcolor: 'secondary.main',
                    transform: on ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: on ? 'left' : 'right',
                    transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'left',
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    '&::after': { transition: 'none' },
                  },
                }}
              >
                <Label colors={ON_DARK}>{link.label}</Label>
              </Button>
            );
          })}
        </Box>

        {/* Desktop actions: Contact, then Request a demo */}
        <Box
          sx={{
            display: { xs: 'none', [DESKTOP]: 'flex' },
            alignItems: 'center',
            gap: 1.25,
            flexShrink: 0,
          }}
        >
          <Button
            variant="contained"
            href="#footer"
            onClick={handleNav('footer')}
            disableRipple
            sx={{
              ...NAV_TEXT,
              ...BUTTON_MOTION,
              borderRadius: 999,
              py: '8px',
              px: '26px',
              color: NAV_BG,
              bgcolor: '#FFFFFF',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#FFFFFF',
                boxShadow: '0 8px 22px rgba(255,255,255,0.28)',
              },
            }}
          >
            <Label colors={ON_WHITE}>Contact</Label>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            href="#demo"
            onClick={handleNav('demo')}
            disableRipple
            sx={{
              ...NAV_TEXT,
              ...BUTTON_MOTION,
              borderRadius: 999,
              py: '8px',
              px: '26px',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#dc2b49',
                boxShadow: '0 8px 22px rgba(220,43,73,0.45)',
              },
            }}
          >
            <Label colors={ON_RED}>Request a demo</Label>
          </Button>
        </Box>

        {/* Mobile / tablet */}
        <Box
          sx={{
            display: { xs: 'flex', [DESKTOP]: 'none' },
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            href="#demo"
            onClick={handleNav('demo')}
            disableRipple
            sx={{
              ...NAV_TEXT,
              ...BUTTON_MOTION,
              borderRadius: 999,
              py: '5px',
              px: '15px',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#dc2b49',
                boxShadow: '0 8px 22px rgba(220,43,73,0.45)',
              },
            }}
          >
            <Label colors={ON_RED}>Request a demo</Label>
          </Button>
          <IconButton
            aria-label="Open navigation menu"
            aria-controls={menuOpen ? 'mobile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              color: '#FFFFFF',
              '&:hover': { bgcolor: 'transparent' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            slotProps={{ paper: { sx: { borderRadius: '20px', mt: 1, minWidth: 220 } } }}
          >
            {navLinks.map((link) => (
              <MenuItem
                key={link.label}
                component="a"
                href={link.href}
                onClick={handleNav(link.href.slice(1))}
                sx={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  letterSpacing: SPACING,
                  transition: 'letter-spacing 0.3s ease, color 0.3s ease',
                  '&:hover': { letterSpacing: SPACING_HOVER, color: '#0b5fd6' },
                }}
              >
                {link.label}
              </MenuItem>
            ))}
            <MenuItem
              component="a"
              href="#footer"
              onClick={handleNav('footer')}
              sx={{
                fontSize: 16,
                lineHeight: 1.5,
                letterSpacing: SPACING,
                transition: 'letter-spacing 0.3s ease, color 0.3s ease',
                '&:hover': { letterSpacing: SPACING_HOVER, color: '#0b5fd6' },
              }}
            >
              Contact
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </AppBar>
  );
}