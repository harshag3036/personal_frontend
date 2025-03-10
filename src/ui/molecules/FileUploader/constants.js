/**
 * FileUploader Component Constants
 * 
 * This file contains constants used by the FileUploader component.
 */

// FileUploader variants
export const FILE_UPLOADER_VARIANTS = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  BORDERED: 'bordered',
  CARD: 'card',
};

// FileUploader sizes
export const FILE_UPLOADER_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

// FileUploader states
export const FILE_UPLOADER_STATES = {
  IDLE: 'idle',
  DRAGGING: 'dragging',
  UPLOADING: 'uploading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Accepted file types
export const ACCEPTED_FILE_TYPES = {
  ALL: '*/*',
  IMAGES: 'image/*',
  DOCUMENTS: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt',
  AUDIO: 'audio/*',
  VIDEO: 'video/*',
};

// Default props
export const DEFAULT_PROPS = {
  variant: FILE_UPLOADER_VARIANTS.DEFAULT,
  size: FILE_UPLOADER_SIZES.MEDIUM,
  multiple: false,
  maxFiles: 5,
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedFileTypes: ACCEPTED_FILE_TYPES.ALL,
  showFileList: true,
  showPreview: true,
  autoUpload: false,
  dragAndDrop: true,
  disabled: false,
};
