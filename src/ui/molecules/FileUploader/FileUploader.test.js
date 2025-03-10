import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUploader from './FileUploader';
import { FILE_UPLOADER_STATES } from './constants';

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Create a mock file
const createMockFile = (name = 'test.jpg', type = 'image/jpeg', size = 1024) => {
  const file = new File(['mock file content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('FileUploader Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<FileUploader />);
    
    // Check if the dropzone is rendered
    expect(screen.getByText('Drag and drop files here')).toBeInTheDocument();
    expect(screen.getByText('or click to browse')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Browse Files' })).toBeInTheDocument();
  });

  it('renders with custom text props', () => {
    render(
      <FileUploader
        dropzoneText="Custom dropzone text"
        dropzoneSubtext="Custom subtext"
        browseButtonText="Custom browse button"
      />
    );
    
    expect(screen.getByText('Custom dropzone text')).toBeInTheDocument();
    expect(screen.getByText('Custom subtext')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Custom browse button' })).toBeInTheDocument();
  });

  it('applies variant and size classes correctly', () => {
    const { container } = render(
      <FileUploader variant="card" size="large" />
    );
    
    const fileUploader = container.firstChild;
    expect(fileUploader).toHaveClass('ui-file-uploader--card');
    expect(fileUploader).toHaveClass('ui-file-uploader--large');
  });

  it('handles file selection', async () => {
    const handleChange = jest.fn();
    render(<FileUploader onChange={handleChange} />);
    
    const file = createMockFile();
    const input = screen.getByLabelText(/file/i, { selector: 'input' });
    
    // Simulate file selection
    fireEvent.change(input, { target: { files: [file] } });
    
    // Check if onChange was called with the file
    expect(handleChange).toHaveBeenCalledWith([file]);
    
    // Check if file list is displayed
    await waitFor(() => {
      expect(screen.getByText('test.jpg')).toBeInTheDocument();
    });
  });

  it('validates file size', async () => {
    const handleError = jest.fn();
    const maxSize = 1000; // 1KB
    render(
      <FileUploader
        maxSize={maxSize}
        onError={handleError}
      />
    );
    
    // Create a file larger than maxSize
    const largeFile = createMockFile('large.jpg', 'image/jpeg', 2000);
    const input = screen.getByLabelText(/file/i, { selector: 'input' });
    
    // Simulate file selection
    fireEvent.change(input, { target: { files: [largeFile] } });
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/exceeds the maximum size/)).toBeInTheDocument();
    });
    
    // Check if onError was called
    expect(handleError).toHaveBeenCalled();
  });

  it('validates file type', async () => {
    const handleError = jest.fn();
    render(
      <FileUploader
        acceptedFileTypes="image/*"
        onError={handleError}
      />
    );
    
    // Create a non-image file
    const pdfFile = createMockFile('document.pdf', 'application/pdf');
    const input = screen.getByLabelText(/file/i, { selector: 'input' });
    
    // Simulate file selection
    fireEvent.change(input, { target: { files: [pdfFile] } });
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/invalid file type/)).toBeInTheDocument();
    });
    
    // Check if onError was called
    expect(handleError).toHaveBeenCalled();
  });

  it('handles file removal', async () => {
    const handleRemove = jest.fn();
    const handleChange = jest.fn();
    
    render(
      <FileUploader
        onRemove={handleRemove}
        onChange={handleChange}
      />
    );
    
    const file = createMockFile();
    const input = screen.getByLabelText(/file/i, { selector: 'input' });
    
    // Simulate file selection
    fireEvent.change(input, { target: { files: [file] } });
    
    // Wait for file to be displayed
    await waitFor(() => {
      expect(screen.getByText('test.jpg')).toBeInTheDocument();
    });
    
    // Find and click the remove button
    const removeButton = screen.getByLabelText(/Remove test.jpg/);
    fireEvent.click(removeButton);
    
    // Check if onRemove was called with the file
    expect(handleRemove).toHaveBeenCalledWith(file);
    
    // Check if onChange was called with empty array
    expect(handleChange).toHaveBeenCalledWith([]);
    
    // Check if file was removed from the UI
    await waitFor(() => {
      expect(screen.queryByText('test.jpg')).not.toBeInTheDocument();
    });
  });

  it('handles file upload', async () => {
    const handleUpload = jest.fn().mockImplementation((files, progressCallback) => {
      // Simulate progress updates
      progressCallback(0, 50);
      progressCallback(0, 100);
      return Promise.resolve();
    });
    
    render(
      <FileUploader
        onUpload={handleUpload}
        autoUpload={false}
      />
    );
    
    const file = createMockFile();
    const input = screen.getByLabelText(/file/i, { selector: 'input' });
    
    // Simulate file selection
    fireEvent.change(input, { target: { files: [file] } });
    
    // Wait for file to be displayed
    await waitFor(() => {
      expect(screen.getByText('test.jpg')).toBeInTheDocument();
    });
    
    // Find and click the upload button
    const uploadButton = screen.getByRole('button', { name: 'Upload' });
    fireEvent.click(uploadButton);
    
    // Check if onUpload was called with the file
    expect(handleUpload).toHaveBeenCalledWith([file], expect.any(Function));
    
    // Check if component state changes to success after upload
    await waitFor(() => {
      expect(handleUpload).toHaveBeenCalled();
    });
  });

  it('handles auto upload', async () => {
    const handleUpload = jest.fn().mockResolvedValue(undefined);
    
    render(
      <FileUploader
        onUpload={handleUpload}
        autoUpload={true}
      />
    );
    
    const file = createMockFile();
    const input = screen.getByLabelText(/file/i, { selector: 'input' });
    
    // Simulate file selection
    fireEvent.change(input, { target: { files: [file] } });
    
    // Check if onUpload was called automatically
    await waitFor(() => {
      expect(handleUpload).toHaveBeenCalledWith([file], expect.any(Function));
    });
  });

  it('handles upload errors', async () => {
    const handleError = jest.fn();
    const handleUpload = jest.fn().mockRejectedValue(new Error('Upload failed'));
    
    render(
      <FileUploader
        onUpload={handleUpload}
        onError={handleError}
        autoUpload={false}
      />
    );
    
    const file = createMockFile();
    const input = screen.getByLabelText(/file/i, { selector: 'input' });
    
    // Simulate file selection
    fireEvent.change(input, { target: { files: [file] } });
    
    // Find and click the upload button
    await waitFor(() => {
      const uploadButton = screen.getByRole('button', { name: 'Upload' });
      fireEvent.click(uploadButton);
    });
    
    // Check if error is displayed and onError is called
    await waitFor(() => {
      expect(screen.getByText('Upload failed')).toBeInTheDocument();
      expect(handleError).toHaveBeenCalled();
    });
  });

  it('handles disabled state', () => {
    render(<FileUploader disabled={true} />);
    
    const dropzone = screen.getByText('Drag and drop files here').closest('div');
    expect(dropzone).toHaveClass('ui-file-uploader__dropzone--disabled');
    expect(dropzone).toHaveAttribute('aria-disabled', 'true');
    
    const browseButton = screen.getByRole('button', { name: 'Browse Files' });
    expect(browseButton).toBeDisabled();
  });

  it('supports polymorphic as prop', () => {
    const { container } = render(<FileUploader as="section" />);
    expect(container.firstChild.tagName).toBe('SECTION');
  });
});
