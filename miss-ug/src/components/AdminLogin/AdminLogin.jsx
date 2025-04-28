import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login, register, forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/admin-dashboard');
      } 
      else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('✅ Registration successful. Please check your email to confirm.');
      } 
      else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setMessage('✅ Password reset email sent.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-login-container">
        <div className="login-box">
          <h2>
            {mode === 'login' ? 'Admin Login' :
             mode === 'register' ? 'Register Admin' :
             'Reset Password'}
          </h2>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}

          <form onSubmit={handleAuth}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            {mode !== 'forgot' && (
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            )}

            <button type="submit" className="auth-btn">
              {mode === 'login' ? 'Login' :
               mode === 'register' ? 'Register' : 'Send Reset Link'}
            </button>
          </form>

          <div className="switch-auth">
            {mode === 'login' && (
              <>
                <p>Don't have an account? <span onClick={() => setMode('register')}>Register</span></p>
                <p>Forgot password? <span onClick={() => setMode('forgot')}>Reset</span></p>
              </>
            )}

            {mode === 'register' && (
              <p>Already registered? <span onClick={() => setMode('login')}>Login</span></p>
            )}

            {mode === 'forgot' && (
              <p>Go back to <span onClick={() => setMode('login')}>Login</span></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
