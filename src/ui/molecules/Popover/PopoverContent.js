import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { usePopover } from './Popover';

/**
 * PopoverContent Component
 * 
 * A component that displays the content of a Popover.
 * 
 * @example
 * ```jsx
 * <PopoverContent>
 *   <Text>This is the popover content</Text>
 * </PopoverContent>
 * ```
 */
const PopoverContent = ({
  children,
  className = '',
  ...restProps
}) => {
  const {
    isOpen,
    contentRef,
    triggerRef,
    placement,
    variant,
    size,
    arrow,
    offset,
    onClose,
    trapFocus,
  } = usePopover();
  
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  
  // Calculate position based on trigger element and placement
  const calculatePosition = () => {
    if (!triggerRef.current || !contentRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;
    
    // Calculate position based on placement
    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollTop - contentRect.height - offset;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (contentRect.width / 2);
        arrowTop = contentRect.height;
        arrowLeft = contentRect.width / 2;
        break;
      case 'top-start':
        top = triggerRect.top + scrollTop - contentRect.height - offset;
        left = triggerRect.left + scrollLeft;
        arrowTop = contentRect.height;
        arrowLeft = Math.min(triggerRect.width / 2, 20);
        break;
      case 'top-end':
        top = triggerRect.top + scrollTop - contentRect.height - offset;
        left = triggerRect.right + scrollLeft - contentRect.width;
        arrowTop = contentRect.height;
        arrowLeft = contentRect.width - Math.min(triggerRect.width / 2, 20);
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (contentRect.width / 2);
        arrowTop = -8;
        arrowLeft = contentRect.width / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.left + scrollLeft;
        arrowTop = -8;
        arrowLeft = Math.min(triggerRect.width / 2, 20);
        break;
      case 'bottom-end':
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.right + scrollLeft - contentRect.width;
        arrowTop = -8;
        arrowLeft = contentRect.width - Math.min(triggerRect.width / 2, 20);
        break;
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (contentRect.height / 2);
        left = triggerRect.left + scrollLeft - contentRect.width - offset;
        arrowTop = contentRect.height / 2;
        arrowLeft = contentRect.width;
        break;
      case 'left-start':
        top = triggerRect.top + scrollTop;
        left = triggerRect.left + scrollLeft - contentRect.width - offset;
        arrowTop = Math.min(triggerRect.height / 2, 20);
        arrowLeft = contentRect.width;
        break;
      case 'left-end':
        top = triggerRect.bottom + scrollTop - contentRect.height;
        left = triggerRect.left + scrollLeft - contentRect.width - offset;
        arrowTop = contentRect.height - Math.min(triggerRect.height / 2, 20);
        arrowLeft = contentRect.width;
        break;
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (contentRect.height / 2);
        left = triggerRect.right + scrollLeft + offset;
        arrowTop = contentRect.height / 2;
        arrowLeft = -8;
        break;
      case 'right-start':
        top = triggerRect.top + scrollTop;
        left = triggerRect.right + scrollLeft + offset;
        arrowTop = Math.min(triggerRect.height / 2, 20);
        arrowLeft = -8;
        break;
      case 'right-end':
        top = triggerRect.bottom + scrollTop - contentRect.height;
        left = triggerRect.right + scrollLeft + offset;
        arrowTop = contentRect.height - Math.min(triggerRect.height / 2, 20);
        arrowLeft = -8;
        break;
      default:
        top = triggerRect.bottom + scrollTop + offset;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (contentRect.width / 2);
        arrowTop = -8;
        arrowLeft = contentRect.width / 2;
    }
    
    // Ensure popover stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust horizontal position if needed
    if (left < 10) {
      const diff = 10 - left;
      left = 10;
      arrowLeft -= diff;
    } else if (left + contentRect.width > viewportWidth - 10) {
      const diff = left + contentRect.width - (viewportWidth - 10);
      left = viewportWidth - contentRect.width - 10;
      arrowLeft += diff;
    }
    
    // Adjust vertical position if needed
    if (top < 10) {
      const diff = 10 - top;
      top = 10;
      arrowTop -= diff;
    } else if (top + contentRect.height > viewportHeight + scrollTop - 10) {
      const diff = top + contentRect.height - (viewportHeight + scrollTop - 10);
      top = viewportHeight + scrollTop - contentRect.height - 10;
      arrowTop += diff;
    }
    
    setPosition({ top, left });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
  };
  
  // Update position when content changes
  useEffect(() => {
    if (isOpen) {
      // Wait for next frame to calculate position after content is rendered
      requestAnimationFrame(calculatePosition);
    }
  }, [isOpen, children]);
  
  // Update position on window resize
  useEffect(() => {
    if (!isOpen) return;
    
    const handleResize = () => {
      calculatePosition();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isOpen]);
  
  // Handle tab key for focus trapping
  const handleKeyDown = (event) => {
    if (!trapFocus || !contentRef.current) return;
    
    if (event.key === 'Tab') {
      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };
  
  // Combine class names
  const popoverClasses = [
    'ui-popover-content',
    `ui-popover-content--${variant}`,
    `ui-popover-content--${size}`,
    `ui-popover-content--${placement.split('-')[0]}`,
    arrow && 'ui-popover-content--arrow',
    className
  ].filter(Boolean).join(' ');
  
  // Don't render if not open
  if (!isOpen) return null;
  
  // Render popover content
  return createPortal(
    <div
      ref={contentRef}
      className={popoverClasses}
      style={{
        ...position,
        position: 'absolute',
        zIndex: 1000,
      }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {children}
      {arrow && (
        <div
          className="ui-popover-arrow"
          style={{
            position: 'absolute',
            top: `${arrowPosition.top}px`,
            left: `${arrowPosition.left}px`,
          }}
        />
      )}
    </div>,
    document.body
  );
};

PopoverContent.propTypes = {
  /** The content of the popover */
  children: PropTypes.node.isRequired,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default PopoverContent;
