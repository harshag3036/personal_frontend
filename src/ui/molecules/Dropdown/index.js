import Dropdown, { useDropdown } from './Dropdown';
import DropdownTrigger from './DropdownTrigger';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';

// Re-export constants from constants.js
export { DROPDOWN_VARIANTS, DROPDOWN_SIZES, DROPDOWN_PLACEMENTS } from './constants';

// Export dropdown variants as constants
export { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDropdown };

// Default export
export default Dropdown;
