import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import LineChart from '../components/Charts/LineChart';
import BarChart from '../components/Charts/BarChart';
import PieChart from '../components/Charts/PieChart';
import { mockChartData } from '../utils/data';
import { useTheme } from '@mui/material/styles';

function ChartsPage() {
  const muiTheme = useTheme();
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        Analytics Charts
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <LineChart data={mockChartData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChart data={mockChartData} />
        </Grid>
        <Grid item xs={12}>
          <PieChart />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChartsPage;