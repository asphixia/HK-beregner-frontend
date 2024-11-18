// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <h1 className="logo">HK</h1>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
