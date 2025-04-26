# Activity Tab Pages

This document provides a comprehensive list of all components used in the Activities tab of the application.

## Main Pages and Components

1. **ActivitiesMaster.js**
   - Central hub component for all activities
   - Implements tab navigation between different activity views
   - Handles state management for creating and viewing activities
   - Routes to relevant subcomponents based on selected tab

2. **ActivityDashboard.js**
   - Primary view for "My Activities" tab
   - Displays activity metrics, participation statistics, and time investment
   - Shows active, upcoming, and recent activities
   - Provides community and category breakdowns

3. **GlobalActivityBrowser.js**
   - Main component for "All Activities" tab
   - Displays activities from all communities and global activities
   - Implements cross-community filtering and browsing

4. **ActivityDetailView.js**
   - Expanded view for individual activity details
   - Shows participation information, comments, and attachments
   - Handles actions like joining/leaving an activity

5. **ActivityInsights.js**
   - Analytics dashboard for activity engagement
   - Visualizes participation patterns and trends
   - Shows community participation breakdown

6. **ActivityRecommendations.js**
   - "Discover" tab implementation
   - Shows personalized activity recommendations
   - Implements interest-based suggestions

7. **ActivityCalendar.js**
   - Calendar visualization of activities
   - Timeline view with upcoming deadlines
   - Date-based filtering and navigation

8. **ActivityExport.js**
   - Export functionality for activity data
   - Templates for common activity types
   - Sharing between communities

9. **ActivityMobileOptimizer.js**
   - Mobile-optimized views for small screens
   - Responsive layout adjustments
   - Touch-friendly controls and compact views

## Supporting Components

10. **GlobalActivityManager.js**
    - Form for creating and editing activities
    - Community selection for community-specific activities
    - Conversion between global and community activities

11. **GlobalActivityFilters.js**
    - Enhanced filtering options for activities
    - Community-based filters
    - Participation filters (created by me, participating, etc.)

12. **ActivityCardRefactored.js**
    - Card component for displaying activity information
    - Used across multiple activity views
    - Shows community context and participation status

13. **ActivityDisplayRefactored.js**
    - Handles different display modes for activities (grid/list)
    - Used by GlobalActivityBrowser

14. **StatusBadgeRefactored.js**
    - Visual indicator for activity status (active, upcoming, completed)
    - Used within activity cards

## Integration with App Structure

- **Appbar.js**: Contains navigation link to the Activities tab
- **App.js**: Defines routes for the activity pages
- **contexts/ActivityContext.js**: Provides activity data and methods
- **contexts/UserContext.js**: Used for user-related activity information

## Implementation Progress

All components listed are now complete and integrated into the application with:

- Cross-community visibility and management
- Global activity support
- Enhanced filtering
- Analytics and participation metrics
- Mobile optimization

The `/activities` and `/activities-master` routes both point to the new ActivitiesMaster component, with the app navigation now updated to use this implementation.
