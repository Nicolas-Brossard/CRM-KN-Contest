import { Sidebar } from '@/components';
import { DashboardContainer } from '@/containers';
import React from 'react';

const DashboardLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: 'auto' }}>
      <Sidebar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* <h1 style={{ fontSize: '2.2em', color: '#2f3c4d' }}>Votre Dashboard</h1> */}
        <DashboardContainer />
      </div>
    </div>
  );
};

export { DashboardLayout };
