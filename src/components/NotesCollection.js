import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    Typography,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box,
    Divider,
    Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import { getAllNotes, deleteNote } from './NotesManager';
import { articleContent } from './ArticleContent';
import './NotesCollection.css';

const NotesCollection = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [articleTitles, setArticleTitles] = useState({});

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = () => {
        const allNotes = getAllNotes();
        setNotes(allNotes);

        // Create a map of article titles
        const titles = {};
        allNotes.forEach(note => {
            if (!titles[note.articleId]) {
                // Get article title from imported articleContent
                const article = articleContent[note.articleId];
                if (article) {
                    titles[note.articleId] = article.title;
                }
            }
        });
        setArticleTitles(titles);
    };

    const handleDeleteNote = (articleId, noteId) => {
        deleteNote(articleId, noteId);
        loadNotes();
    };

    const navigateToArticle = (articleId) => {
        navigate(`/article/${articleId}`);
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const filteredNotes = notes.filter(note => {
        const searchLower = searchQuery.toLowerCase();
        return (
            note.content.toLowerCase().includes(searchLower) ||
            (articleTitles[note.articleId] || '').toLowerCase().includes(searchLower)
        );
    });

    // Group notes by article
    const groupedNotes = filteredNotes.reduce((acc, note) => {
        if (!acc[note.articleId]) {
            acc[note.articleId] = [];
        }
        acc[note.articleId].push(note);
        return acc;
    }, {});

    return (
        <Paper className="notes-collection">
            <Box className="notes-collection-header">
                <Typography variant="h5" component="h2">
                    My Notes
                </Typography>
                <TextField
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="outlined"
                    size="small"
                    className="search-field"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Divider />

            <Box className="notes-collection-content">
                {Object.entries(groupedNotes).map(([articleId, articleNotes]) => (
                    <Box key={articleId} className="article-notes-group">
                        <Box className="article-notes-header">
                            <Typography variant="h6">
                                {articleTitles[articleId] || 'Unknown Article'}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigateToArticle(articleId)}
                                startIcon={<LaunchIcon />}
                            >
                                Open Article
                            </Button>
                        </Box>
                        <List>
                            {articleNotes.map((note) => (
                                <ListItem
                                    key={note.id}
                                    className="note-item"
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleDeleteNote(articleId, note.id)}
                                            className="delete-button"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={note.content}
                                        secondary={formatDate(note.lastModified)}
                                        className="note-text"
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Box>
                ))}

                {filteredNotes.length === 0 && (
                    <Box className="no-notes">
                        <Typography variant="body1" color="textSecondary">
                            {searchQuery
                                ? 'No notes match your search'
                                : 'No notes yet. Start taking notes in any article!'}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default NotesCollection;
