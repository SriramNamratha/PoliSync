// LoginCitizen.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Login.css';
import logo from '../assets/logo.png';

function LoginCitizen() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginInfo.email || !loginInfo.password) {
      return handleError('Email and password are required');
    }

    try {
      const response = await fetch('https://deploy-mern-app-1-api.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...loginInfo, userType: 'citizen' })
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('userType', 'citizen');
        setTimeout(() => navigate('/home'), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message || 'Login failed');
      }
    } catch {
      handleError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="image-side" />
      <div className="form-side">
        <img className="logo" src={logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <h1>Citizen Login</h1>
          <span>
            <Link to="/login">Login as Citizen</Link> | <Link to="/loginofficer">Login as Officer</Link>
          </span>
          <label>Email</label>
          <input type="email" name="email" value={loginInfo.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={loginInfo.password} onChange={handleChange} required />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>
        <div className="footer-links">
          <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a> | <a href="/security">Security</a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginCitizen;
