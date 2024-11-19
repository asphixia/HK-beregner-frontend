// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from './pages/Mainpage';
import LoginPage from "./pages/LoginPage";
import Header from "./pages/Header";
import Navbar from "./pages/Navbar";
import SuperUserPage from "./pages/SuperUserPage";


const App = () => {
    return (

        <Router>
                <Header/>

            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="login" element={<LoginPage/>}/>
                <Route path="superuser" element={<SuperUserPage/>}/>



            </Routes>
        </Router>
    );
};

export default App;
