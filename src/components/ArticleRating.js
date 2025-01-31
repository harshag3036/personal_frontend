import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Rating, 
    Button, 
    TextField, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './ArticleRating.css';

const ArticleRating = ({ articleId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(-1);
    const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);

    useEffect(() => {
        loadRating();
    }, [articleId]);

    const loadRating = () => {
        const ratings = JSON.parse(localStorage.getItem('articleRatings') || '{}');
        const articleRatings = ratings[articleId] || { ratings: [], average: 0 };
        const userRating = JSON.parse(localStorage.getItem('userRatings') || '{}')[articleId] || 0;
        
        setRating(userRating);
        setAverageRating(articleRatings.average);
        setTotalRatings(articleRatings.ratings.length);
    };

    const handleRatingChange = (event, newValue) => {
        if (newValue !== null) {
            setRating(newValue);
            if (newValue >= 4) {
                setShowFeedbackDialog(true);
            } else {
                saveRating(newValue);
            }
        }
    };

    const handleFeedbackSubmit = () => {
        saveRating(rating, feedback);
        setShowFeedbackDialog(false);
        setFeedback('');
    };

    const saveRating = (ratingValue, feedbackText = '') => {
        // Save user's rating
        const userRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
        userRatings[articleId] = ratingValue;
        localStorage.setItem('userRatings', JSON.stringify(userRatings));

        // Update article ratings
        const ratings = JSON.parse(localStorage.getItem('articleRatings') || '{}');
        if (!ratings[articleId]) {
            ratings[articleId] = { ratings: [], feedback: [] };
        }

        // Add new rating and feedback
        const articleRatings = ratings[articleId];
        articleRatings.ratings.push(ratingValue);
        if (feedbackText) {
            articleRatings.feedback.push({
                rating: ratingValue,
                text: feedbackText,
                date: new Date().toISOString()
            });
        }

        // Calculate new average
        articleRatings.average = articleRatings.ratings.reduce((a, b) => a + b, 0) / articleRatings.ratings.length;

        localStorage.setItem('articleRatings', JSON.stringify(ratings));
        
        setAverageRating(articleRatings.average);
        setTotalRatings(articleRatings.ratings.length);
        setSnackbarMessage('Thank you for your rating!');
        setShowSnackbar(true);
    };

    return (
        <div className="article-rating">
            <Box className="rating-container">
                <Box className="rating-stats">
                    <Typography component="legend">Rate this article</Typography>
                    <Rating
                        name="article-rating"
                        value={rating}
                        precision={0.5}
                        onChange={handleRatingChange}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {rating !== null && (
                        <Box className="rating-label">
                            {hover !== -1 ? hover : rating}
                        </Box>
                    )}
                </Box>
                {totalRatings > 0 && (
                    <Box className="average-rating">
                        <Typography variant="body2">
                            Average rating: {averageRating.toFixed(1)} ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
                        </Typography>
                    </Box>
                )}
            </Box>

            <Dialog 
                open={showFeedbackDialog} 
                onClose={() => setShowFeedbackDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Share Your Thoughts</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" gutterBottom>
                        We're glad you found this article helpful! Would you like to share what you found most valuable?
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Your feedback (optional)"
                        fullWidth
                        multiline
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        saveRating(rating);
                        setShowFeedbackDialog(false);
                    }}>
                        Skip
                    </Button>
                    <Button 
                        onClick={handleFeedbackSubmit}
                        variant="contained"
                        disabled={!feedback.trim()}
                    >
                        Submit Feedback
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setShowSnackbar(false)} 
                    severity="success"
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ArticleRating;
