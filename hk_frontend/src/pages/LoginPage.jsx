import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import styles from '../Loginpage.module.css'; // Adjust path as needed

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();


    const API_URL = 'api/login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!username || !password) {
                throw new Error('Username and password are required');
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const data = await response.json();

            if (data.role === 'admin') {
                navigate('/admin');
            } else if (data.role === 'superuser') {
                navigate('/superuser');
            } else {
                navigate('/user');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);

        }
    };


    const handleClearForm = () => {
        setUsername('');
        setPassword('');
    }
    const handleReturnToMain = () => {
        navigate('/'); // Assumes the main page route is `/`
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h1 className={styles.loginTitle}>Login</h1>
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
                    Return til hovedsiden
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
