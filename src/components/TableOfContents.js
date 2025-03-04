import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import './TableOfContents.css';

const TableOfContents = ({ sections }) => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = sections.map(section => ({
                id: section.title.toLowerCase().replace(/\s+/g, '-'),
                element: document.getElementById(section.title.toLowerCase().replace(/\s+/g, '-'))
            }));

            const currentSection = sectionElements.find(section => {
                if (!section.element) return false;
                const rect = section.element.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight / 2;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (sectionTitle) => {
        const id = sectionTitle.toLowerCase().replace(/\s+/g, '-');
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -80; // Account for fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <Paper className="table-of-contents" elevation={2}>
            <Typography variant="h6" gutterBottom className="toc-title">
                Table of Contents
            </Typography>
            <Box className="toc-sections">
                {sections.map((section, index) => {
                    const sectionId = section.title.toLowerCase().replace(/\s+/g, '-');
                    return (
                        <Typography
                            key={index}
                            variant="body2"
                            className={`toc-item ${activeSection === sectionId ? 'active' : ''}`}
                            onClick={() => scrollToSection(section.title)}
                        >
                            {section.title}
                        </Typography>
                    );
                })}
            </Box>
        </Paper>
    );
};

export default TableOfContents;
