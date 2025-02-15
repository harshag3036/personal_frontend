/**
 * ChatBot Component
 * 
 * A conversational interface that guides users through self-discovery and unlearning.
 * Features:
 * - Emotion-based personalization
 * - Structured dialogue flow
 * - Free text sections for user expression
 * - Article references for deeper learning
 * - Custom response options
 * - Typing indicators and natural delays
 */

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArticleReference from './ArticleReference';
import config from '../config';
import './ChatBot.css';

// Import message data
import { emotionOptions, emotionResponses, systemMessages } from './ChatBotData';

// ... (all the state management and helper functions remain the same)

const ChatBot = () => {
    // State management
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [currentSystemMessageIndex, setCurrentSystemMessageIndex] = useState('emotion');
    const [showSystemMessage, setShowSystemMessage] = useState(true);
    const [showButtons, setShowButtons] = useState(true);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customResponse, setCustomResponse] = useState('');
    const [isSequencePlaying, setIsSequencePlaying] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Helper function to calculate reading time in milliseconds
    const calculateReadingTime = (text) => {
        const wordsPerMinute = 250;
        const wordCount = text.split(/\s+/).length;
        const baseTime = (wordCount / wordsPerMinute) * 60 * 1000;
        const minTime = Math.max(800, wordCount * 15);
        return Math.max(baseTime, minTime);
    };

    // Helper function to add delay between messages
    const addMessageDelay = async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
    };

    // Helper function to show typing indicator before adding message
    const showTypingThenMessage = async (message, messageId) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 400));
        setIsTyping(false);
        
        setMessages(prev => [...prev, {
            text: message,
            isUser: false,
            messageId: messageId
        }]);
        
        await new Promise(resolve => setTimeout(resolve, calculateReadingTime(message) * 0.6));
    };

    // Helper function to add messages sequentially with delays
    const addMessagesSequentially = async (messages, messageId) => {
        try {
            setIsSequencePlaying(true);
            setShowButtons(false);
            
            for (let i = 0; i < messages.length; i++) {
                if (i > 0) await addMessageDelay();
                await showTypingThenMessage(messages[i], messageId);
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowButtons(true);
        } finally {
            setIsSequencePlaying(false);
            setIsTyping(false);
        }
    };

    useEffect(() => {
        const initializeChat = async () => {
            if (messages.length === 0) {
                setShowButtons(false);
                await addMessagesSequentially(systemMessages.emotion.messages, 'emotion');
            }
        };
        initializeChat();
    }, []);

    const handleEmotionSelect = async (emotion) => {
        if (isSequencePlaying) return;
        
        try {
            setIsSequencePlaying(true);
            setShowButtons(false);

            setMessages(prev => [...prev, { text: emotion, isUser: true }]);
            await addMessageDelay();

            if (emotionResponses[emotion]) {
                const emotionResponse = emotionResponses[emotion];
                await showTypingThenMessage(emotionResponse.response, emotion);
            }

            setCurrentSystemMessageIndex('main1');
            const nextMessage = systemMessages.main1;

            if (!emotionResponses[emotion] && nextMessage.variations?._custom) {
                await showTypingThenMessage(nextMessage.variations._custom[0], 'main1');
                await addMessageDelay();
            }

            await addMessagesSequentially(nextMessage.messages, 'main1');
        } finally {
            setIsSequencePlaying(false);
            setIsTyping(false);
        }
    };

    const handleSystemResponse = async (selectedOption, isCustom = false) => {
        if (isSequencePlaying) return;
        
        const currentMessage = systemMessages[currentSystemMessageIndex];
        if (!currentMessage) return;

        try {
            setIsSequencePlaying(true);
            setShowButtons(false);

            setMessages(prev => [...prev, { text: selectedOption, isUser: true }]);
            await addMessageDelay();

            const nextMessageId = isCustom ? currentMessage.next?._custom : currentMessage.next?.[selectedOption];
            
            if (nextMessageId && systemMessages[nextMessageId]) {
                setCurrentSystemMessageIndex(nextMessageId);
                const nextMessage = systemMessages[nextMessageId];

                if (nextMessage.text) {
                    await showTypingThenMessage(nextMessage.text, nextMessageId);
                    if (nextMessage.nextMainMessage) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        setShowButtons(true);
                    }
                }
                else if (nextMessage.messages) {
                    setShowButtons(false);
                    
                    if (nextMessage.variations && (nextMessage.variations[selectedOption] || nextMessage.variations._custom)) {
                        const variationText = isCustom 
                            ? nextMessage.variations._custom[0]
                            : nextMessage.variations[selectedOption][0];
                        await showTypingThenMessage(variationText, nextMessageId);
                        await addMessageDelay();
                    }

                    await addMessagesSequentially(nextMessage.messages, nextMessageId);
                } else {
                    setShowSystemMessage(false);
                }
            }
        } finally {
            setIsSequencePlaying(false);
            setIsTyping(false);
        }
    };

    const handleContinue = async () => {
        const currentMessage = systemMessages[currentSystemMessageIndex];
        
        const isFreetextSection = currentMessage?.text && currentMessage?.nextMainMessage;
        if (isSequencePlaying && !isFreetextSection) return;
        
        if (!currentMessage.requiresResponse && currentMessage.nextMainMessage) {
            try {
                setIsSequencePlaying(true);
                setShowButtons(false);

                if (currentMessage.continueMessage) {
                    await showTypingThenMessage(currentMessage.continueMessage, currentSystemMessageIndex);
                    await addMessageDelay();
                }

                const nextMessageId = currentMessage.nextMainMessage;
                if (systemMessages[nextMessageId]) {
                    setCurrentSystemMessageIndex(nextMessageId);

                    if (systemMessages[nextMessageId].text) {
                        await showTypingThenMessage(systemMessages[nextMessageId].text, nextMessageId);
                        setShowButtons(true);
                    }
                    else if (systemMessages[nextMessageId].messages) {
                        await addMessagesSequentially(systemMessages[nextMessageId].messages, nextMessageId);
                    }
                }
            } finally {
                setIsSequencePlaying(false);
                setIsTyping(false);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentMessage = systemMessages[currentSystemMessageIndex];
        
        if (inputMessage.trim() && (!isSequencePlaying || (currentMessage?.text && currentMessage?.nextMainMessage))) {
            setMessages(prev => [...prev, { 
                text: inputMessage, 
                isUser: true 
            }]);
            setInputMessage('');
            
            sendMessage(inputMessage);

            if (!currentMessage.requiresResponse && currentMessage.nextMainMessage) {
                setShowButtons(true);
            }
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setMessages(prev => [...prev, { 
            text: suggestion, 
            isUser: false,
            messageId: 'suggestion_response'
        }]);
        setSuggestions([]);
        setInputMessage('');
    };

    const sendMessage = async (message) => {
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

            const currentMessage = systemMessages[currentSystemMessageIndex];
            if (!currentMessage.requiresResponse && currentMessage.nextMainMessage) {
                return;
            }

            if (Array.isArray(data) && data.length > 0) {
                setSuggestions(data);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                text: "Sorry, I'm having trouble connecting to the server. Please try again.", 
                isUser: false,
                messageId: 'error_response'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-page">
            <div className="chatbot-header">
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/add-chat-data')}
                    className="header-button"
                >
                    Add Data
                </Button>
            </div>
            <div className="chatbot-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                            <div className="message-content">
                                {message.text}
                                {!message.isUser && (
                                    <React.Fragment>
                                        {message.messageId && systemMessages[message.messageId]?.article && (
                                            <ArticleReference 
                                                articleId={systemMessages[message.messageId].article.id}
                                                title={systemMessages[message.messageId].article.title}
                                            />
                                        )}
                                        {!message.messageId && message.text === emotionResponses[message.text]?.response && (
                                            <ArticleReference 
                                                articleId={emotionResponses[message.text].article.id}
                                                title={emotionResponses[message.text].article.title}
                                            />
                                        )}
                                    </React.Fragment>
                                )}
                            </div>
                            {!message.isUser && showSystemMessage && index === messages.length - 1 && showButtons && (
                                <div className="system-response-buttons">
                                    {systemMessages[currentSystemMessageIndex]?.options?.map((option, i) => (
                                        <button 
                                            key={i}
                                            className="response-button"
                                            onClick={() => 
                                                currentSystemMessageIndex === 'emotion' 
                                                    ? handleEmotionSelect(option)
                                                    : handleSystemResponse(option)
                                            }
                                        >
                                            {option}
                                        </button>
                                    ))}
                                    {systemMessages[currentSystemMessageIndex]?.allowCustomResponse && !showCustomInput && (
                                        <button 
                                            className="response-button custom-response-button"
                                            onClick={() => setShowCustomInput(true)}
                                        >
                                            Other (Custom)
                                        </button>
                                    )}
                                    {showCustomInput && (
                                        <div className="custom-response-input">
                                            <input
                                                type="text"
                                                value={customResponse}
                                                onChange={(e) => setCustomResponse(e.target.value)}
                                                placeholder="Type your response..."
                                                className="custom-input"
                                            />
                                            <button
                                                className="response-button submit-custom"
                                                onClick={() => {
                                                    if (customResponse.trim()) {
                                                        handleSystemResponse(customResponse, true);
                                                        setShowCustomInput(false);
                                                        setCustomResponse('');
                                                    }
                                                }}
                                                disabled={!customResponse.trim()}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                className="response-button cancel-custom"
                                                onClick={() => {
                                                    setShowCustomInput(false);
                                                    setCustomResponse('');
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message bot">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
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

                {!systemMessages[currentSystemMessageIndex]?.requiresResponse && 
                 systemMessages[currentSystemMessageIndex]?.nextMainMessage && (
                    <button 
                        className="continue-button"
                        onClick={handleContinue}
                        disabled={isSequencePlaying && !systemMessages[currentSystemMessageIndex]?.text}
                    >
                        {systemMessages[currentSystemMessageIndex]?.buttonText || "Continue"}
                    </button>
                )}

                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        disabled={
                            (showSystemMessage && systemMessages[currentSystemMessageIndex]?.requiresResponse && showButtons) || 
                            isLoading || 
                            (isSequencePlaying && !systemMessages[currentSystemMessageIndex]?.text)
                        }
                    />
                    <button 
                        type="submit" 
                        disabled={
                            (showSystemMessage && systemMessages[currentSystemMessageIndex]?.requiresResponse) || 
                            isLoading || 
                            !inputMessage.trim() ||
                            (isSequencePlaying && !systemMessages[currentSystemMessageIndex]?.text)
                        }
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;