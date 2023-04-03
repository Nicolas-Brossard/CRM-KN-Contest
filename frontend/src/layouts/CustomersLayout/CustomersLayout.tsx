import { ModalListContainer } from '@/containers';
import { SideBarContainer } from '@/containers/SideBarContainer/SideBarContainer';
import React from 'react';

const CustomersLayout: React.FC = () => {
  const type = 'Clients';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh',
      }}
    >
      <SideBarContainer />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
        }}
      >
        <ModalListContainer type={type} />
      </div>
    </div>
  );
};

export { CustomersLayout };
