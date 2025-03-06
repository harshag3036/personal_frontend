/**
 * Color Tokens
 * 
 * This file defines the color palette and semantic color assignments for the design system.
 * The color palette contains the raw color values, while the semantic colors define how
 * these colors are used in the application.
 */

/**
 * Color Palette
 * 
 * The color palette is organized by color family, with each color having a range of shades.
 * The 500 shade is considered the "main" color in each family.
 */
export const colorPalette = {
  // Brand colors
  brand: {
    50: '#E6EDF5',
    100: '#C4D3E9',
    200: '#9DB3D9',
    300: '#7593C8',
    400: '#4E73B8',
    500: '#144272', // Primary
    600: '#0A2647', // Primary Dark
    700: '#081D38',
    800: '#051429',
    900: '#030A14',
  },
  
  // Accent colors
  accent: {
    50: '#E6F5EE',
    100: '#CEEADC',
    200: '#9DD6BA',
    300: '#6DC197',
    400: '#3CAD75',
    500: '#2E8B57', // Accent
    600: '#256F46',
    700: '#1C5334',
    800: '#123823',
    900: '#091C11',
  },
  
  // Neutral colors
  neutral: {
    50: '#FAFBFF', // Background
    100: '#F8FAFC',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B', // Text Tertiary
    600: '#475569', // Text Secondary
    700: '#334155',
    800: '#1E293B', // Text Primary
    900: '#0F172A',
  },
  
  // Status colors
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#2ECC71',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  
  warning: {
    50: '#FEF9E7',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F39C12',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#DC2626',
    600: '#B91C1C',
    700: '#991B1B',
    800: '#7F1D1D',
    900: '#450A0A',
  },
  
  info: {
    50: '#EBF5FB',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3498DB',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  
  // Additional colors from SharedComponents.css
  purple: {
    50: '#F5E9F7',
    100: '#EBD3EF',
    200: '#D7A7DF',
    300: '#C37BCF',
    400: '#AF4FBF',
    500: '#6A1B9A', // Purple from community card
    600: '#581680',
    700: '#461066',
    800: '#340B4D',
    900: '#220533',
  },
  
  blue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#1976D2', // Blue from community card
    600: '#1565C0',
    700: '#0D47A1',
    800: '#0A3880',
    900: '#072A60',
  },
};

/**
 * Semantic Colors
 * 
 * Semantic colors define how colors are used in the application.
 * They provide a layer of abstraction between the raw color values and their usage.
 */
export const colors = {
  // Background colors
  background: {
    primary: colorPalette.neutral[50],
    secondary: '#FFFFFF',
    tertiary: colorPalette.neutral[100],
    brand: colorPalette.brand[500],
    accent: colorPalette.accent[500],
    success: colorPalette.success[50],
    warning: colorPalette.warning[50],
    error: colorPalette.error[50],
    info: colorPalette.info[50],
  },
  
  // Text colors
  text: {
    primary: colorPalette.neutral[800],
    secondary: colorPalette.neutral[600],
    tertiary: colorPalette.neutral[500],
    onBrand: '#FFFFFF',
    onAccent: '#FFFFFF',
    success: colorPalette.success[700],
    warning: colorPalette.warning[700],
    error: colorPalette.error[700],
    info: colorPalette.info[700],
  },
  
  // Border colors
  border: {
    light: colorPalette.neutral[200],
    medium: colorPalette.neutral[300],
    focus: colorPalette.brand[500],
  },
  
  // Status colors
  status: {
    active: colorPalette.success[500],
    pending: colorPalette.warning[500],
    inactive: colorPalette.neutral[400],
    error: colorPalette.error[500],
    blocked: colorPalette.error[500],
    'not-started': colorPalette.neutral[400],
    'in-progress': colorPalette.info[500],
    completed: colorPalette.success[500],
    'on-hold': colorPalette.warning[500],
    cancelled: colorPalette.error[500],
  },
  
  // Role colors
  role: {
    organizer: colorPalette.error[600],
    moderator: colorPalette.success[700],
    mentor: colorPalette.purple[500],
    contributor: colorPalette.info[600],
    participant: colorPalette.blue[500],
    member: colorPalette.blue[500],
    admin: colorPalette.error[600],
  },
  
  // Community type colors
  communityType: {
    private: colorPalette.purple[500],
    open: colorPalette.blue[500],
  },
  
  // Gradients
  gradient: {
    primary: `linear-gradient(135deg, ${colorPalette.brand[600]} 0%, ${colorPalette.brand[500]} 100%)`,
    light: `linear-gradient(135deg, ${colorPalette.neutral[50]} 0%, ${colorPalette.neutral[100]} 100%)`,
  },
};

export default colors;
