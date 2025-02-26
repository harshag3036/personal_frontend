import React, { useRef, useEffect } from 'react';
import '../CommentSection.css';

/**
 * EmojiPicker Component
 * 
 * A simple emoji picker for adding reactions to comments
 * 
 * @param {Object} props
 * @param {Function} props.onSelect - Function to call when an emoji is selected
 * @param {Function} props.onClose - Function to call when the picker is closed
 */
const EmojiPicker = ({ onSelect, onClose }) => {
  const emojis = ['👍', '👎', '❤️', '😄', '😢', '😮', '🎉', '🤔', '👏', '🙏'];
  const pickerRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="emoji-picker" ref={pickerRef}>
      {emojis.map(emoji => (
        <button 
          key={emoji} 
          className="emoji-button" 
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;
