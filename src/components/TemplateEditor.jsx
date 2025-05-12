import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const TemplateEditor = ({ template, onSave, onClose }) => {
  const [sections, setSections] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [currentContent, setCurrentContent] = useState('');
  
  // Icons
  const SaveIcon = getIcon('Save');
  const XIcon = getIcon('X');
  const PlusIcon = getIcon('Plus');
  const EditIcon = getIcon('Edit2');
  const TrashIcon = getIcon('Trash2');
  const MoveUpIcon = getIcon('ChevronUp');
  const MoveDownIcon = getIcon('ChevronDown');
  const BoldIcon = getIcon('Bold');
  const ItalicIcon = getIcon('Italic');
  const ListIcon = getIcon('List');
  const LinkIcon = getIcon('Link');
  const CodeIcon = getIcon('Code');
  
  // Initialize editor with template data
  useEffect(() => {
    if (template) {
      setTemplateName(template.name || '');
      setTemplateDescription(template.description || '');
      setSections(template.sections || []);
      
      if (template.sections && template.sections.length > 0) {
        setActiveSection(template.sections[0].id);
        setCurrentContent(template.sections[0].content);
      }
    }
  }, [template]);
  
  const handleSectionChange = (sectionId) => {
    // Save current section content before switching
    if (activeSection) {
      setSections(sections.map(section => 
        section.id === activeSection 
          ? { ...section, content: currentContent } 
          : section
      ));
    }
    
    // Set new active section
    setActiveSection(sectionId);
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      setCurrentContent(section.content);
    }
  };
  
  const handleAddSection = () => {
    const newId = `section-${Date.now()}`;
    const newSection = {
      id: newId,
      title: 'New Section',
      content: '# New Section\n\nAdd your content here.'
    };
    
    setSections([...sections, newSection]);
    handleSectionChange(newId);
  };
  
  const handleDeleteSection = (id) => {
    if (sections.length <= 1) {
      toast.error('Cannot delete the only section', {
        position: "top-center",
      });
      return;
    }
    
    const newSections = sections.filter(section => section.id !== id);
    setSections(newSections);
    
    if (activeSection === id) {
      setActiveSection(newSections[0].id);
      setCurrentContent(newSections[0].content);
    }
  };
  
  const handleReorderSection = (id, direction) => {
    const currentIndex = sections.findIndex(section => section.id === id);
    if (currentIndex < 0) return;
    
    const newIndex = direction === 'up' 
      ? Math.max(0, currentIndex - 1) 
      : Math.min(sections.length - 1, currentIndex + 1);
    
    if (currentIndex === newIndex) return;
    
    const newSections = [...sections];
    const [movedSection] = newSections.splice(currentIndex, 1);
    newSections.splice(newIndex, 0, movedSection);
    
    setSections(newSections);
  };
  
  const handleRenameSection = (id, newTitle) => {
    setSections(sections.map(section => 
      section.id === id 
        ? { ...section, title: newTitle } 
        : section
    ));
  };
  
  const handleSaveTemplate = () => {
    // Save current section content before saving template
    const updatedSections = sections.map(section => 
      section.id === activeSection 
        ? { ...section, content: currentContent } 
        : section
    );
    
    const updatedTemplate = {
      ...template,
      name: templateName,
      description: templateDescription,
      sections: updatedSections,
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    onSave(updatedTemplate);
  };
  
  const insertFormatting = (format) => {
    let insertion = '';
    let cursorOffset = 0;
    
    switch (format) {
      case 'bold':
        insertion = '**Bold Text**';
        cursorOffset = 2;
        break;
      case 'italic':
        insertion = '*Italic Text*';
        cursorOffset = 1;
        break;
      case 'list':
        insertion = '\n- List item 1\n- List item 2\n- List item 3\n';
        cursorOffset = 2;
        break;
      case 'link':
        insertion = '[Link Text](https://example.com)';
        cursorOffset = 1;
        break;
      case 'code':
        insertion = '`Code snippet`';
        cursorOffset = 1;
        break;
      default:
        break;
    }
    
    setCurrentContent(currentContent + insertion);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-surface-900 bg-opacity-75 flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between bg-surface-100 dark:bg-surface-700 px-6 py-4">
          <div className="flex-1">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Template Name"
              className="text-xl font-semibold bg-transparent border-none focus:outline-none text-surface-900 dark:text-white w-full"
            />
            <input
              type="text"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder="Template Description"
              className="text-sm text-surface-600 dark:text-surface-300 bg-transparent border-none focus:outline-none w-full mt-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleSaveTemplate} className="btn btn-primary">
              <SaveIcon className="w-5 h-5 mr-1" /> Save
            </button>
            <button onClick={onClose} className="btn btn-outline">
              <XIcon className="w-5 h-5 mr-1" /> Close
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-12 h-[calc(90vh-78px)]">
          {/* Sections sidebar */}
          <div className="col-span-3 border-r border-surface-200 dark:border-surface-700 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wider">Sections</h3>
              <button 
                onClick={handleAddSection}
                className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
            
            <ul className="space-y-1">
              {sections.map((section, index) => (
                <li key={section.id} className="relative">
                  <div 
                    className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition ${
                      activeSection === section.id 
                        ? 'bg-primary/10 text-primary dark:text-primary-light' 
                        : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                    }`}
                    onClick={() => handleSectionChange(section.id)}
                  >
                    <span className="font-medium text-sm truncate flex-1">{section.title}</span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newTitle = prompt('Rename section:', section.title);
                          if (newTitle) handleRenameSection(section.id, newTitle);
                        }}
                        className="p-1 text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReorderSection(section.id, 'up');
                        }}
                        disabled={index === 0}
                        className={`p-1 ${index === 0 ? 'text-surface-400 dark:text-surface-600 cursor-not-allowed' : 'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white'}`}
                      >
                        <MoveUpIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReorderSection(section.id, 'down');
                        }}
                        disabled={index === sections.length - 1}
                        className={`p-1 ${index === sections.length - 1 ? 'text-surface-400 dark:text-surface-600 cursor-not-allowed' : 'text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white'}`}
                      >
                        <MoveDownIcon className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete section "${section.title}"?`)) {
                            handleDeleteSection(section.id);
                          }
                        }}
                        className="p-1 text-surface-600 hover:text-accent dark:text-surface-400 dark:hover:text-accent"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Editor area */}
          <div className="col-span-9 flex flex-col">
            {/* Formatting toolbar */}
            <div className="flex items-center space-x-1 p-2 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-750">
              <button 
                onClick={() => insertFormatting('bold')} 
                className="p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
              >
                <BoldIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => insertFormatting('italic')} 
                className="p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
              >
                <ItalicIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => insertFormatting('list')} 
                className="p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => insertFormatting('link')} 
                className="p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => insertFormatting('code')} 
                className="p-2 rounded hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300"
              >
                <CodeIcon className="w-4 h-4" />
              </button>
            </div>
            
            {/* Content textarea */}
            <textarea
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
              className="flex-1 p-4 bg-white dark:bg-surface-800 text-surface-900 dark:text-white resize-none focus:outline-none font-mono text-sm"
              placeholder="Enter your content here..."
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TemplateEditor;