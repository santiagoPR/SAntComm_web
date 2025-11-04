import { Box, Typography, Paper, Grid, Card, CardContent, Chip, Button } from '@mui/material';
import { StorefrontOutlined as MarketplaceIcon, GetAppOutlined as InstallIcon } from '@mui/icons-material';

const Marketplace = () => {
  const featuredApps = [
    {
      id: 1,
      name: 'Email Integration',
      category: 'Communication',
      description: 'Connect your email for seamless communication tracking',
      price: 'Free',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Advanced Analytics',
      category: 'Analytics',
      description: 'Deep insights into your sales and marketing data',
      price: '$49/mo',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Calendar Sync',
      category: 'Productivity',
      description: 'Sync meetings and appointments with your calendar',
      price: 'Free',
      rating: 4.3
    }
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Extend your CRM with powerful integrations and add-ons
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Featured Apps & Integrations
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Discover apps to boost your productivity and streamline your workflow
            </Typography>
          </Paper>
        </Grid>

        {featuredApps.map((app) => (
          <Grid item xs={12} md={6} lg={4} key={app.id}>
            <Card sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {app.name}
                  </Typography>
                  <Chip label={app.category} size="small" color="primary" variant="outlined" />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {app.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {app.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<InstallIcon />}
                  >
                    Install
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center', mt: 2 }}>
            <MarketplaceIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              More Apps Coming Soon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We're building an extensive marketplace of integrations and extensions
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Marketplace;
