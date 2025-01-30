import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config';
import './ChatBot.css';

// Keep all the constants (emotionOptions, emotionResponses, systemMessages) the same...
const emotionOptions = [
    "Anxious",
    "Stressed",
    "Confused",
    "Overwhelmed",
    "Peaceful"
];

const emotionResponses = {
    "Anxious": {
        response: "I understand that anxiety can be challenging. Lets go a little deep into what anxiety is? Anxiety is simply put, is a fear of lose of something important or dear to us. The fear to lose happiness. Irony here is the very progress of protecting happiness is taking away from happiness. I know, it can be difficult but a good solution is to observe the reality of your fear. Is it worth it? Life is now, is it worth it to worry over something petty?",
        nextId: "main1",
        article: {
            id: "understanding-anxiety",
            title: "Understanding and Managing Anxiety"
        }
    },
    "Stressed": {
        response: "Stress can cloud our thinking. Lets try to see how stress builds up in our mind. \n - Stress can occur when you different things of similar importance for you and thus the loss of choosing one over the other makes you feel that you lost something. \n - Stress can also uccur when reailty states that something can be done in a particular way but that way hinders the desire you wanted to fullfil from that thing. \n These situation can be understood by self-reflecting what you really want and is that want worth it to be persued?",
        nextId: "main1",
        article: {
            id: "managing-stress",
            title: "Managing Stress Through Self-Reflection"
        }
    },
    "Confused": {
        response: "It's okay to feel confused. Sometimes confusion is the first step to clarity. Confusion is a state that "
        + "can occur in lack of inner clarity. Sit back for a moment, take time to reflect on state of things.",
        nextId: "main1",
        article: {
            id: "finding-clarity",
            title: "Finding Clarity in Confusion"
        }
    },
    "Overwhelmed": {
        response: "When we're overwhelmed, it helps to take things one step at a time.",
        nextId: "main1",
        article: {
            id: "dealing-with-overwhelm",
            title: "Dealing with Overwhelming Feelings"
        }
    },
    "Peaceful": {
        response: "That's wonderful! A peaceful mind is most receptive to understanding.",
        nextId: "main1",
        article: {
            id: "maintaining-peace",
            title: "Maintaining Inner Peace"
        }
    }
};

const systemMessages = {
    "emotion": {
        messages: [
            "Welcome to the chatbot to unlearn and gain clarity about ourselves and the world. We try to be the mirror to you showing the real standing of your life because understanding the problem is the half solution done.",
            "We would never decide any life choose from your side. We will be only try to expand the field of your vision and explore how to think and observe.",
            "Will be have a long talk on this but before all that, How are you feeling today?"
        ],
        requiresResponse: true,
        options: emotionOptions,
        article: {
            id: "unlearning-intro",
            title: "Introduction to Unlearning"
        }
    },
    "main1": {
        messages: [
            "Are you ready to explore the unlearning process, or would you like to express/vent out your emotions so that, you come to a state where you can listen to the topic coming forward?"
        ],
        requiresResponse: true,
        options: ["Yes, I would like to express my emotions", "No, my mental state is good, and we can move forward with discussing forward."],
        next: {
            "yes, i would like to express my emotions": "freetext1",
            "No, my mental state is good, and we can move forward with discussing forward.": "main2",
        },
        article: {
            id: "unlearning-intro",
            title: "Introduction to Unlearning"
        }
    },
    "main2": {
        messages: [
            "Now, Let's understand what brings you here today so that we are on the same page and then have a good conversation."
        ],
        requiresResponse: true,
        allowCustomResponse: true,
        options: ["Here to explore myself", "To understand the root cause of my problems", "To cover up my problems with superficial answers", "To analyse a concept"],
        next: {
            "Here to explore myself": "main3",
            "To understand the root cause of my problems": "main3",
            "To cover up my problems with superficial answers": "end1",
            "To analyse a concept": "",
            "_custom": "main3"
        },
        article: {
            id: "limiting-beliefs",
            title: "Understanding Limiting Beliefs"
        }
    },
    "main3": {
        messages: [
            "The world is working fine as it is. There is no suffering and confusion in the world. But suffering and confusion is there for us. We are the ones who suffer and thus the need of self-observation is to see unfilters what our sitaution is, good or bad. The cause of suffering is due to the fact that we really not aware of the ever changing identities and desires we carry with us. The problem is not the identities or desires but our ignorance towards them and the fear of 'what will happan?' if I see what I really am. This leads to wrong expectations and decision resulting in the loss of joy from life.",
            "Self-observation is simply a purposeless endavour in love to acknowleadge and really understand our real state in our life, what causes suffering to me and what causes joy to me, with no desire to change it or label/judge it. Only to acknowledge the truth as it is, as a scienctist do in his laboratory."
        ],
        requiresResponse: true,
        options: ["I understand, let's proceed", "I need more clarity"],
        next: {
            "I understand, let's proceed": "main4",
            "I need more clarity": "freetext3"
        }
    },
    "main4": {
        messages: [
            "Excellent! Now that we understand the importance of self-observation,",
            "Let's start by examining your daily reactions.",
            "Are you ready to begin this journey of self-discovery?"
        ],
        requiresResponse: true,
        options: ["Yes, I'm ready", "I need time to reflect", "Let's review the previous points"],
        next: {
            "Yes, I'm ready": "end2",
            "I need time to reflect": "freetext4",
            "Let's review the previous points": "main3"
        }
    },
    "freetext1": {
        text: "Please share your emotions here. Let the gaurd kept down and let the words and letters flow in without having no particular meaning in general. You can be silent too in this conversation if you feel like doing it.",
        requiresResponse: false,
        nextMainMessage: "main2",
        buttonText: "I've expressed my emotions, let's continue"
    },
    "freetext2": {
        text: "Tell me more about what you think of limiting beliefs...",
        requiresResponse: false,
        nextMainMessage: "main3",
        buttonText: "I've shared my thoughts, let's proceed"
    },
    "freetext3": {
        text: "What patterns have you noticed in your responses?",
        requiresResponse: false,
        nextMainMessage: "main4",
        buttonText: "I've reflected on my patterns, continue"
    },
    "freetext4": {
        text: "How do you feel about this journey of self-discovery?",
        requiresResponse: false,
        nextMainMessage: "end2",
        buttonText: "I've shared my feelings, let's wrap up"
    },
    "end1": {
        messages: [
            "That's okay. It can be done simply by being ignorant about yourself, your loved ones, the world, and everything.",
            "Feel free to return when you're bored being ignorant and ready to explore a real journey full of challenge and joy."
        ],
        requiresResponse: false
    },
    "end2": {
        messages: [
            "Perfect! You've shown great openness to self-discovery.",
            "Let's begin our exploration of your thought patterns."
        ],
        requiresResponse: false
    }
};

const ChatBot2 = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [currentSystemMessageIndex, setCurrentSystemMessageIndex] = useState('emotion');
    const [showSystemMessage, setShowSystemMessage] = useState(true);
    const [showButtons, setShowButtons] = useState(true);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customResponse, setCustomResponse] = useState('');
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (messages.length === 0) {
            // Show initial messages immediately
            systemMessages.emotion.messages.forEach(text => {
                setMessages(prev => [...prev, {
                    text,
                    isUser: false,
                    messageId: 'emotion'
                }]);
            });
            setShowButtons(true);
        }
    }, []);

    const handleEmotionSelect = (emotion) => {
        // Add user's response
        setMessages(prev => [...prev, {
            text: emotion,
            isUser: true
        }]);

        // Add emotion response
        const emotionResponse = emotionResponses[emotion];
        setMessages(prev => [...prev, {
            text: emotionResponse.response,
            isUser: false,
            emotionId: emotion
        }]);
        
        // Move to next message and show it immediately
        const nextId = emotionResponse.nextId;
        setCurrentSystemMessageIndex(nextId);
        
        if (systemMessages[nextId].messages) {
            setMessages(prev => [...prev, {
                text: systemMessages[nextId].messages[0],
                isUser: false,
                messageId: nextId
            }]);
        }
        setShowButtons(true);
    };

    const handleSystemResponse = (selectedOption, isCustom = false) => {
        const currentMessage = systemMessages[currentSystemMessageIndex];
        if (!currentMessage) return;

        // Add user's response
        setMessages(prev => [...prev, {
            text: selectedOption,
            isUser: true
        }]);

        // Get next message ID
        const nextMessageId = isCustom ? currentMessage.next?._custom : currentMessage.next?.[selectedOption];
        
        if (nextMessageId && systemMessages[nextMessageId]) {
            setCurrentSystemMessageIndex(nextMessageId);

            // For freetext sections, show message and continue button immediately
            if (systemMessages[nextMessageId].text && systemMessages[nextMessageId].nextMainMessage) {
                setMessages(prev => [...prev, {
                    text: systemMessages[nextMessageId].text,
                    isUser: false,
                    messageId: nextMessageId
                }]);
                setShowButtons(true);
                return;
            }

            // For regular sections, show message immediately
            if (systemMessages[nextMessageId].messages) {
                setMessages(prev => [...prev, {
                    text: systemMessages[nextMessageId].messages[0],
                    isUser: false,
                    messageId: nextMessageId
                }]);
                setShowButtons(true);
            }
        } else {
            setShowSystemMessage(false);
        }
    };

    const handleContinue = () => {
        const currentMessage = systemMessages[currentSystemMessageIndex];
        if (!currentMessage.requiresResponse && currentMessage.nextMainMessage) {
            const nextMessageId = currentMessage.nextMainMessage;
            if (systemMessages[nextMessageId]) {
                setCurrentSystemMessageIndex(nextMessageId);

                // Show message immediately
                if (systemMessages[nextMessageId].messages) {
                    setMessages(prev => [...prev, {
                        text: systemMessages[nextMessageId].messages[0],
                        isUser: false,
                        messageId: nextMessageId
                    }]);
                    setShowButtons(true);
                }
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim()) {
            setMessages(prev => [...prev, { 
                text: inputMessage, 
                isUser: true 
            }]);
            setInputMessage('');

            const currentMessage = systemMessages[currentSystemMessageIndex];
            
            // In freetext sections, just show the continue button
            if (!currentMessage.requiresResponse && currentMessage.nextMainMessage) {
                setShowButtons(true);
            } else {
                // For regular sections, send message to API
                sendMessage(inputMessage);
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

            // In freetext sections, don't show any response
            const currentMessage = systemMessages[currentSystemMessageIndex];
            if (!currentMessage.requiresResponse && currentMessage.nextMainMessage) {
                return;
            }

            // For regular sections, show suggestions
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
                    onClick={() => navigate('/articles/unlearning-intro')}
                    className="header-button articles-button"
                >
                    View Articles
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/chatbot')}
                    className="header-button"
                >
                    Original ChatBot
                </Button>
            </div>
            <div className="chatbot-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                            <div className="message-content">
                                {message.text}
                                {!message.isUser && (
                                    (message.messageId && systemMessages[message.messageId]?.article && (
                                        <Link 
                                            to={`/articles/${systemMessages[message.messageId].article.id}`}
                                            className="info-icon"
                                        >
                                            i
                                            <span className="info-tooltip">
                                                To learn more about this topic, click here
                                            </span>
                                        </Link>
                                    )) ||
                                    (message.emotionId && emotionResponses[message.emotionId]?.article && (
                                        <Link 
                                            to={`/articles/${emotionResponses[message.emotionId].article.id}`}
                                            className="info-icon"
                                        >
                                            i
                                            <span className="info-tooltip">
                                                Learn more about {emotionResponses[message.emotionId].article.title}
                                            </span>
                                        </Link>
                                    ))
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
                    >
                        {systemMessages[currentSystemMessageIndex].buttonText}
                    </button>
                )}

                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                        disabled={(showSystemMessage && systemMessages[currentSystemMessageIndex]?.requiresResponse && showButtons) || isLoading}
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

export default ChatBot2;
