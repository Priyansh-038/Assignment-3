import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function EventCalendar({ events }) {
  const muiTheme = useTheme();

  const calendarStyles = {
    height: 500,
    backgroundColor: muiTheme.palette.background.paper,
    borderRadius: muiTheme.shape.borderRadius,
    '& .rbc-toolbar button': {
      backgroundColor: muiTheme.palette.primary.main,
      color: muiTheme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: muiTheme.palette.primary.dark,
      },
    },
    '& .rbc-header': {
      backgroundColor: muiTheme.palette.action.hover,
      color: muiTheme.palette.text.primary,
    },
    '& .rbc-event': {
      backgroundColor: muiTheme.palette.secondary.main,
      color: muiTheme.palette.secondary.contrastText,
    },
    '& .rbc-today': {
      backgroundColor: muiTheme.palette.action.selected,
    },
    '& .rbc-day-bg': {
        '&.rbc-off-range-bg': {
            backgroundColor: muiTheme.palette.action.disabledBackground,
        },
    },
    '& .rbc-month-row': {
        borderColor: muiTheme.palette.divider,
    },
    '& .rbc-time-content > * + * > *': {
        borderColor: muiTheme.palette.divider,
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, backgroundColor: muiTheme.palette.background.paper }}>
      <Typography variant="h6" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        Company Event Calendar
      </Typography>
      <Box sx={calendarStyles}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: '10px' }}
        />
      </Box>
    </Paper>
  );
}

export default EventCalendar;