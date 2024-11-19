import React from 'react';
import styles from './AdminPage.module.css';
import {useNavigate} from "react-router-dom"; // Assuming you have this CSS module for styling

const AdminPage = () => {

    const navigate = useNavigate();
    const handleReturn = () => {
        navigate('/');
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Admin Side</h1>
            </header>
            <main className={styles.mainContent}>
                <div className={styles.formGroup}>
                    <h2 className={styles.sectionTitle}>Find Bruger</h2>
                    <label className={styles.label}>Søg efter ID</label>
                    <input type="text" className={styles.input} />
                    <button className={styles.saveButton}>Gem</button>
                    <button className={styles.cancelButton}>Fortryd</button>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Søge efter logbog</label>
                    <input type="text" className={styles.input} />
                    <button className={styles.saveButton}>Gem</button>
                    <button className={styles.cancelButton}>Fortryd</button>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Slet efter ID</label>
                    <input type="text" className={styles.input} />
                    <button className={styles.saveButton}>Gem</button>
                    <button className={styles.cancelButton}>Fortryd</button>
                </div>
                <div className={styles.actionButtons}>
                    <button onClick={handleReturn} className={styles.returnButton}>Tilbage til startside</button>
                    <button className={styles.saveChangesButton}>Gem Ændringer</button>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
