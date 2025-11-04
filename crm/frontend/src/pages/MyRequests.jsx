import { Box, Typography, Paper, Grid, Card, CardContent, Chip, IconButton } from '@mui/material';
import { AssignmentOutlined as RequestIcon, MoreVertOutlined as MoreIcon } from '@mui/icons-material';

const MyRequests = () => {
  const sampleRequests = [
    {
      id: 1,
      title: 'Data Export Request',
      status: 'Pending',
      type: 'Export',
      date: '2025-01-15',
      priority: 'Medium'
    },
    {
      id: 2,
      title: 'Account Access Request',
      status: 'Approved',
      type: 'Access',
      date: '2025-01-10',
      priority: 'High'
    },
    {
      id: 3,
      title: 'Feature Request',
      status: 'In Review',
      type: 'Feature',
      date: '2025-01-08',
      priority: 'Low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'In Review':
        return 'info';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          My Requests
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage your support and feature requests
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sampleRequests.map((request) => (
          <Grid item xs={12} key={request.id}>
            <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {request.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip
                        label={request.status}
                        size="small"
                        color={getStatusColor(request.status)}
                      />
                      <Chip
                        label={request.type}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={request.priority}
                        size="small"
                        color={getPriorityColor(request.priority)}
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Submitted on {new Date(request.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <RequestIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              No Additional Requests
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You can submit new requests from the support section
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyRequests;
