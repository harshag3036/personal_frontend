import React from 'react';
import '../CommentSection.css';

/**
 * TextFormatToolbar Component
 * 
 * A toolbar for formatting text in comments
 * 
 * @param {Object} props
 * @param {Function} props.onFormat - Function to call when a format button is clicked
 */
const TextFormatToolbar = ({ onFormat }) => {
  const formats = [
    { label: 'B', format: 'bold', title: 'Bold' },
    { label: 'I', format: 'italic', title: 'Italic' },
    { label: 'U', format: 'underline', title: 'Underline' },
    { label: 'S', format: 'strikethrough', title: 'Strikethrough' },
    { label: '❝', format: 'quote', title: 'Quote' },
    { label: '•', format: 'list', title: 'Bullet List' },
    { label: '1.', format: 'numbered-list', title: 'Numbered List' },
    { label: '🔗', format: 'link', title: 'Insert Link' },
    { label: '@', format: 'mention', title: 'Mention User' }
  ];

  return (
    <div className="format-toolbar">
      {formats.map(format => (
        <button
          key={format.format}
          className="format-button"
          title={format.title}
          onClick={() => onFormat(format.format)}
          type="button"
        >
          {format.label}
        </button>
      ))}
    </div>
  );
};

export default TextFormatToolbar;
