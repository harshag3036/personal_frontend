import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Timer,
  EmojiEvents,
  Gamepad,
  Stars,
  Info,
  LightbulbOutlined,
} from '@mui/icons-material';

const InstructionSection = ({ title, items, icon: Icon }) => {
  if (!items) return null;

  // Handle scoring object format
  if (items.title && Array.isArray(items.points)) {
    return (
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: 'primary.main',
            mb: 2
          }}
        >
          <Icon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <List dense>
          {items.points.map((point, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Info color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={point}
                primaryTypographyProps={{
                  variant: 'body2',
                  color: 'text.primary',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  // Handle array format
  if (Array.isArray(items) && items.length > 0) {
    return (
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: 'primary.main',
            mb: 2
          }}
        >
          <Icon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <List dense>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Info color="action" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                secondary={item.description}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  color: 'text.primary',
                }}
                secondaryTypographyProps={{
                  variant: 'body2',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  return null;
};

const GameInstructions = ({
  open,
  onClose,
  title,
  description,
  instructions,
  scoring,
  controls,
  tips,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02)), linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%, rgba(0,0,0,0.02))',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px'
        }
      }}
    >
      <DialogTitle 
        component="div"
        sx={{ 
          pr: 6,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Box>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <InstructionSection
          title="How to Play"
          items={instructions}
          icon={Gamepad}
        />

        <InstructionSection
          title="Scoring"
          items={scoring}
          icon={EmojiEvents}
        />

        <InstructionSection
          title="Controls"
          items={controls}
          icon={Timer}
        />

        <InstructionSection
          title="Tips & Tricks"
          items={tips}
          icon={LightbulbOutlined}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          startIcon={<Stars />}
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameInstructions;
