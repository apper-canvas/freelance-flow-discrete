import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import ClientLayout from '../../components/ClientLayout';
import getIcon from '../../utils/iconUtils';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useClientAuth();
  const navigate = useNavigate();
  
  const MailIcon = getIcon('Mail');
  const LockIcon = getIcon('Lock');
  const LoaderIcon = getIcon('Loader');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!email || !password) {
      toast.error('Please enter both email and password');
      setIsSubmitting(false);
      return;
    }
    
    // Attempt login
    const success = login(email, password);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/client/dashboard');
    } else {
      toast.error('Invalid email or password');
      setIsSubmitting(false);
    }
  };

  return (
    <ClientLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-6 md:p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-surface-900 dark:text-white">
              Client Login
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-surface-500">
                    <MailIcon className="w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="input pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-surface-700 dark:text-surface-300">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-surface-500">
                    <LockIcon className="w-5 h-5" />
                  </span>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-10" />
                </div>
              </div>
              
              <button type="submit" disabled={isSubmitting} className="btn btn-secondary w-full flex justify-center py-2.5">
                {isSubmitting ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Sign In"}
              </button>
              
              <p className="text-sm text-center text-surface-600 dark:text-surface-400 mt-4">
                Hint: Use "client@example.com" with password "password123"
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </ClientLayout>
  );
};

export default ClientLogin;