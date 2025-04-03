import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Button,
  Icon,
  Grid,
} from '../atoms';
import Card from '../molecules/Card';
import FileUploader from '../molecules/FileUploader/FileUploader';
import { FILE_UPLOADER_STATES } from '../molecules/FileUploader/constants';

/**
 * FileUploaderRenderPropsExample
 * 
 * This example demonstrates how to use the FileUploader component with render props
 * to create highly customized file uploading interfaces.
 */
const FileUploaderRenderPropsExample = () => {
  return (
    <Box p="md">
      <Text as="h2" marginBottom="lg">Custom File Uploaders with Render Props</Text>
      
      {/* Basic Custom FileUploader */}
      <Text as="h3" marginBottom="md">Basic Custom FileUploader</Text>
      <Box marginBottom="xl">
        <BasicCustomFileUploader />
      </Box>
      
      {/* Advanced File Gallery */}
      <Text as="h3" marginY="md">Advanced File Gallery</Text>
      <Box marginBottom="xl">
        <AdvancedFileGallery />
      </Box>
      
      {/* Custom File Upload Process */}
      <Text as="h3" marginY="md">Custom File Upload Process</Text>
      <Box marginBottom="xl">
        <CustomFileUploadProcess />
      </Box>
    </Box>
  );
};

/**
 * BasicCustomFileUploader
 * 
 * Demonstrates a simple FileUploader implementation with custom UI using render props.
 */
const BasicCustomFileUploader = () => {
  const handleChange = (files) => {
    console.log('Files changed:', files);
  };
  
  const handleUpload = (files, progressCallback) => {
    console.log('Uploading files:', files);
    
    // Simulate upload progress
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        files.forEach((_, index) => {
          progressCallback(index, progress);
        });
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 500);
    });
  };
  
  return (
    <FileUploader
      acceptedFileTypes="image/*"
      multiple={true}
      maxFiles={5}
      onChange={handleChange}
      onUpload={handleUpload}
    >
      {(uploaderState) => (
        <Card padding="lg" backgroundColor="gray.50">
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Icon 
              name="upload-cloud" 
              size="3xl" 
              color="primary.500" 
              marginBottom="md" 
            />
            
            <Text fontSize="xl" fontWeight="bold" marginBottom="sm">
              Upload Your Images
            </Text>
            
            <Text textAlign="center" marginBottom="md" color="gray.600">
              Drag and drop your images here, or click the button below to browse your files.
              Only image files are accepted.
            </Text>
            
            <Button 
              variant="primary" 
              size="lg" 
              leftIcon="search"
              onClick={uploaderState.handleBrowseClick}
              marginBottom="lg"
            >
              Browse Files
            </Button>
            
            {uploaderState.error && (
              <Box 
                marginY="md" 
                padding="md" 
                backgroundColor="danger.100" 
                color="danger.700"
                borderRadius="md"
                width="100%"
              >
                <Text fontWeight="medium">{uploaderState.error}</Text>
              </Box>
            )}
            
            {uploaderState.files.length > 0 && (
              <Box width="100%">
                <Text fontWeight="bold" marginBottom="sm">
                  {uploaderState.files.length} file(s) selected
                </Text>
                
                <Flex flexWrap="wrap" gap="md">
                  {uploaderState.files.map(file => (
                    <Box 
                      key={file.id} 
                      position="relative" 
                      width="100px" 
                      height="100px"
                      borderRadius="md"
                      overflow="hidden"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      {file.preview ? (
                        <img 
                          src={file.preview} 
                          alt={file.name} 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                          }} 
                        />
                      ) : (
                        <Flex 
                          alignItems="center" 
                          justifyContent="center" 
                          height="100%"
                          backgroundColor="gray.100"
                        >
                          <Icon name={uploaderState.getFileIcon(file)} size="lg" />
                        </Flex>
                      )}
                      
                      {/* Overlay with progress or actions */}
                      <Box 
                        position="absolute" 
                        bottom="0" 
                        left="0" 
                        right="0"
                        padding="xs"
                        backgroundColor="rgba(0,0,0,0.6)"
                        color="white"
                      >
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text fontSize="xs" noOfLines={1}>
                            {file.name.length > 10 ? file.name.substring(0, 7) + '...' : file.name}
                          </Text>
                          <Button
                            variant="ghost"
                            size="xs"
                            color="white"
                            p="0"
                            minW="auto"
                            height="auto"
                            onClick={() => uploaderState.handleRemoveFile(file.id)}
                          >
                            <Icon name="x" size="sm" />
                          </Button>
                        </Flex>
                        
                        {uploaderState.state === FILE_UPLOADER_STATES.UPLOADING && (
                          <Box 
                            height="2px" 
                            backgroundColor="gray.200" 
                            marginTop="xs"
                            borderRadius="full"
                            overflow="hidden"
                          >
                            <Box 
                              height="100%" 
                              width={`${uploaderState.uploadProgress[file.id] || 0}%`}
                              backgroundColor="success.500"
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Flex>
                
                {uploaderState.state !== FILE_UPLOADER_STATES.UPLOADING && (
                  <Button
                    variant="primary"
                    marginTop="md"
                    width="100%"
                    onClick={() => uploaderState.handleUpload()}
                  >
                    Upload {uploaderState.files.length} Files
                  </Button>
                )}
                
                {uploaderState.state === FILE_UPLOADER_STATES.UPLOADING && (
                  <Button
                    variant="outline"
                    marginTop="md"
                    width="100%"
                    disabled
                  >
                    <Icon name="loader" className="ui-button__icon ui-button__icon--spin" mr="xs" />
                    Uploading...
                  </Button>
                )}
              </Box>
            )}
          </Flex>
        </Card>
      )}
    </FileUploader>
  );
};

/**
 * AdvancedFileGallery
 * 
 * Demonstrates a more complex file gallery with masonry layout and advanced UI.
 */
const AdvancedFileGallery = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 'pre-1', name: 'mountains.jpg', type: 'image/jpeg', preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&auto=format' },
    { id: 'pre-2', name: 'beach.jpg', type: 'image/jpeg', preview: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format' },
    { id: 'pre-3', name: 'forest.jpg', type: 'image/jpeg', preview: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=500&auto=format' },
  ]);
  
  const handleChange = (files) => {
    console.log('Files changed:', files);
  };
  
  const handleUpload = (files, progressCallback) => {
    console.log('Uploading files:', files);
    
    // Simulate upload progress
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        files.forEach((_, index) => {
          progressCallback(index, progress);
        });
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Add the new files to uploadedFiles
          const newUploadedFiles = files.map(file => {
            // Check if the file has an image preview
            if (file.type.startsWith('image/')) {
              return {
                id: `upload-${Date.now()}-${file.name}`,
                name: file.name,
                type: file.type,
                preview: URL.createObjectURL(file),
              };
            }
            
            return {
              id: `upload-${Date.now()}-${file.name}`,
              name: file.name,
              type: file.type,
            };
          });
          
          setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
          resolve();
        }
      }, 500);
    });
  };
  
  return (
    <Box>
      <FileUploader
        acceptedFileTypes="image/*"
        multiple={true}
        maxFiles={10}
        autoUpload={true}
        onChange={handleChange}
        onUpload={handleUpload}
      >
        {(uploaderState) => (
          <Box>
            {/* Gallery Header */}
            <Flex 
              justifyContent="space-between" 
              alignItems="center" 
              marginBottom="lg"
              backgroundColor="gray.100"
              padding="md"
              borderRadius="md"
            >
              <Text fontSize="xl" fontWeight="bold">Image Gallery</Text>
              
              <Button
                variant="primary"
                leftIcon="plus"
                onClick={uploaderState.handleBrowseClick}
              >
                Add Images
              </Button>
            </Flex>
            
            {/* Upload Feedback */}
            {uploaderState.state === FILE_UPLOADER_STATES.UPLOADING && (
              <Box 
                marginBottom="md" 
                padding="md" 
                backgroundColor="primary.50" 
                borderRadius="md"
              >
                <Flex alignItems="center">
                  <Icon name="loader" className="ui-icon--spin" color="primary.500" marginRight="sm" />
                  <Text>Uploading {uploaderState.files.length} images...</Text>
                </Flex>
              </Box>
            )}
            
            {uploaderState.error && (
              <Box 
                marginBottom="md" 
                padding="md" 
                backgroundColor="danger.100" 
                color="danger.700"
                borderRadius="md"
              >
                <Text fontWeight="medium">{uploaderState.error}</Text>
              </Box>
            )}
            
            {uploaderState.state === FILE_UPLOADER_STATES.SUCCESS && (
              <Box 
                marginBottom="md" 
                padding="md" 
                backgroundColor="success.100" 
                color="success.700"
                borderRadius="md"
              >
                <Flex alignItems="center">
                  <Icon name="check-circle" color="success.500" marginRight="sm" />
                  <Text fontWeight="medium">Files uploaded successfully!</Text>
                </Flex>
              </Box>
            )}
            
            {/* Masonry Gallery Layout */}
            <Grid
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              gap="md"
            >
              {uploadedFiles.map((file) => (
                <Card key={file.id} overflow="hidden" height="200px">
                  {file.preview ? (
                    <Box position="relative" height="100%">
                      <img 
                        src={file.preview} 
                        alt={file.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover'
                        }} 
                      />
                      <Box 
                        position="absolute" 
                        bottom="0" 
                        left="0" 
                        right="0" 
                        padding="sm"
                        backgroundColor="rgba(0,0,0,0.5)"
                        color="white"
                      >
                        <Text fontWeight="medium">{file.name}</Text>
                      </Box>
                    </Box>
                  ) : (
                    <Flex 
                      direction="column" 
                      alignItems="center" 
                      justifyContent="center" 
                      height="100%"
                      padding="md"
                    >
                      <Icon name="file" size="xl" color="gray.400" marginBottom="sm" />
                      <Text fontWeight="medium" textAlign="center">{file.name}</Text>
                    </Flex>
                  )}
                </Card>
              ))}
              
              {/* Upload Placeholder Card */}
              <Card 
                onClick={uploaderState.handleBrowseClick}
                cursor="pointer"
                _hover={{ borderColor: 'primary.500' }}
                borderStyle="dashed"
                height="200px"
              >
                <Flex 
                  direction="column" 
                  alignItems="center" 
                  justifyContent="center" 
                  height="100%"
                  padding="md"
                >
                  <Icon name="plus-circle" size="xl" color="gray.400" marginBottom="sm" />
                  <Text fontWeight="medium" textAlign="center">Add More Images</Text>
                </Flex>
              </Card>
            </Grid>
          </Box>
        )}
      </FileUploader>
    </Box>
  );
};

/**
 * CustomFileUploadProcess
 * 
 * Demonstrates a complex multi-step file upload process.
 */
const CustomFileUploadProcess = () => {
  const [step, setStep] = useState(1);
  
  const handleChange = (files) => {
    console.log('Files changed:', files);
  };
  
  const handleUpload = (files, progressCallback) => {
    console.log('Uploading files:', files);
    
    // Simulate upload progress
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        files.forEach((_, index) => {
          progressCallback(index, progress);
        });
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };
  
  return (
    <FileUploader
      acceptedFileTypes=".pdf,.doc,.docx,.jpg,.png"
      multiple={true}
      maxFiles={3}
      maxSize={10 * 1024 * 1024} // 10MB
      onChange={handleChange}
      onUpload={handleUpload}
    >
      {(uploaderState) => (
        <Card boxShadow="md">
          {/* Header with Steps */}
          <Box 
            borderBottom="1px solid" 
            borderColor="gray.200"
            padding="md"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="bold">Document Upload</Text>
              <Text>Step {step} of 3</Text>
            </Flex>
            
            <Flex marginTop="md">
              <Flex 
                direction="column" 
                alignItems="center" 
                flex="1"
              >
                <Box 
                  width="30px" 
                  height="30px" 
                  borderRadius="full" 
                  backgroundColor={step >= 1 ? 'primary.500' : 'gray.200'}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  {step > 1 ? <Icon name="check" /> : 1}
                </Box>
                <Text 
                  marginTop="xs" 
                  fontSize="sm"
                  fontWeight={step === 1 ? 'bold' : 'normal'}
                >
                  Select Files
                </Text>
              </Flex>
              
              <Box 
                flex="1" 
                height="2px" 
                backgroundColor={step > 1 ? 'primary.500' : 'gray.200'} 
                alignSelf="center"
                marginX="-10px"
              />
              
              <Flex 
                direction="column" 
                alignItems="center" 
                flex="1"
              >
                <Box 
                  width="30px" 
                  height="30px" 
                  borderRadius="full" 
                  backgroundColor={step >= 2 ? 'primary.500' : 'gray.200'}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  {step > 2 ? <Icon name="check" /> : 2}
                </Box>
                <Text 
                  marginTop="xs" 
                  fontSize="sm"
                  fontWeight={step === 2 ? 'bold' : 'normal'}
                >
                  Review
                </Text>
              </Flex>
              
              <Box 
                flex="1" 
                height="2px" 
                backgroundColor={step > 2 ? 'primary.500' : 'gray.200'} 
                alignSelf="center"
                marginX="-10px"
              />
              
              <Flex 
                direction="column" 
                alignItems="center" 
                flex="1"
              >
                <Box 
                  width="30px" 
                  height="30px" 
                  borderRadius="full" 
                  backgroundColor={step >= 3 ? 'primary.500' : 'gray.200'}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  3
                </Box>
                <Text 
                  marginTop="xs" 
                  fontSize="sm"
                  fontWeight={step === 3 ? 'bold' : 'normal'}
                >
                  Confirm
                </Text>
              </Flex>
            </Flex>
          </Box>
          
          {/* Body - Step 1: Select Files */}
          {step === 1 && (
            <Box padding="lg">
              <Text marginBottom="md">
                Please select the documents you want to upload. You can upload up to 3 files
                with a maximum size of 10MB each.
              </Text>
              
              <Flex 
                border="2px dashed" 
                borderColor="gray.300" 
                borderRadius="md" 
                padding="xl"
                alignItems="center"
                justifyContent="center"
                backgroundColor="gray.50"
                cursor="pointer"
                _hover={{ borderColor: 'primary.500' }}
                onClick={uploaderState.handleBrowseClick}
                marginBottom="md"
              >
                <Flex direction="column" alignItems="center">
                  <Icon name="upload-cloud" size="3xl" color="gray.400" marginBottom="md" />
                  <Text fontWeight="medium">Drag and drop your files here</Text>
                  <Text fontSize="sm" color="gray.600" marginBottom="md">
                    or click to browse (PDF, DOC, DOCX, JPG, PNG)
                  </Text>
                  <Button variant="primary" leftIcon="folder">Browse Files</Button>
                </Flex>
              </Flex>
              
              {uploaderState.error && (
                <Box 
                  marginY="md" 
                  padding="md" 
                  backgroundColor="danger.100" 
                  color="danger.700"
                  borderRadius="md"
                >
                  <Text fontWeight="medium">{uploaderState.error}</Text>
                </Box>
              )}
              
              {uploaderState.files.length > 0 && (
                <Box marginTop="lg">
                  <Text fontWeight="bold" marginBottom="sm">Selected Files:</Text>
                  
                  {uploaderState.files.map(file => (
                    <Flex 
                      key={file.id} 
                      marginBottom="sm" 
                      padding="md" 
                      border="1px solid" 
                      borderColor="gray.200"
                      borderRadius="md"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Flex alignItems="center">
                        <Icon name={uploaderState.getFileIcon(file)} size="lg" marginRight="md" />
                        <Box>
                          <Text fontWeight="medium">{file.name}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {uploaderState.formatFileSize(file.size)}
                          </Text>
                        </Box>
                      </Flex>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => uploaderState.handleRemoveFile(file.id)}
                      >
                        <Icon name="x" />
                      </Button>
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          )}
          
          {/* Body - Step 2: Review */}
          {step === 2 && (
            <Box padding="lg">
              <Text marginBottom="md">
                Please review your selection before uploading. You can remove files or go back
                to select different files.
              </Text>
              
              {uploaderState.files.map(file => (
                <Box 
                  key={file.id} 
                  marginBottom="md" 
                  padding="md" 
                  border="1px solid" 
                  borderColor="gray.200"
                  borderRadius="md"
                >
                  <Flex alignItems="center" marginBottom="sm">
                    <Icon name={uploaderState.getFileIcon(file)} size="lg" marginRight="md" />
                    <Box>
                      <Text fontWeight="bold">{file.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {uploaderState.formatFileSize(file.size)}
                      </Text>
                    </Box>
                  </Flex>
                  
                  {file.preview && (
                    <Box 
                      marginTop="sm" 
                      height="200px" 
                      borderRadius="md" 
                      overflow="hidden"
                    >
                      <img 
                        src={file.preview} 
                        alt={file.name} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain'
                        }} 
                      />
                    </Box>
                  )}
                </Box>
              ))}
              
              {uploaderState.files.length === 0 && (
                <Box 
                  padding="lg" 
                  backgroundColor="gray.50" 
                  borderRadius="md" 
                  textAlign="center"
                >
                  <Text>No files selected. Please go back and select files.</Text>
                </Box>
              )}
            </Box>
          )}
          
          {/* Body - Step 3: Confirm & Upload */}
          {step === 3 && (
            <Box padding="lg">
              {uploaderState.state === FILE_UPLOADER_STATES.UPLOADING ? (
                <Box textAlign="center">
                  <Icon 
                    name="loader" 
                    className="ui-icon--spin" 
                    size="3xl" 
                    color="primary.500" 
                    marginBottom="md" 
                  />
                  <Text fontSize="xl" fontWeight="bold" marginBottom="md">
                    Uploading Files
                  </Text>
                  <Text marginBottom="lg">Please wait while your files are being uploaded...</Text>
                  
                  {uploaderState.files.map(file => (
                    <Box 
                      key={file.id} 
                      marginBottom="md" 
                      padding="sm" 
                      border="1px solid" 
                      borderColor="gray.200"
                      borderRadius="md"
                    >
                      <Flex alignItems="center" marginBottom="xs">
                        <Text fontWeight="medium" flex="1">{file.name}</Text>
                        <Text>{Math.round(uploaderState.uploadProgress[file.id] || 0)}%</Text>
                      </Flex>
                      <Box 
                        height="4px" 
                        backgroundColor="gray.100" 
                        borderRadius="full"
                        overflow="hidden"
                      >
                        <Box 
                          height="100%" 
                          width={`${uploaderState.uploadProgress[file.id] || 0}%`} 
                          backgroundColor="primary.500"
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : uploaderState.state === FILE_UPLOADER_STATES.SUCCESS ? (
                <Box textAlign="center">
                  <Icon 
                    name="check-circle" 
                    size="3xl" 
                    color="success.500" 
                    marginBottom="md" 
                  />
                  <Text fontSize="xl" fontWeight="bold" marginBottom="md">
                    Upload Complete!
                  </Text>
                  <Text marginBottom="lg">
                    Your files have been successfully uploaded. You can now proceed with the next steps.
                  </Text>
                  <Button variant="primary" size="lg">Continue to Next Step</Button>
                </Box>
              ) : uploaderState.state === FILE_UPLOADER_STATES.ERROR ? (
                <Box textAlign="center">
                  <Icon 
                    name="alert-circle" 
                    size="3xl" 
                    color="danger.500" 
                    marginBottom="md" 
                  />
                  <Text fontSize="xl" fontWeight="bold" marginBottom="md">
                    Upload Failed
                  </Text>
                  <Text marginBottom="md" color="danger.500">
                    {uploaderState.error}
                  </Text>
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    marginRight="sm"
                  >
                    Go Back
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => uploaderState.handleUpload()}
                  >
                    Try Again
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Text marginBottom="lg">
                    You're about to upload {uploaderState.files.length} file(s). Click the button below to
                    start the upload process.
                  </Text>
                  
                  <Box 
                    padding="md" 
                    backgroundColor="primary.50" 
                    borderRadius="md" 
                    marginBottom="lg"
                  >
                    <Flex alignItems="center">
                      <Icon name="info" color="primary.500" marginRight="sm" />
                      <Text>
                        After uploading, your files will be processed and made available in your account.
                        This may take a few minutes depending on file sizes.
                      </Text>
                    </Flex>
                  </Box>
                  
                  <Box textAlign="center">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={() => uploaderState.handleUpload()}
                      disabled={uploaderState.files.length === 0}
                    >
                      Start Upload
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
          
          {/* Footer with Navigation */}
          <Flex 
            justifyContent="space-between" 
            alignItems="center"
            padding="md"
            borderTop="1px solid"
            borderColor="gray.200"
            backgroundColor="gray.50"
          >
            <Button
              variant="outline"
              onClick={() => setStep(prev => Math.max(prev - 1, 1))}
              visibility={step === 1 || uploaderState.state === FILE_UPLOADER_STATES.UPLOADING ? 'hidden' : 'visible'}
            >
              Back
            </Button>
            
            <Button
              variant="primary"
              onClick={() => setStep(prev => Math.min(prev + 1, 3))}
              visibility={
                step === 3 ||
                uploaderState.state === FILE_UPLOADER_STATES.UPLOADING ||
                uploaderState.state === FILE_UPLOADER_STATES.SUCCESS
                  ? 'hidden'
                  : 'visible'
              }
              disabled={step === 1 && uploaderState.files.length === 0}
            >
              Next
            </Button>
          </Flex>
        </Card>
      )}
    </FileUploader>
  );
};

export default FileUploaderRenderPropsExample;
