import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Tooltip.css';

/**
 * Tooltip Component
 * 
 * A component that displays informative text when users hover over, focus on, or tap an element.
 * 
 * @example
 * ```jsx
 * <Tooltip content="This is a tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
const Tooltip = ({
  children,
  content,
  placement = 'top',
  variant = 'default',
  size = 'md',
  delay = 300,
  arrow = true,
  maxWidth = 300,
  className = '',
  ...restProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Calculate tooltip position based on trigger element and placement
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    let top = 0;
    let left = 0;
    
    // Calculate position based on placement
    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollLeft - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollLeft + 8;
        break;
      default:
        top = triggerRect.top + scrollTop - tooltipRect.height - 8;
        left = triggerRect.left + scrollLeft + (triggerRect.width / 2) - (tooltipRect.width / 2);
    }
    
    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust horizontal position if needed
    if (left < 10) {
      left = 10;
    } else if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }
    
    // Adjust vertical position if needed
    if (top < 10) {
      top = triggerRect.bottom + scrollTop + 8; // Flip to bottom
    } else if (top + tooltipRect.height > viewportHeight + scrollTop - 10) {
      top = triggerRect.top + scrollTop - tooltipRect.height - 8; // Flip to top
    }
    
    setPosition({ top, left });
  };
  
  // Show tooltip
  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Wait for next frame to calculate position after tooltip is rendered
      requestAnimationFrame(calculatePosition);
    }, delay);
  };
  
  // Hide tooltip
  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };
  
  // Handle mouse events
  const handleMouseEnter = () => {
    showTooltip();
  };
  
  const handleMouseLeave = () => {
    hideTooltip();
  };
  
  // Handle focus events
  const handleFocus = () => {
    showTooltip();
  };
  
  const handleBlur = () => {
    hideTooltip();
  };
  
  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isVisible) {
        hideTooltip();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVisible]);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  
  // Update position when content changes
  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [content, isVisible]);
  
  // Update position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [isVisible]);
  
  // Clone children with event handlers
  const triggerElement = React.cloneElement(React.Children.only(children), {
    ref: (node) => {
      triggerRef.current = node;
      
      // Handle case when children has a ref
      const { ref } = children;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    onMouseEnter: (e) => {
      handleMouseEnter();
      children.props.onMouseEnter && children.props.onMouseEnter(e);
    },
    onMouseLeave: (e) => {
      handleMouseLeave();
      children.props.onMouseLeave && children.props.onMouseLeave(e);
    },
    onFocus: (e) => {
      handleFocus();
      children.props.onFocus && children.props.onFocus(e);
    },
    onBlur: (e) => {
      handleBlur();
      children.props.onBlur && children.props.onBlur(e);
    },
  });
  
  // Combine class names
  const tooltipClasses = [
    'ui-tooltip',
    `ui-tooltip--${variant}`,
    `ui-tooltip--${size}`,
    `ui-tooltip--${placement}`,
    arrow && 'ui-tooltip--arrow',
    className
  ].filter(Boolean).join(' ');
  
  // Render tooltip
  const tooltipElement = isVisible && createPortal(
    <div
      ref={tooltipRef}
      className={tooltipClasses}
      style={{
        ...position,
        maxWidth: `${maxWidth}px`,
      }}
      role="tooltip"
      {...restProps}
    >
      {content}
    </div>,
    document.body
  );
  
  return (
    <>
      {triggerElement}
      {tooltipElement}
    </>
  );
};

Tooltip.propTypes = {
  /** The element that triggers the tooltip */
  children: PropTypes.element.isRequired,
  /** The content of the tooltip */
  content: PropTypes.node.isRequired,
  /** The placement of the tooltip relative to the trigger */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** The visual variant of the tooltip */
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'info', 'success', 'warning', 'error']),
  /** The size of the tooltip */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** The delay before showing the tooltip (in milliseconds) */
  delay: PropTypes.number,
  /** Whether to show an arrow pointing to the trigger */
  arrow: PropTypes.bool,
  /** The maximum width of the tooltip (in pixels) */
  maxWidth: PropTypes.number,
  /** Additional CSS class */
  className: PropTypes.string,
};

export default Tooltip;
