import React from 'react';
import FileUploader from './FileUploader';
import { FILE_UPLOADER_VARIANTS, FILE_UPLOADER_SIZES, ACCEPTED_FILE_TYPES } from './constants';

export default {
  title: 'Molecules/FileUploader',
  component: FileUploader,
  parameters: {
    docs: {
      description: {
        component: 'A versatile file upload component that supports drag and drop, file previews, and various customization options.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.values(FILE_UPLOADER_VARIANTS),
      description: 'Visual variant of the file uploader'
    },
    size: {
      control: { type: 'select' },
      options: Object.values(FILE_UPLOADER_SIZES),
      description: 'Size of the file uploader'
    },
    multiple: {
      control: 'boolean',
      description: 'Whether to allow multiple file selection'
    },
    maxFiles: {
      control: { type: 'number', min: 1 },
      description: 'Maximum number of files allowed (only applies when multiple is true)'
    },
    maxSize: {
      control: { type: 'number', min: 1024 },
      description: 'Maximum file size in bytes'
    },
    acceptedFileTypes: {
      control: { type: 'select' },
      options: Object.values(ACCEPTED_FILE_TYPES),
      description: 'Accepted file types (MIME types or file extensions)'
    },
    showFileList: {
      control: 'boolean',
      description: 'Whether to show the file list'
    },
    showPreview: {
      control: 'boolean',
      description: 'Whether to show file previews for images'
    },
    autoUpload: {
      control: 'boolean',
      description: 'Whether to automatically upload files after selection'
    },
    dragAndDrop: {
      control: 'boolean',
      description: 'Whether to enable drag and drop'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the file uploader is disabled'
    },
    uploadButtonText: {
      control: 'text',
      description: 'Text for the upload button'
    },
    browseButtonText: {
      control: 'text',
      description: 'Text for the browse button'
    },
    dropzoneText: {
      control: 'text',
      description: 'Text for the dropzone'
    },
    dropzoneSubtext: {
      control: 'text',
      description: 'Subtext for the dropzone'
    },
    onChange: { action: 'onChange' },
    onUpload: { action: 'onUpload' },
    onRemove: { action: 'onRemove' },
    onError: { action: 'onError' }
  }
};

// Default template
const Template = (args) => <FileUploader {...args} />;

// Basic example
export const Default = Template.bind({});
Default.args = {
  onChange: (files) => console.log('Files changed:', files),
  onUpload: (files, progressCallback) => {
    console.log('Uploading files:', files);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      files.forEach((_, index) => progressCallback(index, progress));
      if (progress >= 100) clearInterval(interval);
    }, 500);
    return new Promise(resolve => setTimeout(resolve, 5000));
  }
};

// Multiple files example
export const MultipleFiles = Template.bind({});
MultipleFiles.args = {
  ...Default.args,
  multiple: true,
  maxFiles: 5,
  showFileList: true,
  showPreview: true
};
MultipleFiles.parameters = {
  docs: {
    description: {
      story: 'FileUploader configured to accept multiple files with preview and file list.'
    }
  }
};

// Image upload example
export const ImageUpload = Template.bind({});
ImageUpload.args = {
  ...Default.args,
  acceptedFileTypes: ACCEPTED_FILE_TYPES.IMAGES,
  showPreview: true,
  dropzoneText: 'Drop images here',
  browseButtonText: 'Browse Images'
};
ImageUpload.parameters = {
  docs: {
    description: {
      story: 'FileUploader configured specifically for image uploads with preview.'
    }
  }
};

// Document upload example
export const DocumentUpload = Template.bind({});
DocumentUpload.args = {
  ...Default.args,
  acceptedFileTypes: ACCEPTED_FILE_TYPES.DOCUMENTS,
  showPreview: false,
  dropzoneText: 'Drop documents here',
  browseButtonText: 'Browse Documents'
};
DocumentUpload.parameters = {
  docs: {
    description: {
      story: 'FileUploader configured specifically for document uploads.'
    }
  }
};

// Auto upload example
export const AutoUpload = Template.bind({});
AutoUpload.args = {
  ...Default.args,
  autoUpload: true,
  dropzoneText: 'Files will upload automatically'
};
AutoUpload.parameters = {
  docs: {
    description: {
      story: 'FileUploader configured to automatically upload files after selection.'
    }
  }
};

// Card variant example
export const CardVariant = Template.bind({});
CardVariant.args = {
  ...Default.args,
  variant: FILE_UPLOADER_VARIANTS.CARD,
  size: FILE_UPLOADER_SIZES.LARGE
};
CardVariant.parameters = {
  docs: {
    description: {
      story: 'FileUploader with card variant and large size.'
    }
  }
};

// Compact variant example
export const CompactVariant = Template.bind({});
CompactVariant.args = {
  ...Default.args,
  variant: FILE_UPLOADER_VARIANTS.COMPACT,
  size: FILE_UPLOADER_SIZES.SMALL,
  dropzoneText: 'Upload files',
  dropzoneSubtext: ''
};
CompactVariant.parameters = {
  docs: {
    description: {
      story: 'FileUploader with compact variant and small size.'
    }
  }
};

// Disabled state example
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'FileUploader in disabled state.'
    }
  }
};
