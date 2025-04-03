/**
 * UserProfile Component
 * 
 * A component for displaying user profile information with various sections and layouts.
 */

import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../utilities/typeChecks';
import { 
  USER_PROFILE_VARIANTS,
  USER_PROFILE_SIZES,
  USER_PROFILE_MODIFIERS,
  USER_PROFILE_SECTIONS,
  USER_PROFILE_ARIA,
  USER_PROFILE_DATA_ATTRIBUTES,
  USER_PROFILE_CLASS_NAMES,
  USER_PROFILE_DEFAULT_PROPS
} from './constants';
import { Avatar, Text, Button, Icon, Link, Badge } from '../../atoms';
import { Tabs } from '../../molecules';
import './UserProfile.css';

/**
 * UserProfile Header Component
 */
const UserProfileHeader = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.HEADER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileHeader.displayName = 'UserProfile.Header';

UserProfileHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Cover Component
 */
const UserProfileCover = forwardRef(({ 
  src, 
  alt = 'Cover image',
  className,
  style,
  ...props 
}, ref) => {
  const coverStyle = {
    ...style,
    ...(src && { backgroundImage: `url(${src})` })
  };

  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.COVER} ${className || ''}`}
      style={coverStyle}
      role="img"
      aria-label={alt}
      {...props}
    />
  );
});

UserProfileCover.displayName = 'UserProfile.Cover';

UserProfileCover.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

/**
 * UserProfile Avatar Component
 */
const UserProfileAvatar = forwardRef(({ 
  src, 
  name,
  size = 'lg',
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.AVATAR} ${className || ''}`}
      {...props}
    >
      <Avatar 
        src={src} 
        name={name} 
        size={size}
      />
    </div>
  );
});

UserProfileAvatar.displayName = 'UserProfile.Avatar';

UserProfileAvatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string
};

/**
 * UserProfile Info Component
 */
const UserProfileInfo = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.INFO} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileInfo.displayName = 'UserProfile.Info';

UserProfileInfo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Name Component
 */
const UserProfileName = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Text 
      ref={ref}
      variant="h3"
      className={`${USER_PROFILE_CLASS_NAMES.NAME} ${className || ''}`}
      {...props}
    >
      {children}
    </Text>
  );
});

UserProfileName.displayName = 'UserProfile.Name';

UserProfileName.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Username Component
 */
const UserProfileUsername = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Text 
      ref={ref}
      variant="body2"
      className={`${USER_PROFILE_CLASS_NAMES.USERNAME} ${className || ''}`}
      {...props}
    >
      {children}
    </Text>
  );
});

UserProfileUsername.displayName = 'UserProfile.Username';

UserProfileUsername.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Title Component
 */
const UserProfileTitle = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Text 
      ref={ref}
      variant="body1"
      className={`${USER_PROFILE_CLASS_NAMES.TITLE} ${className || ''}`}
      {...props}
    >
      {children}
    </Text>
  );
});

UserProfileTitle.displayName = 'UserProfile.Title';

UserProfileTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Bio Component
 */
const UserProfileBio = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Text 
      ref={ref}
      variant="body2"
      className={`${USER_PROFILE_CLASS_NAMES.BIO} ${className || ''}`}
      {...props}
    >
      {children}
    </Text>
  );
});

UserProfileBio.displayName = 'UserProfile.Bio';

UserProfileBio.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Stats Component
 */
const UserProfileStats = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.STATS} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileStats.displayName = 'UserProfile.Stats';

UserProfileStats.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Stat Component
 */
const UserProfileStat = forwardRef(({ 
  label, 
  value,
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.STAT} ${className || ''}`}
      {...props}
    >
      <div className={USER_PROFILE_CLASS_NAMES.STAT_VALUE}>{value}</div>
      <div className={USER_PROFILE_CLASS_NAMES.STAT_LABEL}>{label}</div>
    </div>
  );
});

UserProfileStat.displayName = 'UserProfile.Stat';

UserProfileStat.propTypes = {
  label: PropTypes.node,
  value: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Contact Component
 */
const UserProfileContact = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.CONTACT} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileContact.displayName = 'UserProfile.Contact';

UserProfileContact.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Contact Item Component
 */
const UserProfileContactItem = forwardRef(({ 
  icon, 
  children,
  href,
  className,
  ...props 
}, ref) => {
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  );

  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.CONTACT_ITEM} ${className || ''}`}
      {...props}
    >
      {href ? (
        <Link href={href}>{content}</Link>
      ) : (
        content
      )}
    </div>
  );
});

UserProfileContactItem.displayName = 'UserProfile.ContactItem';

UserProfileContactItem.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.string
};

/**
 * UserProfile Social Component
 */
const UserProfileSocial = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.SOCIAL} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileSocial.displayName = 'UserProfile.Social';

UserProfileSocial.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Social Item Component
 */
const UserProfileSocialItem = forwardRef(({ 
  icon, 
  href,
  label,
  className,
  ...props 
}, ref) => {
  return (
    <Link 
      ref={ref}
      href={href}
      className={`${USER_PROFILE_CLASS_NAMES.SOCIAL_ITEM} ${className || ''}`}
      aria-label={label}
      {...props}
    >
      <Icon name={icon} />
    </Link>
  );
});

UserProfileSocialItem.displayName = 'UserProfile.SocialItem';

UserProfileSocialItem.propTypes = {
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string
};

/**
 * UserProfile Actions Component
 */
const UserProfileActions = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.ACTIONS} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileActions.displayName = 'UserProfile.Actions';

UserProfileActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Action Component
 */
const UserProfileAction = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Button 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.ACTION} ${className || ''}`}
      {...props}
    >
      {children}
    </Button>
  );
});

UserProfileAction.displayName = 'UserProfile.Action';

UserProfileAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Badges Component
 */
const UserProfileBadges = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.BADGES} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileBadges.displayName = 'UserProfile.Badges';

UserProfileBadges.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Badge Component
 */
const UserProfileBadge = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Badge 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.BADGE} ${className || ''}`}
      {...props}
    >
      {children}
    </Badge>
  );
});

UserProfileBadge.displayName = 'UserProfile.Badge';

UserProfileBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Tabs Component
 */
const UserProfileTabs = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <Tabs 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.TABS} ${className || ''}`}
      {...props}
    >
      {children}
    </Tabs>
  );
});

UserProfileTabs.displayName = 'UserProfile.Tabs';

UserProfileTabs.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Content Component
 */
const UserProfileContent = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.CONTENT} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileContent.displayName = 'UserProfile.Content';

UserProfileContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * UserProfile Footer Component
 */
const UserProfileFooter = forwardRef(({ 
  children, 
  className,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`${USER_PROFILE_CLASS_NAMES.FOOTER} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

UserProfileFooter.displayName = 'UserProfile.Footer';

UserProfileFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

/**
 * Main UserProfile Component
 */
const UserProfile = forwardRef(({ 
  children,
  variant = USER_PROFILE_DEFAULT_PROPS.variant,
  size = USER_PROFILE_DEFAULT_PROPS.size,
  withBorder = USER_PROFILE_DEFAULT_PROPS.withBorder,
  withShadow = USER_PROFILE_DEFAULT_PROPS.withShadow,
  withHeader = USER_PROFILE_DEFAULT_PROPS.withHeader,
  withFooter = USER_PROFILE_DEFAULT_PROPS.withFooter,
  withAvatar = USER_PROFILE_DEFAULT_PROPS.withAvatar,
  withCover = USER_PROFILE_DEFAULT_PROPS.withCover,
  withStats = USER_PROFILE_DEFAULT_PROPS.withStats,
  withBio = USER_PROFILE_DEFAULT_PROPS.withBio,
  withContact = USER_PROFILE_DEFAULT_PROPS.withContact,
  withSocial = USER_PROFILE_DEFAULT_PROPS.withSocial,
  withActions = USER_PROFILE_DEFAULT_PROPS.withActions,
  withBadges = USER_PROFILE_DEFAULT_PROPS.withBadges,
  withTabs = USER_PROFILE_DEFAULT_PROPS.withTabs,
  className,
  style,
  ...props 
}, ref) => {
  // Build class names
  const userProfileClasses = [
    USER_PROFILE_CLASS_NAMES.ROOT,
    `${USER_PROFILE_CLASS_NAMES.ROOT}--${variant}`,
    `${USER_PROFILE_CLASS_NAMES.ROOT}--${size}`,
    withBorder ? `${USER_PROFILE_CLASS_NAMES.ROOT}--${USER_PROFILE_MODIFIERS.WITH_BORDER}` : '',
    withShadow ? `${USER_PROFILE_CLASS_NAMES.ROOT}--${USER_PROFILE_MODIFIERS.WITH_SHADOW}` : '',
    withAvatar ? `${USER_PROFILE_CLASS_NAMES.ROOT}--${USER_PROFILE_MODIFIERS.WITH_AVATAR}` : '',
    withCover ? `${USER_PROFILE_CLASS_NAMES.ROOT}--${USER_PROFILE_MODIFIERS.WITH_COVER}` : '',
    className || ''
  ].filter(Boolean).join(' ');

  // Create state object for render props
  const [editMode, setEditMode] = useState(false);
  
  // Build userProfile state object to pass to render function
  const userProfileState = {
    // Configuration props
    variant,
    size,
    withBorder,
    withShadow,
    withHeader,
    withFooter,
    withAvatar,
    withCover,
    withStats,
    withBio,
    withContact,
    withSocial,
    withActions,
    withBadges,
    withTabs,
    
    // State
    editMode,
    
    // Handlers
    toggleEditMode: () => setEditMode(prev => !prev),
    setEditMode,
    
    // Sub-components
    Header: UserProfileHeader,
    Cover: UserProfileCover,
    Avatar: UserProfileAvatar,
    Info: UserProfileInfo,
    Name: UserProfileName,
    Username: UserProfileUsername,
    Title: UserProfileTitle,
    Bio: UserProfileBio,
    Stats: UserProfileStats,
    Stat: UserProfileStat,
    Contact: UserProfileContact,
    ContactItem: UserProfileContactItem,
    Social: UserProfileSocial,
    SocialItem: UserProfileSocialItem,
    Actions: UserProfileActions,
    Action: UserProfileAction,
    Badges: UserProfileBadges,
    Badge: UserProfileBadge,
    Tabs: UserProfileTabs,
    Content: UserProfileContent,
    Footer: UserProfileFooter
  };
  
  // Find and organize children by type (for standard rendering)
  const renderStandardChildren = () => {
    let header = null;
    let cover = null;
    let avatar = null;
    let info = null;
    let bio = null;
    let stats = null;
    let contact = null;
    let social = null;
    let actions = null;
    let badges = null;
    let tabs = null;
    let content = null;
    let footer = null;
    
    React.Children.forEach(children, child => {
      if (!child) return;
      
      const displayName = child.type?.displayName;
      
      if (displayName === 'UserProfile.Header') {
        header = child;
      } else if (displayName === 'UserProfile.Cover') {
        cover = child;
      } else if (displayName === 'UserProfile.Avatar') {
        avatar = child;
      } else if (displayName === 'UserProfile.Info') {
        info = child;
      } else if (displayName === 'UserProfile.Bio') {
        bio = child;
      } else if (displayName === 'UserProfile.Stats') {
        stats = child;
      } else if (displayName === 'UserProfile.Contact') {
        contact = child;
      } else if (displayName === 'UserProfile.Social') {
        social = child;
      } else if (displayName === 'UserProfile.Actions') {
        actions = child;
      } else if (displayName === 'UserProfile.Badges') {
        badges = child;
      } else if (displayName === 'UserProfile.Tabs') {
        tabs = child;
      } else if (displayName === 'UserProfile.Content') {
        content = child;
      } else if (displayName === 'UserProfile.Footer') {
        footer = child;
      }
    });
    
    return (
      <>
        {(withHeader && header) && header}
        {(withCover && cover) && cover}
        {(withAvatar && avatar) && avatar}
        {info && info}
        {(withBio && bio) && bio}
        {(withStats && stats) && stats}
        {(withContact && contact) && contact}
        {(withSocial && social) && social}
        {(withActions && actions) && actions}
        {(withBadges && badges) && badges}
        {(withTabs && tabs) && tabs}
        {content && content}
        {(withFooter && footer) && footer}
      </>
    );
  };
  
  // Render using either standard children or render props pattern
  const renderContent = () => {
    // If children is a function, use render props pattern
    if (isFunction(children)) {
      return children(userProfileState);
    }
    
    // Otherwise, use standard children approach
    return renderStandardChildren();
  };
  
  return (
    <div 
      ref={ref}
      className={userProfileClasses}
      style={style}
      role={USER_PROFILE_ARIA.ROLE}
      aria-label={USER_PROFILE_ARIA.LABEL}
      data-variant={variant}
      data-size={size}
      data-edit-mode={editMode ? 'true' : 'false'}
      {...props}
    >
      <div className={USER_PROFILE_CLASS_NAMES.CONTAINER}>
        {renderContent()}
      </div>
    </div>
  );
});

UserProfile.displayName = 'UserProfile';

UserProfile.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]),
  variant: PropTypes.oneOf(Object.values(USER_PROFILE_VARIANTS)),
  size: PropTypes.oneOf(Object.values(USER_PROFILE_SIZES)),
  withBorder: PropTypes.bool,
  withShadow: PropTypes.bool,
  withHeader: PropTypes.bool,
  withFooter: PropTypes.bool,
  withAvatar: PropTypes.bool,
  withCover: PropTypes.bool,
  withStats: PropTypes.bool,
  withBio: PropTypes.bool,
  withContact: PropTypes.bool,
  withSocial: PropTypes.bool,
  withActions: PropTypes.bool,
  withBadges: PropTypes.bool,
  withTabs: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

// Attach sub-components
UserProfile.Header = UserProfileHeader;
UserProfile.Cover = UserProfileCover;
UserProfile.Avatar = UserProfileAvatar;
UserProfile.Info = UserProfileInfo;
UserProfile.Name = UserProfileName;
UserProfile.Username = UserProfileUsername;
UserProfile.Title = UserProfileTitle;
UserProfile.Bio = UserProfileBio;
UserProfile.Stats = UserProfileStats;
UserProfile.Stat = UserProfileStat;
UserProfile.Contact = UserProfileContact;
UserProfile.ContactItem = UserProfileContactItem;
UserProfile.Social = UserProfileSocial;
UserProfile.SocialItem = UserProfileSocialItem;
UserProfile.Actions = UserProfileActions;
UserProfile.Action = UserProfileAction;
UserProfile.Badges = UserProfileBadges;
UserProfile.Badge = UserProfileBadge;
UserProfile.Tabs = UserProfileTabs;
UserProfile.Content = UserProfileContent;
UserProfile.Footer = UserProfileFooter;

export default UserProfile;
