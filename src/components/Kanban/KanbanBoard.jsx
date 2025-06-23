import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Typography, Paper, IconButton, Menu, MenuItem, Button, ListItemIcon } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle, muiTheme) => ({
  userSelect: 'none',
  padding: muiTheme.spacing(2),
  margin: `0 0 ${muiTheme.spacing(1)}px 0`,
  background: isDragging ? muiTheme.palette.primary.light : muiTheme.palette.background.default,
  border: `1px solid ${muiTheme.palette.divider}`,
  borderRadius: muiTheme.shape.borderRadius,
  color: muiTheme.palette.text.primary,
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, muiTheme) => ({
  background: isDraggingOver ? muiTheme.palette.action.hover : muiTheme.palette.background.paper,
  padding: muiTheme.spacing(1),
  minHeight: 200,
  borderRadius: muiTheme.shape.borderRadius,
});

function KanbanBoard({
  columns,
  tasks,
  setColumns,
  setTasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onEditColumn,
  onDeleteColumn,
}) {
  const muiTheme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuColumnId, setMenuColumnId] = React.useState(null);

  const handleMenuClick = (event, columnId) => {
    setAnchorEl(event.currentTarget);
    setMenuColumnId(columnId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuColumnId(null);
  };

  const handleEditColumn = () => {
    handleMenuClose();
    const columnToEdit = columns[menuColumnId];
    if (columnToEdit) {
      onEditColumn(columnToEdit.id, columnToEdit.title);
    }
  };

  const handleDeleteColumn = () => {
    handleMenuClose();
    if (menuColumnId) {
      onDeleteColumn(menuColumnId);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const reorderedTasks = reorder(
        column.taskIds,
        source.index,
        destination.index
      );
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          taskIds: reorderedTasks,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const result = move(
        sourceColumn.taskIds,
        destColumn.taskIds,
        source,
        destination
      );

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          taskIds: result[source.droppableId],
        },
        [destination.droppableId]: {
          ...destColumn,
          taskIds: result[destination.droppableId],
        },
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, backgroundColor: muiTheme.palette.background.paper }}>
      <Typography variant="h6" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        Project Task Board
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', p: 1 }}>
          {Object.values(columns).map((column) => (
            <Droppable droppableId={column.id} key={column.id}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  sx={{
                    ...getListStyle(snapshot.isDraggingOver, muiTheme),
                    flexShrink: 0,
                    width: 300,
                    p: 2,
                    border: `1px solid ${muiTheme.palette.divider}`,
                  }}
                  {...provided.droppableProps}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: muiTheme.palette.primary.main }}>
                      {column.title}
                    </Typography>
                    <IconButton
                      aria-label="column options"
                      aria-controls="column-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleMenuClick(e, column.id)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="column-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuColumnId === column.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleEditColumn}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        Edit Column
                      </MenuItem>
                      <MenuItem onClick={handleDeleteColumn}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        Delete Column
                      </MenuItem>
                    </Menu>
                  </Box>

                  {column.taskIds.map((taskId, index) => {
                    const task = tasks[taskId];
                    if (!task) return null;
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              ...getItemStyle(snapshot.isDragging, provided.draggableProps.style, muiTheme),
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box sx={{ flexGrow: 1 }}>{task.content}</Box>
                            <IconButton size="small" onClick={() => onEditTask(task.id, column.id)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => onDeleteTask(task.id, column.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Paper>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => onAddTask(column.id)}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Add Task
                  </Button>
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Paper>
  );
}

export default KanbanBoard;