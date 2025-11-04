import { Box, Typography, Paper } from '@mui/material';
import { EventOutlined as CalendarIcon } from '@mui/icons-material';

const Calendar = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Calendar
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your meetings, tasks, and events
        </Typography>
      </Box>

      <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
        <CalendarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Calendar Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Schedule and manage your appointments, meetings, and tasks
        </Typography>
      </Paper>
    </Box>
  );
};

export default Calendar;
