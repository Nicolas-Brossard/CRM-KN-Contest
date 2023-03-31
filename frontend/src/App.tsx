import React, { useState } from 'react';
import { LoginLayout, DashboardLayout } from '@/layouts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
