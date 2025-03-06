/**
 * Toast Usage Example
 * 
 * This file demonstrates how to use the Toast component and related utilities.
 */

import React from 'react';
import { ToastProvider, Button } from '../components';
import { useToast, toastService } from '../utilities';

/**
 * Example component that uses the useToast hook
 */
const ToastExample = () => {
  // Use the hook to get toast utilities
  const { success, error, warning, info, clear } = useToast();

  const handleShowSuccess = () => {
    success('Operation completed successfully!');
  };

  const handleShowError = () => {
    error('An error occurred. Please try again.');
  };

  const handleShowWarning = () => {
    warning('This action cannot be undone.');
  };

  const handleShowInfo = () => {
    info('New updates are available.');
  };

  const handleShowCustom = () => {
    // Using the show method with custom options
    success({
      content: 'Custom success toast with longer duration',
      duration: 5000, // 5 seconds
      position: 'top-center',
      icon: '✅',
      onClose: () => console.log('Toast closed'),
    });
  };

  const handleClearAll = () => {
    clear();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Toast Examples</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button onClick={handleShowSuccess}>Show Success</Button>
        <Button onClick={handleShowError} variant="error">Show Error</Button>
        <Button onClick={handleShowWarning} variant="warning">Show Warning</Button>
        <Button onClick={handleShowInfo} variant="info">Show Info</Button>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button onClick={handleShowCustom} variant="primary">Show Custom</Button>
        <Button onClick={handleClearAll} variant="outlined">Clear All</Button>
      </div>
    </div>
  );
};

/**
 * Example of using the toastService directly
 */
const showToastProgrammatically = () => {
  // This can be called from anywhere, not just React components
  toastService.success('This toast was shown programmatically!');
};

/**
 * Example of setting up the ToastProvider in your app
 */
const App = () => {
  return (
    <ToastProvider position="bottom-right" maxToasts={5}>
      <ToastExample />
      {/* Rest of your app */}
    </ToastProvider>
  );
};

export { ToastExample, showToastProgrammatically, App };
