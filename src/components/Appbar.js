import React from 'react';
import { AppBar, Box, Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import '../styles/shared.css';
import './Appbar.css';

export default function Appbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileNav = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.clear();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/');
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <Box className="appbar-wrapper">
      <AppBar position="static" className="appbar">
        <Toolbar className="toolbar">
          <div className="nav-section">
            <Button 
              color="inherit" 
              onClick={handleHome}
              className="nav-button"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/articles')}
              className="nav-button"
              startIcon={<ArticleIcon />}
            >
              Articles
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/forums')}
              className="nav-button"
              startIcon={<ForumIcon />}
            >
              Forums
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/chatbot')}
              className="nav-button"
              startIcon={<ChatIcon />}
            >
              Chat
            </Button>
          </div>
          <div className="profile-section">
            {isLoggedIn ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleProfileClick}
                  className="profile-button"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  className="profile-menu"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleProfileNav}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                color="inherit" 
                onClick={handleLogin}
                className="nav-button"
              >
                Sign in
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
