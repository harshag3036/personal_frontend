import React from 'react';
import ActivityCard from './ActivityCard';
import ActivityRow from './ActivityRow';
import './ActivityBrowser.css';
import './ActivityDisplay.css';

const ActivityDisplay = ({ 
  displayedActivities, 
  viewMode, 
  groupBy, 
  handleActivityClick, 
  typeConfig, 
  categories, 
  statusOptions,
  formatDate 
}) => {
  // Render activity card (grid view)
  const renderActivityCard = (activity) => {
    return (
      <ActivityCard
        key={activity.id}
        activity={activity}
        typeConfig={typeConfig}
        categories={categories}
        formatDate={formatDate}
        onClick={handleActivityClick}
      />
    );
  };

  // Render activity row (list view)
  const renderActivityRow = (activity) => {
    return (
      <ActivityRow
        key={activity.id}
        activity={activity}
        typeConfig={typeConfig}
        categories={categories}
        formatDate={formatDate}
        onClick={handleActivityClick}
      />
    );
  };

  // Render activities based on grouping
  if (groupBy === 'none') {
    return (
      <div className={`activities-container ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
        {viewMode === 'grid' ? (
          displayedActivities.map(renderActivityCard)
        ) : (
          displayedActivities.map(renderActivityRow)
        )}
      </div>
    );
  } else {
    return (
      <div className="grouped-activities">
        {Object.entries(
          displayedActivities.reduce((groups, activity) => {
            let groupKey;
            
            switch (groupBy) {
              case 'category':
                // Ensure category exists, is not empty, and is valid
                groupKey = activity.category && activity.category.trim() !== ''
                  ? categories.find(c => c.value === activity.category)?.label || activity.category
                  : 'Uncategorized';
                break;
              case 'type':
                // Ensure type exists, is not empty, and is valid
                groupKey = activity.type && activity.type.trim() !== '' && typeConfig[activity.type]
                  ? typeConfig[activity.type].label
                  : 'Uncategorized';
                break;
              case 'status':
                // Ensure status exists, is not empty, and is valid
                const statusObj = activity.status && activity.status.trim() !== ''
                  ? statusOptions.find(s => s.value === activity.status)
                  : null;
                groupKey = statusObj?.label || 'Uncategorized';
                break;
              default:
                groupKey = 'All Activities';
            }
            
            if (!groups[groupKey]) {
              groups[groupKey] = [];
            }
            
            groups[groupKey].push(activity);
            return groups;
          }, {})
        ).map(([groupName, activities]) => (
          <div key={groupName} className="activity-group">
            <h3 className="group-heading">{groupName}</h3>
            <div className={`activities-container ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
              {viewMode === 'grid' ? (
                activities.map(renderActivityCard)
              ) : (
                activities.map(renderActivityRow)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default ActivityDisplay;
