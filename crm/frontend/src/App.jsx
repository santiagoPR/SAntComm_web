import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider } from './context/NavigationContext';
import ProtectedRoute from './components/ProtectedRoute';
import NewLayout from './components/NewLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Contacts from './pages/Contacts';
import ContactDetail from './pages/ContactDetail';
import Companies from './pages/Companies';
import Deals from './pages/Deals';
import Quotes from './pages/Quotes';
import Invoices from './pages/Invoices';
import Forecasts from './pages/Forecasts';
import Accounts from './pages/Accounts';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Analytics from './pages/Analytics';
import LeadAnalytics from './pages/analytics/LeadAnalytics';
import SalesReports from './pages/reports/SalesReports';
import LeadReports from './pages/reports/LeadReports';
import CampaignReports from './pages/reports/CampaignReports';
import Marketplace from './pages/Marketplace';
import MyRequests from './pages/MyRequests';
import Calendar from './pages/Calendar';
import Mail from './pages/Mail';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { muiTheme } = useTheme();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <NewLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="leads/:id" element={<LeadDetail />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="contacts/:id" element={<ContactDetail />} />
            <Route path="companies" element={<Companies />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="deals" element={<Deals />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="forecasts" element={<Forecasts />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="campaigns/:id" element={<CampaignDetail />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="analytics/leads" element={<LeadAnalytics />} />
            <Route path="reports/sales" element={<SalesReports />} />
            <Route path="reports/leads" element={<LeadReports />} />
            <Route path="reports/campaigns" element={<CampaignReports />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="requests" element={<MyRequests />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="mail" element={<Mail />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
