// assets/app.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import HomePage from './components/HomePage';
import BookList from './components/BookList';
import BookCreate from './components/BookCreate';
import BookDetail from './components/BookDetail';
import BookEdit from './components/BookEdit';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/new" element={<BookCreate />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/books/:id/edit" element={<BookEdit />} />
            </Routes>
        </Router>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
