import React, { useState, useCallback } from 'react';
import { 
    Container, 
    Typography, 
    Paper, 
    Grid, 
    Card, 
    CardContent, 
    CardActionArea, 
    InputBase, 
    IconButton, 
    Box, 
    Button,
    Tabs,
    Tab,
    Chip,
    Stack,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Badge,
    Slide
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import NotesIcon from '@mui/icons-material/Notes';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import TimerIcon from '@mui/icons-material/Timer';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import PollIcon from '@mui/icons-material/Poll';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchArticles from './SearchArticles';
import NotesCollection from './NotesCollection';
import { useNavigate } from 'react-router-dom';
import { postContent, tags, componentTypes } from './PostContent';
import './Articles.css';

const getComponentIcon = (type) => {
    switch (type) {
        case componentTypes.ARTICLE:
            return <ArticleIcon fontSize="small" />;
        case componentTypes.ACTIVITY:
            return <AssignmentIcon fontSize="small" />;
        case componentTypes.TEST:
            return <QuizIcon fontSize="small" />;
        case componentTypes.SURVEY:
            return <PollIcon fontSize="small" />;
        default:
            return <ArticleIcon fontSize="small" />;
    }
};

const Articles = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const [sortBy, setSortBy] = useState('newest');
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);
    const [tempSelectedTags, setTempSelectedTags] = useState([]);

    const handlePostClick = (postId) => {
        navigate(`/posts/${postId}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearching(true);
        }
    };

    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
        setIsSearching(false);
    }, []);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleFilterDialogOpen = () => {
        setTempSelectedTags([...selectedTags]);
        setFilterDialogOpen(true);
    };

    const handleFilterDialogClose = () => {
        setFilterDialogOpen(false);
        setTempSelectedTags([]);
    };

    const handleTagClick = (tag) => {
        if (tempSelectedTags.includes(tag)) {
            setTempSelectedTags(tempSelectedTags.filter(t => t !== tag));
        } else {
            setTempSelectedTags([...tempSelectedTags, tag]);
        }
    };

    const handleApplyFilters = () => {
        setSelectedTags(tempSelectedTags);
        setFilterDialogOpen(false);
    };

    const handleClearFilters = () => {
        setTempSelectedTags([]);
    };

    const handleSortChange = (type) => {
        setSortBy(type);
        setSortAnchorEl(null);
    };

    const filterPosts = (posts) => {
        return Object.entries(posts)
            .filter(([_, post]) => {
                if (selectedTags.length === 0) return true;
                return selectedTags.every(tag => post.tags.includes(tag));
            })
            .sort((a, b) => {
                const [, postA] = a;
                const [, postB] = b;
                switch (sortBy) {
                    case 'newest':
                        return postB.timestamp - postA.timestamp;
                    case 'oldest':
                        return postA.timestamp - postB.timestamp;
                    case 'duration':
                        const timeA = postA.components.reduce((sum, comp) => sum + (comp.estimatedTime || 0), 0);
                        const timeB = postB.components.reduce((sum, comp) => sum + (comp.estimatedTime || 0), 0);
                        return timeA - timeB;
                    default:
                        return 0;
                }
            });
    };

    const renderPosts = () => (
        <Container maxWidth="lg">
            <Box className="articles-header">
                <div className="header-content">
                    <Typography variant="h4" component="h1" gutterBottom>
                        Knowledge Center
                    </Typography>
                    <Box className="header-actions">
                        <Button
                            variant="outlined"
                            startIcon={
                                <Badge badgeContent={selectedTags.length} color="primary">
                                    <FilterListIcon />
                                </Badge>
                            }
                            onClick={handleFilterDialogOpen}
                            className="action-button"
                        >
                            Filters
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<SortIcon />}
                            onClick={(e) => setSortAnchorEl(e.currentTarget)}
                            className="action-button"
                        >
                            Sort
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<BookmarksIcon />}
                            onClick={() => navigate('/articles/bookmarks')}
                            className="action-button"
                        >
                            Bookmarks
                        </Button>
                    </Box>
                </div>
                <Paper component="form" className="search-bar" onSubmit={handleSearch}>
                    <InputBase
                        placeholder="Search content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <IconButton type="submit">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>

            <Dialog
                fullScreen
                open={filterDialogOpen}
                onClose={handleFilterDialogClose}
                TransitionComponent={Slide}
                TransitionProps={{ direction: 'up' }}
            >
                <DialogTitle>
                    <Box className="dialog-header">
                        <Box className="dialog-title">
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleFilterDialogClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6">
                                Filters {tempSelectedTags.length > 0 && `(${tempSelectedTags.length})`}
                            </Typography>
                        </Box>
                        {tempSelectedTags.length > 0 && (
                            <Button
                                startIcon={<DeleteIcon />}
                                onClick={handleClearFilters}
                                color="error"
                            >
                                Clear All
                            </Button>
                        )}
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    <Box className="filter-content">
                        <Box className="filter-section">
                            <Typography variant="subtitle2" gutterBottom>
                                Topics
                            </Typography>
                            <Box className="tag-group">
                                {Object.values(tags.TOPIC).map(tag => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className={`filter-chip ${tempSelectedTags.includes(tag) ? 'selected' : ''}`}
                                        data-topic={tag}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <Box className="filter-section">
                            <Typography variant="subtitle2" gutterBottom>
                                Skill Level
                            </Typography>
                            <Box className="tag-group">
                                {Object.values(tags.SKILL_LEVEL).map(tag => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className={`filter-chip ${tempSelectedTags.includes(tag) ? 'selected' : ''}`}
                                        data-level={tag}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <Box className="filter-section">
                            <Typography variant="subtitle2" gutterBottom>
                                Format
                            </Typography>
                            <Box className="tag-group">
                                {Object.values(tags.FORMAT).map(tag => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className={`filter-chip ${tempSelectedTags.includes(tag) ? 'selected' : ''}`}
                                        data-format={tag}
                                    />
                                ))}
                            </Box>
                        </Box>
                        <Box className="filter-section">
                            <Typography variant="subtitle2" gutterBottom>
                                Duration
                            </Typography>
                            <Box className="tag-group">
                                {Object.values(tags.DURATION).map(tag => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onClick={() => handleTagClick(tag)}
                                        className={`filter-chip ${tempSelectedTags.includes(tag) ? 'selected' : ''}`}
                                        data-duration={tag}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions className="filter-actions">
                    <Button 
                        onClick={handleFilterDialogClose} 
                        variant="outlined"
                        fullWidth
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleApplyFilters}
                        variant="contained"
                        fullWidth
                        disabled={tempSelectedTags.length === 0}
                    >
                        Apply Filters
                    </Button>
                </DialogActions>
            </Dialog>

            <Box className="posts-grid">
                <Grid container spacing={3}>
                    {filterPosts(postContent).map(([postId, post]) => (
                        <Grid item xs={12} sm={6} md={4} key={postId}>
                            <Card className="post-card">
                                <CardActionArea onClick={() => handlePostClick(postId)}>
                                    <CardContent>
                                        <Box className="post-header-content">
                                            <Typography variant="h6" component="h3" gutterBottom>
                                                {post.title}
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <TimerIcon fontSize="small" color="action" />
                                                <Typography variant="caption" color="textSecondary">
                                                    {post.components.reduce((sum, comp) => sum + (comp.estimatedTime || 0), 0)} min
                                                </Typography>
                                            </Stack>
                                        </Box>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            {post.description}
                                        </Typography>
                                        <Box className="post-tags">
                                            {post.tags.map(tag => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    className="tag-chip"
                                                />
                                            ))}
                                        </Box>
                                        <Box className="post-meta">
                                            <Typography variant="caption" color="textSecondary">
                                                {new Date(post.timestamp).toLocaleDateString()}
                                            </Typography>
                                            {post.author && (
                                                <Typography variant="caption" color="textSecondary">
                                                    By {post.author.name}
                                                </Typography>
                                            )}
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => setSortAnchorEl(null)}
            >
                <MenuItem onClick={() => handleSortChange('newest')}>
                    Newest First
                </MenuItem>
                <MenuItem onClick={() => handleSortChange('oldest')}>
                    Oldest First
                </MenuItem>
                <MenuItem onClick={() => handleSortChange('duration')}>
                    Duration
                </MenuItem>
            </Menu>
        </Container>
    );

    if (isSearching) {
        return (
            <SearchArticles 
                searchQuery={searchQuery} 
                onClearSearch={handleClearSearch}
            />
        );
    }

    return (
        <div className="articles-container">
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                    value={currentTab} 
                    onChange={handleTabChange}
                    centered
                >
                    <Tab label="Content" />
                    <Tab 
                        label="My Notes" 
                        icon={<NotesIcon />} 
                        iconPosition="start"
                    />
                </Tabs>
            </Box>

            {currentTab === 0 ? renderPosts() : <NotesCollection />}
        </div>
    );
};

export default Articles;
