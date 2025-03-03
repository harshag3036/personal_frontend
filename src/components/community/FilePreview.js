import React, { useState, useEffect } from 'react';
import './FilePreview.css';

const getFileIcon = (type) => {
  if (type && type.startsWith('image/')) return '🖼️';
  switch (type) {
    case 'application/pdf':
      return '📄';
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return '📝';
    case 'text/plain':
      return '📃';
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return '📊';
    default:
      return '📎';
  }
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FilePreview = ({ file, onDelete, onDownload, showActions = true }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Check if file is a Blob or has a URL already
    if (file.type && file.type.startsWith('image/')) {
      if (file instanceof Blob) {
        // For actual file uploads (Blob objects)
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (file.url) {
        // For files from storage that already have URLs
        setPreview(file.url);
      } else if (file.metadata?.preview) {
        // For files that have a preview in metadata
        setPreview(file.metadata.preview);
      }
    }
    
    return () => {
      if (preview && typeof preview === 'string' && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file]);

  return (
    <div className="file-preview">
      <div className="preview-content">
        {file.type && file.type.startsWith('image/') ? (
          preview ? (
            <div className="image-preview">
              <img src={preview} alt={file.name} />
            </div>
          ) : (
            <div className="default-preview">
              <span className="file-icon">{getFileIcon(file.type)}</span>
            </div>
          )
        ) : (
          <div className="default-preview">
            <span className="file-icon">{getFileIcon(file.type)}</span>
          </div>
        )}
        <div className="file-info">
          <div className="file-name" title={file.name}>
            {file.name}
          </div>
          <div className="file-meta">
            {formatFileSize(file.size)} • {file.type && file.type.split('/')[1] ? file.type.split('/')[1].toUpperCase() : 'FILE'}
          </div>
        </div>
        {showActions && (
          <div className="file-actions">
            {onDownload && (
              <button
                type="button"
                className="action-button"
                onClick={() => onDownload(file)}
                title="Download"
              >
                ⬇️
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className="action-button"
                onClick={() => onDelete(file)}
                title="Remove"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
