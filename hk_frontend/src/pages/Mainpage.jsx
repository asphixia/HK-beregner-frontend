import React, { useState } from "react";
import './Mainpage.css'; // Import CSS

const Mainpage = () => {
    //const [selectedRole, setSelectedRole] = useState("");

    const handleSelectionChange = (event) => {
        setSelectedRole(event.target.value);
    };

    return (
        <div className="mainpage">
            <main className="main-content">
                <section className="hero">
                    <div className="container">
                        <h2>Velkommen til hovedsiden</h2>
                        <p>Venligst udvælg din rolle.</p>
                        <select name="Rolles" id="Rolles" onChange={handleSelectionChange}>
                            <option value="">Vælg en rolle</option>
                            <option value="Butiksmedarbejder">Butiksmedarbejder</option>
                            <option value="Elev">Elev</option>
                            <option value="Mellemleder">Mellemleder</option>
                        </select>
                        <p>Indtast din startdato</p>
                        {/* Form */}
                        <form>
                            <label htmlFor="Startdato">Startdato:
                                <input type="date" id="Startdato" />
                            </label>

                            <label htmlFor="Slutdato">Slutdato:
                                <input type="date" id="Slutdato" />
                            </label>

                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Mainpage;
