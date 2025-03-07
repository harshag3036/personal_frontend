import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

// Export modal sizes as constants
export const MODAL_SIZES = {
  EXTRA_SMALL: 'xs',
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
  FULL: 'full',
};

// Export modal variants as constants
export const MODAL_VARIANTS = {
  DEFAULT: 'default',
  ALERT: 'alert',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// Export components
export { Modal, ModalHeader, ModalBody, ModalFooter };

// Default export
export default Modal;
