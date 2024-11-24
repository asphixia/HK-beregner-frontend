import React from 'react';
import styles from '../SuperUserPage.module.css'; // Assuming you have this CSS module for styling
import { useNavigate } from "react-router-dom";

const SuperUserPage = () => {
    const navigate = useNavigate();
    const handleReturnToMain = () => {
        navigate('/'); // Assumes the main page route is `/`
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Superbruger Side</h1>
                <button onClick={handleReturnToMain} className={styles.logoutButton}>Log af</button>
            </header>
            <main className={styles.mainContent}>
                <div className={styles.formGroup}>
                    <label htmlFor="createRuleInput" className={styles.label}>Lave ny regel</label>
                    <input id="createRuleInput" type="text" className={styles.input} />
                    <button className={styles.saveButton}>Gem</button>
                    <button className={styles.cancelButton}>Fortryd</button>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="updateRuleInput" className={styles.label}>Opdatere regel</label>
                    <input id="updateRuleInput" type="text" className={styles.input} />
                    <button className={styles.saveButton}>Gem</button>
                    <button className={styles.cancelButton}>Fortryd</button>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="deleteRuleInput" className={styles.label}>Slet en regel</label>
                    <input id="deleteRuleInput" type="text" className={styles.input} />
                    <button className={styles.saveButton}>Gem</button>
                    <button className={styles.cancelButton}>Fortryd</button>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="adminCaseInput" className={styles.label}>
                        Oprette sag til Admin<br />
                        <span className={styles.subText}>Husk at skrive id og logbog nummer i henvendelsen</span>
                    </label>
                    <textarea id="adminCaseInput" className={styles.textarea}></textarea>
                    <button className={styles.sendButton}>Send</button>
                    <button className={styles.cancelButton}>Fortryd</button>
                </div>
                <div className={styles.actionButtons}>
                    <button className={styles.saveChangesButton}>Gem Ændringer</button>
                    <button className={styles.cancelChangesButton}>Fortryd Ændringer</button>
                </div>
            </main>
        </div>
    );
};

export default SuperUserPage;
