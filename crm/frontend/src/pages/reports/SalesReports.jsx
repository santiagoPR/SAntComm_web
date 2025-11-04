import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { AssessmentOutlined as ReportIcon } from '@mui/icons-material';

const SalesReports = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Sales Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive sales performance reports and metrics
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReportIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Deal Pipeline Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View deals by stage, value, and probability
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReportIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Revenue Forecast
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Projected revenue based on current pipeline
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReportIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Win/Loss Analysis
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Track win rates and identify success patterns
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <ReportIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Sales Reports Coming Soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed sales reporting functionality will be available here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesReports;
