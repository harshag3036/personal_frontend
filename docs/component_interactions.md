# Component Interactions & Data Flow

## Core Component Relationships

### 1. Mindful Content Flow
```
InsightCollection
├── InsightSpace
│   ├── ReflectionPrompt
│   └── InsightContent
└── LoadMoreTrigger
    └── ReflectionPrompt
```

Data Flow:
1. InsightCollection manages batch loading (3 items)
2. Each insight renders in InsightSpace
3. ReflectionPrompt triggers between batches
4. LoadMoreTrigger manages pagination

### 2. Reflection System
```
ReflectionSystem
├── PromptManager
│   ├── TimingController
│   └── PromptRenderer
└── UserResponseTracker
    ├── PatternRecognition
    └── ProgressTracker
```

Data Flow:
1. PromptManager selects appropriate prompts
2. TimingController enforces reflection periods
3. UserResponseTracker monitors engagement
4. PatternRecognition identifies trends

### 3. User Journey
```
UserJourney
├── Onboarding
│   ├── IntentionSetting
│   └── PracticeSession
├── MainExperience
│   ├── ContentExploration
│   └── ReflectionCycles
└── ProgressTracking
    ├── InsightPatterns
    └── GrowthMetrics
```

## State Management

### 1. Global State
```typescript
interface GlobalState {
    user: {
        preferences: UserPreferences;
        progress: ProgressData;
        insights: UserInsights;
    };
    reflection: {
        currentPrompt: ReflectionPrompt;
        history: ReflectionHistory;
        patterns: RecognizedPatterns;
    };
    content: {
        currentBatch: Insight[];
        totalLoaded: number;
        hasMore: boolean;
    };
}
```

### 2. Component State
```typescript
// InsightSpace Component
interface InsightSpaceState {
    isExpanded: boolean;
    readyToEngage: boolean;
    reflectionComplete: boolean;
    userResponse: UserResponse;
}

// ReflectionPrompt Component
interface ReflectionState {
    timeRemaining: number;
    promptIndex: number;
    userEngagement: EngagementMetrics;
    skipAttempts: number;
}
```

## Event Flow Examples

### 1. Loading More Content
```
User Action (Load More)
       ↓
Check Reflection Status
       ↓
Trigger Reflection (if needed)
       ↓
Wait for Completion
       ↓
Load Next Batch
       ↓
Update UI
```

### 2. Reflection Process
```
Reflection Trigger
       ↓
Select Appropriate Prompt
       ↓
Start Timer
       ↓
Monitor Engagement
       ↓
Process Completion
       ↓
Update Progress
```

### 3. Pattern Recognition
```
User Interaction
       ↓
Record Response
       ↓
Analyze Pattern
       ↓
Update User Profile
       ↓
Adapt Experience
```

## Component Communication

### 1. Parent-Child Communication
```typescript
// Parent to Child
interface InsightSpaceProps {
    insight: Insight;
    onReflectionComplete: () => void;
    onPatternRecognized: (pattern: Pattern) => void;
    reflectionConfig: ReflectionConfig;
}

// Child to Parent
interface ReflectionEvents {
    onComplete: (data: ReflectionData) => void;
    onSkip: (reason: SkipReason) => void;
    onPatternFound: (pattern: Pattern) => void;
}
```

### 2. Context-Based Communication
```typescript
const UserContext = React.createContext<UserContextType>({
    preferences: defaultPreferences,
    progress: defaultProgress,
    insights: [],
    updatePreferences: () => {},
    updateProgress: () => {},
    addInsight: () => {}
});

const ReflectionContext = React.createContext<ReflectionContextType>({
    currentPrompt: null,
    history: [],
    patterns: [],
    updatePrompt: () => {},
    recordResponse: () => {},
    analyzePatterns: () => {}
});
```

## Custom Hooks

### 1. Reflection Management
```typescript
const useReflection = (config: ReflectionConfig) => {
    const [state, dispatch] = useReducer(reflectionReducer, initialState);
    
    useEffect(() => {
        if (state.timeRemaining > 0) {
            const timer = setInterval(() => {
                dispatch({ type: 'TICK' });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [state.timeRemaining]);
    
    return {
        state,
        startReflection: () => dispatch({ type: 'START' }),
        completeReflection: () => dispatch({ type: 'COMPLETE' }),
        skipReflection: (reason) => dispatch({ type: 'SKIP', payload: reason })
    };
};
```

### 2. Pattern Recognition
```typescript
const usePatternRecognition = () => {
    const [patterns, setPatterns] = useState<Pattern[]>([]);
    
    const analyzeResponse = (response: UserResponse) => {
        // Pattern analysis logic
    };
    
    const updatePatterns = (newPattern: Pattern) => {
        setPatterns(prev => [...prev, newPattern]);
    };
    
    return { patterns, analyzeResponse, updatePatterns };
};
```

## Performance Optimizations

### 1. Component Memoization
```typescript
const MemoizedInsightSpace = React.memo(InsightSpace, (prev, next) => {
    return (
        prev.insight.id === next.insight.id &&
        prev.reflectionComplete === next.reflectionComplete
    );
});
```

### 2. Batch Updates
```typescript
const handleBatchUpdate = useCallback(() => {
    setBatchedState(prev => ({
        ...prev,
        insights: [...prev.insights, ...newInsights],
        totalLoaded: prev.totalLoaded + newInsights.length,
        hasMore: hasMoreContent
    }));
}, [newInsights, hasMoreContent]);
```

## Error Handling

### 1. Component Error Boundaries
```typescript
class ReflectionErrorBoundary extends React.Component {
    state = { hasError: false, error: null };
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    render() {
        if (this.state.hasError) {
            return <GentleErrorMessage error={this.state.error} />;
        }
        return this.props.children;
    }
}
```

### 2. Graceful Degradation
```typescript
const handleReflectionFailure = (error: Error) => {
    console.error('Reflection system error:', error);
    // Fall back to simpler interaction mode
    setSimpleMode(true);
    // Notify monitoring system
    reportError(error);
    // Show user-friendly message
    showGentleError('Taking a mindful pause...');
};
```

## Testing Considerations

### 1. Component Testing
```typescript
describe('ReflectionPrompt', () => {
    it('enforces minimum reflection time', () => {
        const { getByText } = render(
            <ReflectionPrompt minimumTime={15} />
        );
        
        expect(getByText('Continue')).toBeDisabled();
        
        act(() => {
            jest.advanceTimersByTime(15000);
        });
        
        expect(getByText('Continue')).toBeEnabled();
    });
});
```

### 2. Integration Testing
```typescript
describe('Insight Loading Flow', () => {
    it('triggers reflection between batches', async () => {
        const { getByText, findByText } = render(<InsightCollection />);
        
        await loadNextBatch();
        expect(getByText('Take a moment')).toBeInTheDocument();
        
        await completeReflection();
        expect(await findByText('Next Insight')).toBeInTheDocument();
    });
});
