import React, { useState } from "react";
import styles from "./Mainpage.module.css";
import {useNavigate} from "react-router-dom"; // Import CSS Module

const Mainpage = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const navigate = useNavigate();
    const handleSelectionChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleNextPage = () => {
        navigate("/calculator");
    }

    return (
        <div className={styles.mainpageContainer}>
            <header className={styles.header}>
                <h1>Velkommen til HK</h1>
            </header>
            <main className={styles.mainContent}>
                <section>
                    <p>Venligst udvælg din rolle.</p>
                    <select
                        name="Rolles"
                        id="Rolles"
                        onChange={handleSelectionChange}
                        className={styles.dropdown}
                    >
                        <option value="">Vælg en rolle</option>
                        <option value="Butiksmedarbejder">Butiksmedarbejder</option>
                        <option value="Elev">Elev</option>
                        <option value="Mellemleder">Mellemleder</option>
                    </select>
                    <p>Indtast din startdato</p>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="Startdato">Startdato:</label>
                            <input type="date" id="Startdato" />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="Slutdato">Slutdato:</label>
                            <input type="date" id="Slutdato" />
                        </div>
                        <button onClick={handleNextPage} className={styles.submitButton}>
                            Bekræft
                        </button>
                    </form>
                </section>
            </main>
            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} HK Danmark</p>
            </footer>
        </div>
    );
};

export default Mainpage;