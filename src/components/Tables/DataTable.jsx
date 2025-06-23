import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function DataTable({ rows, columns }) {
  const muiTheme = useTheme();

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Paper elevation={3} sx={{
        p: 2,
        backgroundColor: muiTheme.palette.background.paper,
        color: muiTheme.palette.text.primary
      }}>
        <Typography variant="h6" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
          User Data Table
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            borderColor: muiTheme.palette.divider,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: muiTheme.palette.action.hover,
              color: muiTheme.palette.text.primary,
            },
            '& .MuiDataGrid-cell': {
              borderColor: muiTheme.palette.divider,
              color: muiTheme.palette.text.secondary,
            },
            '& .MuiTablePagination-root': {
              color: muiTheme.palette.text.secondary,
            },
            '& .MuiSvgIcon-root': {
              color: muiTheme.palette.action.active,
            },
          }}
        />
      </Paper>
    </Box>
  );
}

export default DataTable;