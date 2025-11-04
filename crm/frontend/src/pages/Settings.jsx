import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Tabs,
  Tab,
  Grid,
  Divider,
  InputAdornment
} from '@mui/material';
import {
  Save as SaveIcon,
  Send as SendIcon,
  Email as EmailIcon,
  Key as KeyIcon,
  Language as LanguageIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Webhook as WebhookIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    emailProvider: 'SENDGRID',
    sendgridApiKey: '',
    sendgridFromEmail: '',
    sendgridFromName: '',
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: '',
    smtpPass: '',
    facebookPageId: '',
    facebookAccessToken: '',
    linkedinAccessToken: '',
    linkedinOrgId: '',
    twitterApiKey: '',
    twitterApiSecret: '',
    twitterAccessToken: '',
    twitterAccessSecret: '',
    webhookBaseUrl: 'http://localhost:5000'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data) {
        setSettings(prev => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    }
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      await loadSettings(); // Reload to get masked values
    } catch (error) {
      console.error('Failed to save settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestEmail = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/settings/test-email`, {
        provider: settings.emailProvider,
        testEmail
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ type: 'success', text: 'Test email sent successfully!' });
    } catch (error) {
      console.error('Failed to send test email:', error);
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to send test email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Integration Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your email and social media integrations to power your campaigns
        </Typography>
      </Box>

      {message.text && (
        <Alert
          severity={message.type}
          sx={{ mb: 3 }}
          onClose={() => setMessage({ type: '', text: '' })}
        >
          {message.text}
        </Alert>
      )}

      <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 0 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: 3,
              pt: 2
            }}
          >
            <Tab label="Email Configuration" sx={{ textTransform: 'none', fontWeight: 600, fontSize: '1rem' }} />
            <Tab label="Social Media" sx={{ textTransform: 'none', fontWeight: 600, fontSize: '1rem' }} />
            <Tab label="Webhook Settings" sx={{ textTransform: 'none', fontWeight: 600, fontSize: '1rem' }} />
          </Tabs>

          {/* Email Configuration Tab */}
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ px: 4, pb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Email Provider</InputLabel>
                    <Select
                      value={settings.emailProvider}
                      label="Email Provider"
                      onChange={(e) => handleChange('emailProvider', e.target.value)}
                    >
                      <MenuItem value="SENDGRID">SendGrid</MenuItem>
                      <MenuItem value="SMTP">SMTP (Gmail, etc.)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {settings.emailProvider === 'SENDGRID' && (
                  <>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          bgcolor: 'primary.50',
                          p: 2,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'primary.200'
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '1rem' }}>
                          SendGrid Configuration
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          Configure your SendGrid API credentials for email delivery
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="SendGrid API Key"
                        type="password"
                        value={settings.sendgridApiKey}
                        onChange={(e) => handleChange('sendgridApiKey', e.target.value)}
                        helperText="Get your API key from SendGrid dashboard"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="From Email"
                        type="email"
                        value={settings.sendgridFromEmail}
                        onChange={(e) => handleChange('sendgridFromEmail', e.target.value)}
                        helperText="Email address emails will be sent from"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="From Name"
                        value={settings.sendgridFromName}
                        onChange={(e) => handleChange('sendgridFromName', e.target.value)}
                        helperText="Display name for outgoing emails"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </>
                )}

                {settings.emailProvider === 'SMTP' && (
                  <>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          bgcolor: 'secondary.50',
                          p: 2,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'secondary.200'
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.main', fontSize: '1rem' }}>
                          SMTP Configuration
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          Configure your SMTP server settings for email delivery
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="SMTP Host"
                        value={settings.smtpHost}
                        onChange={(e) => handleChange('smtpHost', e.target.value)}
                        helperText="e.g., smtp.gmail.com"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LanguageIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="SMTP Port"
                        type="number"
                        value={settings.smtpPort}
                        onChange={(e) => handleChange('smtpPort', parseInt(e.target.value))}
                        helperText="Usually 587 for TLS"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="SMTP Username"
                        value={settings.smtpUser}
                        onChange={(e) => handleChange('smtpUser', e.target.value)}
                        helperText="Your email address"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="SMTP Password"
                        type="password"
                        value={settings.smtpPass}
                        onChange={(e) => handleChange('smtpPass', e.target.value)}
                        helperText="App password (not your regular password)"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="From Name"
                        value={settings.sendgridFromName}
                        onChange={(e) => handleChange('sendgridFromName', e.target.value)}
                        helperText="Display name for outgoing emails"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  </>
                )}

                {/* Test Email Section */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: 'success.50',
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'success.200'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main', fontSize: '1rem' }}>
                      Test Email Configuration
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Send a test email to verify your configuration is working correctly
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Test Email Address"
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    helperText="Enter the email address where you want to receive the test email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    startIcon={<SendIcon />}
                    onClick={handleTestEmail}
                    disabled={loading || !testEmail}
                    sx={{ height: '56px' }}
                  >
                    Send Test Email
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Social Media Tab */}
          <TabPanel value={activeTab} index={1}>
            <Box sx={{ px: 4, pb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: 'info.50',
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'info.200'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main', fontSize: '1rem' }}>
                      Facebook/Meta
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Configure your Facebook Page integration for social media campaigns
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Facebook Page ID"
                    value={settings.facebookPageId}
                    onChange={(e) => handleChange('facebookPageId', e.target.value)}
                    helperText="Your Facebook Page ID"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FacebookIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Facebook Access Token"
                    type="password"
                    value={settings.facebookAccessToken}
                    onChange={(e) => handleChange('facebookAccessToken', e.target.value)}
                    helperText="Page access token from Facebook"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: 'info.50',
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'info.200'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main', fontSize: '1rem' }}>
                      LinkedIn
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Configure your LinkedIn organization integration
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="LinkedIn Organization ID"
                    value={settings.linkedinOrgId}
                    onChange={(e) => handleChange('linkedinOrgId', e.target.value)}
                    helperText="Your LinkedIn organization ID"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LinkedInIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="LinkedIn Access Token"
                    type="password"
                    value={settings.linkedinAccessToken}
                    onChange={(e) => handleChange('linkedinAccessToken', e.target.value)}
                    helperText="OAuth 2.0 access token"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: 'info.50',
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'info.200'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main', fontSize: '1rem' }}>
                      Twitter/X
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Configure your Twitter/X API credentials
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Twitter API Key"
                    type="password"
                    value={settings.twitterApiKey}
                    onChange={(e) => handleChange('twitterApiKey', e.target.value)}
                    helperText="Consumer API key"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TwitterIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Twitter API Secret"
                    type="password"
                    value={settings.twitterApiSecret}
                    onChange={(e) => handleChange('twitterApiSecret', e.target.value)}
                    helperText="Consumer API secret"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Twitter Access Token"
                    type="password"
                    value={settings.twitterAccessToken}
                    onChange={(e) => handleChange('twitterAccessToken', e.target.value)}
                    helperText="Access token"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Twitter Access Secret"
                    type="password"
                    value={settings.twitterAccessSecret}
                    onChange={(e) => handleChange('twitterAccessSecret', e.target.value)}
                    helperText="Access token secret"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Webhook Settings Tab */}
          <TabPanel value={activeTab} index={2}>
            <Box sx={{ px: 4, pb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: 'warning.50',
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'warning.200'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.main', fontSize: '1rem' }}>
                      Webhook Configuration
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      Configure webhook base URL for email tracking and analytics
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Webhook Base URL"
                    value={settings.webhookBaseUrl}
                    onChange={(e) => handleChange('webhookBaseUrl', e.target.value)}
                    helperText="Base URL for email tracking webhooks (e.g., https://yourdomain.com)"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WebhookIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Alert severity="info">
                    This URL is used for email tracking pixels and click tracking.
                    In production, this should be your public domain. For development, use http://localhost:5000
                  </Alert>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Save Button */}
          <Box
            sx={{
              p: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.default',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => loadSettings()}
              disabled={loading}
            >
              Reset Changes
            </Button>
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={loading}
              sx={{ minWidth: '160px' }}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
