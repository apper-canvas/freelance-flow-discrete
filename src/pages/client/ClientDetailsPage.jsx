import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import ClientLayout from '../../components/ClientLayout';
import { clients } from '../../data/ClientsData';
import { projects, getProjectsByClientId, getTimeEntriesByProjectId, calculateProjectValue } from '../../data/ProjectsData';
import getIcon from '../../utils/iconUtils';

const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const { client: authClient } = useClientAuth();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [clientProjects, setClientProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [projectFilter, setProjectFilter] = useState('all');
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Icons
  const CheckCircleIcon = getIcon('CheckCircle');
  const ClockIcon = getIcon('Clock');
  const AlertCircleIcon = getIcon('AlertCircle');
  const ArrowRightIcon = getIcon('ArrowRight');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const GlobeIcon = getIcon('Globe');
  const MapPinIcon = getIcon('MapPin');
  const CalendarIcon = getIcon('Calendar');
  const DollarSignIcon = getIcon('DollarSign');
  const BarChartIcon = getIcon('BarChart');
  const ClipboardIcon = getIcon('Clipboard');
  const UserIcon = getIcon('User');
  const BuildingIcon = getIcon('Building');
  const TagIcon = getIcon('Tag');
  const PauseCircleIcon = getIcon('PauseCircle');
  
  // Fetch client data
  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    // In a real app, these would be API calls
    setTimeout(() => {
      // Find client by ID
      const foundClient = clients.find(c => c.id === clientId) || authClient;
      setClient(foundClient);
      
      // Get projects for this client
      const clientProjects = getProjectsByClientId(clientId);
      setClientProjects(clientProjects);
      
      // Get time entries for all client projects
      const allTimeEntries = [];
      clientProjects.forEach(project => {
        const projectTimeEntries = getTimeEntriesByProjectId(project.id);
        projectTimeEntries.forEach(entry => {
          allTimeEntries.push({
            ...entry,
            projectName: project.name,
            projectHourlyRate: project.hourlyRate
          });
        });
      });
      setTimeEntries(allTimeEntries);
      
      setLoading(false);
    }, 500);
  }, [clientId, authClient]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Filter projects based on status
  const filteredProjects = clientProjects.filter(project => {
    if (projectFilter === 'all') return true;
    if (projectFilter === 'completed') return project.status === 'completed';
    if (projectFilter === 'in-progress') return project.status === 'in-progress';
    if (projectFilter === 'not-started') return project.status === 'not-started';
    return true;
  });
  
  // Calculate total value
  const calculateTotalBilled = () => {
    return clientProjects.reduce((total, project) => {
      return total + (project.totalTrackedHours * project.hourlyRate);
    }, 0);
  };
  
  // Calculate total hours
  const calculateTotalHours = () => {
    return clientProjects.reduce((total, project) => {
      return total + project.totalTrackedHours;
    }, 0);
  };
  
  if (loading) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-surface-600 dark:text-surface-400">Loading client data...</p>
            </div>
          </div>
        </div>
      </ClientLayout>
    );
  }

  if (!client) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">Client Not Found</h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6">The requested client could not be found.</p>
            <button
              onClick={() => navigate('/client/dashboard')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Return to Dashboard
            </button>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back to dashboard link */}
          <Link 
            to="/client/dashboard" 
            className="inline-flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          
          {/* Client info header */}
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    <BuildingIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{client.name}</h1>
                    <p className="text-surface-600 dark:text-surface-400 font-medium">{client.company}</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                  <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                    <MailIcon className="w-4 h-4 mr-2 text-surface-500" /> {client.email}
                  </div>
                  {client.phone && (
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                      <PhoneIcon className="w-4 h-4 mr-2 text-surface-500" /> {client.phone}
                    </div>
                  )}
                  {client.website && (
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                      <GlobeIcon className="w-4 h-4 mr-2 text-surface-500" /> {client.website}
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center text-sm text-surface-600 dark:text-surface-400">
                      <MapPinIcon className="w-4 h-4 mr-2 text-surface-500" /> 
                      {`${client.address.city}, ${client.address.state}`}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end">
                <div className="bg-surface-100 dark:bg-surface-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-xs text-surface-500 dark:text-surface-400 uppercase font-medium">Projects</p>
                      <p className="text-2xl font-bold text-surface-900 dark:text-white">{clientProjects.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-surface-500 dark:text-surface-400 uppercase font-medium">Hours</p>
                      <p className="text-2xl font-bold text-surface-900 dark:text-white">{calculateTotalHours()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-surface-500 dark:text-surface-400 uppercase font-medium">Total Billed</p>
                      <p className="text-2xl font-bold text-surface-900 dark:text-white">{formatCurrency(calculateTotalBilled())}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
                  Client since {format(new Date(client.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Tabs navigation */}
          <div className="flex border-b border-surface-200 dark:border-surface-700 mb-6">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-3 font-medium text-sm border-b-2 -mb-px ${
                activeTab === 'projects' 
                  ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
                  : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('timeTracking')}
              className={`px-4 py-3 font-medium text-sm border-b-2 -mb-px ${
                activeTab === 'timeTracking' 
                  ? 'border-primary text-primary dark:border-primary-light dark:text-primary-light' 
                  : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
              }`}
            >
              Time Tracking
            </button>
          </div>
          
          {/* Projects tab */}
          {activeTab === 'projects' && (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-surface-900 dark:text-white">Client Projects</h2>
                <div className="inline-flex rounded-lg p-1 bg-surface-100 dark:bg-surface-700">
                  <button 
                    onClick={() => setProjectFilter('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded ${
                      projectFilter === 'all' ? 'bg-white dark:bg-surface-600 shadow-sm' : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setProjectFilter('in-progress')}
                    className={`px-3 py-1.5 text-xs font-medium rounded ${
                      projectFilter === 'in-progress' ? 'bg-white dark:bg-surface-600 shadow-sm' : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    In Progress
                  </button>
                  <button 
                    onClick={() => setProjectFilter('completed')}
                    className={`px-3 py-1.5 text-xs font-medium rounded ${
                      projectFilter === 'completed' ? 'bg-white dark:bg-surface-600 shadow-sm' : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    Completed
                  </button>
                  <button 
                    onClick={() => setProjectFilter('not-started')}
                    className={`px-3 py-1.5 text-xs font-medium rounded ${
                      projectFilter === 'not-started' ? 'bg-white dark:bg-surface-600 shadow-sm' : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    Not Started
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => {
                  // Calculate financial metrics
                  const projectValue = project.totalTrackedHours * project.hourlyRate;
                  const percentOfBudgetUsed = (projectValue / project.budget) * 100;
                  const percentOfHoursUsed = (project.totalTrackedHours / project.estimatedHours) * 100;
                  
                  // Determine status color and icon
                  let statusColor, StatusIcon;
                  if (project.status === 'completed') {
                    statusColor = 'text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300';
                    StatusIcon = CheckCircleIcon;
                  } else if (project.status === 'in-progress') {
                    statusColor = 'text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
                    StatusIcon = ClockIcon;
                  } else {
                    statusColor = 'text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-300';
                    StatusIcon = PauseCircleIcon;
                  }
                  
                  return (
                    <div key={project.id} className="bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{project.name}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {project.status === 'completed' ? 'Completed' : 
                             project.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                          </span>
                        </div>
                        
                        <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">{project.description}</p>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="text-surface-500 dark:text-surface-400">Progress</span>
                              <span className="font-medium text-surface-700 dark:text-surface-300">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-surface-100 dark:bg-surface-700 rounded-full h-2 overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: `${project.progress}%` }}></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col">
                              <span className="text-xs text-surface-500 dark:text-surface-400">Hours Tracked</span>
                              <span className="font-medium text-surface-900 dark:text-white flex items-center">
                                <ClockIcon className="w-3.5 h-3.5 mr-1 text-surface-500" />
                                {project.totalTrackedHours} / {project.estimatedHours}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-surface-500 dark:text-surface-400">Amount</span>
                              <span className="font-medium text-surface-900 dark:text-white flex items-center">
                                <DollarSignIcon className="w-3.5 h-3.5 mr-1 text-surface-500" />
                                {formatCurrency(projectValue)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col">
                              <span className="text-xs text-surface-500 dark:text-surface-400">Start Date</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {format(new Date(project.startDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-surface-500 dark:text-surface-400">Due Date</span>
                              <span className="font-medium text-surface-900 dark:text-white">
                                {format(new Date(project.dueDate), 'MMM d, yyyy')}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <Link 
                          to={`/client/projects/${project.id}`} 
                          className="mt-4 inline-flex items-center text-sm font-medium text-primary dark:text-primary-light hover:underline"
                        >
                          View Project Details <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {filteredProjects.length === 0 && (
                <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardIcon className="w-8 h-8 text-surface-500 dark:text-surface-400" />
                  </div>
                  <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No Projects Found</h3>
                  <p className="text-surface-600 dark:text-surface-400">
                    There are no projects matching your current filter.
                  </p>
                </div>
              )}
            </>
          )}
          
          {/* Time Tracking tab */}
          {activeTab === 'timeTracking' && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-surface-900 dark:text-white">Time Tracking</h2>
                <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                  All time entries for projects associated with this client
                </p>
              </div>
              
              <div className="bg-white dark:bg-surface-800 rounded-lg shadow overflow-hidden">
                {timeEntries.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                      <thead className="bg-surface-50 dark:bg-surface-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Project</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Description</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Hours</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                        {timeEntries.map((entry) => (
                          <tr key={entry.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                              {format(new Date(entry.date), 'MMM d, yyyy')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                              {entry.projectName}
                            </td>
                            <td className="px-6 py-4 text-sm text-surface-600 dark:text-surface-400">
                              {entry.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                              {entry.hours}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                              {entry.billable ? formatCurrency(entry.hours * entry.projectHourlyRate) : 'Non-billable'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-surface-50 dark:bg-surface-700">
                        <tr>
                          <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-900 dark:text-white text-right">
                            Total
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-900 dark:text-white">
                            {timeEntries.reduce((total, entry) => total + entry.hours, 0)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-surface-900 dark:text-white">
                            {formatCurrency(
                              timeEntries.reduce((total, entry) => {
                                return entry.billable 
                                  ? total + (entry.hours * entry.projectHourlyRate) 
                                  : total;
                              }, 0)
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ClockIcon className="w-8 h-8 text-surface-500 dark:text-surface-400" />
                    </div>
                    <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No Time Entries</h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      There are no time entries recorded for this client's projects yet.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </ClientLayout>
  );
};

export default ClientDetailsPage;