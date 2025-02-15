const NOTES_STORAGE_KEY = 'article_notes';

export const generateNoteId = () => {
    return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getStoredNotes = () => {
    const notes = localStorage.getItem(NOTES_STORAGE_KEY);
    return notes ? JSON.parse(notes) : {};
};

const saveNotesToStorage = (notes) => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

export const saveNote = (articleId, content, section = null) => {
    const notes = getStoredNotes();
    const noteId = generateNoteId();
    const timestamp = Date.now();

    if (!notes[articleId]) {
        notes[articleId] = [];
    }

    notes[articleId].push({
        id: noteId,
        content,
        section,
        timestamp,
        lastModified: timestamp
    });

    saveNotesToStorage(notes);
    return noteId;
};

export const updateNote = (articleId, noteId, content) => {
    const notes = getStoredNotes();
    
    if (!notes[articleId]) return false;

    const noteIndex = notes[articleId].findIndex(note => note.id === noteId);
    if (noteIndex === -1) return false;

    notes[articleId][noteIndex] = {
        ...notes[articleId][noteIndex],
        content,
        lastModified: Date.now()
    };

    saveNotesToStorage(notes);
    return true;
};

export const deleteNote = (articleId, noteId) => {
    const notes = getStoredNotes();
    
    if (!notes[articleId]) return false;

    const noteIndex = notes[articleId].findIndex(note => note.id === noteId);
    if (noteIndex === -1) return false;

    notes[articleId].splice(noteIndex, 1);
    
    // Remove article entry if no notes remain
    if (notes[articleId].length === 0) {
        delete notes[articleId];
    }

    saveNotesToStorage(notes);
    return true;
};

export const getArticleNotes = (articleId) => {
    const notes = getStoredNotes();
    return notes[articleId] || [];
};

export const getAllNotes = () => {
    const notes = getStoredNotes();
    const allNotes = [];

    Object.entries(notes).forEach(([articleId, articleNotes]) => {
        articleNotes.forEach(note => {
            allNotes.push({
                ...note,
                articleId
            });
        });
    });

    // Sort by last modified, most recent first
    return allNotes.sort((a, b) => b.lastModified - a.lastModified);
};

export const hasNotes = (articleId) => {
    const notes = getStoredNotes();
    return Boolean(notes[articleId] && notes[articleId].length > 0);
};

export const getNoteCount = (articleId) => {
    const notes = getStoredNotes();
    return notes[articleId] ? notes[articleId].length : 0;
};
