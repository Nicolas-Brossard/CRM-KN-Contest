import React, { useState, useEffect } from 'react';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Email,
  Phone,
  Business,
  Warning,
  Add,
  PendingActions,
} from '@mui/icons-material';
import { differenceInDays, parseISO } from 'date-fns';
import { ActionModal } from './ActionModal';
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
interface CardProps {
  id: string;
  title: string;
  email: string;
  phone: string | null;
  company: string | null;
  updatedAt: string;
  contactId: number;
}

interface Action {
  id: number;
  type: string;
  description: string;
  date: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  email,
  phone,
  company,
  updatedAt,
  contactId,
}) => {
  const [showIcons, setShowIcons] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setShowIcons(true);
  };

  const handleMouseLeave = () => {
    setShowIcons(false);
  };

  const handleActionModalClose = () => {
    setIsActionModalOpen(false);
  };

  const handleActionIconClick = async () => {
    setIsActionModalOpen(true);
  };

  const updatedAtDate = parseISO(updatedAt);
  const currentDate = new Date();
  const daysDifference = differenceInDays(currentDate, updatedAtDate);

  const showSkullIcon = daysDifference > 1;

  return (
    <MuiCard
      sx={{
        marginBottom: '10px',
        borderRadius: '5px',
        cursor: 'move',
        color: 'black',
        position: 'relative',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent sx={{ color: '#222935' }}>
        <Typography variant="h6">{title}</Typography>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
          <Email fontSize="small" style={{ marginRight: 4 }} />
          <Typography variant="body2" style={{ marginLeft: 4 }}>
            {email}
          </Typography>
        </div>
        {phone && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
            <Phone fontSize="small" style={{ marginRight: 4 }} />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              {phone}
            </Typography>
          </div>
        )}
        {company && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
            <Business fontSize="small" style={{ marginRight: 4 }} />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              {company}
            </Typography>
          </div>
        )}
        {showSkullIcon && (
          <div style={{ display: 'flex', alignItems: 'right', marginTop: 4 }}>
            <Warning fontSize="small" style={{ marginLeft: 4 }} />
            <Typography variant="body2" style={{ marginLeft: 4 }}>
              Attention contact à relancer
            </Typography>
          </div>
        )}
      </CardContent>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          onClick={handleActionIconClick}
          sx={{
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&:active': {
              backgroundColor: 'transparent',
              outline: 'none',
            },
          }}
        >
          <Add fontSize="small" />
        </IconButton>
        <IconButton>
          <PendingActions fontSize="small" />
        </IconButton>
      </div>
      <ActionModal
        contactId={contactId}
        open={isActionModalOpen}
        onClose={handleActionModalClose}
        contactName={title}
      />
    </MuiCard>
  );
};

export { Card };
