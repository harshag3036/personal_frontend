/**
 * Toast Service
 * 
 * A utility for managing toast notifications.
 */

import { TOAST_VARIANTS, TOAST_POSITIONS } from '../components/Toast';

// Unique ID generator for toasts
const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

class ToastService {
  constructor() {
    this.listeners = [];
    this.toasts = [];
    this.maxToasts = 5;
  }

  /**
   * Add a listener for toast changes
   * @param {Function} listener - Callback function that receives the current toasts array
   * @returns {Function} Function to remove the listener
   */
  addListener(listener) {
    if (typeof listener !== 'function') {
      console.warn('ToastService: Listener must be a function');
      return () => {};
    }

    this.listeners.push(listener);
    
    // Return a function to remove the listener
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of toast changes
   */
  notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.toasts);
      } catch (error) {
        console.error('ToastService: Error in listener:', error);
      }
    });
  }

  /**
   * Show a toast notification
   * @param {Object} options - Toast options
   * @param {string} options.content - Toast content
   * @param {string} [options.variant=TOAST_VARIANTS.DEFAULT] - Toast variant
   * @param {string} [options.position=TOAST_POSITIONS.BOTTOM_RIGHT] - Toast position
   * @param {number} [options.duration=3000] - Duration in milliseconds (0 for no auto-dismiss)
   * @param {React.ReactNode} [options.icon] - Icon to display in the toast
   * @param {boolean} [options.showCloseButton=true] - Whether to show the close button
   * @param {Function} [options.onClose] - Callback when toast is closed
   * @returns {string} Toast ID
   */
  show({
    content,
    variant = TOAST_VARIANTS.DEFAULT,
    position = TOAST_POSITIONS.BOTTOM_RIGHT,
    duration = 3000,
    icon,
    showCloseButton = true,
    onClose,
  }) {
    // Validate required parameters
    if (!content) {
      console.warn('ToastService: Toast content is required');
      return null;
    }

    // Validate variant
    if (variant && !Object.values(TOAST_VARIANTS).includes(variant)) {
      console.warn(`ToastService: Invalid variant "${variant}". Falling back to DEFAULT.`);
      variant = TOAST_VARIANTS.DEFAULT;
    }

    // Validate position
    if (position && !Object.values(TOAST_POSITIONS).includes(position)) {
      console.warn(`ToastService: Invalid position "${position}". Falling back to BOTTOM_RIGHT.`);
      position = TOAST_POSITIONS.BOTTOM_RIGHT;
    }

    // Generate a unique ID for the toast
    const id = generateId();

    // Create the toast object
    const toast = {
      id,
      content,
      variant,
      position,
      duration,
      icon,
      showCloseButton,
      onClose: () => {
        // Remove the toast
        this.remove(id);
        
        // Call the user-provided onClose callback
        if (onClose) {
          try {
            onClose(id);
          } catch (error) {
            console.error('ToastService: Error in onClose callback:', error);
          }
        }
      },
    };

    // Add the toast to the list
    this.toasts = [toast, ...this.toasts].slice(0, this.maxToasts);
    
    // Notify listeners
    this.notifyListeners();
    
    return id;
  }

  /**
   * Remove a toast by ID
   * @param {string} id - Toast ID
   */
  remove(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.notifyListeners();
  }

  /**
   * Remove all toasts
   */
  clear() {
    this.toasts = [];
    this.notifyListeners();
  }

  /**
   * Show a success toast
   * @param {string|Object} contentOrOptions - Toast content or options
   * @param {Object} [options] - Toast options
   * @returns {string} Toast ID
   */
  success(contentOrOptions, options = {}) {
    const toastOptions = typeof contentOrOptions === 'string'
      ? { content: contentOrOptions, ...options }
      : contentOrOptions;
    
    return this.show({
      ...toastOptions,
      variant: TOAST_VARIANTS.SUCCESS,
    });
  }

  /**
   * Show an error toast
   * @param {string|Object} contentOrOptions - Toast content or options
   * @param {Object} [options] - Toast options
   * @returns {string} Toast ID
   */
  error(contentOrOptions, options = {}) {
    const toastOptions = typeof contentOrOptions === 'string'
      ? { content: contentOrOptions, ...options }
      : contentOrOptions;
    
    return this.show({
      ...toastOptions,
      variant: TOAST_VARIANTS.ERROR,
    });
  }

  /**
   * Show a warning toast
   * @param {string|Object} contentOrOptions - Toast content or options
   * @param {Object} [options] - Toast options
   * @returns {string} Toast ID
   */
  warning(contentOrOptions, options = {}) {
    const toastOptions = typeof contentOrOptions === 'string'
      ? { content: contentOrOptions, ...options }
      : contentOrOptions;
    
    return this.show({
      ...toastOptions,
      variant: TOAST_VARIANTS.WARNING,
    });
  }

  /**
   * Show an info toast
   * @param {string|Object} contentOrOptions - Toast content or options
   * @param {Object} [options] - Toast options
   * @returns {string} Toast ID
   */
  info(contentOrOptions, options = {}) {
    const toastOptions = typeof contentOrOptions === 'string'
      ? { content: contentOrOptions, ...options }
      : contentOrOptions;
    
    return this.show({
      ...toastOptions,
      variant: TOAST_VARIANTS.INFO,
    });
  }

  /**
   * Set the maximum number of toasts to display
   * @param {number} max - Maximum number of toasts
   */
  setMaxToasts(max) {
    if (typeof max !== 'number' || max < 1) {
      console.warn('ToastService: maxToasts must be a positive number');
      return;
    }
    
    this.maxToasts = max;
    
    // Trim the toasts array if needed
    if (this.toasts.length > this.maxToasts) {
      this.toasts = this.toasts.slice(0, this.maxToasts);
      this.notifyListeners();
    }
  }

  /**
   * Get the current toasts
   * @returns {Array} Current toasts
   */
  getToasts() {
    return [...this.toasts];
  }
}

// Create a singleton instance
const toastService = new ToastService();

export default toastService;
