import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../context/Authcontext';

const Login = () => {
  const {isAuthenticated, login} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8081/login', {
        headers: {
          username: username,
          password: password,
        },
      });

      if (response.status === 200) {
        setError('');
        login();
      } else {
        setError('Incorrect username password combination');
        console.error('Authentication failed');
      }
    } catch (error) {
      setError('Incorrect username password combination');
      console.error('Error during login:', error.message);
    }
  };


  if (isAuthenticated) {
    // Redirect to the doctor route if already authenticated
    return <Navigate to="/doctor" />;
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
