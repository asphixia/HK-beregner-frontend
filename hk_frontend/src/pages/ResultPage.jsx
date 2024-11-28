import React, { useEffect, useState } from 'react';
import styles from './ResultPage.module.css';
import {useNavigate} from "react-router-dom"; // Assuming you have this CSS module for styling

const ResultPage = () => {
    const [result, setResult] = useState('');
    const [extraMessage, setExtraMessage] = useState('');

    const navigate = useNavigate();

    const handleBackToMain = () => {
        navigate('/');
    }

    // Simulated data fetching
    useEffect(() => {
        // Example of fetching data
        const fetchData = async () => {
            try {
                // Simulated API call (replace this with your actual API call)
                const response = await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            statement: 'Du skal have 15677kr i November',
                            extraInfo: 'Du har arbejdet for meget i November med x antal timer ift §1.2',
                        });
                    }, 1000); // Simulated delay
                });

                setResult(response.statement);
                setExtraMessage(response.extraInfo);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>HK</h1>
            </header>
            <main className={styles.mainContent}>
                <h2>Afgørelse</h2>
                <p className={styles.resultText}>{result}</p>
                <p className={styles.extraMessage}>{extraMessage}</p>
                <button onClick={handleBackToMain} className={styles.backButton}>Tilbage til startside</button>
            </main>
        </div>
    );
};

export default ResultPage;
