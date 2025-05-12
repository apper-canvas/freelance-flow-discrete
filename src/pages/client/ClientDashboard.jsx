import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import ClientLayout from '../../components/ClientLayout';
import getIcon from '../../utils/iconUtils';

// Sample project data for demonstration
const sampleProjects = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with new branding',
    status: 'in-progress',
    progress: 65,
    dueDate: '2023-12-15',
    pendingApprovals: 2
  },
  {
    id: 'p2',
    name: 'Mobile App Development',
    description: 'iOS and Android application for customer engagement',
    status: 'in-progress',
    progress: 40,
    dueDate: '2024-02-28',
    pendingApprovals: 1
  },
  {
    id: 'p3',
    name: 'Branding Package',
    description: 'Logo design and brand guidelines',
    status: 'completed',
    progress: 100,
    dueDate: '2023-10-30',
    pendingApprovals: 0
  }
];

const ClientDashboard = () => {
  const { client } = useClientAuth();
  const [filter, setFilter] = useState('all');
  
  // Icons
  const CheckCircleIcon = getIcon('CheckCircle');
  const ClockIcon = getIcon('Clock');
  const AlertCircleIcon = getIcon('AlertCircle');
  const ArrowRightIcon = getIcon('ArrowRight');
  
  // Filter projects based on status
  const filteredProjects = sampleProjects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'completed') return project.status === 'completed';
    if (filter === 'in-progress') return project.status === 'in-progress';
    return true;
  });

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Welcome, {client.name}</h1>
                <p className="text-surface-600 dark:text-surface-400 mt-1">{client.company}</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="inline-flex rounded-lg p-1 bg-surface-100 dark:bg-surface-700">
                  <button 
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1.5 text-sm font-medium rounded ${
                      filter === 'all' ? 'bg-white dark:bg-surface-600 shadow-sm' : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    All Projects
                  </button>
                  <button 
                    onClick={() => setFilter('in-progress')}
                    className={`px-3 py-1.5 text-sm font-medium rounded ${
                      filter === 'in-progress' ? 'bg-white dark:bg-surface-600 shadow-sm' : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    In Progress
                  </button>
                  <button 
                    onClick={() => setFilter('completed')}
                    className={`px-3 py-1.5 text-sm font-medium rounded ${
                      filter === 'completed' ? 'bg-white dark:bg-surface-600 shadow-sm' : 'text-surface-600 dark:text-surface-400'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProjects.map(project => (
                <div key={project.id} className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{project.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {project.status === 'completed' ? 
                        <CheckCircleIcon className="w-3 h-3 mr-1" /> : 
                        <ClockIcon className="w-3 h-3 mr-1" />
                      }
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">{project.description}</p>
                  
                  <div className="mt-4 mb-3 bg-surface-100 dark:bg-surface-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-surface-500 dark:text-surface-400">Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                    
                    {project.pendingApprovals > 0 ? (
                      <span className="inline-flex items-center text-xs font-medium text-accent">
                        <AlertCircleIcon className="w-3 h-3 mr-1" />
                        {project.pendingApprovals} {project.pendingApprovals === 1 ? 'item' : 'items'} need approval
                      </span>
                    ) : null}
                  </div>
                  
                  <Link 
                    to={`/client/projects/${project.id}`} 
                    className="mt-3 text-sm font-medium text-primary dark:text-primary-light flex items-center hover:underline"
                  >
                    View Details <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;