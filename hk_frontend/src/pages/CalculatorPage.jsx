import React, { useState } from 'react';
import styles from './CalculatorPage.module.css';
import { useNavigate } from 'react-router-dom';

const CalculatorPage = () => {
    const [startSlutEntries, setStartSlutEntries] = useState([{ startDato: '', slutDato: '' }]);
    const [ferieEntries, setFerieEntries] = useState([{ ferieStart: '', ferieSlut: '' }]);
    const [sygdomEntries, setSygdomEntries] = useState([{ sygdomStart: '', sygdomSlut: '' }]);
    const [vagtændring, setVagtændring] = useState('');
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    // Dynamic handling for StartDato and SlutDato
    const handleAddStartSlut = () => {
        setStartSlutEntries([...startSlutEntries, { startDato: '', slutDato: '' }]);
    };

    const handleRemoveStartSlut = (index) => {
        setStartSlutEntries(startSlutEntries.filter((_, i) => i !== index));
    };

    const handleStartSlutChange = (index, field, value) => {
        const updatedEntries = startSlutEntries.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        );
        setStartSlutEntries(updatedEntries);
    };

    // Dynamic handling for Ferie
    const handleAddFerie = () => {
        setFerieEntries([...ferieEntries, { ferieStart: '', ferieSlut: '' }]);
    };

    const handleRemoveFerie = (index) => {
        setFerieEntries(ferieEntries.filter((_, i) => i !== index));
    };

    const handleFerieChange = (index, field, value) => {
        const updatedFerieEntries = ferieEntries.map((ferie, i) =>
            i === index ? { ...ferie, [field]: value } : ferie
        );
        setFerieEntries(updatedFerieEntries);
    };

    // Dynamic handling for Sygdom
    const handleAddSygdom = () => {
        setSygdomEntries([...sygdomEntries, { sygdomStart: '', sygdomSlut: '' }]);
    };

    const handleRemoveSygdom = (index) => {
        setSygdomEntries(sygdomEntries.filter((_, i) => i !== index));
    };

    const handleSygdomChange = (index, field, value) => {
        const updatedSygdomEntries = sygdomEntries.map((sygdom, i) =>
            i === index ? { ...sygdom, [field]: value } : sygdom
        );
        setSygdomEntries(updatedSygdomEntries);
    };

    const formatDate = (date) => {
        if (!date) return '';
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleSubmit = () => {
        console.log('Submitted form data:', {
            startSlutEntries,
            ferieEntries,
            sygdomEntries,
            vagtændring,
            file,
        });
    };

    const handleBackToMain = () => {
        navigate('/');
        console.log('Navigate back to main page');
    };

    const handleResultPage = () => {
        navigate('/result');
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>HK</h1>
            </header>
            <main className={styles.mainContent}>
                <h2>Indtast din vagtplan med afvigelser</h2>

                {/* StartDato and SlutDato Section */}
                <h3>StartDato og SlutDato</h3>
                {startSlutEntries.map((entry, index) => (
                    <div key={index} className={styles.row}>
                        <input
                            type="date"
                            className={styles.input}
                            value={entry.startDato}
                            onChange={(e) =>
                                handleStartSlutChange(index, 'startDato', e.target.value)
                            }
                        />
                        <span className={styles.separator}>til</span>
                        <input
                            type="date"
                            className={styles.input}
                            value={entry.slutDato}
                            onChange={(e) =>
                                handleStartSlutChange(index, 'slutDato', e.target.value)
                            }
                        />
                        <div className={styles.buttonGroup}>
                            <button onClick={handleAddStartSlut} className={styles.addButton}>
                                Tilføj
                            </button>
                            <button
                                onClick={() => handleRemoveStartSlut(index)}
                                className={styles.removeButton}
                            >
                                Fjern
                            </button>
                        </div>
                    </div>
                ))}
                {startSlutEntries.map((entry, index) =>
                    entry.startDato && entry.slutDato ? (
                        <p key={index} className={styles.startSlutText}>
                            Din periode er fra {formatDate(entry.startDato)} til{' '}
                            {formatDate(entry.slutDato)}
                        </p>
                    ) : null
                )}

                {/* Ferie Section */}
                <h3>Ferie</h3>
                {ferieEntries.map((ferie, index) => (
                    <div key={index} className={styles.row}>
                        <input
                            type="date"
                            className={styles.input}
                            value={ferie.ferieStart}
                            onChange={(e) =>
                                handleFerieChange(index, 'ferieStart', e.target.value)
                            }
                        />
                        <span className={styles.separator}>til</span>
                        <input
                            type="date"
                            className={styles.input}
                            value={ferie.ferieSlut}
                            onChange={(e) =>
                                handleFerieChange(index, 'ferieSlut', e.target.value)
                            }
                        />
                        <div className={styles.buttonGroup}>
                            <button onClick={handleAddFerie} className={styles.addButton}>
                                Tilføj
                            </button>
                            <button onClick={() => handleRemoveFerie(index)} className={styles.removeButton}>
                                Fjern
                            </button>
                        </div>
                    </div>
                ))}
                {ferieEntries.map((ferie, index) =>
                    ferie.ferieStart && ferie.ferieSlut ? (
                        <p key={index} className={styles.ferieText}>
                            Din ferie er fra {formatDate(ferie.ferieStart)} til{' '}
                            {formatDate(ferie.ferieSlut)}
                        </p>
                    ) : null
                )}

                {/* Sygdom Section */}
                <h3>Sygdom</h3>
                {sygdomEntries.map((sygdom, index) => (
                    <div key={index} className={styles.row}>
                        <input
                            type="date"
                            className={styles.input}
                            value={sygdom.sygdomStart}
                            onChange={(e) =>
                                handleSygdomChange(index, 'sygdomStart', e.target.value)
                            }
                        />
                        <span className={styles.separator}>til</span>
                        <input
                            type="date"
                            className={styles.input}
                            value={sygdom.sygdomSlut}
                            onChange={(e) =>
                                handleSygdomChange(index, 'sygdomSlut', e.target.value)
                            }
                        />
                        <div className={styles.buttonGroup}>
                            <button onClick={handleAddSygdom} className={styles.addButton}>
                                Tilføj
                            </button>
                            <button
                                onClick={() => handleRemoveSygdom(index)}
                                className={styles.removeButton}
                            >
                                Fjern
                            </button>
                        </div>
                    </div>
                ))}
                {sygdomEntries.map((sygdom, index) =>
                    sygdom.sygdomStart && sygdom.sygdomSlut ? (
                        <p key={index} className={styles.sygdomText}>
                            Din sygdom er fra {formatDate(sygdom.sygdomStart)} til{' '}
                            {formatDate(sygdom.sygdomSlut)}
                        </p>
                    ) : null
                )}

                {/* File Upload Section */}
                <div className={styles.formGroup}>
                    <label className={styles.label}>Upload din vagtplan med afvigelser</label>
                    <input type="file" className={styles.input} onChange={handleFileUpload} />
                </div>

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                    <button onClick={handleBackToMain} className={styles.backButton}>
                        Tilbage til Startside
                    </button>
                    <button onClick={handleResultPage} className={styles.submitButton}>
                        Videre til afgørelse
                    </button>
                </div>
            </main>
        </div>
    );
};

export default CalculatorPage;