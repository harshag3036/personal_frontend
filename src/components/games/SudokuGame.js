import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography, Button, Paper } from '@mui/material';
import axios from 'axios';

const SudokuGame = ({ difficulty, onGameEnd }) => {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
  const [solution, setSolution] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [initialBoard, setInitialBoard] = useState(null);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won'

  useEffect(() => {
    fetchPuzzle();
  }, [difficulty]);

  const fetchPuzzle = async () => {
    try {
      // Using the Sudoku API
      const response = await axios.get('https://sugoku.herokuapp.com/board?difficulty=medium');
      const puzzle = response.data.board;
      setBoard(puzzle);
      setInitialBoard(JSON.parse(JSON.stringify(puzzle)));
      
      // Get solution
      const solvedResponse = await axios.post('https://sugoku.herokuapp.com/solve', {
        board: puzzle
      }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setSolution(solvedResponse.data.solution);
    } catch (error) {
      console.error('Error fetching puzzle:', error);
      // Fallback to a simple puzzle if API fails
      const fallbackPuzzle = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
      ];
      setBoard(fallbackPuzzle);
      setInitialBoard(JSON.parse(JSON.stringify(fallbackPuzzle)));
    }
  };

  const handleCellChange = (row, col, value) => {
    if (initialBoard[row][col] !== 0) return; // Can't modify initial numbers
    
    const newValue = value === '' ? 0 : parseInt(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 9) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = newValue;
    setBoard(newBoard);

    // Check if puzzle is solved
    if (isBoardComplete(newBoard) && isBoardCorrect(newBoard)) {
      setGameStatus('won');
      onGameEnd({ score: calculateScore() });
    }
  };

  const isBoardComplete = (board) => {
    return board.every(row => row.every(cell => cell !== 0));
  };

  const isBoardCorrect = (board) => {
    if (!solution) return false;
    return board.every((row, i) => 
      row.every((cell, j) => cell === solution[i][j])
    );
  };

  const calculateScore = () => {
    const baseScore = 1000;
    return baseScore;
  };

  const isValidCell = (row, col, value) => {
    if (!solution) return true;
    return solution[row][col] === value;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Sudoku Challenge
      </Typography>

      <Paper elevation={3} sx={{ p: 2, maxWidth: 'fit-content', mx: 'auto' }}>
        <Grid container spacing={0} sx={{ border: '2px solid #000' }}>
          {board.map((row, rowIndex) => (
            <Grid item xs={12} key={rowIndex} container spacing={0}>
              {row.map((cell, colIndex) => (
                <Grid 
                  item 
                  xs={1.33} 
                  key={`${rowIndex}-${colIndex}`}
                  sx={{
                    border: '1px solid #ccc',
                    borderRight: (colIndex + 1) % 3 === 0 ? '2px solid #000' : '1px solid #ccc',
                    borderBottom: (rowIndex + 1) % 3 === 0 ? '2px solid #000' : '1px solid #ccc',
                  }}
                >
                  <TextField
                    value={cell || ''}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    inputProps={{
                      maxLength: 1,
                      style: { 
                        textAlign: 'center',
                        padding: '8px',
                        fontSize: '1.2rem',
                        color: initialBoard && initialBoard[rowIndex][colIndex] !== 0 ? '#000' : '#2196f3'
                      }
                    }}
                    disabled={initialBoard && initialBoard[rowIndex][colIndex] !== 0}
                    error={cell !== 0 && !isValidCell(rowIndex, colIndex, cell)}
                    sx={{
                      width: '100%',
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Paper>

      {gameStatus === 'won' && (
        <Typography variant="h6" color="success.main" align="center" sx={{ mt: 2 }}>
          Congratulations! You solved the puzzle!
        </Typography>
      )}

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button variant="contained" onClick={fetchPuzzle}>
          New Game
        </Button>
      </Box>
    </Box>
  );
};

export default SudokuGame;
