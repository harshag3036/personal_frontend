import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  SportsEsports as PlayIcon,
  Star as StarIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const DifficultyCard = ({ 
  difficulty, 
  isSelected, 
  onClick, 
  showPoints = true 
}) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
      border: theme => isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 3,
      },
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        {difficulty.name}
      </Typography>
      
      {difficulty.description && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {difficulty.description}
        </Typography>
      )}

      {showPoints && difficulty.points && (
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <StarIcon sx={{ color: 'warning.main', mr: 0.5 }} fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {difficulty.points} points per win
          </Typography>
        </Box>
      )}

      {difficulty.range && (
        <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
          <Tooltip 
            title={`Number range: ${difficulty.range[0]} - ${difficulty.range[1]}`}
            placement="top"
            TransitionComponent={Zoom}
          >
            <IconButton size="small" sx={{ mr: 1 }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            Range: {difficulty.range[0]} - {difficulty.range[1]}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const DifficultySelector = ({
  difficulties,
  selectedDifficulty,
  onSelectDifficulty,
  onStart,
}) => {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        Select Difficulty
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {difficulties?.map((difficulty, index) => (
          <Grid item xs={12} sm={difficulty.name === 'Time Attack' ? 12 : 6} key={difficulty.name}>
            <DifficultyCard
              difficulty={{
                ...difficulty,
                description: difficulty.name === 'Time Attack' 
                  ? 'Race against the clock to solve as many words as possible in 2 minutes'
                  : undefined
              }}
              isSelected={selectedDifficulty === index}
              onClick={() => onSelectDifficulty(index)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={onStart}
          startIcon={<PlayIcon />}
          sx={{
            minWidth: 200,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            py: 1.5,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 5,
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Start Game
        </Button>
      </Box>
    </Box>
  );
};

export default DifficultySelector;
