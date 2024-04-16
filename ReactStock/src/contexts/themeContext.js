import React, { useContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

// Create default light theme
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Trendy Green
    },
    secondary: {
      main: '#ff5722', // Trendy Orange
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
    outline: {
      main: '#ff5722', // Trendy Orange
    },
    field: {
      main: '#FFFFFF', // White
    },
    background: {
      default: '#4caf50', // Trendy Green
      bkg: '#FFFFFF', // White
    },
    text: {
      primary: '#333333', // Dark Gray
      secondary: '#666666', // Medium Gray
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    // Other typography styles...
  },
});

// Create dark theme based on light theme colors
const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#64B5F6', // Dark blue for primary in dark mode
      },
      secondary: {
        main: '#FFAB91', // Light orange for secondary in dark mode
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
      outline: {
        main: '#FFAB91', // Light orange
      },
      field: {
        main: '#d3d3d3', // Light Grey
      },
      background: {
        default: '#263238', // Dark background color
        bkg: '#BDBDBD', // Light Grey
      },
      text: {
        primary: '#FFFFFF', // White text color
        secondary: '#B0BEC5', // Light Gray text color
      },
    },
    typography: lightTheme.typography,
  });

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    console.log('Toggling theme...');
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Use dark theme if selected, otherwise use light theme
  const selectedTheme = theme === 'dark' ? darkTheme : lightTheme;
  console.log('Current theme:', selectedTheme);

  return (
    <ThemeContext.Provider value={selectedTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;