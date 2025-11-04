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
  MenuItem,
  Grid,
  Chip,
  InputAdornment,
  LinearProgress,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Percent as PercentIcon
} from '@mui/icons-material';
import { dealsAPI, companiesAPI, contactsAPI } from '../services/api';

const Deals = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [deals, setDeals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage: 'Lead',
    status: 'OPEN',
    companyId: '',
    contactId: '',
    expectedCloseDate: '',
    probability: 50
  });

  const stages = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
  const statuses = ['OPEN', 'WON', 'LOST'];

  useEffect(() => {
    loadDeals();
    loadCompanies();
    loadContacts();
  }, []);

  const loadDeals = async () => {
    try {
      const response = await dealsAPI.getAll();
      setDeals(response.data);
    } catch (error) {
      setError('Failed to load deals');
      console.error('Load deals error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCompanies = async () => {
    try {
      const response = await companiesAPI.getAll();
      setCompanies(response.data);
    } catch (error) {
      console.error('Load companies error:', error);
    }
  };

  const loadContacts = async () => {
    try {
      const response = await contactsAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      console.error('Load contacts error:', error);
    }
  };

  const handleOpenDialog = (deal = null) => {
    if (deal) {
      setEditingDeal(deal);
      setFormData({
        title: deal.title,
        value: deal.value,
        stage: deal.stage,
        status: deal.status,
        companyId: deal.companyId || '',
        contactId: deal.contactId || '',
        expectedCloseDate: deal.expectedCloseDate ? deal.expectedCloseDate.split('T')[0] : '',
        probability: deal.probability
      });
    } else {
      setEditingDeal(null);
      setFormData({
        title: '',
        value: '',
        stage: 'Lead',
        status: 'OPEN',
        companyId: '',
        contactId: '',
        expectedCloseDate: '',
        probability: 50
      });
    }
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDeal(null);
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
        value: parseFloat(formData.value) || 0,
        probability: parseInt(formData.probability) || 50,
        expectedCloseDate: formData.expectedCloseDate || null
      };

      if (editingDeal) {
        await dealsAPI.update(editingDeal.id, submitData);
      } else {
        await dealsAPI.create(submitData);
      }
      handleCloseDialog();
      loadDeals();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save deal');
      console.error('Save deal error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this deal?')) {
      return;
    }

    try {
      await dealsAPI.delete(id);
      loadDeals();
    } catch (error) {
      setError('Failed to delete deal');
      console.error('Delete deal error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'WON':
        return 'success';
      case 'LOST':
        return 'error';
      default:
        return 'primary';
    }
  };

  const getStageColor = (stage) => {
    const colors = {
      'Lead': 'info',
      'Qualified': 'primary',
      'Proposal': 'secondary',
      'Negotiation': 'warning',
      'Closed Won': 'success',
      'Closed Lost': 'error'
    };
    return colors[stage] || 'default';
  };

  const filteredDeals = deals.filter(deal => {
    const query = searchQuery.toLowerCase();
    return (
      deal.title?.toLowerCase().includes(query) ||
      deal.company?.name?.toLowerCase().includes(query) ||
      deal.contact?.firstName?.toLowerCase().includes(query) ||
      deal.contact?.lastName?.toLowerCase().includes(query) ||
      deal.stage?.toLowerCase().includes(query)
    );
  });

  const totalValue = deals.reduce((sum, deal) => sum + (deal.value || 0), 0);
  const wonDeals = deals.filter(d => d.status === 'WON');
  const openDeals = deals.filter(d => d.status === 'OPEN');

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
              Deals
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track and manage your sales pipeline and deal progress
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
            Add Deal
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    bgcolor: 'primary.50',
                    borderRadius: 2,
                    p: 1.5,
                    display: 'flex'
                  }}
                >
                  <MoneyIcon color="primary" sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Total Pipeline Value
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    ${totalValue.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    bgcolor: 'success.50',
                    borderRadius: 2,
                    p: 1.5,
                    display: 'flex'
                  }}
                >
                  <TrendingUpIcon color="success" sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Deals Won
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {wonDeals.length}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    bgcolor: 'warning.50',
                    borderRadius: 2,
                    p: 1.5,
                    display: 'flex'
                  }}
                >
                  <TrendingUpIcon color="warning" sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Open Deals
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {openDeals.length}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Search Bar */}
        <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search deals by title, company, contact, or stage..."
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
                  icon={<MoneyIcon />}
                  label={`${deals.length} Total Deals`}
                  color="primary"
                  variant="outlined"
                  sx={{ px: 1, py: 2.5, fontSize: '0.875rem', fontWeight: 600 }}
                />
                {searchQuery && (
                  <Chip
                    icon={<SearchIcon />}
                    label={`${filteredDeals.length} Results`}
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

      {/* Deals Table */}
      <Paper sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: { xs: 'calc(100vh - 250px)', md: 'none' }, overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Deal Title
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Value
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Stage
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Account
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Probability
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDeals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                    <MoneyIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {searchQuery ? 'No deals found' : 'No deals yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {searchQuery
                        ? 'Try adjusting your search criteria'
                        : 'Get started by adding your first deal'}
                    </Typography>
                    {!searchQuery && (
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                      >
                        Add Deal
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredDeals.map((deal, index) => (
                  <TableRow
                    key={deal.id}
                    sx={{
                      '&:hover': { bgcolor: 'action.hover' },
                      borderBottom: index === filteredDeals.length - 1 ? 'none' : '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <TableCell sx={{ py: 2.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {deal.title}
                      </Typography>
                      {deal.expectedCloseDate && (
                        <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                          <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {new Date(deal.expectedCloseDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                        ${deal.value.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={deal.stage}
                        color={getStageColor(deal.stage)}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={deal.status}
                        color={getStatusColor(deal.status)}
                        size="small"
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      {deal.company && (
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <BusinessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {deal.company.name}
                          </Typography>
                        </Box>
                      )}
                      {deal.contact && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {deal.contact.firstName} {deal.contact.lastName}
                          </Typography>
                        </Box>
                      )}
                      {!deal.company && !deal.contact && (
                        <Typography variant="body2" color="text.disabled">-</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Box sx={{ minWidth: 100 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <PercentIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {deal.probability}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={deal.probability}
                          sx={{
                            height: 6,
                            borderRadius: 1,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 1,
                              bgcolor: deal.probability >= 75 ? 'success.main' : deal.probability >= 50 ? 'primary.main' : 'warning.main'
                            }
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2.5 }}>
                      <Box display="flex" gap={0.5} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(deal)}
                          sx={{
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'primary.50' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(deal.id)}
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
              {editingDeal ? 'Edit Deal' : 'Add New Deal'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {editingDeal
                ? 'Update deal information'
                : 'Enter the details for the new deal'}
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Deal Information Section */}
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
                  Deal Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Basic deal details and value
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Deal Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    helperText="Name or description of the deal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Deal Value"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                    inputProps={{ min: 0, step: 0.01 }}
                    helperText="Total value of the deal in dollars"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Expected Close Date"
                    name="expectedCloseDate"
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    helperText="Expected date to close the deal"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Sales Pipeline Section */}
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
                  Sales Pipeline
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Deal stage, status, and probability
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    helperText="Current stage in the sales pipeline"
                  >
                    {stages.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
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
                    helperText="Current status of the deal"
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
                    label="Probability (%)"
                    name="probability"
                    type="number"
                    value={formData.probability}
                    onChange={handleChange}
                    inputProps={{ min: 0, max: 100 }}
                    helperText="Likelihood of closing the deal (0-100%)"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PercentIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Account Information Section */}
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
                  Account Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Associated company and contact
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Company"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    helperText="Select the associated company"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {companies.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Contact"
                    name="contactId"
                    value={formData.contactId}
                    onChange={handleChange}
                    helperText="Select the primary contact"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {contacts.map((contact) => (
                      <MenuItem key={contact.id} value={contact.id}>
                        {contact.firstName} {contact.lastName}
                      </MenuItem>
                    ))}
                  </TextField>
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
              {editingDeal ? 'Update Deal' : 'Create Deal'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Deals;
