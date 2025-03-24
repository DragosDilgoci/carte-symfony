// assets/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Bun venit!</h1>
            <p>Aceasta este pagina principală a aplicației React.</p>
            <Link to="/books">Vezi lista de cărți</Link>
        </div>
    );
}

export default HomePage;
