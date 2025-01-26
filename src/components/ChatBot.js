import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './ChatBot.css';

const emotionOptions = [
    "Anxious", "Stressed", "Confused", "Overwhelmed", "Peaceful"
];

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
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [currentSystemMessageIndex, setCurrentSystemMessageIndex] = useState('emotion');
    const [showSystemMessage, setShowSystemMessage] = useState(true);
    const [showButtons, setShowButtons] = useState(true);
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleEmotionSelect = (emotion) => {
        const userResponse = { text: emotion, isUser: true };
        setMessages(prev => [...prev, userResponse]);

        const emotionResponse = emotionResponses[emotion];
        setMessages(prev => [...prev, {
            text: emotionResponse.response,
            isUser: false
        }]);
        
        setCurrentSystemMessageIndex(emotionResponse.nextId);
        setShowButtons(false);
        setMessages(prev => [...prev, {
            text: systemMessages[emotionResponse.nextId].text,
            isUser: false
        }]);

        setTimeout(() => {
            setShowButtons(true);
        }, 5000);
    };

    const handleSystemResponse = async (response) => {
        const currentMessage = systemMessages[currentSystemMessageIndex];
        if (!currentMessage) return;

        const userResponse = {
            text: response ? "Yes" : "No",
            isUser: true
        };
        setMessages(prev => [...prev, userResponse]);

        const nextMessageId = currentMessage.next?.[response ? 'yes' : 'no'];
        
        if (nextMessageId && systemMessages[nextMessageId]) {
            setCurrentSystemMessageIndex(nextMessageId);
            setShowButtons(false);
            setMessages(prev => [...prev, {
                text: systemMessages[nextMessageId].text,
                isUser: false
            }]);
            setTimeout(() => {
                setShowButtons(true);
            }, 5000);
        } else {
            setShowSystemMessage(false);
        }
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage('');
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setMessages(prev => [...prev, { text: suggestion, isUser: false }]);
        setSuggestions([]);
        setInputMessage('');
    };

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
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/chatbot-update')}
                    className="update-data-button"
                    style={{ marginLeft: '10px' }}
                >
                    Update Data
                </Button>
            </div>

            <div className="chatbot-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                            <div className="message-content">
                                {message.text}
                            </div>
                            {!message.isUser && showSystemMessage && index === messages.length - 1 && (
                                <div className="system-response-buttons">
                                    {systemMessages[currentSystemMessageIndex]?.options ? (
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
