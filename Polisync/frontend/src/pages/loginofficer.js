import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import './Login.css';
import logo from '../assets/logo.png';

function LoginOfficer() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const url = `https://deploy-mern-app-1-api.vercel.app/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message || 'Login failed';
        handleError(details);
      } else {
        handleError(message || 'Login failed');
      }
    } catch (err) {
      handleError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="image-side" />
      
      <div className="form-side">
        <img className="logo" src={logo} alt="CRIME Monitoring System Logo" />

        <form onSubmit={handleLogin}>
          <h1>Login as Officer</h1>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={loginInfo.password}
              required
            />
          </div>

          <button type="submit">Login</button>

          <span>
            Don't have an account?
            <Link to="/signup">Signup</Link>
          </span>
        </form>

        <div className="footer-links">
          <a href="/terms">Terms and Conditions</a> | 
          <a href="/privacy">Privacy Policy</a> | 
          <a href="/security">Security Policy</a>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default LoginOfficer;