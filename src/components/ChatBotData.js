/**
 * ChatBot Data Module
 * 
 * This module contains all the static data used by the ChatBot component:
 * - Emotion options and responses
 * - System messages for different conversation stages
 * - Article references
 * 
 * Each message can have:
 * - text: Single message to display
 * - messages: Array of messages to display sequentially
 * - requiresResponse: Whether user input is required
 * - allowCustomResponse: Whether custom input is allowed
 * - options: Array of predefined response options
 * - next: Object mapping responses to next message IDs
 * - article: Reference to related article
 * - variations: Different message variations based on context
 * - nextMainMessage: ID of next message in sequence
 * - buttonText: Custom text for continue button
 * - continueMessage: Message to show when continuing
 */

// Available emotion options for initial emotion selection
export const emotionOptions = [
    "Anxious",
    "Stressed",
    "Confused",
    "Overwhelmed",
    "Peaceful"
];

// Responses and article references for each emotion
export const emotionResponses = {
    "Anxious": {
        response: "I understand anxiety can be challenging. It often comes from fear of losing something important. Click the info icon to learn how to work with this emotion.",
        nextId: "main1",
        article: {
            id: "understanding-anxiety",
            title: "Understanding and Managing Anxiety"
        }
    },
    "Stressed": {
        response: "Stress often arises when we face competing priorities or when reality doesn't match our desires. Click the info icon to explore this further.",
        nextId: "main1",
        article: {
            id: "managing-stress",
            title: "Managing Stress Through Self-Reflection"
        }
    },
    "Confused": {
        response: "It's okay to feel confused. Sometimes confusion is the first step to clarity. Click the info icon to learn more about navigating through confusion.",
        nextId: "main1",
        article: {
            id: "finding-clarity",
            title: "Finding Clarity in Confusion"
        }
    },
    "Overwhelmed": {
        response: "When we're overwhelmed, it helps to take things one step at a time. Click the info icon to learn helpful strategies.",
        nextId: "main1",
        article: {
            id: "dealing-with-overwhelm",
            title: "Dealing with Overwhelming Feelings"
        }
    },
    "Peaceful": {
        response: "That's wonderful! A peaceful mind is most receptive to understanding. Click the info icon to learn about maintaining this state.",
        nextId: "main1",
        article: {
            id: "maintaining-peace",
            title: "Maintaining Inner Peace"
        }
    }
};

// System messages for different conversation stages
export const systemMessages = {
    // Initial emotion assessment
    "emotion": {
        messages: [
            "Welcome! This chatbot is your mirror for self-discovery and clarity. Click the info icon to learn about our approach.",
            "We're here to expand your perspective, not make decisions for you.",
            "Before we begin, how are you feeling today?"
        ],
        requiresResponse: true,
        allowCustomResponse: true,
        options: emotionOptions,
        next: {
            "Anxious": "main1",
            "Stressed": "main1",
            "Confused": "main1",
            "Overwhelmed": "main1",
            "Peaceful": "main1",
            "_custom": "main1"
        },
        article: {
            id: "unlearning-intro",
            title: "Introduction to Unlearning"
        }
    },

    // Main conversation flow
    "main1": {
        messages: [
            "Would you like to express your emotions first, or are you ready to explore the unlearning process? Click the info icon to understand why this choice matters."
        ],
        variations: {
            "_custom": [
                "Thank you for sharing how you feel. Every emotion is valid and worthy of being acknowledged. Let's explore this journey together."
            ]
        },
        requiresResponse: true,
        options: ["Yes, I would like to express my emotions", "No, my mental state is good, and we can move forward with discussing forward."],
        next: {
            "Yes, I would like to express my emotions": "freetext1",
            "No, my mental state is good, and we can move forward with discussing forward.": "main2",
        },
        article: {
            id: "unlearning-intro",
            title: "Introduction to Unlearning"
        }
    },

    "main2": {
        messages: [
            "What brings you here today? Understanding your starting point helps us have a more meaningful conversation. Click the info icon to learn about common starting points."
        ],
        requiresResponse: true,
        allowCustomResponse: true,
        options: ["Here to explore myself", "To understand the root cause of my problems", "To cover up my problems with superficial answers", "Challange me with a question", "To analyse a concept"],
        next: {
            "Here to explore myself": "main3",
            "To understand the root cause of my problems": "freetext2",
            "To cover up my problems with superficial answers": "end1",
            "To analyse a concept": "main5",
            "Challange me with a question":"end2",
            "_custom": "main3"
        },
        article: {
            id: "limiting-beliefs",
            title: "Understanding Limiting Beliefs"
        }
    },

    "main3": {
        messages: [
            "Self-observation is your mirror to understand what brings joy and suffering in your life. Like a scientist observing without judgment, you can discover the ever-changing patterns of your thoughts and desires.",
            "Click the info icon to learn more about the fascinating journey of self-observation and how it can help you gain clarity."
        ],
        article: {
            id: "understanding-self-observation",
            title: "Understanding Self-Observation: A Path to Clarity"
        },
        variations: {
            "Here to explore myself": [
                "Perfect! Let's begin your journey of self-discovery through self-observation. Click the info icon to learn more."
            ],
            "To understand the root cause of my problems": [
                "Self-observation will help you identify patterns and underlying factors. Click the info icon to learn this powerful tool."
            ],
            "_custom": [
                "Self-observation can help you reach the core of what you want. Click the info icon to learn more about this practice."
            ],
            "Let's Learn about self-observation": [
                "Let's explore how self-observation and analysis work together. Click the info icon for a detailed explanation."
            ]
        },
        requiresResponse: true,
        options: ["I understand, let's proceed", "I need more clarity"],
        next: {
            "I understand, let's proceed": "main6",
            "I need more clarity": "main4"
        }
    },

    "main4": {
        messages: [
            "Nature teaches us about authentic living. Like babies and dogs, we can learn to live without masks.",
            "Through self-observation, we can rediscover this natural authenticity. Click the info icon to learn how."
        ],
        article: {
            id: "deep-dive-self-observation",
            title: "Deep Dive into Self-Observation: Learning from Nature"
        },
        requiresResponse: true,
        options: ["Okay, now let's do some practical", "How to analyse? A little info on it"],
        next: {
            "Okay, now let's do some practical": "main6",
            "How to analyse? A little info on it":"main5"
        }
    },

    "main5": {
        messages: [
            "Analysis helps us validate ideas and clear away hidden biases.",
            "Ready to learn this powerful tool? Click the info icon to explore the complete methodology."
        ],
        article: {
            id: "analysis-methodology",
            title: "Analysis Methodology: A Systematic Approach"
        },
        variations: {
            "How to analyse? A little info on it": [
                "Analysis and self-observation serve different purposes but work together. Click the info icon to understand their relationship."
            ]
        },
        requiresResponse: true,
        options: ["Let's Learn about self-observation", "I understand, let's proceed"],
        next: {
            "Let's Learn about self-observation": "main3",
            "I understand, let's proceed": "main6"
        }
    },

    "main6": {
        messages: [
            "Now we're ready to explore your situation with clarity and understanding.",
            "Remember: A good solution comes with full responsibility - no blame, just awareness.",
            "Are you ready to take this responsibility?"
        ],
        article: {
            id: "taking-responsibility",
            title: "Taking Responsibility: The Path to Solutions"
        },
        requiresResponse: true,
        options: ["I take the responsibility to solve my problem on my own"],
        next: {
            "I take the responsibility to solve my problem on my own": "freetext3"
        }
    },

    // Freetext sections for user expression
    "freetext1": {
        text: "Please share your emotions here. Let the gaurd kept down and let the words and letters flow in without having no particular meaning in general. You can be silent too in this conversation if you feel like doing it.",
        requiresResponse: false,
        nextMainMessage: "main2",
        buttonText: "I've expressed my emotions, let's continue",
        continueMessage: "We hope you were able to share your emotions freely. Your openness helps you in understanding yourself and your current standing better."
    },

    "freetext2": {
        text: "Let's see the problem in full details. Share with us the core problem.",
        requiresResponse: false,
        nextMainMessage: "freetext2.1",
        buttonText: "I've shared my problem, let's proceed"
    },

    "freetext2.1": {
        text: "Now, tell the desires and intentions related to this problem. Like desire if you give up on being fulfilled will the problem will be disappeared for you?",
        requiresResponse: false,
        nextMainMessage: "freetext2.2",
        buttonText: "I've reflected on my desires"
    },

    "freetext2.2": {
        text: "Now, lets find out what your is not about? We sometimes forget what we really want to solve and by mistake start solving entirely unrelated problem",
        requiresResponse: false,
        nextMainMessage: "freetext2.3",
        buttonText: "So, these are the things my problem is not related too"
    },

    "freetext2.3": {
        text: "The problem we share is always based on some underlying assumptions and believes which are crucial in understanding the problem. Many times these assumptions are wrong and we start thinking a non-existing problem to be a problem",
        requiresResponse: false,
        nextMainMessage: "main3",
        buttonText: "For now, these are the assumptions I could find, will add more on the way",
        continueMessage: "Now to understand the root causes of your challenges, we'll begin by learning about self-observation - a powerful tool that can help you identify patterns and underlying factors."
    },

    "freetext3": {
        text: "Let's see the problem in full details. Share with us the core problem.",
        requiresResponse: false,
        nextMainMessage: "freetext3.1",
        buttonText: "I've shared my problem, let's proceed"
    },

    "freetext3.1": {
        text: "Now, tell the desires and intentions related to this problem. Like desire if you give up on being fulfilled will the problem will be disappeared for you?",
        requiresResponse: false,
        nextMainMessage: "freetext3.2",
        buttonText: "I've reflected on my desires"
    },

    "freetext3.2": {
        text: "Now, lets find out what your is not about? We sometimes forget what we really want to solve and by mistake start solving entirely unrelated problem",
        requiresResponse: false,
        nextMainMessage: "freetext3.3",
        buttonText: "So, these are the things my problem is not related too"
    },

    "freetext3.3": {
        text: "The problem we share is always based on some underlying assumptions and believes which are crucial in understanding the problem. Many times these assumptions are wrong and we start thinking a non-existing problem to be a problem",
        requiresResponse: false,
        nextMainMessage: "freetext3",
        buttonText: "For now, these are the assumptions I could find, will add more on the way",
        continueMessage: "Now, that you have stated your problem properly, now ask yourself questions that takes you to the breaking point of your perspective, thats where insights are born. restart by restating the problem from stach to find the insight"
    },

    // End states
    "end1": {
        messages: [
            "That's okay. It can be done simply by being ignorant about yourself, your loved ones, the world, and everything.",
            "Feel free to return when you're bored of being ignorant and ready to explore a real journey full of challenge and joy."
        ],
        requiresResponse: false
    },

    "end2": {
        messages: [
            "I have to learn more coding to integrate it here. Please wait, coming soon."
        ],
        requiresResponse: false
    }
};
