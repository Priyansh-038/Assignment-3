import React from 'react';
import { Box, Typography } from '@mui/material';
import DataTable from '../components/Tables/DataTable';
import { mockTableData } from '../utils/data';
import { useTheme } from '@mui/material/styles';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First Name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  { field: 'status', headerName: 'Status', width: 120, editable: true },
];

function TablesPage() {
  const muiTheme = useTheme();
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: muiTheme.palette.text.primary }}>
        User Tables
      </Typography>
      <DataTable rows={mockTableData} columns={columns} />
    </Box>
  );
}

export default TablesPage;