import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  defaultTemplates, 
  getTemplateById, 
  getTemplatesByCommunityType, 
  getAllTemplates 
} from '../constants/defaultTemplates';

// Create the context
const TemplateContext = createContext();

/**
 * Template Provider component
 * Provides template functionality to the application
 */
export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [customTemplates, setCustomTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load templates from storage on mount
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        // In a real app, you might load custom templates from an API or local storage
        const storedTemplates = localStorage.getItem('customTemplates');
        if (storedTemplates) {
          setCustomTemplates(JSON.parse(storedTemplates));
        }
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  // Get all templates (default + custom)
  const getAllAvailableTemplates = () => {
    return [...templates, ...customTemplates];
  };

  // Get template by ID
  const getTemplate = (id) => {
    // First check custom templates
    const customTemplate = customTemplates.find(template => template.id === id);
    if (customTemplate) return customTemplate;
    
    // Then check default templates
    return getTemplateById(id);
  };

  // Get templates by community type
  const getTemplatesByType = (communityType) => {
    const defaultForType = getTemplatesByCommunityType(communityType);
    const customForType = customTemplates.filter(
      template => template.communityType === communityType
    );
    
    return [...defaultForType, ...customForType];
  };

  // Add a custom template
  const addCustomTemplate = (template) => {
    // Generate a unique ID if not provided
    const newTemplate = {
      ...template,
      id: template.id || `custom-${Date.now()}`
    };
    
    setCustomTemplates(prev => {
      const updated = [...prev, newTemplate];
      // Save to storage
      localStorage.setItem('customTemplates', JSON.stringify(updated));
      return updated;
    });
    
    return newTemplate;
  };

  // Update a custom template
  const updateCustomTemplate = (id, updates) => {
    setCustomTemplates(prev => {
      const index = prev.findIndex(template => template.id === id);
      if (index === -1) return prev;
      
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updates };
      
      // Save to storage
      localStorage.setItem('customTemplates', JSON.stringify(updated));
      return updated;
    });
  };

  // Delete a custom template
  const deleteCustomTemplate = (id) => {
    setCustomTemplates(prev => {
      const updated = prev.filter(template => template.id !== id);
      // Save to storage
      localStorage.setItem('customTemplates', JSON.stringify(updated));
      return updated;
    });
  };

  // Context value
  const value = {
    loading,
    getAllTemplates: getAllAvailableTemplates,
    getTemplate,
    getTemplatesByType,
    addCustomTemplate,
    updateCustomTemplate,
    deleteCustomTemplate
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

/**
 * Hook to use the template context
 * @returns {Object} Template context
 */
export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

export default TemplateContext;
