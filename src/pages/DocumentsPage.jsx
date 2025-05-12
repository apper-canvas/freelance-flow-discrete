import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';
import TemplateEditor from '../components/TemplateEditor';
import { proposalTemplates, contractTemplates } from '../data/templateData';

const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState('proposals');
  const [templates, setTemplates] = useState({
    proposals: [],
    contracts: []
  });
  const [showEditor, setShowEditor] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Icons
  const FileTextIcon = getIcon('FileText');
  const FileContractIcon = getIcon('FileSignature');
  const PlusIcon = getIcon('Plus');
  const EditIcon = getIcon('Edit2');
  const CopyIcon = getIcon('Copy');
  const TrashIcon = getIcon('Trash2');
  const SearchIcon = getIcon('Search');
  const DownloadIcon = getIcon('Download');
  const SendIcon = getIcon('Send');
  
  // Load template data
  useEffect(() => {
    setTemplates({
      proposals: proposalTemplates,
      contracts: contractTemplates
    });
  }, []);
  
  const filteredTemplates = templates[activeTab]?.filter(template => 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  const handleCreateTemplate = () => {
    const newTemplate = {
      id: `${activeTab.slice(0, 1)}-${Date.now()}`,
      name: `New ${activeTab === 'proposals' ? 'Proposal' : 'Contract'} Template`,
      description: `Custom ${activeTab === 'proposals' ? 'proposal' : 'contract'} template`,
      lastModified: new Date().toISOString().split('T')[0],
      sections: [
        {
          id: 'section-1',
          title: 'Introduction',
          content: `# Introduction\n\nThis is a sample introduction for your ${activeTab === 'proposals' ? 'proposal' : 'contract'}.`
        }
      ]
    };
    
    setCurrentTemplate(newTemplate);
    setShowEditor(true);
  };
  
  const handleEditTemplate = (template) => {
    setCurrentTemplate(template);
    setShowEditor(true);
  };
  
  const handleDuplicateTemplate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      name: `${template.name} (Copy)`,
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    setTemplates(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], duplicatedTemplate]
    }));
    
    toast.success(`Template duplicated successfully!`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  const handleDeleteTemplate = (templateId) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(t => t.id !== templateId)
      }));
      
      toast.info(`Template deleted`, {
        position: "bottom-right",
        autoClose: 2000
      });
    }
  };
  
  const handleSaveTemplate = (updatedTemplate) => {
    setTemplates(prev => {
      const isNewTemplate = !prev[activeTab].some(t => t.id === updatedTemplate.id);
      
      return {
        ...prev,
        [activeTab]: isNewTemplate 
          ? [...prev[activeTab], updatedTemplate]
          : prev[activeTab].map(t => t.id === updatedTemplate.id ? updatedTemplate : t)
      };
    });
    
    setShowEditor(false);
    
    toast.success(`Template ${currentTemplate.id.includes('copy') || currentTemplate.id.includes(Date.now()) ? 'created' : 'updated'} successfully!`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };
  
  const handleUseTemplate = (template) => {
    toast.info(`This functionality will be available in the next update. You can currently edit and customize templates.`, {
      position: "bottom-center",
      autoClose: 3000
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-surface-50 dark:bg-surface-900"
    >
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="bg-white dark:bg-surface-800 shadow-card rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2 flex items-center">
                <FileTextIcon className="w-6 h-6 mr-2 text-primary" />
                Document Templates
              </h1>
              <p className="text-surface-600 dark:text-surface-300">
                Create and manage professional proposal and contract templates
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateTemplate}
              className="btn btn-primary self-start"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Template
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="border-b border-surface-200 dark:border-surface-700 mb-6">
            <div className="flex space-x-8">
              <button
                className={`pb-4 px-1 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === 'proposals'
                    ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
                onClick={() => setActiveTab('proposals')}
              >
                <FileTextIcon className="w-5 h-5" />
                <span>Proposals</span>
              </button>
              
              <button
                className={`pb-4 px-1 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === 'contracts'
                    ? 'text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
                onClick={() => setActiveTab('contracts')}
              >
                <FileContractIcon className="w-5 h-5" />
                <span>Contracts</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-surface-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Template Grid */}
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <FileTextIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2 text-surface-800 dark:text-surface-100">No templates found</h3>
              <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
                {searchQuery
                  ? `No ${activeTab} match your search criteria. Try different keywords.`
                  : `You don't have any ${activeTab} templates yet. Create your first one!`}
              </p>
              <button
                onClick={handleCreateTemplate}
                className="btn btn-primary mt-4"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Template
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface-50 dark:bg-surface-750 rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">
                          {template.name}
                        </h3>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {template.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 p-1 bg-primary/10 rounded-full">
                        {activeTab === 'proposals' 
                          ? <FileTextIcon className="w-5 h-5 text-primary" /> 
                          : <FileContractIcon className="w-5 h-5 text-primary" />
                        }
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-surface-500 dark:text-surface-400 mb-4">
                      <span>{template.sections.length} sections</span>
                      <span className="inline-block mx-2">•</span>
                      <span>Last modified: {format(new Date(template.lastModified), 'MMM d, yyyy')}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.sections.slice(0, 3).map((section) => (
                        <span key={section.id} className="inline-block px-2 py-1 rounded-full bg-surface-200 dark:bg-surface-700 text-xs font-medium text-surface-800 dark:text-surface-300">
                          {section.title}
                        </span>
                      ))}
                      {template.sections.length > 3 && (
                        <span className="inline-block px-2 py-1 rounded-full bg-surface-200 dark:bg-surface-700 text-xs font-medium text-surface-800 dark:text-surface-300">
                          +{template.sections.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 flex justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="p-1 text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light"
                        title="Edit Template"
                      >
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDuplicateTemplate(template)}
                        className="p-1 text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light"
                        title="Duplicate Template"
                      >
                        <CopyIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-1 text-surface-600 hover:text-accent dark:text-surface-400 dark:hover:text-accent"
                        title="Delete Template"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="btn btn-primary px-3 py-1 text-sm"
                    >
                      Use Template
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Template Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <TemplateEditor
            template={currentTemplate}
            onSave={handleSaveTemplate}
            onClose={() => setShowEditor(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DocumentsPage;