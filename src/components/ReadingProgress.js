import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import './ReadingProgress.css';

const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.scrollY;
            const progress = (scrollTop / documentHeight) * 100;
            setProgress(Math.min(100, Math.max(0, progress)));
        };

        window.addEventListener('scroll', calculateProgress);
        calculateProgress(); // Initial calculation

        return () => window.removeEventListener('scroll', calculateProgress);
    }, []);

    return (
        <div className="reading-progress">
            <LinearProgress 
                variant="determinate" 
                value={progress} 
                className="progress-bar"
            />
        </div>
    );
};

export default ReadingProgress;
