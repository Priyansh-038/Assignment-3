import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import KanbanBoard from '../components/Kanban/KanbanBoard';
import { useTheme } from '@mui/material/styles';
import { mockKanbanColumns, mockKanbanTasks } from '../utils/data';

function KanbanPage() {
  const muiTheme = useTheme();
  const [columns, setColumns] = useState(() => {
    try {
      const storedColumns = localStorage.getItem('kanbanColumns');
      return storedColumns ? JSON.parse(storedColumns) : mockKanbanColumns;
    } catch (error) {
      console.error("Failed to load columns from localStorage:", error);
      return mockKanbanColumns;
    }
  });
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem('kanbanTasks');
      return storedTasks ? JSON.parse(storedTasks) : mockKanbanTasks;
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
      return mockKanbanTasks;
    }
  });

  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: '', content: '', columnId: '' });
  const [isEditingTask, setIsEditingTask] = useState(false);

  const [openColumnDialog, setOpenColumnDialog] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('kanbanColumns', JSON.stringify(columns));
      localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save kanban data to localStorage:", error);
    }
  }, [columns, tasks]);

  const handleAddTaskClick = (columnId) => {
    setCurrentTask({ id: `task-${Date.now()}`, content: '', columnId });
    setIsEditingTask(false);
    setOpenTaskDialog(true);
  };

  const handleEditTaskClick = (taskId, columnId) => {
    setCurrentTask({ ...tasks[taskId], columnId });
    setIsEditingTask(true);
    setOpenTaskDialog(true);
  };

  const handleTaskDialogClose = () => {
    setOpenTaskDialog(false);
  };

  const handleTaskChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const handleSaveTask = () => {
    if (currentTask.content) {
      setTasks({ ...tasks, [currentTask.id]: { id: currentTask.id, content: currentTask.content } });
      if (!isEditingTask) {
        setColumns(prevColumns => ({
          ...prevColumns,
          [currentTask.columnId]: {
            ...prevColumns[currentTask.columnId],
            taskIds: [...prevColumns[currentTask.columnId].taskIds, currentTask.id],
          },
        }));
      }
      handleTaskDialogClose();
    }
  };

  const handleDeleteTask = (taskId, columnId) => {
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      delete newTasks[taskId];
      return newTasks;
    });
    setColumns(prevColumns => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        taskIds: prevColumns[columnId].taskIds.filter(id => id !== taskId),
      },
    }));
  };

  const handleAddColumnClick = () => {
    setNewColumnTitle('');
    setIsEditingColumn(false);
    setOpenColumnDialog(true);
  };

  const handleEditColumnClick = (columnId, title) => {
    setNewColumnTitle(title);
    setCurrentColumnId(columnId);
    setIsEditingColumn(true);
    setOpenColumnDialog(true);
  };

  const handleColumnDialogClose = () => {
    setOpenColumnDialog(false);
  };

  const handleSaveColumn = () => {
    if (newColumnTitle) {
      if (isEditingColumn) {
        setColumns(prevColumns => ({
          ...prevColumns,
          [currentColumnId]: { ...prevColumns[currentColumnId], title: newColumnTitle },
        }));
      } else {
        const newColumnId = `column-${Date.now()}`;
        setColumns(prevColumns => ({
          ...prevColumns,
          [newColumnId]: { id: newColumnId, title: newColumnTitle, taskIds: [] },
        }));
      }
      handleColumnDialogClose();
    }
  };

  const handleDeleteColumn = (columnId) => {
    setColumns(prevColumns => {
      const newColumns = { ...prevColumns };
      const taskIdsToDelete = newColumns[columnId].taskIds;
      delete newColumns[columnId];

      setTasks(prevTasks => {
        const remainingTasks = { ...prevTasks };
        taskIdsToDelete.forEach(taskId => delete remainingTasks[taskId]);
        return remainingTasks;
      });

      return newColumns;
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        Task Kanban Board
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddColumnClick} sx={{ mb: 2 }}>
        Add New Column
      </Button>
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        setColumns={setColumns}
        setTasks={setTasks}
        onAddTask={handleAddTaskClick}
        onEditTask={handleEditTaskClick}
        onDeleteTask={handleDeleteTask}
        onEditColumn={handleEditColumnClick}
        onDeleteColumn={handleDeleteColumn}
      />

      <Dialog open={openTaskDialog} onClose={handleTaskDialogClose}>
        <DialogTitle>{isEditingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="content"
            label="Task Content"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.content}
            onChange={handleTaskChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTaskDialogClose}>Cancel</Button>
          <Button onClick={handleSaveTask}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openColumnDialog} onClose={handleColumnDialogClose}>
        <DialogTitle>{isEditingColumn ? 'Edit Column' : 'Add New Column'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Column Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleColumnDialogClose}>Cancel</Button>
          <Button onClick={handleSaveColumn}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default KanbanPage;