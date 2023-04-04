import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';

interface CardProps {
  id: string;
  title: string;
  email: string;
  phone: string | null;
}

const Card: React.FC<CardProps> = ({ id, title, email, phone }) => {
  return (
    <MuiCard
      sx={{
        marginBottom: '10px',
        borderRadius: '5px',
        cursor: 'move',
        color: 'black',
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
          <Email fontSize="small" style={{ marginRight: 4 }} />
          <Typography variant="body2">{email}</Typography>
        </div>
        {phone && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
            <Phone fontSize="small" style={{ marginRight: 4 }} />
            <Typography variant="body2">{phone}</Typography>
          </div>
        )}
      </CardContent>
    </MuiCard>
  );
};

export { Card };
