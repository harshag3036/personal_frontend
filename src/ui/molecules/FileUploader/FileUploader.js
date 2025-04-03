import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { polymorphicPropTypes } from '../../utilities/polymorphic';
import { isResponsiveObject, createResponsiveClassNames } from '../../utilities/responsive-props';
import { 
  FILE_UPLOADER_VARIANTS, 
  FILE_UPLOADER_SIZES, 
  FILE_UPLOADER_STATES,
  ACCEPTED_FILE_TYPES,
  DEFAULT_PROPS 
} from './constants';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import './FileUploader.css';

/**
 * FileUploader Component
 * 
 * A versatile file upload component that supports drag and drop, file previews,
 * and various customization options. Also supports render props for complete
 * customization of the UI.
 * 
 * @example
 * ```jsx
 * // Basic usage
 * <FileUploader
 *   onChange={handleFileChange}
 *   onUpload={handleFileUpload}
 * />
 * 
 * // With custom configuration
 * <FileUploader
 *   variant="card"
 *   size="large"
 *   multiple={true}
 *   maxFiles={3}
 *   maxSize={10 * 1024 * 1024} // 10MB
 *   acceptedFileTypes="image/*"
 *   showFileList={true}
 *   showPreview={true}
 *   onChange={handleFileChange}
 *   onUpload={handleFileUpload}
 * />
 * 
 * // With render props for complete customization
 * <FileUploader
 *   multiple={true}
 *   maxSize={10 * 1024 * 1024}
 *   onChange={handleFileChange}
 *   onUpload={handleFileUpload}
 * >
 *   {(uploaderState) => (
 *     <YourCustomUI 
 *       files={uploaderState.files}
 *       isUploading={uploaderState.state === 'uploading'}
 *       onBrowse={uploaderState.handleBrowseClick}
 *       onRemove={uploaderState.handleRemoveFile}
 *       onUpload={uploaderState.handleUpload}
 *     />
 *   )}
 * </FileUploader>
 * ```
 */
const FileUploader = ({
  as: Element = 'div',
  variant = DEFAULT_PROPS.variant,
  size = DEFAULT_PROPS.size,
  multiple = DEFAULT_PROPS.multiple,
  maxFiles = DEFAULT_PROPS.maxFiles,
  maxSize = DEFAULT_PROPS.maxSize,
  acceptedFileTypes = DEFAULT_PROPS.acceptedFileTypes,
  showFileList = DEFAULT_PROPS.showFileList,
  showPreview = DEFAULT_PROPS.showPreview,
  autoUpload = DEFAULT_PROPS.autoUpload,
  dragAndDrop = DEFAULT_PROPS.dragAndDrop,
  disabled = DEFAULT_PROPS.disabled,
  uploadButtonText = 'Upload',
  browseButtonText = 'Browse Files',
  dropzoneText = 'Drag and drop files here',
  dropzoneSubtext = 'or click to browse',
  className = '',
  style = {},
  onChange,
  onUpload,
  onRemove,
  onError,
  children,
  ...restProps
}) => {
  // Refs
  const fileInputRef = useRef(null);
  const dropzoneRef = useRef(null);

  // State
  const [files, setFiles] = useState([]);
  const [state, setState] = useState(FILE_UPLOADER_STATES.IDLE);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});

  // Handle responsive variants
  const variantClass = isResponsiveObject(variant)
    ? createResponsiveClassNames('ui-file-uploader', variant)
    : `ui-file-uploader--${variant}`;

  // Handle responsive sizes
  const sizeClass = isResponsiveObject(size)
    ? createResponsiveClassNames('ui-file-uploader', size)
    : `ui-file-uploader--${size}`;

  // Combine class names
  const fileUploaderClasses = [
    'ui-file-uploader',
    variantClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  // Dropzone class names
  const dropzoneClasses = [
    'ui-file-uploader__dropzone',
    state === FILE_UPLOADER_STATES.DRAGGING && 'ui-file-uploader__dropzone--dragging',
    state === FILE_UPLOADER_STATES.ERROR && 'ui-file-uploader__dropzone--error',
    state === FILE_UPLOADER_STATES.SUCCESS && 'ui-file-uploader__dropzone--success',
    disabled && 'ui-file-uploader__dropzone--disabled'
  ].filter(Boolean).join(' ');

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on file type
  const getFileIcon = (file) => {
    const fileType = file.type.split('/')[0];
    
    switch (fileType) {
      case 'image':
        return 'image';
      case 'video':
        return 'video';
      case 'audio':
        return 'audio';
      case 'application':
        if (file.name.endsWith('.pdf')) return 'pdf';
        if (file.name.match(/\.(doc|docx)$/i)) return 'document';
        if (file.name.match(/\.(xls|xlsx)$/i)) return 'spreadsheet';
        if (file.name.match(/\.(ppt|pptx)$/i)) return 'presentation';
        return 'file';
      default:
        return 'file';
    }
  };

  // Validate files
  const validateFiles = (fileList) => {
    const validFiles = [];
    const errors = [];

    // Convert FileList to array
    const fileArray = Array.from(fileList);

    // Check if too many files
    if (multiple && fileArray.length + files.length > maxFiles) {
      errors.push(`You can only upload a maximum of ${maxFiles} files.`);
      return { validFiles, errors };
    }

    // Validate each file
    fileArray.forEach(file => {
      // Check file size
      if (file.size > maxSize) {
        errors.push(`File "${file.name}" exceeds the maximum size of ${formatFileSize(maxSize)}.`);
        return;
      }

      // Check file type if acceptedFileTypes is not all files
      if (acceptedFileTypes !== ACCEPTED_FILE_TYPES.ALL) {
        const fileTypePattern = acceptedFileTypes.split(',').map(type => type.trim());
        const isValidType = fileTypePattern.some(pattern => {
          if (pattern.startsWith('.')) {
            // Extension check
            return file.name.toLowerCase().endsWith(pattern.toLowerCase());
          } else if (pattern.includes('*')) {
            // MIME type with wildcard
            const [category, subtype] = pattern.split('/');
            const [fileCategory, fileSubtype] = file.type.split('/');
            
            if (category === '*') return true;
            if (category === fileCategory && (subtype === '*' || subtype === fileSubtype)) {
              return true;
            }
            return false;
          } else {
            // Exact MIME type match
            return file.type === pattern;
          }
        });

        if (!isValidType) {
          errors.push(`File "${file.name}" has an invalid file type.`);
          return;
        }
      }

      // Add file with additional metadata
      validFiles.push({
        file,
        id: `file-${Date.now()}-${file.name}`,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending',
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      });
    });

    return { validFiles, errors };
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    if (disabled) return;
    
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) return;

    const { validFiles, errors } = validateFiles(fileList);

    if (errors.length > 0) {
      setError(errors.join(' '));
      setState(FILE_UPLOADER_STATES.ERROR);
      if (onError) onError(errors);
    } else {
      setError(null);
      setState(FILE_UPLOADER_STATES.IDLE);
      
      // Update files state
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      
      // Call onChange callback
      if (onChange) onChange(newFiles.map(f => f.file));
      
      // Auto upload if enabled
      if (autoUpload && onUpload) {
        handleUpload(newFiles);
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle drag events
  const handleDragEnter = useCallback((event) => {
    if (disabled || !dragAndDrop) return;
    
    event.preventDefault();
    event.stopPropagation();
    setState(FILE_UPLOADER_STATES.DRAGGING);
  }, [disabled, dragAndDrop]);

  const handleDragOver = useCallback((event) => {
    if (disabled || !dragAndDrop) return;
    
    event.preventDefault();
    event.stopPropagation();
    setState(FILE_UPLOADER_STATES.DRAGGING);
  }, [disabled, dragAndDrop]);

  const handleDragLeave = useCallback((event) => {
    if (disabled || !dragAndDrop) return;
    
    event.preventDefault();
    event.stopPropagation();
    setState(FILE_UPLOADER_STATES.IDLE);
  }, [disabled, dragAndDrop]);

  const handleDrop = useCallback((event) => {
    if (disabled || !dragAndDrop) return;
    
    event.preventDefault();
    event.stopPropagation();
    setState(FILE_UPLOADER_STATES.IDLE);
    
    const fileList = event.dataTransfer.files;
    if (!fileList || fileList.length === 0) return;

    const { validFiles, errors } = validateFiles(fileList);

    if (errors.length > 0) {
      setError(errors.join(' '));
      setState(FILE_UPLOADER_STATES.ERROR);
      if (onError) onError(errors);
    } else {
      setError(null);
      
      // Update files state
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      
      // Call onChange callback
      if (onChange) onChange(newFiles.map(f => f.file));
      
      // Auto upload if enabled
      if (autoUpload && onUpload) {
        handleUpload(newFiles);
      }
    }
  }, [disabled, dragAndDrop, files, multiple, onChange, onError, onUpload, autoUpload, validateFiles]);

  // Handle file removal
  const handleRemoveFile = (fileId) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    setFiles(updatedFiles);
    
    // Call onRemove callback
    if (onRemove) {
      const removedFile = files.find(file => file.id === fileId);
      if (removedFile) onRemove(removedFile.file);
    }
    
    // Call onChange callback
    if (onChange) onChange(updatedFiles.map(f => f.file));
    
    // Reset error state if no files
    if (updatedFiles.length === 0) {
      setError(null);
      setState(FILE_UPLOADER_STATES.IDLE);
    }
  };

  // Handle file upload
  const handleUpload = async (filesToUpload = files) => {
    if (disabled || filesToUpload.length === 0) return;
    
    setState(FILE_UPLOADER_STATES.UPLOADING);
    
    try {
      if (onUpload) {
        // Initialize progress for each file
        const initialProgress = {};
        filesToUpload.forEach(file => {
          initialProgress[file.id] = 0;
        });
        setUploadProgress(initialProgress);
        
        // Call onUpload callback with files and progress callback
        await onUpload(
          filesToUpload.map(f => f.file),
          (fileIndex, progress) => {
            setUploadProgress(prev => ({
              ...prev,
              [filesToUpload[fileIndex].id]: progress
            }));
          }
        );
        
        setState(FILE_UPLOADER_STATES.SUCCESS);
      }
    } catch (err) {
      setState(FILE_UPLOADER_STATES.ERROR);
      setError(err.message || 'Upload failed');
      if (onError) onError([err.message || 'Upload failed']);
    }
  };

  // Handle browse button click
  const handleBrowseClick = () => {
    if (disabled) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  // Add drag and drop event listeners
  useEffect(() => {
    const dropzone = dropzoneRef.current;
    if (dropzone && dragAndDrop) {
      dropzone.addEventListener('dragenter', handleDragEnter);
      dropzone.addEventListener('dragover', handleDragOver);
      dropzone.addEventListener('dragleave', handleDragLeave);
      dropzone.addEventListener('drop', handleDrop);
      
      return () => {
        dropzone.removeEventListener('dragenter', handleDragEnter);
        dropzone.removeEventListener('dragover', handleDragOver);
        dropzone.removeEventListener('dragleave', handleDragLeave);
        dropzone.removeEventListener('drop', handleDrop);
      };
    }
  }, [dragAndDrop, handleDragEnter, handleDragOver, handleDragLeave, handleDrop]);

  // Create uploaderState for render props
  const uploaderState = {
    // File state
    files,
    state,
    error,
    uploadProgress,
    
    // File operations
    handleBrowseClick,
    handleFileSelect,
    handleRemoveFile,
    handleUpload,
    
    // Refs
    fileInputRef,
    dropzoneRef,
    
    // Utility functions
    formatFileSize,
    getFileIcon,
    
    // Configuration
    disabled,
    multiple,
    maxFiles,
    maxSize,
    acceptedFileTypes,
    dragAndDrop,
    autoUpload,
  };

  // If children is a function, use render props pattern
  if (typeof children === 'function') {
    return (
      <Element className={fileUploaderClasses} style={style} {...restProps}>
        <input
          ref={fileInputRef}
          type="file"
          className="ui-file-uploader__input"
          accept={acceptedFileTypes}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          aria-hidden="true"
          tabIndex="-1"
        />
        {children(uploaderState)}
      </Element>
    );
  }

  // Otherwise, render the default UI
  return (
    <Element className={fileUploaderClasses} style={style} {...restProps}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="ui-file-uploader__input"
        accept={acceptedFileTypes}
        multiple={multiple}
        onChange={handleFileSelect}
        disabled={disabled}
        aria-hidden="true"
        tabIndex="-1"
      />
      
      {/* Dropzone */}
      <div
        ref={dropzoneRef}
        className={dropzoneClasses}
        onClick={handleBrowseClick}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBrowseClick();
          }
        }}
      >
        <div className="ui-file-uploader__icon">
          <Icon name="upload" size="lg" />
        </div>
        
        <Text className="ui-file-uploader__text">{dropzoneText}</Text>
        {dragAndDrop && <Text className="ui-file-uploader__subtext">{dropzoneSubtext}</Text>}
        
        <Button 
          variant="primary" 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            handleBrowseClick();
          }}
          disabled={disabled}
          style={{ marginTop: 'var(--ui-spacing-sm)' }}
        >
          {browseButtonText}
        </Button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="ui-file-uploader__error">
          {error}
        </div>
      )}
      
      {/* File preview */}
      {showPreview && files.length > 0 && files.some(file => file.preview) && (
        <div className="ui-file-uploader__preview">
          {files.filter(file => file.preview).map(file => (
            <div key={file.id} className="ui-file-uploader__preview-item">
              <img 
                src={file.preview} 
                alt={file.name} 
                className="ui-file-uploader__preview-image" 
              />
              <button
                type="button"
                className="ui-file-uploader__preview-remove"
                onClick={() => handleRemoveFile(file.id)}
                aria-label={`Remove ${file.name}`}
              >
                <Icon name="close" size="xs" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* File list */}
      {showFileList && files.length > 0 && (
        <ul className="ui-file-uploader__file-list">
          {files.map(file => (
            <li key={file.id} className="ui-file-uploader__file-item">
              <div className="ui-file-uploader__file-icon">
                <Icon name={getFileIcon(file)} />
              </div>
              
              <div className="ui-file-uploader__file-info">
                <span className="ui-file-uploader__file-name">{file.name}</span>
                <span className="ui-file-uploader__file-size">{formatFileSize(file.size)}</span>
                
                {/* Progress bar */}
                {state === FILE_UPLOADER_STATES.UPLOADING && (
                  <div className="ui-file-uploader__progress">
                    <div 
                      className="ui-file-uploader__progress-bar" 
                      style={{ width: `${uploadProgress[file.id] || 0}%` }}
                    />
                  </div>
                )}
              </div>
              
              <div className="ui-file-uploader__file-actions">
                <button
                  type="button"
                  className="ui-file-uploader__file-remove"
                  onClick={() => handleRemoveFile(file.id)}
                  aria-label={`Remove ${file.name}`}
                >
                  <Icon name="close" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {/* Upload button */}
      {!autoUpload && files.length > 0 && onUpload && (
        <Button
          variant="primary"
          onClick={() => handleUpload()}
          disabled={disabled || state === FILE_UPLOADER_STATES.UPLOADING}
          style={{ marginTop: 'var(--ui-spacing-sm)' }}
        >
          {state === FILE_UPLOADER_STATES.UPLOADING ? (
            <>
              <Icon name="spinner" className="ui-button__icon ui-button__icon--spin" />
              Uploading...
            </>
          ) : uploadButtonText}
        </Button>
      )}
    </Element>
  );
};

FileUploader.propTypes = {
  /** Element to render the FileUploader as */
  ...polymorphicPropTypes,
  /** Visual variant of the file uploader */
  variant: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(FILE_UPLOADER_VARIANTS)),
    PropTypes.object, // For responsive variants
  ]),
  /** Size of the file uploader */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(FILE_UPLOADER_SIZES)),
    PropTypes.object, // For responsive sizes
  ]),
  /** Whether to allow multiple file selection */
  multiple: PropTypes.bool,
  /** Maximum number of files allowed (only applies when multiple is true) */
  maxFiles: PropTypes.number,
  /** Maximum file size in bytes */
  maxSize: PropTypes.number,
  /** Accepted file types (MIME types or file extensions) */
  acceptedFileTypes: PropTypes.string,
  /** Whether to show the file list */
  showFileList: PropTypes.bool,
  /** Whether to show file previews for images */
  showPreview: PropTypes.bool,
  /** Whether to automatically upload files after selection */
  autoUpload: PropTypes.bool,
  /** Whether to enable drag and drop */
  dragAndDrop: PropTypes.bool,
  /** Whether the file uploader is disabled */
  disabled: PropTypes.bool,
  /** Text for the upload button */
  uploadButtonText: PropTypes.string,
  /** Text for the browse button */
  browseButtonText: PropTypes.string,
  /** Text for the dropzone */
  dropzoneText: PropTypes.string,
  /** Subtext for the dropzone */
  dropzoneSubtext: PropTypes.string,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles */
  style: PropTypes.object,
  /** Callback when files are selected or removed */
  onChange: PropTypes.func,
  /** Callback when files are uploaded */
  onUpload: PropTypes.func,
  /** Callback when a file is removed */
  onRemove: PropTypes.func,
  /** Callback when an error occurs */
  onError: PropTypes.func,
};

FileUploader.defaultProps = {
  as: 'div',
  variant: DEFAULT_PROPS.variant,
  size: DEFAULT_PROPS.size,
  multiple: DEFAULT_PROPS.multiple,
  maxFiles: DEFAULT_PROPS.maxFiles,
  maxSize: DEFAULT_PROPS.maxSize,
  acceptedFileTypes: DEFAULT_PROPS.acceptedFileTypes,
  showFileList: DEFAULT_PROPS.showFileList,
  showPreview: DEFAULT_PROPS.showPreview,
  autoUpload: DEFAULT_PROPS.autoUpload,
  dragAndDrop: DEFAULT_PROPS.dragAndDrop,
  disabled: DEFAULT_PROPS.disabled,
  uploadButtonText: 'Upload',
  browseButtonText: 'Browse Files',
  dropzoneText: 'Drag and drop files here',
  dropzoneSubtext: 'or click to browse',
  className: '',
  style: {},
};

export default FileUploader;
