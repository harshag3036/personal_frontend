const DISCUSSIONS_STORAGE_KEY = 'article_discussions';

export const generateCommentId = () => {
    return `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getStoredDiscussions = () => {
    const discussions = localStorage.getItem(DISCUSSIONS_STORAGE_KEY);
    return discussions ? JSON.parse(discussions) : {};
};

const saveDiscussionsToStorage = (discussions) => {
    localStorage.setItem(DISCUSSIONS_STORAGE_KEY, JSON.stringify(discussions));
};

export const addComment = (articleId, content, userId, userName) => {
    const discussions = getStoredDiscussions();
    const commentId = generateCommentId();
    const timestamp = Date.now();

    if (!discussions[articleId]) {
        discussions[articleId] = [];
    }

    const newComment = {
        id: commentId,
        content,
        userId,
        userName,
        timestamp,
        lastModified: timestamp,
        likes: 0,
        replies: []
    };

    discussions[articleId].push(newComment);
    saveDiscussionsToStorage(discussions);
    return newComment;
};

export const addReply = (articleId, parentCommentId, content, userId, userName) => {
    const discussions = getStoredDiscussions();
    const commentId = generateCommentId();
    const timestamp = Date.now();

    if (!discussions[articleId]) return null;

    const parentComment = discussions[articleId].find(comment => comment.id === parentCommentId);
    if (!parentComment) return null;

    const reply = {
        id: commentId,
        content,
        userId,
        userName,
        timestamp,
        lastModified: timestamp,
        likes: 0
    };

    parentComment.replies.push(reply);
    saveDiscussionsToStorage(discussions);
    return reply;
};

export const updateComment = (articleId, commentId, content) => {
    const discussions = getStoredDiscussions();
    
    if (!discussions[articleId]) return false;

    // Try to find the comment in main comments
    const commentIndex = discussions[articleId].findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
        discussions[articleId][commentIndex] = {
            ...discussions[articleId][commentIndex],
            content,
            lastModified: Date.now()
        };
        saveDiscussionsToStorage(discussions);
        return true;
    }

    // Try to find the comment in replies
    for (const comment of discussions[articleId]) {
        const replyIndex = comment.replies.findIndex(reply => reply.id === commentId);
        if (replyIndex !== -1) {
            comment.replies[replyIndex] = {
                ...comment.replies[replyIndex],
                content,
                lastModified: Date.now()
            };
            saveDiscussionsToStorage(discussions);
            return true;
        }
    }

    return false;
};

export const deleteComment = (articleId, commentId) => {
    const discussions = getStoredDiscussions();
    
    if (!discussions[articleId]) return false;

    // Try to delete from main comments
    const commentIndex = discussions[articleId].findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
        discussions[articleId].splice(commentIndex, 1);
        
        if (discussions[articleId].length === 0) {
            delete discussions[articleId];
        }

        saveDiscussionsToStorage(discussions);
        return true;
    }

    // Try to delete from replies
    for (const comment of discussions[articleId]) {
        const replyIndex = comment.replies.findIndex(reply => reply.id === commentId);
        if (replyIndex !== -1) {
            comment.replies.splice(replyIndex, 1);
            saveDiscussionsToStorage(discussions);
            return true;
        }
    }

    return false;
};

export const likeComment = (articleId, commentId, userId) => {
    const discussions = getStoredDiscussions();
    
    if (!discussions[articleId]) return false;

    // Try to find and like main comment
    const comment = discussions[articleId].find(comment => comment.id === commentId);
    if (comment) {
        comment.likes = (comment.likes || 0) + 1;
        saveDiscussionsToStorage(discussions);
        return true;
    }

    // Try to find and like reply
    for (const mainComment of discussions[articleId]) {
        const reply = mainComment.replies.find(reply => reply.id === commentId);
        if (reply) {
            reply.likes = (reply.likes || 0) + 1;
            saveDiscussionsToStorage(discussions);
            return true;
        }
    }

    return false;
};

export const getArticleDiscussion = (articleId) => {
    const discussions = getStoredDiscussions();
    return discussions[articleId] || [];
};

export const getCommentCount = (articleId) => {
    const discussions = getStoredDiscussions();
    if (!discussions[articleId]) return 0;

    let count = discussions[articleId].length;
    discussions[articleId].forEach(comment => {
        count += comment.replies.length;
    });
    return count;
};
