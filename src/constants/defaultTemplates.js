/**
 * Default discussion templates for different community types
 */

/**
 * Collection of predefined discussion templates
 */
export const defaultTemplates = [
  {
    id: 'philosophical',
    name: 'Philosophical Discussion',
    description: 'A structured format for philosophical discussions and debates',
    communityType: 'philosophy',
    sections: [
      {
        id: 'statement',
        label: 'Statement/Perspective',
        placeholder: 'Present your main philosophical point or perspective...',
        description: 'Clearly state your position or the idea you want to explore',
        defaultRequired: true,
        order: 1
      },
      {
        id: 'benefits',
        label: 'For the benefit of',
        placeholder: 'Who might benefit from this perspective and how...',
        description: 'Explain who this perspective might be valuable for',
        defaultRequired: false,
        order: 2
      },
      {
        id: 'limitations',
        label: 'Limitations and scope',
        placeholder: 'What are the boundaries or limitations of this statement...',
        description: 'Define the scope and limitations of your perspective',
        defaultRequired: false,
        order: 3
      },
      {
        id: 'assumptions',
        label: 'Assumptions made',
        placeholder: 'What assumptions underlie this perspective...',
        description: 'Identify the assumptions that your perspective is based on',
        defaultRequired: false,
        order: 4
      },
      {
        id: 'conflicts',
        label: 'Conflict of interest',
        placeholder: 'Any potential conflicts of interest or biases...',
        description: 'Disclose any personal interests or biases related to this topic',
        defaultRequired: false,
        order: 5
      },
      {
        id: 'references',
        label: 'References/Sources',
        placeholder: 'Sources, references, or inspirations for this perspective...',
        description: 'Cite any sources or references that support your perspective',
        defaultRequired: false,
        order: 6
      },
      {
        id: 'at_what_cost',
        label: 'At what cost?',
        placeholder: 'What might be the costs or trade-offs of adopting this perspective?',
        description: 'Reflect on the potential downsides, sacrifices, or unintended consequences',
        defaultRequired: false,
        order: 7
      }
    ],
    defaultRequiredSections: ['statement']
  },
  
  {
    id: 'sports-technique',
    name: 'Sports Technique Discussion',
    description: 'Share and discuss specific techniques, strategies, or training methods',
    communityType: 'sports',
    sections: [
      {
        id: 'technique',
        label: 'Technique/Strategy',
        placeholder: 'Describe the technique or strategy in detail...',
        description: 'Provide a clear explanation of what you\'re sharing',
        defaultRequired: true,
        order: 1
      },
      {
        id: 'skill_level',
        label: 'Suitable Skill Level',
        placeholder: 'What skill level is this appropriate for? Beginner, intermediate, advanced?',
        description: 'Help others understand if this is applicable to them',
        defaultRequired: true,
        order: 2
      },
      {
        id: 'equipment',
        label: 'Equipment Needed',
        placeholder: 'What equipment is required or recommended?',
        description: 'List any specific equipment that\'s needed',
        defaultRequired: false,
        order: 3
      },
      {
        id: 'common_mistakes',
        label: 'Common Mistakes',
        placeholder: 'What are common mistakes or pitfalls to avoid?',
        description: 'Help others avoid common errors when learning this technique',
        defaultRequired: false,
        order: 4
      },
      {
        id: 'progression',
        label: 'Training Progression',
        placeholder: 'How should someone progress when learning this?',
        description: 'Outline steps for gradually mastering this technique',
        defaultRequired: false,
        order: 5
      },
      {
        id: 'video_links',
        label: 'Video Demonstrations',
        placeholder: 'Links to videos demonstrating this technique (if available)',
        description: 'Share visual examples to help others understand',
        defaultRequired: false,
        order: 6
      },
      {
        id: 'at_what_cost',
        label: 'At what cost?',
        placeholder: 'What are the physical, mental, or time costs of implementing this technique?',
        description: 'Reflect on the potential downsides, risks, or trade-offs involved',
        defaultRequired: false,
        order: 7
      }
    ],
    defaultRequiredSections: ['technique', 'skill_level']
  },
  
  {
    id: 'creative-technique',
    name: 'Creative Technique Sharing',
    description: 'Share creative techniques, methods, and approaches',
    communityType: 'creative',
    sections: [
      {
        id: 'technique',
        label: 'Technique/Method',
        placeholder: 'Describe the creative technique or method...',
        description: 'Explain the creative approach you\'re sharing',
        defaultRequired: true,
        order: 1
      },
      {
        id: 'materials',
        label: 'Materials/Tools',
        placeholder: 'What materials or tools are needed?',
        description: 'List the resources required to use this technique',
        defaultRequired: false,
        order: 2
      },
      {
        id: 'process',
        label: 'Process/Steps',
        placeholder: 'Describe the process or steps involved...',
        description: 'Provide a step-by-step guide to using this technique',
        defaultRequired: true,
        order: 3
      },
      {
        id: 'examples',
        label: 'Examples/Results',
        placeholder: 'Share examples or results of using this technique...',
        description: 'Show what can be achieved with this approach',
        defaultRequired: false,
        order: 4
      },
      {
        id: 'variations',
        label: 'Variations/Adaptations',
        placeholder: 'What variations or adaptations are possible?',
        description: 'Suggest ways to modify or adapt this technique',
        defaultRequired: false,
        order: 5
      },
      {
        id: 'inspiration',
        label: 'Inspiration/Sources',
        placeholder: 'What inspired this technique or where did you learn it?',
        description: 'Credit sources or inspirations for this technique',
        defaultRequired: false,
        order: 6
      },
      {
        id: 'at_what_cost',
        label: 'At what cost?',
        placeholder: 'What are the creative, emotional, or resource costs of this technique?',
        description: 'Reflect on the potential challenges, limitations, or sacrifices required',
        defaultRequired: false,
        order: 7
      }
    ],
    defaultRequiredSections: ['technique', 'process']
  },
  
  {
    id: 'professional-insight',
    name: 'Professional Insight',
    description: 'Share professional insights, trends, and observations',
    communityType: 'professional',
    sections: [
      {
        id: 'insight',
        label: 'Key Insight/Observation',
        placeholder: 'What professional insight or observation are you sharing?',
        description: 'Clearly state your main professional insight',
        defaultRequired: true,
        order: 1
      },
      {
        id: 'context',
        label: 'Industry Context',
        placeholder: 'What\'s the industry context for this insight?',
        description: 'Provide background information about the industry or field',
        defaultRequired: true,
        order: 2
      },
      {
        id: 'evidence',
        label: 'Supporting Evidence',
        placeholder: 'What evidence supports this insight?',
        description: 'Share data, examples, or experiences that support your insight',
        defaultRequired: false,
        order: 3
      },
      {
        id: 'implications',
        label: 'Implications',
        placeholder: 'What are the implications of this insight?',
        description: 'Discuss what this means for professionals in the field',
        defaultRequired: false,
        order: 4
      },
      {
        id: 'action_items',
        label: 'Action Items',
        placeholder: 'What actions can professionals take based on this?',
        description: 'Suggest practical steps others can take',
        defaultRequired: false,
        order: 5
      },
      {
        id: 'experience',
        label: 'Personal Experience',
        placeholder: 'How has this insight affected your professional experience?',
        description: 'Share your personal experience related to this insight',
        defaultRequired: false,
        order: 6
      },
      {
        id: 'at_what_cost',
        label: 'At what cost?',
        placeholder: 'What are the professional, ethical, or organizational costs of this insight?',
        description: 'Reflect on potential downsides, ethical considerations, or organizational challenges',
        defaultRequired: false,
        order: 7
      }
    ],
    defaultRequiredSections: ['insight', 'context']
  },
  
  {
    id: 'standard',
    name: 'Standard Discussion',
    description: 'A simple, unstructured discussion format',
    communityType: 'general',
    sections: [
      {
        id: 'content',
        label: 'Your Thoughts',
        placeholder: 'Share your thoughts, ideas, or questions...',
        description: 'Express yourself freely',
        defaultRequired: true,
        order: 1
      },
      {
        id: 'at_what_cost',
        label: 'At what cost?',
        placeholder: 'What might be the costs, trade-offs, or consequences to consider?',
        description: 'Reflect on potential downsides or considerations others should be aware of',
        defaultRequired: false,
        order: 2
      }
    ],
    defaultRequiredSections: ['content']
  }
];

/**
 * Get a template by ID
 * @param {string} id - Template ID
 * @returns {Object|null} The template object or null if not found
 */
export const getTemplateById = (id) => {
  return defaultTemplates.find(template => template.id === id) || null;
};

/**
 * Get templates by community type
 * @param {string} communityType - Community type
 * @returns {Array} Array of templates for the specified community type
 */
export const getTemplatesByCommunityType = (communityType) => {
  return defaultTemplates.filter(template => template.communityType === communityType);
};

/**
 * Get all available templates
 * @returns {Array} All templates
 */
export const getAllTemplates = () => {
  return [...defaultTemplates];
};
