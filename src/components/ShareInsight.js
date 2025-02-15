/**
 * ShareInsight Component
 * 
 * Purpose:
 * This component guides users through mindful sharing by:
 * 1. Encouraging deep reflection before sharing
 * 2. Helping identify assumptions and patterns
 * 3. Supporting clear articulation of understanding
 * 4. Promoting responsibility in sharing insights
 */

import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Stepper,
    Step,
    StepLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './ShareInsight.css';

const REFLECTION_STEPS = [
    {
        label: 'Preparation',
        description: 'Take a moment to center yourself and clarify your understanding'
    },
    {
        label: 'Core Understanding',
        description: 'What insight has emerged from your experience?'
    },
    {
        label: 'Context & Patterns',
        description: 'What conditions or patterns led to this understanding?'
    },
    {
        label: 'Review & Share',
        description: 'Review your insight and prepare to share it mindfully'
    }
];

const INSIGHT_TYPES = [
    'Pattern Recognition',
    'Assumption Challenge',
    'Direct Observation',
    'Understanding Shift'
];

export default function ShareInsight() {
    const [activeStep, setActiveStep] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [preparationTimer, setPreparationTimer] = useState(30);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [insightType, setInsightType] = useState('');
    const [context, setContext] = useState('');
    const [assumptions, setAssumptions] = useState('');
    const [implications, setImplications] = useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        let timer;
        if (activeStep === 0 && preparationTimer > 0) {
            timer = setInterval(() => {
                setPreparationTimer(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [activeStep, preparationTimer]);

    const handleNext = () => {
        if (activeStep === REFLECTION_STEPS.length - 1) {
            handleSubmit();
        } else {
            setActiveStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/v1/createPost`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content,
                    metadata: {
                        insightType,
                        context,
                        assumptions,
                        implications
                    }
                }),
            });

            if (response.ok) {
                navigate('/home', { state: { showMyPosts: true } });
            } else {
                console.error('Unable to share insight');
            }
        } catch (error) {
            console.error('Error sharing insight:', error);
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box className="preparation-step">
                        <Typography variant="h6" gutterBottom>
                            Prepare Your Mind
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Take {preparationTimer} seconds to center yourself and reflect on what you wish to share.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setIsReady(true)}
                            disabled={preparationTimer > 0}
                            className="ready-button"
                        >
                            {preparationTimer > 0 ? `Wait ${preparationTimer}s` : "I'm Ready"}
                        </Button>
                    </Box>
                );

            case 1:
                return (
                    <Box className="core-understanding-step">
                        <TextField
                            fullWidth
                            label="Title of Your Understanding"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What is the essence of your insight?"
                            className="input-field"
                        />
                        <FormControl fullWidth className="input-field">
                            <InputLabel>Type of Insight</InputLabel>
                            <Select
                                value={insightType}
                                onChange={(e) => setInsightType(e.target.value)}
                                label="Type of Insight"
                            >
                                {INSIGHT_TYPES.map(type => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Core Understanding"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your insight clearly and directly..."
                            className="input-field"
                        />
                    </Box>
                );

            case 2:
                return (
                    <Box className="context-step">
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Context"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                            placeholder="What conditions or experiences led to this understanding?"
                            className="input-field"
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Previous Assumptions"
                            value={assumptions}
                            onChange={(e) => setAssumptions(e.target.value)}
                            placeholder="What assumptions or beliefs were challenged?"
                            className="input-field"
                        />
                    </Box>
                );

            case 3:
                return (
                    <Box className="review-step">
                        <Typography variant="h6" gutterBottom>
                            Review Your Understanding
                        </Typography>
                        <Paper elevation={0} className="review-section">
                            <Typography variant="subtitle1" gutterBottom>
                                {title}
                            </Typography>
                            <Chip label={insightType} className="insight-type-chip" />
                            <Typography variant="body1" paragraph className="content-preview">
                                {content}
                            </Typography>
                        </Paper>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Implications"
                            value={implications}
                            onChange={(e) => setImplications(e.target.value)}
                            placeholder="How might this understanding affect your life or perspective?"
                            className="input-field"
                        />
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Container maxWidth="md" className="share-insight-container">
            <Paper elevation={3} className="share-insight-paper">
                <Typography variant="h5" gutterBottom className="page-title">
                    Share Your Understanding
                </Typography>
                
                <Stepper activeStep={activeStep} className="stepper">
                    {REFLECTION_STEPS.map((step) => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box className="step-content">
                    <Typography variant="subtitle1" gutterBottom className="step-description">
                        {REFLECTION_STEPS[activeStep].description}
                    </Typography>
                    {renderStepContent(activeStep)}
                </Box>

                <Box className="action-buttons">
                    <Button
                        variant="outlined"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className="back-button"
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={activeStep === 0 && !isReady}
                        className="next-button"
                    >
                        {activeStep === REFLECTION_STEPS.length - 1 ? 'Share' : 'Next'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
