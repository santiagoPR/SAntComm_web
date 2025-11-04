import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';

const ModuleFolder = ({ folder, onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { expandedFolders, toggleFolder } = useNavigation();
  const { isDark } = useTheme();

  const isExpanded = expandedFolders.includes(folder.id);

  const handleToggle = () => {
    toggleFolder(folder.id);
  };

  const handleModuleClick = (path) => {
    navigate(path);
    if (onItemClick) {
      onItemClick();
    }
  };

  const handleMoreClick = (e, module) => {
    e.stopPropagation();
    console.log('Module actions for:', module.name);
  };

  return (
    <Box>
      {/* Folder Header */}
      <ListItemButton
        onClick={handleToggle}
        sx={{
          borderRadius: '8px',
          mb: 0.5,
          py: 1,
          px: 1.5,
          '&:hover': {
            bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
          {isExpanded ? (
            <ExpandMoreIcon fontSize="small" />
          ) : (
            <ChevronRightIcon fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText
          primary={folder.name}
          primaryTypographyProps={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        />
      </ListItemButton>

      {/* Folder Modules */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List disablePadding sx={{ pl: 1 }}>
          {folder.modules.map((module) => {
            const isActive = location.pathname === module.path;

            return (
              <ListItemButton
                key={module.id}
                onClick={() => handleModuleClick(module.path)}
                sx={{
                  borderRadius: '8px',
                  mb: 0.5,
                  py: 1,
                  px: 1.5,
                  bgcolor: isActive
                    ? isDark
                      ? 'rgba(37, 99, 235, 0.15)'
                      : 'rgba(37, 99, 235, 0.08)'
                    : 'transparent',
                  '&:hover': {
                    bgcolor: isActive
                      ? isDark
                        ? 'rgba(37, 99, 235, 0.2)'
                        : 'rgba(37, 99, 235, 0.12)'
                      : isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {module.icon}
                </ListItemIcon>
                <ListItemText
                  primary={module.name}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'primary.main' : 'text.primary',
                  }}
                />
                {module.count !== undefined && (
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: isActive
                        ? 'primary.main'
                        : isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.06)',
                      color: isActive ? 'primary.contrastText' : 'text.secondary',
                      px: 1,
                      py: 0.25,
                      borderRadius: '10px',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      minWidth: 20,
                      textAlign: 'center',
                    }}
                  >
                    {module.count}
                  </Typography>
                )}
                <IconButton
                  size="small"
                  onClick={(e) => handleMoreClick(e, module)}
                  sx={{
                    ml: 0.5,
                    opacity: 0,
                    '.MuiListItemButton-root:hover &': {
                      opacity: 1,
                    },
                    '&:hover': {
                      bgcolor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  <MoreIcon fontSize="small" />
                </IconButton>
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
};

export default ModuleFolder;
