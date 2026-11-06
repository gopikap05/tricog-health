import { createTheme } from '@mui/material/styles';

const base = createTheme();
const up = base.breakpoints.up;

const fontSizes = (xs, sm, md, lg) => ({
  fontSize: `${xs / 16}rem`,
  [up('sm')]: { fontSize: `${sm / 16}rem` },
  [up('md')]: { fontSize: `${md / 16}rem` },
  [up('lg')]: { fontSize: `${lg / 16}rem` },
});

const headingFont = '"DM Sans", "Helvetica", "Arial", sans-serif';
const bodyFont = '"Open Sans", "Helvetica", "Arial", sans-serif';

const theme = createTheme({
  spacing: 8,

  palette: {
    primary: { main: '#01294d' }, // Tricog blue
    secondary: { main: '#dc2b49' }, // Tricog red (CTAs and accents)
    background: { default: '#F5F5F7', paper: '#FAFAFA' },
    text: { primary: '#0F1B33', secondary: '#4A5565' },
  },

  typography: {
    fontFamily: bodyFont, // Open Sans: paragraphs, buttons, forms, everything else

    // Headings: DM Sans            (xs, sm, md, lg)
    h1: { fontFamily: headingFont, fontWeight: 700, lineHeight: 1.15, ...fontSizes(42, 48, 52, 56) },
    h2: { fontFamily: headingFont, fontWeight: 700, lineHeight: 1.2, ...fontSizes(26, 28, 30, 40) },
    h3: { fontFamily: headingFont, fontWeight: 600, lineHeight: 1.3, ...fontSizes(18, 20, 22, 24) },
    h4: { fontFamily: headingFont, fontWeight: 600, lineHeight: 1.3 },
    h5: { fontFamily: headingFont, fontWeight: 600, lineHeight: 1.3 },
    h6: { fontFamily: headingFont, fontWeight: 600, lineHeight: 1.3 },

    // Paragraphs: Open Sans
    body1: { lineHeight: 1.7, ...fontSizes(15, 16, 17, 18) },
    body2: { lineHeight: 1.6, ...fontSizes(14, 14, 15, 16) },

    button: { fontFamily: bodyFont, fontWeight: 600, textTransform: 'none' },
  },

  shape: { borderRadius: 8 },

  components: {
    // Default button style for the whole site
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;