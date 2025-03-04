/**
 * CommentFormUtils.js
 * 
 * Utility functions for the CommentForm component
 */

/**
 * Format text with markdown syntax
 * 
 * @param {string} formatType - The type of formatting to apply
 * @param {string} selectedText - The text to format
 * @returns {Object} The formatted text and cursor position
 */
export const formatText = (formatType, selectedText) => {
  let formattedText = '';
  let cursorPosition = 0;

  switch (formatType) {
    case 'bold':
      formattedText = `**${selectedText}**`;
      cursorPosition = 2;
      break;
    case 'italic':
      formattedText = `*${selectedText}*`;
      cursorPosition = 1;
      break;
    case 'underline':
      formattedText = `__${selectedText}__`;
      cursorPosition = 2;
      break;
    case 'strikethrough':
      formattedText = `~~${selectedText}~~`;
      cursorPosition = 2;
      break;
    case 'quote':
      formattedText = `> ${selectedText}`;
      cursorPosition = 2;
      break;
    case 'list':
      formattedText = `\n- ${selectedText}`;
      cursorPosition = 3;
      break;
    case 'numbered-list':
      formattedText = `\n1. ${selectedText}`;
      cursorPosition = 4;
      break;
    case 'link':
      formattedText = `[${selectedText}](url)`;
      cursorPosition = selectedText.length + 3;
      break;
    case 'mention':
      formattedText = `@${selectedText}`;
      cursorPosition = 1;
      break;
    default:
      formattedText = selectedText;
      cursorPosition = 0;
  }

  return { formattedText, cursorPosition };
};

/**
 * Apply formatting to text in a textarea
 * 
 * @param {Object} params - Parameters for applying formatting
 * @param {HTMLTextAreaElement} params.textarea - The textarea element
 * @param {string} params.content - The current content of the textarea
 * @param {string} params.formatType - The type of formatting to apply
 * @returns {string} The new content with formatting applied
 */
export const applyFormatting = ({ textarea, content, formatType }) => {
  if (!textarea) return content;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = content.substring(start, end);
  
  const { formattedText, cursorPosition } = formatText(formatType, selectedText);
  
  const newContent = 
    content.substring(0, start) + 
    formattedText + 
    content.substring(end);
  
  // Set focus back to textarea and position cursor
  setTimeout(() => {
    textarea.focus();
    const newCursorPos = selectedText ? start + formattedText.length : start + cursorPosition;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  }, 0);
  
  return newContent;
};
