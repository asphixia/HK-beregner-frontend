import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Loginpage.module.css'; // Adjust path as needed

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store JWT in localStorage or sessionStorage
                localStorage.setItem('jwt', data.token);

                // Navigate based on role or status
                if (data.role === 'admin') {
                    navigate('/admin');
                } else if (data.role === 'superuser') {
                    navigate('/superuser');
                } else {
                    navigate('/user');
                }
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleClearForm = () => {
        setUsername('');
        setPassword('');
        setError('');
    };

    const handleReturnToMain = () => {
        navigate('/'); // Assumes the main page route is `/`
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.loginTitle}>Login</h1>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className={styles.label}>Brugernavn</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className={styles.label}>Adgangskode</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className={styles.loginButton}>Log ind</button>
                </form>
                <p className={styles.loginFooter}>
                    Har du glemt din adgangskode? <a href="#">Klik her</a>
                </p>

                <button onClick={handleClearForm} className={styles.clearButton}>
                    Fortryd
                </button>

                <button onClick={handleReturnToMain} className={styles.returnButton}>
                    Retur til hovedsiden
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
