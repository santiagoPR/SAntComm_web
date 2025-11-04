import { useState } from 'react';
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
  LinearProgress,
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
  TrendingUp as TrendingIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';

const LeadDetailNew = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [newNote, setNewNote] = useState('');

  // Mock lead data
  const lead = {
    id: 1,
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@prospecttech.com',
    phone: '(555) 234-5678',
    mobile: '(555) 876-5432',
    title: 'VP of Operations',
    company: 'Prospect Tech Solutions',
    industry: 'Technology',
    leadSource: 'Website Form',
    address: '456 Innovation Drive, Seattle, WA 98101',
    status: 'Qualified',
    rating: 'Hot',
    score: 85,
    estimatedValue: 125000,
    owner: 'Sarah Johnson',
    createdDate: '2024-02-10',
    modifiedDate: '2024-03-22',
  };

  const [notes] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      date: '2024-03-22 3:45 PM',
      content: 'Lead is very interested in our enterprise package. Scheduled demo for next Tuesday.',
    },
    {
      id: 2,
      author: 'Mike Davis',
      date: '2024-03-18 11:20 AM',
      content: 'Initial contact made. They are looking to upgrade their current system within the next 2 months.',
    },
  ]);

  const [documents] = useState([
    {
      id: 1,
      name: 'Enterprise_Proposal_Draft.pdf',
      uploadedBy: 'Sarah Johnson',
      uploadedDate: '2024-03-20',
      size: '3.2 MB',
    },
    {
      id: 2,
      name: 'Product_Comparison.xlsx',
      uploadedBy: 'Mike Davis',
      uploadedDate: '2024-03-18',
      size: '850 KB',
    },
  ]);

  const [activities] = useState([
    {
      id: 1,
      type: 'call',
      title: 'Discovery Call',
      description: 'Discussed pain points and requirements',
      date: '2024-03-22 3:30 PM',
      icon: <PhoneIcon />,
    },
    {
      id: 2,
      type: 'email',
      title: 'Proposal Sent',
      description: 'Enterprise package proposal sent for review',
      date: '2024-03-20 10:00 AM',
      icon: <EmailIcon />,
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Demo Scheduled',
      description: 'Product demonstration scheduled for Mar 26',
      date: '2024-03-18 2:00 PM',
      icon: <CalendarIcon />,
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      setNewNote('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Qualified':
        return 'success';
      case 'New':
        return 'info';
      case 'Working':
        return 'primary';
      case 'Nurturing':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Hot':
        return 'error';
      case 'Warm':
        return 'warning';
      case 'Cold':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/leads')}
          sx={{ mb: 2 }}
        >
          Back to Leads
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'warning.main',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              {lead.firstName[0]}{lead.lastName[0]}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {lead.firstName} {lead.lastName}
                </Typography>
                <Chip
                  label={lead.rating}
                  size="small"
                  color={getRatingColor(lead.rating)}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Typography variant="body1" color="text.secondary">
                {lead.title} at {lead.company}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip
                  label={lead.status}
                  size="small"
                  color={getStatusColor(lead.status)}
                />
                <Chip
                  icon={<TrendingIcon />}
                  label={`Score: ${lead.score}/100`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button startIcon={<EmailIcon />} variant="outlined">
              Send Email
            </Button>
            <Button startIcon={<EditIcon />} variant="contained">
              Edit
            </Button>
            <Button variant="contained" color="success">
              Convert
            </Button>
            <IconButton>
              <MoreIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Lead Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Lead Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <EmailIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2">{lead.email}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <PhoneIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body2">{lead.phone}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <PhoneIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Mobile
                  </Typography>
                  <Typography variant="body2">{lead.mobile}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <BusinessIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Company
                  </Typography>
                  <Typography variant="body2">{lead.company}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <LocationIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body2">{lead.address}</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Lead Score
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Engagement Score
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {lead.score}/100
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={lead.score}
                sx={{ height: 8, borderRadius: 4 }}
                color={lead.score >= 80 ? 'success' : lead.score >= 50 ? 'primary' : 'warning'}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mt: 2 }}>
              <MoneyIcon sx={{ color: 'text.secondary', mt: 0.5 }} fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Estimated Value
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                  ${lead.estimatedValue.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: '12px' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Additional Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Industry
                </Typography>
                <Typography variant="body2">{lead.industry}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Lead Source
                </Typography>
                <Typography variant="body2">{lead.leadSource}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Lead Owner
                </Typography>
                <Typography variant="body2">{lead.owner}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Created Date
                </Typography>
                <Typography variant="body2">{lead.createdDate}</Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Last Modified
                </Typography>
                <Typography variant="body2">{lead.modifiedDate}</Typography>
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
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'grey.50',
              }}
            >
              <Tab label="Timeline" />
              <Tab label="Notes" />
              <Tab label="Documents" />
              <Tab label="Related Records" />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {/* Timeline Tab */}
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Activity Timeline
                  </Typography>
                  <List>
                    {activities.map((activity) => (
                      <ListItem key={activity.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'warning.main' }}>
                            {activity.icon}
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
                      >
                        Add Note
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Notes List */}
                  <List>
                    {notes.map((note) => (
                      <Card key={note.id} sx={{ mb: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {note.author}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {note.date}
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            {note.content}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </List>
                </Box>
              )}

              {/* Documents Tab */}
              {activeTab === 2 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Documents
                    </Typography>
                    <Button startIcon={<AttachFileIcon />} variant="contained">
                      Upload Document
                    </Button>
                  </Box>

                  <List>
                    {documents.map((doc) => (
                      <Card key={doc.id} sx={{ mb: 2 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'warning.main' }}>
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
                            <IconButton>
                              <MoreIcon />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </List>
                </Box>
              )}

              {/* Related Records Tab */}
              {activeTab === 3 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Related Records
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No related records found.
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeadDetailNew;
