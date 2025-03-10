/**
 * StatusBadge Component Stories
 */

import React from 'react';
import StatusBadge from './StatusBadge';
import { STATUS_TYPES } from './constants';
import Box from '../../atoms/Box/Box';
import Flex from '../../atoms/Flex/Flex';
import Text from '../../atoms/Text/Text';

export default {
  title: 'Molecules/StatusBadge',
  component: StatusBadge,
  parameters: {
    docs: {
      description: {
        component: 'A specialized badge component for displaying activity statuses with consistent styling and behavior.'
      }
    }
  },
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: Object.values(STATUS_TYPES)
      },
      description: 'The status to display'
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      },
      description: 'The size of the badge'
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the status icon'
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the status label'
    },
    showDescription: {
      control: 'boolean',
      description: 'Whether to show the status description tooltip'
    },
    pill: {
      control: 'boolean',
      description: 'Whether the badge should have pill shape'
    }
  }
};

// Default story
export const Default = (args) => <StatusBadge {...args} />;
Default.args = {
  status: STATUS_TYPES.IN_PROGRESS,
  size: 'medium',
  showIcon: false,
  showLabel: true,
  showDescription: false,
  pill: true
};

// All status types
export const AllStatusTypes = () => (
  <Flex direction="column" gap="md">
    {Object.values(STATUS_TYPES).map((status) => (
      <Flex key={status} alignItems="center" gap="md">
        <Box width="150px">
          <Text>{status}</Text>
        </Box>
        <StatusBadge status={status} />
      </Flex>
    ))}
  </Flex>
);

// With icons
export const WithIcons = () => (
  <Flex direction="column" gap="md">
    {Object.values(STATUS_TYPES).map((status) => (
      <Flex key={status} alignItems="center" gap="md">
        <Box width="150px">
          <Text>{status}</Text>
        </Box>
        <StatusBadge status={status} showIcon />
      </Flex>
    ))}
  </Flex>
);

// Different sizes
export const Sizes = () => (
  <Flex direction="column" gap="md">
    <Flex alignItems="center" gap="md">
      <Box width="150px">
        <Text>Small</Text>
      </Box>
      <StatusBadge status={STATUS_TYPES.IN_PROGRESS} size="small" />
    </Flex>
    <Flex alignItems="center" gap="md">
      <Box width="150px">
        <Text>Medium</Text>
      </Box>
      <StatusBadge status={STATUS_TYPES.IN_PROGRESS} size="medium" />
    </Flex>
    <Flex alignItems="center" gap="md">
      <Box width="150px">
        <Text>Large</Text>
      </Box>
      <StatusBadge status={STATUS_TYPES.IN_PROGRESS} size="large" />
    </Flex>
  </Flex>
);

// With tooltips
export const WithTooltips = () => (
  <Flex direction="column" gap="md">
    {Object.values(STATUS_TYPES).map((status) => (
      <Flex key={status} alignItems="center" gap="md">
        <Box width="150px">
          <Text>{status}</Text>
        </Box>
        <StatusBadge status={status} showDescription />
      </Flex>
    ))}
  </Flex>
);

// Icon only
export const IconOnly = () => (
  <Flex direction="column" gap="md">
    {Object.values(STATUS_TYPES).map((status) => (
      <Flex key={status} alignItems="center" gap="md">
        <Box width="150px">
          <Text>{status}</Text>
        </Box>
        <StatusBadge status={status} showIcon showLabel={false} />
      </Flex>
    ))}
  </Flex>
);

// Pill vs Square
export const PillVsSquare = () => (
  <Flex direction="column" gap="md">
    <Flex alignItems="center" gap="md">
      <Box width="150px">
        <Text>Pill</Text>
      </Box>
      <StatusBadge status={STATUS_TYPES.COMPLETED} pill />
    </Flex>
    <Flex alignItems="center" gap="md">
      <Box width="150px">
        <Text>Square</Text>
      </Box>
      <StatusBadge status={STATUS_TYPES.COMPLETED} pill={false} />
    </Flex>
  </Flex>
);

// Full featured
export const FullFeatured = () => (
  <Flex direction="column" gap="md">
    {Object.values(STATUS_TYPES).map((status) => (
      <Flex key={status} alignItems="center" gap="md">
        <Box width="150px">
          <Text>{status}</Text>
        </Box>
        <StatusBadge 
          status={status} 
          showIcon 
          showDescription 
          size="medium"
        />
      </Flex>
    ))}
  </Flex>
);

// As different element
export const AsDifferentElement = () => (
  <Flex direction="column" gap="md">
    <Flex alignItems="center" gap="md">
      <Box width="150px">
        <Text>As span (default)</Text>
      </Box>
      <StatusBadge status={STATUS_TYPES.IN_PROGRESS} />
    </Flex>
    <Flex alignItems="center" gap="md">
      <Box width="150px">
        <Text>As div</Text>
      </Box>
      <StatusBadge as="div" status={STATUS_TYPES.IN_PROGRESS} />
    </Flex>
    <Flex alignItems="center" gap="md">
      <Box width="150px">
        <Text>As button</Text>
      </Box>
      <StatusBadge 
        as="button" 
        status={STATUS_TYPES.IN_PROGRESS} 
        onClick={() => alert('Status badge clicked!')}
      />
    </Flex>
  </Flex>
);

// Responsive props
export const ResponsiveProps = () => (
  <Flex direction="column" gap="md">
    <Text>Resize the window to see the changes</Text>
    <StatusBadge 
      status={STATUS_TYPES.IN_PROGRESS} 
      size={{ base: 'small', md: 'medium', lg: 'large' }}
      showIcon={{ base: false, md: true }}
    />
  </Flex>
);
