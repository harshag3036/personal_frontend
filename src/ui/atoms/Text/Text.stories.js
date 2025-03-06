/**
 * Text Component Stories
 */

import React from 'react';
import Text, { TEXT_VARIANTS, TEXT_MODIFIERS } from './index';
import Box from '../Box';

export default {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying text with consistent styling. This component extends the Box component with typography-specific properties.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(TEXT_VARIANTS),
      description: 'Typography variant or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'body1' },
      },
    },
    color: {
      control: 'text',
      description: 'Text color (from design tokens) or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'text-primary' },
      },
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment or responsive object',
      table: {
        type: { summary: 'string | object' },
        defaultValue: { summary: 'left' },
      },
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'bold'],
      description: 'Font weight or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    transform: {
      control: 'select',
      options: ['none', 'capitalize', 'uppercase', 'lowercase'],
      description: 'Text transform or responsive object',
      table: {
        type: { summary: 'string | object' },
      },
    },
    italic: {
      control: 'boolean',
      description: 'Italic style',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    as: {
      control: 'text',
      description: 'Element to render the Text as',
      table: {
        type: { summary: 'string | React.ComponentType' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    style: {
      control: 'object',
      description: 'Additional inline styles',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
    children: {
      control: 'text',
      description: 'Text content',
      table: {
        type: { summary: 'node' },
      },
    },
  },
};

// Basic Text
export const Basic = {
  args: {
    children: 'This is a basic text component',
  },
};

// All Typography Variants
export const TypographyVariants = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text variant="h1">Heading 1</Text>
    <Text variant="h2">Heading 2</Text>
    <Text variant="h3">Heading 3</Text>
    <Text variant="h4">Heading 4</Text>
    <Text variant="h5">Heading 5</Text>
    <Text variant="h6">Heading 6</Text>
    <Text variant="subtitle1">Subtitle 1</Text>
    <Text variant="subtitle2">Subtitle 2</Text>
    <Text variant="body1">Body 1 - This is the default text style used for most content.</Text>
    <Text variant="body2">Body 2 - A slightly smaller text style for secondary content.</Text>
    <Text variant="caption">Caption - Used for auxiliary information like image captions or helper text.</Text>
    <Text variant="overline">OVERLINE - USED FOR LABELS OR SECTION HEADERS</Text>
  </Box>
);

// Text Alignment
export const TextAlignment = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text align="left" variant="h6">Left Aligned (Default)</Text>
    <Text align="center" variant="h6">Center Aligned</Text>
    <Text align="right" variant="h6">Right Aligned</Text>
    <Text align="justify" variant="body1">
      Justify Aligned - This paragraph has justified text alignment. This means that the text will be stretched to ensure that each line has equal width. This is often used in print media like newspapers and books.
    </Text>
  </Box>
);

// Font Weights
export const FontWeights = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text weight="normal">Normal Weight (400)</Text>
    <Text weight="medium">Medium Weight (500)</Text>
    <Text weight="bold">Bold Weight (700)</Text>
  </Box>
);

// Text Transforms
export const TextTransforms = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text transform="none">Normal Text (No Transform)</Text>
    <Text transform="capitalize">capitalized text</Text>
    <Text transform="uppercase">uppercase text</Text>
    <Text transform="lowercase">LOWERCASE TEXT</Text>
  </Box>
);

// Italic Text
export const ItalicText = {
  args: {
    italic: true,
    children: 'This text is italicized',
  },
};

// Truncated Text
export const TruncatedText = {
  args: {
    truncate: true,
    width: '200px',
    children: 'This is a very long text that will be truncated with an ellipsis because it exceeds the container width',
  },
};

// Text Colors
export const TextColors = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text color="text-primary">Primary Text Color</Text>
    <Text color="text-secondary">Secondary Text Color</Text>
    <Text color="primary">Brand Primary Color</Text>
    <Text color="secondary">Brand Secondary Color</Text>
    <Text color="success">Success Color</Text>
    <Text color="warning">Warning Color</Text>
    <Text color="error">Error Color</Text>
    <Text color="info">Info Color</Text>
  </Box>
);

// Responsive Text
export const ResponsiveText = {
  args: {
    variant: {
      base: 'body1',
      sm: 'body1',
      md: 'h3',
      lg: 'h2',
      xl: 'h1',
    },
    align: {
      base: 'left',
      md: 'center',
    },
    color: {
      base: 'text-secondary',
      md: 'primary',
    },
    children: 'This text changes based on screen size',
  },
};

// Polymorphic As Prop
export const PolymorphicAs = {
  args: {
    as: 'label',
    htmlFor: 'example-input',
    children: 'This is a label element',
  },
};

// With Box Props
export const WithBoxProps = {
  args: {
    padding: 'md',
    margin: 'lg',
    background: 'background-secondary',
    borderRadius: 'md',
    shadow: 'sm',
    children: 'This text has Box props applied',
  },
};

// Text with BEM Modifiers
export const WithBEMModifiers = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text className={`ui-text--${TEXT_MODIFIERS.BOLD} ui-text--${TEXT_MODIFIERS.UPPERCASE}`}>
      Bold and Uppercase
    </Text>
    <Text className={`ui-text--${TEXT_MODIFIERS.ITALIC} ui-text--${TEXT_MODIFIERS.PRIMARY}`}>
      Italic and Primary Color
    </Text>
    <Text className={`ui-text--${TEXT_MODIFIERS.CENTER} ui-text--${TEXT_MODIFIERS.UNDERLINE}`}>
      Centered and Underlined
    </Text>
  </Box>
);

// Rich Text Example
export const RichTextExample = () => (
  <Box padding="lg" background="background-secondary" borderRadius="md">
    <Text variant="h2" color="primary" margin="0 0 md 0">
      Article Title
    </Text>
    <Text variant="subtitle1" color="text-secondary" margin="0 0 lg 0">
      Published on March 6, 2025 by John Doe
    </Text>
    <Text variant="body1" margin="0 0 md 0">
      This is the first paragraph of the article. It introduces the main topic and sets the stage for what follows.
    </Text>
    <Text variant="h4" color="primary" margin="lg 0 sm 0">
      Section Heading
    </Text>
    <Text variant="body1" margin="0 0 md 0">
      This is the second paragraph that goes into more detail about the topic. It might include some technical information or examples.
    </Text>
    <Text variant="body1" margin="0 0 lg 0">
      The final paragraph wraps up the article and provides a conclusion or summary of the main points discussed.
    </Text>
    <Text variant="caption" color="text-secondary" italic>
      This article is part of our educational series on UI components.
    </Text>
  </Box>
);

// Text with Decorations
export const TextDecorations = () => (
  <Box display="flex" flexDirection="column" gap="md">
    <Text className={`ui-text--${TEXT_MODIFIERS.UNDERLINE}`}>
      Underlined Text
    </Text>
    <Text className={`ui-text--${TEXT_MODIFIERS.LINE_THROUGH}`}>
      Text with Line Through
    </Text>
    <Text className={`ui-text--${TEXT_MODIFIERS.NO_DECORATION}`} as="a" href="#" style={{ color: 'blue' }}>
      Link with No Decoration
    </Text>
  </Box>
);
