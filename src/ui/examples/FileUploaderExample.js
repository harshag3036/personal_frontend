import React, { useState } from 'react';
import FileUploader, { ACCEPTED_FILE_TYPES } from '../molecules/FileUploader';
import Text from '../atoms/Text';
import Stack from '../atoms/Stack';
import Button from '../atoms/Button';
import Card from '../molecules/Card';
import Flex from '../atoms/Flex';
import Box from '../atoms/Box';

/**
 * FileUploaderExample Component
 * 
 * This example demonstrates how to use the FileUploader component in a real-world scenario.
 * It includes examples for different use cases:
 * 1. Basic file upload
 * 2. Image upload with preview
 * 3. Document upload with validation
 */
const FileUploaderExample = () => {
  // State for uploaded files
  const [basicFiles, setBasicFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  
  // State for upload status
  const [basicUploadStatus, setBasicUploadStatus] = useState('idle');
  const [imageUploadStatus, setImageUploadStatus] = useState('idle');
  const [documentUploadStatus, setDocumentUploadStatus] = useState('idle');

  // Mock upload function
  const handleUpload = (files, progressCallback, setStatus) => {
    setStatus('uploading');
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      files.forEach((_, index) => progressCallback(index, progress));
      
      if (progress >= 100) {
        clearInterval(interval);
        setStatus('success');
      }
    }, 500);
    
    // Return a promise that resolves after "upload" is complete
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 5500);
    });
  };

  // Reset function
  const resetUploader = (setFiles, setStatus) => {
    setFiles([]);
    setStatus('idle');
  };

  return (
    <Stack spacing="lg">
      <Text variant="heading" size="lg">FileUploader Examples</Text>
      
      {/* Basic File Upload */}
      <Card>
        <Stack spacing="md">
          <Text variant="heading" size="md">Basic File Upload</Text>
          <Text>A simple file uploader that accepts any file type.</Text>
          
          <FileUploader
            onChange={setBasicFiles}
            onUpload={(files, progressCallback) => 
              handleUpload(files, progressCallback, setBasicUploadStatus)
            }
            onError={(errors) => console.error('Upload errors:', errors)}
          />
          
          {basicUploadStatus === 'success' && (
            <Box padding="md" backgroundColor="success-subtle" borderRadius="md">
              <Text color="success">
                Successfully uploaded {basicFiles.length} file(s)!
              </Text>
            </Box>
          )}
          
          {basicFiles.length > 0 && (
            <Flex justifyContent="flex-end">
              <Button 
                variant="secondary" 
                onClick={() => resetUploader(setBasicFiles, setBasicUploadStatus)}
              >
                Reset
              </Button>
            </Flex>
          )}
        </Stack>
      </Card>
      
      {/* Image Upload */}
      <Card>
        <Stack spacing="md">
          <Text variant="heading" size="md">Image Upload</Text>
          <Text>An image uploader with preview functionality.</Text>
          
          <FileUploader
            variant="bordered"
            acceptedFileTypes={ACCEPTED_FILE_TYPES.IMAGES}
            showPreview={true}
            dropzoneText="Drop images here"
            browseButtonText="Browse Images"
            onChange={setImageFiles}
            onUpload={(files, progressCallback) => 
              handleUpload(files, progressCallback, setImageUploadStatus)
            }
            onError={(errors) => console.error('Upload errors:', errors)}
          />
          
          {imageUploadStatus === 'success' && (
            <Box padding="md" backgroundColor="success-subtle" borderRadius="md">
              <Text color="success">
                Successfully uploaded {imageFiles.length} image(s)!
              </Text>
            </Box>
          )}
          
          {imageFiles.length > 0 && (
            <Flex justifyContent="flex-end">
              <Button 
                variant="secondary" 
                onClick={() => resetUploader(setImageFiles, setImageUploadStatus)}
              >
                Reset
              </Button>
            </Flex>
          )}
        </Stack>
      </Card>
      
      {/* Document Upload */}
      <Card>
        <Stack spacing="md">
          <Text variant="heading" size="md">Document Upload</Text>
          <Text>A document uploader with file type validation.</Text>
          
          <FileUploader
            variant="card"
            size="large"
            acceptedFileTypes={ACCEPTED_FILE_TYPES.DOCUMENTS}
            multiple={true}
            maxFiles={3}
            maxSize={10 * 1024 * 1024} // 10MB
            dropzoneText="Drop documents here"
            browseButtonText="Browse Documents"
            onChange={setDocumentFiles}
            onUpload={(files, progressCallback) => 
              handleUpload(files, progressCallback, setDocumentUploadStatus)
            }
            onError={(errors) => console.error('Upload errors:', errors)}
          />
          
          {documentUploadStatus === 'success' && (
            <Box padding="md" backgroundColor="success-subtle" borderRadius="md">
              <Text color="success">
                Successfully uploaded {documentFiles.length} document(s)!
              </Text>
            </Box>
          )}
          
          {documentFiles.length > 0 && (
            <Flex justifyContent="flex-end">
              <Button 
                variant="secondary" 
                onClick={() => resetUploader(setDocumentFiles, setDocumentUploadStatus)}
              >
                Reset
              </Button>
            </Flex>
          )}
        </Stack>
      </Card>
      
      {/* Usage Information */}
      <Card>
        <Stack spacing="md">
          <Text variant="heading" size="md">Implementation Notes</Text>
          
          <Text>The FileUploader component provides:</Text>
          <ul>
            <li>Drag and drop functionality</li>
            <li>File type validation</li>
            <li>File size validation</li>
            <li>Multiple file support</li>
            <li>Image preview</li>
            <li>Upload progress tracking</li>
            <li>Responsive design</li>
          </ul>
          
          <Text variant="heading" size="sm">Key Props</Text>
          <ul>
            <li><code>variant</code>: Visual style (default, compact, bordered, card)</li>
            <li><code>size</code>: Component size (small, medium, large)</li>
            <li><code>acceptedFileTypes</code>: Restrict file types</li>
            <li><code>multiple</code>: Allow multiple file selection</li>
            <li><code>maxFiles</code>: Maximum number of files</li>
            <li><code>maxSize</code>: Maximum file size in bytes</li>
            <li><code>showPreview</code>: Show image previews</li>
            <li><code>autoUpload</code>: Upload files automatically after selection</li>
          </ul>
          
          <Text variant="heading" size="sm">Callbacks</Text>
          <ul>
            <li><code>onChange</code>: Called when files are selected or removed</li>
            <li><code>onUpload</code>: Called when files are uploaded</li>
            <li><code>onRemove</code>: Called when a file is removed</li>
            <li><code>onError</code>: Called when an error occurs</li>
          </ul>
        </Stack>
      </Card>
    </Stack>
  );
};

export default FileUploaderExample;
