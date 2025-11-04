import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  AttachMoney as DealsIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { contactsAPI, companiesAPI, dealsAPI } from '../services/api';

const StatCard = ({ title, value, icon, color, gradient }) => (
  <Card
    sx={{
      height: '100%',
      background: gradient,
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px -10px rgba(0,0,0,0.3)',
      }
    }}
  >
    <CardContent sx={{ position: 'relative', zIndex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ fontSize: 32, display: 'flex' }}>
            {icon}
          </Box>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontSize: '0.875rem', fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
        {value}
      </Typography>
    </CardContent>
    <Box
      sx={{
        position: 'absolute',
        bottom: -20,
        right: -20,
        opacity: 0.1,
        fontSize: 140,
        display: 'flex'
      }}
    >
      {icon}
    </Box>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    contacts: 0,
    companies: 0,
    deals: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [contactsRes, companiesRes, dealsRes] = await Promise.all([
        contactsAPI.getAll(),
        companiesAPI.getAll(),
        dealsAPI.getAll()
      ]);

      const totalValue = dealsRes.data.reduce((sum, deal) => sum + (deal.value || 0), 0);

      setStats({
        contacts: contactsRes.data.length,
        companies: companiesRes.data.length,
        deals: dealsRes.data.length,
        totalValue: totalValue
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', md: '3rem' } }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your business today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Contacts"
            value={stats.contacts}
            icon={<PeopleIcon fontSize="inherit" />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Companies"
            value={stats.companies}
            icon={<BusinessIcon fontSize="inherit" />}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Deals"
            value={stats.deals}
            icon={<DealsIcon fontSize="inherit" />}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Deal Value"
            value={`$${stats.totalValue.toLocaleString()}`}
            icon={<TrendingUpIcon fontSize="inherit" />}
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          />
        </Grid>
      </Grid>

      {/* Welcome Section */}
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Welcome to SAntComm CRM
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
          Your construction CRM system is ready to help you manage your business relationships.
          Start by adding contacts, companies, and deals from the navigation menu on the left.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Paper sx={{ p: 2, flex: 1, minWidth: '200px', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Quick Actions
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Add your first contact or company
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, minWidth: '200px', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Campaign Management
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Create and execute marketing campaigns
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, minWidth: '200px', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Analytics & Reports
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Track your business performance
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
