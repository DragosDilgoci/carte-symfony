// assets/components/BookEdit.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        publish_date: '',
        price: ''
    });

    useEffect(() => {
        fetch(`/api/books/${id}`)
            .then(res => res.json())
            .then(data => setFormData(data))
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    navigate('/books');
                } else {
                    console.error('Eroare la editarea cărții');
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Editează cartea</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titlu</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Autor</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descriere</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Data publicării</label>
                    <input
                        type="date"
                        name="publish_date"
                        value={formData.publish_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Preț</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Salvează</button>
            </form>
        </div>
    );
}

export default BookEdit;
