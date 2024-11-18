// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './pages/Mainpage'; // Your main page component


const App = () => {
    return (

        <Router>

            <Routes>
                <Route path="/" element={<Mainpage />} />

            </Routes>
        </Router>
    );
};

export default App;
