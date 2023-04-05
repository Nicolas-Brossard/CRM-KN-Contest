import { ModalUsersList } from '@/components';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

interface ModalListContainerProps {
  type: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  is_admin: boolean;
}

const ModalUsersListContainer: React.FC<ModalListContainerProps> = ({
  type,
}) => {
  const [data, setData] = useState<User[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let userId: string | null = null;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.id;
    }

    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/users`);
      const users: User[] = await response.json();
      setData(users);
    };

    fetchData();
  }, [refreshKey]);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <h1 style={{ color: '#2f3c4d', fontSize: '2.2em' }}>
        Liste des Utilisateurs
      </h1>
      <ModalUsersList data={data} type={type} refresh={refresh} />
    </div>
  );
};

export { ModalUsersListContainer };
