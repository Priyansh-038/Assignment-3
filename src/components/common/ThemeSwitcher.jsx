import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../../contexts/ThemeContext';
import { useTheme as useMuiTheme } from '@mui/material/styles';

function ThemeSwitcher() {
  const { currentTheme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      <Typography variant="body2" sx={{ mr: 1, color: muiTheme.palette.text.secondary }}>
        {currentTheme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </Typography>
      <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
        {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default ThemeSwitcher;