/**
 * Observation Prompts System
 * 
 * Purpose: These prompts are designed to:
 * 1. Break the pattern of mindless content consumption
 * 2. Encourage genuine self-observation rather than intellectual understanding
 * 3. Help users notice their reactions, resistances, and patterns
 * 4. Support the development of sustained attention and awareness
 * 
 * Usage Notes:
 * - Prompts should be used sparingly to prevent mechanical interaction
 * - Variation in prompt timing and content helps maintain freshness
 * - Language focuses on observation rather than judgment or achievement
 */

export const MINDFUL_LOADING_PROMPTS = [
    {
        type: 'awareness',
        text: "Before continuing, take a moment to notice:",
        subPrompts: [
            "What is your current mental state?",
            "Are you reading to understand or to escape?",
            "What expectations are you carrying?"
        ],
        minimumReflectionTime: 15 // seconds
    },
    {
        type: 'pattern',
        text: "Looking at what you've read so far:",
        subPrompts: [
            "What patterns do you notice in your reactions?",
            "Which insights created resistance in you?",
            "What assumptions of yours were challenged?"
        ],
        minimumReflectionTime: 20
    },
    {
        type: 'resistance',
        text: "If you're feeling resistance, observe:",
        subPrompts: [
            "Where in your body do you feel tension?",
            "What beliefs are being protected?",
            "Can you stay with this discomfort?"
        ],
        minimumReflectionTime: 25
    },
    {
        type: 'integration',
        text: "Before exploring more insights:",
        subPrompts: [
            "What have you truly understood (not just intellectually)?",
            "What changed in your perspective?",
            "What remains unclear or uncomfortable?"
        ],
        minimumReflectionTime: 30
    }
];

export const ENGAGEMENT_PROMPTS = [
    {
        type: 'preparation',
        text: "This insight challenges beliefs about:",
        subPrompts: [
            "Take a moment to notice your initial reaction",
            "Are you ready to question these beliefs?",
            "Can you observe without judgment?"
        ]
    },
    {
        type: 'resistance-notice',
        text: "Notice if you're:",
        subPrompts: [
            "Rushing to agree or disagree",
            "Seeking confirmation of existing beliefs",
            "Avoiding certain aspects of the insight"
        ]
    },
    {
        type: 'deepening',
        text: "To engage more deeply:",
        subPrompts: [
            "Read each sentence slowly",
            "Notice when your mind wanders",
            "Observe any urge to reach conclusions"
        ]
    }
];

// Prompts for when users try to skip reflection
export const SKIP_REFLECTION_PROMPTS = [
    {
        text: "Notice the urge to move quickly",
        subText: "What's driving this speed?"
    },
    {
        text: "Observe the resistance to pausing",
        subText: "What are you avoiding?"
    },
    {
        text: "Feel the desire for more content",
        subText: "Will gathering more information solve your challenge?"
    }
];

// Prompts for deeper engagement with challenging content
export const CHALLENGE_ENGAGEMENT_PROMPTS = [
    {
        text: "This might be uncomfortable",
        subText: "Discomfort often precedes understanding"
    },
    {
        text: "This challenges common beliefs",
        subText: "Can you observe your defensive reactions?"
    },
    {
        text: "This requires complete attention",
        subText: "Are you fully here for this exploration?"
    }
];
