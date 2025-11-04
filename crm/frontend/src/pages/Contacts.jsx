import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { contactsAPI, companiesAPI } from '../services/api';

const Contacts = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [contacts, setContacts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    companyId: ''
  });

  useEffect(() => {
    loadContacts();
    loadCompanies();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await contactsAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      setError('Failed to load contacts');
      console.error('Load contacts error:', error);
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

  const handleOpenDialog = (contact = null) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email || '',
        phone: contact.phone || '',
        position: contact.position || '',
        companyId: contact.companyId || ''
      });
    } else {
      setEditingContact(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        companyId: ''
      });
    }
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingContact(null);
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
      if (editingContact) {
        await contactsAPI.update(editingContact.id, formData);
      } else {
        await contactsAPI.create(formData);
      }
      handleCloseDialog();
      loadContacts();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to save contact');
      console.error('Save contact error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await contactsAPI.delete(id);
      loadContacts();
    } catch (error) {
      setError('Failed to delete contact');
      console.error('Delete contact error:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    return (
      contact.firstName?.toLowerCase().includes(query) ||
      contact.lastName?.toLowerCase().includes(query) ||
      contact.email?.toLowerCase().includes(query) ||
      contact.phone?.toLowerCase().includes(query) ||
      contact.position?.toLowerCase().includes(query) ||
      contact.company?.name?.toLowerCase().includes(query)
    );
  });

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
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
              Contacts
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your contacts and customer relationships
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
            Add Contact
          </Button>
        </Box>

        {/* Search and Stats Bar */}
        <Paper sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search contacts by name, email, phone, position, or company..."
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
                  icon={<PersonIcon />}
                  label={`${contacts.length} Total Contacts`}
                  color="primary"
                  variant="outlined"
                  sx={{ px: 1, py: 2.5, fontSize: '0.875rem', fontWeight: 600 }}
                />
                {searchQuery && (
                  <Chip
                    icon={<SearchIcon />}
                    label={`${filteredContacts.length} Results`}
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

      {/* Contacts Table */}
      <Paper sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: { xs: 'calc(100vh - 250px)', md: 'none' }, overflowX: 'auto' }}>
          <Table sx={{ minWidth: { xs: 0, md: 650 } }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Contact Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2, display: { xs: 'none', md: 'table-cell' } }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2, display: { xs: 'none', md: 'table-cell' } }}>
                  Phone
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2, display: { xs: 'none', sm: 'table-cell' } }}>
                  Position
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2, display: { xs: 'none', lg: 'table-cell' } }}>
                  Company
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.primary', py: 2 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <PersonIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      {searchQuery ? 'No contacts found' : 'No contacts yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {searchQuery
                        ? 'Try adjusting your search criteria'
                        : 'Get started by adding your first contact'}
                    </Typography>
                    {!searchQuery && (
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                      >
                        Add Contact
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredContacts.map((contact, index) => (
                  <TableRow
                    key={contact.id}
                    onClick={() => navigate(`/contacts/${contact.id}`)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                      borderBottom: index === filteredContacts.length - 1 ? 'none' : '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <TableCell sx={{ py: 2.5 }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 40,
                            height: 40,
                            fontSize: '0.875rem',
                            fontWeight: 600
                          }}
                        >
                          {getInitials(contact.firstName, contact.lastName)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {contact.firstName} {contact.lastName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2.5, display: { xs: 'none', md: 'table-cell' } }}>
                      {contact.email ? (
                        <Box display="flex" alignItems="center" gap={1}>
                          <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {contact.email}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.disabled">-</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 2.5, display: { xs: 'none', md: 'table-cell' } }}>
                      {contact.phone ? (
                        <Box display="flex" alignItems="center" gap={1}>
                          <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {contact.phone}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.disabled">-</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 2.5, display: { xs: 'none', sm: 'table-cell' } }}>
                      {contact.position ? (
                        <Chip
                          label={contact.position}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.disabled">-</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ py: 2.5, display: { xs: 'none', lg: 'table-cell' } }}>
                      {contact.company ? (
                        <Box display="flex" alignItems="center" gap={1}>
                          <BusinessIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {contact.company.name}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDialog(contact);
                          }}
                          sx={{
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'primary.50' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contact.id);
                          }}
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
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {editingContact
                ? 'Update contact information'
                : 'Enter the details for the new contact'}
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Contact Information Section */}
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
                  Contact Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Basic contact details and personal information
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    helperText="Contact's given name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    helperText="Contact's family name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    helperText="Contact's phone number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Professional Information Section */}
            <Box>
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
                  Professional Information
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Job title and company affiliation
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position / Job Title"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    helperText="Contact's role or job title"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
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
              {editingContact ? 'Update Contact' : 'Create Contact'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Contacts;
