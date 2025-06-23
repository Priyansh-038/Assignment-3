import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useTheme } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './theme/theme';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import TablesPage from './pages/TablesPage';
import ChartsPage from './pages/ChartsPage';
import CalendarPage from './pages/CalendarPage';
import KanbanPage from './pages/KanbanPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { currentTheme } = useTheme();
  const muiTheme = currentTheme === 'light' ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/kanban" element={<KanbanPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;