import { ModalList } from '@/components';
import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/contact');
      const contacts: Contact[] = await response.json();
      setData(contacts.filter((contact) => contact.type === type));
    };

    fetchData();
  }, []);

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
      <h1>{`Liste ${type}`}</h1>
      <ModalList data={data} type={type} />
    </div>
  );
};

export { ModalListContainer };
