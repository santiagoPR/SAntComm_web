import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Grid,
  Chip,
  InputAdornment,
  Avatar,
  Divider,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon
} from '@mui/icons-material';
import { companiesAPI } from '../services/api';

const Companies = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await companiesAPI.getAll();
      setCompanies(response.data);
    } catch (error) {
      setError('Failed to load companies');
      console.error('Load companies error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (company = null) => {
    if (company) {
      setEditingCompany(company);
      setFormData({
        name: company.name,
        industry: company.industry || '',
        website: company.website || '',
        phone: company.phone || '',
        email: company.email || '',
        street: company.street || '',
        city: company.city || '',
        state: company.state || '',
        zipCode: company.zipCode || ''
      });
    } else {
      setEditingCompany(null);
      setFormData({
        name: '',
        industry: '',
        website: '',
        phone: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: ''
      });
    }
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCompany(null);
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
      if (editingCompany) {
        await companiesAPI.update(editingCompany.id, formData);
      } else {
        await companiesAPI.create(formData);
      }
      handleCloseDialog();
      loadCompanies();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save company');
      console.error('Save company error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) {
      return;
    }

    try {
      await companiesAPI.delete(id);
      loadCompanies();
    } catch (error) {
      setError('Failed to delete company');
      console.error('Delete company error:', error);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const query = searchQuery.toLowerCase();
    return (
      company.name?.toLowerCase().includes(query) ||
      company.industry?.toLowerCase().includes(query) ||
      company.website?.toLowerCase().includes(query) ||
      company.email?.toLowerCase().includes(query) ||
      company.city?.toLowerCase().includes(query)
    );
  });

  const getCompanyInitials = (name) => {
    const words = name?.split(' ') || [];
    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
    }
    return name?.substring(0, 2).toUpperCase() || '';
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
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.75rem', md: '3rem' } }}>
              Companies
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your company accounts and business relationships
            </Typography>
          </Box>
          <Button
            variant="contained"
            size={isMobile ? 'medium' : 'large'}
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              px: { xs: 2, md: 4 },
              py: 1.5,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              '&:hover': {
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              }
            }}
          >
            Add Company
          </Button>
        </Box>

        {/* Search and Stats Bar */}
        <Paper sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search companies by name, industry, website, or location..."
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
                    bgcolor: 'background.default',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Chip
                  icon={<BusinessIcon />}
                  label={`${companies.length} Total Companies`}
                  color="primary"
                  variant="outlined"
                  sx={{ px: 1, py: 2.5, fontSize: '0.875rem', fontWeight: 600 }}
                />
                {searchQuery && (
                  <Chip
                    icon={<SearchIcon />}
                    label={`${filteredCompanies.length} Results`}
                    color="secondary"
                    variant="outlined"
                    sx={{ px: 1, py: 2.5, fontSize: '0.875rem', fontWeight: 600 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {error && !openDialog && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Companies Table */}
      <Paper sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: { xs: 'calc(100vh - 250px)', md: 'none' }, overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Company Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Industry
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Contact Info
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Location
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <BusinessIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {searchQuery ? 'No companies found' : 'No companies yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {searchQuery
                        ? 'Try adjusting your search criteria'
                        : 'Get started by adding your first company'}
                    </Typography>
                    {!searchQuery && (
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                      >
                        Add Company
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((company, index) => (
                  <TableRow
                    key={company.id}
                    sx={{
                      '&:hover': { bgcolor: 'action.hover' },
                      borderBottom: index === filteredCompanies.length - 1 ? 'none' : '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <TableCell sx={{ py: 2.5 }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            bgcolor: 'secondary.main',
                            width: 40,
                            height: 40,
                            fontSize: '0.875rem',
                            fontWeight: 600
                          }}
                        >
                          {getCompanyInitials(company.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {company.name}
                          </Typography>
                          {company.website && (
                            <Link
                              href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 0.5 }}
                            >
                              <LanguageIcon sx={{ fontSize: 12 }} />
                              {company.website}
                            </Link>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      {company.industry ? (
                        <Chip
                          icon={<WorkIcon />}
                          label={company.industry}
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{ fontWeight: 500 }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.disabled">-</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Box>
                        {company.phone && (
                          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                            <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {company.phone}
                            </Typography>
                          </Box>
                        )}
                        {company.email && (
                          <Box display="flex" alignItems="center" gap={1}>
                            <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {company.email}
                            </Typography>
                          </Box>
                        )}
                        {!company.phone && !company.email && (
                          <Typography variant="body2" color="text.disabled">-</Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      {company.city || company.state ? (
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {[company.city, company.state].filter(Boolean).join(', ')}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.disabled">-</Typography>
                      )}
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2.5 }}>
                      <Box display="flex" gap={0.5} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(company)}
                          sx={{
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'primary.50' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(company.id)}
                          sx={{
                            color: 'error.main',
                            '&:hover': { bgcolor: 'error.50' }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog with Zoho-style Form */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, md: 3 },
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ pb: 1, pt: 3, px: { xs: 2, md: 4 } }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {editingCompany ? 'Edit Company' : 'Add New Company'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {editingCompany
                ? 'Update company information'
                : 'Enter the details for the new company'}
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Company Information Section */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  bgcolor: 'primary.50',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'primary.200',
                  mb: 3
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', fontSize: '1rem' }}>
                  Company Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Basic company details and industry classification
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Company Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    helperText="Legal name or trading name of the company"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    helperText="Business sector or industry type"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    helperText="Company website URL"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Contact Information Section */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  bgcolor: 'secondary.50',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'secondary.200',
                  mb: 3
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.main', fontSize: '1rem' }}>
                  Contact Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Primary contact methods for the company
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    helperText="Main office phone number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    helperText="Primary email for communication"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Address Information Section */}
            <Box>
              <Box
                sx={{
                  bgcolor: 'info.50',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'info.200',
                  mb: 3
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'info.main', fontSize: '1rem' }}>
                  Address Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Physical location and mailing address
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    helperText="Street address or P.O. Box"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    helperText="City name"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State / Province"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    helperText="State or province"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    helperText="Postal code"
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 3 }, bgcolor: 'grey.50', gap: 1, flexWrap: 'wrap' }}>
            <Button
              onClick={handleCloseDialog}
              size={isMobile ? 'medium' : 'large'}
              sx={{ px: { xs: 2, md: 3 }, flex: { xs: '1', md: '0' } }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size={isMobile ? 'medium' : 'large'}
              sx={{
                px: { xs: 2, md: 4 },
                flex: { xs: '1', md: '0' },
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            >
              {editingCompany ? 'Update Company' : 'Create Company'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Companies;
