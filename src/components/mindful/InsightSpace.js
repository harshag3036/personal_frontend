/**
 * InsightSpace Component
 * 
 * Purpose:
 * This component creates a space for deep engagement with insights by:
 * 1. Providing context for mental preparation
 * 2. Encouraging thoughtful observation of content
 * 3. Supporting recognition of reactions and patterns
 * 4. Facilitating genuine understanding over quick consumption
 * 
 * @package components
 */

import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    Typography, 
    Box, 
    Modal,
    Button,
    Fade
} from '@mui/material';
import { ENGAGEMENT_PROMPTS } from '../../constants/observationPrompts.js';
import './InsightSpace.css';

const InsightSpace = ({ insight }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPreparation, setShowPreparation] = useState(true);
    const [readyToEngage, setReadyToEngage] = useState(false);

    const handleExpand = () => {
        if (!isExpanded) {
            setIsExpanded(true);
            setShowPreparation(true);
            setReadyToEngage(false);
        }
    };

    const handleClose = () => {
        setIsExpanded(false);
        setShowPreparation(true);
        setReadyToEngage(false);
    };

    const handleReadyToEngage = () => {
        setShowPreparation(false);
        setReadyToEngage(true);
    };

    const renderPreparationSpace = () => (
        <Box className="preparation-space">
            <Typography variant="h6" className="preparation-title">
                Prepare Your Mind
            </Typography>
            
            <Box className="preparation-prompts">
                {ENGAGEMENT_PROMPTS.map((prompt, index) => (
                    <Fade 
                        in={true} 
                        timeout={1000} 
                        style={{ transitionDelay: `${index * 500}ms` }}
                        key={prompt.type}
                    >
                        <Box className="prompt-container">
                            <Typography variant="subtitle1" className="prompt-text">
                                {prompt.text}
                            </Typography>
                            <Box className="sub-prompts">
                                {prompt.subPrompts.map((subPrompt, idx) => (
                                    <Typography 
                                        key={idx}
                                        variant="body2" 
                                        className="sub-prompt"
                                    >
                                        {subPrompt}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    </Fade>
                ))}
            </Box>

            <Button
                variant="contained"
                onClick={handleReadyToEngage}
                className="ready-button"
            >
                I'm Ready to Engage
            </Button>
        </Box>
    );

    const renderInsightContent = () => (
        <Box className="insight-content">
            <Typography variant="h5" className="insight-title">
                {insight.title}
            </Typography>

            <Box className="insight-metadata">
                <Typography variant="body2" className="preparation-time">
                    Suggested preparation: {insight.preparationTime} minutes
                </Typography>
                {insight.challengedBeliefs && (
                    <Box className="challenged-beliefs">
                        <Typography variant="body2" className="beliefs-title">
                            This insight may challenge beliefs about:
                        </Typography>
                        <Box className="beliefs-list">
                            {insight.challengedBeliefs.map((belief, index) => (
                                <Typography 
                                    key={index}
                                    variant="body2" 
                                    className="belief-item"
                                >
                                    • {belief}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>

            <Typography variant="body1" className="content">
                {insight.content}
            </Typography>
        </Box>
    );

    return (
        <React.Fragment>
            <Card 
                onClick={handleExpand} 
                className={`insight-card ${isExpanded ? 'expanded' : ''}`}
            >
                <CardContent>
                    <Typography variant="h6" className="preview-title">
                        {insight.title}
                    </Typography>
                    <Typography variant="body2" className="preview-metadata">
                        Requires: {insight.observationType}
                        {insight.preparationTime && ` • ${insight.preparationTime} min preparation`}
                    </Typography>
                </CardContent>
            </Card>

            <Modal
                open={isExpanded}
                onClose={handleClose}
                className="insight-modal"
            >
                <Box className="modal-content">
                    {showPreparation ? 
                        renderPreparationSpace() : 
                        renderInsightContent()
                    }
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default InsightSpace;
