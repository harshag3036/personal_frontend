import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import './PrintArticle.css';

const PrintArticle = ({ article }) => {
    const handlePrint = () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        
        // Generate print-friendly HTML
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${article.title}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 2rem;
                    }
                    h1 {
                        font-size: 2rem;
                        margin-bottom: 2rem;
                        color: #1976d2;
                    }
                    h2 {
                        font-size: 1.5rem;
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        color: #333;
                    }
                    p {
                        margin-bottom: 1rem;
                    }
                    ul {
                        margin-bottom: 1rem;
                        padding-left: 2rem;
                    }
                    li {
                        margin-bottom: 0.5rem;
                    }
                    @media print {
                        body {
                            padding: 0;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <h1>${article.title}</h1>
                ${article.sections.map(section => `
                    ${section.title ? `<h2>${section.title}</h2>` : ''}
                    ${section.content ? `<p>${section.content}</p>` : ''}
                    ${section.list ? `
                        <ul>
                            ${section.list.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    ` : ''}
                `).join('')}
                <div class="no-print">
                    <p style="margin-top: 2rem; color: #666;">
                        Generated from ${window.location.href}
                    </p>
                </div>
            </body>
            </html>
        `;

        // Write content to the new window
        printWindow.document.write(printContent);
        printWindow.document.close();

        // Wait for content to load before printing
        printWindow.onload = () => {
            printWindow.print();
            // Close the window after printing (optional)
            // printWindow.onafterprint = () => printWindow.close();
        };
    };

    return (
        <Tooltip title="Print Article">
            <IconButton
                onClick={handlePrint}
                className="print-button"
                aria-label="print article"
            >
                <PrintIcon />
            </IconButton>
        </Tooltip>
    );
};

export default PrintArticle;
