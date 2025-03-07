import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';

// Export menu variants as constants
export const MENU_VARIANTS = {
  DEFAULT: 'default',
  LIGHT: 'light',
  DARK: 'dark',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// Export menu sizes as constants
export const MENU_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

// Export components
export { Menu, MenuItem, MenuDivider };

// Default export
export default Menu;
