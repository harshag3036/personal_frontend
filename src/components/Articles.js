import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../styles/shared.css';
import './Articles.css';

const articleContent = {
    "unlearning-intro": {
        title: "Introduction to Unlearning",
        content: `
            <h1>Understanding the Process of Unlearning</h1>
            <p>Unlearning is the process of letting go of previously acquired knowledge, beliefs, or habits that may no longer serve us well. It's an essential part of personal growth and development.</p>
            
            <h2>Our Role as Your Mirror</h2>
            <p>We aim to be a clear mirror, reflecting your life situation without distortion. Understanding the problem is half the solution, and this clarity comes from seeing yourself and your situation as they truly are.</p>
            
            <h2>The Power of Self-Discovery</h2>
            <ul>
                <li>We don't make decisions for you - instead, we help expand your perspective</li>
                <li>We guide you to observe and think more clearly</li>
                <li>You maintain full autonomy in your choices</li>
                <li>The journey is about understanding, not judgment</li>
            </ul>

            <h2>The Importance of Emotional Readiness</h2>
            <p>Before diving into deep exploration, it's crucial to acknowledge and process your current emotional state. This creates a foundation for meaningful insight and growth.</p>

            <h2>Key Aspects of Unlearning</h2>
            <ul>
                <li>Awareness of existing patterns</li>
                <li>Openness to new perspectives</li>
                <li>Willingness to challenge assumptions</li>
                <li>Practice and patience</li>
            </ul>

            <h2>The Journey Ahead</h2>
            <p>This journey of unlearning and self-discovery is unique for each person. We provide tools and perspectives, but the insights and growth are yours to discover.</p>
        `
    },
    "emotional-readiness": {
        title: "Understanding Emotional Readiness",
        content: `
            <h1>The Role of Emotions in Self-Discovery</h1>
            <p>Our emotional state significantly influences our ability to engage in meaningful self-reflection and learning. Understanding and acknowledging our current emotional state is the first step in any transformative journey.</p>
            
            <h2>Why Express Emotions First?</h2>
            <p>Expressing emotions before diving into deeper work serves multiple purposes:</p>
            <ul>
                <li>Creates emotional space for new insights</li>
                <li>Reduces resistance to change</li>
                <li>Helps identify underlying patterns</li>
                <li>Builds self-awareness</li>
            </ul>
            
            <h2>The Choice to Express or Proceed</h2>
            <p>You know your emotional state best. Sometimes, immediate expression is needed; other times, you're ready to move forward. Both choices are valid and can lead to meaningful growth.</p>
            
            <h2>Signs of Emotional Readiness</h2>
            <ul>
                <li>Feeling grounded and present</li>
                <li>Open to new perspectives</li>
                <li>Able to engage with challenging ideas</li>
                <li>Willing to examine beliefs and assumptions</li>
            </ul>
        `
    },
    "starting-points": {
        title: "Common Starting Points in Self-Discovery",
        content: `
            <h1>Beginning Your Journey</h1>
            <p>Everyone comes to self-discovery from a different starting point. Understanding your motivation helps create a more meaningful and relevant exploration.</p>
            
            <h2>Common Motivations</h2>
            <ul>
                <li>Self-exploration: Seeking deeper understanding of yourself</li>
                <li>Problem-solving: Looking for root causes of challenges</li>
                <li>Concept analysis: Understanding ideas more deeply</li>
                <li>Personal growth: Developing new perspectives</li>
            </ul>
            
            <h2>The Importance of Intention</h2>
            <p>Your starting point shapes your journey, but doesn't limit it. Each path can lead to unexpected insights and growth opportunities.</p>
            
            <h2>Signs of Authentic Motivation</h2>
            <ul>
                <li>Genuine curiosity about yourself and your patterns</li>
                <li>Willingness to face uncomfortable truths</li>
                <li>Openness to questioning assumptions</li>
                <li>Commitment to personal growth</li>
            </ul>
            
            <h2>Moving Forward</h2>
            <p>Regardless of your starting point, the key is to remain open and honest with yourself throughout the journey. Each step builds on the last, creating a foundation for deeper understanding.</p>
        `
    },
    "limiting-beliefs": {
        title: "Understanding Limiting Beliefs",
        content: `
            <h1>Breaking Free from Limiting Beliefs</h1>
            <p>Limiting beliefs are thoughts or attitudes that we may consider to be absolute truths but actually prevent us from growing and achieving our potential.</p>
            
            <h2>Common Sources of Limiting Beliefs</h2>
            <ul>
                <li>Childhood experiences</li>
                <li>Past failures</li>
                <li>Social conditioning</li>
                <li>Fear and uncertainty</li>
            </ul>
            
            <h2>Steps to Overcome Limiting Beliefs</h2>
            <p>Recognizing and challenging our limiting beliefs is the first step toward personal transformation. It requires self-awareness and a commitment to growth.</p>
        `
    },
    "understanding-anxiety": {
        title: "Understanding and Managing Anxiety",
        content: `
            <h1>Understanding Anxiety</h1>
            <p>Anxiety is a natural response to perceived threats or stress, but when it becomes overwhelming, it can interfere with daily life. Understanding its roots and mechanisms can help us manage it better.</p>
            
            <h2>Common Triggers</h2>
            <ul>
                <li>Fear of loss</li>
                <li>Uncertainty about the future</li>
                <li>Perfectionism</li>
                <li>Past traumatic experiences</li>
            </ul>
            
            <h2>Management Strategies</h2>
            <p>Learning to observe and understand our anxiety patterns is key to managing them effectively. This includes recognizing when anxiety serves as a protective mechanism versus when it becomes counterproductive.</p>
        `
    },
    "managing-stress": {
        title: "Managing Stress Through Self-Reflection",
        content: `
            <h1>Understanding Stress</h1>
            <p>Stress often arises from competing priorities and the tension between our desires and reality. By understanding its nature, we can develop better coping mechanisms.</p>
            
            <h2>Types of Stress</h2>
            <ul>
                <li>Decision-related stress</li>
                <li>Performance anxiety</li>
                <li>Relationship stress</li>
                <li>Environmental stress</li>
            </ul>
            
            <h2>Self-Reflection Techniques</h2>
            <p>Taking time to reflect on what truly matters helps us prioritize and reduce unnecessary stress. It's about finding balance between our aspirations and our well-being.</p>
        `
    },
    "finding-clarity": {
        title: "Finding Clarity in Confusion",
        content: `
            <h1>Navigating Through Confusion</h1>
            <p>Confusion, while uncomfortable, often precedes clarity. It's a natural part of the learning and growth process.</p>
            
            <h2>Steps to Clarity</h2>
            <ul>
                <li>Accepting uncertainty</li>
                <li>Questioning assumptions</li>
                <li>Taking time for reflection</li>
                <li>Seeking different perspectives</li>
            </ul>
            
            <h2>Benefits of Confusion</h2>
            <p>Confusion can be a sign that we're challenging our existing beliefs and making space for new understanding.</p>
        `
    },
    "dealing-with-overwhelm": {
        title: "Dealing with Overwhelming Feelings",
        content: `
            <h1>Managing Overwhelm</h1>
            <p>Feeling overwhelmed is a common experience when facing multiple challenges or changes. Breaking things down into manageable steps can help us move forward.</p>
            
            <h2>Coping Strategies</h2>
            <ul>
                <li>Breaking tasks into smaller parts</li>
                <li>Setting realistic expectations</li>
                <li>Practicing self-compassion</li>
                <li>Seeking support when needed</li>
            </ul>
        `
    },
    "maintaining-peace": {
        title: "Maintaining Inner Peace",
        content: `
            <h1>Cultivating Inner Peace</h1>
            <p>A peaceful mind is not about avoiding challenges, but about maintaining balance and perspective in the face of them.</p>
            
            <h2>Key Practices</h2>
            <ul>
                <li>Regular mindfulness practice</li>
                <li>Gratitude exercises</li>
                <li>Setting healthy boundaries</li>
                <li>Connecting with nature</li>
            </ul>
            
            <h2>Daily Habits</h2>
            <p>Small, consistent practices can help maintain inner peace even during challenging times.</p>
        `
    },
    "understanding-self-observation": {
        title: "Understanding Self-Observation: A Path to Clarity",
        content: `
            <h1>The Art of Self-Observation</h1>
            <p>The world functions perfectly as it is. Suffering and confusion exist not in the world, but in our perception of it. Through self-observation, we can understand our true situation without filters.</p>
            
            <h2>The Root of Suffering</h2>
            <p>Suffering often stems from our unawareness of our ever-changing identities and desires. The challenge isn't the existence of these identities and desires, but our ignorance towards them and our fear of seeing ourselves as we truly are.</p>
            
            <h2>True Self-Observation</h2>
            <ul>
                <li>A purposeless endeavor driven by love</li>
                <li>Understanding our real state without judgment</li>
                <li>Acknowledging what brings joy and suffering</li>
                <li>Observing without the desire to change or label</li>
            </ul>
            
            <h2>Scientific Approach</h2>
            <p>Like a scientist in their laboratory, self-observation requires objectivity and a willingness to see truth as it is, without preconceptions or judgments.</p>
        `
    },
    "deep-dive-self-observation": {
        title: "Deep Dive into Self-Observation: Learning from Nature",
        content: `
            <h1>Natural Authenticity</h1>
            <p>Nature provides us with perfect examples of authentic existence. Babies and dogs live without hiding any aspect of their personality, demonstrating pure self-expression.</p>
            
            <h2>The Process of Observation</h2>
            <ul>
                <li>Witness your desires, intentions, and beliefs</li>
                <li>Observe without the need to change</li>
                <li>Notice your reactions to what you observe</li>
                <li>See both the observer and the observed together</li>
            </ul>
            
            <h2>Understanding the Mind</h2>
            <p>The mind doesn't see reality directly; it creates a model based on its interactions and limitations. Accepting this approximation as absolute truth leads to suffering. True observation requires awareness of these limitations.</p>
            
            <h2>Key Principles</h2>
            <ul>
                <li>Observation is not an achievement</li>
                <li>It's an act of love to understand your current state</li>
                <li>Focus on the present moment</li>
                <li>Observe both reactions and intentions simultaneously</li>
            </ul>
        `
    },
    "analysis-methodology": {
        title: "Analysis Methodology: A Systematic Approach",
        content: `
            <h1>Understanding Analysis</h1>
            <p>Analysis is a systematic process of validating ideas and understanding their true worth. It begins with identifying what your concern is NOT about, which helps clear away hidden biases.</p>
            
            <h2>Key Components</h2>
            <ul>
                <li>Identifying and challenging assumptions</li>
                <li>Understanding given conditions</li>
                <li>Examining axioms and their sources</li>
                <li>Evaluating the scope of applicability</li>
            </ul>
            
            <h2>Limitations and Boundaries</h2>
            <p>Every concept has its breaking conditions and limitations. Understanding these boundaries is crucial for proper analysis.</p>
            
            <h2>Relationship with Self-Observation</h2>
            <p>While analysis is a valuable tool, it's important to remember that it serves self-observation rather than replacing it. Analysis focuses on the outer world, while self-observation deals with our inner reality.</p>
        `
    }
};

const Articles = () => {
    const { messageId } = useParams();
    const navigate = useNavigate();
    const article = articleContent[messageId];

    if (!article) {
        return (
            <div className="page-container">
                <Container maxWidth="md">
                    <Paper className="article-paper">
                        <Typography variant="h1" className="section-title">
                            Article Not Found
                        </Typography>
                        <Typography variant="body1" className="section-subtitle">
                            The requested article does not exist.
                        </Typography>
                        <Button 
                            variant="contained" 
                            className="button-primary"
                            onClick={() => navigate(-1)}
                            startIcon={<ArrowBackIcon />}
                        >
                            Go Back
                        </Button>
                    </Paper>
                </Container>
            </div>
        );
    }

    return (
        <div className="page-container">
            <Container maxWidth="md">
                <Paper className="article-paper">
                    <Button 
                        variant="contained" 
                        className="button-primary back-button"
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIcon />}
                    >
                        Back to Chat
                    </Button>
                    <div 
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </Paper>
            </Container>
        </div>
    );
};

export default Articles;
