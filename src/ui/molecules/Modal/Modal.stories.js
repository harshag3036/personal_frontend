import React, { useState } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  MODAL_VARIANTS, 
  MODAL_SIZES 
} from './index';
import { Button, Text, Icon } from '../../atoms';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    componentSubtitle: 'A versatile modal dialog component for displaying content in a layer above the page',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    size: {
      control: {
        type: 'select',
        options: Object.values(MODAL_SIZES),
      },
      description: 'Size of the modal',
    },
    variant: {
      control: {
        type: 'select',
        options: Object.values(MODAL_VARIANTS),
      },
      description: 'Visual variant of the modal',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Whether to close the modal when the Escape key is pressed',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether to close the modal when the overlay is clicked',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when the modal should close',
    },
  },
};

// Template for creating stories
const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={handleClose}>
        <ModalHeader onClose={handleClose}>Modal Title</ModalHeader>
        <ModalBody>
          <Text>This is the content of the modal.</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleClose}>Save</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

// Basic modal
export const Basic = Template.bind({});
Basic.args = {
  size: MODAL_SIZES.MEDIUM,
  variant: MODAL_VARIANTS.DEFAULT,
  closeOnEsc: true,
  closeOnOverlayClick: true,
};

// Different sizes
export const Sizes = () => {
  const [size, setSize] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = (selectedSize) => {
    setSize(selectedSize);
    setIsOpen(true);
  };
  
  const handleClose = () => setIsOpen(false);
  
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {Object.entries(MODAL_SIZES).map(([key, value]) => (
        <Button key={value} onClick={() => handleOpen(value)}>
          {key.replace('_', ' ')} Modal
        </Button>
      ))}
      
      <Modal isOpen={isOpen} onClose={handleClose} size={size}>
        <ModalHeader onClose={handleClose}>
          {size?.toUpperCase()} Size Modal
        </ModalHeader>
        <ModalBody>
          <Text>This modal is using the {size} size variant.</Text>
          <div style={{ height: '100px' }}></div>
          <Text>Some extra content to demonstrate scrolling in larger modals.</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={handleClose}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

// Different variants
export const Variants = () => {
  const [variant, setVariant] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = (selectedVariant) => {
    setVariant(selectedVariant);
    setIsOpen(true);
  };
  
  const handleClose = () => setIsOpen(false);
  
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {Object.entries(MODAL_VARIANTS).map(([key, value]) => (
        <Button key={value} onClick={() => handleOpen(value)}>
          {key.replace('_', ' ')} Modal
        </Button>
      ))}
      
      <Modal isOpen={isOpen} onClose={handleClose} variant={variant}>
        <ModalHeader onClose={handleClose}>
          {variant?.toUpperCase()} Variant Modal
        </ModalHeader>
        <ModalBody>
          <Text>This modal is using the {variant} variant.</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={handleClose}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

// With form content
export const WithForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  return (
    <>
      <Button onClick={handleOpen}>Open Form Modal</Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalHeader onClose={handleClose}>Create New Item</ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Name
              </label>
              <input 
                type="text" 
                style={{ 
                  width: '100%', 
                  padding: '0.5rem',
                  border: '1px solid #ced4da',
                  borderRadius: '4px'
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Description
              </label>
              <textarea 
                style={{ 
                  width: '100%', 
                  padding: '0.5rem',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  minHeight: '100px'
                }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Category
              </label>
              <select 
                style={{ 
                  width: '100%', 
                  padding: '0.5rem',
                  border: '1px solid #ced4da',
                  borderRadius: '4px'
                }} 
              >
                <option>Select a category</option>
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleClose}>Create</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

// Alert modal
export const AlertModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  return (
    <>
      <Button onClick={handleOpen} variant="danger">Delete Item</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose} 
        variant={MODAL_VARIANTS.ERROR}
        size={MODAL_SIZES.SMALL}
      >
        <ModalHeader onClose={handleClose}>Confirm Deletion</ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              color: 'var(--color-error, #f56565)', 
              fontSize: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon name="warning" size="lg" />
            </div>
            <div>
              <Text weight="bold" mb="xs">Are you sure you want to delete this item?</Text>
              <Text size="sm" color="text-muted">This action cannot be undone.</Text>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleClose}>Delete</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

// Community-specific modal
export const CommunityModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  return (
    <>
      <Button onClick={handleOpen} variant="primary">View Activity Details</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={handleClose} 
        className="ui-modal--community"
      >
        <ModalHeader onClose={handleClose}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="activity" size="md" />
            <span>Weekly Discussion</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Text as="h3" mb="xs">Description</Text>
              <Text>
                Join our weekly discussion on various topics related to community building and engagement.
                This is a great opportunity to share your ideas and learn from others.
              </Text>
            </div>
            
            <div>
              <Text as="h3" mb="xs">Details</Text>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
                <Text weight="bold">Date:</Text>
                <Text>Every Friday</Text>
                
                <Text weight="bold">Time:</Text>
                <Text>3:00 PM - 4:00 PM</Text>
                
                <Text weight="bold">Location:</Text>
                <Text>Community Center</Text>
                
                <Text weight="bold">Participants:</Text>
                <Text>12 members</Text>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Join Activity</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
