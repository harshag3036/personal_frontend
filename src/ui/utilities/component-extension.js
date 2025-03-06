/**
 * Component Extension Utilities
 * 
 * This file provides utilities for extending components with variants and extensions.
 */

// Store for component variants
const componentVariants = {};

// Store for component extensions
const componentExtensions = {};

/**
 * Register a component variant
 * 
 * @param {string} componentName - The name of the component
 * @param {string} variantName - The name of the variant
 * @param {Object} variantProps - The props for the variant
 * @returns {Object} The registered variant
 * 
 * @example
 * // Register a primary button variant
 * registerComponentVariant('Button', 'PRIMARY', {
 *   backgroundColor: 'var(--color-brand-500)',
 *   color: 'white',
 * });
 */
export function registerComponentVariant(componentName, variantName, variantProps) {
  // Initialize component variants if not exists
  if (!componentVariants[componentName]) {
    componentVariants[componentName] = {};
  }
  
  // Register variant
  componentVariants[componentName][variantName] = variantProps;
  
  return variantProps;
}

/**
 * Get component variants
 * 
 * @param {string} componentName - The name of the component
 * @returns {Object} The component variants
 * 
 * @example
 * // Get all button variants
 * const buttonVariants = getComponentVariants('Button');
 */
export function getComponentVariants(componentName) {
  return componentVariants[componentName] || {};
}

/**
 * Get component variant
 * 
 * @param {string} componentName - The name of the component
 * @param {string} variantName - The name of the variant
 * @returns {Object} The variant props
 * 
 * @example
 * // Get primary button variant
 * const primaryButton = getComponentVariant('Button', 'PRIMARY');
 */
export function getComponentVariant(componentName, variantName) {
  return componentVariants[componentName]?.[variantName] || null;
}

/**
 * Register a component extension
 * 
 * @param {string} componentName - The name of the component
 * @param {string} extensionName - The name of the extension
 * @param {Function} extensionFn - The extension function
 * @returns {Function} The registered extension
 * 
 * @example
 * // Register a tooltip extension for Button
 * registerComponentExtension('Button', 'tooltip', (props) => ({
 *   ...props,
 *   onMouseEnter: (e) => {
 *     // Show tooltip
 *     props.onMouseEnter?.(e);
 *   },
 *   onMouseLeave: (e) => {
 *     // Hide tooltip
 *     props.onMouseLeave?.(e);
 *   },
 * }));
 */
export function registerComponentExtension(componentName, extensionName, extensionFn) {
  // Initialize component extensions if not exists
  if (!componentExtensions[componentName]) {
    componentExtensions[componentName] = {};
  }
  
  // Register extension
  componentExtensions[componentName][extensionName] = extensionFn;
  
  return extensionFn;
}

/**
 * Get component extensions
 * 
 * @param {string} componentName - The name of the component
 * @returns {Object} The component extensions
 * 
 * @example
 * // Get all button extensions
 * const buttonExtensions = getComponentExtensions('Button');
 */
export function getComponentExtensions(componentName) {
  return componentExtensions[componentName] || {};
}

/**
 * Get component extension
 * 
 * @param {string} componentName - The name of the component
 * @param {string} extensionName - The name of the extension
 * @returns {Function} The extension function
 * 
 * @example
 * // Get tooltip extension for Button
 * const tooltipExtension = getComponentExtension('Button', 'tooltip');
 */
export function getComponentExtension(componentName, extensionName) {
  return componentExtensions[componentName]?.[extensionName] || null;
}

/**
 * Apply component extensions
 * 
 * @param {string} componentName - The name of the component
 * @param {Object} props - The component props
 * @param {Array<string>} extensionNames - The names of the extensions to apply
 * @returns {Object} The extended props
 * 
 * @example
 * // Apply tooltip and ripple extensions to Button
 * const extendedProps = applyComponentExtensions('Button', props, ['tooltip', 'ripple']);
 */
export function applyComponentExtensions(componentName, props, extensionNames) {
  // Get component extensions
  const extensions = getComponentExtensions(componentName);
  
  // Apply extensions
  let extendedProps = { ...props };
  
  extensionNames.forEach((extensionName) => {
    const extension = extensions[extensionName];
    
    if (extension) {
      extendedProps = extension(extendedProps);
    }
  });
  
  return extendedProps;
}

/**
 * Create a component with extension support
 * 
 * @param {string} componentName - The name of the component
 * @param {React.ComponentType} Component - The component to extend
 * @returns {React.ComponentType} The extended component
 * 
 * @example
 * // Create an extendable button component
 * const Button = createExtendableComponent('Button', (props) => (
 *   <button {...props}>{props.children}</button>
 * ));
 */
export function createExtendableComponent(componentName, Component) {
  return (props) => {
    // Get extensions from props
    const { extensions = [], ...restProps } = props;
    
    // Apply extensions
    const extendedProps = applyComponentExtensions(componentName, restProps, extensions);
    
    // Render component with extended props
    return <Component {...extendedProps} />;
  };
}

export default {
  registerComponentVariant,
  getComponentVariants,
  getComponentVariant,
  registerComponentExtension,
  getComponentExtensions,
  getComponentExtension,
  applyComponentExtensions,
  createExtendableComponent,
};
