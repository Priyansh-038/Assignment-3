import React, { createContext, useState, useMemo, useEffect, useContext } from 'react';
import { lightTheme, darkTheme } from '../theme/theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const root = document.documentElement;
    const activeMuiTheme = currentTheme === 'light' ? lightTheme : darkTheme;

    root.style.setProperty('--background-color', activeMuiTheme.palette.background.default);
    root.style.setProperty('--text-color', activeMuiTheme.palette.text.primary);
    root.style.setProperty('--sidebar-bg-color', activeMuiTheme.components.MuiDrawer.styleOverrides.paper.backgroundColor);
    root.style.setProperty('--primary-color-main', activeMuiTheme.palette.primary.main);
    root.style.setProperty('--primary-color-dark', activeMuiTheme.palette.primary.dark || activeMuiTheme.palette.primary.main);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({
    currentTheme,
    toggleTheme,
  }), [currentTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);