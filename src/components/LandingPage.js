import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Typography, Box, Grid, Card, CardContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SwipeIcon from '@mui/icons-material/Swipe';
import './LandingPage.css';

const features = [
  {
    title: "Learning Together",
    description: "Every day brings a chance to see life with fresh eyes. Let's explore what it means to learn - not just from books, but from watching life unfold around and within us. 🌱",
    emoji: "👥"
  },
  {
    title: "Looking Deeply",
    description: "Can we pause and really look at our thoughts, our reactions, our certainties? In this looking, we might discover something extraordinary about ourselves and life. 👁️",
    emoji: "🔍"
  },
  {
    title: "Growing Through Questions",
    description: "The most beautiful questions don't need immediate answers. They open doors to new ways of seeing, thinking, and being in this world. 💫",
    emoji: "❓"
  }
];

const wisdomCategories = [
  {
    title: "Understanding Our Struggles",
    emoji: "🌊",
    insights: [
      { text: "The greatest act of love is to face truth, even when it challenges everything we believe. This takes immense courage, but it's how we grow.", author: "Truth Seeker" },
      { text: "Our difficulties aren't obstacles to understanding - they're the very path to it. Each challenge invites us to look deeper, understand more.", author: "Life Observer" },
      { text: "Real freedom comes when we love truth more than our own comfort, when we're willing to question everything we think we know.", author: "Path Walker" }
    ]
  },
  {
    title: "Living and Learning",
    emoji: "🌿",
    insights: [
      { text: "To learn is to be vulnerable, to admit we don't know. This openness, this humility before life's mysteries - this is where real understanding begins.", author: "Everyday Explorer" },
      { text: "The love of truth demands that we stay with our questions, even when they make us uncomfortable. It's in this discomfort that we often find our deepest insights.", author: "Deep Questioner" },
      { text: "True learning isn't about accumulating knowledge, but about seeing life with fresh eyes, moment by moment, without the burden of the known.", author: "Clear Seer" }
    ]
  },
  {
    title: "Finding Our Way",
    emoji: "🗺️",
    insights: [
      { text: "The greatest journey isn't to some distant truth, but to the reality of what is right here, right now. This takes tremendous attention and love.", author: "Present Explorer" },
      { text: "When we truly love truth, we question not just our answers, but our questions too. Every assumption becomes an invitation to look deeper.", author: "Deep Diver" },
      { text: "Understanding ourselves isn't a destination - it's a constant unfolding that requires endless patience, curiosity, and compassion.", author: "Self Observer" }
    ]
  },
  {
    title: "Seeing Clearly",
    emoji: "🌅",
    insights: [
      { text: "Can we look at ourselves, our world, our beliefs with eyes of love? Not seeking to change or judge, but simply to understand what is?", author: "Gentle Observer" },
      { text: "The more deeply we look at life, the more we realize how little we know. This not-knowing, embraced with love, becomes a gateway to wisdom.", author: "Wonder Keeper" },
      { text: "In the silence of real observation, when we're not trying to change what we see, truth reveals itself naturally, effortlessly.", author: "Quiet Listener" }
    ]
  },
  {
    title: "Growing Together",
    emoji: "🌱",
    insights: [
      { text: "When we come together with a shared love for truth, something extraordinary happens - we create a space where real understanding can flower.", author: "Fellow Traveler" },
      { text: "The beauty of exploring together is that each person's insight enriches everyone's understanding. We learn not just from our own looking, but from each other's.", author: "Learning Friend" },
      { text: "True dialogue begins when we're willing to question our deepest beliefs together, with kindness and genuine curiosity about what is true.", author: "Truth Companion" }
    ]
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current) {
        const scrollPosition = categoriesRef.current.scrollLeft;
        const categoryWidth = categoriesRef.current.offsetWidth;
        const newActiveCategory = Math.round(scrollPosition / categoryWidth);
        setActiveCategory(newActiveCategory);
      }
    };

    const categoriesElement = categoriesRef.current;
    if (categoriesElement) {
      categoriesElement.addEventListener('scroll', handleScroll);
      return () => categoriesElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = categoriesRef.current.offsetWidth;
      categoriesRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCategory = (index) => {
    if (categoriesRef.current) {
      const scrollAmount = categoriesRef.current.offsetWidth * index;
      categoriesRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="landing-page">
      <Container maxWidth="lg">
        <Box className="hero-section">
          <Typography variant="h1" className="hero-title">
            Let's Look at Life Together
          </Typography>
          <Typography variant="h2" className="hero-subtitle">
            A space for exploring, questioning, and understanding 🌱
          </Typography>
          <Typography variant="body1" className="hero-description">
            Welcome to a place where we can explore life's deepest questions together. 
            Not to find quick answers, but to look with fresh eyes at ourselves and our world. 
            Here, every question is an opening to new understanding, and every struggle 
            is an invitation to grow.
          </Typography>
          <div className="hero-buttons">
            <Button 
              variant="contained" 
              onClick={() => navigate('/login')}
              className="start-button"
            >
              JOIN THE EXPLORATION 🌟
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/chatbot')}
              className="chatbot-button"
            >
              LET'S TALK 🤝
            </Button>
          </div>
        </Box>
      </Container>

      <div className="section-header">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title">
            Walking Together 🌿
          </Typography>
        </Container>
      </div>

      <Container maxWidth="lg">
        <Box className="features-section">
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="feature-card">
                  <div className="feature-image-container">
                    <span className="feature-emoji">{feature.emoji}</span>
                  </div>
                  <CardContent>
                    <Typography variant="h5" className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" className="feature-description">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <div className="section-header">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title">
            Shared Insights 💫
          </Typography>
        </Container>
      </div>

      <Container maxWidth="lg">
        <div className="categories-wrapper">
          <IconButton 
            className="scroll-button left"
            onClick={() => handleScroll('left')}
            disabled={activeCategory === 0}
          >
            <ChevronLeftIcon className="scroll-button-icon" />
          </IconButton>

          <IconButton 
            className="scroll-button right"
            onClick={() => handleScroll('right')}
            disabled={activeCategory === wisdomCategories.length - 1}
          >
            <ChevronRightIcon className="scroll-button-icon" />
          </IconButton>

          {activeCategory === 0 && (
            <div className="scroll-hint">
              <SwipeIcon /> Discover more
            </div>
          )}

          <div className="categories" ref={categoriesRef}>
            {wisdomCategories.map((category, index) => (
              <div key={index} className="category">
                <div className="category-header">
                  <span className="category-emoji">{category.emoji}</span>
                  <Typography variant="h5" className="category-title">
                    {category.title}
                  </Typography>
                </div>
                <div className="insight-cards">
                  {category.insights.map((insight, insightIndex) => (
                    <Card key={insightIndex} className="insight-card">
                      <CardContent>
                        <Typography variant="body1" className="insight-text">
                          "{insight.text}"
                        </Typography>
                        <Typography variant="subtitle2" className="insight-author">
                          - {insight.author}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-progress">
            {wisdomCategories.map((_, index) => (
              <div 
                key={index} 
                className={`scroll-dot ${index === activeCategory ? 'active' : ''}`}
                onClick={() => scrollToCategory(index)}
              />
            ))}
          </div>
        </div>
      </Container>

      <Box className="footer">
        <Container maxWidth="md">
          <Typography variant="body2" className="footer-text">
            © {new Date().getFullYear()} ThinkWise. All rights reserved. 
            Let's explore the beauty and mystery of life together, 
            one question at a time. 🌱
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;
