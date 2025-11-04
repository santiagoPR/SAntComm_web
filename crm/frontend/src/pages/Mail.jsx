import { Box, Typography, Paper } from '@mui/material';
import { MailOutlined as MailIcon } from '@mui/icons-material';

const Mail = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Mail
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your email communications
        </Typography>
      </Box>

      <Paper sx={{ p: 4, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
        <MailIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Mail Integration Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Send and receive emails directly from your CRM
        </Typography>
      </Paper>
    </Box>
  );
};

export default Mail;
