/**
 * Application Configuration
 * 
 * Purpose:
 * This file centralizes configuration settings to:
 * 1. Support different environments (development, production)
 * 2. Maintain consistent API endpoints
 * 3. Configure feature flags
 * 4. Define system-wide constants
 */

const config = {
    // API Configuration
    API_BASE_URL: 'https://speak-up-5d972ba13c56.herokuapp.com',
    
    // Feature Flags
    features: {
        // Mindful Interaction Features
        ENABLE_REFLECTION_PROMPTS: true,
        ENABLE_PREPARATION_SPACE: true,
        MINIMUM_REFLECTION_TIME: 15, // seconds
        
        // Content Loading
        INSIGHTS_PER_PAGE: 3,
        ENABLE_INFINITE_SCROLL: false,
        
        // User Experience
        ENABLE_ANIMATIONS: true,
        SHOW_PREPARATION_TIME: true
    },
    
    // Content Settings
    content: {
        MAX_TITLE_LENGTH: 100,
        MAX_CONTENT_LENGTH: 5000,
        SUPPORTED_LANGUAGES: ['en'],
    },
    
    // Theme Configuration
    theme: {
        // Colors
        primaryColor: '#4a6fa5',
        secondaryColor: '#6b8e23',
        textColor: '#333333',
        
        // Typography
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        baseFontSize: '16px',
        
        // Spacing
        baseSpacing: '1rem',
        containerWidth: '1200px'
    }
};

export default config;