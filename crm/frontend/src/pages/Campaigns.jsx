import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  MenuItem,
  Grid,
  Chip,
  Card,
  CardContent,
  Stack,
  Divider,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Email as EmailIcon,
  Share as ShareIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { campaignsAPI } from '../services/api';

const Campaigns = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [formData, setFormData] = useState({
    name: '',
    type: 'EMAIL',
    status: 'DRAFT',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    targetAudience: '',
    emailSubject: '',
    emailContent: '',
    socialPlatform: '',
    socialContent: ''
  });

  const types = ['EMAIL', 'SOCIAL_MEDIA', 'SMS', 'DIRECT_MAIL', 'WEBINAR', 'EVENT'];
  const statuses = ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED'];
  const socialPlatforms = ['FACEBOOK', 'LINKEDIN', 'TWITTER', 'INSTAGRAM'];

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const response = await campaignsAPI.getAll();
      setCampaigns(response.data);
    } catch (error) {
      setError('Failed to load campaigns');
      console.error('Load campaigns error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (campaign = null) => {
    if (campaign) {
      setEditingCampaign(campaign);
      setFormData({
        name: campaign.name,
        type: campaign.type,
        status: campaign.status,
        description: campaign.description || '',
        startDate: campaign.startDate ? campaign.startDate.split('T')[0] : '',
        endDate: campaign.endDate ? campaign.endDate.split('T')[0] : '',
        budget: campaign.budget || '',
        targetAudience: campaign.targetAudience || '',
        emailSubject: campaign.emailSubject || '',
        emailContent: campaign.emailContent || '',
        socialPlatform: campaign.socialPlatform || '',
        socialContent: campaign.socialContent || ''
      });
    } else {
      setEditingCampaign(null);
      setFormData({
        name: '',
        type: 'EMAIL',
        status: 'DRAFT',
        description: '',
        startDate: '',
        endDate: '',
        budget: '',
        targetAudience: '',
        emailSubject: '',
        emailContent: '',
        socialPlatform: '',
        socialContent: ''
      });
    }
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCampaign(null);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const submitData = {
        ...formData,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null
      };

      if (editingCampaign) {
        await campaignsAPI.update(editingCampaign.id, submitData);
      } else {
        await campaignsAPI.create(submitData);
      }
      handleCloseDialog();
      loadCampaigns();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save campaign');
      console.error('Save campaign error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) {
      return;
    }

    try {
      await campaignsAPI.delete(id);
      loadCampaigns();
    } catch (error) {
      setError('Failed to delete campaign');
      console.error('Delete campaign error:', error);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/campaigns/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'COMPLETED':
        return 'info';
      case 'PAUSED':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'EMAIL':
        return 'primary';
      case 'SOCIAL_MEDIA':
        return 'secondary';
      case 'SMS':
        return 'success';
      case 'WEBINAR':
        return 'info';
      case 'EVENT':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'EMAIL':
        return <EmailIcon />;
      case 'SOCIAL_MEDIA':
        return <ShareIcon />;
      case 'EVENT':
      case 'WEBINAR':
        return <EventIcon />;
      default:
        return <EmailIcon />;
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate summary stats
  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'ACTIVE').length,
    draft: campaigns.filter(c => c.status === 'DRAFT').length,
    totalBudget: campaigns.reduce((sum, c) => sum + (c.budget || 0), 0)
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', md: '3rem' } }}>
              Marketing Campaigns
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create and manage your marketing campaigns across multiple channels
            </Typography>
          </Box>
          <Button
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ height: { xs: '40px', md: '48px' } }}
          >
            Create Campaign
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Total Campaigns
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.total}
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
                  <EmailIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Active Campaigns
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {stats.active}
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
                  <TrendingUpIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Draft Campaigns
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.draft}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'grey.100',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    color: 'text.secondary'
                  }}
                >
                  <EventIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Total Budget
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${stats.totalBudget.toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'warning.50',
                    borderRadius: '12px',
                    p: 1.5,
                    display: 'flex',
                    color: 'warning.main'
                  }}
                >
                  <MoneyIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {error && !openDialog && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Toolbar */}
      <Paper sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Filter by Status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                )
              }}
            >
              <MenuItem value="ALL">All Statuses</MenuItem>
              <MenuItem value="DRAFT">Draft</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="PAUSED">Paused</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredCampaigns.length} of {campaigns.length} campaigns
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Campaigns List */}
      <Grid container spacing={3}>
        {filteredCampaigns.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 8, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
              <EmailIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                No campaigns found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchTerm || filterStatus !== 'ALL'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first marketing campaign'}
              </Typography>
              {!searchTerm && filterStatus === 'ALL' && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                >
                  Create Campaign
                </Button>
              )}
            </Paper>
          </Grid>
        ) : (
          filteredCampaigns.map((campaign) => (
            <Grid item xs={12} md={6} lg={4} key={campaign.id}>
              <Card
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          bgcolor: `${getTypeColor(campaign.type)}.50`,
                          borderRadius: '8px',
                          p: 1,
                          display: 'flex',
                          color: `${getTypeColor(campaign.type)}.main`
                        }}
                      >
                        {getTypeIcon(campaign.type)}
                      </Box>
                      <Chip
                        label={campaign.status}
                        color={getStatusColor(campaign.status)}
                        size="small"
                      />
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {campaign.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '40px' }}>
                    {campaign.description || 'No description'}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Type
                      </Typography>
                      <Chip
                        label={campaign.type.replace('_', ' ')}
                        color={getTypeColor(campaign.type)}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Contacts
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                        <PeopleIcon sx={{ fontSize: 16 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {campaign._count?.campaignContacts || 0}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Start Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                        {campaign.startDate
                          ? new Date(campaign.startDate).toLocaleDateString()
                          : '-'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Budget
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                        {campaign.budget ? `$${campaign.budget.toLocaleString()}` : '-'}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider />

                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleViewDetails(campaign.id)}
                    color="info"
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(campaign)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(campaign.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth fullScreen={isMobile}>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ px: { xs: 2, md: 3 } }}>
            {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
          </DialogTitle>
          <DialogContent sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Campaign Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.replace('_', ' ')}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Target Audience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                />
              </Grid>

              {formData.type === 'EMAIL' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Subject"
                      name="emailSubject"
                      value={formData.emailSubject}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Email Content"
                      name="emailContent"
                      value={formData.emailContent}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}

              {formData.type === 'SOCIAL_MEDIA' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Social Platform"
                      name="socialPlatform"
                      value={formData.socialPlatform}
                      onChange={handleChange}
                    >
                      <MenuItem value="">None</MenuItem>
                      {socialPlatforms.map((platform) => (
                        <MenuItem key={platform} value={platform}>
                          {platform}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Social Media Content"
                      name="socialContent"
                      value={formData.socialContent}
                      onChange={handleChange}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 }, gap: 1, flexWrap: 'wrap' }}>
            <Button onClick={handleCloseDialog} size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>Cancel</Button>
            <Button type="submit" variant="contained" size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>
              {editingCampaign ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Campaigns;
