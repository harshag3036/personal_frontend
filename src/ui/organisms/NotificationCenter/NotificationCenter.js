/**
 * NotificationCenter Component
 * 
 * A component for displaying and managing notifications with various layouts and features.
 */

import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  NOTIFICATION_CENTER_VARIANTS,
  NOTIFICATION_CENTER_SIZES,
  NOTIFICATION_CENTER_MODIFIERS,
  NOTIFICATION_CENTER_SECTIONS,
  NOTIFICATION_CENTER_ARIA,
  NOTIFICATION_CENTER_DATA_ATTRIBUTES,
  NOTIFICATION_CENTER_CLASS_NAMES,
  NOTIFICATION_CENTER_DEFAULT_PROPS,
  NOTIFICATION_TYPES,
  NOTIFICATION_STATES,
  NOTIFICATION_FILTER_TYPES,
  NOTIFICATION_SORT_TYPES
} from './constants';
import { Text, Button, Icon, Input, Spinner } from '../../atoms';
import { Tabs, SearchInput } from '../../molecules';
import './NotificationCenter.css';

/**
 * NotificationCenter Header Component
 */
const NotificationCenterHeader = forwardRef(({ 
  title = NOTIFICATION_CENTER_DEFAULT_PROPS.title,
  unreadCount = 0,
  withCounter = NOTIFICATION_CENTER_DEFAULT_PROPS.withCounter,
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.HEADER} ${className || ''}`}
      {...props}
    >
      <Text 
        variant="h3" 
        className={NOTIFICATION_CENTER_CLASS_NAMES.TITLE}
      >
        {title}
        {withCounter && unreadCount > 0 && (
          <span className={NOTIFICATION_CENTER_CLASS_NAMES.COUNTER}>
            {unreadCount}
          </span>
        )}
      </Text>
      {children}
    </div>
  );
});

NotificationCenterHeader.displayName = 'NotificationCenter.Header';

NotificationCenterHeader.propTypes = {
  title: PropTypes.node,
  unreadCount: PropTypes.number,
  withCounter: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Filters Component
 */
const NotificationCenterFilters = forwardRef(({ 
  filters = [],
  activeFilter = NOTIFICATION_FILTER_TYPES.ALL,
  onFilterChange,
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.FILTERS} ${className || ''}`}
      role="tablist"
      {...props}
    >
      {filters.map((filter) => (
        <div 
          key={filter.value} 
          className={NOTIFICATION_CENTER_CLASS_NAMES.FILTER}
          role="tab"
        >
          <button
            className={NOTIFICATION_CENTER_CLASS_NAMES.FILTER_BUTTON}
            onClick={() => onFilterChange && onFilterChange(filter.value)}
            aria-selected={activeFilter === filter.value}
          >
            {filter.label}
          </button>
        </div>
      ))}
      {children}
    </div>
  );
});

NotificationCenterFilters.displayName = 'NotificationCenter.Filters';

NotificationCenterFilters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  activeFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Search Component
 */
const NotificationCenterSearch = forwardRef(({ 
  placeholder = 'Search notifications',
  value,
  onChange,
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.SEARCH} ${className || ''}`}
      {...props}
    >
      <SearchInput
        className={NOTIFICATION_CENTER_CLASS_NAMES.SEARCH_INPUT}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
});

NotificationCenterSearch.displayName = 'NotificationCenter.Search';

NotificationCenterSearch.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
};

/**
 * NotificationCenter Tabs Component
 */
const NotificationCenterTabs = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Tabs 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.TABS} ${className || ''}`}
      {...props}
    >
      {children}
    </Tabs>
  );
});

NotificationCenterTabs.displayName = 'NotificationCenter.Tabs';

NotificationCenterTabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter List Component
 */
const NotificationCenterList = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <ul 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.LIST} ${className || ''}`}
      role={NOTIFICATION_CENTER_ARIA.LIST_ROLE}
      {...props}
    >
      {children}
    </ul>
  );
});

NotificationCenterList.displayName = 'NotificationCenter.List';

NotificationCenterList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Group Component
 */
const NotificationCenterGroup = forwardRef(({ 
  title,
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.GROUP} ${className || ''}`}
      {...props}
    >
      {title && (
        <h4 className={NOTIFICATION_CENTER_CLASS_NAMES.GROUP_TITLE}>
          {title}
        </h4>
      )}
      {children}
    </div>
  );
});

NotificationCenterGroup.displayName = 'NotificationCenter.Group';

NotificationCenterGroup.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Item Component
 */
const NotificationCenterItem = forwardRef(({ 
  id,
  title,
  message,
  time,
  type = NOTIFICATION_TYPES.INFO,
  state = NOTIFICATION_STATES.UNREAD,
  icon,
  actions = [],
  onClick,
  onMarkAsRead,
  onDismiss,
  onPin,
  onArchive,
  children, 
  className,
  ...props 
}, ref) => {
  // Get the appropriate icon based on notification type if not provided
  const getIconName = () => {
    if (icon) return icon;
    
    switch (type) {
      case NOTIFICATION_TYPES.INFO:
        return 'info';
      case NOTIFICATION_TYPES.SUCCESS:
        return 'check-circle';
      case NOTIFICATION_TYPES.WARNING:
        return 'warning';
      case NOTIFICATION_TYPES.ERROR:
        return 'error';
      case NOTIFICATION_TYPES.SYSTEM:
        return 'settings';
      case NOTIFICATION_TYPES.MESSAGE:
        return 'message';
      case NOTIFICATION_TYPES.ACTIVITY:
        return 'activity';
      case NOTIFICATION_TYPES.ALERT:
        return 'alert';
      case NOTIFICATION_TYPES.REMINDER:
        return 'clock';
      case NOTIFICATION_TYPES.UPDATE:
        return 'update';
      default:
        return 'notification';
    }
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e, { id, type, state });
      
      // Mark as read when clicked if it's unread
      if (state === NOTIFICATION_STATES.UNREAD && onMarkAsRead) {
        onMarkAsRead(id);
      }
    }
  };

  return (
    <li 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.ITEM} ${className || ''}`}
      role={NOTIFICATION_CENTER_ARIA.ITEM_ROLE}
      data-type={type}
      data-state={state}
      onClick={handleClick}
      {...props}
    >
      <div className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_ICON}>
        <Icon name={getIconName()} />
      </div>
      
      <div className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_CONTENT}>
        {title && (
          <div className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_TITLE}>
            {title}
          </div>
        )}
        
        {message && (
          <div className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_MESSAGE}>
            {message}
          </div>
        )}
        
        <div className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_META}>
          {time && (
            <span className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_TIME}>
              {time}
            </span>
          )}
          {children}
        </div>
      </div>
      
      {actions.length > 0 && (
        <div 
          className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_ACTIONS}
          onClick={(e) => e.stopPropagation()} // Prevent item click when clicking actions
        >
          {actions.includes('markAsRead') && state === NOTIFICATION_STATES.UNREAD && onMarkAsRead && (
            <button
              className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_ACTION}
              onClick={() => onMarkAsRead(id)}
              aria-label="Mark as read"
              title="Mark as read"
            >
              <Icon name="check" />
            </button>
          )}
          
          {actions.includes('pin') && onPin && (
            <button
              className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_ACTION}
              onClick={() => onPin(id, state !== NOTIFICATION_STATES.PINNED)}
              aria-label={state === NOTIFICATION_STATES.PINNED ? "Unpin" : "Pin"}
              title={state === NOTIFICATION_STATES.PINNED ? "Unpin" : "Pin"}
            >
              <Icon name={state === NOTIFICATION_STATES.PINNED ? "pin-filled" : "pin"} />
            </button>
          )}
          
          {actions.includes('archive') && onArchive && (
            <button
              className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_ACTION}
              onClick={() => onArchive(id)}
              aria-label="Archive"
              title="Archive"
            >
              <Icon name="archive" />
            </button>
          )}
          
          {actions.includes('dismiss') && onDismiss && (
            <button
              className={NOTIFICATION_CENTER_CLASS_NAMES.ITEM_ACTION}
              onClick={() => onDismiss(id)}
              aria-label="Dismiss"
              title="Dismiss"
            >
              <Icon name="close" />
            </button>
          )}
        </div>
      )}
    </li>
  );
});

NotificationCenterItem.displayName = 'NotificationCenter.Item';

NotificationCenterItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.node,
  message: PropTypes.node,
  time: PropTypes.node,
  type: PropTypes.oneOf(Object.values(NOTIFICATION_TYPES)),
  state: PropTypes.oneOf(Object.values(NOTIFICATION_STATES)),
  icon: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  onMarkAsRead: PropTypes.func,
  onDismiss: PropTypes.func,
  onPin: PropTypes.func,
  onArchive: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Empty Component
 */
const NotificationCenterEmpty = forwardRef(({ 
  icon = 'notifications-off',
  title = NOTIFICATION_CENTER_DEFAULT_PROPS.emptyText,
  message,
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.EMPTY} ${className || ''}`}
      {...props}
    >
      {icon && (
        <div className={NOTIFICATION_CENTER_CLASS_NAMES.EMPTY_ICON}>
          <Icon name={icon} size="lg" />
        </div>
      )}
      
      {title && (
        <div className={NOTIFICATION_CENTER_CLASS_NAMES.EMPTY_TITLE}>
          {title}
        </div>
      )}
      
      {message && (
        <div className={NOTIFICATION_CENTER_CLASS_NAMES.EMPTY_MESSAGE}>
          {message}
        </div>
      )}
      
      {children}
    </div>
  );
});

NotificationCenterEmpty.displayName = 'NotificationCenter.Empty';

NotificationCenterEmpty.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.node,
  message: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Loading Component
 */
const NotificationCenterLoading = forwardRef(({ 
  text = NOTIFICATION_CENTER_DEFAULT_PROPS.loadingText,
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.LOADING} ${className || ''}`}
      {...props}
    >
      <Spinner size="md" />
      {text && <Text style={{ marginLeft: 'var(--spacing-sm)' }}>{text}</Text>}
      {children}
    </div>
  );
});

NotificationCenterLoading.displayName = 'NotificationCenter.Loading';

NotificationCenterLoading.propTypes = {
  text: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Error Component
 */
const NotificationCenterError = forwardRef(({ 
  text = NOTIFICATION_CENTER_DEFAULT_PROPS.errorText,
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.ERROR} ${className || ''}`}
      {...props}
    >
      <Icon name="error" size="lg" style={{ marginBottom: 'var(--spacing-sm)' }} />
      {text && <Text>{text}</Text>}
      {children}
    </div>
  );
});

NotificationCenterError.displayName = 'NotificationCenter.Error';

NotificationCenterError.propTypes = {
  text: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Footer Component
 */
const NotificationCenterFooter = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.FOOTER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

NotificationCenterFooter.displayName = 'NotificationCenter.Footer';

NotificationCenterFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Actions Component
 */
const NotificationCenterActions = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.ACTIONS} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

NotificationCenterActions.displayName = 'NotificationCenter.Actions';

NotificationCenterActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * NotificationCenter Action Component
 */
const NotificationCenterAction = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Button 
      ref={ref}
      variant="text"
      size="sm"
      className={`${NOTIFICATION_CENTER_CLASS_NAMES.ACTION} ${className || ''}`}
      {...props}
    >
      {children}
    </Button>
  );
});

NotificationCenterAction.displayName = 'NotificationCenter.Action';

NotificationCenterAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Main NotificationCenter Component
 */
const NotificationCenter = forwardRef(({ 
  children,
  notifications = [],
  loading = false,
  error = null,
  variant = NOTIFICATION_CENTER_DEFAULT_PROPS.variant,
  size = NOTIFICATION_CENTER_DEFAULT_PROPS.size,
  withBorder = NOTIFICATION_CENTER_DEFAULT_PROPS.withBorder,
  withShadow = NOTIFICATION_CENTER_DEFAULT_PROPS.withShadow,
  withHeader = NOTIFICATION_CENTER_DEFAULT_PROPS.withHeader,
  withFooter = NOTIFICATION_CENTER_DEFAULT_PROPS.withFooter,
  withFilters = NOTIFICATION_CENTER_DEFAULT_PROPS.withFilters,
  withSearch = NOTIFICATION_CENTER_DEFAULT_PROPS.withSearch,
  withActions = NOTIFICATION_CENTER_DEFAULT_PROPS.withActions,
  withCounter = NOTIFICATION_CENTER_DEFAULT_PROPS.withCounter,
  withGroups = NOTIFICATION_CENTER_DEFAULT_PROPS.withGroups,
  withTabs = NOTIFICATION_CENTER_DEFAULT_PROPS.withTabs,
  defaultFilter = NOTIFICATION_CENTER_DEFAULT_PROPS.defaultFilter,
  defaultSort = NOTIFICATION_CENTER_DEFAULT_PROPS.defaultSort,
  maxItems = NOTIFICATION_CENTER_DEFAULT_PROPS.maxItems,
  title = NOTIFICATION_CENTER_DEFAULT_PROPS.title,
  markAllAsReadText = NOTIFICATION_CENTER_DEFAULT_PROPS.markAllAsReadText,
  clearAllText = NOTIFICATION_CENTER_DEFAULT_PROPS.clearAllText,
  viewAllText = NOTIFICATION_CENTER_DEFAULT_PROPS.viewAllText,
  emptyText = NOTIFICATION_CENTER_DEFAULT_PROPS.emptyText,
  loadingText = NOTIFICATION_CENTER_DEFAULT_PROPS.loadingText,
  errorText = NOTIFICATION_CENTER_DEFAULT_PROPS.errorText,
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onClearAll,
  onPin,
  onArchive,
  onViewAll,
  onFilterChange,
  onSearchChange,
  className,
  style,
  ...props 
}, ref) => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [activeSort, setActiveSort] = useState(defaultSort);
  
  // Calculate unread count
  const unreadCount = notifications.filter(
    notification => notification.state === NOTIFICATION_STATES.UNREAD
  ).length;
  
  // Default filters
  const defaultFilters = [
    { label: 'All', value: NOTIFICATION_FILTER_TYPES.ALL },
    { label: 'Unread', value: NOTIFICATION_FILTER_TYPES.UNREAD },
  ];
  
  // Handle search change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };
  
  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };
  
  // Filter notifications based on active filter and search query
  const getFilteredNotifications = () => {
    let filtered = [...notifications];
    
    // Apply filter
    if (activeFilter === NOTIFICATION_FILTER_TYPES.UNREAD) {
      filtered = filtered.filter(notification => notification.state === NOTIFICATION_STATES.UNREAD);
    } else if (activeFilter === NOTIFICATION_FILTER_TYPES.READ) {
      filtered = filtered.filter(notification => notification.state === NOTIFICATION_STATES.READ);
    } else if (activeFilter === NOTIFICATION_FILTER_TYPES.PINNED) {
      filtered = filtered.filter(notification => notification.state === NOTIFICATION_STATES.PINNED);
    } else if (activeFilter === NOTIFICATION_FILTER_TYPES.ARCHIVED) {
      filtered = filtered.filter(notification => notification.state === NOTIFICATION_STATES.ARCHIVED);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(notification => {
        const title = notification.title ? notification.title.toString().toLowerCase() : '';
        const message = notification.message ? notification.message.toString().toLowerCase() : '';
        return title.includes(query) || message.includes(query);
      });
    }
    
    // Apply sort
    if (activeSort === NOTIFICATION_SORT_TYPES.NEWEST) {
      filtered.sort((a, b) => new Date(b.date || b.time) - new Date(a.date || a.time));
    } else if (activeSort === NOTIFICATION_SORT_TYPES.OLDEST) {
      filtered.sort((a, b) => new Date(a.date || a.time) - new Date(b.date || b.time));
    } else if (activeSort === NOTIFICATION_SORT_TYPES.PRIORITY) {
      filtered.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    } else if (activeSort === NOTIFICATION_SORT_TYPES.TYPE) {
      filtered.sort((a, b) => a.type.localeCompare(b.type));
    }
    
    // Apply max items limit
    if (maxItems > 0) {
      filtered = filtered.slice(0, maxItems);
    }
    
    return filtered;
  };
  
  // Group notifications by date or type
  const getGroupedNotifications = () => {
    const filtered = getFilteredNotifications();
    
    if (!withGroups) {
      return { ungrouped: filtered };
    }
    
    // Group by date (today, yesterday, this week, earlier)
    const grouped = filtered.reduce((acc, notification) => {
      const date = new Date(notification.date || notification.time);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const thisWeekStart = new Date(today);
      thisWeekStart.setDate(thisWeekStart.getDate() - today.getDay());
      
      let group;
      if (date >= today) {
        group = 'Today';
      } else if (date >= yesterday) {
        group = 'Yesterday';
      } else if (date >= thisWeekStart) {
        group = 'This Week';
      } else {
        group = 'Earlier';
      }
      
      if (!acc[group]) {
        acc[group] = [];
      }
      
      acc[group].push(notification);
      return acc;
    }, {});
    
    return grouped;
  };
  
  // Build class names
  const notificationCenterClasses = [
    NOTIFICATION_CENTER_CLASS_NAMES.ROOT,
    `${NOTIFICATION_CENTER_CLASS_NAMES.ROOT}--${variant}`,
    `${NOTIFICATION_CENTER_CLASS_NAMES.ROOT}--${size}`,
    withBorder ? `${NOTIFICATION_CENTER_CLASS_NAMES.ROOT}--${NOTIFICATION_CENTER_MODIFIERS.WITH_BORDER}` : '',
    withShadow ? `${NOTIFICATION_CENTER_CLASS_NAMES.ROOT}--${NOTIFICATION_CENTER_MODIFIERS.WITH_SHADOW}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  // Find and organize children by type
  const renderChildren = () => {
    let header = null;
    let filters = null;
    let search = null;
    let tabs = null;
    let list = null;
    let empty = null;
    let loading = null;
    let error = null;
    let footer = null;
    
    React.Children.forEach(children, child => {
      if (!child) return;
      
      const displayName = child.type?.displayName;
      
      if (displayName === 'NotificationCenter.Header') {
        header = child;
      } else if (displayName === 'NotificationCenter.Filters') {
        filters = child;
      } else if (displayName === 'NotificationCenter.Search') {
        search = child;
      } else if (displayName === 'NotificationCenter.Tabs') {
        tabs = child;
      } else if (displayName === 'NotificationCenter.List') {
        list = child;
      } else if (displayName === 'NotificationCenter.Empty') {
        empty = child;
      } else if (displayName === 'NotificationCenter.Loading') {
        loading = child;
      } else if (displayName === 'NotificationCenter.Error') {
        error = child;
      } else if (displayName === 'NotificationCenter.Footer') {
        footer = child;
      }
    });
    
    // If no explicit children are provided, render based on props
    const filteredNotifications = getFilteredNotifications();
    const groupedNotifications = getGroupedNotifications();
    
    return (
      <>
        {(withHeader && header) || (withHeader && (
          <NotificationCenterHeader 
            title={title} 
            unreadCount={unreadCount}
            withCounter={withCounter}
          />
        ))}
        
        {(withFilters && filters) || (withFilters && (
          <NotificationCenterFilters 
            filters={defaultFilters}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        ))}
        
        {(withSearch && search) || (withSearch && (
          <NotificationCenterSearch 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        ))}
        
        {(withTabs && tabs) && tabs}
        
        {loading && (
          loading || <NotificationCenterLoading text={loadingText} />
        )}
        
        {error && (
          error || <NotificationCenterError text={errorText || error} />
        )}
        
        {!loading && !error && (
          <>
            {filteredNotifications.length === 0 ? (
              empty || <NotificationCenterEmpty title={emptyText} />
            ) : (
              list || (
                <NotificationCenterList>
                  {withGroups ? (
                    Object.entries(groupedNotifications).map(([group, groupNotifications]) => (
                      <NotificationCenterGroup key={group} title={group}>
                        {groupNotifications.map(notification => (
                          <NotificationCenterItem
                            key={notification.id}
                            id={notification.id}
                            title={notification.title}
                            message={notification.message}
                            time={notification.time}
                            type={notification.type}
                            state={notification.state}
                            icon={notification.icon}
                            actions={notification.actions || ['markAsRead', 'dismiss']}
                            onClick={onNotificationClick}
                            onMarkAsRead={onMarkAsRead}
                            onDismiss={onDismiss}
                            onPin={onPin}
                            onArchive={onArchive}
                          />
                        ))}
                      </NotificationCenterGroup>
                    ))
                  ) : (
                    filteredNotifications.map(notification => (
                      <NotificationCenterItem
                        key={notification.id}
                        id={notification.id}
                        title={notification.title}
                        message={notification.message}
                        time={notification.time}
                        type={notification.type}
                        state={notification.state}
                        icon={notification.icon}
                        actions={notification.actions || ['markAsRead', 'dismiss']}
                        onClick={onNotificationClick}
                        onMarkAsRead={onMarkAsRead}
                        onDismiss={onDismiss}
                        onPin={onPin}
                        onArchive={onArchive}
                      />
                    ))
                  )}
                </NotificationCenterList>
              )
            )}
          </>
        )}
        
        {(withFooter && footer) || (withFooter && withActions && (
          <NotificationCenterFooter>
            <NotificationCenterActions>
              {unreadCount > 0 && onMarkAllAsRead && (
                <NotificationCenterAction onClick={onMarkAllAsRead}>
                  {markAllAsReadText}
                </NotificationCenterAction>
              )}
              {notifications.length > 0 && onClearAll && (
                <NotificationCenterAction onClick={onClearAll}>
                  {clearAllText}
                </NotificationCenterAction>
              )}
            </NotificationCenterActions>
            {onViewAll && (
              <NotificationCenterAction onClick={onViewAll}>
                {viewAllText}
              </NotificationCenterAction>
            )}
          </NotificationCenterFooter>
        ))}
      </>
    );
  };
  
  return (
    <div 
      ref={ref}
      className={notificationCenterClasses}
      style={style}
      role={NOTIFICATION_CENTER_ARIA.ROLE}
      aria-label={NOTIFICATION_CENTER_ARIA.LABEL}
      data-variant={variant}
      data-size={size}
      data-unread-count={unreadCount}
      data-total-count={notifications.length}
      {...props}
    >
      <div className={NOTIFICATION_CENTER_CLASS_NAMES.CONTAINER}>
        {renderChildren()}
      </div>
    </div>
  );
});

NotificationCenter.displayName = 'NotificationCenter';

NotificationCenter.propTypes = {
  children: PropTypes.node,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.node,
      message: PropTypes.node,
      time: PropTypes.node,
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
      type: PropTypes.oneOf(Object.values(NOTIFICATION_TYPES)),
      state: PropTypes.oneOf(Object.values(NOTIFICATION_STATES)),
      icon: PropTypes.string,
      actions: PropTypes.arrayOf(PropTypes.string),
      priority: PropTypes.number
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  variant: PropTypes.oneOf(Object.values(NOTIFICATION_CENTER_VARIANTS)),
  size: PropTypes.oneOf(Object.values(NOTIFICATION_CENTER_SIZES)),
  withBorder: PropTypes.bool,
  withShadow: PropTypes.bool,
  withHeader: PropTypes.bool,
  withFooter: PropTypes.bool,
  withFilters: PropTypes.bool,
  withSearch: PropTypes.bool,
  withActions: PropTypes.bool,
  withCounter: PropTypes.bool,
  withGroups: PropTypes.bool,
  withTabs: PropTypes.bool,
  defaultFilter: PropTypes.string,
  defaultSort: PropTypes.string,
  maxItems: PropTypes.number,
  title: PropTypes.node,
  markAllAsReadText: PropTypes.node,
  clearAllText: PropTypes.node,
  viewAllText: PropTypes.node,
  emptyText: PropTypes.node,
  loadingText: PropTypes.node,
  errorText: PropTypes.node,
  onNotificationClick: PropTypes.func,
  onMarkAsRead: PropTypes.func,
  onMarkAllAsRead: PropTypes.func,
  onDismiss: PropTypes.func,
  onClearAll: PropTypes.func,
  onPin: PropTypes.func,
  onArchive: PropTypes.func,
  onViewAll: PropTypes.func,
  onFilterChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

// Attach sub-components
NotificationCenter.Header = NotificationCenterHeader;
NotificationCenter.Filters = NotificationCenterFilters;
NotificationCenter.Search = NotificationCenterSearch;
NotificationCenter.Tabs = NotificationCenterTabs;
NotificationCenter.List = NotificationCenterList;
NotificationCenter.Group = NotificationCenterGroup;
NotificationCenter.Item = NotificationCenterItem;
NotificationCenter.Empty = NotificationCenterEmpty;
NotificationCenter.Loading = NotificationCenterLoading;
NotificationCenter.Error = NotificationCenterError;
NotificationCenter.Footer = NotificationCenterFooter;
NotificationCenter.Actions = NotificationCenterActions;
NotificationCenter.Action = NotificationCenterAction;

export default NotificationCenter;
