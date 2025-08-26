import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#10B981", 
    },
    secondary: {
      main: "#3B82F6", 
    },
    background: {
      default: "#121212", 
      paper: "#1E1E1E",  
    },
    text: {
      primary: "#E5E7EB", 
      secondary: "#9CA3AF", 
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h4: { fontWeight: 600 },
    h6: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 16, 
  },
});

export default darkTheme;