import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Typography, Grid } from '@mui/material';

interface AcquisitionData {
  source: string;
  customers: number;
}

interface CustomerAcquisitionBarChartProps {
  data: AcquisitionData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomerAcquisitionBarChart: React.FC<
  CustomerAcquisitionBarChartProps
> = ({ data }) => {
  return (
    <div style={{ backgroundColor: '#2f3c4c', borderRadius: 5 }}>
      <div>
        <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
          Acquisition Client
        </Typography>
      </div>
      <Grid
        item
        xs={12}
        md={6}
        style={{ backgroundColor: '#fff', padding: '5px' }}
      >
        <ResponsiveContainer width="100%" height={145}>
          <BarChart data={data}>
            <XAxis dataKey="source" hide={true} />
            <Tooltip />
            <Bar dataKey="customers" fill="#2f3c4c">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </div>
  );
};

export { CustomerAcquisitionBarChart };
