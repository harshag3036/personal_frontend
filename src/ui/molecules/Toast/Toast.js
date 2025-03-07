/**
 * Toast Component
 * 
 * A notification component for displaying temporary messages with support for variants, positions, and responsive props.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <Toast visible={true} onClose={handleClose}>
 *   This is a toast message
 * </Toast>
 * 
 * // With variant
 * <Toast variant="success" visible={true} onClose={handleClose}>
 *   Operation completed successfully!
 * </Toast>
 * 
 * // With position
 * <Toast position="top-center" visible={true} onClose={handleClose}>
 *   This toast appears at the top center
 * </Toast>
 * 
 * // With icon
 * <Toast 
 *   icon={<CheckCircleIcon />} 
 *   visible={true} 
 *   onClose={handleClose}
 * >
 *   Operation completed successfully!
 * </Toast>
 * 
 * // With auto-dismiss
 * <Toast 
 *   duration={5000} 
 *   visible={true} 
 *   onClose={handleClose}
 * >
 *   This toast will auto-dismiss after 5 seconds
 * </Toast>
 * 
 * // Without close button
 * <Toast 
 *   showCloseButton={false} 
 *   visible={true} 
 *   onClose={handleClose}
 * >
 *   This toast doesn't have a close button
 * </Toast>
 * 
 * // Responsive props
 * <Toast 
 *   position={{ 
 *     base: "bottom-center", 
 *     md: "bottom-right", 
 *     lg: "top-right" 
 *   }} 
 *   visible={true} 
 *   onClose={handleClose}
 * >
 *   This toast changes position at different breakpoints
 * </Toast>
 * 
 * // Polymorphic rendering
 * <Toast as="section" visible={true} onClose={handleClose}>
 *   This toast is rendered as a section element
 * </Toast>
 * ```
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { componentExtension } from '../../utilities';
import { isResponsiveObject } from '../../utilities/responsive-props';
import Box from '../../atoms/Box';
import { 
  TOAST_CLASS, 
  TOAST_VARIANTS, 
  TOAST_POSITIONS, 
  TOAST_MODIFIERS,
  TOAST_BREAKPOINTS
} from './index';
import './Toast.css';

/**
 * Toast Component
 * 
 * @param {Object} props - Component props
 * @param {React.ElementType} [props.as='div'] - Element to render the Toast as
 * @param {React.ReactNode} props.children - Toast content
 * @param {string|Object} [props.variant=TOAST_VARIANTS.DEFAULT] - Toast variant or responsive object
 * @param {string|Object} [props.position=TOAST_POSITIONS.BOTTOM_RIGHT] - Toast position or responsive object
 * @param {boolean} [props.visible=true] - Whether the toast is visible
 * @param {number} [props.duration=3000] - Duration in milliseconds before auto-dismissing (0 for no auto-dismiss)
 * @param {Function} [props.onClose] - Callback when toast is closed
 * @param {React.ReactNode} [props.icon] - Icon to display in the toast
 * @param {boolean} [props.showCloseButton=true] - Whether to show the close button
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the toast
 * @returns {JSX.Element|null} Toast component or null if not visible
 */
const Toast = ({
  as = 'div',
  children,
  variant = TOAST_VARIANTS.DEFAULT,
  position = TOAST_POSITIONS.BOTTOM_RIGHT,
  visible = true,
  duration = 3000,
  onClose,
  icon,
  showCloseButton = true,
  className = '',
  style = {},
  extensions = [],
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  
  // Process responsive props
  const responsiveProps = {
    variant,
    position,
  };
  
  // Generate responsive styles if needed
  let responsiveStyles = '';
  const hasResponsiveProps = Object.values(responsiveProps).some(isResponsiveObject);
  
  if (hasResponsiveProps) {
    // We'll handle these with classes, but we need to track if they're responsive
    const responsiveClasses = {};
    
    if (isResponsiveObject(variant)) {
      responsiveClasses.variant = variant;
    }
    
    if (isResponsiveObject(position)) {
      responsiveClasses.position = position;
    }
    
    // Create a CSS string for responsive styles
    responsiveStyles = JSON.stringify(responsiveClasses);
  }
  
  // Determine base values for non-responsive props
  const baseVariant = !isResponsiveObject(variant) ? variant : TOAST_VARIANTS.DEFAULT;
  const basePosition = !isResponsiveObject(position) ? position : TOAST_POSITIONS.BOTTOM_RIGHT;

  // Error handling for invalid variants
  if (baseVariant && !Object.values(TOAST_VARIANTS).includes(baseVariant)) {
    console.warn(`Toast: Invalid variant "${baseVariant}". Falling back to DEFAULT.`);
    variant = TOAST_VARIANTS.DEFAULT;
  }

  // Error handling for invalid positions
  if (basePosition && !Object.values(TOAST_POSITIONS).includes(basePosition)) {
    console.warn(`Toast: Invalid position "${basePosition}". Falling back to BOTTOM_RIGHT.`);
    position = TOAST_POSITIONS.BOTTOM_RIGHT;
  }

  // Safe close handler with error boundary
  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      try {
        onClose();
      } catch (error) {
        console.error('Toast: Error in onClose handler:', error);
      }
    }
  }, [onClose]);

  // Auto-dismiss effect
  useEffect(() => {
    let timer;
    if (isVisible && duration > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, duration, handleClose]);

  // Update visibility when prop changes
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('Toast', {
      as,
      children,
      variant: baseVariant,
      position: basePosition,
      visible: isVisible,
      duration,
      onClose: handleClose,
      icon,
      showCloseButton,
      className,
      style,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('Toast: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      as,
      children,
      variant: baseVariant,
      position: basePosition,
      visible: isVisible,
      duration,
      onClose: handleClose,
      icon,
      showCloseButton,
      className,
      style,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    as: extendedAs,
    children: extendedChildren,
    variant: extendedVariant,
    position: extendedPosition,
    visible: extendedVisible,
    duration: extendedDuration,
    onClose: extendedOnClose,
    icon: extendedIcon,
    showCloseButton: extendedShowCloseButton,
    className: extendedClassName,
    style: extendedStyle,
    ...restProps
  } = extendedProps;
  
  // Don't render if not visible
  if (!extendedVisible) {
    return null;
  }
  
  // Combine class names
  const toastClasses = [
    TOAST_CLASS,
    `${TOAST_CLASS}-${extendedVariant}`,
    `${TOAST_CLASS}-${extendedPosition}`,
    extendedIcon ? `${TOAST_CLASS}-${TOAST_MODIFIERS.WITH_ICON}` : '',
    extendedShowCloseButton ? `${TOAST_CLASS}-${TOAST_MODIFIERS.WITH_CLOSE}` : '',
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Combine styles
  const toastStyles = {
    ...extendedStyle,
  };
  
  // If we have responsive styles, add them as a data attribute
  if (responsiveStyles) {
    toastStyles['--responsive-styles'] = responsiveStyles;
  }
  
  // Use Box for consistent rendering and polymorphic support
  return (
    <Box
      as={extendedAs}
      className={toastClasses}
      style={toastStyles}
      role="alert"
      aria-live="polite"
      {...restProps}
    >
      {extendedIcon && (
        <div className={`${TOAST_CLASS}-icon`}>
          {extendedIcon}
        </div>
      )}
      
      <div className={`${TOAST_CLASS}-content`}>
        {extendedChildren || 'Notification'}
      </div>
      
      {extendedShowCloseButton && (
        <button
          className={`${TOAST_CLASS}-close`}
          onClick={extendedOnClose}
          aria-label="Close notification"
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </Box>
  );
};

Toast.propTypes = {
  /** Element to render the Toast as */
  ...polymorphicPropTypes,
  /** Toast content */
  children: PropTypes.node.isRequired,
  /** Toast variant or responsive object */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TOAST_VARIANTS)),
    PropTypes.object,
  ]),
  /** Toast position or responsive object */
  position: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TOAST_POSITIONS)),
    PropTypes.object,
  ]),
  /** Whether the toast is visible */
  visible: PropTypes.bool,
  /** Duration in milliseconds before auto-dismissing (0 for no auto-dismiss) */
  duration: PropTypes.number,
  /** Callback when toast is closed */
  onClose: PropTypes.func,
  /** Icon to display in the toast */
  icon: PropTypes.node,
  /** Whether to show the close button */
  showCloseButton: PropTypes.bool,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Extensions to apply to the toast */
  extensions: PropTypes.arrayOf(PropTypes.string),
};

Toast.defaultProps = {
  as: 'div',
  variant: TOAST_VARIANTS.DEFAULT,
  position: TOAST_POSITIONS.BOTTOM_RIGHT,
  visible: true,
  duration: 3000,
  showCloseButton: true,
  className: '',
  style: {},
  extensions: [],
};

export default Toast;
