import { Sidebar } from '@/components';
import { DashboardContainer } from '@/containers';
import React from 'react';

const DashboardLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 'auto' }}>
      <Sidebar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
        }}
      >
        <DashboardContainer />
      </div>
    </div>
  );
};

export { DashboardLayout };
