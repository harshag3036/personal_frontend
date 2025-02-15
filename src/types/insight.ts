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


export type ObservationType = 'self-reflection' | 'pattern-recognition' | 'direct-observation' | 'understanding-shift';

export interface ReflectionPrompt {
    type: 'awareness' | 'pattern' | 'resistance' | 'integration';
    text: string;
    subPrompts?: string[];
    minimumReflectionTime?: number;
}

export interface Insight {
    postId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    userName?: string;
    
    // Mindful interaction metadata
    observationType: ObservationType;
    preparationTime: number;
    challengedBeliefs?: string[];
    
    // Optional fields for enhanced interaction
    context?: string;
    assumptions?: string[];
    implications?: string[];
    
    // Engagement metrics
    reflectionCount?: number;
    resonanceCount?: number;
    
    // Content categorization
    tags?: string[];
    category?: string;
}

export interface InsightMetadata {
    observationType: ObservationType;
    preparationTime: number;
    challengedBeliefs?: string[];
    context?: string;
    assumptions?: string[];
    implications?: string[];
}

export interface ReflectionData {
    timestamp: string;
    userId: string;
    insightId: string;
    reflectionType: 'awareness' | 'pattern' | 'resistance' | 'integration';
    content: string;
    duration: number;
}

export interface ResonanceData {
    timestamp: string;
    userId: string;
    insightId: string;
    resonanceType: 'intellectual' | 'emotional' | 'experiential';
    notes?: string;
}
