import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    IconButton,
    Box,
    Avatar,
    Divider,
    Menu,
    MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplyIcon from '@mui/icons-material/Reply';
import {
    addComment,
    addReply,
    updateComment,
    deleteComment,
    likeComment,
    getArticleDiscussion
} from './DiscussionManager';
import './ArticleDiscussion.css';

const Comment = ({ 
    comment, 
    onReply, 
    onEdit, 
    onDelete, 
    onLike, 
    currentUserId,
    isReply = false 
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isAuthor = currentUserId === comment.userId;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        onEdit(comment);
        handleMenuClose();
    };

    const handleDelete = () => {
        onDelete(comment.id);
        handleMenuClose();
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    return (
        <div className={`comment ${isReply ? 'reply' : ''}`}>
            <div className="comment-header">
                <div className="user-info">
                    <Avatar className="avatar">
                        {comment.userName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="subtitle2" className="username">
                        {comment.userName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {formatDate(comment.timestamp)}
                    </Typography>
                </div>
                {isAuthor && (
                    <div>
                        <IconButton size="small" onClick={handleMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                    </div>
                )}
            </div>
            <Typography variant="body1" className="comment-content">
                {comment.content}
            </Typography>
            <div className="comment-actions">
                <Button
                    startIcon={<ThumbUpIcon />}
                    size="small"
                    onClick={() => onLike(comment.id)}
                >
                    {comment.likes || 0}
                </Button>
                {!isReply && (
                    <Button
                        startIcon={<ReplyIcon />}
                        size="small"
                        onClick={() => onReply(comment)}
                    >
                        Reply
                    </Button>
                )}
            </div>
            {!isReply && comment.replies && comment.replies.length > 0 && (
                <List className="replies-list">
                    {comment.replies.map((reply) => (
                        <ListItem key={reply.id} disablePadding>
                            <Comment
                                comment={reply}
                                onReply={onReply}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onLike={onLike}
                                currentUserId={currentUserId}
                                isReply={true}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

const ArticleDiscussion = ({ articleId, currentUser, onCommentUpdate }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [editingComment, setEditingComment] = useState(null);

    useEffect(() => {
        loadComments();
        onCommentUpdate && onCommentUpdate();
    }, [articleId]);

    const loadComments = () => {
        const articleComments = getArticleDiscussion(articleId);
        setComments(articleComments);
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        if (replyTo) {
            addReply(
                articleId,
                replyTo.id,
                newComment,
                currentUser.id,
                currentUser.name
            );
            setReplyTo(null);
        } else if (editingComment) {
            updateComment(articleId, editingComment.id, newComment);
            setEditingComment(null);
        } else {
            addComment(
                articleId,
                newComment,
                currentUser.id,
                currentUser.name
            );
        }

        setNewComment('');
        loadComments();
        onCommentUpdate && onCommentUpdate();
    };

    const handleReply = (comment) => {
        setReplyTo(comment);
        setEditingComment(null);
        setNewComment('');
    };

    const handleEdit = (comment) => {
        setEditingComment(comment);
        setReplyTo(null);
        setNewComment(comment.content);
    };

    const handleDelete = (commentId) => {
        deleteComment(articleId, commentId);
        loadComments();
        onCommentUpdate && onCommentUpdate();
    };

    const handleLike = (commentId) => {
        likeComment(articleId, commentId, currentUser.id);
        loadComments();
    };

    const handleCancelReply = () => {
        setReplyTo(null);
        setEditingComment(null);
        setNewComment('');
    };

    return (
        <Paper className="discussion-section">
            <Typography variant="h6" gutterBottom>
                Discussion
            </Typography>

            <Box className="comment-input">
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder={
                        replyTo
                            ? `Reply to ${replyTo.userName}`
                            : editingComment
                            ? 'Edit your comment'
                            : 'Add a comment...'
                    }
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                />
                <Box className="comment-actions">
                    {(replyTo || editingComment) && (
                        <Button onClick={handleCancelReply}>
                            Cancel
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                    >
                        {replyTo ? 'Reply' : editingComment ? 'Save' : 'Comment'}
                    </Button>
                </Box>
            </Box>

            <List className="comments-list">
                {comments.map((comment) => (
                    <ListItem key={comment.id} disablePadding>
                        <Comment
                            comment={comment}
                            onReply={handleReply}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onLike={handleLike}
                            currentUserId={currentUser.id}
                        />
                    </ListItem>
                ))}
                {comments.length === 0 && (
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                        sx={{ py: 3 }}
                    >
                        No comments yet. Be the first to start the discussion!
                    </Typography>
                )}
            </List>
        </Paper>
    );
};

export default ArticleDiscussion;
