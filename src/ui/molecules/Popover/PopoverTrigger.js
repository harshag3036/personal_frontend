import React from 'react';
import PropTypes from 'prop-types';
import { usePopover } from './Popover';

/**
 * PopoverTrigger Component
 * 
 * A component that wraps the trigger element for a Popover.
 * 
 * @example
 * ```jsx
 * <PopoverTrigger>
 *   <Button>Open Popover</Button>
 * </PopoverTrigger>
 * ```
 */
const PopoverTrigger = ({ children, ...restProps }) => {
  const { triggerRef, toggle, isOpen } = usePopover();
  
  // Clone the child element with the necessary props
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
    onClick: (e) => {
      toggle();
      children.props.onClick && children.props.onClick(e);
    },
    'aria-expanded': isOpen,
    'aria-haspopup': true,
    ...restProps,
  });
  
  return triggerElement;
};

PopoverTrigger.propTypes = {
  /** The trigger element */
  children: PropTypes.element.isRequired,
};

export default PopoverTrigger;
