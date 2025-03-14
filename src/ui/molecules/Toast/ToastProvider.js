/**
 * ToastProvider Component
 * 
 * A provider component that renders the ToastContainer and provides toast functionality.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '../../utilities';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import ToastContainer from './ToastContainer';

/**
 * ToastProvider Component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {React.ElementType} [props.as='div'] - Element to render the ToastContainer as
 * @param {string} [props.position] - Default position for toasts
 * @param {number} [props.maxToasts=5] - Maximum number of toasts to display at once
 * @returns {JSX.Element} ToastProvider component
 */
const ToastProvider = ({
  children,
  as = 'div',
  position,
  maxToasts = 5,
}) => {
  const { toasts, setMaxToasts } = useToast();

  // Set the maximum number of toasts
  useEffect(() => {
    setMaxToasts(maxToasts);
  }, [maxToasts, setMaxToasts]);

  return (
    <>
      {children}
      <ToastContainer
        as={as}
        toasts={toasts}
        position={position}
        maxToasts={maxToasts}
      />
    </>
  );
};

ToastProvider.propTypes = {
  /** Child components */
  children: PropTypes.node.isRequired,
  /** Element to render the ToastContainer as */
  ...polymorphicPropTypes,
  /** Default position for toasts */
  position: PropTypes.string,
  /** Maximum number of toasts to display at once */
  maxToasts: PropTypes.number,
};

export default ToastProvider;
