/**
 * Types for structured discussion templates
 */

/**
 * Template section definition
 * @typedef {Object} TemplateSection
 * @property {string} id - Unique identifier for the section
 * @property {string} label - Display label for the section
 * @property {string} placeholder - Placeholder text for the section input
 * @property {string} [description] - Optional description of the section purpose
 * @property {boolean} defaultRequired - Whether this section is required by default
 * @property {number} order - Display order of the section
 */

/**
 * Discussion template definition
 * @typedef {Object} DiscussionTemplate
 * @property {string} id - Unique identifier for the template
 * @property {string} name - Display name for the template
 * @property {string} description - Description of the template purpose
 * @property {string} communityType - Type of community this template is designed for
 * @property {TemplateSection[]} sections - Sections included in this template
 * @property {string[]} defaultRequiredSections - IDs of sections that are required by default
 * @property {boolean} [strictRigourEnforcement] - Whether to strictly enforce rigour requirements (default: false)
 */

/**
 * Structured comment data
 * @typedef {Object} StructuredComment
 * @property {string} id - Unique identifier for the comment
 * @property {string} userId - ID of the user who created the comment
 * @property {string} userName - Name of the user who created the comment
 * @property {string} activityId - ID of the activity this comment belongs to
 * @property {string} [parentId] - ID of the parent comment (if this is a reply)
 * @property {string} createdAt - ISO timestamp of when the comment was created
 * @property {string} [updatedAt] - ISO timestamp of when the comment was last updated
 * @property {string} [templateId] - ID of the template used for this comment
 * @property {Object.<string, string>} sections - Map of section IDs to their content
 * @property {Object} [reactions] - Map of reaction types to their data
 * @property {boolean} [isPinned] - Whether this comment is pinned
 * @property {boolean} [isHidden] - Whether this comment is hidden
 */

export {};
