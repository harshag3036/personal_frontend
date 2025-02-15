/**
 * InsightCollection Component
 * 
 * Purpose:
 * This component transforms traditional content consumption into a mindful journey by:
 * 1. Limiting content load to prevent overwhelming
 * 2. Introducing reflection moments between content
 * 3. Encouraging pattern recognition in one's reactions
 * 4. Supporting genuine understanding over information gathering
 * 
 * @package components
 */

import React, { useState, useEffect } from 'react';
import { 
    Typography, 
    Paper, 
    Button, 
    Box, 
    CircularProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { MINDFUL_LOADING_PROMPTS } from '../../constants/observationPrompts.js';
import ReflectionPrompt from './ReflectionPrompt';
import InsightSpace from './InsightSpace';
import './InsightCollection.css';

const INSIGHTS_PER_PAGE = 3; // Limiting to 3 insights at a time for mindful consumption

const InsightCollection = ({ userInsights = false }) => {
    const [insights, setInsights] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showReflection, setShowReflection] = useState(false);
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInsights();
    }, [userInsights]);

    const fetchInsights = async () => {
        if (!hasMore) return;

        setLoading(true);
        const token = localStorage.getItem('token');
        const customerId = localStorage.getItem('customerId');
        const url = userInsights
            ? `${config.API_BASE_URL}/api/v1/getAllPosts/${customerId}?page=${page}&size=${INSIGHTS_PER_PAGE}`
            : `${config.API_BASE_URL}/api/v1/getAllPosts?page=${page}&size=${INSIGHTS_PER_PAGE}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                // Transform API response to include frontend-specific fields
                const enhancedInsights = data.content.map((insight) => ({
                    ...insight,
                    // Add frontend-only fields for mindful interaction
                    observationType: determineObservationType(insight),
                    preparationTime: calculatePreparationTime(insight),
                    challengedBeliefs: identifyChallengingConcepts(insight)
                }));
                
                setInsights(prevInsights => [...prevInsights, ...enhancedInsights]);
                setHasMore(data.content.length === INSIGHTS_PER_PAGE);
                
                // Show reflection prompt if not the first page
                if (page > 0) {
                    setShowReflection(true);
                }
            } else {
                console.error('Unable to fetch insights');
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching insights:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    // Helper functions to enhance insights with mindfulness metadata
    const determineObservationType = (insight) => {
        // TODO: Implement logic to determine observation type based on content
        return 'self-reflection';
    };

    const calculatePreparationTime = (insight) => {
        // TODO: Implement logic to suggest preparation time based on content depth
        return 5;
    };

    const identifyChallengingConcepts = (insight) => {
        // TODO: Implement logic to identify challenging concepts
        return ['assumption about happiness', 'belief about control'];
    };

    const handleLoadMore = () => {
        setCurrentPromptIndex(prev => (prev + 1) % MINDFUL_LOADING_PROMPTS.length);
        setShowReflection(true);
    };

    const handleReflectionComplete = () => {
        setShowReflection(false);
        setPage(prev => prev + 1);
    };

    const handleCreateInsight = () => {
        navigate('/create-post');
    };

    if (loading && insights.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (insights.length === 0 && !loading) {
        return (
            <Paper elevation={3} className="insight-collection-empty">
                <Typography variant="h5" gutterBottom>
                    {userInsights ? 'Your Journey of Understanding' : 'Shared Insights'}
                </Typography>
                <Box className="empty-state">
                    <Typography variant="body1" gutterBottom>
                        {userInsights 
                            ? "Begin your journey of sharing insights and observations." 
                            : "Be the first to share your understanding with our community."}
                    </Typography>
                    {userInsights && (
                        <Button 
                            variant="contained" 
                            onClick={handleCreateInsight}
                            className="start-button"
                        >
                            Share Your First Insight
                        </Button>
                    )}
                </Box>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} className="insight-collection">
            <Typography variant="h5" gutterBottom className="collection-title">
                {userInsights ? 'Your Journey of Understanding' : 'Shared Insights'}
            </Typography>
            
            <Box className="insights-container">
                {insights.map(insight => (
                    <InsightSpace
                        key={insight.postId}
                        insight={insight}
                    />
                ))}
            </Box>

            {showReflection ? (
                <ReflectionPrompt
                    prompt={{
                        type: MINDFUL_LOADING_PROMPTS[currentPromptIndex].type,
                        text: MINDFUL_LOADING_PROMPTS[currentPromptIndex].text,
                        subPrompts: MINDFUL_LOADING_PROMPTS[currentPromptIndex].subPrompts,
                        minimumReflectionTime: MINDFUL_LOADING_PROMPTS[currentPromptIndex].minimumReflectionTime
                    }}
                    onComplete={handleReflectionComplete}
                    showSkip={page > 1} // Allow skipping after first reflection
                />
            ) : hasMore && (
                <Box className="load-more-container">
                    <Button 
                        variant="outlined"
                        onClick={handleLoadMore}
                        className="load-more-button"
                    >
                        Explore More Insights
                    </Button>
                    <Typography variant="body2" className="load-more-subtitle">
                        Take a moment to reflect on what you've read
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default InsightCollection;
