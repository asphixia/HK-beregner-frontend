
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import Header from "./pages/Header";
import HkSuperUserPage from "./pages/HkSuperUserPage";
import AdminPage from "./pages/AdminPage";
import CalculatorPage from "./pages/CalculatorPage";
import FrontPage from "./pages/FrontPage";


const App = () => {
    return (

        <Router>
                <Header/>

            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="login" element={<LoginPage/>}/>
                <Route path="superuser" element={<HkSuperUserPage/>}/>
                <Route path="admin" element={<AdminPage/>}/>
                <Route path="calculator" element={<CalculatorPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
