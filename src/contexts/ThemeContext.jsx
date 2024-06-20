import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();



const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  

  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              background: {
                default: '#f9f9f9',
                paper: '#ffffff',
              },
              text: {
                primary: '#000000',
              },
            }
          : {
              background: {
                default: '#303030',
                paper: '#424242',
              },
              text: {
                primary: '#ffffff',
              },
            }),
      },
    }), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      document.body.classList.toggle('dark-mode', newMode === 'dark');
      document.body.classList.toggle('light-mode', newMode === 'light');
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;