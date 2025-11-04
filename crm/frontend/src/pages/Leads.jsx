import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  AssignmentTurnedIn as ConvertedIcon
} from '@mui/icons-material';
import { leadsAPI } from '../services/api';

const StatCard = ({ title, value, icon, gradient }) => (
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
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
          <Box sx={{ fontSize: 28, display: 'flex' }}>
            {icon}
          </Box>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5, fontSize: '0.875rem' }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
    </CardContent>
    <Box
      sx={{
        position: 'absolute',
        bottom: -15,
        right: -15,
        opacity: 0.1,
        fontSize: 100,
        display: 'flex'
      }}
    >
      {icon}
    </Box>
  </Card>
);

const getRatingColor = (rating) => {
  switch (rating?.toUpperCase()) {
    case 'HOT': return 'error';
    case 'WARM': return 'warning';
    case 'COLD': return 'info';
    default: return 'default';
  }
};

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'NEW': return 'info';
    case 'CONTACTED': return 'primary';
    case 'QUALIFIED': return 'success';
    case 'UNQUALIFIED': return 'error';
    case 'CONVERTED': return 'success';
    default: return 'default';
  }
};

const Leads = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterRating, setFilterRating] = useState('ALL');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    source: '',
    status: 'NEW',
    rating: 'WARM',
    industry: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeadsData();
  }, [leads, searchQuery, filterStatus, filterRating]);

  const loadLeads = async () => {
    try {
      const response = await leadsAPI.getAll();
      setLeads(response.data);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeadsData = () => {
    let filtered = leads;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.firstName?.toLowerCase().includes(query) ||
        lead.lastName?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.company?.toLowerCase().includes(query) ||
        lead.phone?.includes(query)
      );
    }

    // Status filter
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }

    // Rating filter
    if (filterRating !== 'ALL') {
      filtered = filtered.filter(lead => lead.rating === filterRating);
    }

    setFilteredLeads(filtered);
  };

  const handleSubmit = async () => {
    try {
      await leadsAPI.create(formData);
      setOpenDialog(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        source: '',
        status: 'NEW',
        rating: 'WARM',
        industry: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      });
      loadLeads();
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  const handleLeadClick = (leadId) => {
    navigate(`/leads/${leadId}`);
  };

  const stats = {
    total: leads.length,
    hot: leads.filter(l => l.rating === 'HOT').length,
    converted: leads.filter(l => l.status === 'CONVERTED').length,
    avgScore: leads.length > 0 ? Math.round(leads.reduce((sum, l) => sum + (l.score || 0), 0) / leads.length) : 0
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', md: '3rem' } }}>
            Leads
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track your potential customers
          </Typography>
        </Box>
        <Button
          variant="contained"
          size={isMobile ? 'medium' : 'large'}
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: { xs: 2, md: 3 },
            py: 1.5,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
            }
          }}
        >
          Add New Lead
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Leads"
            value={stats.total}
            icon={<GroupIcon fontSize="inherit" />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hot Leads"
            value={stats.hot}
            icon={<StarIcon fontSize="inherit" />}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Converted"
            value={stats.converted}
            icon={<ConvertedIcon fontSize="inherit" />}
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Lead Score"
            value={stats.avgScore}
            icon={<TrendingUpIcon fontSize="inherit" />}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Search leads by name, email, company, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="ALL">All Statuses</MenuItem>
                <MenuItem value="NEW">New</MenuItem>
                <MenuItem value="CONTACTED">Contacted</MenuItem>
                <MenuItem value="QUALIFIED">Qualified</MenuItem>
                <MenuItem value="UNQUALIFIED">Unqualified</MenuItem>
                <MenuItem value="CONVERTED">Converted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                label="Rating"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="ALL">All Ratings</MenuItem>
                <MenuItem value="HOT">Hot</MenuItem>
                <MenuItem value="WARM">Warm</MenuItem>
                <MenuItem value="COLD">Cold</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton color="primary" size="large">
                <FilterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Leads Grid */}
      {filteredLeads.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 2 }}>
          <PersonIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
            {searchQuery || filterStatus !== 'ALL' || filterRating !== 'ALL' ? 'No leads found' : 'No leads yet'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchQuery || filterStatus !== 'ALL' || filterRating !== 'ALL'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first lead'}
          </Typography>
          {!searchQuery && filterStatus === 'ALL' && filterRating === 'ALL' && (
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add Your First Lead
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredLeads.map((lead) => (
            <Grid item xs={12} sm={6} lg={4} key={lead.id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px -10px rgba(0,0,0,0.2)',
                    borderColor: 'primary.main',
                  }
                }}
                onClick={() => handleLeadClick(lead.id)}
              >
                <CardContent>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '1.2rem'
                        }}
                      >
                        {lead.firstName?.[0]}{lead.lastName?.[0]}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {lead.firstName} {lead.lastName}
                        </Typography>
                        {lead.position && (
                          <Typography variant="body2" color="text.secondary">
                            {lead.position}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    {lead.rating && (
                      <Chip
                        label={lead.rating}
                        size="small"
                        color={getRatingColor(lead.rating)}
                        icon={lead.rating === 'HOT' ? <StarIcon /> : <StarBorderIcon />}
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Box>

                  {/* Company */}
                  {lead.company && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <BusinessIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {lead.company}
                      </Typography>
                    </Box>
                  )}

                  {/* Contact Info */}
                  <Box sx={{ mb: 2 }}>
                    {lead.email && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          {lead.email}
                        </Typography>
                      </Box>
                    )}
                    {lead.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          {lead.phone}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Footer */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Chip
                      label={lead.status || 'NEW'}
                      size="small"
                      color={getStatusColor(lead.status)}
                      sx={{ fontWeight: 500 }}
                    />
                    {lead.score !== undefined && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                          Score: {lead.score}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Counts */}
                  {lead._count && (
                    <Box sx={{ display: 'flex', gap: 2, mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" color="text.secondary">
                        {lead._count.notes || 0} notes
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {lead._count.attachments || 0} files
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {lead._count.activities || 0} activities
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Lead Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth fullScreen={isMobile}>
        <DialogTitle sx={{ px: { xs: 2, md: 3 } }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Add New Lead
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Source"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                placeholder="e.g., Website, Referral, Event"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="NEW">New</MenuItem>
                  <MenuItem value="CONTACTED">Contacted</MenuItem>
                  <MenuItem value="QUALIFIED">Qualified</MenuItem>
                  <MenuItem value="UNQUALIFIED">Unqualified</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Rating</InputLabel>
                <Select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  label="Rating"
                >
                  <MenuItem value="HOT">Hot</MenuItem>
                  <MenuItem value="WARM">Warm</MenuItem>
                  <MenuItem value="COLD">Cold</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street Address"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Zip Code"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, md: 3 }, gap: 1, flexWrap: 'wrap' }}>
          <Button onClick={() => setOpenDialog(false)} size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
            disabled={!formData.firstName || !formData.lastName}
            sx={{
              flex: { xs: '1', md: '0' },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #63408a 100%)',
              }
            }}
          >
            Add Lead
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Leads;
