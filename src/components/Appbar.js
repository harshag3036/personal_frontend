import React from 'react';
import { AppBar, Box, Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import ThemeSwitcher from './ThemeSwitcher';
import '../styles/shared.css';
import './Appbar.css';

export default function Appbar() {
  const navigate = useNavigate();
  const { isAuthenticated, isGuest, logout } = useUser();
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

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
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
              onClick={() => navigate('/chatbot')}
              className="nav-button"
              startIcon={<ChatIcon />}
            >
              Chat
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/notebook')}
              className="nav-button"
              startIcon={<MenuBookIcon />}
            >
              Notebook
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/activities')}
              className="nav-button"
              startIcon={<SportsEsportsIcon />}
            >
              Activities
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/community')}
              className="nav-button"
              startIcon={<GroupsIcon />}
            >
              Communities
            </Button>
          </div>
          <div className="profile-section">
            <ThemeSwitcher />
            {isAuthenticated ? (
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
                  {!isGuest && <MenuItem onClick={handleProfileNav}>Profile</MenuItem>}
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
