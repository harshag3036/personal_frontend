/**
 * Color Tokens
 * 
 * This file defines the color palette and semantic color assignments for the design system.
 * The palette is inspired by themes of critical thinking, philosophy, love, and authenticity,
 * creating a balanced visual language that encourages depth, wisdom, compassion, and truth.
 */

/**
 * Color Palette
 * 
 * The color palette is organized by color family, with each color having a range of shades.
 * Each color family represents core aspects of our design philosophy:
 * - Wisdom (primary blues): Representing knowledge, depth, and critical thinking
 * - Harmony (accent greens): Symbolizing balance, growth, and authentic expression
 * - Compassion (magenta): Embodying empathy, connection, and love
 * - Truth (indigo): Reflecting honesty, insight, and philosophical inquiry
 * - Earthiness (terra): Grounding the palette with authentic, natural tones
 */
export const colorPalette = {
  // Wisdom: Deep blues representing critical thinking and intellectual depth
  wisdom: {
    50: '#E7EFF6',
    100: '#D0E0ED',
    200: '#A0C0DB',
    300: '#70A1C9',
    400: '#4081B7',
    500: '#144272', // Primary deep blue - intellectual depths
    600: '#0A2647', // Darker blue - profound thought
    700: '#081D38',
    800: '#051429',
    900: '#030A14',
  },
  
  // Harmony: Green tones representing authenticity and balance
  harmony: {
    50: '#E6F5EF',
    100: '#CEEADE',
    200: '#9DD5BD',
    300: '#6CC09C',
    400: '#3BAB7B',
    500: '#2B7A63', // More balanced green - authenticity
    600: '#215C4A',
    700: '#183D32',
    800: '#0F2A22',
    900: '#071511',
  },
  
  // Compassion: Magentas representing love and empathy
  compassion: {
    50: '#F8E9F0',
    100: '#F2D3E2',
    200: '#E5A7C5',
    300: '#D77BA7',
    400: '#CA4F8A',
    500: '#A03069', // Deep magenta - love and compassion
    600: '#822752',
    700: '#631D3E',
    800: '#45142B',
    900: '#260A17',
  },
  
  // Truth: Indigo tones representing philosophical wisdom
  truth: {
    50: '#EEE9F5',
    100: '#DED3EB',
    200: '#BDA7D7',
    300: '#9C7BC3',
    400: '#7B4FAF',
    500: '#4A2C8F', // Deep indigo - philosophical insight
    600: '#3B2372',
    700: '#2C1A56',
    800: '#1E1139',
    900: '#0F091D',
  },
  
  // Earthiness: Terra tones representing authenticity and groundedness
  terra: {
    50: '#F5F0E9',
    100: '#EBE0D3',
    200: '#D7C2A7',
    300: '#C3A37B',
    400: '#AF844F',
    500: '#8B6C45', // Warm earthy brown - authenticity and tradition
    600: '#6F5636',
    700: '#544128',
    800: '#392C1B',
    900: '#1D160D',
  },
  
  // Neutral colors with warm undertones for balance
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
  
  // Status colors refined for the philosophical palette
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#2EAA71', // Softer green success
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
    500: '#D49212', // Warmer, more earthy amber
    600: '#B47806',
    700: '#945A09',
    800: '#73450E',
    900: '#5F300F',
  },
  
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#B91C3B', // More magenta-toned error for cohesion
    600: '#991B36',
    700: '#821B2F',
    800: '#681D29',
    900: '#450A15',
  },
  
  insight: {
    50: '#EEF4FB',
    100: '#DCEAFE',
    200: '#BFCEFE',
    300: '#93ADFD',
    400: '#6080FA',
    500: '#3B5BD1', // Renamed from "info" to "insight" - deeper blue
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
};

/**
 * Semantic Colors
 * 
 * Semantic colors define how colors are used in the application,
 * providing a layer of abstraction between raw values and usage.
 * Each color choice embodies our conceptual framework of critical thinking,
 * philosophical inquiry, compassionate connection, and authentic expression.
 */
export const colors = {
  // Background colors
  background: {
    primary: colorPalette.neutral[50], // Clean thinking space
    secondary: '#FFFFFF', // Clarity and openness
    tertiary: colorPalette.neutral[100], // Subtle differentiation
    brand: colorPalette.wisdom[500], // Intellectual foundation
    accent: colorPalette.harmony[500], // Balanced expression
    compassion: colorPalette.compassion[500], // Space for empathy
    truth: colorPalette.truth[500], // Space for deep insight
    success: colorPalette.success[50],
    warning: colorPalette.warning[50],
    error: colorPalette.error[50],
    insight: colorPalette.insight[50],
  },
  
  // Text colors
  text: {
    primary: colorPalette.neutral[800], // Clear, deep communication
    secondary: colorPalette.neutral[600], // Supportive information
    tertiary: colorPalette.neutral[500], // Peripheral information
    onBrand: '#FFFFFF',
    onAccent: '#FFFFFF',
    onCompassion: '#FFFFFF',
    onTruth: '#FFFFFF',
    success: colorPalette.success[700],
    warning: colorPalette.warning[700],
    error: colorPalette.error[700],
    insight: colorPalette.insight[700],
  },
  
  // Border colors
  border: {
    light: colorPalette.neutral[200], // Subtle divisions
    medium: colorPalette.neutral[300], // Stronger boundaries
    focus: colorPalette.wisdom[500], // Highlight for critical attention
    wisdom: colorPalette.wisdom[300], // Intellectual structure
    harmony: colorPalette.harmony[300], // Balanced structure 
    compassion: colorPalette.compassion[300], // Empathetic connection
    truth: colorPalette.truth[300], // Framework for insights
  },
  
  // Status colors with philosophical meaning
  status: {
    active: colorPalette.success[500], // Engaged and present
    pending: colorPalette.warning[500], // In contemplation
    inactive: colorPalette.neutral[400], // At rest
    error: colorPalette.error[500], // Needs reconsideration
    blocked: colorPalette.error[500], // Facing obstacles
    'not-started': colorPalette.neutral[400], // Potential energy
    'in-progress': colorPalette.insight[500], // Becoming
    completed: colorPalette.success[500], // Actualized
    'on-hold': colorPalette.warning[500], // Paused reflection
    cancelled: colorPalette.error[500], // Released attachment
  },
  
  // Role colors with philosophical significance
  role: {
    organizer: colorPalette.wisdom[600], // Leadership and vision
    moderator: colorPalette.success[600], // Harmony maintenance
    mentor: colorPalette.truth[500], // Wisdom sharing
    contributor: colorPalette.harmony[600], // Balanced giving
    participant: colorPalette.insight[500], // Active engagement
    member: colorPalette.insight[500], // Community belonging
    admin: colorPalette.wisdom[700], // Deep responsibility
  },
  
  // Community type colors
  communityType: {
    private: colorPalette.truth[500], // Inner circle of philosophical inquiry
    open: colorPalette.insight[500], // Expansive knowledge sharing
  },
  
  // Philosophy-inspired gradients
  gradient: {
    wisdom: `linear-gradient(135deg, ${colorPalette.wisdom[600]} 0%, ${colorPalette.wisdom[500]} 100%)`,
    harmony: `linear-gradient(135deg, ${colorPalette.harmony[600]} 0%, ${colorPalette.harmony[500]} 100%)`,
    compassion: `linear-gradient(135deg, ${colorPalette.compassion[600]} 0%, ${colorPalette.compassion[500]} 100%)`,
    truth: `linear-gradient(135deg, ${colorPalette.truth[600]} 0%, ${colorPalette.truth[500]} 100%)`,
    dialogue: `linear-gradient(135deg, ${colorPalette.wisdom[500]} 0%, ${colorPalette.truth[500]} 100%)`,
    reflection: `linear-gradient(135deg, ${colorPalette.neutral[100]} 0%, ${colorPalette.neutral[50]} 100%)`,
  },
  
  // Theme colors for consistent semantic mapping
  primary: colorPalette.wisdom[500],
  secondary: colorPalette.truth[500],
  accent: colorPalette.harmony[500],
  highlight: colorPalette.compassion[500],
};

export default colors;
