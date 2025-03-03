/**
 * @typedef {'open' | 'private'} CommunityType
 */

/**
 * @typedef {'discussion' | 'event' | 'project' | 'skill-share' | 'resource' | 'challenge'} ActivityType
 */

/**
 * @typedef {Object} Member
 * @property {string} id
 * @property {string} name
 * @property {'admin' | 'moderator' | 'member'} role
 * @property {string} joinedAt
 * @property {string[]} [skills]
 * @property {number} [contributions]
 */

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {ActivityType} type
 * @property {string} title
 * @property {string} description
 * @property {string} createdBy
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string[]} participants
 * @property {'active' | 'completed' | 'archived'} status
 * @property {Object} metadata
 * @property {string} [metadata.location]
 * @property {string} [metadata.startDate]
 * @property {string} [metadata.endDate]
 * @property {string[]} [metadata.resources]
 * @property {string[]} [metadata.skills]
 */

/**
 * @typedef {Object} Community
 * @property {string} id
 * @property {CommunityType} type
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {Member[]} members
 * @property {Activity[]} activities
 * @property {string[]} tags
 * @property {boolean} isPrivate
 * @property {Object} settings
 * @property {boolean} settings.allowGuests
 * @property {boolean} settings.requireApproval
 * @property {boolean} settings.allowResourceSharing
 * @property {boolean} settings.enableSkillTracking
 * @property {Object} stats
 * @property {number} stats.memberCount
 * @property {number} stats.activityCount
 * @property {number} stats.engagementRate
 * @property {string} stats.lastActive
 */

// Export empty object since we're using JSDoc for types
export default {};
