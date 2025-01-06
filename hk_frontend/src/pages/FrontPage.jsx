import React from "react";
import "../styling/FrontPageStyling.css";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="frontpage">
      <header className="frontpage-header">
        <h1>Velkommen til HK Løn Beregner</h1>
        <p>Din platform til administration af lønregler og beregninger</p>
      </header>
      
      <main className="frontpage-content">
        <section className="feature-section">
          <h2>Funktioner</h2>
          <ul>
            <li>Administrer lønregler</li>
            <li>Beregn løn baseret på HK-overenskomster</li>
            <li>Brugervenlig og moderne grænseflade</li>
          </ul>
        </section>

        <section className="action-section">
          <h2>Hvad vil du gøre?</h2>
          <div className="action-buttons">
            <button className="action-button" onClick={() => navigate("/login")}>
              Log ind
            </button>
            <button className="action-button" onClick={() => navigate("/calculator")}>
              Gå til Løn Beregner
            </button>
          </div>
        </section>
      </main>

      <footer className="frontpage-footer">
        <p>© 2024 HK Løn Beregner. Alle rettigheder forbeholdes.</p>
      </footer>
    </div>
  );
};

export default FrontPage;
