import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  Tooltip
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Note as NoteIcon,
  AttachFile as AttachFileIcon,
  Event as EventIcon,
  PushPin as PinIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Description as FileIcon
} from '@mui/icons-material';
import { leadsAPI } from '../services/api';

const TabPanel = ({ children, value, index, ...other }) => (
  <div role="tabpanel" hidden={value !== index} {...other}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [openActivityDialog, setOpenActivityDialog] = useState(false);
  const [noteFormData, setNoteFormData] = useState({ title: '', content: '', isPinned: false });
  const [activityFormData, setActivityFormData] = useState({
    type: 'NOTE',
    subject: '',
    description: '',
    outcome: '',
    scheduledAt: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadLead();
  }, [id]);

  const loadLead = async () => {
    try {
      const response = await leadsAPI.getOne(id);
      setLead(response.data);
    } catch (error) {
      console.error('Failed to load lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    try {
      await leadsAPI.createNote(id, noteFormData);
      setOpenNoteDialog(false);
      setNoteFormData({ title: '', content: '', isPinned: false });
      loadLead();
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await leadsAPI.deleteNote(id, noteId);
      loadLead();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handlePinNote = async (noteId, currentPinStatus) => {
    try {
      await leadsAPI.updateNote(id, noteId, { isPinned: !currentPinStatus });
      loadLead();
    } catch (error) {
      console.error('Failed to pin note:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await leadsAPI.uploadAttachment(id, formData);
      loadLead();
      setSelectedFile(null);
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const handleDownloadAttachment = async (attachmentId, fileName) => {
    try {
      const response = await leadsAPI.downloadAttachment(id, attachmentId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  const handleDeleteAttachment = async (attachmentId) => {
    try {
      await leadsAPI.deleteAttachment(id, attachmentId);
      loadLead();
    } catch (error) {
      console.error('Failed to delete attachment:', error);
    }
  };

  const handleAddActivity = async () => {
    try {
      await leadsAPI.createActivity(id, activityFormData);
      setOpenActivityDialog(false);
      setActivityFormData({
        type: 'NOTE',
        subject: '',
        description: '',
        outcome: '',
        scheduledAt: ''
      });
      loadLead();
    } catch (error) {
      console.error('Failed to add activity:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadsAPI.delete(id);
        navigate('/leads');
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!lead) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">Lead not found</Typography>
        <Button onClick={() => navigate('/leads')} startIcon={<BackIcon />} sx={{ mt: 2 }}>
          Back to Leads
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/leads')}
          sx={{ mb: 2 }}
        >
          Back to Leads
        </Button>

        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'start' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '2rem'
                }}
              >
                {lead.firstName?.[0]}{lead.lastName?.[0]}
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {lead.firstName} {lead.lastName}
                </Typography>
                {lead.position && (
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    {lead.position}
                  </Typography>
                )}
                {lead.company && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <BusinessIcon sx={{ color: 'text.secondary' }} />
                    <Typography variant="body1" color="text.secondary">
                      {lead.company}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Chip label={lead.status || 'NEW'} color="primary" />
                  {lead.rating && (
                    <Chip
                      label={lead.rating}
                      color={lead.rating === 'HOT' ? 'error' : lead.rating === 'WARM' ? 'warning' : 'info'}
                      icon={<StarIcon />}
                    />
                  )}
                  {lead.score !== undefined && (
                    <Chip
                      label={`Score: ${lead.score}`}
                      icon={<TrendingUpIcon />}
                      color="success"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Edit">
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="error" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Tabs */}
      <Paper sx={{ borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 2
          }}
        >
          <Tab label="Overview" icon={<BusinessIcon />} iconPosition="start" />
          <Tab label={`Notes (${lead.notes?.length || 0})`} icon={<NoteIcon />} iconPosition="start" />
          <Tab label={`Attachments (${lead.attachments?.length || 0})`} icon={<AttachFileIcon />} iconPosition="start" />
          <Tab label={`Activities (${lead.activities?.length || 0})`} icon={<EventIcon />} iconPosition="start" />
        </Tabs>

        {/* Overview Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Contact Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {lead.email && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <EmailIcon color="action" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1">{lead.email}</Typography>
                        </Box>
                      </Box>
                    )}
                    {lead.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <PhoneIcon color="action" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Phone
                          </Typography>
                          <Typography variant="body1">{lead.phone}</Typography>
                        </Box>
                      </Box>
                    )}
                    {(lead.street || lead.city || lead.state) && (
                      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                        <LocationIcon color="action" />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Address
                          </Typography>
                          <Typography variant="body1">
                            {lead.street && <>{lead.street}<br /></>}
                            {lead.city && `${lead.city}, `}
                            {lead.state && `${lead.state} `}
                            {lead.zipCode}
                            {lead.country && <><br />{lead.country}</>}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Lead Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {lead.source && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Source
                        </Typography>
                        <Typography variant="body1">{lead.source}</Typography>
                      </Box>
                    )}
                    {lead.industry && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Industry
                        </Typography>
                        <Typography variant="body1">{lead.industry}</Typography>
                      </Box>
                    )}
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Created
                      </Typography>
                      <Typography variant="body1">{formatDate(lead.createdAt)}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Last Updated
                      </Typography>
                      <Typography variant="body1">{formatDate(lead.updatedAt)}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notes Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenNoteDialog(true)}
              sx={{ borderRadius: 2 }}
            >
              Add Note
            </Button>
          </Box>

          {lead.notes?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <NoteIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No notes yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add your first note to track important information
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {lead.notes.map((note) => (
                <Grid item xs={12} key={note.id}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            {note.isPinned && (
                              <PinIcon color="primary" sx={{ fontSize: 18 }} />
                            )}
                            {note.title && (
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {note.title}
                              </Typography>
                            )}
                          </Box>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                            {note.content}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(note.createdAt)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title={note.isPinned ? 'Unpin' : 'Pin'}>
                            <IconButton
                              size="small"
                              onClick={() => handlePinNote(note.id, note.isPinned)}
                              color={note.isPinned ? 'primary' : 'default'}
                            >
                              <PinIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteNote(note.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* Attachments Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 2 }}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
          </Box>

          {lead.attachments?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <AttachFileIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No attachments yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload files to keep all important documents in one place
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {lead.attachments.map((attachment) => (
                <Grid item xs={12} sm={6} md={4} key={attachment.id}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                        <FileIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>
                            {attachment.fileName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {formatFileSize(attachment.fileSize)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {formatDate(attachment.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button
                          size="small"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDownloadAttachment(attachment.id, attachment.fileName)}
                        >
                          Download
                        </Button>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteAttachment(attachment.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* Activities Tab */}
        <TabPanel value={activeTab} index={3}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenActivityDialog(true)}
              sx={{ borderRadius: 2 }}
            >
              Add Activity
            </Button>
          </Box>

          {lead.activities?.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <EventIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No activities yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track calls, emails, meetings, and other interactions
              </Typography>
            </Box>
          ) : (
            <List>
              {lead.activities.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 2
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Chip label={activity.type} size="small" color="primary" />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {activity.subject}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          {activity.description && (
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {activity.description}
                            </Typography>
                          )}
                          {activity.outcome && (
                            <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                              Outcome: {activity.outcome}
                            </Typography>
                          )}
                          <Typography variant="caption" color="text.secondary">
                            {activity.scheduledAt ? `Scheduled: ${formatDate(activity.scheduledAt)}` : formatDate(activity.createdAt)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          )}
        </TabPanel>
      </Paper>

      {/* Add Note Dialog */}
      <Dialog open={openNoteDialog} onClose={() => setOpenNoteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Title (Optional)"
              value={noteFormData.title}
              onChange={(e) => setNoteFormData({ ...noteFormData, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={4}
              value={noteFormData.content}
              onChange={(e) => setNoteFormData({ ...noteFormData, content: e.target.value })}
              required
            />
            <FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <input
                  type="checkbox"
                  checked={noteFormData.isPinned}
                  onChange={(e) => setNoteFormData({ ...noteFormData, isPinned: e.target.checked })}
                />
                <Typography variant="body2">Pin this note</Typography>
              </Box>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNoteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddNote}
            variant="contained"
            disabled={!noteFormData.content}
          >
            Add Note
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Activity Dialog */}
      <Dialog open={openActivityDialog} onClose={() => setOpenActivityDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Activity</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Activity Type</InputLabel>
              <Select
                value={activityFormData.type}
                onChange={(e) => setActivityFormData({ ...activityFormData, type: e.target.value })}
                label="Activity Type"
              >
                <MenuItem value="CALL">Call</MenuItem>
                <MenuItem value="EMAIL">Email</MenuItem>
                <MenuItem value="MEETING">Meeting</MenuItem>
                <MenuItem value="NOTE">Note</MenuItem>
                <MenuItem value="STATUS_CHANGE">Status Change</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Subject"
              value={activityFormData.subject}
              onChange={(e) => setActivityFormData({ ...activityFormData, subject: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={activityFormData.description}
              onChange={(e) => setActivityFormData({ ...activityFormData, description: e.target.value })}
            />
            <TextField
              fullWidth
              label="Outcome"
              value={activityFormData.outcome}
              onChange={(e) => setActivityFormData({ ...activityFormData, outcome: e.target.value })}
            />
            <TextField
              fullWidth
              label="Scheduled At"
              type="datetime-local"
              value={activityFormData.scheduledAt}
              onChange={(e) => setActivityFormData({ ...activityFormData, scheduledAt: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenActivityDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddActivity}
            variant="contained"
            disabled={!activityFormData.subject}
          >
            Add Activity
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeadDetail;
