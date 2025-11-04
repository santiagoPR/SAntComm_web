import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { AssessmentOutlined as ReportIcon } from '@mui/icons-material';

const LeadReports = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Lead Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track lead generation, conversion, and source performance
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReportIcon sx={{ color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Lead Source Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Analyze leads by source and channel
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
                  Conversion Rate Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Track lead-to-customer conversion rates
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
                  Lead Quality Report
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Evaluate lead quality and scoring metrics
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <ReportIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Lead Reports Coming Soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Detailed lead reporting functionality will be available here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeadReports;
