/**
 * UI Component Library
 * 
 * This file exports all UI components from a centralized location to provide
 * a clean import experience for consumers.
 * 
 * Example usage:
 * ```jsx
 * import { Box, Flex, Button, Text } from 'src/ui';
 * 
 * const MyComponent = () => (
 *   <Box padding="md" backgroundColor="background.primary">
 *     <Flex direction="column" gap="md">
 *       <Text variant="h2">Welcome</Text>
 *       <Text>This is an example of the enhanced UI components.</Text>
 *       <Button variant="primary">Click Me</Button>
 *     </Flex>
 *   </Box>
 * );
 * ```
 */

// ============================================
// Component Exports
// ============================================

// Core layout components
export { default as Box } from './atoms/Box';
export { default as Flex } from './atoms/Flex';
export { default as Grid } from './atoms/Grid';
export { default as Stack } from './atoms/Stack';
export { default as Text } from './atoms/Text';

// Form components
export { default as Button } from './atoms/Button';
export { default as Input } from './atoms/Input';
export { default as Switch } from './atoms/Switch/Switch';

// Navigation components
export { default as Tabs, Tab, TabList, TabPanel } from './molecules/Tabs';

// Display components
export { default as Badge } from './atoms/Badge/Badge';
export { default as Divider } from './atoms/Divider/Divider';
export { default as Avatar } from './atoms/Avatar/Avatar';

// Container components
export { default as Card } from './molecules/Card';

// Theme utilities
export { default as useTheme } from './hooks/useTheme';
export { default as ThemeProvider } from './providers/ThemeProvider';

// ============================================
// Constants Exports
// ============================================

// Layout component constants
export { BOX_CLASS } from './atoms/Box';

export {
  FLEX_CLASS,
  FLEX_DIRECTIONS,
  FLEX_ALIGNMENTS,
  FLEX_JUSTIFICATIONS,
  FLEX_WRAPS,
  FLEX_GAP_SIZES,
} from './atoms/Flex';

export { GRID_CLASS } from './atoms/Grid';

export {
  STACK_CLASS,
  STACK_DIRECTIONS,
  STACK_SPACING,
  STACK_ALIGNMENTS,
  STACK_JUSTIFICATIONS,
  STACK_WRAPS,
  STACK_DIVIDER_TYPES,
} from './atoms/Stack';

// Text constants
export {
  TEXT_CLASS,
  TEXT_VARIANTS,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  TEXT_TRANSFORMS,
  TEXT_DECORATIONS,
  TEXT_ALIGNMENTS,
} from './atoms/Text';

// Form component constants
export {
  BUTTON_CLASS,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
} from './atoms/Button';

export {
  INPUT_CLASS,
  INPUT_SIZES,
  INPUT_TYPES,
  INPUT_VARIANTS,
} from './atoms/Input';

export {
  SWITCH_CLASS,
  SWITCH_SIZES,
  SWITCH_VARIANTS,
} from './atoms/Switch/constants';

// Navigation component constants
export {
  TAB_VARIANTS,
  TAB_SIZES
} from './molecules/Tabs';

// Display component constants
export {
  BADGE_CLASS,
  BADGE_VARIANTS,
  BADGE_SIZES,
} from './atoms/Badge/constants';

export {
  DIVIDER_CLASS,
  DIVIDER_VARIANTS,
  DIVIDER_ORIENTATIONS,
} from './atoms/Divider/constants';

export {
  AVATAR_CLASS,
  AVATAR_SIZES,
  AVATAR_VARIANTS,
} from './atoms/Avatar/constants';

// Container component constants
export {
  CARD_CLASS,
  CARD_VARIANTS,
  CARD_SIZES,
  CARD_ELEVATIONS,
} from './molecules/Card';
