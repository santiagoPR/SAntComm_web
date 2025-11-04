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
  LinearProgress,
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
import { forecastsAPI } from '../services/api';

const Forecasts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingForecast, setEditingForecast] = useState(null);
  const [formData, setFormData] = useState({
    forecastName: '',
    owner: '',
    period: '',
    targetRevenue: '',
    actualRevenue: '',
    achievement: '',
    status: 'In Progress',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    loadForecasts();
  }, []);

  const loadForecasts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await forecastsAPI.getAll();
      setForecasts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load forecasts');
      console.error('Error loading forecasts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (forecast = null) => {
    if (forecast) {
      setEditingForecast(forecast);
      setFormData({
        forecastName: forecast.forecastName || '',
        owner: forecast.owner || '',
        period: forecast.period || '',
        targetRevenue: forecast.targetRevenue || '',
        actualRevenue: forecast.actualRevenue || '',
        achievement: forecast.achievement || '',
        status: forecast.status || 'In Progress',
      });
    } else {
      setEditingForecast(null);
      setFormData({
        forecastName: '',
        owner: '',
        period: '',
        targetRevenue: '',
        actualRevenue: '',
        achievement: '',
        status: 'In Progress',
      });
    }
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingForecast(null);
    setFormData({
      forecastName: '',
      owner: '',
      period: '',
      targetRevenue: '',
      actualRevenue: '',
      achievement: '',
      status: 'In Progress',
    });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      if (editingForecast) {
        await forecastsAPI.update(editingForecast.id || editingForecast._id, formData);
      } else {
        await forecastsAPI.create(formData);
      }
      await loadForecasts();
      handleCloseDialog();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save forecast');
      console.error('Error saving forecast:', err);
    }
  };

  const handleDelete = async () => {
    try {
      setError(null);
      await forecastsAPI.delete(selectedForecast.id || selectedForecast._id);
      await loadForecasts();
      setDeleteConfirmOpen(false);
      setSelectedForecast(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete forecast');
      console.error('Error deleting forecast:', err);
    }
  };

  const handleOpenMenu = (event, forecast) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedForecast(forecast);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRowClick = (forecast) => {
    handleOpenDialog(forecast);
  };

  const getAchievementColor = (achievement) => {
    if (achievement >= 100) return 'success';
    if (achievement >= 75) return 'primary';
    if (achievement >= 50) return 'warning';
    return 'error';
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
          Forecasts
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button startIcon={<FilterIcon />} variant="outlined" size={isMobile ? 'small' : 'medium'}>
            Filter
          </Button>
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => handleOpenDialog()} size={isMobile ? 'small' : 'medium'}>
            Create Forecast
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
                <TableCell>Forecast Name</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Target Revenue</TableCell>
                <TableCell>Actual Revenue</TableCell>
                <TableCell>Achievement</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forecasts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      No forecasts found. Create your first forecast to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                forecasts.map((forecast) => (
                  <TableRow
                    key={forecast.id || forecast._id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(forecast)}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {forecast.forecastName}
                      </Typography>
                    </TableCell>
                    <TableCell>{forecast.owner}</TableCell>
                    <TableCell>{forecast.period}</TableCell>
                    <TableCell>${Number(forecast.targetRevenue || 0).toLocaleString()}</TableCell>
                    <TableCell>${Number(forecast.actualRevenue || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(Number(forecast.achievement || 0), 100)}
                          color={getAchievementColor(Number(forecast.achievement || 0))}
                          sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                          {forecast.achievement}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={forecast.status}
                        size="small"
                        color={forecast.status === 'Completed' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => handleOpenMenu(e, forecast)}>
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
        <MenuItem onClick={() => handleOpenDialog(selectedForecast)}>
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
          {editingForecast ? 'Edit Forecast' : 'Create Forecast'}
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Forecast Name"
              fullWidth
              value={formData.forecastName}
              onChange={(e) => setFormData({ ...formData, forecastName: e.target.value })}
              required
            />
            <TextField
              label="Owner"
              fullWidth
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              required
            />
            <TextField
              label="Period"
              fullWidth
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="e.g., Q1 2024"
              required
            />
            <TextField
              label="Target Revenue"
              fullWidth
              type="number"
              value={formData.targetRevenue}
              onChange={(e) => setFormData({ ...formData, targetRevenue: e.target.value })}
              required
            />
            <TextField
              label="Actual Revenue"
              fullWidth
              type="number"
              value={formData.actualRevenue}
              onChange={(e) => setFormData({ ...formData, actualRevenue: e.target.value })}
              required
            />
            <TextField
              label="Achievement (%)"
              fullWidth
              type="number"
              value={formData.achievement}
              onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
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
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Planned">Planned</option>
              <option value="Cancelled">Cancelled</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 }, gap: 1, flexWrap: 'wrap' }}>
          <Button onClick={handleCloseDialog} size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>
            {editingForecast ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this forecast? This action cannot be undone.
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

export default Forecasts;
