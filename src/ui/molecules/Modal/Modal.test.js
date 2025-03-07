import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './index';

// Mock createPortal to make testing portals easier
jest.mock('react-dom', () => {
  const originalModule = jest.requireActual('react-dom');
  return {
    ...originalModule,
    createPortal: (node) => node,
  };
});

describe('Modal Component', () => {
  test('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument();
  });

  test('renders content when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
  });

  test('calls onClose when overlay is clicked and closeOnOverlayClick is true', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={true}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  test('calls onClose when Escape key is pressed and closeOnEsc is true', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEsc={true}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when Escape key is pressed and closeOnEsc is false', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} closeOnEsc={false}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  test('applies size class correctly', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        <div>Modal Content</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('ui-modal--lg');
  });

  test('applies variant class correctly', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} variant="success">
        <div>Modal Content</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('ui-modal--success');
  });

  test('applies custom className correctly', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} className="custom-modal">
        <div>Modal Content</div>
      </Modal>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('custom-modal');
  });

  test('renders ModalHeader, ModalBody, and ModalFooter correctly', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
        <ModalFooter>
          <button>Close</button>
        </ModalFooter>
      </Modal>
    );
    
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  test('ModalHeader close button calls onClose when clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <ModalHeader onClose={handleClose}>Modal Title</ModalHeader>
        <ModalBody>Modal Content</ModalBody>
      </Modal>
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('adds ui-modal-open class to body when modal is open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(document.body).toHaveClass('ui-modal-open');
  });

  test('removes ui-modal-open class from body when modal is closed', async () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(document.body).toHaveClass('ui-modal-open');
    
    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    await waitFor(() => {
      expect(document.body).not.toHaveClass('ui-modal-open');
    });
  });
});
