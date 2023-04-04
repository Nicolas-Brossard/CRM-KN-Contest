import React from 'react';
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

const Sidebar: React.FC = () => {
  const menuItems = [
    { text: 'Votre Dashboard', icon: <DashboardIcon /> },
    { text: 'Liste des leads', icon: <LeadsIcon /> },
    { text: 'Liste des prospects', icon: <ProspectsIcon /> },
    { text: 'Liste des clients', icon: <ClientsIcon /> },
  ];

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
        <Divider />
      </List>
    </Drawer>
  );
};

export { Sidebar };
