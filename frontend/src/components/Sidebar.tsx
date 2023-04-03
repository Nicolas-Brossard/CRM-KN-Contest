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
        <LogoKN width={'64px'} color="#2F3C4D" />
      </div>
      <Divider />
      <List>
        {['Dashboard', 'Liste Leads', 'Liste Prospects', 'Liste Clients'].map(
          (text, index) => (
            <ListItem
              key={text}
              component={Link}
              to={`/${text.replace(' ', '-').toLowerCase()}`}
            >
              <ListItemText
                primary={text}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  color: '#2F3C4D',
                }}
              />
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
};

export { Sidebar };
