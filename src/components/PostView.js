import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Divider,
    Chip,
    Stack,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import PollIcon from '@mui/icons-material/Poll';
import TimerIcon from '@mui/icons-material/Timer';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { postContent, componentTypes } from './PostContent';
import ArticleNotes from './ArticleNotes';
import ArticleDiscussion from './ArticleDiscussion';
import PostComponent from './PostComponent';
import ArticleRating from './ArticleRating';
import ShareArticle from './ShareArticle';
import PrintArticle from './PrintArticle';
import { bookmarkArticle, removeArticleBookmark, isArticleBookmarked } from './BookmarkManager';
import './PostView.css';

const getComponentIcon = (type) => {
    switch (type) {
        case componentTypes.ARTICLE:
            return <ArticleIcon />;
        case componentTypes.ACTIVITY:
            return <AssignmentIcon />;
        case componentTypes.TEST:
            return <QuizIcon />;
        case componentTypes.SURVEY:
            return <PollIcon />;
        default:
            return <ArticleIcon />;
    }
};

const PostView = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showBookmarkDialog, setShowBookmarkDialog] = useState(false);
    const [bookmarkNote, setBookmarkNote] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const { postId } = useParams();
    const navigate = useNavigate();
    const [activeComponentId, setActiveComponentId] = useState(null);
    const post = postContent[postId];

    useEffect(() => {
        if (post && post.components.length > 0) {
            setActiveComponentId(post.components[0].id);
        }
        if (postId) {
            setIsBookmarked(isArticleBookmarked(postId));
        }
    }, [post, postId]);

    const handleBookmarkClick = () => {
        if (isBookmarked) {
            removeArticleBookmark(postId);
            setIsBookmarked(false);
            setSnackbarMessage('Content removed from bookmarks');
            setSnackbarSeverity('info');
            setShowSnackbar(true);
        } else {
            setShowBookmarkDialog(true);
        }
    };

    const handleBookmarkSubmit = () => {
        const postData = {
            id: postId,
            title: post.title,
            description: post.description
        };
        
        bookmarkArticle(postData, bookmarkNote);
        setIsBookmarked(true);
        setShowBookmarkDialog(false);
        setBookmarkNote('');
        setSnackbarMessage('Content bookmarked successfully');
        setSnackbarSeverity('success');
        setShowSnackbar(true);
    };

    if (!post) {
        return (
            <Container>
                <Typography variant="h5">Post not found</Typography>
            </Container>
        );
    }

    return (
        <div className="post-view">
            <Container maxWidth="lg">
                <Box className="post-layout">
                    <Box className="sidebar">
                        <Typography variant="h6" className="nav-title">
                            Table of Contents
                        </Typography>
                        <Box className="nav-items">
                            {post.components.map(comp => (
                                <Button
                                    key={comp.id}
                                    startIcon={getComponentIcon(comp.type)}
                                    onClick={() => setActiveComponentId(comp.id)}
                                    className={`nav-item ${activeComponentId === comp.id ? 'active' : ''}`}
                                >
                                    {comp.title}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <Box className="main-content">
                        <Paper className="post-header">
                            <Box className="post-header-actions">
                                <Box className="title-section">
                                    <Button
                                        variant="outlined"
                                        startIcon={<ArrowBackIcon />}
                                        onClick={() => navigate(-1)}
                                        className="back-button"
                                    >
                                        Back
                                    </Button>
                                    <Typography variant="h4" gutterBottom>
                                        {post.title}
                                    </Typography>
                                </Box>
                                <Box className="action-buttons">
                                    <ShareArticle 
                                        title={post.title}
                                        url={window.location.href}
                                    />
                                    <PrintArticle post={post} />
                                    <IconButton 
                                        onClick={handleBookmarkClick}
                                        className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                                    >
                                        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="body1" color="textSecondary" paragraph>
                                {post.description}
                            </Typography>
                        </Paper>

                        <Box className="component-navigation">
                            {post.components.map(comp => (
                                <Chip
                                    key={comp.id}
                                    icon={getComponentIcon(comp.type)}
                                    label={comp.title}
                                    onClick={() => setActiveComponentId(comp.id)}
                                    className={`nav-chip ${activeComponentId === comp.id ? 'active' : ''} ${comp.type}`}
                                />
                            ))}
                        </Box>

                        <Paper className="content-container">
                            {post.components.map(component => (
                                <div
                                    key={component.id}
                                    style={{ display: activeComponentId === component.id ? 'block' : 'none' }}
                                >
                                    <PostComponent component={component} />
                                    <Box className="navigation-buttons">
                                        {post.components.findIndex(c => c.id === activeComponentId) > 0 && (
                                            <Button
                                                className="nav-button prev"
                                                onClick={() => {
                                                    const currentIndex = post.components.findIndex(c => c.id === activeComponentId);
                                                    setActiveComponentId(post.components[currentIndex - 1].id);
                                                }}
                                            >
                                                <NavigateBeforeIcon />
                                                <span>Previous</span>
                                            </Button>
                                        )}
                                        {post.components.findIndex(c => c.id === activeComponentId) < post.components.length - 1 && (
                                            <Button
                                                className="nav-button next"
                                                onClick={() => {
                                                    const currentIndex = post.components.findIndex(c => c.id === activeComponentId);
                                                    setActiveComponentId(post.components[currentIndex + 1].id);
                                                }}
                                            >
                                                <span>Next</span>
                                                <NavigateNextIcon />
                                            </Button>
                                        )}
                                    </Box>
                                    {component.type === componentTypes.ARTICLE && (
                                        <>
                                            <Divider sx={{ my: 3 }} />
                                            <ArticleNotes 
                                                articleId={component.id} 
                                                articleTitle={component.title} 
                                            />
                                            <Divider sx={{ my: 3 }} />
                                            <ArticleDiscussion 
                                                articleId={component.id}
                                                currentUser={{
                                                    id: '1',
                                                    name: 'Demo User'
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            ))}
                            <ArticleRating articleId={postId} />
                        </Paper>
                    </Box>
                </Box>

                <Dialog 
                    open={showBookmarkDialog} 
                    onClose={() => setShowBookmarkDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Add to Bookmarks</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Add a note (optional)"
                            fullWidth
                            multiline
                            rows={3}
                            value={bookmarkNote}
                            onChange={(e) => setBookmarkNote(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowBookmarkDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleBookmarkSubmit} variant="contained">
                            Bookmark
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
                        severity={snackbarSeverity}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    );
};

export default PostView;
