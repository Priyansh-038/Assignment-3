import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function NotFoundPage() {
  const muiTheme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: muiTheme.palette.text.primary,
      }}
    >
      <Typography variant="h1" component="h2" gutterBottom sx={{ color: muiTheme.palette.error.main }}>
        404
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
}

export default NotFoundPage;