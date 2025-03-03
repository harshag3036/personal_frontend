import React, { useState, useEffect } from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import { SectionHeader } from './shared';
import './CommentSection.css';

/**
 * TemplateConfiguration Component
 * 
 * Allows community admins to configure templates for discussions
 * 
 * @param {Object} props
 * @param {string} props.communityId - ID of the community
 * @param {string} [props.selectedTemplateId] - ID of the currently selected template
 * @param {Function} props.onSave - Function to call when the configuration is saved
 * @param {Function} [props.onCancel] - Function to call when the configuration is cancelled
 */
const TemplateConfiguration = ({ 
  communityId, 
  selectedTemplateId = null, 
  onSave, 
  onCancel = null 
}) => {
  const { getAllTemplates, getTemplate } = useTemplate();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [requiredSections, setRequiredSections] = useState([]);
  const [communityType, setCommunityType] = useState('general');
  const [strictRigourEnforcement, setStrictRigourEnforcement] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load templates on mount
  useEffect(() => {
    const loadTemplates = () => {
      try {
        const allTemplates = getAllTemplates();
        setTemplates(allTemplates);
        
        // If a template ID is provided, select it
        if (selectedTemplateId) {
          const template = getTemplate(selectedTemplateId);
          if (template) {
            setSelectedTemplate(template);
            setRequiredSections([...template.defaultRequiredSections]);
            setStrictRigourEnforcement(template.strictRigourEnforcement || false);
          }
        }
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, [getAllTemplates, getTemplate, selectedTemplateId]);

  // Handle template selection
  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    if (!templateId) {
      setSelectedTemplate(null);
      setRequiredSections([]);
      return;
    }
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setRequiredSections([...template.defaultRequiredSections]);
      setStrictRigourEnforcement(template.strictRigourEnforcement || false);
    }
  };

  // Handle community type change
  const handleCommunityTypeChange = (e) => {
    setCommunityType(e.target.value);
  };

  // Handle section requirement toggle
  const handleSectionToggle = (sectionId) => {
    setRequiredSections(prev => {
      if (prev.includes(sectionId)) {
        return prev.filter(id => id !== sectionId);
      } else {
        return [...prev, sectionId];
      }
    });
  };

  // Handle strict rigour enforcement toggle
  const handleStrictRigourToggle = () => {
    setStrictRigourEnforcement(!strictRigourEnforcement);
  };

  // Handle save
  const handleSave = () => {
    if (!selectedTemplate) return;
    
    onSave({
      templateId: selectedTemplate.id,
      requiredSections,
      communityType,
      strictRigourEnforcement
    });
  };

  if (loading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="template-configuration">
      <SectionHeader 
        title="Discussion Template Configuration"
        subtitle="Configure the template for this discussion"
      />
      
      <div className="template-config-form">
        <div className="form-group">
          <label htmlFor="community-type">Community Type:</label>
          <select
            id="community-type"
            value={communityType}
            onChange={handleCommunityTypeChange}
            className="template-select"
          >
            <option value="general">General</option>
            <option value="philosophy">Philosophy</option>
            <option value="sports">Sports</option>
            <option value="creative">Creative</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="template-select">Discussion Template:</label>
          <select
            id="template-select"
            value={selectedTemplate?.id || ''}
            onChange={handleTemplateChange}
            className="template-select"
          >
            <option value="">Select a template...</option>
            {templates
              .filter(t => t.communityType === communityType || t.communityType === 'general')
              .map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
          </select>
        </div>
        
        {selectedTemplate && (
          <>
            <div className="template-description">
              <p>{selectedTemplate.description}</p>
            </div>
            
            <div className="section-configuration">
              <h3>Configure Required Sections</h3>
              <p className="section-config-info">
                Select which sections should be required for this discussion.
              </p>
              
              <div className="rigour-enforcement-option">
                <label className="rigour-toggle">
                  <input 
                    type="checkbox" 
                    checked={strictRigourEnforcement}
                    onChange={handleStrictRigourToggle}
                  />
                  <span className="rigour-label">Strictly enforce rigour requirements</span>
                </label>
                <p className="rigour-description">
                  When enabled, participants must fill all required sections to submit a comment. 
                  When disabled, participants can still comment without filling all required sections, 
                  but they won't receive a rigour badge.
                </p>
              </div>
              
              {selectedTemplate.sections
                .sort((a, b) => a.order - b.order)
                .map(section => (
                  <div key={section.id} className="section-item">
                    <label className="section-toggle">
                      <input 
                        type="checkbox" 
                        checked={requiredSections.includes(section.id)}
                        onChange={() => handleSectionToggle(section.id)}
                      />
                      <span className="section-label">{section.label}</span>
                    </label>
                    {section.description && (
                      <p className="section-description">{section.description}</p>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}
        
        <div className="template-config-actions">
          {onCancel && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button 
            type="button" 
            className="submit-button"
            onClick={handleSave}
            disabled={!selectedTemplate}
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateConfiguration;
