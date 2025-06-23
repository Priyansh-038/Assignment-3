export const mockTableData = [
  { id: 1, firstName: 'Rohan', lastName: 'Sharma', age: 35, email: 'rohan.s@example.com', status: 'Active' },
  { id: 2, firstName: 'Priya', lastName: 'Singh', age: 28, email: 'priya.s@example.com', status: 'Inactive' },
  { id: 3, firstName: 'Amit', lastName: 'Kumar', age: 42, email: 'amit.k@example.com', status: 'Active' },
  { id: 4, firstName: 'Sneha', lastName: 'Patel', age: 22, email: 'sneha.p@example.com', status: 'Pending' },
  { id: 5, firstName: 'John', lastName: 'Doe', age: 30, email: 'john.d@example.com', status: 'Active' },
  { id: 6, firstName: 'Aisha', lastName: 'Khan', age: 38, email: 'aisha.k@example.com', status: 'Active' },
  { id: 7, firstName: 'David', lastName: 'Miller', age: 45, email: 'david.m@example.com', status: 'Inactive' },
  { id: 8, firstName: 'Lakshmi', lastName: 'Reddy', age: 50, email: 'lakshmi.r@example.com', status: 'Active' },
  { id: 9, firstName: 'Vikram', lastName: 'Gupta', age: 29, email: 'vikram.g@example.com', status: 'Pending' },
  { id: 10, firstName: 'Emily', lastName: 'White', age: 25, email: 'emily.w@example.com', status: 'Active' },
];

export const mockChartData = [
  { name: 'Jan', orders: 4000, revenue: 240000, users: 2400 },
  { name: 'Feb', orders: 3000, revenue: 139800, users: 2210 },
  { name: 'Mar', orders: 2000, revenue: 980000, users: 2290 },
  { name: 'Apr', orders: 2780, revenue: 390800, users: 2000 },
  { name: 'May', orders: 1890, revenue: 480000, users: 2181 },
  { name: 'Jun', orders: 2390, revenue: 380000, users: 2500 },
  { name: 'Jul', orders: 3490, revenue: 430000, users: 2100 },
];

export const mockCalendarEvents = [
  {
    title: 'Team Standup',
    start: new Date(2025, 5, 24, 10, 0),
    end: new Date(2025, 5, 24, 10, 30),
  },
  {
    title: 'Client Review (Mumbai)',
    start: new Date(2025, 5, 27, 11, 0),
    end: new Date(2025, 5, 27, 12, 0),
  },
  {
    title: 'Annual Company Picnic',
    start: new Date(2025, 6, 5, 12, 0),
    end: new Date(2025, 6, 5, 17, 0),
  },
  {
    title: 'Diwali Preparations',
    start: new Date(2025, 6, 12),
    end: new Date(2025, 6, 14),
    allDay: true,
  },
];

export const mockKanbanColumns = {
  'column-1': {
    id: 'column-1',
    title: 'Pending',
    taskIds: ['task-1', 'task-2', 'task-3'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In Progress',
    taskIds: ['task-4'],
  },
  'column-3': {
    id: 'column-3',
    title: 'Completed',
    taskIds: ['task-5'],
  },
};

export const mockKanbanTasks = {
  'task-1': { id: 'task-1', content: 'Prepare Q2 Sales Report' },
  'task-2': { id: 'task-2', content: 'Onboard new intern' },
  'task-3': { id: 'task-3', content: 'Review marketing campaign proposals' },
  'task-4': { id: 'task-4', content: 'Develop new product feature for Payments' },
  'task-5': { id: 'task-5', content: 'Finalize vendor contracts for next quarter' },
};