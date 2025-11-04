import { Box, TextField, InputAdornment, IconButton, Typography, Divider } from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  AttachMoney as DealsIcon,
  Receipt as QuotesIcon,
  Description as InvoicesIcon,
  ShowChart as ForecastsIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  TrendingUp as LeadsIcon,
  AccountBox as AccountsIcon,
  Campaign as CampaignIcon,
  ChevronLeft as CollapseIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigation, PRIMARY_TABS } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import ModuleFolder from './ModuleFolder';

const SECONDARY_SIDEBAR_WIDTH = 240;

const SecondarySidebar = ({ isMobile = false, onItemClick }) => {
  const { activeTab, secondarySidebarOpen, toggleSecondarySidebar } = useNavigation();
  const { isDark } = useTheme();

  // Module folders configuration
  const moduleFolders = [
    {
      id: 'pipeline',
      name: 'Pipeline',
      modules: [
        {
          id: 'deals',
          name: 'Deals',
          icon: <DealsIcon fontSize="small" />,
          path: '/deals',
        },
        {
          id: 'quotes',
          name: 'Quotes',
          icon: <QuotesIcon fontSize="small" />,
          path: '/quotes',
        },
        {
          id: 'invoices',
          name: 'Invoices',
          icon: <InvoicesIcon fontSize="small" />,
          path: '/invoices',
        },
        {
          id: 'forecasts',
          name: 'Forecasts',
          icon: <ForecastsIcon fontSize="small" />,
          path: '/forecasts',
        },
      ],
    },
    {
      id: 'customers',
      name: 'Customers',
      modules: [
        {
          id: 'leads',
          name: 'Leads',
          icon: <LeadsIcon fontSize="small" />,
          path: '/leads',
        },
        {
          id: 'contacts',
          name: 'Contacts',
          icon: <PeopleIcon fontSize="small" />,
          path: '/contacts',
        },
        {
          id: 'companies',
          name: 'Companies',
          icon: <BusinessIcon fontSize="small" />,
          path: '/companies',
        },
        {
          id: 'accounts',
          name: 'Accounts',
          icon: <AccountsIcon fontSize="small" />,
          path: '/accounts',
        },
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      modules: [
        {
          id: 'campaigns',
          name: 'Campaigns',
          icon: <CampaignIcon fontSize="small" />,
          path: '/campaigns',
        },
      ],
    },
  ];

  const reportsFolders = [
    {
      id: 'all-reports',
      name: 'All Reports',
      modules: [
        { id: 'sales-reports', name: 'Sales Reports', icon: <DealsIcon fontSize="small" />, path: '/reports/sales' },
        { id: 'lead-reports', name: 'Lead Reports', icon: <LeadsIcon fontSize="small" />, path: '/reports/leads' },
        { id: 'campaign-reports', name: 'Campaign Reports', icon: <CampaignIcon fontSize="small" />, path: '/reports/campaigns' },
      ],
    },
  ];

  const analyticsFolders = [
    {
      id: 'dashboards',
      name: 'Dashboards',
      modules: [
        { id: 'sales-analytics', name: 'Sales Analytics', icon: <DealsIcon fontSize="small" />, path: '/analytics' },
        { id: 'lead-analytics', name: 'Lead Analytics', icon: <LeadsIcon fontSize="small" />, path: '/analytics/leads' },
      ],
    },
  ];

  // Determine which folders to show based on active tab
  const getFolders = () => {
    switch (activeTab) {
      case PRIMARY_TABS.MODULES:
        return moduleFolders;
      case PRIMARY_TABS.REPORTS:
        return reportsFolders;
      case PRIMARY_TABS.ANALYTICS:
        return analyticsFolders;
      default:
        return moduleFolders;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case PRIMARY_TABS.MODULES:
        return 'Modules';
      case PRIMARY_TABS.REPORTS:
        return 'Reports';
      case PRIMARY_TABS.ANALYTICS:
        return 'Analytics';
      case PRIMARY_TABS.REQUESTS:
        return 'My Requests';
      case PRIMARY_TABS.MARKETPLACE:
        return 'Marketplace';
      default:
        return 'Modules';
    }
  };

  if (!secondarySidebarOpen && !isMobile) {
    return null;
  }

  return (
    <Box
      sx={{
        width: SECONDARY_SIDEBAR_WIDTH,
        height: isMobile ? '100%' : '100vh',
        bgcolor: 'background.sidebar',
        borderRight: isMobile ? 'none' : '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        position: isMobile ? 'relative' : 'fixed',
        left: isMobile ? 0 : 70,
        top: 0,
        zIndex: isMobile ? 'auto' : 1200,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          '&:hover': {
            bgcolor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
          },
        },
      }}
    >
      {/* Header with Title and Add Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          {getTabTitle()}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 28,
            height: 28,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 2, pb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '8px',
              bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              '& fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
              },
            },
          }}
        />
      </Box>

      <Divider sx={{ mb: 1 }} />

      {/* Folders List */}
      <Box sx={{ px: 2, pb: 2, flexGrow: 1 }}>
        {getFolders().map((folder) => (
          <ModuleFolder key={folder.id} folder={folder} onItemClick={onItemClick} />
        ))}
      </Box>

      {/* Collapse Button */}
      {!isMobile && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <IconButton
            onClick={toggleSecondarySidebar}
            size="small"
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              px: 1.5,
              py: 1,
              borderRadius: '8px',
              color: 'text.secondary',
              '&:hover': {
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <CollapseIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Collapse
            </Typography>
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default SecondarySidebar;
