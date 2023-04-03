import React from 'react';
import { Link } from 'react-router-dom';
import { LogoKN } from '@/components/LogoKN';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';

const Sidebar: React.FC = () => {
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
        {[
          'Votre Dashboard',
          'Liste des leads',
          'Liste des prospects',
          'Liste des clients',
        ].map((text, index) => (
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
            <ListItemText
              primary={text}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                color: '#2F3C4D',
                font: 'open-san',
                fontWeight: 'lighter',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export { Sidebar };
