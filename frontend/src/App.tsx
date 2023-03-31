import React, { useEffect } from 'react';
import { LoginLayout, DashboardLayout } from '@/layouts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {
  const title = 'CRM - NK'; // votre titre

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Router>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Routes>
          <Route path="/" element={<LoginLayout />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/liste-leads" element={<DashboardLayout />} />
          <Route path="/liste-prospects" element={<DashboardLayout />} />
          <Route path="/liste-clients" element={<DashboardLayout />} />
        </Routes>
      </SnackbarProvider>
    </Router>
  );
};

export default App;
