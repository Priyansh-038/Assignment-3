import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const data = [
  { name: 'North India', value: 400 },
  { name: 'South India', value: 300 },
  { name: 'East India', value: 300 },
  { name: 'West India', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function CustomPieChart() {
  const muiTheme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 2, backgroundColor: muiTheme.palette.background.paper }}>
      <Typography variant="h6" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        Regional Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: muiTheme.palette.background.paper,
              border: `1px solid ${muiTheme.palette.divider}`,
              color: muiTheme.palette.text.primary,
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default CustomPieChart;