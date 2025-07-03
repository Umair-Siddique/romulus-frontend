import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#A1B7AF",
      light: "#D1DAD6",
      dark: "#768C84",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#768C84",
      light: "#A1B7AF",
      dark: "#4A5B55",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F6F6F6",
    },
    text: {
      primary: "#000000",
      secondary: "#747474",
      disabled: "#B0BEC5",
    },
    error: {
      main: "#B55252",
    },
    divider: "#E0E0E0",
  },
  typography: {
    fontFamily: `"Montserrat", "Inter", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontFamily: `"Montserrat", "Inter", sans-serif`,
      fontWeight: 700, // Boldest for highest importance
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: `"Montserrat", "Inter", sans-serif`,
      fontWeight: 600, // Slightly less bold
      fontSize: "2rem",
    },
    h3: {
      fontFamily: `"Montserrat", "Inter", sans-serif`,
      fontWeight: 500, // Medium-bold, balanced
      fontSize: "1.75rem",
    },
    h4: {
      fontFamily: `"Montserrat", "Inter", sans-serif`,
      fontWeight: 500,
      fontSize: "1.5rem",
    },
    h5: {
      fontFamily: `"Montserrat", "Inter", sans-serif`,
      fontWeight: 400, // Regular weight for subheadings
      fontSize: "1.25rem",
    },
    h6: {
      fontFamily: `"Montserrat", "Inter", sans-serif`,
      fontWeight: 400, // Same as body text weight, minimal emphasis
      fontSize: "1rem",
    },
    button: {
      fontFamily: `"Montserrat", "Inter", sans-serif`,
      fontWeight: 600,
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#2F2F2F",
          borderBottom: "1px solid #E8ECEB",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 2px 8px rgba(126, 148, 142, 0.08)",
        },
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme);

export default theme;
