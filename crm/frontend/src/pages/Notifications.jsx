import { Box, Typography, Paper } from '@mui/material';
import { NotificationsOutlined as NotificationIcon } from '@mui/icons-material';

const Notifications = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Notifications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay updated with important alerts and activities
        </Typography>
      </Box>

      <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
        <NotificationIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          No Notifications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You're all caught up! No new notifications at this time.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Notifications;
