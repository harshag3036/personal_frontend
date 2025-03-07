import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Avatar from './Avatar';
import { AVATAR_STATUS, AVATAR_SHAPES, AVATAR_SIZES } from './index';

describe('Avatar Component', () => {
  test('renders with default props', () => {
    render(<Avatar data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement.tagName).toBe('DIV'); // Default element is 'div'
    expect(avatarElement.className).toContain('ui-avatar');
    expect(avatarElement.className).toContain('ui-avatar--size-md');
    expect(avatarElement.className).toContain('ui-avatar--shape-circle');
    expect(avatarElement.className).toContain('ui-avatar--initials');
  });

  test('renders with image', () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User Avatar';
    render(<Avatar src={src} alt={alt} data-testid="avatar" />);
    
    const avatarElement = screen.getByTestId('avatar');
    const imageElement = screen.getByAltText(alt);
    
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.tagName).toBe('IMG');
    expect(imageElement.src).toBe(src);
    expect(imageElement.className).toBe('ui-avatar__image');
  });

  test('renders with initials when no image is provided', () => {
    render(<Avatar initials="JD" data-testid="avatar" />);
    
    const avatarElement = screen.getByTestId('avatar');
    const initialsElement = screen.getByText('JD');
    
    expect(initialsElement).toBeInTheDocument();
    expect(initialsElement.className).toBe('ui-avatar__initials');
    expect(avatarElement.className).toContain('ui-avatar--initials');
  });

  test('renders with initials from alt text when no initials or image is provided', () => {
    render(<Avatar alt="John Doe" data-testid="avatar" />);
    
    const initialsElement = screen.getByText('J');
    
    expect(initialsElement).toBeInTheDocument();
  });

  test('renders with fallback when no initials, alt, or image is provided', () => {
    render(<Avatar data-testid="avatar" />);
    
    const initialsElement = screen.getByText('?');
    
    expect(initialsElement).toBeInTheDocument();
  });

  test('renders with custom size', () => {
    render(<Avatar size="lg" data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    
    expect(avatarElement.className).toContain('ui-avatar--size-lg');
  });

  test('renders with custom shape', () => {
    render(<Avatar shape="square" data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    
    expect(avatarElement.className).toContain('ui-avatar--shape-square');
  });

  test('renders with status indicator', () => {
    render(<Avatar status="online" data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    const statusElement = screen.getByLabelText('Status: online');
    
    expect(avatarElement.className).toContain('ui-avatar--status-online');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement.className).toContain('ui-avatar__status');
    expect(statusElement.className).toContain('ui-avatar__status--online');
  });

  test('renders with custom background color', () => {
    render(<Avatar backgroundColor="accent-primary" data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    
    expect(avatarElement).toHaveStyle('background-color: var(--color-accent-primary)');
  });

  test('renders as a different element', () => {
    render(<Avatar as="span" data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    
    expect(avatarElement.tagName).toBe('SPAN');
  });

  test('applies additional className', () => {
    render(<Avatar className="custom-class" data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    
    expect(avatarElement.className).toContain('custom-class');
  });

  test('applies additional styles', () => {
    render(<Avatar style={{ marginRight: '8px' }} data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    
    expect(avatarElement).toHaveStyle('margin-right: 8px');
  });

  test('passes through additional props', () => {
    render(<Avatar id="user-avatar" data-custom="value" data-testid="avatar" />);
    const avatarElement = screen.getByTestId('avatar');
    
    expect(avatarElement.id).toBe('user-avatar');
    expect(avatarElement.getAttribute('data-custom')).toBe('value');
  });

  test('falls back to initials when image fails to load', () => {
    render(<Avatar src="invalid-url.jpg" initials="JD" data-testid="avatar" />);
    
    const imageElement = screen.getByAltText('Avatar');
    fireEvent.error(imageElement);
    
    const initialsElement = screen.getByText('JD');
    expect(initialsElement).toBeInTheDocument();
  });

  test('renders with all status types', () => {
    Object.values(AVATAR_STATUS).forEach(status => {
      const { container, unmount } = render(<Avatar status={status} />);
      expect(container.querySelector(`.ui-avatar--status-${status}`)).toBeInTheDocument();
      unmount();
    });
  });

  test('renders with all shape types', () => {
    Object.values(AVATAR_SHAPES).forEach(shape => {
      const { container, unmount } = render(<Avatar shape={shape} />);
      expect(container.querySelector(`.ui-avatar--shape-${shape}`)).toBeInTheDocument();
      unmount();
    });
  });

  test('renders with all size types', () => {
    Object.values(AVATAR_SIZES).forEach(size => {
      const { container, unmount } = render(<Avatar size={size} />);
      expect(container.querySelector(`.ui-avatar--size-${size}`)).toBeInTheDocument();
      unmount();
    });
  });
});
