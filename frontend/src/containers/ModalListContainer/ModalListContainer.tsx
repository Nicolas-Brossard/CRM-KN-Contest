import { ModalList } from '@/components';
import React from 'react';

const ModalListContainer: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <h1>Liste</h1>
      <ModalList />
    </div>
  );
};

export { ModalListContainer };
