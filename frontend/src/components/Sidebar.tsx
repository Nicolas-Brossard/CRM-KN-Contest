// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
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
        {/* Insérez votre logo ici */}
        {/* <img src="path/to/your/logo.svg" alt="Logo" /> */}
      </div>
      <Typography variant="h6" align="center">
        KN-CRM
      </Typography>
      <Divider />
      <List>
        {['Link 1', 'Link 2', 'Link 3'].map((text, index) => (
          <ListItem
            key={text}
            component={Link}
            to={`/${text.replace(' ', '-').toLowerCase()}`}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export { Sidebar };
