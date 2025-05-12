import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClientAuth } from '../contexts/ClientAuthContext';
import getIcon from '../utils/iconUtils';

const ClientLayout = ({ children }) => {
  const { client, logout } = useClientAuth();
  const navigate = useNavigate();
  
  const LogOutIcon = getIcon('LogOut');
  const UserIcon = getIcon('User');
  
  const handleLogout = () => {
    logout();
    navigate('/client/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-900">
      {/* Client Portal Header */}
      <header className="bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/client/dashboard" className="flex items-center space-x-2">
              <div className="bg-secondary rounded-full p-1.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 4H9.5L7 7L12 19L17 7L14.5 4Z" fill="white" />
                  <path d="M9.5 4L14.5 4L17 7L12 19L7 7L9.5 4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-secondary dark:text-secondary-light">Client Portal</span>
            </Link>
          </div>
          
          {client && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-sm font-medium hidden sm:inline">{client.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-sm flex items-center space-x-1 text-surface-600 hover:text-secondary transition-colors"
              >
                <LogOutIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </header>
      {children}
    </div>
  );
};

export default ClientLayout;