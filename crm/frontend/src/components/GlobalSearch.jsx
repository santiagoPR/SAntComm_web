import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  AttachMoney as DealsIcon,
  TrendingUp as LeadsIcon,
  Campaign as CampaignIcon,
  AccessTime as RecentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const GlobalSearch = ({ open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Mock search results (replace with actual API call)
  const mockResults = [
    {
      id: 1,
      type: 'contact',
      title: 'John Smith',
      subtitle: 'john.smith@example.com',
      icon: <PeopleIcon />,
      path: '/contacts/1'
    },
    {
      id: 2,
      type: 'company',
      title: 'Acme Corporation',
      subtitle: 'Technology Industry',
      icon: <BusinessIcon />,
      path: '/companies/2'
    },
    {
      id: 3,
      type: 'deal',
      title: 'Enterprise License Deal',
      subtitle: '$50,000',
      icon: <DealsIcon />,
      path: '/deals/3'
    },
    {
      id: 4,
      type: 'lead',
      title: 'Sarah Johnson',
      subtitle: 'Hot Lead',
      icon: <LeadsIcon />,
      path: '/leads/4'
    },
    {
      id: 5,
      type: 'campaign',
      title: 'Summer Promotion 2024',
      subtitle: 'Email Campaign',
      icon: <CampaignIcon />,
      path: '/campaigns/5'
    },
  ];

  const recentSearches = [
    { title: 'Contacts in New York', path: '/contacts?filter=ny' },
    { title: 'Open Deals', path: '/deals?status=open' },
    { title: 'Hot Leads', path: '/leads?rating=hot' },
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      // Filter mock results based on search query
      const filtered = mockResults.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleSelect = (path) => {
    navigate(path);
    onClose();
    setSearchQuery('');
  };

  const getTypeColor = (type) => {
    const colors = {
      contact: 'primary',
      company: 'secondary',
      deal: 'success',
      lead: 'warning',
      campaign: 'info'
    };
    return colors[type] || 'default';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          maxHeight: '80vh',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Search Input */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            autoFocus
            placeholder="Search contacts, companies, deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '12px',
                bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{ mt: 1, display: 'block', color: 'text.secondary' }}
          >
            Press <Chip label="Esc" size="small" sx={{ height: 20, fontSize: '0.6875rem' }} /> to close
          </Typography>
        </Box>

        <Divider />

        {/* Results */}
        {results.length > 0 ? (
          <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
            {results.map((result) => (
              <ListItemButton
                key={result.id}
                onClick={() => handleSelect(result.path)}
                sx={{
                  px: 2,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: `${getTypeColor(result.type)}.main` }}>
                  {result.icon}
                </ListItemIcon>
                <ListItemText
                  primary={result.title}
                  secondary={result.subtitle}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.8125rem',
                  }}
                />
                <Chip
                  label={result.type}
                  size="small"
                  color={getTypeColor(result.type)}
                  sx={{
                    height: 22,
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        ) : searchQuery.trim() ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <SearchIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.3, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              No results found for "{searchQuery}"
            </Typography>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
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
              Recent Searches
            </Typography>
            <List dense>
              {recentSearches.map((search, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleSelect(search.path)}
                  sx={{
                    borderRadius: '8px',
                    mb: 0.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <RecentIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={search.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;
