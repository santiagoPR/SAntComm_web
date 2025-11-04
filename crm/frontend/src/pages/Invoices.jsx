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
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { invoicesAPI } from '../services/api';

const Invoices = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    accountName: '',
    amount: '',
    status: 'Pending',
    dueDate: '',
    invoiceDate: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await invoicesAPI.getAll();
      setInvoices(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load invoices');
      console.error('Error loading invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (invoice = null) => {
    if (invoice) {
      setEditingInvoice(invoice);
      setFormData({
        invoiceNumber: invoice.invoiceNumber || '',
        accountName: invoice.accountName || '',
        amount: invoice.amount || '',
        status: invoice.status || 'Pending',
        dueDate: invoice.dueDate || '',
        invoiceDate: invoice.invoiceDate || '',
      });
    } else {
      setEditingInvoice(null);
      setFormData({
        invoiceNumber: '',
        accountName: '',
        amount: '',
        status: 'Pending',
        dueDate: '',
        invoiceDate: '',
      });
    }
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingInvoice(null);
    setFormData({
      invoiceNumber: '',
      accountName: '',
      amount: '',
      status: 'Pending',
      dueDate: '',
      invoiceDate: '',
    });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      if (editingInvoice) {
        await invoicesAPI.update(editingInvoice.id || editingInvoice._id, formData);
      } else {
        await invoicesAPI.create(formData);
      }
      await loadInvoices();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save invoice');
      console.error('Error saving invoice:', err);
    }
  };

  const handleDelete = async () => {
    try {
      setError(null);
      await invoicesAPI.delete(selectedInvoice.id || selectedInvoice._id);
      await loadInvoices();
      setDeleteConfirmOpen(false);
      setSelectedInvoice(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete invoice');
      console.error('Error deleting invoice:', err);
    }
  };

  const handleOpenMenu = (event, invoice) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRowClick = (invoice) => {
    handleOpenDialog(invoice);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'error';
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
          Invoices
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button startIcon={<FilterIcon />} variant="outlined" size={isMobile ? 'small' : 'medium'}>
            Filter
          </Button>
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => handleOpenDialog()} size={isMobile ? 'small' : 'medium'}>
            Create Invoice
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
                <TableCell>Invoice Number</TableCell>
                <TableCell>Account Name</TableCell>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No invoices found. Create your first invoice to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map((invoice) => (
                  <TableRow
                    key={invoice.id || invoice._id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(invoice)}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {invoice.invoiceNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>{invoice.accountName}</TableCell>
                    <TableCell>{invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>${Number(invoice.amount || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        size="small"
                        color={getStatusColor(invoice.status)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, invoice)}>
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
        <MenuItem onClick={() => handleOpenDialog(selectedInvoice)}>
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
          {editingInvoice ? 'Edit Invoice' : 'Create Invoice'}
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Invoice Number"
              fullWidth
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              required
            />
            <TextField
              label="Account Name"
              fullWidth
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              required
            />
            <TextField
              label="Amount"
              fullWidth
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <TextField
              label="Status"
              fullWidth
              select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              SelectProps={{ native: true }}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Cancelled">Cancelled</option>
            </TextField>
            <TextField
              label="Invoice Date"
              fullWidth
              type="date"
              value={formData.invoiceDate}
              onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Due Date"
              fullWidth
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 }, gap: 1, flexWrap: 'wrap' }}>
          <Button onClick={handleCloseDialog} size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>
            {editingInvoice ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this invoice? This action cannot be undone.
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

export default Invoices;
