import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function CustomBarChart({ data }) {
  const muiTheme = useTheme();

  return (
    <Paper elevation={3} sx={{ p: 2, backgroundColor: muiTheme.palette.background.paper }}>
      <Typography variant="h6" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        User Acquisition & Growth
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
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
            contentStyle={{
              backgroundColor: muiTheme.palette.background.paper,
              border: `1px solid ${muiTheme.palette.divider}`,
              color: muiTheme.palette.text.primary,
            }}
          />
          <Legend />
          <Bar dataKey="users" fill={muiTheme.palette.primary.main} name="Users" />
          <Bar dataKey="orders" fill={muiTheme.palette.secondary.main} name="Orders" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default CustomBarChart;