import React, { useState, useEffect } from 'react';
import { Paper, Typography, IconButton, Box, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleReference from './ArticleReference';
import './BookmarkManager.css';

const BookmarkManager = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem('articleBookmarks') || '[]');
        setBookmarks(savedBookmarks);
    }, []);

    const removeBookmark = (articleId) => {
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== articleId);
        setBookmarks(updatedBookmarks);
        localStorage.setItem('articleBookmarks', JSON.stringify(updatedBookmarks));
    };

    if (bookmarks.length === 0) {
        return (
            <Paper className="empty-bookmarks">
                <Typography variant="h6" gutterBottom>
                    No Bookmarked Articles
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Articles you bookmark will appear here for quick access.
                </Typography>
            </Paper>
        );
    }

    return (
        <div className="bookmarks-container">
            <Typography variant="h5" gutterBottom>
                Bookmarked Articles
            </Typography>
            <Grid container spacing={3}>
                {bookmarks.map(bookmark => (
                    <Grid item xs={12} sm={6} md={4} key={bookmark.id}>
                        <Paper className="bookmark-item">
                            <Box className="bookmark-header">
                                <Typography variant="caption" color="textSecondary">
                                    Bookmarked on {new Date(bookmark.dateAdded).toLocaleDateString()}
                                </Typography>
                                <IconButton 
                                    size="small" 
                                    onClick={() => removeBookmark(bookmark.id)}
                                    className="remove-bookmark"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <ArticleReference
                                articleId={bookmark.id}
                                title={bookmark.title}
                                description={bookmark.description}
                            />
                            {bookmark.note && (
                                <Typography 
                                    variant="body2" 
                                    color="textSecondary"
                                    className="bookmark-note"
                                >
                                    Note: {bookmark.note}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

// Utility functions for bookmark management
export const bookmarkArticle = (article, note = '') => {
    const currentBookmarks = JSON.parse(localStorage.getItem('articleBookmarks') || '[]');
    const exists = currentBookmarks.some(bookmark => bookmark.id === article.id);
    
    if (!exists) {
        const newBookmark = {
            id: article.id,
            title: article.title,
            description: article.description,
            dateAdded: new Date().toISOString(),
            note
        };
        
        const updatedBookmarks = [...currentBookmarks, newBookmark];
        localStorage.setItem('articleBookmarks', JSON.stringify(updatedBookmarks));
        return true;
    }
    return false;
};

export const removeArticleBookmark = (articleId) => {
    const currentBookmarks = JSON.parse(localStorage.getItem('articleBookmarks') || '[]');
    const updatedBookmarks = currentBookmarks.filter(bookmark => bookmark.id !== articleId);
    localStorage.setItem('articleBookmarks', JSON.stringify(updatedBookmarks));
};

export const isArticleBookmarked = (articleId) => {
    const currentBookmarks = JSON.parse(localStorage.getItem('articleBookmarks') || '[]');
    return currentBookmarks.some(bookmark => bookmark.id === articleId);
};

export default BookmarkManager;
