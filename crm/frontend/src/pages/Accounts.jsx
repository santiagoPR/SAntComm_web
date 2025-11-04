import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  FilterList as FilterIcon,
  Business as BusinessIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { accountsAPI } from '../services/api';

const Accounts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState({
    accountName: '',
    accountOwner: '',
    phone: '',
    website: '',
    annualRevenue: '',
    industry: '',
    type: 'Customer',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await accountsAPI.getAll();
      setAccounts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load accounts');
      console.error('Error loading accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (account = null) => {
    if (account) {
      setEditingAccount(account);
      setFormData({
        accountName: account.accountName || '',
        accountOwner: account.accountOwner || '',
        phone: account.phone || '',
        website: account.website || '',
        annualRevenue: account.annualRevenue || '',
        industry: account.industry || '',
        type: account.type || 'Customer',
      });
    } else {
      setEditingAccount(null);
      setFormData({
        accountName: '',
        accountOwner: '',
        phone: '',
        website: '',
        annualRevenue: '',
        industry: '',
        type: 'Customer',
      });
    }
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAccount(null);
    setFormData({
      accountName: '',
      accountOwner: '',
      phone: '',
      website: '',
      annualRevenue: '',
      industry: '',
      type: 'Customer',
    });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      if (editingAccount) {
        await accountsAPI.update(editingAccount.id || editingAccount._id, formData);
      } else {
        await accountsAPI.create(formData);
      }
      await loadAccounts();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save account');
      console.error('Error saving account:', err);
    }
  };

  const handleDelete = async () => {
    try {
      setError(null);
      await accountsAPI.delete(selectedAccount.id || selectedAccount._id);
      await loadAccounts();
      setDeleteConfirmOpen(false);
      setSelectedAccount(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account');
      console.error('Error deleting account:', err);
    }
  };

  const handleOpenMenu = (event, account) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedAccount(account);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRowClick = (account) => {
    handleOpenDialog(account);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Customer':
        return 'success';
      case 'Partner':
        return 'primary';
      case 'Prospect':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
          Accounts
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button startIcon={<FilterIcon />} variant="outlined" size={isMobile ? 'small' : 'medium'}>
            Filter
          </Button>
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => handleOpenDialog()} size={isMobile ? 'small' : 'medium'}>
            Create Account
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: { xs: 'calc(100vh - 250px)', md: 'none' }, overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell>Account Name</TableCell>
                <TableCell>Account Owner</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Annual Revenue</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No accounts found. Create your first account to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                accounts.map((account) => (
                  <TableRow
                    key={account.id || account._id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(account)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          <BusinessIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {account.accountName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {account.website}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{account.accountOwner}</TableCell>
                    <TableCell>{account.phone}</TableCell>
                    <TableCell>${Number(account.annualRevenue || 0).toLocaleString()}</TableCell>
                    <TableCell>{account.industry}</TableCell>
                    <TableCell>
                      <Chip
                        label={account.type}
                        size="small"
                        color={getTypeColor(account.type)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, account)}>
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleOpenDialog(selectedAccount)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteConfirmOpen(true);
            handleCloseMenu();
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth fullScreen={isMobile}>
        <DialogTitle sx={{ px: { xs: 2, md: 3 } }}>
          {editingAccount ? 'Edit Account' : 'Create Account'}
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Account Name"
              fullWidth
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              required
            />
            <TextField
              label="Account Owner"
              fullWidth
              value={formData.accountOwner}
              onChange={(e) => setFormData({ ...formData, accountOwner: e.target.value })}
              required
            />
            <TextField
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <TextField
              label="Website"
              fullWidth
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <TextField
              label="Annual Revenue"
              fullWidth
              type="number"
              value={formData.annualRevenue}
              onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
            />
            <TextField
              label="Industry"
              fullWidth
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            />
            <TextField
              label="Type"
              fullWidth
              select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              SelectProps={{ native: true }}
            >
              <option value="Customer">Customer</option>
              <option value="Partner">Partner</option>
              <option value="Prospect">Prospect</option>
              <option value="Vendor">Vendor</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 }, gap: 1, flexWrap: 'wrap' }}>
          <Button onClick={handleCloseDialog} size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>
            {editingAccount ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Accounts;
