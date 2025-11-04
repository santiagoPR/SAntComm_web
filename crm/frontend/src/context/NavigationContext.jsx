import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(null);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

// Primary sidebar tabs
export const PRIMARY_TABS = {
  MODULES: 'modules',
  REPORTS: 'reports',
  ANALYTICS: 'analytics',
  REQUESTS: 'requests',
  MARKETPLACE: 'marketplace'
};

export const NavigationProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(PRIMARY_TABS.MODULES);
  const [secondarySidebarOpen, setSecondarySidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState(['pipeline', 'customers', 'marketing']);

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const toggleSecondarySidebar = () => {
    setSecondarySidebarOpen(prev => !prev);
  };

  const value = {
    activeTab,
    setActiveTab,
    secondarySidebarOpen,
    setSecondarySidebarOpen,
    toggleSecondarySidebar,
    mobileOpen,
    setMobileOpen,
    expandedFolders,
    toggleFolder,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};
