import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    IconButton,
    Chip,
    CircularProgress,
    Fade
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimerIcon from '@mui/icons-material/Timer';
import MeditationIcon from '@mui/icons-material/SelfImprovement';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { componentTypes, contentTypes } from './PostContent';
import './PostComponent.css';

const PostComponent = ({ component }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [responses, setResponses] = useState({});
    const [expanded, setExpanded] = useState(false);
    const [isBreathing, setIsBreathing] = useState(false);
    const [breathCount, setBreathCount] = useState(0);
    const [notes, setNotes] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [breathPhase, setBreathPhase] = useState('inhale');
    const [showHint, setShowHint] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    const handleNext = () => {
        setActiveStep((prevStep) => {
            const nextStep = prevStep + 1;
            setProgress(nextStep * (100 / (component.content.steps?.length || 1)));
            return nextStep;
        });
    };

    const handleBack = () => {
        setActiveStep((prevStep) => {
            const nextStep = prevStep - 1;
            setProgress(nextStep * (100 / (component.content.steps?.length || 1)));
            return nextStep;
        });
    };

    const handleResponseChange = (questionId, value) => {
        setResponses(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const startBreathing = () => {
        setIsBreathing(true);
        let count = 0;
        const breathCycle = () => {
            setBreathPhase('inhale');
            setTimeout(() => {
                setBreathPhase('hold');
                setTimeout(() => {
                    setBreathPhase('exhale');
                    setTimeout(() => {
                        count++;
                        setBreathCount(count);
                        if (count >= 3) {
                            setIsBreathing(false);
                            handleNext();
                        } else {
                            breathCycle();
                        }
                    }, 2000); // exhale duration
                }, 2000); // hold duration
            }, 4000); // inhale duration
        };
        breathCycle();
    };

    const handleSave = async () => {
        setSaveStatus('saving');
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus(''), 2000);
        } catch (error) {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(''), 2000);
        }
    };

    const getBreathingInstructions = () => {
        switch (breathPhase) {
            case 'inhale':
                return 'Breathe in slowly...';
            case 'hold':
                return 'Hold your breath...';
            case 'exhale':
                return 'Release slowly...';
            default:
                return 'Get ready...';
        }
    };

    const renderArticle = () => (
        <Box className="article-content">
            {component.content.map((section, index) => (
                <Box key={index} className="article-section">
                    {section.title && (
                        <Typography variant="h5" gutterBottom>
                            {section.title}
                        </Typography>
                    )}
                    {section.type === contentTypes.TEXT && (
                        <Typography variant="body1" paragraph>
                            {section.content}
                        </Typography>
                    )}
                    {section.type === contentTypes.LIST && (
                        <List>
                            {section.content.map((item, i) => (
                                <ListItem key={i}>
                                    <ListItemIcon>
                                        <CheckCircleIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            ))}
        </Box>
    );

    const renderActivity = () => (
        <Box className="activity-content">
            <Box className="activity-header">
                <Typography variant="h5" gutterBottom>
                    {component.title}
                </Typography>
                <Box className="activity-meta">
                    <Chip
                        icon={<TimerIcon />}
                        label={`${component.estimatedTime} min`}
                        variant="outlined"
                        className="time-chip"
                    />
                    {component.prerequisites?.length > 0 && (
                        <Box className="prerequisites">
                            <Typography variant="caption" color="textSecondary">
                                Prerequisites:
                            </Typography>
                            {component.prerequisites.map(prereq => (
                                <Chip
                                    key={prereq}
                                    label={prereq}
                                    size="small"
                                    className="prereq-chip"
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>

            <Paper className="activity-container">
                <Box className="progress-indicator">
                    <CircularProgress
                        variant="determinate"
                        value={progress}
                        size={60}
                        thickness={4}
                        className="progress-circle"
                    />
                    <Typography variant="caption" className="progress-text">
                        {Math.round(progress)}%
                    </Typography>
                </Box>

                <Typography variant="body1" paragraph className="activity-description">
                    {component.content.instructions}
                </Typography>

                <Stepper activeStep={activeStep} orientation="vertical">
                    {component.content.steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel>
                                <Typography variant="subtitle1">
                                    {step}
                                </Typography>
                            </StepLabel>
                            <StepContent>
                                <Box className="step-content">
                                    {index === 0 && (
                                        <Box className="meditation-section">
                                            <MeditationIcon className="meditation-icon" />
                                            <Typography variant="body1" gutterBottom>
                                                Find a comfortable position and prepare for a moment of reflection.
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleNext()}
                                                className="meditation-button"
                                            >
                                                I'm Ready
                                            </Button>
                                        </Box>
                                    )}
                                    {index === 1 && (
                                        <Box className="breathing-section">
                                            <Box className="breathing-exercise">
                                                <Fade in={isBreathing} timeout={1000}>
                                                    <Box className={`breath-animation ${breathPhase}`}>
                                                        <Typography variant="h4">
                                                            {breathCount + 1}/3
                                                        </Typography>
                                                        <Typography variant="body1" className="breath-instruction">
                                                            {getBreathingInstructions()}
                                                        </Typography>
                                                        <Box className="breath-circle" />
                                                    </Box>
                                                </Fade>
                                                {!isBreathing && (
                                                    <Typography variant="body2" color="textSecondary" className="breath-tip">
                                                        Tip: Find a comfortable position and focus on your breath
                                                    </Typography>
                                                )}
                                            </Box>
                                            {!isBreathing && (
                                                <Button
                                                    variant="contained"
                                                    onClick={startBreathing}
                                                    className="breathing-button"
                                                >
                                                    Start Breathing Exercise
                                                </Button>
                                            )}
                                        </Box>
                                    )}
                                    {index === 2 && (
                                        <Box className="observation-section">
                                            <Typography variant="body1" gutterBottom>
                                                Take a moment to notice your current emotional state.
                                            </Typography>
                                            <TextField
                                                multiline
                                                rows={4}
                                                fullWidth
                                                variant="outlined"
                                                placeholder="Write your observations here..."
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                className="observation-input"
                                            />
                                                <Box className="observation-actions">
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            handleSave();
                                                            handleNext();
                                                        }}
                                                        disabled={!notes.trim()}
                                                        className="next-button"
                                                    >
                                                        Continue
                                                    </Button>
                                                    {saveStatus && (
                                                        <Typography 
                                                            variant="caption" 
                                                            className={`save-status ${saveStatus}`}
                                                        >
                                                            {saveStatus === 'saving' ? 'Saving...' : 
                                                             saveStatus === 'saved' ? 'Saved!' : 
                                                             'Error saving'}
                                                        </Typography>
                                                    )}
                                                </Box>
                                        </Box>
                                    )}
                                    {index === 3 && (
                                        <Box className="reflection-section">
                                            {component.content.reflection.questions.map((question, qIndex) => (
                                                <Box key={qIndex} className="reflection-question">
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        {question}
                                                    </Typography>
                                                    <TextField
                                                        multiline
                                                        rows={3}
                                                        fullWidth
                                                        variant="outlined"
                                                        placeholder="Your response..."
                                                        value={responses[qIndex] || ''}
                                                        onChange={(e) => handleResponseChange(qIndex, e.target.value)}
                                                        className="reflection-input"
                                                    />
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                                <Box className="step-actions">
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className="back-button"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        className="next-button"
                                        disabled={
                                            (index === 2 && !notes.trim()) ||
                                            (index === 3 && !Object.values(responses).every(r => r?.trim()))
                                        }
                                    >
                                        {activeStep === component.content.steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === component.content.steps.length && (
                    <Box className="completion-section">
                        <Typography variant="h6" gutterBottom>
                            Activity Completed!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You've successfully completed this reflection exercise. Your responses have been saved.
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => setActiveStep(0)}
                            className="restart-button"
                        >
                            Start Over
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );

    const renderTest = () => (
        <Box className="test-content">
            {component.content.questions.map((question, index) => (
                <Paper key={index} className="question-card">
                    <Typography variant="h6" gutterBottom>
                        {question.question}
                    </Typography>
                    {question.type === contentTypes.MULTIPLE_CHOICE && (
                        <List>
                            {question.options.map((option, i) => (
                                <ListItem
                                    key={i}
                                    button
                                    onClick={() => handleResponseChange(question.id, i)}
                                    className={`option-item ${responses[question.id] === i ? 'selected' : ''}`}
                                >
                                    <ListItemIcon>
                                        {responses[question.id] === i ? (
                                            <CheckCircleIcon color="primary" />
                                        ) : (
                                            <RadioButtonUncheckedIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={option} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Paper>
            ))}
        </Box>
    );

    const renderSurvey = () => (
        <Box className="survey-content">
            {component.content.questions.map((question, index) => (
                <Paper key={index} className="survey-question">
                    <Typography variant="subtitle1" gutterBottom>
                        {question.question}
                    </Typography>
                    {question.type === contentTypes.RATING && (
                        <Box className="rating-options">
                            {[...Array(question.scale)].map((_, i) => (
                                <IconButton
                                    key={i}
                                    onClick={() => handleResponseChange(question.id, i + 1)}
                                    className={`rating-button ${responses[question.id] === i + 1 ? 'selected' : ''}`}
                                >
                                    {i + 1}
                                </IconButton>
                            ))}
                        </Box>
                    )}
                    {question.type === contentTypes.TEXT && (
                        <TextField
                            multiline
                            rows={3}
                            fullWidth
                            variant="outlined"
                            placeholder="Your response..."
                            value={responses[question.id] || ''}
                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                            className="survey-input"
                        />
                    )}
                </Paper>
            ))}
        </Box>
    );

    const renderContent = () => {
        switch (component.type) {
            case componentTypes.ARTICLE:
                return renderArticle();
            case componentTypes.ACTIVITY:
                return renderActivity();
            case componentTypes.TEST:
                return renderTest();
            case componentTypes.SURVEY:
                return renderSurvey();
            default:
                return null;
        }
    };

    return (
        <Box className="post-component">
            {renderContent()}
        </Box>
    );
};

export default PostComponent;
