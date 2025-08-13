import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Auth: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('FRONTEND sending:', { username, password });

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        username,
        password,
      });

      if (isRegistering) {
        setMessage(response.data.message);
      } else {
        setToken(response.data.token);
        setMessage('Login successful!');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  const handleProtected = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/protected', {
        headers: {
          'x-auth-token': token,
        },
      });
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Access denied.');
    }
  };

  return (
    <div className="auth-container">
      <h1>JWT Authentication</h1>
      <form onSubmit={handleAuth} className="auth-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button
          type="button" // Use type="button" to prevent form submission
          onClick={() => setIsRegistering(!isRegistering)}
          className="auth-toggle-button"
        >
          {isRegistering ? 'Go to Login' : 'Go to Register'}
        </button>
      </form>
      {token && (
        <div className="protected-section">
          <p>Your token: {token.substring(0, 20)}...</p>
          <button onClick={handleProtected} className="protected-button">
            Access Protected Route
          </button>
        </div>
      )}
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
};

export default Auth;