/**
 * Project data with time tracking information
 * This file provides project data with client associations and time tracking details
 */

// Utility function to get projects for a specific client
export const getProjectsByClientId = (clientId) => {
  return projects.filter(project => project.clientId === clientId);
};

// Utility function to get time entries for a specific project
export const getTimeEntriesByProjectId = (projectId) => {
  return timeEntries.filter(entry => entry.projectId === projectId);
};

// Sample projects data with client associations
export const projects = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with new branding',
    clientId: 'c1',
    status: 'in-progress',
    progress: 65,
    startDate: '2023-09-15',
    dueDate: '2023-12-15',
    budget: 8500,
    hourlyRate: 85,
    estimatedHours: 100,
    totalTrackedHours: 65,
    pendingApprovals: 2
  },
  {
    id: 'p2',
    name: 'Mobile App Development',
    description: 'iOS and Android application for customer engagement',
    clientId: 'c1',
    status: 'in-progress',
    progress: 40,
    startDate: '2023-10-20',
    dueDate: '2024-02-28',
    budget: 12000,
    hourlyRate: 100,
    estimatedHours: 120,
    totalTrackedHours: 48,
    pendingApprovals: 1
  },
  {
    id: 'p3',
    name: 'Branding Package',
    description: 'Logo design and brand guidelines',
    clientId: 'c1',
    status: 'completed',
    progress: 100,
    startDate: '2023-08-01',
    dueDate: '2023-10-30',
    budget: 4500,
    hourlyRate: 90,
    estimatedHours: 50,
    totalTrackedHours: 52,
    pendingApprovals: 0
  },
  {
    id: 'p4',
    name: 'SEO Optimization',
    description: 'Improve search engine rankings and visibility',
    clientId: 'c2',
    status: 'in-progress',
    progress: 70,
    startDate: '2023-11-01',
    dueDate: '2023-12-31',
    budget: 3000,
    hourlyRate: 75,
    estimatedHours: 40,
    totalTrackedHours: 28,
    pendingApprovals: 0
  },
  {
    id: 'p5',
    name: 'Content Marketing Strategy',
    description: 'Develop and implement content marketing plan',
    clientId: 'c2',
    status: 'not-started',
    progress: 0,
    startDate: '2024-01-15',
    dueDate: '2024-03-15',
    budget: 5000,
    hourlyRate: 80,
    estimatedHours: 62.5,
    totalTrackedHours: 0,
    pendingApprovals: 0
  }
];

// Sample time entries data
export const timeEntries = [
  // Website Redesign (p1) time entries
  { id: 't1', projectId: 'p1', description: 'Initial wireframes', date: '2023-09-20', hours: 6, billable: true },
  { id: 't2', projectId: 'p1', description: 'Design system setup', date: '2023-09-25', hours: 8, billable: true },
  { id: 't3', projectId: 'p1', description: 'Homepage implementation', date: '2023-10-05', hours: 10, billable: true },
  { id: 't4', projectId: 'p1', description: 'About page implementation', date: '2023-10-10', hours: 7, billable: true },
  { id: 't5', projectId: 'p1', description: 'Services section', date: '2023-10-20', hours: 12, billable: true },
  { id: 't6', projectId: 'p1', description: 'Contact form implementation', date: '2023-11-01', hours: 5, billable: true },
  { id: 't7', projectId: 'p1', description: 'Client feedback revisions', date: '2023-11-10', hours: 8, billable: true },
  { id: 't8', projectId: 'p1', description: 'Responsive design fixes', date: '2023-11-15', hours: 9, billable: true },

  // Mobile App Development (p2) time entries
  { id: 't9', projectId: 'p2', description: 'App architecture planning', date: '2023-10-25', hours: 10, billable: true },
  { id: 't10', projectId: 'p2', description: 'UI design', date: '2023-11-05', hours: 15, billable: true },
  { id: 't11', projectId: 'p2', description: 'Core functionality implementation', date: '2023-11-15', hours: 18, billable: true },
  { id: 't12', projectId: 'p2', description: 'API integration', date: '2023-11-25', hours: 5, billable: true },

  // Branding Package (p3) time entries
  { id: 't13', projectId: 'p3', description: 'Logo concepts', date: '2023-08-05', hours: 12, billable: true },
  { id: 't14', projectId: 'p3', description: 'Color palette development', date: '2023-08-15', hours: 6, billable: true },
  { id: 't15', projectId: 'p3', description: 'Typography selection', date: '2023-08-25', hours: 4, billable: true },
  { id: 't16', projectId: 'p3', description: 'Brand guidelines document', date: '2023-09-10', hours: 15, billable: true },
  { id: 't17', projectId: 'p3', description: 'Stationery design', date: '2023-09-20', hours: 8, billable: true },
  { id: 't18', projectId: 'p3', description: 'Social media templates', date: '2023-10-05', hours: 7, billable: true },

  // SEO Optimization (p4) time entries
  { id: 't19', projectId: 'p4', description: 'Keyword research', date: '2023-11-05', hours: 8, billable: true },
  { id: 't20', projectId: 'p4', description: 'On-page optimization', date: '2023-11-15', hours: 12, billable: true },
  { id: 't21', projectId: 'p4', description: 'Content optimization', date: '2023-11-25', hours: 8, billable: true }
];

// Calculate project value (billable amount)
export const calculateProjectValue = (projectId) => {
  const project = projects.find(p => p.id === projectId);
  return project.totalTrackedHours * project.hourlyRate;
};