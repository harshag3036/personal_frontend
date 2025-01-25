import React, { useState } from 'react';
import { Button, TextField, IconButton, Box, Typography, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import config from '../config';
import './AddChatData.css';

const AddChatData = () => {
    const [pairs, setPairs] = useState([{ keyword: '', response: '' }]);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleAddPair = () => {
        if (pairs.length < 10) {
            setPairs([...pairs, { keyword: '', response: '' }]);
        }
    };

    const handleChange = (index, field, value) => {
        const newPairs = [...pairs];
        newPairs[index][field] = value;
        setPairs(newPairs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields are filled
        const hasEmptyFields = pairs.some(pair => !pair.keyword.trim() || !pair.response.trim());
        if (hasEmptyFields) {
            alert('All fields must be filled');
            return;
        }

        // Convert pairs to the required format
        const chatDataWithResponse = pairs.reduce((acc, pair) => {
            acc[pair.keyword] = pair.response;
            return acc;
        }, {});

        try {
            const response = await fetch(`${config.API_BASE_URL}/api/v1/chatBot/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chatDataWithResponse })
            });

            if (response.ok) {
                setShowSnackbar(true);
                setPairs([{ keyword: '', response: '' }]); // Reset form
            } else {
                alert('Failed to add data');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding data');
        }
    };

    return (
        <div className="add-chat-data-container">
            <Typography variant="h4" className="page-title">
                Add Chat Data
            </Typography>
            
            <form onSubmit={handleSubmit}>
                {pairs.map((pair, index) => (
                    <Box key={index} className="input-row">
                        <TextField
                            label="Keyword"
                            value={pair.keyword}
                            onChange={(e) => handleChange(index, 'keyword', e.target.value)}
                            required
                            className="input-field"
                        />
                        <TextField
                            label="Response"
                            value={pair.response}
                            onChange={(e) => handleChange(index, 'response', e.target.value)}
                            required
                            className="input-field"
                        />
                        {index === pairs.length - 1 && pairs.length < 10 && (
                            <IconButton 
                                onClick={handleAddPair}
                                color="primary"
                                className="add-button"
                            >
                                <AddIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
                
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className="submit-button"
                >
                    Submit
                </Button>
            </form>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
                message="Data has been added successfully"
            />
        </div>
    );
};

export default AddChatData;
