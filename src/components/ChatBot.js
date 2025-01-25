/**
 * ChatBot Component Documentation
 * 
 * This component implements a conversational interface that guides users through
 * a structured dialogue about unlearning and self-discovery. The conversation
 * flow is personalized based on the user's emotional state.
 * 
 * Key Features:
 * - Emotion-based conversation initialization
 * - Sequential message flow with branching paths
 * - Yes/No responses for guided questions
 * - WhatsApp-style UI with message bubbles
 * - Auto-scrolling to latest messages
 * - Support for API-based responses
 */

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './ChatBot.css';

/**
 * Available emotion options for initial user selection.
 * These emotions help personalize the conversation path.
 */
const emotionOptions = [
    "Anxious",
    "Stressed",
    "Confused",
    "Overwhelmed",
    "Peaceful"
];

/**
 * Mapping of emotions to their corresponding responses and next conversation steps.
 * Each emotion has:
 * - response: Empathetic acknowledgment of the user's emotional state
 * - nextId: Reference to the next message in the conversation flow
 */
const emotionResponses = {
    "Anxious": {
        response: "I understand that anxiety can be challenging. Let's work on finding some clarity together.",
        nextId: "main1"
    },
    "Stressed": {
        response: "Stress can cloud our thinking. Let's explore ways to create some mental space.",
        nextId: "main1"
    },
    "Confused": {
        response: "It's okay to feel confused. Sometimes confusion is the first step to clarity.",
        nextId: "main1"
    },
    "Overwhelmed": {
        response: "When we're overwhelmed, it helps to take things one step at a time.",
        nextId: "main1"
    },
    "Peaceful": {
        response: "That's wonderful! A peaceful mind is most receptive to understanding.",
        nextId: "main1"
    }
};

/**
 * Main conversation flow structure.
 * Each message object contains:
 * - text: The message content to display
 * - requiresResponse: Whether user input is needed (true/false)
 * - options: Array of options for emotion selection (only for emotion state)
 * - next: Object mapping yes/no responses to next message IDs
 */
const systemMessages = {
    "emotion": {
        text: "How are you feeling today?",
        requiresResponse: true,
        options: emotionOptions
    },
    "main1": {
        text: "Would you like to explore the concept of unlearning?",
        requiresResponse: true,
        next: {
            yes: "main2",
            no: "end1"
        }
    },
    "main2": {
        text: "Great! Unlearning helps us break free from limiting beliefs. Would you like to know how?",
        requiresResponse: true,
        next: {
            yes: "main3",
            no: "end1"
        }
    },
    "main3": {
        text: "Through self-observation and understanding, we can identify our conditioned responses. Shall we explore your patterns?",
        requiresResponse: true,
        next: {
            yes: "main4",
            no: "end1"
        }
    },
    "main4": {
        text: "Excellent! Let's start by examining your daily reactions. Ready to begin?",
        requiresResponse: true,
        next: {
            yes: "end2",
            no: "end1"
        }
    },
    "end1": {
        text: "That's okay. Feel free to return when you're ready to explore this journey.",
        requiresResponse: false
    },
    "end2": {
        text: "Perfect! Let's begin our exploration of your thought patterns.",
        requiresResponse: false
    }
};

const ChatBot = () => {
    // State Management
    const [messages, setMessages] = useState([]); // Chat history
    const [inputMessage, setInputMessage] = useState(''); // User input
    const [isLoading, setIsLoading] = useState(false); // API call status
    const [suggestions, setSuggestions] = useState([]); // API response suggestions
    const [currentSystemMessageIndex, setCurrentSystemMessageIndex] = useState('emotion'); // Current message ID
    const [showSystemMessage, setShowSystemMessage] = useState(true); // Control system message flow
    const [showButtons, setShowButtons] = useState(true); // Control yes/no buttons visibility
    const navigate = useNavigate();
    const messagesEndRef = useRef(null); // Reference for auto-scrolling

    /**
     * Scrolls the chat window to the latest message
     */
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Auto-scroll when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    /**
     * Handles user's emotion selection
     * 1. Adds user's emotion choice to chat
     * 2. Responds with emotion-specific message
     * 3. Transitions to main conversation flow
     */
    const handleEmotionSelect = (emotion) => {
        // Add user's emotion response
        const userResponse = {
            text: emotion,
            isUser: true
        };
        setMessages(prev => [...prev, userResponse]);

        // Add emotion response
        const emotionResponse = emotionResponses[emotion];
        setMessages(prev => [...prev, {
            text: emotionResponse.response,
            isUser: false
        }]);
        
        // Set next message and hide buttons initially
        setCurrentSystemMessageIndex(emotionResponse.nextId);
        setShowButtons(false);
        setMessages(prev => [...prev, {
            text: systemMessages[emotionResponse.nextId].text,
            isUser: false
        }]);

        // Show buttons after 5 seconds for main1 message
        setTimeout(() => {
            setShowButtons(true);
        }, 5000);
    };

    /**
     * Handles yes/no responses in the main conversation flow
     * 1. Adds user's response to chat
     * 2. Determines next message based on response
     * 3. Shows next message or ends conversation
     */
    const handleSystemResponse = async (response) => {
        const currentMessage = systemMessages[currentSystemMessageIndex];
        if (!currentMessage) return;

        // Add user's yes/no response
        const userResponse = {
            text: response ? "Yes" : "No",
            isUser: true
        };
        setMessages(prev => [...prev, userResponse]);

        // Get next message ID based on response
        const nextMessageId = currentMessage.next?.[response ? 'yes' : 'no'];
        
        if (nextMessageId && systemMessages[nextMessageId]) {
            setCurrentSystemMessageIndex(nextMessageId);
            setShowButtons(false); // Hide buttons immediately
            setMessages(prev => [...prev, {
                text: systemMessages[nextMessageId].text,
                isUser: false
            }]);
            // Show buttons after 5 seconds
            setTimeout(() => {
                setShowButtons(true);
            }, 5000);
        } else {
            setShowSystemMessage(false);
        }
    };

    /**
     * Handles sending messages to the API
     * 1. Makes API call with user's message
     * 2. Handles API response
     * 3. Updates chat with response or suggestions
     */
    const sendMessage = async (message, isUserMessage = true) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${config.API_BASE_URL}/api/v1/chatBot/response`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: message
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            if (isUserMessage) {
                setMessages(prev => [...prev, { text: message, isUser: true }]);
            }

            if (Array.isArray(data) && data.length === 0) {
                setMessages(prev => [...prev, { 
                    text: config.DEFAULT_CHATBOT_RESPONSE, 
                    isUser: false 
                }]);
                setSuggestions([]);
            } else {
                setSuggestions(data);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                text: "Sorry, I'm having trouble connecting to the server. Please try again.", 
                isUser: false 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles form submission for user messages
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage('');
            setSuggestions([]);
        }
    };

    /**
     * Handles clicking on suggestion buttons
     */
    const handleSuggestionClick = (suggestion) => {
        setMessages(prev => [...prev, { text: suggestion, isUser: false }]);
        setSuggestions([]);
        setInputMessage('');
    };

    // Initialize chat with first system message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                text: systemMessages.emotion.text,
                isUser: false
            }]);
        }
    }, []);

    return (
        <div className="chatbot-page">
            <div className="chatbot-header">
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/add-chat-data')}
                    className="add-data-button"
                >
                    Add Data
                </Button>
            </div>
            <div className="chatbot-container">
                {/* Chat Messages Area */}
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                            <div className="message-content">
                                {message.text}
                            </div>
                            {/* Response Buttons (Emotions or Yes/No) */}
                            {!message.isUser && showSystemMessage && index === messages.length - 1 && (
                                <div className="system-response-buttons">
                                    {systemMessages[currentSystemMessageIndex]?.options ? (
                                        // Show emotion options
                                        systemMessages[currentSystemMessageIndex].options.map((option, i) => (
                                            <button 
                                                key={i}
                                                className="response-button"
                                                onClick={() => handleEmotionSelect(option)}
                                            >
                                                {option}
                                            </button>
                                        ))
                                    ) : systemMessages[currentSystemMessageIndex]?.requiresResponse && showButtons && (
                                        // Show yes/no buttons after delay
                                        <>
                                            <button 
                                                className="response-button yes"
                                                onClick={() => handleSystemResponse(true)}
                                            >
                                                Yes
                                            </button>
                                            <button 
                                                className="response-button no"
                                                onClick={() => handleSystemResponse(false)}
                                            >
                                                No
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* API Suggestions */}
                {suggestions.length > 0 && (
                    <div className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                className="suggestion-button"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                {/* Message Input Form */}
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        disabled={(showSystemMessage && systemMessages[currentSystemMessageIndex]?.requiresResponse) || isLoading}
                    />
                    <button 
                        type="submit" 
                        disabled={(showSystemMessage && systemMessages[currentSystemMessageIndex]?.requiresResponse) || isLoading || !inputMessage.trim()}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
