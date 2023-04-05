import { ModalList } from '@/components';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

interface Contact {
  id: number;
  type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  location: string | null;
  status: string;
}
interface ModalListContainerProps {
  type: string;
}

const ModalListContainer: React.FC<ModalListContainerProps> = ({ type }) => {
  const [data, setData] = useState<Contact[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let userId: string | null = null;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.id;
    }

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/contact?userId=${userId}`
      );
      const contacts: Contact[] = await response.json();
      setData(contacts.filter((contact) => contact.type === type));
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
      <h1
        style={{ color: '#2f3c4d', fontSize: '2.2em' }}
      >{`Liste des ${type.toLowerCase()}`}</h1>
      <ModalList data={data} type={type} refresh={refresh} />
    </div>
  );
};

export { ModalListContainer };
