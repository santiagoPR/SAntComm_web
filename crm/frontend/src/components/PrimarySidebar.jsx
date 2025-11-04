import { useNavigate } from 'react-router-dom';
import { Box, Tooltip, IconButton, Avatar, Badge } from '@mui/material';
import {
  ViewModule as ModulesIcon,
  Assessment as ReportsIcon,
  BarChart as AnalyticsIcon,
  Assignment as RequestsIcon,
  Store as MarketplaceIcon,
  Add as AddIcon,
  Event as CalendarIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Apps as AppsIcon
} from '@mui/icons-material';
import { useNavigation, PRIMARY_TABS } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const PRIMARY_SIDEBAR_WIDTH = 70;

const NavButton = ({ icon, label, active, onClick, badge }) => {
  const { isDark } = useTheme();

  return (
    <Tooltip title={label} placement="right" arrow>
      <IconButton
        onClick={onClick}
        sx={{
          width: 48,
          height: 48,
          borderRadius: '12px',
          color: active ? 'primary.main' : 'text.secondary',
          bgcolor: active ? (isDark ? 'rgba(37, 99, 235, 0.1)' : 'rgba(37, 99, 235, 0.08)') : 'transparent',
          '&:hover': {
            bgcolor: active
              ? (isDark ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.12)')
              : (isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'),
          },
          transition: 'all 0.2s',
          position: 'relative',
        }}
      >
        {badge ? (
          <Badge badgeContent={badge} color="error" variant="dot">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

const PrimarySidebar = ({ onProfileClick, onSearchClick, isMobile = false }) => {
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useNavigation();
  const { user } = useAuth();
  const { isDark } = useTheme();

  const primaryTabs = [
    { id: PRIMARY_TABS.MODULES, icon: <ModulesIcon />, label: 'Modules' },
    { id: PRIMARY_TABS.REPORTS, icon: <ReportsIcon />, label: 'Reports' },
    { id: PRIMARY_TABS.ANALYTICS, icon: <AnalyticsIcon />, label: 'Analytics' },
    { id: PRIMARY_TABS.REQUESTS, icon: <RequestsIcon />, label: 'My Requests' },
    { id: PRIMARY_TABS.MARKETPLACE, icon: <MarketplaceIcon />, label: 'Marketplace' },
  ];

  const utilityActions = [
    { icon: <AddIcon />, label: 'Quick Create', action: () => navigate('/leads') },
    { icon: <CalendarIcon />, label: 'Calendar', action: () => navigate('/calendar') },
    { icon: <MailIcon />, label: 'Mail', action: () => navigate('/mail'), badge: 0 },
    { icon: <NotificationsIcon />, label: 'Notifications', action: () => navigate('/notifications'), badge: 0 },
    { icon: <SettingsIcon />, label: 'Settings', action: () => navigate('/settings') },
  ];

  return (
    <Box
      sx={{
        width: PRIMARY_SIDEBAR_WIDTH,
        height: isMobile ? '100%' : '100vh',
        bgcolor: 'background.primarySidebar',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
        position: isMobile ? 'relative' : 'fixed',
        left: 0,
        top: 0,
        zIndex: isMobile ? 'auto' : 1300,
      }}
    >
      {/* Logo / Org Icon */}
      <Tooltip title="SAntComm CRM" placement="right" arrow>
        <Box
          sx={{
            width: 48,
            height: 48,
            mb: 2,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          onClick={() => navigate('/dashboard')}
        >
          <img
            src="/logo/s-logo-cropped.png"
            alt="SAntComm"
            style={{ width: '42px', height: '42px', objectFit: 'contain' }}
          />
        </Box>
      </Tooltip>

      {/* Divider */}
      <Box
        sx={{
          width: 40,
          height: '1px',
          bgcolor: 'divider',
          mb: 2,
        }}
      />

      {/* Primary Navigation Tabs */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 'auto' }}>
        {primaryTabs.map((tab) => (
          <NavButton
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </Box>

      {/* Divider */}
      <Box
        sx={{
          width: 40,
          height: '1px',
          bgcolor: 'divider',
          my: 2,
        }}
      />

      {/* Utility Actions */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        {utilityActions.map((action, index) => (
          <NavButton
            key={index}
            icon={action.icon}
            label={action.label}
            onClick={action.action}
            badge={action.badge}
          />
        ))}
      </Box>

      {/* User Profile */}
      <Tooltip title={`${user?.firstName} ${user?.lastName}`} placement="right" arrow>
        <Avatar
          onClick={onProfileClick}
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': {
              opacity: 0.8,
            },
          }}
        >
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </Avatar>
      </Tooltip>

      {/* Teamspace Switcher (Bottom) */}
      <Tooltip title="Sales Teamspace" placement="right" arrow>
        <Box
          sx={{
            mt: 2,
            width: 48,
            height: 32,
            borderRadius: '8px',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          SA
        </Box>
      </Tooltip>
    </Box>
  );
};

export default PrimarySidebar;
