import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  ThumbUp as ThumbUpIcon,
  MouseOutlined as ClickIcon,
  CheckCircle as ConvertIcon,
  Visibility as ViewIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { analyticsAPI } from '../services/api';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];

const Analytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await analyticsAPI.getDashboard();
      setData(response.data);
    } catch (error) {
      setError('Failed to load analytics data');
      console.error('Load analytics error:', error);
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

  if (!data) {
    return (
      <Box>
        <Alert severity="error">Failed to load analytics data</Alert>
      </Box>
    );
  }

  const { overallMetrics, topCampaigns, recentActivities, campaigns } = data;

  // Calculate overall rates
  const overallOpenRate = overallMetrics.totalSent > 0
    ? ((overallMetrics.totalOpened / overallMetrics.totalSent) * 100).toFixed(1)
    : 0;
  const overallClickRate = overallMetrics.totalOpened > 0
    ? ((overallMetrics.totalClicked / overallMetrics.totalOpened) * 100).toFixed(1)
    : 0;
  const overallConversionRate = overallMetrics.totalSent > 0
    ? ((overallMetrics.totalConverted / overallMetrics.totalSent) * 100).toFixed(1)
    : 0;

  // Prepare chart data
  const performanceData = [
    { name: 'Sent', value: overallMetrics.totalSent || 0 },
    { name: 'Opened', value: overallMetrics.totalOpened || 0 },
    { name: 'Clicked', value: overallMetrics.totalClicked || 0 },
    { name: 'Converted', value: overallMetrics.totalConverted || 0 }
  ];

  const campaignTypeData = campaigns?.reduce((acc, campaign) => {
    const existing = acc.find(item => item.name === campaign.type);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: campaign.type.replace('_', ' '), value: 1 });
    }
    return acc;
  }, []) || [];

  const statusData = campaigns?.reduce((acc, campaign) => {
    const existing = acc.find(item => item.name === campaign.status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: campaign.status, value: 1 });
    }
    return acc;
  }, []) || [];

  const conversionFunnelData = [
    { stage: 'Sent', count: overallMetrics.totalSent || 0 },
    { stage: 'Opened', count: overallMetrics.totalOpened || 0 },
    { stage: 'Clicked', count: overallMetrics.totalClicked || 0 },
    { stage: 'Converted', count: overallMetrics.totalConverted || 0 }
  ];

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Analytics & Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and analyze your marketing campaign performance
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Overview Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Total Campaigns
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {overallMetrics.totalCampaigns}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    {overallMetrics.activeCampaigns} active
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'primary.50',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    color: 'primary.main'
                  }}
                >
                  <CampaignIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Total Contacts
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {overallMetrics.totalContacts}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Across all campaigns
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'secondary.50',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    color: 'secondary.main'
                  }}
                >
                  <PeopleIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Total Sent
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {overallMetrics.totalSent}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'info.main' }}>
                    Messages delivered
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'info.50',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    color: 'info.main'
                  }}
                >
                  <EmailIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Conversions
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {overallMetrics.totalConverted}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    {overallConversionRate}% rate
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'success.50',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    color: 'success.main'
                  }}
                >
                  <ConvertIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Open Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    {overallOpenRate}%
                  </Typography>
                </Box>
                <ThumbUpIcon sx={{ color: 'warning.main' }} />
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {overallMetrics.totalOpened} of {overallMetrics.totalSent} opened
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Click Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                    {overallClickRate}%
                  </Typography>
                </Box>
                <ClickIcon sx={{ color: 'secondary.main' }} />
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {overallMetrics.totalClicked} clicks from opened
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Conversion Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {overallConversionRate}%
                  </Typography>
                </Box>
                <TrendingUpIcon sx={{ color: 'success.main' }} />
              </Box>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">
                {overallMetrics.totalConverted} conversions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <BarChartIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Campaign Performance Funnel
              </Typography>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={conversionFunnelData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#667eea" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PieChartIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Campaign Status
              </Typography>
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPie>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Engagement Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Campaign Types Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie
                  data={campaignTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {campaignTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPie>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Top Performing Campaigns */}
      <Paper sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Top Performing Campaigns
        </Typography>
        {topCampaigns && topCampaigns.length > 0 ? (
          <Grid container spacing={2}>
            {topCampaigns.slice(0, 5).map((campaign, index) => (
              <Grid item xs={12} key={campaign.id}>
                <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      <Box
                        sx={{
                          bgcolor: `${COLORS[index % COLORS.length]}20`,
                          borderRadius: '50%',
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '1.2rem',
                          color: COLORS[index % COLORS.length]
                        }}
                      >
                        #{index + 1}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {campaign.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip label={campaign.type} size="small" color="primary" variant="outlined" />
                          <Chip
                            label={campaign.status}
                            size="small"
                            color={campaign.status === 'ACTIVE' ? 'success' : 'default'}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                        <Typography variant="caption" color="text.secondary">
                          Contacts
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {campaign.totalContacts || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                        <Typography variant="caption" color="text.secondary">
                          Conversion Rate
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                          {campaign.conversionRate}%
                        </Typography>
                      </Box>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CampaignIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No campaigns available yet. Create a campaign to see performance data.
            </Typography>
          </Box>
        )}
      </Paper>

      {/* All Campaigns Summary */}
      {campaigns && campaigns.length > 0 && (
        <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            All Campaigns Summary
          </Typography>
          <Grid container spacing={2}>
            {campaigns.map((campaign) => (
              <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }} noWrap>
                      {campaign.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip label={campaign.type.replace('_', ' ')} size="small" variant="outlined" />
                      <Chip
                        label={campaign.status}
                        size="small"
                        color={campaign.status === 'ACTIVE' ? 'success' : 'default'}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Start Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {campaign.startDate
                          ? new Date(campaign.startDate).toLocaleDateString()
                          : '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Budget
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {campaign.budget ? `$${campaign.budget.toLocaleString()}` : '-'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Contacts
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {campaign._count?.campaignContacts || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Analytics;
