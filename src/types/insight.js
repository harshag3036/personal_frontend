/**
 * Types for the Insight system
 * 
 * Purpose: These types support our core mission of promoting self-discovery and reducing suffering by:
 * 1. Structuring content to encourage deep reflection rather than passive consumption
 * 2. Including metadata that helps users prepare mentally for engagement
 * 3. Supporting pattern recognition in one's journey of understanding
 * 
 * Backend Integration Notes:
 * - Currently maintains compatibility with existing API response structure
 * - Future backend enhancements should add support for observationType and preparationTime
 * - Additional metadata for tracking user's engagement patterns would be valuable
 */

// Core insight type that maps to current backend response
export const ObservationType = {
    SELF_REFLECTION: 'self-reflection',
    PATTERN_RECOGNITION: 'pattern-recognition',
    DIRECT_OBSERVATION: 'direct-observation',
    UNDERSTANDING_SHIFT: 'understanding-shift'
};

export const ReflectionType = {
    AWARENESS: 'awareness',
    PATTERN: 'pattern',
    RESISTANCE: 'resistance',
    INTEGRATION: 'integration'
};

export const ResonanceType = {
    INTELLECTUAL: 'intellectual',
    EMOTIONAL: 'emotional',
    EXPERIENTIAL: 'experiential'
};
