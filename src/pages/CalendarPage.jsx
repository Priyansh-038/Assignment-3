import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EventCalendar from '../components/Calendar/EventCalendar';
import { mockCalendarEvents } from '../utils/data';
import { useTheme } from '@mui/material/styles';
import { format, parseISO } from 'date-fns';

function CalendarPage() {
  const muiTheme = useTheme();
  const [events, setEvents] = useState(() => {
    try {
      const storedEvents = localStorage.getItem('calendarEvents');
      return storedEvents ? JSON.parse(storedEvents).map(event => ({
        ...event,
        start: parseISO(event.start),
        end: parseISO(event.end)
      })) : mockCalendarEvents;
    } catch (error) {
      console.error("Failed to load events from localStorage:", error);
      return mockCalendarEvents;
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  useEffect(() => {
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(events.map(event => ({
        ...event,
        start: event.start.toISOString(),
        end: event.end.toISOString()
      }))));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }, [events]);

  const handleAddEventClick = () => {
    setNewEvent({ title: '', start: format(new Date(), 'yyyy-MM-dd HH:mm'), end: format(new Date(), 'yyyy-MM-dd HH:mm') });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSaveEvent = () => {
    const { title, start, end } = newEvent;
    if (title && start && end) {
      setEvents([
        ...events,
        {
          title,
          start: parseISO(start),
          end: parseISO(end),
        },
      ]);
      handleDialogClose();
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        Company Calendar
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddEventClick} sx={{ mb: 2 }}>
        Add New Event
      </Button>
      <EventCalendar events={events} />

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Event Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newEvent.title}
            onChange={handleEventChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="start"
            label="Start Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newEvent.start}
            onChange={handleEventChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="end"
            label="End Time"
            type="datetime-local"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={newEvent.end}
            onChange={handleEventChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEvent}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CalendarPage;