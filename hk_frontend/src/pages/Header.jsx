// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Import the CSS file for the header styling

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">HK.dk</h1>

            </div>
        </header>
    );
};

export default Header;

/*  Der skal laves en seperat nav bar til headeren

<nav className="nav">
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#membership">Membership</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><a href="#login">Login</a></li>
                    </ul>
                </nav>

 */