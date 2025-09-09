import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4F46E5",
    },
    secondary: {
      main: "#0EF5A0",
    },
    error: {
      main: "#FF4D6D", 
    },
    warning: {
      main: "#FFD24D",
    },
    info: {
      main: "#3AB0FF", 
    },
    background: {
      default: "#0F0F15", 
      paper: "#1A1A2E",   
    },
    text: {
      primary: "#E0E0FF", 
      secondary: "#A0A0FF", 
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h4: { fontWeight: 600, color: "#E0E0FF" },
    h5: { fontWeight: 600, color: "#E0E0FF" },
    h6: { fontWeight: 500, color: "#E0E0FF" },
    subtitle1: { color: "#A0A0FF" },
    body1: { color: "#C0C0FF" },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(12px)",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.7)",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          boxShadow: "0 0 8px rgba(79, 70, 229, 0.5)", 
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
        },
        indicator: {
          height: 4,
          borderRadius: 4,
          backgroundColor: "#0EF5A0",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          color: "#FFF",
        },
      },
    },
  },
});

export default darkTheme;