# System Flags & Categorization Guide

## Communication Tags

### 1. Discussion Flow Tags
```typescript
type DiscussionTag =
    | 'discuss'     // Open discussion about a topic
    | 'validate'    // Verify assumptions or approach
    | 'concept'     // High-level conceptual discussion
    | 'clarify'     // Seeking or providing clarification
    | 'plan'        // Planning and strategy discussion
    | 'review'      // Review and feedback
    | 'decide'      // Decision-making discussion
    | 'implement'   // Implementation details
```

### 2. Task Status Tags
```typescript
type TaskTag =
    | 'todo'        // Needs to be done
    | 'in-progress' // Currently being worked on
    | 'blocked'     // Blocked by dependency
    | 'review'      // Ready for review
    | 'approved'    // Approved after review
    | 'complete'    // Task completed
```

### 3. Content Purpose Tags
```typescript
type PurposeTag =
    | 'explore'     // Exploring possibilities
    | 'define'      // Defining requirements
    | 'design'      // Design discussion
    | 'document'    // Documentation related
    | 'test'        // Testing related
    | 'refine'      // Refinement and improvement
```

### 4. Communication Context Tags
```typescript
type ContextTag =
    | 'technical'   // Technical discussion
    | 'ux'          // User experience
    | 'feature'     // Feature related
    | 'bug'         // Bug related
    | 'enhancement' // Enhancement discussion
    | 'question'    // General question
```

### Usage Guidelines

#### 1. Tag Combinations
- Use multiple tags when needed
- Keep combinations meaningful
- Maintain clarity of purpose
- Update as discussion evolves

#### 2. Tag Selection
- Choose most relevant tag
- Be specific when possible
- Consider audience
- Update if focus changes

#### 3. Best Practices
- Don't over-tag
- Keep consistent
- Be clear
- Review regularly


## Content Types

### 1. Posts
```typescript
type PostType = 
    | 'insight'      // Personal understanding or realization
    | 'question'     // Seeking clarity or understanding
    | 'observation'  // Direct observation without interpretation
    | 'reflection'   // Processing of experience or understanding
    | 'experience'   // Sharing of direct experience
```

### 2. Articles
```typescript
type ArticleType =
    | 'guide'        // How-to or instructional content
    | 'exploration'  // Deep dive into a topic
    | 'perspective'  // Personal viewpoint or understanding
    | 'resource'     // Reference material
    | 'case-study'   // Detailed examination of experience
```

### 3. Insights
```typescript
type InsightType =
    | 'self-reflection'       // Personal understanding
    | 'pattern-recognition'   // Noticed patterns or tendencies
    | 'direct-observation'    // Immediate seeing
    | 'understanding-shift'   // Change in perspective
```

### 4. Comments
```typescript
type CommentType =
    | 'clarification'  // Seeking or providing clarity
    | 'observation'    // Sharing what's noticed
    | 'question'       // Deepening inquiry
    | 'support'        // Supporting understanding
```

## User Interaction Flags

### 1. Engagement Levels
```typescript
interface EngagementLevel {
    type: 'surface' | 'medium' | 'deep';
    indicators: {
        timeSpent: number;
        interactionCount: number;
        reflectionCompleted: boolean;
        responseQuality: number;
    };
}
```

### 2. Reflection States
```typescript
interface ReflectionState {
    type: 'awareness' | 'pattern' | 'resistance' | 'integration';
    status: 'pending' | 'active' | 'completed' | 'skipped';
    duration: number;
    quality: number;
}
```

### 3. Skip Patterns
```typescript
interface SkipPattern {
    type: 'occasional' | 'frequent' | 'pattern';
    context: {
        timeOfDay: string;
        contentType: string;
        userState: string;
    };
    frequency: number;
}
```

### 4. Response Types
```typescript
interface ResponseType {
    category: 'emotional' | 'intellectual' | 'experiential';
    depth: number;
    authenticity: number;
    usefulness: number;
}
```

## Moderation Flags

### 1. Content Warnings
```typescript
interface ContentWarning {
    severity: 'low' | 'medium' | 'high';
    type: 
        | 'potentially-triggering'
        | 'needs-context'
        | 'challenging-content'
        | 'sensitive-topic';
    action: 'warn' | 'hide' | 'remove';
}
```

### 2. Quality Indicators
```typescript
interface QualityIndicator {
    clarity: number;        // 0-100
    depth: number;         // 0-100
    authenticity: number;  // 0-100
    usefulness: number;    // 0-100
    flags: {
        needsEditing: boolean;
        potentialSpam: boolean;
        lowEffort: boolean;
        exemplary: boolean;
    };
}
```

### 3. Guideline Violations
```typescript
interface GuidelineViolation {
    type: 
        | 'harassment'
        | 'spam'
        | 'off-topic'
        | 'low-quality'
        | 'inappropriate';
    severity: 'minor' | 'moderate' | 'severe';
    action: 'warn' | 'remove' | 'ban';
    appeal: boolean;
}
```

### 4. User Behavior Patterns
```typescript
interface BehaviorPattern {
    type: 
        | 'constructive'
        | 'neutral'
        | 'concerning'
        | 'harmful';
    indicators: {
        postQuality: number;
        interactionQuality: number;
        reportHistory: number;
        violationHistory: number;
    };
}
```

## System States

### 1. Loading States
```typescript
type LoadingState =
    | 'initial'      // First load
    | 'content'      // Loading new content
    | 'reflection'   // Processing reflection
    | 'interaction'  // User interaction
    | 'background';  // Background processes
```

### 2. Error States
```typescript
interface ErrorState {
    type: 
        | 'network'
        | 'validation'
        | 'permission'
        | 'system'
        | 'user';
    severity: 'low' | 'medium' | 'high';
    recoverable: boolean;
    userMessage: string;
}
```

### 3. Progress Indicators
```typescript
interface ProgressIndicator {
    type: 'linear' | 'circular' | 'determinate' | 'indeterminate';
    context: string;
    value: number;
    total: number;
}
```

### 4. Success States
```typescript
interface SuccessState {
    type: 'action' | 'process' | 'milestone';
    message: string;
    nextSteps?: string[];
    celebration?: boolean;
}
```

## Feature Flags

### 1. Component States
```typescript
interface ComponentState {
    enabled: boolean;
    visible: boolean;
    interactive: boolean;
    restricted: boolean;
}
```

### 2. Permission Levels
```typescript
type PermissionLevel =
    | 'guest'        // Limited access
    | 'member'       // Standard access
    | 'contributor'  // Enhanced access
    | 'moderator'    // Moderation access
    | 'admin';       // Full access
```

### 3. Access Controls
```typescript
interface AccessControl {
    read: boolean;
    write: boolean;
    modify: boolean;
    delete: boolean;
    moderate: boolean;
}
```

### 4. Feature Availability
```typescript
interface FeatureAvailability {
    enabled: boolean;
    beta: boolean;
    restricted: boolean;
    requirements: {
        permissionLevel: PermissionLevel;
        accountAge: number;
        qualityScore: number;
    };
}
```

## Usage Guidelines

### 1. Content Creation
- Use appropriate content types
- Include necessary flags
- Set correct warnings
- Maintain quality standards

### 2. Moderation
- Check all flags
- Review quality indicators
- Assess patterns
- Apply guidelines consistently

### 3. Development
- Implement all required flags
- Handle all states
- Respect permissions
- Follow patterns

### 4. User Experience
- Clear indicators
- Consistent messaging
- Appropriate feedback
- Helpful guidance

## Best Practices

### 1. Flag Usage
- Be specific and accurate
- Don't overuse warnings
- Maintain consistency
- Regular review

### 2. State Management
- Clear transitions
- Error recovery
- Progress indication
- Success confirmation

### 3. Permission Handling
- Proper checking
- Clear messaging
- Graceful degradation
- Security first

### 4. Quality Control
- Regular audits
- Pattern monitoring
- User feedback
- System health
