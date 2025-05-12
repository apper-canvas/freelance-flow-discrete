import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  
  // Define icons
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const FileQuestionIcon = getIcon('FileQuestion');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16 text-center"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-8"
        >
          <FileQuestionIcon className="w-24 h-24 text-secondary opacity-70" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-surface-800 dark:text-surface-100">
          Page Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="btn btn-primary group"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Dashboard
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NotFound;