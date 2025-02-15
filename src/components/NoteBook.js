import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DrawingBoard from './DrawingBoard';
import './NoteBook.css';

const NoteBook = () => {
  const [books, setBooks] = useState([{ id: 1, name: 'My First Book', pages: [] }]);
  const [currentBook, setCurrentBook] = useState(1);
  const [currentPage, setCurrentPage] = useState(null);
  const [activeDrawings, setActiveDrawings] = useState(new Set());
  const [pageElements, setPageElements] = useState({});
  const [activeTextBlock, setActiveTextBlock] = useState(null);
  const quillRefs = useRef({});


  const addBook = () => {
    const newBook = {
      id: books.length + 1,
      name: `Book ${books.length + 1}`,
      pages: []
    };
    setBooks([...books, newBook]);
  };

  const addPage = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      const newPage = {
        id: book.pages.length + 1,
        name: `Page ${book.pages.length + 1}`,
        type: 'text',
        content: ''
      };
      const updatedBooks = books.map(b => {
        if (b.id === bookId) {
          return { ...b, pages: [...b.pages, newPage] };
        }
        return b;
      });
      setBooks(updatedBooks);
      setCurrentPage(newPage.id);
      setPageElements({
        ...pageElements,
        [`${bookId}-${newPage.id}`]: [{ type: 'text', content: '', segments: [] }]
      });
    }
  };

  const handlePageContent = (bookId, pageId, content, segments, position) => {
    const key = `${bookId}-${pageId}`;
    const elements = [...(pageElements[key] || [])];
    const wasNewBlockAdded = elements.length === 0 || (!position && content === '');
    
    if (position !== undefined) {
      elements[position] = { 
        ...elements[position], 
        content,
        segments: segments || []
      };
      
      const isLastElement = position === elements.length - 1;
      const hasContent = content.trim().length > 0;
      if (isLastElement && hasContent && !elements.some(el => el.type === 'text' && !el.content.trim())) {
        elements.push({ type: 'text', content: '', segments: [] });
      }
    } else {
      elements.push({ type: 'text', content: '', segments: [] });
    }

    setPageElements({
      ...pageElements,
      [key]: elements
    });

    if (wasNewBlockAdded) {
      setTimeout(() => {
        const contentArea = document.querySelector('.content-elements');
        if (contentArea) {
          contentArea.scrollTop = contentArea.scrollHeight;
        }
      }, 0);
    }
  };

  const addDrawingBlock = (bookId, pageId) => {
    const key = `${bookId}-${pageId}`;
    const elements = [...(pageElements[key] || [])];
    const newIndex = elements.length;
    elements.push({ type: 'drawing', content: null });
    setPageElements({
      ...pageElements,
      [key]: elements
    });
    const newActiveDrawings = new Set(activeDrawings);
    newActiveDrawings.add(newIndex);
    setActiveDrawings(newActiveDrawings);
  };

  const handleDrawingSave = (bookId, pageId, index, drawingData) => {
    const key = `${bookId}-${pageId}`;
    const elements = [...(pageElements[key] || [])];
    elements[index] = { type: 'drawing', content: drawingData };
    setPageElements({
      ...pageElements,
      [key]: elements
    });
    const newActiveDrawings = new Set(activeDrawings);
    newActiveDrawings.delete(index);
    setActiveDrawings(newActiveDrawings);
  };

  const toggleDrawing = (index) => {
    const newActiveDrawings = new Set(activeDrawings);
    if (newActiveDrawings.has(index)) {
      newActiveDrawings.delete(index);
    } else {
      newActiveDrawings.add(index);
    }
    setActiveDrawings(newActiveDrawings);
  };

  const deleteBlock = (bookId, pageId, index) => {
    const key = `${bookId}-${pageId}`;
    const elements = [...(pageElements[key] || [])];
    elements.splice(index, 1);
    setPageElements({
      ...pageElements,
      [key]: elements
    });
    const newActiveDrawings = new Set(activeDrawings);
    newActiveDrawings.delete(index);
    setActiveDrawings(newActiveDrawings);
  };

  const getCurrentBook = () => books.find(b => b.id === currentBook);

  const renameBook = (bookId, newName) => {
    const updatedBooks = books.map(b => 
      b.id === bookId ? { ...b, name: newName } : b
    );
    setBooks(updatedBooks);
  };

  const renamePage = (bookId, pageId, newName) => {
    const updatedBooks = books.map(b => {
      if (b.id === bookId) {
        const updatedPages = b.pages.map(p =>
          p.id === pageId ? { ...p, name: newName } : p
        );
        return { ...b, pages: updatedPages };
      }
      return b;
    });
    setBooks(updatedBooks);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ]
  };

  const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet'
  ];

  return (
    <div className="notebook">
      <div className="columns-container">
        <div className="books-column">
          <div className="column-header">
            <h2>Books</h2>
            <button onClick={addBook} className="add-btn">+ New Book</button>
          </div>
          <div className="books-list">
            {books.map(book => (
              <div 
                key={book.id} 
                className={`book-item ${currentBook === book.id ? 'active' : ''}`}
                onClick={() => setCurrentBook(book.id)}
              >
                <input
                  value={book.name}
                  onChange={(e) => renameBook(book.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="book-name-input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pages-column">
          <div className="column-header">
            <h2>Pages</h2>
            {currentBook && (
              <button 
                onClick={() => addPage(currentBook)}
                className="add-btn"
              >
                + New Page
              </button>
            )}
          </div>
          {currentBook && (
            <div className="pages-list">
              {getCurrentBook()?.pages.map(page => (
                <div 
                  key={page.id}
                  className={`page-item ${currentPage === page.id ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page.id)}
                >
                  <input
                    value={page.name}
                    onChange={(e) => renamePage(currentBook, page.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="page-name-input"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-area">
          {currentBook && currentPage ? (
            <div className="page-content">
              <div className="page-toolbar">
                <div className="toolbar-section">
                  <button 
                    onClick={() => handlePageContent(currentBook, currentPage, '', [], undefined)}
                    className="tool-btn"
                  >
                    + Add Text Block
                  </button>
                  <button 
                    onClick={() => addDrawingBlock(currentBook, currentPage)}
                    className="tool-btn"
                  >
                    ✏️ Add Drawing Block
                  </button>
                </div>

              </div>
              
              <div className="content-elements">
                {(pageElements[`${currentBook}-${currentPage}`] || [{ type: 'text', content: '', segments: [] }]).map((element, index) => (
                  <div key={index} className="content-element-wrapper">
                    <div className="content-element-header">
                      <button 
                        onClick={() => deleteBlock(currentBook, currentPage, index)}
                        className="delete-btn"
                        title="Delete block"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="content-element">
                    {element.type === 'text' ? (
                      <div className="text-editor-container">
                        <ReactQuill
                          ref={el => quillRefs.current[index] = el}
                          theme="snow"
                          value={element.content || ''}
                          onChange={(content) => {
                            handlePageContent(currentBook, currentPage, content, [], index);
                          }}
                          modules={modules}
                          formats={formats}
                          placeholder="Start typing your notes..."
                        />
                      </div>
                    ) : (
                      <div className="drawing-element">
                        {activeDrawings.has(index) ? (
                          <DrawingBoard 
                            onSave={(drawingData) => handleDrawingSave(currentBook, currentPage, index, drawingData)}
                            onClose={() => toggleDrawing(index)}
                            initialContent={element.content}
                          />
                        ) : element.content ? (
                          <div onClick={() => toggleDrawing(index)}>
                            <img src={element.content} alt="Drawing" />
                          </div>
                        ) : (
                          <div 
                            className="empty-drawing"
                            onClick={() => toggleDrawing(index)}
                          >
                            Click to start drawing
                          </div>
                        )}
                      </div>
                    )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <h2>Welcome to Your Notebook!</h2>
              <p>Select a book and page to start taking notes, or create a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteBook;
