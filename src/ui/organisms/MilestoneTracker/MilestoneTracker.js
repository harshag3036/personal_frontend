/**
 * MilestoneTracker Component
 * 
 * A component for displaying and tracking milestones in a project or activity.
 */

import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { isFunction } from '../../utilities/typeChecks';
import { 
  MILESTONE_TRACKER_CLASS,
  MILESTONE_TRACKER_HEADER_CLASS,
  MILESTONE_TRACKER_TITLE_CLASS,
  MILESTONE_TRACKER_SUBTITLE_CLASS,
  MILESTONE_TRACKER_BODY_CLASS,
  MILESTONE_TRACKER_FOOTER_CLASS,
  MILESTONE_TRACKER_TIMELINE_CLASS,
  MILESTONE_TRACKER_MILESTONE_CLASS,
  MILESTONE_TRACKER_MILESTONE_ICON_CLASS,
  MILESTONE_TRACKER_MILESTONE_CONTENT_CLASS,
  MILESTONE_TRACKER_MILESTONE_TITLE_CLASS,
  MILESTONE_TRACKER_MILESTONE_DATE_CLASS,
  MILESTONE_TRACKER_MILESTONE_DESCRIPTION_CLASS,
  MILESTONE_TRACKER_PROGRESS_CLASS,
  MILESTONE_TRACKER_ACTIONS_CLASS,
  MILESTONE_TRACKER_VARIANTS,
  MILESTONE_TRACKER_SIZES,
  MILESTONE_STATUS,
  MILESTONE_TRACKER_MODIFIERS
} from './constants';
import './MilestoneTracker.css';

/**
 * Milestone Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Milestone ID
 * @param {string} props.title - Milestone title
 * @param {string} props.date - Milestone date
 * @param {string} props.description - Milestone description
 * @param {React.ReactNode} props.icon - Milestone icon
 * @param {string} props.status - Milestone status
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Milestone component
 */
const Milestone = ({
  id,
  title,
  date,
  description,
  icon,
  status = MILESTONE_STATUS.NOT_STARTED,
  onClick
}) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(id, event);
    }
  };

  return (
    <div 
      className={MILESTONE_TRACKER_MILESTONE_CLASS}
      data-status={status}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={MILESTONE_TRACKER_MILESTONE_ICON_CLASS}>
        {icon}
      </div>
      <div className={MILESTONE_TRACKER_MILESTONE_CONTENT_CLASS}>
        <h4 className={MILESTONE_TRACKER_MILESTONE_TITLE_CLASS}>{title}</h4>
        {date && <p className={MILESTONE_TRACKER_MILESTONE_DATE_CLASS}>{date}</p>}
        {description && <p className={MILESTONE_TRACKER_MILESTONE_DESCRIPTION_CLASS}>{description}</p>}
      </div>
    </div>
  );
};

/**
 * MilestoneTracker Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.id] - Tracker ID
 * @param {string} [props.title] - Tracker title
 * @param {string} [props.subtitle] - Tracker subtitle
 * @param {Array<Object>} [props.milestones=[]] - Array of milestone objects
 * @param {number} [props.progress=0] - Progress percentage (0-100)
 * @param {React.ReactNode} [props.actions] - Actions to display in the footer
 * @param {string} [props.variant=MILESTONE_TRACKER_VARIANTS.DEFAULT] - Tracker variant
 * @param {string} [props.size=MILESTONE_TRACKER_SIZES.MEDIUM] - Tracker size
 * @param {boolean} [props.interactive=false] - Whether milestones are interactive
 * @param {boolean} [props.disabled=false] - Whether the tracker is disabled
 * @param {boolean} [props.loading=false] - Whether the tracker is loading
 * @param {boolean} [props.readonly=false] - Whether the tracker is readonly
 * @param {Function} [props.onMilestoneClick] - Milestone click handler
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the tracker
 * @param {React.ReactNode} [props.children] - Additional content
 * @returns {JSX.Element} MilestoneTracker component
 */
const MilestoneTracker = ({
  id,
  title,
  subtitle,
  milestones = [],
  progress = 0,
  actions,
  variant = MILESTONE_TRACKER_VARIANTS.DEFAULT,
  size = MILESTONE_TRACKER_SIZES.MEDIUM,
  interactive = false,
  disabled = false,
  loading = false,
  readonly = false,
  onMilestoneClick,
  className = '',
  extensions = [],
  children,
  ...props
}) => {
  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('MilestoneTracker', {
      id,
      title,
      subtitle,
      milestones,
      progress,
      actions,
      variant,
      size,
      interactive,
      disabled,
      loading,
      readonly,
      onMilestoneClick,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('MilestoneTracker: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      id,
      title,
      subtitle,
      milestones,
      progress,
      actions,
      variant,
      size,
      interactive,
      disabled,
      loading,
      readonly,
      onMilestoneClick,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    id: extendedId,
    title: extendedTitle,
    subtitle: extendedSubtitle,
    milestones: extendedMilestones,
    progress: extendedProgress,
    actions: extendedActions,
    variant: extendedVariant,
    size: extendedSize,
    interactive: extendedInteractive,
    disabled: extendedDisabled,
    loading: extendedLoading,
    readonly: extendedReadonly,
    onMilestoneClick: extendedOnMilestoneClick,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Determine if the tracker is vertical or horizontal
  const isVertical = extendedVariant !== MILESTONE_TRACKER_VARIANTS.HORIZONTAL;
  
  // Calculate progress style
  const progressStyle = useMemo(() => {
    const clampedProgress = Math.min(Math.max(extendedProgress, 0), 100);
    return isVertical
      ? { height: `${clampedProgress}%` }
      : { width: `${clampedProgress}%` };
  }, [extendedProgress, isVertical]);
  
  // Combine class names
  const trackerClasses = [
    MILESTONE_TRACKER_CLASS,
    `${MILESTONE_TRACKER_CLASS}--${extendedVariant}`,
    `${MILESTONE_TRACKER_CLASS}--${extendedSize}`,
    extendedInteractive && `${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_MODIFIERS.INTERACTIVE}`,
    extendedDisabled && `${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_MODIFIERS.DISABLED}`,
    extendedLoading && `${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_MODIFIERS.LOADING}`,
    extendedReadonly && `${MILESTONE_TRACKER_CLASS}--${MILESTONE_TRACKER_MODIFIERS.READONLY}`,
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // State for selected milestone
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(null);
  
  // Handle milestone click
  const handleMilestoneClick = (milestoneId, event) => {
    if (extendedDisabled || extendedLoading) return;
    
    // Update selected milestone
    setSelectedMilestoneId(prevId => prevId === milestoneId ? null : milestoneId);
    
    // Call external handler if provided
    if (extendedOnMilestoneClick) {
      try {
        extendedOnMilestoneClick(milestoneId, event);
      } catch (error) {
        console.error('MilestoneTracker: Error in onMilestoneClick handler:', error);
      }
    }
  };
  
  // Helper function to get milestone by ID
  const getMilestoneById = useCallback((milestoneId) => {
    return extendedMilestones.find(m => (m.id || '') === milestoneId);
  }, [extendedMilestones]);
  
  // Format date helper (can be customized or overridden via render props)
  const formatDate = useCallback((dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  }, []);
  
  // Helper to get status color
  const getStatusColor = useCallback((status) => {
    switch (status) {
      case MILESTONE_STATUS.COMPLETED:
        return 'success';
      case MILESTONE_STATUS.IN_PROGRESS:
        return 'primary';
      case MILESTONE_STATUS.NOT_STARTED:
      default:
        return 'textColorSecondary';
    }
  }, []);
  
  // Build milestone tracker state object for render props
  const milestoneTrackerState = {
    // Configuration
    variant: extendedVariant,
    size: extendedSize,
    interactive: extendedInteractive,
    disabled: extendedDisabled,
    loading: extendedLoading,
    readonly: extendedReadonly,
    
    // State
    milestones: extendedMilestones,
    progress: extendedProgress,
    selectedMilestoneId,
    selectedMilestone: getMilestoneById(selectedMilestoneId),
    
    // Handlers and utilities
    handleMilestoneClick,
    getMilestoneById,
    formatDate,
    getStatusColor,
    isVertical,
    progressStyle,
    
    // Subcomponents
    Milestone
  };
  
  // Determine if we're using render props
  const isRenderProps = isFunction(children);
  
  // If using render props, call the children function with state
  if (isRenderProps) {
    return (
      <div
        id={extendedId}
        className={trackerClasses}
        data-selected-milestone={selectedMilestoneId || ''}
        data-progress={extendedProgress}
        {...restProps}
      >
        {children(milestoneTrackerState)}
      </div>
    );
  }
  
  // Otherwise, use standard component rendering
  return (
    <div
      id={extendedId}
      className={trackerClasses}
      data-selected-milestone={selectedMilestoneId || ''}
      data-progress={extendedProgress}
      {...restProps}
    >
      {(extendedTitle || extendedSubtitle) && (
        <div className={MILESTONE_TRACKER_HEADER_CLASS}>
          {extendedTitle && (
            <h3 className={MILESTONE_TRACKER_TITLE_CLASS}>{extendedTitle}</h3>
          )}
          {extendedSubtitle && (
            <p className={MILESTONE_TRACKER_SUBTITLE_CLASS}>{extendedSubtitle}</p>
          )}
        </div>
      )}
      
      <div className={MILESTONE_TRACKER_BODY_CLASS}>
        <div className={MILESTONE_TRACKER_TIMELINE_CLASS}>
          <div 
            className={MILESTONE_TRACKER_PROGRESS_CLASS} 
            style={progressStyle}
            role="progressbar"
            aria-valuenow={extendedProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
          
          {extendedMilestones.map((milestone, index) => (
            <Milestone
              key={milestone.id || index}
              id={milestone.id || index}
              title={milestone.title}
              date={milestone.date}
              description={milestone.description}
              icon={milestone.icon}
              status={milestone.status || MILESTONE_STATUS.NOT_STARTED}
              onClick={extendedInteractive && !extendedReadonly ? handleMilestoneClick : undefined}
            />
          ))}
        </div>
        
        {!isRenderProps && children}
      </div>
      
      {extendedActions && (
        <div className={MILESTONE_TRACKER_FOOTER_CLASS}>
          <div className={MILESTONE_TRACKER_ACTIONS_CLASS}>
            {extendedActions}
          </div>
        </div>
      )}
    </div>
  );
};

MilestoneTracker.propTypes = {
  /** Tracker ID */
  id: PropTypes.string,
  /** Tracker title */
  title: PropTypes.string,
  /** Tracker subtitle */
  subtitle: PropTypes.string,
  /** Array of milestone objects */
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string.isRequired,
      date: PropTypes.string,
      description: PropTypes.string,
      icon: PropTypes.node,
      status: PropTypes.oneOf(Object.values(MILESTONE_STATUS)),
    })
  ),
  /** Progress percentage (0-100) */
  progress: PropTypes.number,
  /** Actions to display in the footer */
  actions: PropTypes.node,
  /** Tracker variant */
  variant: PropTypes.oneOf(Object.values(MILESTONE_TRACKER_VARIANTS)),
  /** Tracker size */
  size: PropTypes.oneOf(Object.values(MILESTONE_TRACKER_SIZES)),
  /** Whether milestones are interactive */
  interactive: PropTypes.bool,
  /** Whether the tracker is disabled */
  disabled: PropTypes.bool,
  /** Whether the tracker is loading */
  loading: PropTypes.bool,
  /** Whether the tracker is readonly */
  readonly: PropTypes.bool,
  /** Milestone click handler */
  onMilestoneClick: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the tracker */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** Additional content or render props function */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
};

export default MilestoneTracker;
