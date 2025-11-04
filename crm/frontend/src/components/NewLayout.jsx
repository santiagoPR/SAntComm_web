import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, IconButton, AppBar, Toolbar, useTheme as useMuiTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import ProfileMenu from './ProfileMenu';
import GlobalSearch from './GlobalSearch';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

const PRIMARY_SIDEBAR_WIDTH = 70;
const SECONDARY_SIDEBAR_WIDTH = 240;

const NewLayout = () => {
  const { secondarySidebarOpen } = useNavigation();
  const { isDark } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mainLeftMargin = isMobile ? 0 : PRIMARY_SIDEBAR_WIDTH + (secondarySidebarOpen ? SECONDARY_SIDEBAR_WIDTH : 0);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Mobile Top Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
            zIndex: 1201
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56 }, px: 2 }}>
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'primary.main' }}>
              SAntComm CRM
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop Sidebars */}
      {!isMobile && (
        <>
          <PrimarySidebar
            onProfileClick={(event) => setProfileMenuAnchor(event.currentTarget)}
            onSearchClick={() => setSearchOpen(true)}
          />
          <SecondarySidebar />
        </>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              bgcolor: 'background.paper'
            }
          }}
        >
          <Box sx={{ display: 'flex', height: '100%' }}>
            <PrimarySidebar
              onProfileClick={(event) => {
                setProfileMenuAnchor(event.currentTarget);
                setMobileMenuOpen(false);
              }}
              onSearchClick={() => {
                setSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              isMobile={true}
            />
            <SecondarySidebar isMobile={true} onItemClick={() => setMobileMenuOpen(false)} />
          </Box>
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          ml: `${mainLeftMargin}px`,
          mt: isMobile ? '56px' : 0,
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease',
          width: `calc(100% - ${mainLeftMargin}px)`,
        }}
      >
        <Outlet />
      </Box>

      {/* Profile Menu */}
      <ProfileMenu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={() => setProfileMenuAnchor(null)}
      />

      {/* Global Search Dialog */}
      <GlobalSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </Box>
  );
};

export default NewLayout;
