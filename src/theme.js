import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3B82F6",   
    },
    secondary: {
      main: "#10B981",   
    },
    background: {
      default: "#F3F4F6",  
      paper: "rgba(255, 255, 255, 0.85)", 
    },
    text: {
      primary: "#111827", 
      secondary: "#6B7280", 
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h4: { fontWeight: 600, color: "#111827" },
    h5: { fontWeight: 600, color: "#111827" },
    h6: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 16, 
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(10px)", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)", 
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", 
          borderRadius: 12,
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
        },
      },
    },
  },
});

export default lightTheme;
