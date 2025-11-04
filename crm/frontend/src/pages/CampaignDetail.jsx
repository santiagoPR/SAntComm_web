import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  ThumbUp as ThumbUpIcon,
  MouseOutlined as ClickIcon,
  CheckCircle as ConvertIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { campaignsAPI, contactsAPI, analyticsAPI } from '../services/api';

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [campaignContacts, setCampaignContacts] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [executing, setExecuting] = useState(false);
  const [openAddContacts, setOpenAddContacts] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [campaignRes, metricsRes, contactsRes, allContactsRes] = await Promise.all([
        campaignsAPI.getOne(id),
        analyticsAPI.getCampaignMetrics(id),
        campaignsAPI.getContacts(id),
        contactsAPI.getAll()
      ]);

      setCampaign(campaignRes.data);
      setMetrics(metricsRes.data);
      setCampaignContacts(contactsRes.data);
      setAllContacts(allContactsRes.data);
    } catch (error) {
      setError('Failed to load campaign data');
      console.error('Load campaign error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContacts = async () => {
    try {
      await campaignsAPI.addContacts(id, { contactIds: selectedContacts });
      setOpenAddContacts(false);
      setSelectedContacts([]);
      loadData();
    } catch (error) {
      setError('Failed to add contacts to campaign');
      console.error('Add contacts error:', error);
    }
  };

  const handleRemoveContact = async (contactId) => {
    if (!window.confirm('Remove this contact from the campaign?')) {
      return;
    }

    try {
      await campaignsAPI.removeContact(id, contactId);
      loadData();
    } catch (error) {
      setError('Failed to remove contact from campaign');
      console.error('Remove contact error:', error);
    }
  };

  const handleUpdateStatus = async (contactId, status) => {
    try {
      await campaignsAPI.updateContactStatus(id, contactId, { status });
      loadData();
    } catch (error) {
      setError('Failed to update contact status');
      console.error('Update status error:', error);
    }
  };

  const handleExecute = async () => {
    if (!window.confirm('Launch this campaign? Emails will be sent to all pending contacts.')) {
      return;
    }

    setExecuting(true);
    setError('');
    setSuccess('');

    try {
      const response = await campaignsAPI.execute(id);
      setSuccess(response.data.message || 'Campaign launched successfully!');
      loadData();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to execute campaign');
      console.error('Execute campaign error:', error);
    } finally {
      setExecuting(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      PENDING: 'default',
      SENT: 'info',
      DELIVERED: 'primary',
      OPENED: 'warning',
      CLICKED: 'secondary',
      CONVERTED: 'success',
      BOUNCED: 'error',
      UNSUBSCRIBED: 'error'
    };
    return statusColors[status] || 'default';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!campaign) {
    return (
      <Box>
        <Alert severity="error">Campaign not found</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/campaigns')} sx={{ mt: 2 }}>
          Back to Campaigns
        </Button>
      </Box>
    );
  }

  const rates = metrics?.calculatedRates || {};
  const realtimeMetrics = metrics?.realtimeMetrics || {};

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => navigate('/campaigns')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">{campaign.name}</Typography>
          <Chip label={campaign.status} color={campaign.status === 'ACTIVE' ? 'success' : 'default'} />
        </Box>
        <Box display="flex" gap={2}>
          {campaign.status !== 'ACTIVE' && campaignContacts.length > 0 && (
            <Button
              variant="contained"
              color="success"
              startIcon={<SendIcon />}
              onClick={handleExecute}
              disabled={executing}
            >
              {executing ? 'Launching...' : 'Execute Campaign'}
            </Button>
          )}
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => setOpenAddContacts(true)}
          >
            Add Contacts
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Campaign Info */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Campaign Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">Type</Typography>
            <Typography variant="body1">{campaign.type}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">Budget</Typography>
            <Typography variant="body1">
              {campaign.budget ? `$${campaign.budget.toLocaleString()}` : 'Not set'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">Start Date</Typography>
            <Typography variant="body1">
              {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'Not set'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary">End Date</Typography>
            <Typography variant="body1">
              {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'Not set'}
            </Typography>
          </Grid>
          {campaign.description && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Description</Typography>
              <Typography variant="body1">{campaign.description}</Typography>
            </Grid>
          )}
          {campaign.targetAudience && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Target Audience</Typography>
              <Typography variant="body1">{campaign.targetAudience}</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Metrics Dashboard */}
      <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <EmailIcon color="primary" />
                <Typography variant="body2" color="text.secondary">Sent</Typography>
              </Box>
              <Typography variant="h4">{realtimeMetrics.totalSent || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <ThumbUpIcon color="warning" />
                <Typography variant="body2" color="text.secondary">Opened</Typography>
              </Box>
              <Typography variant="h4">{realtimeMetrics.totalOpened || 0}</Typography>
              <Typography variant="body2" color="text.secondary">
                {rates.openRate || 0}% open rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <ClickIcon color="secondary" />
                <Typography variant="body2" color="text.secondary">Clicked</Typography>
              </Box>
              <Typography variant="h4">{realtimeMetrics.totalClicked || 0}</Typography>
              <Typography variant="body2" color="text.secondary">
                {rates.clickRate || 0}% click rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <ConvertIcon color="success" />
                <Typography variant="body2" color="text.secondary">Converted</Typography>
              </Box>
              <Typography variant="h4">{realtimeMetrics.totalConverted || 0}</Typography>
              <Typography variant="body2" color="text.secondary">
                {rates.conversionRate || 0}% conversion
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Campaign Contacts */}
      <Typography variant="h6" gutterBottom>Campaign Contacts ({campaignContacts.length})</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sent At</TableCell>
              <TableCell>Opened At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaignContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No contacts in this campaign. Click "Add Contacts" to add some.
                </TableCell>
              </TableRow>
            ) : (
              campaignContacts.map((cc) => (
                <TableRow key={cc.id}>
                  <TableCell>
                    {cc.contact.firstName} {cc.contact.lastName}
                  </TableCell>
                  <TableCell>{cc.contact.email || '-'}</TableCell>
                  <TableCell>
                    <TextField
                      select
                      size="small"
                      value={cc.status}
                      onChange={(e) => handleUpdateStatus(cc.contactId, e.target.value)}
                    >
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="SENT">Sent</MenuItem>
                      <MenuItem value="DELIVERED">Delivered</MenuItem>
                      <MenuItem value="OPENED">Opened</MenuItem>
                      <MenuItem value="CLICKED">Clicked</MenuItem>
                      <MenuItem value="CONVERTED">Converted</MenuItem>
                      <MenuItem value="BOUNCED">Bounced</MenuItem>
                      <MenuItem value="UNSUBSCRIBED">Unsubscribed</MenuItem>
                    </TextField>
                  </TableCell>
                  <TableCell>
                    {cc.sentAt ? new Date(cc.sentAt).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell>
                    {cc.openedAt ? new Date(cc.openedAt).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveContact(cc.contactId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Contacts Dialog */}
      <Dialog open={openAddContacts} onClose={() => setOpenAddContacts(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Contacts to Campaign</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Select Contacts"
            SelectProps={{
              multiple: true,
              value: selectedContacts,
              onChange: (e) => setSelectedContacts(e.target.value)
            }}
            sx={{ mt: 2 }}
          >
            {allContacts
              .filter(contact => !campaignContacts.find(cc => cc.contactId === contact.id))
              .map((contact) => (
                <MenuItem key={contact.id} value={contact.id}>
                  {contact.firstName} {contact.lastName} {contact.email ? `(${contact.email})` : ''}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddContacts(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddContacts}
            disabled={selectedContacts.length === 0}
          >
            Add {selectedContacts.length} Contact(s)
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CampaignDetail;
