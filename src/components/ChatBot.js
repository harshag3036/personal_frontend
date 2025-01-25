import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './ChatBot.css';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

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
            
            // Add user message to chat
            if (isUserMessage) {
                setMessages(prev => [...prev, { text: message, isUser: true }]);
            }

            // If API returns empty list, use default response
            if (Array.isArray(data) && data.length === 0) {
                setMessages(prev => [...prev, { 
                    text: config.DEFAULT_CHATBOT_RESPONSE, 
                    isUser: false 
                }]);
                setSuggestions([]);
            } else {
                // Set suggestions from API response
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
        // Allow user to continue the conversation after selecting a suggestion
        setInputMessage('');
    };

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
                <div className="chat-messages">
                    {messages.length === 0 && (
                        <div className="welcome-message">
                            <h2>Welcome to the Chat Bot!</h2>
                            <p>Type a message to start the conversation.</p>
                        </div>
                    )}
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
                            <div className="message-content">
                                {message.text}
                            </div>
                        </div>
                    ))}
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
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !inputMessage.trim()}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
