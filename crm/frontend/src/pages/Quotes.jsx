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
import { quotesAPI } from '../services/api';

const Quotes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [formData, setFormData] = useState({
    quoteName: '',
    accountName: '',
    amount: '',
    stage: 'Draft',
    validUntil: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await quotesAPI.getAll();
      setQuotes(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load quotes');
      console.error('Error loading quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (quote = null) => {
    if (quote) {
      setEditingQuote(quote);
      setFormData({
        quoteName: quote.quoteName || '',
        accountName: quote.accountName || '',
        amount: quote.amount || '',
        stage: quote.stage || 'Draft',
        validUntil: quote.validUntil || '',
      });
    } else {
      setEditingQuote(null);
      setFormData({
        quoteName: '',
        accountName: '',
        amount: '',
        stage: 'Draft',
        validUntil: '',
      });
    }
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingQuote(null);
    setFormData({
      quoteName: '',
      accountName: '',
      amount: '',
      stage: 'Draft',
      validUntil: '',
    });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      if (editingQuote) {
        await quotesAPI.update(editingQuote.id || editingQuote._id, formData);
      } else {
        await quotesAPI.create(formData);
      }
      await loadQuotes();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save quote');
      console.error('Error saving quote:', err);
    }
  };

  const handleDelete = async () => {
    try {
      setError(null);
      await quotesAPI.delete(selectedQuote.id || selectedQuote._id);
      await loadQuotes();
      setDeleteConfirmOpen(false);
      setSelectedQuote(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete quote');
      console.error('Error deleting quote:', err);
    }
  };

  const handleOpenMenu = (event, quote) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedQuote(quote);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRowClick = (quote) => {
    handleOpenDialog(quote);
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
          Quotes
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button startIcon={<FilterIcon />} variant="outlined" size={isMobile ? 'small' : 'medium'}>
            Filter
          </Button>
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => handleOpenDialog()} size={isMobile ? 'small' : 'medium'}>
            Create Quote
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
                <TableCell>Quote Name</TableCell>
                <TableCell>Account Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Stage</TableCell>
                <TableCell>Valid Until</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quotes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No quotes found. Create your first quote to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                quotes.map((quote) => (
                  <TableRow
                    key={quote.id || quote._id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(quote)}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {quote.quoteName}
                      </Typography>
                    </TableCell>
                    <TableCell>{quote.accountName}</TableCell>
                    <TableCell>${Number(quote.amount || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={quote.stage}
                        size="small"
                        color={quote.stage === 'Sent' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>{quote.validUntil ? new Date(quote.validUntil).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, quote)}>
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
        <MenuItem onClick={() => handleOpenDialog(selectedQuote)}>
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
          {editingQuote ? 'Edit Quote' : 'Create Quote'}
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Quote Name"
              fullWidth
              value={formData.quoteName}
              onChange={(e) => setFormData({ ...formData, quoteName: e.target.value })}
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
              label="Stage"
              fullWidth
              select
              value={formData.stage}
              onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              SelectProps={{ native: true }}
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
            </TextField>
            <TextField
              label="Valid Until"
              fullWidth
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 }, gap: 1, flexWrap: 'wrap' }}>
          <Button onClick={handleCloseDialog} size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>
            {editingQuote ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this quote? This action cannot be undone.
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

export default Quotes;
