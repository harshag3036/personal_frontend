import React from 'react';
import { useTemplate } from '../../contexts/TemplateContext';
import './DiscussionBoard.css';

/**
 * DiscussionContent Component
 * 
 * Displays the content of a structured discussion, showing all template sections
 * even if they're empty
 * 
 * @param {Object} props
 * @param {Object} props.discussion - The discussion data
 */
const DiscussionContent = ({ discussion }) => {
  const { getTemplate } = useTemplate();
  
  // Debug log to see what discussion data is being passed
  console.log('Discussion in DiscussionContent:', discussion);

  // If discussion is not available, show an error message
  if (!discussion) {
    return (
      <div className="discussion-content">
        <p className="template-error">Discussion data not available</p>
      </div>
    );
  }

  // If this is not a template-based discussion, just show the content
  if (!discussion.templateId) {
    return (
      <div className="discussion-content">
        <p>{discussion.content || 'No content available'}</p>
      </div>
    );
  }
  
  // If discussion has no sections but has content, show the content
  if ((!discussion.sections || Object.keys(discussion.sections).length === 0) && discussion.content) {
    return (
      <div className="discussion-content">
        <p>{discussion.content}</p>
      </div>
    );
  }
  
  // If discussion has description but no content or sections, show the description
  if ((!discussion.sections || Object.keys(discussion.sections).length === 0) && 
      !discussion.content && discussion.description) {
    return (
      <div className="discussion-content">
        <p>{discussion.description}</p>
      </div>
    );
  }
  
  // Get the template
  const template = getTemplate(discussion.templateId);
  if (!template) {
    return (
      <div className="discussion-content">
        <p className="template-error">Template not found</p>
        <p>{discussion.content || 'No content available'}</p>
      </div>
    );
  }
  
  return (
    <div className="structured-discussion-content">
      {discussion.meetsRigourRequirements && (
        <div className="rigour-badge-container">
          <span className="rigour-badge">Meets Rigour Requirements</span>
        </div>
      )}
      
      {template.sections && template.sections.length > 0 ? (
        template.sections
          .sort((a, b) => a.order - b.order)
          .map(section => {
            const hasContent = discussion.sections && 
                              discussion.sections[section.id] && 
                              discussion.sections[section.id].trim().length > 0;
            const isRequired = template.defaultRequiredSections && 
                              template.defaultRequiredSections.includes(section.id);
            
            return (
              <div 
                key={section.id} 
                className={`discussion-section ${!hasContent ? 'empty-section' : ''} ${!hasContent && isRequired ? 'empty-required-section' : ''}`}
              >
                <div className="section-title">
                  {section.label}
                  {isRequired && <span className="required-marker">*</span>}
                </div>
                
                {hasContent ? (
                  <div className="section-content">
                    {discussion.sections[section.id]}
                  </div>
                ) : (
                  <div className="empty-section-message">
                    <em>Not provided</em>
                  </div>
                )}
              </div>
            );
          })
      ) : (
        <div className="empty-sections-message">
          <p>No template sections found.</p>
        </div>
      )}
    </div>
  );
};

export default DiscussionContent;
