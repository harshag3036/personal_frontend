/**
 * @typedef {import('./community').Member} Member
 */

/**
 * @typedef {Object} EventActivity
 * @property {string} location
 * @property {string} startDate
 * @property {string} endDate
 * @property {number} [maxParticipants]
 * @property {string[]} [requirements]
 * @property {Member} organizer
 * @property {Member[]} attendees
 * @property {'planned' | 'in-progress' | 'completed' | 'cancelled'} status
 */

/**
 * @typedef {Object} ProjectActivity
 * @property {string} objective
 * @property {Object} timeline
 * @property {string} timeline.start
 * @property {string} [timeline.end]
 * @property {Object[]} timeline.milestones
 * @property {string} timeline.milestones[].date
 * @property {string} timeline.milestones[].description
 * @property {boolean} timeline.milestones[].completed
 * @property {Member[]} team
 * @property {string[]} resources
 * @property {'planning' | 'in-progress' | 'review' | 'completed'} status
 */

/**
 * @typedef {Object} SkillShareActivity
 * @property {string} skill
 * @property {'beginner' | 'intermediate' | 'advanced'} level
 * @property {Member} teacher
 * @property {Member[]} learners
 * @property {Object[]} sessions
 * @property {string} sessions[].date
 * @property {string} sessions[].topic
 * @property {boolean} sessions[].completed
 * @property {string[]} resources
 */

/**
 * @typedef {Object} ResourceActivity
 * @property {'document' | 'video' | 'link' | 'file'} type
 * @property {string} url
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {Member} contributor
 * @property {number} usageCount
 */

/**
 * @typedef {Object} ChallengeActivity
 * @property {string} objective
 * @property {string} description
 * @property {string} startDate
 * @property {string} endDate
 * @property {string[]} rules
 * @property {Member[]} participants
 * @property {Object[]} submissions
 * @property {string} submissions[].participantId
 * @property {string} submissions[].content
 * @property {string} submissions[].submittedAt
 * @property {Member[]} judges
 * @property {'open' | 'in-progress' | 'judging' | 'completed'} status
 */

/**
 * @typedef {Object} DiscussionActivity
 * @property {string} topic
 * @property {string} content
 * @property {string[]} tags
 * @property {Member} initiator
 * @property {Object[]} responses
 * @property {string} responses[].content
 * @property {Member} responses[].author
 * @property {string} responses[].postedAt
 * @property {boolean} responses[].isHighlighted
 * @property {'active' | 'archived' | 'locked'} status
 */

// Export empty object since we're using JSDoc for types
export default {};
