import {
  ContactTypePieChart,
  Board,
  TodoListWidget,
  CustomerAcquisitionBarChart,
  B2bB2cPercentageChart,
  ConversionRateWidget,
} from '@/components';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import jwt_decode from 'jwt-decode';

export interface Contact {
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
  updatedAt: string;
}
interface AcquisitionData {
  source: string;
  customers: number;
}

const DashboardContainer: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showWidgets, setShowWidgets] = useState(true);
  const [contactTypeData, setContactTypeData] = useState(
    ['Clients', 'Leads', 'Prospects'].map((type) => ({
      name: type,
      type,
      value: 0,
    }))
  );
  const [customerAcquisitionData, setCustomerAcquisitionData] = useState<
    AcquisitionData[]
  >([
    { source: 'Publicité', customers: 10 },
    { source: 'Référencement', customers: 24 },
    { source: 'Réseaux sociaux', customers: 18 },
    { source: 'Bouche à oreille', customers: 8 },
  ]);

  const handleColumnChange = (contactId: number, newColumn: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId ? { ...contact, column: newColumn } : contact
      )
    );
  };

  const updateContactTypeDataFromContacts = (contacts: Contact[]) => {
    setContactTypeData(
      ['Clients', 'Leads', 'Prospects'].map((type) => ({
        name: type,
        type,
        value: contacts.filter((contact) => contact.type === type).length,
      }))
    );
  };

  const handleContactTypeChange = async (
    contactId: number,
    newType: string
  ) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId ? { ...contact, type: newType } : contact
      )
    );

    setContactTypeData((prevData) =>
      prevData.map((item) => ({
        ...item,
        value:
          item.type === newType
            ? item.value + 1
            : item.value -
              (contacts.find((contact) => contact.id === contactId)?.type ===
              item.type
                ? 1
                : 0),
      }))
    );
  };

  const handleToggleWidgets = () => {
    setShowWidgets(!showWidgets);
  };

  const updateContacts = useCallback(async () => {
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
    console.log(data);

    setContacts(data);
  }, []);

  useEffect(() => {
    updateContacts();
  }, [updateContacts]);

  useEffect(() => {
    updateContactTypeDataFromContacts(contacts);
  }, [contacts]);

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
              <h2 style={{ color: '#2f3c4d' }}>Indicateurs</h2>
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
                <ArrowDropDownIcon fontSize="large" sx={{ color: '#2f3c4d' }} />
              </IconButton>
            </div>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Card
                sx={{
                  s: 1,
                  minWidth: 300,
                  maxWidth: '100%',
                  padding: 0,
                  margin: '0% 0.5% 0% 0.5%',
                }}
              >
                <CardContent
                  sx={{
                    marginBottom: 0,
                    padding: 0,
                    border: '1px solid #fff',
                    borderRadius: 5,
                    '&:last-child': {
                      paddingBottom: 0,
                    },
                  }}
                >
                  <ContactTypePieChart data={contactTypeData} />
                </CardContent>
              </Card>
              <Card
                sx={{
                  s: 1,
                  minWidth: 300,
                  maxWidth: '100%',
                  padding: 0,
                  margin: '0% 0.5% 0% 0.5%',
                }}
              >
                <CardContent
                  sx={{
                    marginBottom: 0,
                    padding: 0,
                    border: '1px solid #fff',
                    borderRadius: 5,
                    '&:last-child': {
                      paddingBottom: 0,
                    },
                  }}
                >
                  <B2bB2cPercentageChart contacts={contacts} />
                </CardContent>
              </Card>
              <Card
                sx={{
                  s: 1,
                  minWidth: 300,
                  maxWidth: '100%',
                  padding: 0,
                  margin: '0% 0.5% 0% 0.5%',
                }}
              >
                <CardContent
                  sx={{
                    marginBottom: 0,
                    padding: 0,
                    border: '1px solid #fff',
                    borderRadius: 5,
                    '&:last-child': {
                      paddingBottom: 0,
                    },
                  }}
                >
                  <CustomerAcquisitionBarChart data={customerAcquisitionData} />
                </CardContent>
              </Card>
              <Card
                sx={{
                  s: 1,
                  minWidth: 300,
                  maxWidth: '100%',
                  padding: 0,
                  margin: '0% 0.5% 0% 0.5%',
                }}
              >
                <CardContent
                  sx={{
                    marginBottom: 0,
                    padding: 0,
                    border: '1px solid #fff',
                    borderRadius: 5,
                    '&:last-child': {
                      paddingBottom: 0,
                    },
                  }}
                >
                  <ConversionRateWidget contacts={contacts} />
                </CardContent>
              </Card>
            </Box>
          </>
        )}
      </div>
      {!showWidgets && (
        <Box display="flex" justifyContent="center" pb={1}>
          <h2 style={{ color: '#2f3c4d' }}>Indicateurs</h2>
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
            <ArrowDropUpIcon fontSize="large" sx={{ color: '#2f3c4d' }} />
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
      ></div>
      <div>
        <h2 style={{ color: '#2f3c4d' }}>Tableau de bord</h2>
        <div style={{ display: 'flex', flexDirection: 'row', margin: '5%' }}>
          <Board
            contacts={contacts}
            onContactTypeChange={handleContactTypeChange}
            onColumnChange={handleColumnChange}
          />
          <TodoListWidget />
        </div>
      </div>
    </div>
  );
};

export { DashboardContainer };
