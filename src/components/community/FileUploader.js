import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUploader.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = {
  'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
};

const FileUploader = ({ onUpload, disabled }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(file => {
        if (file.size > MAX_FILE_SIZE) {
          return 'File too large (max 5MB)';
        }
        return 'Invalid file type';
      });
      setError(errors[0]);
      return;
    }

    for (const file of acceptedFiles) {
      try {
        setIsUploading(true);
        setError(null);
        await onUpload(file);
      } catch (error) {
        setError(error.message || 'Failed to upload file');
      } finally {
        setIsUploading(false);
      }
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: disabled || isUploading,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_FILE_TYPES,
    multiple: true
  });

  return (
    <div className="file-uploader">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${disabled || isUploading ? 'disabled' : ''}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="upload-status">
            <div className="spinner"></div>
            <p>Uploading...</p>
          </div>
        ) : (
          <div className="upload-message">
            {isDragActive ? (
              <p>Drop files here</p>
            ) : (
              <>
                <p>Drag & drop files here, or click to select</p>
                <p className="file-types">
                  Accepted files: Images, PDF, DOC, DOCX, TXT, XLS, XLSX (max 5MB)
                </p>
              </>
            )}
          </div>
        )}
      </div>
      {error && <div className="upload-error">{error}</div>}
    </div>
  );
};

export default FileUploader;
