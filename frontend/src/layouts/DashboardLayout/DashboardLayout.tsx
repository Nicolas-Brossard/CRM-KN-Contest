import { Sidebar } from '@/components';
import React from 'react';

const DashboardLayout: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh',
      }}
    >
      <Sidebar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
        }}
      >
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export { DashboardLayout };
