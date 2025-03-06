# UI Library Documentation

This directory contains comprehensive documentation for the UI library. The documentation is organized into several guides that cover different aspects of the library.

## Documentation Structure

1. **UI-structure.md**: Overview of the UI library structure, including the atomic design principles and component organization.

2. **integration-guide.md**: Guide for integrating the UI library into projects, including installation, setup, and basic usage.

3. **component-api-guide.md**: API documentation for components, including props, methods, and examples.

4. **development-guide.md**: Guidelines for developing with the UI library, including component development, testing strategies, and best practices.

5. **implementation-plan.md**: Plan for implementing the UI library, including phases, tasks, resources, progress tracking, and roadmap for future development.

6. **atoms-guide.md**: Documentation for atomic components like Box, Flex, Grid, Text, Button, Badge, Input, Stack, and Divider.

7. **molecules-organisms-guide.md**: Documentation for molecular components like Card, Checkbox, Select, Textarea, Toast, and organism components like Form.

8. **theming-guide.md**: Guide for theming the UI library, including theme structure, switching themes, and enterprise recommendations.

9. **utilities-guide.md**: Documentation for utilities like component extension, CSS variables, responsive props, polymorphic components, and toast service.

## Usage

All documentation files are exported in `index.js` for easy access throughout the application:

```jsx
import { 
  UIStructure, 
  IntegrationGuide, 
  ComponentApiGuide, 
  DevelopmentGuide,
  ImplementationPlan,
  AtomsGuide,
  MoleculesOrganismsGuide,
  ThemingGuide,
  UtilitiesGuide
} from '../ui/docs';
```

## Archived Documentation

Older, more fragmented documentation files have been consolidated into the current structure and archived in the `archive` directory. See the README.md in that directory for more information.
