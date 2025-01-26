import React, { useState } from 'react';
import { TextField, Button, Snackbar, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import config from '../config';
import './Feedback.css';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedback.trim()) return;

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/v1/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: feedback
            });

            if (response.ok) {
                setSnackbar({ open: true, message: 'Feedback submitted successfully!' });
                setFeedback('');
            } else {
                throw new Error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Feedback error:', error);
            setSnackbar({ open: true, message: 'Failed to submit feedback. Please try again.' });
        }
    };

    return (
        <div className="footer-section">
            <div className="disclaimer">
                <Typography variant="body2" color="textSecondary" align="center">
                    Disclaimer: This is a platform for open communication. Please be respectful and mindful of others.
                </Typography>
            </div>
            <Paper elevation={0} className="feedback-paper">
                <Typography variant="subtitle1" gutterBottom align="center">
                    We value your feedback
                </Typography>
                <form onSubmit={handleSubmit} className="feedback-form">
                    <TextField
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Give your valuable feedback..."
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        disabled={!feedback.trim()}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </div>
    );
};

export default Feedback;
