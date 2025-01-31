import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Fab,
    IconButton,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondary,
    Divider,
    Button,
    Box,
    Tooltip
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { 
    saveNote, 
    getArticleNotes, 
    updateNote, 
    deleteNote 
} from './NotesManager';
import './ArticleNotes.css';

const ArticleNotes = ({ articleId, articleTitle }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);

    useEffect(() => {
        if (isDrawerOpen) {
            loadNotes();
        }
    }, [isDrawerOpen, articleId]);

    const loadNotes = () => {
        const articleNotes = getArticleNotes(articleId);
        setNotes(articleNotes);
    };

    const handleSaveNote = () => {
        if (!currentNote.trim()) return;

        if (editingNoteId) {
            updateNote(articleId, editingNoteId, currentNote);
        } else {
            saveNote(articleId, currentNote);
        }

        setCurrentNote('');
        setEditingNoteId(null);
        loadNotes();
    };

    const handleEditNote = (note) => {
        setCurrentNote(note.content);
        setEditingNoteId(note.id);
    };

    const handleDeleteNote = (noteId) => {
        deleteNote(articleId, noteId);
        loadNotes();
        if (editingNoteId === noteId) {
            setCurrentNote('');
            setEditingNoteId(null);
        }
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <>
            <Tooltip title="Add Note" placement="left">
                <Fab
                    color="primary"
                    className="notes-fab"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <NoteAddIcon />
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                className="notes-drawer"
            >
                <Box className="notes-drawer-content">
                    <Box className="notes-header">
                        <Typography variant="h6">
                            Notes for: {articleTitle}
                        </Typography>
                        <IconButton 
                            onClick={() => setIsDrawerOpen(false)}
                            className="close-button"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider />

                    <Box className="notes-editor">
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            placeholder="Write your note here..."
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            onClick={handleSaveNote}
                            disabled={!currentNote.trim()}
                            className="save-button"
                        >
                            {editingNoteId ? 'Update Note' : 'Save Note'}
                        </Button>
                    </Box>

                    <Divider />

                    <List className="notes-list">
                        {notes.map((note) => (
                            <ListItem
                                key={note.id}
                                className="note-item"
                                secondaryAction={
                                    <Box>
                                        <IconButton 
                                            edge="end" 
                                            onClick={() => handleEditNote(note)}
                                            className="edit-button"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            edge="end" 
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="delete-button"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
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
                </Box>
            </Drawer>
        </>
    );
};

export default ArticleNotes;
