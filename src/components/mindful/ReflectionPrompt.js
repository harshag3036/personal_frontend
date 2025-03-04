/**
 * ReflectionPrompt Component
 * 
 * Purpose:
 * This component creates intentional pauses in content consumption to:
 * 1. Break the habit of mindless scrolling
 * 2. Encourage genuine self-observation
 * 3. Help users notice their patterns and resistances
 * 4. Transform content consumption into contemplation
 * 
 * @package components/mindful
 */

import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    CircularProgress,
    Fade
} from '@mui/material';
import './ReflectionPrompt.css';

const ReflectionPrompt = ({
    prompt,
    onComplete,
    onSkip,
    showSkip = false
}) => {
    const [timeRemaining, setTimeRemaining] = useState(prompt.minimumReflectionTime || 0);
    const [showSubPrompts, setShowSubPrompts] = useState(false);
    const [currentSubPrompt, setCurrentSubPrompt] = useState(0);

    useEffect(() => {
        // Show sub-prompts after 2 seconds
        const subPromptsTimer = setTimeout(() => {
            setShowSubPrompts(true);
        }, 2000);

        // Rotate through sub-prompts every 8 seconds
        const rotationInterval = setInterval(() => {
            if (prompt.subPrompts) {
                setCurrentSubPrompt(prev => 
                    (prev + 1) % prompt.subPrompts.length
                );
            }
        }, 8000);

        // Count down the minimum reflection time
        const timer = setInterval(() => {
            setTimeRemaining(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => {
            clearTimeout(subPromptsTimer);
            clearInterval(rotationInterval);
            clearInterval(timer);
        };
    }, [prompt]);

    const handleContinue = () => {
        if (timeRemaining === 0) {
            onComplete();
        }
    };

    const progress = ((prompt.minimumReflectionTime || 0) - timeRemaining) / 
                    (prompt.minimumReflectionTime || 1) * 100;

    return (
        <Box className="reflection-prompt-container">
            <Box className="reflection-prompt-content">
                <Typography variant="h6" className="reflection-prompt-title">
                    {prompt.text}
                </Typography>

                <Fade in={showSubPrompts} timeout={1000}>
                    <Box className="reflection-subprompts">
                        {prompt.subPrompts && (
                            <Typography 
                                variant="body1" 
                                className="reflection-subprompt"
                            >
                                {prompt.subPrompts[currentSubPrompt]}
                            </Typography>
                        )}
                    </Box>
                </Fade>

                <Box className="reflection-timer">
                    <CircularProgress 
                        variant="determinate" 
                        value={progress} 
                        className="reflection-progress"
                    />
                    <Typography variant="body2" className="time-remaining">
                        {timeRemaining > 0 ? 
                            `${timeRemaining}s remaining` : 
                            "Ready to continue"
                        }
                    </Typography>
                </Box>

                <Box className="reflection-actions">
                    <Button
                        variant="contained"
                        onClick={handleContinue}
                        disabled={timeRemaining > 0}
                        className="continue-button"
                    >
                        Continue
                    </Button>
                    
                    {showSkip && onSkip && timeRemaining > 0 && (
                        <Button
                            variant="text"
                            onClick={onSkip}
                            className="skip-button"
                        >
                            I need to move on
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ReflectionPrompt;
