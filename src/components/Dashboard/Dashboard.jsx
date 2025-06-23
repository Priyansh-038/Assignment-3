import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Dashboard() {
  const muiTheme = useTheme();

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: muiTheme.palette.background.paper }}>
            <Typography variant="h6" sx={{ color: muiTheme.palette.primary.main }}>Total Users</Typography>
            <Typography variant="h4">12,500</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: muiTheme.palette.background.paper }}>
            <Typography variant="h6" sx={{ color: muiTheme.palette.secondary.main }}>Total Sales</Typography>
            <Typography variant="h4">₹5,00,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: muiTheme.palette.background.paper }}>
            <Typography variant="h6" sx={{ color: muiTheme.palette.info.main }}>New Orders</Typography>
            <Typography variant="h4">850</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: muiTheme.palette.success.main, color: muiTheme.palette.success.contrastText }}>
            <Typography variant="h6">Net Revenue</Typography>
            <Typography variant="h4">₹12,00,000</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
          Quick Insights
        </Typography>
        <Paper sx={{ p: 3, backgroundColor: muiTheme.palette.background.paper }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Hello! Welcome to your personalized admin dashboard.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Effortlessly monitor key metrics, manage data, and organize tasks. Use the navigation sidebar to explore tables, charts, calendar, and the Kanban board.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;