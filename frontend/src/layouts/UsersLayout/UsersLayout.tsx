import { ModalUsersListContainer } from '@/containers';
import { SideBarContainer } from '@/containers/SideBarContainer/SideBarContainer';
import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const UsersLayout: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (!decodedToken.is_admin) {
        window.location.href = '/';
      }
    }
  }, []);

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
        <ModalUsersListContainer type={type} />
      </div>
    </div>
  );
};

export { UsersLayout };
