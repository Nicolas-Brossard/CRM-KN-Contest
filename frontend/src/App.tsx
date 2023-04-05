import React, { useEffect } from 'react';
import {
  LoginLayout,
  DashboardLayout,
  AuthenticatedLayout,
  LeadsLayout,
  ProspectLayout,
  CustomersLayout,
} from '@/layouts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { UsersLayout } from './layouts/UsersLayout/UsersLayout';

const App: React.FC = () => {
  const title = 'CRM - NK';

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
          <Route
            path="/dashboard"
            element={<AuthenticatedLayout component={DashboardLayout} />}
          />
          <Route
            path="/liste-leads"
            element={<AuthenticatedLayout component={LeadsLayout} />}
          />
          <Route
            path="/liste-prospects"
            element={<AuthenticatedLayout component={ProspectLayout} />}
          />
          <Route
            path="/liste-clients"
            element={<AuthenticatedLayout component={CustomersLayout} />}
          />
          <Route
            path="/gestion-utilisateurs"
            element={<AuthenticatedLayout component={UsersLayout} />}
          />
        </Routes>
      </SnackbarProvider>
    </Router>
  );
};

export default App;
