import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Tabs,
  Tab,
  Divider,
  TextField,
  IconButton,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Add as AddIcon,
  AttachFile as AttachFileIcon,
  Note as NoteIcon,
  CalendarToday as CalendarIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { contactsAPI, companiesAPI } from '../services/api';

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [contact, setContact] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    companyId: '',
  });

  useEffect(() => {
    loadContact();
    loadCompanies();
    loadNotes();
    loadDocuments();
    loadActivities();
  }, [id]);

  const loadContact = async () => {
    try {
      setLoading(true);
      const response = await contactsAPI.getOne(id);
      setContact(response.data);
      setFormData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email || '',
        phone: response.data.phone || '',
        position: response.data.position || '',
        companyId: response.data.companyId || '',
      });
    } catch (error) {
      setError('Failed to load contact details');
      console.error('Load contact error:', error);
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

  const loadNotes = async () => {
    // TODO: Implement notes API
    // For now, load from localStorage
    const savedNotes = localStorage.getItem(`contact_${id}_notes`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  };

  const loadDocuments = async () => {
    // TODO: Implement documents API
    // For now, load from localStorage
    const savedDocs = localStorage.getItem(`contact_${id}_documents`);
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  };

  const loadActivities = async () => {
    // TODO: Implement activities API
    // For now, load from localStorage
    const savedActivities = localStorage.getItem(`contact_${id}_activities`);
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        author: 'Current User', // TODO: Get from auth context
        date: new Date().toLocaleString(),
        content: newNote,
      };
      const updatedNotes = [note, ...notes];
      setNotes(updatedNotes);
      localStorage.setItem(`contact_${id}_notes`, JSON.stringify(updatedNotes));

      // Add to activities
      const activity = {
        id: Date.now(),
        type: 'note',
        title: 'Note Added',
        description: newNote.substring(0, 100) + (newNote.length > 100 ? '...' : ''),
        date: new Date().toLocaleString(),
        icon: 'note',
      };
      const updatedActivities = [activity, ...activities];
      setActivities(updatedActivities);
      localStorage.setItem(`contact_${id}_activities`, JSON.stringify(updatedActivities));

      setNewNote('');
    }
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(n => n.id !== noteId);
      setNotes(updatedNotes);
      localStorage.setItem(`contact_${id}_notes`, JSON.stringify(updatedNotes));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const document = {
        id: Date.now(),
        name: file.name,
        uploadedBy: 'Current User', // TODO: Get from auth context
        uploadedDate: new Date().toLocaleDateString(),
        size: (file.size / 1024).toFixed(1) + ' KB',
        file: file, // Store file reference
      };
      const updatedDocs = [document, ...documents];
      setDocuments(updatedDocs);
      localStorage.setItem(`contact_${id}_documents`, JSON.stringify(updatedDocs.map(d => ({...d, file: null})))); // Don't store actual file

      // Add to activities
      const activity = {
        id: Date.now(),
        type: 'document',
        title: 'Document Uploaded',
        description: file.name,
        date: new Date().toLocaleString(),
        icon: 'attach',
      };
      const updatedActivities = [activity, ...activities];
      setActivities(updatedActivities);
      localStorage.setItem(`contact_${id}_activities`, JSON.stringify(updatedActivities));
    }
  };

  const handleDeleteDocument = (docId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      const updatedDocs = documents.filter(d => d.id !== docId);
      setDocuments(updatedDocs);
      localStorage.setItem(`contact_${id}_documents`, JSON.stringify(updatedDocs.map(d => ({...d, file: null}))));
    }
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
    setError('');
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await contactsAPI.update(id, formData);
      handleCloseEditDialog();
      loadContact();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update contact');
      console.error('Update contact error:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await contactsAPI.delete(id);
      navigate('/contacts');
    } catch (error) {
      setError('Failed to delete contact');
      console.error('Delete contact error:', error);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call':
        return <PhoneIcon />;
      case 'email':
        return <EmailIcon />;
      case 'meeting':
        return <CalendarIcon />;
      case 'note':
        return <NoteIcon />;
      case 'document':
        return <AttachFileIcon />;
      default:
        return <NoteIcon />;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!contact) {
    return (
      <Box>
        <Alert severity="error">Contact not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/contacts')}
          sx={{ mt: 2 }}
        >
          Back to Contacts
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {error && !openEditDialog && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/contacts')}
          sx={{ mb: 2 }}
        >
          Back to Contacts
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar
              sx={{
                width: { xs: 48, md: 64 },
                height: { xs: 48, md: 64 },
                bgcolor: 'primary.main',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 700,
              }}
            >
              {getInitials(contact.firstName, contact.lastName)}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                {contact.firstName} {contact.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {contact.position && `${contact.position}${contact.company ? ' at ' : ''}`}
                {contact.company?.name}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {contact.email && (
              <Button
                startIcon={<EmailIcon />}
                variant="outlined"
                href={`mailto:${contact.email}`}
                size={isMobile ? 'small' : 'medium'}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Send Email
              </Button>
            )}
            <Button startIcon={<EditIcon />} variant="contained" onClick={handleOpenEditDialog} size={isMobile ? 'small' : 'medium'}>
              Edit
            </Button>
            <IconButton onClick={handleDelete} color="error" size={isMobile ? 'small' : 'medium'}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Contact Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: '12px' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contact Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {contact.email && (
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <EmailIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body2">{contact.email}</Typography>
                  </Box>
                </Box>
              )}

              {contact.phone && (
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <PhoneIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body2">{contact.phone}</Typography>
                  </Box>
                </Box>
              )}

              {contact.company && (
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <BusinessIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Company
                    </Typography>
                    <Typography variant="body2">{contact.company.name}</Typography>
                  </Box>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Additional Details
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {contact.position && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Position
                  </Typography>
                  <Typography variant="body2">{contact.position}</Typography>
                </Box>
              )}

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Created Date
                </Typography>
                <Typography variant="body2">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Last Modified
                </Typography>
                <Typography variant="body2">
                  {new Date(contact.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Tabs Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'grey.50',
              }}
            >
              <Tab label="Timeline" />
              <Tab label="Notes" />
              <Tab label="Documents" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {/* Timeline Tab */}
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Activity Timeline
                  </Typography>
                  {activities.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No activities yet. Add notes or documents to see them here.
                    </Typography>
                  ) : (
                    <List>
                      {activities.map((activity) => (
                        <ListItem key={activity.id} sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {getActivityIcon(activity.type)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {activity.title}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography variant="body2" color="text.secondary">
                                  {activity.description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {activity.date}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Box>
              )}

              {/* Notes Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Notes
                  </Typography>

                  {/* Add Note */}
                  <Card sx={{ mb: 3, bgcolor: 'grey.50' }}>
                    <CardContent>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Add a note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddNote}
                        disabled={!newNote.trim()}
                      >
                        Add Note
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Notes List */}
                  {notes.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No notes yet. Add your first note above.
                    </Typography>
                  ) : (
                    <List>
                      {notes.map((note) => (
                        <Card key={note.id} sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {note.author}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                  {note.date}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteNote(note.id)}
                                  color="error"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                            <Typography variant="body2">
                              {note.content}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  )}
                </Box>
              )}

              {/* Documents Tab */}
              {activeTab === 2 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Documents
                    </Typography>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<AttachFileIcon />}
                    >
                      Upload Document
                      <input
                        type="file"
                        hidden
                        onChange={handleFileUpload}
                      />
                    </Button>
                  </Box>

                  {documents.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No documents yet. Upload your first document above.
                    </Typography>
                  ) : (
                    <List>
                      {documents.map((doc) => (
                        <Card key={doc.id} sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar sx={{ bgcolor: 'primary.main' }}>
                                <AttachFileIcon />
                              </Avatar>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                  {doc.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Uploaded by {doc.uploadedBy} on {doc.uploadedDate} • {doc.size}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={() => handleDeleteDocument(doc.id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ px: { xs: 2, md: 3 } }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Edit Contact
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ pt: 3, px: { xs: 2, md: 3 } }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
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
                  label="Position / Job Title"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
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
          </DialogContent>
          <Divider />
          <DialogActions sx={{ px: { xs: 2, md: 3 }, py: 2, gap: 1, flexWrap: 'wrap' }}>
            <Button onClick={handleCloseEditDialog} size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" size={isMobile ? 'medium' : 'large'} sx={{ flex: { xs: '1', md: '0' } }}>
              Update Contact
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ContactDetail;
