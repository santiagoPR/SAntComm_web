import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { AssessmentOutlined as ReportIcon } from '@mui/icons-material';

const CampaignReports = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Campaign Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Marketing campaign performance and ROI analysis
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReportIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Campaign ROI Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Track return on investment for each campaign
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
                  Engagement Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Analyze open rates, clicks, and conversions
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
                  Channel Performance
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Compare performance across different channels
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <ReportIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Campaign Reports Coming Soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed campaign reporting functionality will be available here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignReports;
