import React from 'react';
import { Link } from 'react-router-dom';
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import { useTheme } from '@mui/material/styles';

function Sidebar() {
  const muiTheme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Tables', icon: <TableChartIcon />, path: '/tables' },
    { text: 'Charts', icon: <BarChartIcon />, path: '/charts' },
    { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'Kanban Board', icon: <ViewKanbanIcon />, path: '/kanban' },
  ];

  return (
    <Box sx={{
        backgroundColor: muiTheme.palette.background.paper,
        color: muiTheme.palette.text.primary,
        height: '100%',
      }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: muiTheme.palette.primary.main }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}
              sx={{
                color: muiTheme.palette.text.primary,
                '&.Mui-selected': {
                  backgroundColor: muiTheme.palette.primary.light,
                  color: muiTheme.palette.primary.contrastText,
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;