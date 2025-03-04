import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Fade,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Stars as AchievementIcon,
  VolumeUp,
  VolumeOff,
} from '@mui/icons-material';

const GameStats = ({
  gameType,
  score,
  highScore,
  achievements = [],
  isSoundEnabled,
  onToggleSound,
}) => {
  const recentAchievements = achievements.slice(-3); // Show only the last 3 achievements

  return (
    <Paper 
      elevation={2}
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Game Stats
          </Typography>
          
          <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Current Score
              </Typography>
              <Typography variant="h4">
                {score}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                High Score
              </Typography>
              <Typography variant="h4" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                {highScore}
                <TrophyIcon sx={{ ml: 1, color: 'warning.main' }} />
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Tooltip title={`Sound ${isSoundEnabled ? 'On' : 'Off'}`}>
          <IconButton onClick={onToggleSound} size="large">
            {isSoundEnabled ? <VolumeUp /> : <VolumeOff />}
          </IconButton>
        </Tooltip>
      </Box>

      {recentAchievements.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Recent Achievements
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {recentAchievements.map((achievement, index) => (
              <Fade in key={achievement.id} timeout={500 * (index + 1)}>
                <Chip
                  icon={<AchievementIcon />}
                  label={achievement.name}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    '& .MuiChip-icon': {
                      color: 'secondary.main'
                    }
                  }}
                />
              </Fade>
            ))}
          </Stack>
        </Box>
      )}

      {/* Decorative background element */}
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 0
        }}
      />
    </Paper>
  );
};

export default GameStats;
