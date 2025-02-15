import React, { useState } from 'react';
import { 
    TextField, 
    IconButton, 
    Button, 
    Snackbar, 
    AppBar,
    Toolbar,
    Typography,
    Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './UpdateChatData.css';

const UpdateChatData = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState(null); // Changed to null for initial state
    const [isLoading, setIsLoading] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchText.trim()) {
            setSnackbar({ open: true, message: 'Please enter search text' });
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${config.API_BASE_URL}/api/v1/chatBot/searchKeywords`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: searchText
            });

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setSearchResults(data); // Will be empty array if no results
        } catch (error) {
            console.error('Search error:', error);
            setSnackbar({ open: true, message: 'Search failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (item) => {
        if (!editedData[item.dataId]) {
            setSnackbar({ open: true, message: 'No changes made' });
            return;
        }

        try {
            const updatedData = {
                dataId: item.dataId,
                keywords: editedData[item.dataId].keywords || item.keywords,
                response: editedData[item.dataId].response || item.response
            };

            const response = await fetch(`${config.API_BASE_URL}/api/v1/chatBot/updateKeyword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error('Update failed');
            }

            setSnackbar({ open: true, message: 'Updated successfully' });
            handleSearch();
            setEditedData(prev => {
                const newData = { ...prev };
                delete newData[item.dataId];
                return newData;
            });
        } catch (error) {
            console.error('Update error:', error);
            setSnackbar({ open: true, message: 'Update failed. Please try again.' });
        }
    };

    const handleDelete = async (item) => {
        try {
            const response = await fetch(`${config.API_BASE_URL}/api/v1/chatBot/deleteKeyword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    dataId: item.dataId,
                    keywords: item.keywords,
                    response: item.response
                })
            });

            if (!response.ok) {
                throw new Error('Delete failed');
            }

            setSnackbar({ open: true, message: 'Deleted successfully' });
            handleSearch();
        } catch (error) {
            console.error('Delete error:', error);
            setSnackbar({ open: true, message: 'Delete failed. Please try again.' });
        }
    };

    return (
        <div className="update-chat-page">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Update Chat Data
                    </Typography>
                    <IconButton 
                        color="inherit" 
                        onClick={() => navigate('/home')}
                        title="Home"
                    >
                        <HomeIcon />
                    </IconButton>
                    <IconButton 
                        color="inherit" 
                        onClick={() => navigate('/chatbot')}
                        title="Chat Bot"
                    >
                        <ChatIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div className="search-container">
                <TextField
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search keywords..."
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        startAdornment: <SearchIcon color="action" />,
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    Search
                </Button>
            </div>

            {/* Show "No results found" message when search returns empty array */}
            {searchResults && searchResults.length === 0 && (
                <Paper elevation={0} className="no-results">
                    <Typography variant="body1" color="textSecondary" align="center">
                        No results found for your search
                    </Typography>
                </Paper>
            )}

            {searchResults && searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((item, index) => (
                        <div key={index} className="result-item">
                            <div className="result-fields">
                                <TextField
                                    label="Keyword"
                                    defaultValue={item.keywords}
                                    onChange={(e) => setEditedData(prev => ({
                                        ...prev,
                                        [item.dataId]: {
                                            ...prev[item.dataId],
                                            keywords: e.target.value
                                        }
                                    }))}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    label="Response"
                                    defaultValue={item.response}
                                    onChange={(e) => setEditedData(prev => ({
                                        ...prev,
                                        [item.dataId]: {
                                            ...prev[item.dataId],
                                            response: e.target.value
                                        }
                                    }))}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={2}
                                />
                            </div>
                            <div className="result-actions">
                                <IconButton 
                                    color="primary"
                                    onClick={() => handleUpdate(item)}
                                    disabled={!editedData[item.dataId]}
                                    title="Update"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    color="error"
                                    onClick={() => handleDelete(item)}
                                    title="Delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
        </div>
    );
};

export default UpdateChatData;
