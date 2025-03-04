import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ArticleReference from './ArticleReference';
import './SearchArticles.css';

const categories = {
    'emotional-health': 'Emotional Health',
    'personal-growth': 'Personal Growth'
};

const SearchArticles = ({ searchQuery, onClearSearch }) => {
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({
        category: 'all',
    });
    const [loading, setLoading] = useState(true);

    // Simulated search function - in a real app, this would call an API
    const searchArticles = (query) => {
        const allArticles = [
            {
                id: 'emotional-readiness',
                title: 'Understanding Emotional Readiness',
                description: 'Learn about the role of emotions in self-discovery',
                category: 'emotional-health',
                content: 'Our emotional state significantly influences our ability to engage in meaningful self-reflection and learning.'
            },
            {
                id: 'unlearning-intro',
                title: 'Introduction to Unlearning',
                description: 'Understand the process of letting go of limiting beliefs',
                category: 'personal-growth',
                content: 'Unlearning is the process of letting go of previously acquired knowledge, beliefs, or habits that may no longer serve us well.'
            },
            {
                id: 'limiting-beliefs',
                title: 'Understanding Limiting Beliefs',
                description: 'Break free from self-imposed limitations',
                category: 'personal-growth',
                content: 'Limiting beliefs are thoughts or attitudes that we may consider to be absolute truths but actually prevent us from growing.'
            },
            {
                id: 'understanding-anxiety',
                title: 'Understanding and Managing Anxiety',
                description: 'Learn about anxiety triggers and management strategies',
                category: 'emotional-health',
                content: 'Anxiety is a natural response to perceived threats or stress, but when it becomes overwhelming, it can interfere with daily life.'
            }
        ];

        return allArticles.filter(article => {
            const matchesQuery = !query || 
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.content.toLowerCase().includes(query.toLowerCase());
            
            const matchesCategory = filters.category === 'all' || 
                article.category === filters.category;

            return matchesQuery && matchesCategory;
        });
    };

    useEffect(() => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const searchResults = searchArticles(searchQuery);
            setResults(searchResults);
            setLoading(false);
        }, 500);
    }, [searchQuery, filters]);

    if (!searchQuery) return null;

    return (
        <div className="search-results">
            <Box className="search-header">
                <Typography variant="h5" component="h2">
                    Search Results
                </Typography>
                <Box className="search-filters">
                    <Chip 
                        label={`"${searchQuery}"`}
                        onDelete={onClearSearch}
                        className="search-chip"
                    />
                    <FormControl size="small" className="category-filter">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={filters.category}
                            label="Category"
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        >
                            <MenuItem value="all">All Categories</MenuItem>
                            {Object.entries(categories).map(([value, label]) => (
                                <MenuItem key={value} value={value}>{label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {loading ? (
                <Paper className="loading-state">
                    <Typography>Searching articles...</Typography>
                </Paper>
            ) : results.length > 0 ? (
                <div className="results-grid">
                    {results.map(article => (
                        <ArticleReference
                            key={article.id}
                            articleId={article.id}
                            title={article.title}
                            description={article.description}
                        />
                    ))}
                </div>
            ) : (
                <Paper className="no-results">
                    <Typography>
                        No articles found matching your search criteria.
                    </Typography>
                </Paper>
            )}
        </div>
    );
};

export default SearchArticles;
