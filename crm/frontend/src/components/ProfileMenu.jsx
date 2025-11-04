import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Chip
} from '@mui/material';
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  WbSunny as DayIcon,
  NightsStay as NightIcon,
  Brightness4 as AutoIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useTheme as useCustomTheme, THEME_MODES, COLOR_THEMES } from '../context/ThemeContext';

const ProfileMenu = ({ anchorEl, open, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { themeMode, setThemeMode, colorTheme, setColorTheme, effectiveMode, isDark } = useCustomTheme();
  const [showThemes, setShowThemes] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const handleThemeModeChange = (event, newMode) => {
    if (newMode !== null) {
      setThemeMode(newMode);
    }
  };

  const colorOptions = [
    { id: COLOR_THEMES.BLUE, color: '#2563eb', label: 'Blue' },
    { id: COLOR_THEMES.PURPLE, color: '#7c3aed', label: 'Purple' },
    { id: COLOR_THEMES.GREEN, color: '#10b981', label: 'Green' },
    { id: COLOR_THEMES.ORANGE, color: '#f59e0b', label: 'Orange' },
    { id: COLOR_THEMES.RED, color: '#ef4444', label: 'Red' },
    { id: COLOR_THEMES.TEAL, color: '#14b8a6', label: 'Teal' },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      PaperProps={{
        sx: {
          width: 320,
          mt: -1,
          borderRadius: '12px',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.3)',
        },
      }}
    >
      {/* User Info */}
      <Box sx={{ px: 2, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.main',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
          >
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>

        {/* Subscription Badge */}
        <Chip
          label="Enterprise Edition"
          size="small"
          color="success"
          sx={{ mt: 1.5, fontWeight: 600, fontSize: '0.6875rem' }}
        />
      </Box>

      <Divider />

      {/* Theme Mode Section */}
      <Box sx={{ px: 2, py: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            mb: 1,
            display: 'block',
          }}
        >
          Display Mode
        </Typography>
        <ToggleButtonGroup
          value={themeMode}
          exclusive
          onChange={handleThemeModeChange}
          size="small"
          fullWidth
          sx={{
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontSize: '0.75rem',
              py: 0.75,
              border: '1px solid',
              borderColor: 'divider',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            },
          }}
        >
          <ToggleButton value={THEME_MODES.DAY_LIGHT}>
            <DayIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Day
          </ToggleButton>
          <ToggleButton value={THEME_MODES.NIGHT}>
            <NightIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Night
          </ToggleButton>
          <ToggleButton value={THEME_MODES.AUTO}>
            <AutoIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Auto
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Day Theme Variant (only show when in day mode) */}
        {themeMode === THEME_MODES.DAY_LIGHT && (
          <Box sx={{ mt: 1.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.6875rem',
                mb: 0.5,
                display: 'block',
              }}
            >
              Day Theme Variant
            </Typography>
            <ToggleButtonGroup
              value={themeMode}
              exclusive
              onChange={handleThemeModeChange}
              size="small"
              fullWidth
              sx={{
                '& .MuiToggleButton-root': {
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  py: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ToggleButton value={THEME_MODES.DAY_DARK}>Dark</ToggleButton>
              <ToggleButton value={THEME_MODES.DAY_LIGHT}>Light</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}
      </Box>

      <Divider />

      {/* Color Themes */}
      <Box sx={{ px: 2, py: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            mb: 1,
            display: 'block',
          }}
        >
          Color Theme
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {colorOptions.map((option) => (
            <IconButton
              key={option.id}
              onClick={() => setColorTheme(option.id)}
              sx={{
                width: 40,
                height: 40,
                bgcolor: option.color,
                color: 'white',
                '&:hover': {
                  bgcolor: option.color,
                  opacity: 0.9,
                },
                border: '2px solid',
                borderColor: colorTheme === option.id ? 'background.paper' : 'transparent',
                boxShadow: colorTheme === option.id ? `0 0 0 2px ${option.color}` : 'none',
              }}
            >
              {colorTheme === option.id && <CheckIcon fontSize="small" />}
            </IconButton>
          ))}
        </Box>
      </Box>

      <Divider />

      {/* Menu Items */}
      <MenuItem onClick={() => { navigate('/settings'); onClose(); }}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>

      <MenuItem onClick={() => { console.log('Help'); onClose(); }}>
        <ListItemIcon>
          <HelpIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Help & Support" />
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
