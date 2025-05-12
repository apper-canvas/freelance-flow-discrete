import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('timeTracker');
  
  const navigate = useNavigate();
  
  // Define all icons used in the component
  const ClockIcon = getIcon('Clock');
  const UsersIcon = getIcon('Users');
  const ClipboardListIcon = getIcon('ClipboardList');
  const ReceiptIcon = getIcon('Receipt');
  const LineChartIcon = getIcon('LineChart');
  const FileTextIcon = getIcon('FileText');
  const WalletIcon = getIcon('Wallet');
  
  const tabs = [
    { id: 'timeTracker', label: 'Time Tracker', icon: ClockIcon },
    { id: 'clients', label: 'Clients', icon: UsersIcon },
    { id: 'projects', label: 'Projects', icon: ClipboardListIcon },
    { id: 'invoices', label: 'Invoices', icon: ReceiptIcon },
    { id: 'expenses', label: 'Expenses', icon: WalletIcon },
    { id: 'reports', label: 'Reports', icon: LineChartIcon },
    { id: 'documents', label: 'Documents', icon: FileTextIcon },
  ];
  
  const handleTabClick = (tabId) => {
    if (tabId === 'documents') {
      navigate('/documents');
      return;
    }
    
    if (tabId === 'reports') {
      navigate('/reports');
      return;
    }
    
    if (tabId !== 'timeTracker') {
      toast.info(`The ${tabId} feature will be available in the next update!`, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
    setActiveTab(tabId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-surface-50 dark:bg-surface-900"
    >
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full md:w-64 shrink-0"
          >
            <div className="bg-white dark:bg-surface-800 shadow-card rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-4 px-2 text-surface-800 dark:text-surface-100">
                Dashboard
              </h2>
              
              <nav>
                <ul className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => handleTabClick(tab.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                            activeTab === tab.id
                              ? 'bg-primary/10 text-primary dark:text-primary-light'
                              : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                          }`}
                        >
                          <Icon className="w-5 h-5 shrink-0" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white dark:bg-surface-800 shadow-card rounded-xl p-4 mt-6">
              <h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-600 dark:text-surface-300">Active Projects</span>
                  <span className="font-semibold text-surface-900 dark:text-white">4</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-600 dark:text-surface-300">Tracked Today</span>
                  <span className="font-semibold text-surface-900 dark:text-white">2h 45m</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-surface-600 dark:text-surface-300">Pending Invoices</span>
                  <span className="font-semibold text-surface-900 dark:text-white">$1,245.00</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-white dark:bg-surface-800 shadow-card rounded-xl p-4 md:p-6">
              {activeTab === 'timeTracker' && (
                <MainFeature />
              )}
              
              {activeTab !== 'timeTracker' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    {(() => {
                      const Icon = tabs.find(tab => tab.id === activeTab)?.icon;
                      return Icon ? <Icon className="w-8 h-8 text-primary" /> : null;
                    })()}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {tabs.find(tab => tab.id === activeTab)?.label} Feature
                  </h3>
                  <p className="text-surface-600 dark:text-surface-300 max-w-md">
                    This feature will be available in the next update. Currently, you can use the Time Tracker to start managing your freelance work.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;