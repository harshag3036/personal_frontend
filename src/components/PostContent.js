// Post content structure with integrated components and navigation
export const componentTypes = {
    ARTICLE: 'article',
    ACTIVITY: 'activity',
    TEST: 'test',
    SURVEY: 'survey'
};

export const contentTypes = {
    TEXT: 'text',
    LIST: 'list',
    MULTIPLE_CHOICE: 'multiple_choice',
    TRUE_FALSE: 'true_false',
    SHORT_ANSWER: 'short_answer',
    RATING: 'rating',
    SCALE: 'scale'
};

export const categoryTypes = {
    LEARN: 'learn',
    PRACTICE: 'practice',
    ASSESS: 'assess',
    FEEDBACK: 'feedback'
};

// Example post content structure
export const tags = {
    TOPIC: {
        EMOTIONAL_HEALTH: 'Emotional Health',
        PERSONAL_GROWTH: 'Personal Growth',
        MINDFULNESS: 'Mindfulness',
        RELATIONSHIPS: 'Relationships',
        STRESS_MANAGEMENT: 'Stress Management',
        PSYCHOLOGY: 'Psychology',
        PHILOSOPHY: 'Philosophy'
    },
    SKILL_LEVEL: {
        BEGINNER: 'Beginner',
        INTERMEDIATE: 'Intermediate',
        ADVANCED: 'Advanced'
    },
    FORMAT: {
        GUIDE: 'Guide',
        TUTORIAL: 'Tutorial',
        EXERCISE: 'Exercise',
        ASSESSMENT: 'Assessment',
        CASE_STUDY: 'Case Study'
    },
    DURATION: {
        SHORT: '< 15 min',
        MEDIUM: '15-30 min',
        LONG: '> 30 min'
    }
};

export const postContent = {
    "cognitive-biases": {
        id: "cognitive-biases",
        title: "Understanding Cognitive Biases in Decision Making",
        description: "Explore common cognitive biases and their impact on our daily decisions",
        author: {
            id: "1",
            name: "Dr. Sarah Chen"
        },
        timestamp: Date.now(),
        tags: [
            tags.TOPIC.PSYCHOLOGY,
            tags.SKILL_LEVEL.INTERMEDIATE,
            tags.FORMAT.GUIDE,
            tags.DURATION.LONG
        ],
        components: [
            {
                type: componentTypes.ARTICLE,
                id: 'cognitive-biases-intro',
                categoryId: categoryTypes.LEARN,
                title: "Introduction to Cognitive Biases",
                order: 1,
                estimatedTime: 15,
                content: [
                    {
                        title: "What are Cognitive Biases?",
                        type: contentTypes.TEXT,
                        content: "Cognitive biases are systematic patterns of deviation from norm or rationality in judgment. These biases can lead to perceptual distortion, inaccurate judgment, illogical interpretation, or what is broadly called irrationality."
                    },
                    {
                        title: "Common Types of Biases",
                        type: contentTypes.LIST,
                        content: [
                            "Confirmation Bias - Seeking information that confirms our beliefs",
                            "Anchoring Bias - Over-relying on the first piece of information",
                            "Availability Bias - Overestimating the probability of events",
                            "Dunning-Kruger Effect - Overestimating our own abilities"
                        ]
                    }
                ]
            },
            {
                type: componentTypes.ACTIVITY,
                id: 'bias-identification',
                categoryId: categoryTypes.PRACTICE,
                title: "Bias Identification Exercise",
                order: 2,
                estimatedTime: 20,
                content: {
                    instructions: "Practice identifying cognitive biases in real-world scenarios",
                    steps: [
                        "Read each scenario carefully",
                        "Identify potential biases",
                        "Reflect on personal experiences",
                        "Develop mitigation strategies"
                    ],
                    reflection: {
                        questions: [
                            "Which biases do you notice most in your own thinking?",
                            "How have these biases affected your decisions?",
                            "What strategies can you use to overcome them?"
                        ]
                    }
                }
            }
        ]
    },
    "stoic-wisdom": {
        id: "stoic-wisdom",
        title: "Practical Applications of Stoic Philosophy",
        description: "Learn how to apply ancient Stoic principles to modern life challenges",
        author: {
            id: "2",
            name: "Prof. Marcus Reynolds"
        },
        timestamp: Date.now() - 86400000,
        tags: [
            tags.TOPIC.PHILOSOPHY,
            tags.SKILL_LEVEL.BEGINNER,
            tags.FORMAT.GUIDE,
            tags.DURATION.MEDIUM
        ],
        components: [
            {
                type: componentTypes.ARTICLE,
                id: 'stoic-principles',
                categoryId: categoryTypes.LEARN,
                title: "Core Stoic Principles",
                content: [
                    {
                        title: "The Dichotomy of Control",
                        type: contentTypes.TEXT,
                        content: "Understanding what is within our control and what isn't is fundamental to Stoic philosophy. This principle helps us focus our energy on things we can actually influence."
                    },
                    {
                        title: "Key Stoic Practices",
                        type: contentTypes.LIST,
                        content: [
                            "Negative Visualization (Premeditatio Malorum)",
                            "Self-Reflection and Journaling",
                            "Voluntary Discomfort",
                            "View From Above"
                        ]
                    }
                ]
            },
            {
                type: componentTypes.ACTIVITY,
                id: 'stoic-reflection',
                categoryId: categoryTypes.PRACTICE,
                title: "Daily Stoic Reflection",
                content: {
                    instructions: "Practice a structured Stoic reflection exercise",
                    steps: [
                        "Morning preparation",
                        "Mindful observation",
                        "Evening review",
                        "Journal your insights"
                    ],
                    reflection: {
                        questions: [
                            "What challenges did you face today with equanimity?",
                            "How did you respond to events outside your control?",
                            "What virtues did you practice today?"
                        ]
                    }
                }
            }
        ]
    },
    "mindfulness-case": {
        id: "mindfulness-case",
        title: "Mindfulness in the Workplace: A Case Study",
        description: "Examine how a tech company implemented mindfulness practices to improve productivity",
        author: {
            id: "3",
            name: "Emma Thompson"
        },
        timestamp: Date.now() - 172800000,
        tags: [
            tags.TOPIC.MINDFULNESS,
            tags.SKILL_LEVEL.INTERMEDIATE,
            tags.FORMAT.CASE_STUDY,
            tags.DURATION.MEDIUM
        ],
        components: [
            {
                type: componentTypes.ARTICLE,
                id: 'case-study',
                categoryId: categoryTypes.LEARN,
                title: "TechMind Inc. Case Study",
                content: [
                    {
                        title: "Background",
                        type: contentTypes.TEXT,
                        content: "TechMind Inc., a software development company with 200 employees, implemented a company-wide mindfulness program to address rising stress levels and declining productivity."
                    },
                    {
                        title: "Implementation Steps",
                        type: contentTypes.LIST,
                        content: [
                            "Initial assessment and employee surveys",
                            "Pilot program with leadership team",
                            "Company-wide rollout",
                            "Regular feedback and adjustments"
                        ]
                    }
                ]
            },
            {
                type: componentTypes.SURVEY,
                id: 'implementation-review',
                categoryId: categoryTypes.FEEDBACK,
                title: "Program Implementation Review",
                content: {
                    questions: [
                        {
                            id: 'effectiveness',
                            type: contentTypes.RATING,
                            question: "How effective was the mindfulness program?",
                            scale: 5
                        },
                        {
                            id: 'challenges',
                            type: contentTypes.TEXT,
                            question: "What challenges would you anticipate in implementing similar programs?"
                        }
                    ]
                }
            }
        ]
    },
    "self-awareness": {
        id: "self-awareness",
        title: "Developing Deep Self-Awareness Through Observation",
        description: "Learn techniques for cultivating genuine self-awareness and understanding",
        author: {
            id: "4",
            name: "Dr. Maya Patel"
        },
        timestamp: Date.now() - 259200000,
        tags: [
            tags.TOPIC.PERSONAL_GROWTH,
            tags.SKILL_LEVEL.ADVANCED,
            tags.FORMAT.EXERCISE,
            tags.DURATION.LONG
        ],
        components: [
            {
                type: componentTypes.ARTICLE,
                id: 'self-observation',
                categoryId: categoryTypes.LEARN,
                title: "The Art of Self-Observation",
                content: [
                    {
                        title: "Understanding Self-Observation",
                        type: contentTypes.TEXT,
                        content: "Self-observation is the practice of watching our thoughts, emotions, and behaviors without judgment. It's a fundamental skill for developing genuine self-awareness."
                    },
                    {
                        title: "Key Aspects of Self-Observation",
                        type: contentTypes.LIST,
                        content: [
                            "Non-judgmental awareness",
                            "Present moment attention",
                            "Pattern recognition",
                            "Emotional intelligence"
                        ]
                    }
                ]
            },
            {
                type: componentTypes.ACTIVITY,
                id: 'awareness-practice',
                categoryId: categoryTypes.PRACTICE,
                title: "Self-Awareness Exercise",
                content: {
                    instructions: "Practice structured self-observation techniques",
                    steps: [
                        "Create observation space",
                        "Notice without judgment",
                        "Record your observations",
                        "Identify patterns"
                    ],
                    reflection: {
                        questions: [
                            "What patterns do you notice in your thoughts?",
                            "How do your emotions affect your behavior?",
                            "What triggers certain reactions in you?"
                        ]
                    }
                }
            }
        ]
    },
    "emotional-readiness": {
        id: "emotional-readiness",
        title: "Understanding Emotional Readiness",
        description: "A comprehensive guide to emotional readiness with interactive elements",
        author: {
            id: "1",
            name: "Demo User"
        },
        timestamp: Date.now(),
        tags: [
            tags.TOPIC.EMOTIONAL_HEALTH,
            tags.SKILL_LEVEL.BEGINNER,
            tags.FORMAT.GUIDE,
            tags.DURATION.MEDIUM
        ],
        relatedPosts: ["mindfulness-basics", "stress-management"],
        components: [
            {
                type: componentTypes.ARTICLE,
                id: 'intro-article',
                categoryId: categoryTypes.LEARN,
                title: "Introduction to Emotional Readiness",
                order: 1,
                estimatedTime: 10, // minutes
                content: [
                    {
                        title: "The Role of Emotions in Self-Discovery",
                        type: contentTypes.TEXT,
                        content: "Our emotional state significantly influences our ability to engage in meaningful self-reflection and learning. Understanding and acknowledging our current emotional state is the first step in any transformative journey."
                    },
                    {
                        title: "Key Aspects",
                        type: contentTypes.LIST,
                        content: [
                            "Emotional awareness",
                            "Self-reflection capacity",
                            "Openness to change",
                            "Present moment focus"
                        ]
                    }
                ]
            },
            {
                type: componentTypes.ACTIVITY,
                id: 'emotion-journal',
                categoryId: categoryTypes.PRACTICE,
                title: "Emotion Journaling Exercise",
                order: 2,
                estimatedTime: 15,
                prerequisites: ['intro-article'],
                content: {
                    instructions: "Take a moment to reflect on your current emotional state",
                    steps: [
                        "Find a quiet space",
                        "Take three deep breaths",
                        "Notice your current emotions",
                        "Write down what you observe"
                    ],
                    reflection: {
                        questions: [
                            "What emotions are you experiencing?",
                            "Where do you feel these emotions in your body?",
                            "What triggered these emotions?"
                        ]
                    }
                }
            },
            {
                type: componentTypes.TEST,
                id: 'readiness-check',
                categoryId: categoryTypes.ASSESS,
                title: "Emotional Readiness Assessment",
                order: 3,
                estimatedTime: 10,
                prerequisites: ['intro-article', 'emotion-journal'],
                content: {
                    questions: [
                        {
                            id: 'q1',
                            type: contentTypes.MULTIPLE_CHOICE,
                            question: "Which of the following best describes emotional readiness?",
                            options: [
                                "Being happy all the time",
                                "Avoiding negative emotions",
                                "Being aware and accepting of current emotions",
                                "Only expressing positive emotions"
                            ],
                            correctAnswer: 2
                        }
                    ]
                }
            },
            {
                type: componentTypes.SURVEY,
                id: 'feedback-survey',
                categoryId: categoryTypes.FEEDBACK,
                title: "Experience Feedback",
                order: 4,
                estimatedTime: 5,
                content: {
                    questions: [
                        {
                            id: 's1',
                            type: contentTypes.RATING,
                            question: "How helpful was this content?",
                            scale: 5
                        },
                        {
                            id: 's2',
                            type: contentTypes.TEXT,
                            question: "What was your key takeaway?"
                        }
                    ]
                }
            }
        ],
        links: [
            {
                fromComponentId: 'emotion-journal',
                toComponentId: 'intro-article',
                type: 'reference',
                description: 'Based on concepts from Introduction'
            }
        ]
    }
};
