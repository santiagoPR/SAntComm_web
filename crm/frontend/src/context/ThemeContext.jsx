import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Theme mode options
export const THEME_MODES = {
  DAY_DARK: 'day_dark',
  DAY_LIGHT: 'day_light',
  NIGHT: 'night',
  AUTO: 'auto'
};

// Color themes (like Zoho's theme options)
export const COLOR_THEMES = {
  BLUE: 'blue',
  PURPLE: 'purple',
  GREEN: 'green',
  ORANGE: 'orange',
  RED: 'red',
  TEAL: 'teal'
};

const colorPalettes = {
  blue: { main: '#2563eb', light: '#3b82f6', dark: '#1e40af' },
  purple: { main: '#7c3aed', light: '#8b5cf6', dark: '#6d28d9' },
  green: { main: '#10b981', light: '#34d399', dark: '#059669' },
  orange: { main: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
  red: { main: '#ef4444', light: '#f87171', dark: '#dc2626' },
  teal: { main: '#14b8a6', light: '#2dd4bf', dark: '#0d9488' }
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('themeMode') || THEME_MODES.DAY_LIGHT;
  });

  const [colorTheme, setColorTheme] = useState(() => {
    return localStorage.getItem('colorTheme') || COLOR_THEMES.BLUE;
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setSystemPrefersDark(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  // Determine actual mode to use
  const effectiveMode = useMemo(() => {
    if (themeMode === THEME_MODES.AUTO) {
      return systemPrefersDark ? THEME_MODES.NIGHT : THEME_MODES.DAY_LIGHT;
    }
    return themeMode;
  }, [themeMode, systemPrefersDark]);

  const isDark = effectiveMode === THEME_MODES.NIGHT || effectiveMode === THEME_MODES.DAY_DARK;

  // Create MUI theme based on mode
  const muiTheme = useMemo(() => {
    const selectedColor = colorPalettes[colorTheme];

    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: selectedColor.main,
          light: selectedColor.light,
          dark: selectedColor.dark,
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#7c3aed',
          light: '#8b5cf6',
          dark: '#6d28d9',
          contrastText: '#ffffff',
        },
        background: {
          default: isDark ? '#0f172a' : '#f8fafc',
          paper: isDark ? '#1e293b' : '#ffffff',
          sidebar: isDark ? '#0f172a' : effectiveMode === THEME_MODES.DAY_DARK ? '#1e293b' : '#ffffff',
          primarySidebar: isDark ? '#0a0f1e' : effectiveMode === THEME_MODES.DAY_DARK ? '#0f172a' : '#1e293b',
        },
        text: {
          primary: isDark ? '#f1f5f9' : '#1e293b',
          secondary: isDark ? '#94a3b8' : '#64748b',
        },
        divider: isDark ? '#334155' : '#e2e8f0',
        success: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        error: {
          main: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
        },
        warning: {
          main: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        info: {
          main: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
      },
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontSize: '2.5rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        },
        h2: {
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.01em',
        },
        h3: {
          fontSize: '1.75rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
        },
        h4: {
          fontSize: '1.5rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
        },
        h5: {
          fontSize: '1.25rem',
          fontWeight: 600,
        },
        h6: {
          fontSize: '1.125rem',
          fontWeight: 600,
        },
        button: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
      shape: {
        borderRadius: 12,
      },
      shadows: [
        'none',
        '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      ],
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              padding: '10px 20px',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              },
            },
            contained: {
              '&:hover': {
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '16px',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              borderRight: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
              boxShadow: 'none',
            },
          },
        },
      },
    });
  }, [effectiveMode, colorTheme, isDark]);

  const value = {
    themeMode,
    setThemeMode,
    colorTheme,
    setColorTheme,
    effectiveMode,
    isDark,
    muiTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
