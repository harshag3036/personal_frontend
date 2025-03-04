import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleReference.css';

const ArticleReference = ({ articleId, title }) => {
    return (
        <Link 
            to={`/articles/view/${articleId}`}
            className="info-icon"
        >
            i
            <span className="info-tooltip">
                To learn more about {title}, click here
            </span>
        </Link>
    );
};

export default ArticleReference;
