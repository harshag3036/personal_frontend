import {
  Functions,
  Memory,
  Psychology,
  Extension,
  Abc,
} from '@mui/icons-material';

export const GAME_STATES = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'gameOver',
  VICTORY: 'victory'
};

export const GAME_CATEGORIES = [
  {
    id: 'word',
    name: 'Word Games',
    icon: Abc,
    description: 'Challenge your vocabulary and word-finding skills',
    games: [
      {
        id: 'wordle',
        name: 'Wordle',
        description: 'Guess the hidden word in 6 tries',
        difficulties: [
          { name: 'Daily Challenge', points: 20 },
          { name: 'Practice Mode', points: 10 },
          { name: 'Time Attack', points: 30 },
        ],
        instructions: [
          { title: 'Goal', description: 'Guess the 5-letter word in 6 tries' },
          { title: 'Colors', description: 'Green: Correct letter in correct spot, Yellow: Correct letter in wrong spot, Gray: Letter not in word' },
          { title: 'Time Attack', description: 'Race against the clock to solve as many words as possible' },
          { title: 'Tips', description: 'Start with words that have common letters like E, A, R, T' },
        ],
        scoring: {
          title: 'Scoring System',
          points: [
            'Daily Challenge: 20 points per word',
            'Practice Mode: 10 points per word',
            'Time Attack: 30 points per word + time bonus'
          ]
        }
      },
      {
        id: 'anagrams',
        name: 'Word Scramble',
        description: 'Unscramble letters to find hidden words',
        difficulties: [
          { name: 'Easy (4-5 letters)', points: 10 },
          { name: 'Medium (6-7 letters)', points: 20 },
          { name: 'Hard (8+ letters)', points: 30 }
        ],
        instructions: [
          { title: 'Goal', description: 'Rearrange scrambled letters to form valid words' },
          { title: 'Time', description: 'Solve as many as you can within the time limit' }
        ]
      }
    ]
  },
  {
    id: 'math',
    name: 'Mathematical Games',
    icon: Functions,
    description: 'Challenge your math skills with various puzzles and problems',
    games: [
      {
        id: 'math_challenge',
        name: 'Math Challenge',
        description: 'Solve math problems against the clock',
        difficulties: [
          { name: 'Easy', range: [1, 10], points: 5 },
          { name: 'Medium', range: [10, 50], points: 10 },
          { name: 'Hard', range: [50, 100], points: 15 }
        ],
        instructions: [
          { title: 'Goal', description: 'Solve as many math problems as you can within the time limit' },
          { title: 'Time Limit', description: '30 seconds per game' },
          { title: 'Input', description: 'Type your answer and press Enter or click Check' }
        ]
      },
      {
        id: 'number_sequence',
        name: 'Number Patterns',
        description: 'Find the next number in the sequence',
        difficulties: [
          { name: 'Basic', points: 10 },
          { name: 'Advanced', points: 20 },
          { name: 'Expert', points: 30 }
        ],
        instructions: [
          { title: 'Goal', description: 'Identify the pattern and find the next number' },
          { title: 'Types', description: 'Arithmetic, Geometric, and Fibonacci sequences' }
        ]
      }
    ]
  },
  {
    id: 'memory',
    name: 'Memory Games',
    icon: Memory,
    description: 'Test and improve your memory with fun card matching games',
    games: [
      {
        id: 'memory_match',
        name: 'Memory Match',
        description: 'Find matching pairs of cards',
        difficulties: [
          { name: 'Classic', rows: 4, cols: 4, points: 5 },
          { name: 'Extended', rows: 4, cols: 5, points: 10 },
          { name: 'Expert', rows: 6, cols: 6, points: 15 }
        ],
        instructions: [
          { title: 'Goal', description: 'Find all matching pairs with minimum flips' },
          { title: 'Scoring', description: 'Points based on speed and number of attempts' }
        ]
      },
      {
        id: 'sequence_recall',
        name: 'Pattern Recall',
        description: 'Remember and repeat color sequences',
        difficulties: [
          { name: 'Short (4-5)', points: 5 },
          { name: 'Medium (6-8)', points: 10 },
          { name: 'Long (9+)', points: 15 }
        ],
        instructions: [
          { title: 'Goal', description: 'Watch the sequence and repeat it correctly' },
          { title: 'Speed', description: 'Sequences get faster at higher levels' }
        ]
      }
    ]
  },
  {
    id: 'puzzle',
    name: 'Puzzle Games',
    icon: Extension,
    description: 'Challenge your mind with various puzzles',
    games: [
      {
        id: 'sudoku',
        name: 'Sudoku',
        description: 'Fill the grid with numbers',
        difficulties: [
          { name: 'Easy', points: 10 },
          { name: 'Medium', points: 20 },
          { name: 'Hard', points: 30 }
        ],
        instructions: [
          { title: 'Goal', description: 'Fill the 9x9 grid with numbers 1-9' },
          { title: 'Rules', description: 'Each row, column, and 3x3 box must contain numbers 1-9 without repetition' }
        ]
      }
    ]
  },
  {
    id: 'quiz',
    name: 'Knowledge Quiz',
    icon: Psychology,
    description: 'Test your knowledge across various topics',
    games: [
      {
        id: 'general_quiz',
        name: 'General Knowledge',
        description: 'Answer questions from different categories',
        difficulties: [
          { name: 'Easy', points: 10 },
          { name: 'Medium', points: 20 },
          { name: 'Hard', points: 30 }
        ],
        instructions: [
          { title: 'Goal', description: 'Answer as many questions correctly as you can' },
          { title: 'Time Limit', description: '30 seconds per question' },
          { title: 'Scoring', description: 'Points based on difficulty and time bonus' }
        ]
      }
    ]
  }
];

export const CATEGORIES = {
  MATH: {
    OPERATIONS: [
      { symbol: '+', name: 'Addition' },
      { symbol: '-', name: 'Subtraction' },
      { symbol: '*', name: 'Multiplication' },
      { symbol: '/', name: 'Division' }
    ],
    DIFFICULTY_LEVELS: [
      { name: 'Easy', range: [1, 10], points: 5 },
      { name: 'Medium', range: [10, 50], points: 10 },
      { name: 'Hard', range: [50, 100], points: 15 }
    ]
  },
  MEMORY: {
    THEMES: [
      { 
        name: 'Emojis', 
        symbols: ['🌟', '🎈', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎸', '🎺', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎸', '🎺']
      },
      { 
        name: 'Animals', 
        symbols: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🦆', '🦅']
      },
      { 
        name: 'Food', 
        symbols: ['🍎', '🍕', '🍦', '🍔', '🌮', '🍜', '🍪', '🍩', '🍫', '🍿', '🍱', '🍣', '🌯', '🥨', '🥐', '🧀', '🍰', '🍭']
      }
    ]
  },
  QUIZ: {
    CATEGORIES: [
      {
        name: 'Science',
        icon: 'Psychology',
        description: 'Test your knowledge of scientific concepts'
      },
      {
        name: 'Geography',
        icon: 'Public',
        description: 'Explore world geography and landmarks'
      },
      {
        name: 'History',
        icon: 'Book',
        description: 'Journey through historical events and figures'
      },
      {
        name: 'Technology',
        icon: 'Computer',
        description: 'Challenge yourself with tech and coding questions'
      },
      {
        name: 'Arts & Literature',
        icon: 'Palette',
        description: 'Discover art history and famous literary works'
      }
    ],
    DIFFICULTY_LEVELS: [
      { name: 'Easy', timeLimit: 20, points: 10 },
      { name: 'Medium', timeLimit: 15, points: 15 },
      { name: 'Hard', timeLimit: 10, points: 20 }
    ]
  }
};

export const ACHIEVEMENTS = {
  MATH: [
    { id: 'math_beginner', name: 'Math Beginner', requirement: 'Score 50 points in Math Challenge' },
    { id: 'math_master', name: 'Math Master', requirement: 'Score 200 points in Math Challenge' },
    { id: 'speed_demon', name: 'Speed Demon', requirement: 'Solve 10 problems in under 20 seconds' }
  ],
  MEMORY: [
    { id: 'memory_starter', name: 'Memory Starter', requirement: 'Complete a game in Classic mode' },
    { id: 'perfect_match', name: 'Perfect Match', requirement: 'Complete a game with no mistakes' },
    { id: 'memory_master', name: 'Memory Master', requirement: 'Complete Expert mode under 2 minutes' }
  ],
  QUIZ: [
    { id: 'quiz_novice', name: 'Quiz Novice', requirement: 'Complete 5 quizzes' },
    { id: 'knowledge_seeker', name: 'Knowledge Seeker', requirement: 'Score perfect in 3 categories' },
    { id: 'quiz_champion', name: 'Quiz Champion', requirement: 'Achieve highest score in Hard mode' }
  ],
  WORD: [
    { id: 'word_finder', name: 'Word Finder', requirement: 'Find a word in 3 tries' },
    { id: 'vocabulary_master', name: 'Vocabulary Master', requirement: 'Win 5 games in Hard mode' },
    { id: 'quick_thinker', name: 'Quick Thinker', requirement: 'Find a word in under 30 seconds' }
  ],
  PUZZLE: [
    { id: 'puzzle_solver', name: 'Puzzle Solver', requirement: 'Complete any puzzle' },
    { id: 'speed_solver', name: 'Speed Solver', requirement: 'Complete a puzzle in under 1 minute' },
    { id: 'puzzle_master', name: 'Puzzle Master', requirement: 'Complete Hard mode puzzle perfectly' }
  ]
};

export const ANIMATIONS = {
  FLIP: {
    duration: 0.6,
    ease: 'easeInOut'
  },
  FADE: {
    duration: 0.3,
    ease: 'easeOut'
  },
  BOUNCE: {
    duration: 0.5,
    ease: 'easeOut'
  }
};
