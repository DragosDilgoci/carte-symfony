// assets/components/BookDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`/api/books/${id}`)
            .then(res => res.json())
            .then(data => setBook(data))
            .catch(error => console.error(error));
    }, [id]);

    const handleDelete = () => {
        fetch(`/api/books/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    navigate('/books');
                } else {
                    console.error('Eroare la ștergerea cărții');
                }
            })
            .catch(error => console.error(error));
    };

    if (!book) {
        return <div>Se încarcă...</div>;
    }

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Autor: {book.author}</p>
            <p>Descriere: {book.description}</p>
            <p>Data publicării: {book.publish_date}</p>
            <p>Preț: {book.price}</p>
            <button onClick={handleDelete}>Șterge</button>
            <Link to={`/books/${book.id}/edit`}>Editează</Link>
        </div>
    );
}

export default BookDetail;
