import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LogoKN } from '@/components/LogoKN';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LeadsIcon from '@mui/icons-material/Assignment';
import ProspectsIcon from '@mui/icons-material/People';
import ClientsIcon from '@mui/icons-material/AccountBox';
import GetAppIcon from '@mui/icons-material/GetApp';
import jwt_decode from 'jwt-decode';
interface Contact {
  updatedAt: any;
  id: number;
  type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  location: string | null;
  status: string;
  column: string;
  position: number;
}
const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken: any = jwt_decode(token);
    return decodedToken.is_admin;
  } catch (error) {
    return false;
  }
};

const Sidebar: React.FC = () => {
  const menuItems = [
    { text: 'Votre Dashboard', icon: <DashboardIcon /> },
    { text: 'Liste des leads', icon: <LeadsIcon /> },
    { text: 'Liste des prospects', icon: <ProspectsIcon /> },
    { text: 'Liste des clients', icon: <ClientsIcon /> },
  ];
  const fetchUserContacts = async () => {
    const token = localStorage.getItem('token');
    let userId: string | null = null;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.id;
    }

    const response = await fetch(
      `http://localhost:3000/api/contact?userId=${userId}`
    );
    const data = await response.json();
    return data;
  };

  const exportContactsToCSV = useCallback(async () => {
    const contacts: Contact[] = await fetchUserContacts();
    const headers = [
      'id',
      'type',
      'first_name',
      'last_name',
      'email',
      'phone',
      'company',
      'location',
      'status',
      'column',
      'position',
      'updatedAt',
    ];

    const csvContent =
      headers.join(',') +
      '\n' +
      contacts
        .map((contact) =>
          headers
            .map((header) => JSON.stringify((contact as any)[header]))
            .join(',')
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contacts.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxShadow: '1px 0px 10px rgba(0, 0, 0, 0.2)',
          boxSizing: 'border-box',
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
        }}
      >
        <LogoKN width={'128px'} color="#2F3C4D" />
      </div>
      <Divider />
      <List>
        {menuItems.map(({ text, icon }, index) => (
          <ListItem
            key={text}
            component={Link}
            to={`/${text
              .replace('Votre', '')
              .replace('des', '')
              .split(' ')
              .filter((word) => word !== '')
              .join('-')
              .toLowerCase()}`}
          >
            <ListItemIcon
              sx={{
                minWidth: '35px',
                marginLeft: '5px',
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              style={{
                color: '#2F3C4D',
                font: 'open-san',
                fontWeight: 'lighter',
              }}
            />
          </ListItem>
        ))}
        <ListItem button onClick={exportContactsToCSV}>
          <ListItemIcon
            sx={{
              minWidth: '35px',
              marginLeft: '5px',
            }}
          >
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="Exporter en CSV"
            style={{
              color: '#2F3C4D',
              font: 'open-san',
              fontWeight: 'lighter',
            }}
          />
        </ListItem>
        <Divider />
        {isAdmin() && (
          <>
            <List>
              <ListItem>
                <ListItemText
                  primary="Administration"
                  style={{
                    color: '#2F3C4D',
                    font: 'open-san',
                    fontWeight: 'lighter',
                    textAlign: 'center',
                  }}
                />
              </ListItem>
              <Divider />
              <ListItem component={Link} to="/gestion-utilisateurs">
                <LeadsIcon
                  style={{
                    color: '#757575',
                  }}
                />
                <ListItemText
                  primary="Gestion Utilisateurs"
                  style={{
                    color: '#757575',
                    font: 'open-san',
                    fontWeight: 'lighter',
                    marginLeft: '15px',
                  }}
                />
              </ListItem>
            </List>
          </>
        )}
      </List>
    </Drawer>
  );
};

export { Sidebar };
