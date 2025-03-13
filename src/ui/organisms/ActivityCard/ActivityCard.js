/**
 * ActivityCard Component
 * 
 * A compound component for displaying activity information with customizable sections.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { componentExtension } from '../../utilities';
import { 
  ACTIVITY_CARD_CLASS,
  ACTIVITY_CARD_HEADER_CLASS,
  ACTIVITY_CARD_BODY_CLASS,
  ACTIVITY_CARD_FOOTER_CLASS,
  ACTIVITY_CARD_ICON_CLASS,
  ACTIVITY_CARD_AVATAR_CLASS,
  ACTIVITY_CARD_TITLE_CLASS,
  ACTIVITY_CARD_SUBTITLE_CLASS,
  ACTIVITY_CARD_DESCRIPTION_CLASS,
  ACTIVITY_CARD_METADATA_CLASS,
  ACTIVITY_CARD_ACTIONS_CLASS,
  ACTIVITY_CARD_VARIANTS,
  ACTIVITY_CARD_SIZES,
  ACTIVITY_CARD_STATUS,
  ACTIVITY_CARD_TYPES,
  ACTIVITY_CARD_MODIFIERS
} from './constants';
import './ActivityCard.css';

/**
 * ActivityCard Component
 * 
 * @param {Object} props - Component props
 * @param {string} [props.id] - Card ID
 * @param {string} [props.title] - Card title
 * @param {string} [props.subtitle] - Card subtitle
 * @param {string} [props.description] - Card description
 * @param {React.ReactNode} [props.icon] - Card icon
 * @param {React.ReactNode} [props.avatar] - Card avatar
 * @param {React.ReactNode} [props.metadata] - Card metadata
 * @param {React.ReactNode} [props.actions] - Card actions
 * @param {string} [props.variant=ACTIVITY_CARD_VARIANTS.DEFAULT] - Card variant
 * @param {string} [props.size=ACTIVITY_CARD_SIZES.MEDIUM] - Card size
 * @param {string} [props.status] - Card status
 * @param {string} [props.type] - Card type
 * @param {boolean} [props.selected=false] - Whether the card is selected
 * @param {boolean} [props.disabled=false] - Whether the card is disabled
 * @param {boolean} [props.loading=false] - Whether the card is loading
 * @param {boolean} [props.highlighted=false] - Whether the card is highlighted
 * @param {boolean} [props.compact=false] - Whether the card is compact
 * @param {boolean} [props.expanded=false] - Whether the card is expanded
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Array<string>} [props.extensions=[]] - Extensions to apply to the card
 * @param {React.ReactNode} [props.children] - Card content
 * @returns {JSX.Element} ActivityCard component
 */
const ActivityCard = ({
  id,
  title,
  subtitle,
  description,
  icon,
  avatar,
  metadata,
  actions,
  variant = ACTIVITY_CARD_VARIANTS.DEFAULT,
  size = ACTIVITY_CARD_SIZES.MEDIUM,
  status,
  type,
  selected = false,
  disabled = false,
  loading = false,
  highlighted = false,
  compact = false,
  expanded = false,
  onClick,
  className = '',
  extensions = [],
  children,
  ...props
}) => {
  // Apply extensions with error handling
  let extendedProps;
  try {
    extendedProps = componentExtension.applyComponentExtensions('ActivityCard', {
      id,
      title,
      subtitle,
      description,
      icon,
      avatar,
      metadata,
      actions,
      variant,
      size,
      status,
      type,
      selected,
      disabled,
      loading,
      highlighted,
      compact,
      expanded,
      onClick,
      className,
      ...props,
    }, extensions);
  } catch (error) {
    console.error('ActivityCard: Error applying extensions:', error);
    // Fallback to original props if extension application fails
    extendedProps = {
      id,
      title,
      subtitle,
      description,
      icon,
      avatar,
      metadata,
      actions,
      variant,
      size,
      status,
      type,
      selected,
      disabled,
      loading,
      highlighted,
      compact,
      expanded,
      onClick,
      className,
      ...props,
    };
  }
  
  // Extract props after extensions
  const {
    id: extendedId,
    title: extendedTitle,
    subtitle: extendedSubtitle,
    description: extendedDescription,
    icon: extendedIcon,
    avatar: extendedAvatar,
    metadata: extendedMetadata,
    actions: extendedActions,
    variant: extendedVariant,
    size: extendedSize,
    status: extendedStatus,
    type: extendedType,
    selected: extendedSelected,
    disabled: extendedDisabled,
    loading: extendedLoading,
    highlighted: extendedHighlighted,
    compact: extendedCompact,
    expanded: extendedExpanded,
    onClick: extendedOnClick,
    className: extendedClassName,
    ...restProps
  } = extendedProps;
  
  // Combine class names
  const cardClasses = [
    ACTIVITY_CARD_CLASS,
    `${ACTIVITY_CARD_CLASS}--${extendedVariant}`,
    `${ACTIVITY_CARD_CLASS}--${extendedSize}`,
    extendedStatus && `${ACTIVITY_CARD_CLASS}--${extendedStatus}`,
    extendedType && `${ACTIVITY_CARD_CLASS}--${extendedType}`,
    extendedSelected && `${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.SELECTED}`,
    extendedDisabled && `${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.DISABLED}`,
    extendedLoading && `${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.LOADING}`,
    extendedHighlighted && `${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.HIGHLIGHTED}`,
    extendedCompact && `${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.COMPACT}`,
    extendedExpanded && `${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_MODIFIERS.EXPANDED}`,
    extendedOnClick && `${ACTIVITY_CARD_CLASS}--${ACTIVITY_CARD_VARIANTS.INTERACTIVE}`,
    extendedClassName,
  ].filter(Boolean).join(' ');
  
  // Handle click event
  const handleClick = (event) => {
    if (extendedDisabled || extendedLoading) return;
    
    if (extendedOnClick) {
      try {
        extendedOnClick(event);
      } catch (error) {
        console.error('ActivityCard: Error in onClick handler:', error);
      }
    }
  };
  
  // Determine if we need to render the header
  const hasHeader = extendedIcon || extendedAvatar || extendedTitle || extendedSubtitle;
  
  // Determine if we need to render the footer
  const hasFooter = extendedMetadata || extendedActions;
  
  return (
    <div
      id={extendedId}
      className={cardClasses}
      onClick={handleClick}
      tabIndex={extendedOnClick && !extendedDisabled ? 0 : undefined}
      role={extendedOnClick ? 'button' : undefined}
      aria-disabled={extendedDisabled || undefined}
      {...restProps}
    >
      {hasHeader && (
        <div className={ACTIVITY_CARD_HEADER_CLASS}>
          {extendedIcon && (
            <div className={ACTIVITY_CARD_ICON_CLASS}>
              {extendedIcon}
            </div>
          )}
          
          {extendedAvatar && (
            <div className={ACTIVITY_CARD_AVATAR_CLASS}>
              {extendedAvatar}
            </div>
          )}
          
          <div>
            {extendedTitle && (
              <h3 className={ACTIVITY_CARD_TITLE_CLASS}>
                {extendedTitle}
              </h3>
            )}
            
            {extendedSubtitle && (
              <p className={ACTIVITY_CARD_SUBTITLE_CLASS}>
                {extendedSubtitle}
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className={ACTIVITY_CARD_BODY_CLASS}>
        {extendedDescription && (
          <p className={ACTIVITY_CARD_DESCRIPTION_CLASS}>
            {extendedDescription}
          </p>
        )}
        
        {children}
      </div>
      
      {hasFooter && (
        <div className={ACTIVITY_CARD_FOOTER_CLASS}>
          {extendedMetadata && (
            <div className={ACTIVITY_CARD_METADATA_CLASS}>
              {extendedMetadata}
            </div>
          )}
          
          {extendedActions && (
            <div className={ACTIVITY_CARD_ACTIONS_CLASS}>
              {extendedActions}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ActivityCard.propTypes = {
  /** Card ID */
  id: PropTypes.string,
  /** Card title */
  title: PropTypes.string,
  /** Card subtitle */
  subtitle: PropTypes.string,
  /** Card description */
  description: PropTypes.string,
  /** Card icon */
  icon: PropTypes.node,
  /** Card avatar */
  avatar: PropTypes.node,
  /** Card metadata */
  metadata: PropTypes.node,
  /** Card actions */
  actions: PropTypes.node,
  /** Card variant */
  variant: PropTypes.oneOf(Object.values(ACTIVITY_CARD_VARIANTS)),
  /** Card size */
  size: PropTypes.oneOf(Object.values(ACTIVITY_CARD_SIZES)),
  /** Card status */
  status: PropTypes.oneOf(Object.values(ACTIVITY_CARD_STATUS)),
  /** Card type */
  type: PropTypes.oneOf(Object.values(ACTIVITY_CARD_TYPES)),
  /** Whether the card is selected */
  selected: PropTypes.bool,
  /** Whether the card is disabled */
  disabled: PropTypes.bool,
  /** Whether the card is loading */
  loading: PropTypes.bool,
  /** Whether the card is highlighted */
  highlighted: PropTypes.bool,
  /** Whether the card is compact */
  compact: PropTypes.bool,
  /** Whether the card is expanded */
  expanded: PropTypes.bool,
  /** Click handler */
  onClick: PropTypes.func,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Extensions to apply to the card */
  extensions: PropTypes.arrayOf(PropTypes.string),
  /** Card content */
  children: PropTypes.node,
};

export default ActivityCard;
