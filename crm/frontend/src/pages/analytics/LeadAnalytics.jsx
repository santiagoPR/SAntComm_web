import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { BarChartOutlined as AnalyticsIcon } from '@mui/icons-material';

const LeadAnalytics = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Lead Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time insights into lead behavior and trends
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Total Leads
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                0
              </Typography>
              <Typography variant="body2" color="success.main">
                All time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Qualified Leads
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                0
              </Typography>
              <Typography variant="body2" color="info.main">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Conversion Rate
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                0%
              </Typography>
              <Typography variant="body2" color="warning.main">
                Last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Avg Response Time
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                0h
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <AnalyticsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Lead Analytics Coming Soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed lead analytics and insights will be available here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeadAnalytics;
