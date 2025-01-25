import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Typography, Box, Grid, Card, CardContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SwipeIcon from '@mui/icons-material/Swipe';
import './LandingPage.css';

const features = [
  {
    title: "Share Your Quirks",
    description: "Turn your insecurities into comedy gold. Because if you're gonna be roasted, might as well start the fire yourself! 🔥",
    emoji: "🤣"
  },
  {
    title: "Join the Roast Party",
    description: "Where every insecurity gets its moment in the spotlight. It's like a support group, but with better jokes! 😂",
    emoji: "🎭"
  },
  {
    title: "Self-Roast Master",
    description: "Because nobody can roast you better than yourself. Think of it as emotional stand-up comedy! 🎯",
    emoji: "🎪"
  }
];

const roastCategories = [
  {
    title: "Developer Roasts",
    emoji: "💻",
    roasts: [
      { text: "I'm such a bad programmer, my code has more bugs than features.", author: "Stack Overflow Survivor" },
      { text: "My code is so messy, even the garbage collector refused to clean it up.", author: "Clean Code Dropout" },
      { text: "I spend so much time debugging, I should add 'Professional Bug Creator' to my LinkedIn.", author: "Debug Life Crisis" }
    ]
  },
  {
    title: "Scientist Roasts",
    emoji: "🔬",
    roasts: [
      { text: "I'm so bad at experiments, even my control group got bored and left.", author: "Lab Rat Rookie" },
      { text: "My research is so slow, evolution happens faster than my progress.", author: "PhD Procrastinator" },
      { text: "I've failed so many experiments, my lab coat turned into a defeat blanket.", author: "Failed Hypothesis Hero" }
    ]
  },
  {
    title: "Common Folk Roasts",
    emoji: "🤷",
    roasts: [
      { text: "I'm so indecisive, I spent 3 hours choosing which self-roast to write.", author: "Decision Dodger" },
      { text: "My cooking is so bad, even my smoke alarm cheers when I order takeout.", author: "Kitchen Disaster" },
      { text: "I'm so bad at directions, my GPS asked for a therapist.", author: "Lost Cause" }
    ]
  },
  {
    title: "Politician Roasts",
    emoji: "🎭",
    roasts: [
      { text: "I make so many empty promises, even my mirror doesn't believe me anymore.", author: "Promise Breaker" },
      { text: "My speeches are so long, even time asks for a coffee break.", author: "Filibuster Fan" },
      { text: "I flip-flop so much, my stance is basically a gymnastics routine.", author: "Policy Acrobat" }
    ]
  },
  {
    title: "Athlete Roasts",
    emoji: "🏃",
    roasts: [
      { text: "I'm so slow, snails ask me for a head start.", author: "Tortoise Trainee" },
      { text: "My coordination is so bad, I can trip over wireless signals.", author: "Balance Beginner" },
      { text: "I drop the ball so often, gravity claims me as its best friend.", author: "Fumble Master" }
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
            Roast Yourself First!
          </Typography>
          <Typography variant="h2" className="hero-subtitle">
            Where self-deprecation meets celebration 🎉
          </Typography>
          <Typography variant="body1" className="hero-description">
            Welcome to the world's first platform where your insecurities become your superpowers! 
            Join our community of self-aware comedians who've mastered the art of laughing at themselves 
            before anyone else gets the chance.
          </Typography>
          <div className="hero-buttons">
            <Button 
              variant="contained" 
              onClick={() => navigate('/login')}
              className="start-button"
            >
              START ROASTING 🎭
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/chatbot')}
              className="chatbot-button"
            >
              CHAT BOT 🤖
            </Button>
          </div>
        </Box>
      </Container>

      <div className="section-header">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title">
            Why Join Our Roast Revolution? 🎭
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
            Self Roasts 🎯
          </Typography>
        </Container>
      </div>

      <Container maxWidth="lg">
        <div className="roast-categories-wrapper">
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
            disabled={activeCategory === roastCategories.length - 1}
          >
            <ChevronRightIcon className="scroll-button-icon" />
          </IconButton>

          {activeCategory === 0 && (
            <div className="scroll-hint">
              <SwipeIcon /> Swipe for more
            </div>
          )}

          <div className="roast-categories" ref={categoriesRef}>
            {roastCategories.map((category, index) => (
              <div key={index} className="roast-category">
                <div className="category-header">
                  <span className="category-emoji">{category.emoji}</span>
                  <Typography variant="h5" className="category-title">
                    {category.title}
                  </Typography>
                </div>
                <div className="roast-cards">
                  {category.roasts.map((roast, roastIndex) => (
                    <Card key={roastIndex} className="roast-card">
                      <CardContent>
                        <Typography variant="body1" className="roast-text">
                          "{roast.text}"
                        </Typography>
                        <Typography variant="subtitle2" className="roast-author">
                          - {roast.author}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-progress">
            {roastCategories.map((_, index) => (
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
            © {new Date().getFullYear()} RoastMe. All rights reserved. 
            By using this site, you agree to turn your insecurities into entertainment.
            Use at your own risk of becoming too self-aware! 😉
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;
