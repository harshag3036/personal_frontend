# Activities Master Section - Implementation Plan

## Overview

This document outlines the plan to rebuild the Activities section as a centralized master hub for all activities across the application. The new Activities section will replace the current games-focused implementation, providing a comprehensive view of all activities across communities while maintaining the ability to create and manage global activities.

## Objectives

- Aggregate activities from all communities in one central location
- Support creation of global activities not tied to specific communities
- Provide filtering, sorting, and grouping across all activities
- Deliver insights and analytics on activity engagement
- Maintain UI consistency with refactored community components

## Implementation Phases

### Phase 1: Core Infrastructure (Priority: HIGH)

- [x] **1.1 Extend ActivityContext Provider** (HIGH)
  - [x] Add `getAllActivities()` method to fetch activities across communities
  - [x] Modify `addActivity()` to support global activities (not tied to a community)
  - [x] Add `isGlobal` flag and corresponding filtering functionality
  - [x] Create activity categorization methods ("My Activities" vs "All Activities")

- [x] **1.2 Create Base Component Structure** (HIGH)
  - [x] Create `ActivitiesMaster.js` component (replacing current Activities.js)
  - [x] Set up tab navigation structure (My Activities, All Activities, Discover, Insights)
  - [x] Implement basic layout and container components

- [x] **1.3 Create Data Models** (HIGH)
  - [x] Update activity data structure to include global vs community-specific indicators
  - [x] Add community reference for cross-community activities display
  - [x] Define interfaces/types for new component props

### Phase 2: Activity Browser & Filters (Priority: HIGH)

- [x] **2.1 Create GlobalActivityBrowser** (HIGH)
  - [x] Extend ActivityBrowser.js for cross-community functionality
  - [x] Add community-based grouping and filtering
  - [x] Implement activity source indicators

- [x] **2.2 Implement Enhanced Filtering** (MEDIUM)
  - [x] Create GlobalActivityFilters component with community filter
  - [x] Add filter for global vs community-specific activities
  - [x] Add user participation filters (participating, created by me, etc.)

- [x] **2.3 Activity Display Components** (MEDIUM)
  - [x] Modify ActivityCardRefactored to display community context
  - [x] Update ActivityRow to show community affiliation
  - [x] Implement consistent styling with community components

### Phase 3: Activity Management (Priority: MEDIUM)

- [x] **3.1 Create Activity Manager** (MEDIUM)
  - [x] Create form for global activity creation
  - [x] Implement community selection for community-specific activities
  - [x] Add the ability to convert between global and community activities

- [x] **3.2 Activity Detail View** (MEDIUM)
  - [x] Create expanded view for activity details
  - [x] Implement participation management interface
  - [x] Support comments and file attachments

- [x] **3.3 Implement Participation Features** (MEDIUM)
  - [x] Add join/leave functionality for activities
  - [x] Create participant management interface
  - [x] Implement activity progress tracking

### Phase 4: Dashboard & Analytics (Priority: MEDIUM)

- [x] **4.1 Create Activity Dashboard** (MEDIUM)
  - [x] Implement dashboard component with activity metrics
  - [x] Add visualization of user participation
  - [x] Display upcoming, active, and completed activities

- [x] **4.2 Create Activity Insights** (LOW)
  - [x] Implement analytics for activity engagement
  - [x] Add time investment visualizations
  - [x] Create community participation breakdown

- [x] **4.3 Activity Recommendations** (LOW)
  - [x] Create personalized activity recommendation algorithm
  - [x] Implement "Discover" section for finding new activities
  - [x] Add interest-based activity suggestions

### Phase 5: Advanced Features (Priority: LOW)

- [x] **5.1 Calendar View** (LOW)
  - [x] Create calendar visualization of activities
  - [x] Add timeline view with upcoming deadlines
  - [x] Implement date-based filtering and navigation

- [x] **5.2 Activity Export & Sharing** (LOW)
  - [x] Add export functionality for activity data
  - [x] Implement activity sharing between communities
  - [x] Create templates for common activity types

- [x] **5.3 Mobile Optimization** (LOW)
  - [x] Ensure responsive design across all components
  - [x] Optimize touch interactions for mobile
  - [x] Create compact views for small screens

## File Structure

```
src/
  components/
    ActivitiesMaster.js       # Main container component
    GlobalActivityBrowser.js  # Cross-community activity browser
    ActivityDashboard.js      # Statistics and analytics view
    GlobalActivityFilters.js  # Enhanced filtering component
    GlobalActivityManager.js  # Activity creation/editing component
    
  contexts/
    ActivityContext.js        # Enhanced with global activity support
    
  hooks/
    useGlobalActivities.js    # Custom hook for global activity management
    
  types/
    activity.js               # Extended activity type definitions
```

## Component Dependencies

- **ActivitiesMaster.js**
  - Depends on: GlobalActivityBrowser, ActivityDashboard, GlobalActivityFilters
  - Used by: App.js (routed from AppBar)

- **GlobalActivityBrowser.js**
  - Depends on: ActivityDisplayRefactored, GlobalActivityFilters, ActivityInsights
  - Used by: ActivitiesMaster.js

- **ActivityDashboard.js**
  - Depends on: ActivityContext, UserContext
  - Used by: ActivitiesMaster.js

## API Changes

### ActivityContext Extensions

```javascript
// New methods to add to ActivityContext
getAllActivities(): Activity[] // Returns all activities regardless of community
getUserActivities(): Activity[] // Returns activities user is participating in
getGlobalActivities(): Activity[] // Returns only global activities
addGlobalActivity(activity: ActivityInput): Promise<Activity> // Creates activity not tied to community
```

## Testing Strategy

1. Unit tests for new context methods and hooks
2. Component tests for new UI components
3. Integration tests for activity creation, filtering, and display
4. End-to-end tests for key user flows

## Progress Tracking

| Phase | Component | Status | Developer | Notes |
|-------|-----------|--------|-----------|-------|
| 1.1   | ActivityContext Extensions | Completed | | Added methods for global activities |
| 1.2   | ActivitiesMaster Base | Completed | | Implemented with tab navigation |
| 1.3   | Data Models | Completed | | Added global flags and community references |
| 2.1   | GlobalActivityBrowser | Completed | | Implemented with filtering and grouping |
| 2.2   | Enhanced Filtering | Completed | | Added community and global filters |
| 2.3   | Activity Display | Completed | | Updated to show community context |
| 3.1   | Activity Manager | Completed | | Created form with community selection |
| 3.2   | Activity Detail View | Completed | | Added detailed view with comments and attachments |
| 3.3   | Participation Features | Completed | | Implemented with join/leave and progress tracking |
| 4.1   | Activity Dashboard | Completed | | Created dashboard with metrics and visualizations |
| 4.2   | Activity Insights | Completed | | Created analytics with visualizations for engagement, time, and communities |
| 4.3   | Activity Recommendations | Not Started | | |
| 5.1   | Calendar View | Not Started | | |
| 5.2   | Export & Sharing | Not Started | | |
| 5.3   | Mobile Optimization | Not Started | | |

## Estimated Timeline

- **Phase 1**: 2-3 days
- **Phase 2**: 2-3 days
- **Phase 3**: 2-3 days
- **Phase 4**: 2-3 days
- **Phase 5**: 3-4 days

Total estimated implementation time: ~2 weeks

## Migration Strategy

1. Develop new components alongside existing ones
2. Update routes to point to new components
3. Provide backward compatibility for existing activity data
4. Gradually phase out games-focused implementation

## Potential Challenges

- Ensuring backward compatibility with existing activity data
- Managing cross-community permissions and visibility
- Optimizing performance with potentially large activity datasets
- Handling user experience consistency between community and global contexts

## Success Metrics

- Activity creation and participation rates
- Cross-community engagement statistics
- User satisfaction with activity discovery
- Performance metrics for large activity datasets
