import React, { useState } from 'react';
import { 
    IconButton, 
    Menu, 
    MenuItem, 
    ListItemIcon, 
    ListItemText,
    Snackbar,
    Alert,
    Tooltip
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import './ShareArticle.css';

const ShareArticle = ({ title, url }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setShowSnackbar(true);
            handleClose();
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShare = (platform) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        let shareUrl;

        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            default:
                return;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
        handleClose();
    };

    return (
        <>
            <Tooltip title="Share Article">
                <IconButton
                    onClick={handleClick}
                    className="MuiIconButton-root"
                    aria-label="share article"
                    sx={{ color: '#1a2b4c' }}
                >
                    <ShareIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="share-menu"
            >
                <MenuItem onClick={handleCopyLink}>
                    <ListItemIcon>
                        <ContentCopyIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy Link</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleShare('twitter')}>
                    <ListItemIcon>
                        <TwitterIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Share on Twitter</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleShare('linkedin')}>
                    <ListItemIcon>
                        <LinkedInIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Share on LinkedIn</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleShare('facebook')}>
                    <ListItemIcon>
                        <FacebookIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Share on Facebook</ListItemText>
                </MenuItem>
            </Menu>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={() => setShowSnackbar(false)} 
                    severity="success"
                >
                    Link copied to clipboard
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShareArticle;
