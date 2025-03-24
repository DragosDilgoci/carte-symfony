// assets/components/BookList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('/api/books')
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>Lista de Cărți</h2>
            <Link to="/books/new">Adaugă o carte nouă</Link>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <Link to={`/books/${book.id}`}>
                            {book.title} - {book.author}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
