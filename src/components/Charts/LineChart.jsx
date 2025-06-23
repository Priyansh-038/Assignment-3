import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function CustomLineChart({ data }) {
  const muiTheme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 2, backgroundColor: muiTheme.palette.background.paper }}>
      <Typography variant="h6" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        Monthly Sales Trends
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={muiTheme.palette.divider} />
          <XAxis dataKey="name" stroke={muiTheme.palette.text.secondary} />
          <YAxis stroke={muiTheme.palette.text.secondary} />
          <Tooltip
            formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
            contentStyle={{
              backgroundColor: muiTheme.palette.background.paper,
              border: `1px solid ${muiTheme.palette.divider}`,
              color: muiTheme.palette.text.primary,
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke={muiTheme.palette.primary.main} activeDot={{ r: 8 }} name="Revenue (₹)" />
          <Line type="monotone" dataKey="orders" stroke={muiTheme.palette.secondary.main} name="Orders" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default CustomLineChart;