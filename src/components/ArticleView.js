import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Button, 
    Container, 
    Typography, 
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert,
    Divider,
    Grid,
    Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { bookmarkArticle, removeArticleBookmark, isArticleBookmarked } from './BookmarkManager';
import { getCommentCount } from './DiscussionManager';
import ArticleRating from './ArticleRating';
import TableOfContents from './TableOfContents';
import ReadingProgress from './ReadingProgress';
import ShareArticle from './ShareArticle';
import PrintArticle from './PrintArticle';
import ArticleNotes from './ArticleNotes';
import ArticleDiscussion from './ArticleDiscussion';
import { articleContent } from './ArticleContent';
import '../styles/shared.css';
import './Articles.css';

/**
 * ArticleSection Component
 * Renders a section of an article with title, content, and/or list
 */
const ArticleSection = ({ title, content, list }) => {
    const sectionId = title ? title.toLowerCase().replace(/\s+/g, '-') : '';
    return (
    <div className="article-section" id={sectionId}>
        {title && <Typography variant="h2" className="section-heading" id={sectionId}>{title}</Typography>}
        {content && <Typography variant="body1" className="section-content">{content}</Typography>}
        {list && (
            <div className="section-list">
                {list.map((item, index) => (
                    <div key={index} className="list-item">
                        <span className="bullet">•</span>
                        <Typography variant="body1">{item}</Typography>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
};

/**
 * Articles Component
 * Displays article content with proper formatting and navigation
 */
const ArticleView = () => {
    const { messageId } = useParams();
    const navigate = useNavigate();
    const article = articleContent[messageId];
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showBookmarkDialog, setShowBookmarkDialog] = useState(false);
    const [bookmarkNote, setBookmarkNote] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        if (messageId) {
            setCommentCount(getCommentCount(messageId));
        }
    }, [messageId]);

    useEffect(() => {
        if (messageId) {
            setIsBookmarked(isArticleBookmarked(messageId));
        }
    }, [messageId]);

    const handleBookmarkClick = () => {
        if (isBookmarked) {
            removeArticleBookmark(messageId);
            setIsBookmarked(false);
            setSnackbarMessage('Article removed from bookmarks');
            setSnackbarSeverity('info');
            setShowSnackbar(true);
        } else {
            setShowBookmarkDialog(true);
        }
    };

    const handleBookmarkSubmit = () => {
        const articleData = {
            id: messageId,
            title: article.title,
            description: `Article about ${article.title.toLowerCase()}`
        };
        
        bookmarkArticle(articleData, bookmarkNote);
        setIsBookmarked(true);
        setShowBookmarkDialog(false);
        setBookmarkNote('');
        setSnackbarMessage('Article bookmarked successfully');
        setSnackbarSeverity('success');
        setShowSnackbar(true);
    };

    if (!article) {
        return (
            <div className="page-container">
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Paper className="article-paper">
                        <Typography variant="h1" className="section-title">
                            Article Not Found
                        </Typography>
                        <Typography variant="body1" className="section-subtitle">
                            The requested article does not exist.
                        </Typography>
                        <div className="article-actions">
                            <Button 
                                variant="contained" 
                                className="button-primary"
                                onClick={() => navigate(-1)}
                                startIcon={<ArrowBackIcon />}
                            >
                                Go Back
                            </Button>
                        </div>
                        <Divider sx={{ my: 3 }} />
                        <ArticleRating articleId={messageId} />
                            </Paper>
                        </Grid>
                        <Grid item md={4} className="toc-container">
                            <TableOfContents sections={article.sections} />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }

    return (
        <>
            <ReadingProgress />
            <div className="page-container">
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Paper className="article-paper">
                        <div className="article-header">
                            <Button 
                                variant="contained" 
                                className="button-primary back-button"
                                onClick={() => navigate(-1)}
                                startIcon={<ArrowBackIcon />}
                            >
                                Back
                            </Button>
                            <div className="article-actions">
                                <ShareArticle 
                                    title={article.title}
                                    url={window.location.href}
                                />
                                <PrintArticle article={article} />
                                <IconButton 
                                    onClick={handleBookmarkClick}
                                    className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
                                >
                                    {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                </IconButton>
                            </div>
                        </div>
                        <Box>
                            <Typography variant="h1" className="article-title">
                                {article.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                            </Typography>
                        </Box>
                        <div className="article-content">
                            {article.sections.map((section, index) => (
                                <ArticleSection 
                                    key={index}
                                    title={section.title}
                                    content={section.content}
                                    list={section.list}
                                />
                            ))}
                        </div>
                                <Divider sx={{ my: 3 }} />
                                <ArticleRating articleId={messageId} />
                                <ArticleDiscussion 
                                    articleId={messageId} 
                                    currentUser={{
                                        id: '1',
                                        name: 'Demo User'
                                    }}
                                    onCommentUpdate={() => setCommentCount(getCommentCount(messageId))}
                                />
                            </Paper>
                        </Grid>
                        <Grid item md={4} className="toc-container">
                            <TableOfContents sections={article.sections} />
                        </Grid>
                    </Grid>
                </Container>
            </div>

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
            <ArticleNotes articleId={messageId} articleTitle={article.title} />
        </>
    );
};

export default ArticleView;
