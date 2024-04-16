import { createTheme } from '@mui/material/styles';

// Custom Theme
const Theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', // Trendy Green
      //  main: '#2196f3', // Material Blue
      },
      secondary: {
        main: '#ff5722', // Trendy Orange
      //  main: '#ff5722', // Material Orange
      },
      error: {
        main: '#f44336', // Material Red
      },
      warning: {
        main: '#ff9800', // Material Amber
      },
      info: {
        main: '#00bcd4', // Material Cyan
      },
      success: {
        main: '#4caf50', // Material Green
      },
      background: {
        default: '#f5f5f5', // Light Gray
      },
      text: {
        primary: '#333333', // Dark Gray
        secondary: '#666666', // Medium Gray
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif', // Roboto is a widely used and readable font
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
  });

export default Theme;