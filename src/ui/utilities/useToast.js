/**
 * useToast Hook
 * 
 * A React hook for using the ToastService in components.
 */

import { useState, useEffect, useCallback } from 'react';
import toastService from './ToastService';

/**
 * Hook for using the ToastService in components
 * @returns {Object} Toast utilities and state
 */
const useToast = () => {
  const [toasts, setToasts] = useState(toastService.getToasts());

  // Update toasts when the service changes
  useEffect(() => {
    const unsubscribe = toastService.addListener(setToasts);
    return unsubscribe;
  }, []);

  // Show a toast notification
  const show = useCallback((options) => {
    return toastService.show(options);
  }, []);

  // Show a success toast
  const success = useCallback((contentOrOptions, options) => {
    return toastService.success(contentOrOptions, options);
  }, []);

  // Show an error toast
  const error = useCallback((contentOrOptions, options) => {
    return toastService.error(contentOrOptions, options);
  }, []);

  // Show a warning toast
  const warning = useCallback((contentOrOptions, options) => {
    return toastService.warning(contentOrOptions, options);
  }, []);

  // Show an info toast
  const info = useCallback((contentOrOptions, options) => {
    return toastService.info(contentOrOptions, options);
  }, []);

  // Remove a toast by ID
  const remove = useCallback((id) => {
    toastService.remove(id);
  }, []);

  // Remove all toasts
  const clear = useCallback(() => {
    toastService.clear();
  }, []);

  // Set the maximum number of toasts
  const setMaxToasts = useCallback((max) => {
    toastService.setMaxToasts(max);
  }, []);

  return {
    toasts,
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear,
    setMaxToasts,
  };
};

export default useToast;
