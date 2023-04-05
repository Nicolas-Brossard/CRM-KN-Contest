import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import CountUp from 'react-countup';

interface ConversionRateWidgetProps {
  contacts: any[];
}

const ConversionRateWidget: React.FC<ConversionRateWidgetProps> = ({
  contacts,
}) => {
  const totalContacts = contacts.length;
  const totalClients = contacts.filter(
    (contact) => contact.type === 'Clients'
  ).length;
  const conversionRate = (totalClients / totalContacts) * 100;

  return (
    <div style={{ backgroundColor: '#2f3c4c', borderRadius: 5 }}>
      <div>
        <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
          Taux de conversion
        </Typography>
      </div>
      <Grid item xs={12} md={6} style={{ backgroundColor: '#fff' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={150}
        >
          <Typography variant="h2" sx={{ color: '#2f3c4c' }}>
            <CountUp start={0} end={conversionRate} decimals={2} duration={1} />
            %
          </Typography>
        </Box>
      </Grid>
    </div>
  );
};

export { ConversionRateWidget };
