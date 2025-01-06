import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/LoginAPI';
import LoginForm from '../components/LoginForm';
import { jwtDecode } from 'jwt-decode';
import '../App.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const token = await login(credentials);
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "SUPERUSER") {
        navigate("/superuser");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <p className="login-description">Welcome to HK Salary Calculator. Please log in to continue.</p>
        <LoginForm onLogin={handleLogin} />
        <footer className="login-footer">© 2024 HK Salary Calculator</footer>
      </div>
    </div>
  );
};

export default LoginPage;
