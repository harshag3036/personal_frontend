/**
 * ToastContainer Component
 * 
 * A container for managing multiple Toast components with support for responsive props.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <ToastContainer toasts={toasts} onRemove={handleRemove} />
 * 
 * // With position
 * <ToastContainer 
 *   toasts={toasts} 
 *   position={TOAST_POSITIONS.TOP_RIGHT} 
 *   onRemove={handleRemove} 
 * />
 * 
 * // With maximum number of toasts
 * <ToastContainer 
 *   toasts={toasts} 
 *   maxToasts={3} 
 *   onRemove={handleRemove} 
 * />
 * 
 * // With responsive position
 * <ToastContainer 
 *   toasts={toasts} 
 *   position={{ 
 *     base: TOAST_POSITIONS.BOTTOM_CENTER, 
 *     md: TOAST_POSITIONS.BOTTOM_RIGHT, 
 *     lg: TOAST_POSITIONS.TOP_RIGHT 
 *   }} 
 *   onRemove={handleRemove} 
 * />
 * 
 * // Polymorphic rendering
 * <ToastContainer 
 *   as="section" 
 *   toasts={toasts} 
 *   onRemove={handleRemove} 
 * />
 * ```
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject } from '../../utilities/responsive-props';
import Box from '../../atoms/Box';
import { 
  TOAST_CLASS, 
  TOAST_POSITIONS, 
  TOAST_CONTAINER_CLASS, 
  TOAST_GROUP_CLASS 
} from './index';
import './ToastContainer.css';

/**
 * ToastContainer Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='div'] - Element to render the ToastContainer as
 * @param {Array} props.toasts - Array of toast objects to display
 * @param {string|Object} [props.position=TOAST_POSITIONS.BOTTOM_RIGHT] - Default position for toasts or responsive object
 * @param {Function} [props.onRemove] - Callback when a toast is removed
 * @param {number} [props.maxToasts=5] - Maximum number of toasts to display at once
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {JSX.Element} ToastContainer component
 */
const ToastContainer = ({
  as = 'div',
  toasts = [],
  position = TOAST_POSITIONS.BOTTOM_RIGHT,
  onRemove,
  maxToasts = 5,
  className = '',
  style = {},
  ...props
}) => {
  const [visibleToasts, setVisibleToasts] = useState([]);
  
  // Process responsive props
  const responsiveProps = {
    position,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(position)) {
      responsiveClasses.position = position;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base values for non-responsive props
  const basePosition = !isResponsiveObject(position) ? position : TOAST_POSITIONS.BOTTOM_RIGHT;

  // Error handling for invalid positions
  if (basePosition && !Object.values(TOAST_POSITIONS).includes(basePosition)) {
    console.warn(`ToastContainer: Invalid position "${basePosition}". Falling back to BOTTOM_RIGHT.`);
    position = TOAST_POSITIONS.BOTTOM_RIGHT;
  }

  // Safe remove handler with error boundary
  const handleRemove = useCallback((id) => {
    setVisibleToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    
    if (onRemove) {
      try {
        onRemove(id);
      } catch (error) {
        console.error('ToastContainer: Error in onRemove handler:', error);
      }
    }
  }, [onRemove]);

  // Update visible toasts when toasts prop changes
  useEffect(() => {
    // Validate toasts array
    if (!Array.isArray(toasts)) {
      console.warn('ToastContainer: toasts prop is not an array. Using empty array instead.');
      setVisibleToasts([]);
      return;
    }

    // Ensure each toast has an id
    const validToasts = toasts
      .filter((toast) => toast && typeof toast === 'object')
      .map((toast) => ({
        ...toast,
        id: toast.id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: toast.position || basePosition,
      }));

    // Limit to maxToasts
    const limitedToasts = validToasts.slice(0, maxToasts);
    
    setVisibleToasts(limitedToasts);
  }, [toasts, basePosition, maxToasts]);

  // Group toasts by position
  const toastsByPosition = visibleToasts.reduce((acc, toast) => {
    const pos = toast.position || basePosition;
    if (!acc[pos]) {
      acc[pos] = [];
    }
    acc[pos].push(toast);
    return acc;
  }, {});

  // Combine class names
  const containerClasses = [
    TOAST_CONTAINER_CLASS,
    className,
  ].filter(Boolean).join(' ');
  
  // Combine styles
  const containerStyles = {
    ...style,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    containerStyles['--responsive-styles'] = responsiveStyles;
  }

  // Use Box for consistent rendering and polymorphic support
  return (
    <Box as={as} className={containerClasses} style={containerStyles} {...props}>
      {Object.entries(toastsByPosition).map(([pos, positionToasts]) => (
        <div key={pos} className={`${TOAST_GROUP_CLASS} ${TOAST_GROUP_CLASS}-${pos}`}>
          {positionToasts.map((toast) => {
            // Extract toast-specific props
            const {
              id,
              content,
              variant,
              duration,
              icon,
              showCloseButton = true,
              onClose,
              ...toastProps
            } = toast;

            // Safe close handler with error boundary
            const handleClose = () => {
              handleRemove(id);
              
              if (onClose) {
                try {
                  onClose(id);
                } catch (error) {
                  console.error('ToastContainer: Error in toast onClose handler:', error);
                }
              }
            };

            // Auto-dismiss effect
            useEffect(() => {
              let timer;
              if (duration && duration > 0) {
                timer = setTimeout(() => {
                  handleClose();
                }, duration);
              }
              return () => {
                if (timer) clearTimeout(timer);
              };
            }, [id, duration]);

            return (
              <div
                key={id}
                className={`${TOAST_CLASS} ${TOAST_CLASS}-${variant || 'default'} ${TOAST_CLASS}-${pos}`}
                role="alert"
                aria-live="polite"
                {...toastProps}
              >
                {icon && (
                  <div className={`${TOAST_CLASS}-icon`}>
                    {icon}
                  </div>
                )}
                
                <div className={`${TOAST_CLASS}-content`}>
                  {content || 'Notification'}
                </div>
                
                {showCloseButton && (
                  <button
                    className={`${TOAST_CLASS}-close`}
                    onClick={handleClose}
                    aria-label="Close notification"
                    type="button"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </Box>
  );
};

ToastContainer.propTypes = {
  /** Element to render the ToastContainer as */
  ...polymorphicPropTypes,
  /** Array of toast objects to display */
  toasts: PropTypes.arrayOf(PropTypes.shape({
    /** Unique identifier for the toast */
    id: PropTypes.string,
    /** Toast content */
    content: PropTypes.node.isRequired,
    /** Toast variant */
    variant: PropTypes.string,
    /** Toast position */
    position: PropTypes.string,
    /** Duration in milliseconds before auto-dismissing (0 for no auto-dismiss) */
    duration: PropTypes.number,
    /** Icon to display in the toast */
    icon: PropTypes.node,
    /** Whether to show the close button */
    showCloseButton: PropTypes.bool,
    /** Callback when toast is closed */
    onClose: PropTypes.func,
  })),
  /** Default position for toasts or responsive object */
  position: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TOAST_POSITIONS)),
    PropTypes.object,
  ]),
  /** Callback when a toast is removed */
  onRemove: PropTypes.func,
  /** Maximum number of toasts to display at once */
  maxToasts: PropTypes.number,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
};

ToastContainer.defaultProps = {
  as: 'div',
  toasts: [],
  position: TOAST_POSITIONS.BOTTOM_RIGHT,
  maxToasts: 5,
  className: '',
  style: {},
};

export default ToastContainer;
