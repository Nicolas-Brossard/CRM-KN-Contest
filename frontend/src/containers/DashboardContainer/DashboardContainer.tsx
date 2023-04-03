import { Sidebar, ContactTypePieChart } from '@/components';
import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import jwt_decode from 'jwt-decode';

interface Contact {
  id: number;
  type: string;
}
const DashboardContainer: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showWidgets, setShowWidgets] = useState(true);

  const handleToggleWidgets = () => {
    setShowWidgets(!showWidgets);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    let userId: string | null = null;
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.id;
    }

    const fetchContacts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/contact?userId=${userId}`
      );
      const data = await response.json();
      console.log(data);

      setContacts(data);
    };

    fetchContacts();
  }, []);

  const contactTypeData = ['Clients', 'Leads', 'Prospects'].map((type) => ({
    name: type,
    type,
    value: contacts.filter((contact) => contact.type === type).length,
  }));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ flex: showWidgets ? 1 : 0 }}>
        {showWidgets && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2>Vos indicateurs</h2>
              <IconButton
                onClick={handleToggleWidgets}
                sx={{
                  '&:hover': {
                    outline: 'transparent',
                    backgroundColor: 'transparent',
                  },
                  '&:focus': {
                    outline: 'transparent',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <ArrowDropDownIcon fontSize="large" sx={{ color: '#fff' }} />
              </IconButton>
            </div>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Card sx={{ s: 1, minWidth: 300, maxWidth: '100%', padding: 0 }}>
                <CardContent sx={{ marginBottom: 0, padding: 0 }}>
                  <ContactTypePieChart data={contactTypeData} />
                </CardContent>
              </Card>
              <Card sx={{ m: 1, minWidth: 200, padding: 0 }}>
                <CardContent sx={{ margin: 0, padding: 0, paddingBottom: 0 }}>
                  <Typography sx={{ margin: 0 }}>Widget 2</Typography>
                </CardContent>
              </Card>
            </Box>
          </>
        )}
      </div>
      {!showWidgets && (
        <Box display="flex" justifyContent="center" pb={1}>
          <h2>Vos indicateurs</h2>
          <IconButton
            onClick={handleToggleWidgets}
            sx={{
              '&:hover': {
                outline: 'transparent',
                backgroundColor: 'transparent',
              },
              '&:focus': {
                outline: 'transparent',
                backgroundColor: 'transparent',
              },
            }}
          >
            <ArrowDropUpIcon fontSize="large" sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flex: 1,
        }}
      >
        <h2>Dashboard</h2>
      </div>
    </div>
  );
};

export { DashboardContainer };
