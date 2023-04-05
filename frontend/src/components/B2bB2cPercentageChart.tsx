import React from 'react';
import { Typography, Grid, Box } from '@mui/material';

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
interface B2bB2cPercentageChartProps {
  contacts: Contact[];
}

const B2bB2cPercentageChart: React.FC<B2bB2cPercentageChartProps> = ({
  contacts,
}) => {
  console.log(contacts);

  const b2bContacts = contacts.filter(
    (contact) => contact.company !== null && contact.company !== ''
  );
  const b2cContacts = contacts.filter(
    (contact) => contact.company === null || contact.company === ''
  );

  const b2bPercentage = (b2bContacts.length / contacts.length) * 100;
  const b2cPercentage = (b2cContacts.length / contacts.length) * 100;

  return (
    <div
      style={{ backgroundColor: '#2f3c4c', borderRadius: 5, height: '184px' }}
    >
      <div>
        <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
          B2B vs B2C
        </Typography>
      </div>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: '#fff',
          height: '85%',
          minHeight: '85%',
          maxHeight: '85%',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          sx={{ height: '100%', minHeight: '100%', maxHeight: '100%' }}
        >
          <Box textAlign="center">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {b2bPercentage.toFixed(0)}%
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>B2B</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {b2cPercentage.toFixed(0)}%
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>B2C</Typography>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export { B2bB2cPercentageChart };
