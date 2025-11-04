import { Box } from '@mui/material';

const Logo = ({ size = 40, variant = 'icon' }) => {
  // variant can be 'icon' (S logo) or 'full' (full SAntComm logo)
  const logoSrc = variant === 'full' ? '/assets/full-logo.png' : '/assets/s-logo.png';

  return (
    <Box
      sx={{
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={logoSrc}
        alt="SAntComm Logo"
        style={{
          height: size,
          width: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default Logo;
