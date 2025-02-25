import React, { useState, useEffect } from 'react';
import { useActivity } from '../../contexts/ActivityContext';
import FileUploader from './FileUploader';
import FilePreview from './FilePreview';
import './FileManager.css';

const FileManager = ({ activityId }) => {
  const { fileState, addFile, deleteFile, downloadFile } = useActivity();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    // Files are loaded through the ActivityContext
    setIsLoading(false);
  }, [activityId]);

  const handleFileUpload = async (file) => {
    try {
      await addFile(activityId, file);
    } catch (error) {
      setError(error.message || 'Failed to upload file');
    }
  };

  const handleFileDelete = async (file) => {
    try {
      await deleteFile(activityId, file.id);
    } catch (error) {
      setError(error.message || 'Failed to delete file');
    }
  };

  const handleFileDownload = async (file) => {
    try {
      await downloadFile(file);
    } catch (error) {
      setError(error.message || 'Failed to download file');
    }
  };

  const activityFiles = fileState.byActivity[activityId] 
    ? fileState.byActivity[activityId].map(id => fileState.byId[id]).filter(Boolean)
    : [];

  if (isLoading) {
    return (
      <div className="file-manager loading">
        <div className="spinner"></div>
        <p>Loading files...</p>
      </div>
    );
  }

  return (
    <div className="file-manager">
      <div className="file-manager-header">
        <h3>Files</h3>
        <div className="view-controls">
          <button
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            📱
          </button>
          <button
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            📋
          </button>
        </div>
      </div>

      <FileUploader onUpload={handleFileUpload} />

      {error && <div className="file-error">{error}</div>}

      {activityFiles.length > 0 ? (
        <div className={`file-list ${viewMode}`}>
          {activityFiles.map(file => (
            <FilePreview
              key={file.id}
              file={file}
              onDelete={handleFileDelete}
              onDownload={handleFileDownload}
            />
          ))}
        </div>
      ) : (
        <div className="no-files">
          <p>No files uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default FileManager;
