// assets/components/BookCreate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        publish_date: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/books/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then((res) => {
                if (res.ok) {
                    navigate('/books');
                } else {
                    console.error('Eroare la crearea cărții');
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Adaugă o carte</h2>
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

export default BookCreate;
