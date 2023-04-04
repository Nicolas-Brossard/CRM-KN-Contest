import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography, Grid } from '@mui/material';

interface ContactTypeData {
  type: string;
  value: number;
}

interface ContactTypePieChartProps {
  data: ContactTypeData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const ContactTypePieChart: React.FC<ContactTypePieChartProps> = ({ data }) => {
  return (
    <div style={{ backgroundColor: '#2f3c4c', borderRadius: 5 }}>
      <div>
        <Typography variant="h6" align="center" sx={{ color: '#fff' }}>
          Répartition des clients
        </Typography>
      </div>
      <Grid item xs={12} md={6} style={{ backgroundColor: '#fff' }}>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={48}
              innerRadius={24}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              wrapperStyle={{ lineHeight: '24px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Grid>
    </div>
  );
};

export { ContactTypePieChart };
