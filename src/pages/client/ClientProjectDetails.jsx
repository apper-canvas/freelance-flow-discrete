import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
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
    startDate: '2023-09-01',
    milestones: [
      { id: 'm1', name: 'Wireframes', status: 'completed', date: '2023-09-15' },
      { id: 'm2', name: 'Design Mockups', status: 'completed', date: '2023-10-10' },
      { id: 'm3', name: 'Frontend Development', status: 'in-progress', date: '2023-11-15' },
      { id: 'm4', name: 'Backend Integration', status: 'not-started', date: '2023-12-01' },
    ],
    approvalItems: [
      { id: 'a1', name: 'Homepage Design', status: 'pending', description: 'Final homepage design for approval', date: '2023-10-25' },
      { id: 'a2', name: 'Contact Form', status: 'pending', description: 'Contact form design and functionality', date: '2023-11-05' },
    ]
  },
  {
    id: 'p2',
    name: 'Mobile App Development',
    description: 'iOS and Android application for customer engagement',
    status: 'in-progress',
    progress: 40,
    dueDate: '2024-02-28',
    startDate: '2023-10-15',
    milestones: [
      { id: 'm1', name: 'Requirements Gathering', status: 'completed', date: '2023-10-30' },
      { id: 'm2', name: 'UI/UX Design', status: 'completed', date: '2023-11-25' },
      { id: 'm3', name: 'Core Functionality', status: 'in-progress', date: '2024-01-15' },
      { id: 'm4', name: 'Testing & QA', status: 'not-started', date: '2024-02-10' },
    ],
    approvalItems: [
      { id: 'a1', name: 'App Icon Design', status: 'pending', description: 'Final app icon design for both platforms', date: '2023-11-20' },
    ]
  },
  {
    id: 'p3',
    name: 'Branding Package',
    description: 'Logo design and brand guidelines',
    status: 'completed',
    progress: 100,
    dueDate: '2023-10-30',
    startDate: '2023-08-15',
    milestones: [
      { id: 'm1', name: 'Brand Strategy', status: 'completed', date: '2023-08-25' },
      { id: 'm2', name: 'Logo Concepts', status: 'completed', date: '2023-09-10' },
      { id: 'm3', name: 'Color Palette & Typography', status: 'completed', date: '2023-09-25' },
      { id: 'm4', name: 'Brand Guidelines', status: 'completed', date: '2023-10-20' },
    ],
    approvalItems: []
  }
];

const ClientProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  // Find project by ID
  const project = sampleProjects.find(p => p.id === projectId);
  
  // If project not found, show error
  if (!project) {
    return (
      <ClientLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-xl font-semibold text-surface-800 dark:text-surface-200">Project not found</h2>
          <button 
            onClick={() => navigate('/client/dashboard')}
            className="mt-4 btn btn-primary"
          >
            Return to Dashboard
          </button>
        </div>
      </ClientLayout>
    );
  }
  
  // Icons
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ClockIcon = getIcon('Clock');
  const XCircleIcon = getIcon('XCircle');
  const CalendarIcon = getIcon('Calendar');
  const ThumbsUpIcon = getIcon('ThumbsUp');
  const ThumbsDownIcon = getIcon('ThumbsDown');
  
  // Handle approval actions
  const handleApproval = (itemId, isApproved) => {
    toast.success(`Item ${isApproved ? 'approved' : 'rejected'} successfully`);
    // In a real app, we would update the state/database here
  };

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={() => navigate('/client/dashboard')}
            className="flex items-center text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white mb-4"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Back to Dashboard
          </button>
          
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl font-bold text-surface-900 dark:text-white mr-3">{project.name}</h1>
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
                <p className="text-surface-600 dark:text-surface-400">{project.description}</p>
              </div>
              
              <div className="mt-4 md:mt-0 text-sm text-surface-600 dark:text-surface-400">
                <div className="flex items-center mb-1">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-surface-800 dark:text-surface-200">Project Progress</h2>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{project.progress}% Complete</span>
              </div>
              <div className="bg-surface-100 dark:bg-surface-700 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    project.progress === 100 
                      ? 'bg-green-500' 
                      : project.progress > 50 
                        ? 'bg-primary' 
                        : 'bg-primary'
                  }`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-surface-800 dark:text-surface-200">Milestones</h2>
              <div className="space-y-3">
                {project.milestones.map(milestone => (
                  <div key={milestone.id} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      milestone.status === 'completed' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' 
                        : milestone.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-surface-100 text-surface-500 dark:bg-surface-700 dark:text-surface-400'
                    }`}>
                      {milestone.status === 'completed' ? 
                        <CheckCircleIcon className="w-4 h-4" /> : 
                        milestone.status === 'in-progress' ?
                          <ClockIcon className="w-4 h-4" /> :
                          <XCircleIcon className="w-4 h-4" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-surface-800 dark:text-surface-200">{milestone.name}</span>
                        <span className="text-sm text-surface-600 dark:text-surface-400">{new Date(milestone.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {project.approvalItems.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-surface-800 dark:text-surface-200">Items Awaiting Approval</h2>
                <div className="space-y-4">
                  {project.approvalItems.map(item => (
                    <div key={item.id} className="border border-surface-200 dark:border-surface-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-surface-800 dark:text-surface-200">{item.name}</h3>
                        <span className="text-xs text-surface-500 dark:text-surface-400">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">{item.description}</p>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleApproval(item.id, true)}
                          className="btn btn-outline bg-green-50 text-green-600 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/40 flex items-center px-3 py-1.5"
                        >
                          <ThumbsUpIcon className="w-4 h-4 mr-2" />
                          Approve
                        </button>
                        <button 
                          onClick={() => handleApproval(item.id, false)}
                          className="btn btn-outline bg-red-50 text-red-600 border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/40 flex items-center px-3 py-1.5"
                        >
                          <ThumbsDownIcon className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </ClientLayout>
  );
};

export default ClientProjectDetails;