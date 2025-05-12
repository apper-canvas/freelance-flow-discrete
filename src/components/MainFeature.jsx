import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, addSeconds } from 'date-fns';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Define all icons used in the component
  const PlayIcon = getIcon('Play');
  const PauseIcon = getIcon('Pause');
  const StopIcon = getIcon('Square');
  const PlusIcon = getIcon('Plus');
  const SaveIcon = getIcon('Save');
  const ClockIcon = getIcon('Clock');
  const CalendarIcon = getIcon('Calendar');
  const EditIcon = getIcon('Edit2');
  const TrashIcon = getIcon('Trash2');
  const TagIcon = getIcon('Tag');
  const BuildingIcon = getIcon('Building');
  const CheckIcon = getIcon('Check');
  const AlertCircleIcon = getIcon('AlertCircle');
  const FileTextIcon = getIcon('FileText');
  const DollarSignIcon = getIcon('DollarSign');
  
  // State for time tracking
  const [isTracking, setIsTracking] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentActivity, setCurrentActivity] = useState('');
  const [currentProject, setCurrentProject] = useState('');
  const [currentClient, setCurrentClient] = useState('');
  const [isBillable, setIsBillable] = useState(true);
  const [rate, setRate] = useState('60.00');
  const [timeEntries, setTimeEntries] = useState([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      project: 'Website Redesign',
      client: 'Acme Inc',
      description: 'Homepage UI development',
      duration: 5400, // 1h 30m in seconds
      billable: true,
      rate: 75,
    },
    {
      id: 2,
      date: new Date().toISOString().split('T')[0],
      project: 'Mobile App',
      client: 'TechStart',
      description: 'API integration',
      duration: 7200, // 2h in seconds
      billable: true,
      rate: 90,
    },
  ]);
  
  // Refs for time tracking
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  
  // State for manual time entry modal
  const [showModal, setShowModal] = useState(false);
  const [manualEntry, setManualEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: '',
    minutes: '',
    description: '',
    project: '',
    client: '',
    billable: true,
  });
  
  // Sample data for dropdowns
  const projects = ['Website Redesign', 'Mobile App', 'Logo Design', 'Marketing Campaign'];
  const clients = ['Acme Inc', 'TechStart', 'DesignHub', 'MarketBoost'];
  
  // Effects for timer
  useEffect(() => {
    if (isTracking) {
      startTimeRef.current = Date.now() - (timeElapsed * 1000);
      timerRef.current = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTracking]);
  
  // Helper functions
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };
  
  // Event handlers
  const handleStartTimer = () => {
    if (!currentProject || !currentClient || !currentActivity) {
      toast.error('Please fill in all required fields', {
        position: "top-center",
      });
      return;
    }
    
    setIsTracking(true);
    toast.success('Timer started!', {
      position: "top-center",
      autoClose: 2000,
    });
  };
  
  const handlePauseTimer = () => {
    setIsTracking(false);
    toast.info('Timer paused', {
      position: "top-center",
      autoClose: 2000,
    });
  };
  
  const handleStopTimer = () => {
    if (timeElapsed < 60) {
      toast.warning('Time entry too short (< 1 minute)', {
        position: "top-center",
      });
      return;
    }
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      project: currentProject,
      client: currentClient,
      description: currentActivity,
      duration: timeElapsed,
      billable: isBillable,
      rate: parseFloat(rate),
    };
    
    setTimeEntries([newEntry, ...timeEntries]);
    setIsTracking(false);
    setTimeElapsed(0);
    
    toast.success('Time entry saved!', {
      position: "top-center",
    });
  };
  
  const handleManualEntryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setManualEntry({
      ...manualEntry,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleManualEntrySave = () => {
    const { hours, minutes, date, description, project, client, billable } = manualEntry;
    
    if (!project || !client || !description || (!hours && !minutes)) {
      toast.error('Please fill in all required fields', {
        position: "top-center",
      });
      return;
    }
    
    const hoursNum = parseInt(hours || '0');
    const minutesNum = parseInt(minutes || '0');
    const totalSeconds = (hoursNum * 3600) + (minutesNum * 60);
    
    if (totalSeconds < 60) {
      toast.warning('Time entry too short (< 1 minute)', {
        position: "top-center",
      });
      return;
    }
    
    const newEntry = {
      id: Date.now(),
      date,
      project,
      client,
      description,
      duration: totalSeconds,
      billable,
      rate: parseFloat(rate),
    };
    
    setTimeEntries([newEntry, ...timeEntries]);
    
    setManualEntry({
      date: new Date().toISOString().split('T')[0],
      hours: '',
      minutes: '',
      description: '',
      project: '',
      client: '',
      billable: true,
    });
    
    setShowModal(false);
    
    toast.success('Manual time entry added!', {
      position: "top-center",
    });
  };
  
  const handleDeleteEntry = (id) => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== id));
    toast.info('Time entry deleted', {
      position: "top-center",
      autoClose: 2000,
    });
  };
  
  const getTotalDuration = () => {
    return timeEntries.reduce((total, entry) => total + entry.duration, 0);
  };
  
  const getTotalBillable = () => {
    return timeEntries
      .filter(entry => entry.billable)
      .reduce((total, entry) => {
        const hourlyRate = entry.rate || parseFloat(rate);
        const hours = entry.duration / 3600;
        return total + (hourlyRate * hours);
      }, 0);
  };
  
  // Calculate potential earnings for current timer if applicable
  const getCurrentEarnings = () => {
    if (timeElapsed > 0 && isBillable) {
      const hourlyRate = parseFloat(rate);
      const hours = timeElapsed / 3600;
      return (hourlyRate * hours).toFixed(2);
    }
    return '0.00';
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-surface-200 dark:border-surface-700 pb-4">
        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4 flex items-center">
          <ClockIcon className="w-6 h-6 mr-2 text-primary" />
          Time Tracker
        </h2>
        <p className="text-surface-600 dark:text-surface-300">
          Track your time on projects, then generate invoices and reports.
        </p>
      </div>
      
      {/* Timer Section */}
      <div>
        <div className="mb-6">
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/20 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Project Selection */}
              <div>
                <label htmlFor="current-project" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Project <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <select
                    id="current-project"
                    value={currentProject}
                    onChange={(e) => setCurrentProject(e.target.value)}
                    className="input pl-10"
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TagIcon className="h-5 w-5 text-surface-400" />
                  </div>
                </div>
              </div>
              
              {/* Client Selection */}
              <div>
                <label htmlFor="current-client" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Client <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <select
                    id="current-client"
                    value={currentClient}
                    onChange={(e) => setCurrentClient(e.target.value)}
                    className="input pl-10"
                    required
                  >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BuildingIcon className="h-5 w-5 text-surface-400" />
                  </div>
                </div>
              </div>
              
              {/* Billable Toggle and Rate */}
              <div className="flex flex-col">
                <label htmlFor="rate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Hourly Rate ($)
                </label>
                <div className="flex items-center h-10">
                  <div className="relative flex-1">
                    <input
                      id="rate"
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="input pl-10"
                      disabled={!isBillable}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSignIcon className="h-5 w-5 text-surface-400" />
                    </div>
                  </div>
                  <div className="ml-3 flex items-center">
                    <input
                      id="billable"
                      type="checkbox"
                      checked={isBillable}
                      onChange={(e) => setIsBillable(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                    />
                    <label htmlFor="billable" className="ml-2 block text-sm text-surface-700 dark:text-surface-300">
                      Billable
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity Description */}
            <div className="mb-6">
              <label htmlFor="activity" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                What are you working on? <span className="text-accent">*</span>
              </label>
              <input
                id="activity"
                type="text"
                value={currentActivity}
                onChange={(e) => setCurrentActivity(e.target.value)}
                placeholder="Describe your activity..."
                className="input"
                required
              />
            </div>
            
            {/* Timer Display and Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center">
                <div className="text-4xl md:text-5xl font-mono font-bold text-primary dark:text-primary-light tracking-tight">
                  {formatTime(timeElapsed)}
                </div>
                {isBillable && (
                  <div className="ml-4 py-1 px-3 bg-accent/10 text-accent dark:text-accent rounded text-sm font-medium">
                    ${getCurrentEarnings()}
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="btn btn-secondary px-3 md:px-4"
                  aria-label="Add manual time entry"
                >
                  <PlusIcon className="w-5 h-5 md:mr-2" />
                  <span className="hidden md:inline">Manual Entry</span>
                </motion.button>
                
                {!isTracking ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartTimer}
                    className="btn btn-primary px-3 md:px-4"
                    aria-label="Start timer"
                  >
                    <PlayIcon className="w-5 h-5 md:mr-2" />
                    <span className="hidden md:inline">Start</span>
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePauseTimer}
                      className="btn btn-outline px-3 md:px-4"
                      aria-label="Pause timer"
                    >
                      <PauseIcon className="w-5 h-5 md:mr-2" />
                      <span className="hidden md:inline">Pause</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStopTimer}
                      className="btn btn-accent px-3 md:px-4"
                      aria-label="Stop and save timer"
                    >
                      <StopIcon className="w-5 h-5 md:mr-2" />
                      <span className="hidden md:inline">Stop</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Time Entries List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
            Recent Time Entries
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-surface-600 dark:text-surface-400">
              <span className="font-semibold">Total:</span> {formatDuration(getTotalDuration())}
            </div>
            <div className="text-sm text-accent">
              <span className="font-semibold">Billable:</span> ${getTotalBillable().toFixed(2)}
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-800 overflow-hidden rounded-xl border border-surface-200 dark:border-surface-700">
          {timeEntries.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-surface-600 dark:text-surface-400">No time entries yet. Start tracking your time!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                <thead className="bg-surface-50 dark:bg-surface-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Project / Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                  {timeEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-surface-50 dark:hover:bg-surface-750">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-300">
                        {format(new Date(entry.date), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-surface-900 dark:text-white">
                          {entry.project}
                        </div>
                        <div className="text-sm text-surface-500 dark:text-surface-400">
                          {entry.client}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-surface-900 dark:text-white line-clamp-2">
                          {entry.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-300">
                        {formatDuration(entry.duration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.billable ? (
                          <div className="text-sm text-surface-900 dark:text-white">
                            ${((entry.duration / 3600) * entry.rate).toFixed(2)}
                          </div>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300">
                            Non-billable
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-accent hover:text-accent-dark ml-3"
                          aria-label="Delete entry"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            onClick={() => toast.info("This will be available in the next update", { position: "top-center" })}
          >
            <FileTextIcon className="w-5 h-5 mr-2" />
            Generate Invoice
          </motion.button>
        </div>
      </div>
      
      {/* Manual Time Entry Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-surface-900 opacity-75"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="inline-block align-bottom bg-white dark:bg-surface-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="bg-white dark:bg-surface-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-secondary/20 sm:mx-0 sm:h-10 sm:w-10">
                      <ClockIcon className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-surface-900 dark:text-white">
                        Add Manual Time Entry
                      </h3>
                      <div className="mt-4 space-y-4">
                        {/* Date Input */}
                        <div>
                          <label htmlFor="manual-date" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                            Date
                          </label>
                          <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <CalendarIcon className="h-5 w-5 text-surface-400" />
                            </div>
                            <input
                              type="date"
                              id="manual-date"
                              name="date"
                              value={manualEntry.date}
                              onChange={handleManualEntryChange}
                              className="input pl-10"
                            />
                          </div>
                        </div>
                        
                        {/* Duration Inputs */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="manual-hours" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                              Hours
                            </label>
                            <input
                              type="number"
                              id="manual-hours"
                              name="hours"
                              min="0"
                              max="24"
                              value={manualEntry.hours}
                              onChange={handleManualEntryChange}
                              className="input"
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <label htmlFor="manual-minutes" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                              Minutes
                            </label>
                            <input
                              type="number"
                              id="manual-minutes"
                              name="minutes"
                              min="0"
                              max="59"
                              value={manualEntry.minutes}
                              onChange={handleManualEntryChange}
                              className="input"
                              placeholder="0"
                            />
                          </div>
                        </div>
                        
                        {/* Project Selection */}
                        <div>
                          <label htmlFor="manual-project" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                            Project
                          </label>
                          <select
                            id="manual-project"
                            name="project"
                            value={manualEntry.project}
                            onChange={handleManualEntryChange}
                            className="input"
                          >
                            <option value="">Select Project</option>
                            {projects.map((project) => (
                              <option key={project} value={project}>{project}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Client Selection */}
                        <div>
                          <label htmlFor="manual-client" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                            Client
                          </label>
                          <select
                            id="manual-client"
                            name="client"
                            value={manualEntry.client}
                            onChange={handleManualEntryChange}
                            className="input"
                          >
                            <option value="">Select Client</option>
                            {clients.map((client) => (
                              <option key={client} value={client}>{client}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Description Input */}
                        <div>
                          <label htmlFor="manual-description" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                            Description
                          </label>
                          <textarea
                            id="manual-description"
                            name="description"
                            rows="2"
                            value={manualEntry.description}
                            onChange={handleManualEntryChange}
                            className="input"
                            placeholder="What did you work on?"
                          ></textarea>
                        </div>
                        
                        {/* Billable Toggle */}
                        <div className="flex items-center">
                          <input
                            id="manual-billable"
                            name="billable"
                            type="checkbox"
                            checked={manualEntry.billable}
                            onChange={handleManualEntryChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-surface-300 rounded"
                          />
                          <label htmlFor="manual-billable" className="ml-2 block text-sm text-surface-700 dark:text-surface-300">
                            Billable
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface-50 dark:bg-surface-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleManualEntrySave}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <SaveIcon className="w-5 h-5 mr-2" />
                    Save Entry
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-surface-300 dark:border-surface-600 shadow-sm px-4 py-2 bg-white dark:bg-surface-800 text-base font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;