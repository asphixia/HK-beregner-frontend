import React, { useState } from 'react';
import styles from './CalculatorPage.module.css';
import {useNavigate} from "react-router-dom"; // Assuming you have this CSS module for styling

const CalculatorPage = () => {
    const [startDato, setStartDato] = useState('');
    const [slutDato, setSlutDato] = useState('');
    const [ferieDato, setFerieDato] = useState('');
    const [sygdom, setSygdom] = useState('');
    const [vagtændring, setVagtændring] = useState('');
    const [file, setFile] = useState(null);

    const navigate = useNavigate();
    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        // Handle submission logic (e.g., form validation, API calls)
        console.log('Submitted form data:', { startDato, slutDato, ferieDato, sygdom, vagtændring, file });
    };

    const handleBackToMain = () => {
        // Navigate back to the main page
        navigate('/');
        console.log('Navigate back to main page');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>HK</h1>
            </header>
            <main className={styles.mainContent}>
                <h2>Indtast din vagtplan med afvigelser</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Start Dato</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={startDato}
                        onChange={(e) => setStartDato(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Slut Dato</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={slutDato}
                        onChange={(e) => setSlutDato(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Ferie Dato</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={ferieDato}
                        onChange={(e) => setFerieDato(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Sygdom</label>
                    <input
                        type="date"
                        className={styles.input}
                        value={sygdom}
                        onChange={(e) => setSygdom(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Vagtændring</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={vagtændring}
                        onChange={(e) => setVagtændring(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Upload din vagtplan med afvigelser</label>
                    <input type="file" className={styles.input} onChange={handleFileUpload} />
                </div>
                <div className={styles.actionButtons}>
                    <button onClick={handleBackToMain} className={styles.backButton}>Tilbage til Startside</button>
                    <button onClick={handleSubmit} className={styles.submitButton}>Videre til afgørelse</button>
                </div>
            </main>
        </div>
    );
};

export default CalculatorPage;
