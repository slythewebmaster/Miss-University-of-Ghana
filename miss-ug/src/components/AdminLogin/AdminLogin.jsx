import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import Navbar from '../Navbar/Navbar';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true); // Start loading

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/admin-dashboard');
      } else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('✅ Registration successful. Please check your email.');
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setMessage('✅ Password reset email sent.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h2 className="admin-login-title">
            {mode === 'login' && 'Admin Login'}
            {mode === 'register' && 'Create Admin Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>

          {error && <p className="admin-login-error">{error}</p>}
          {message && <p className="admin-login-success">{message}</p>}

          <form onSubmit={handleAuth} className="admin-login-form">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {mode !== 'forgot' && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            )}

            <button type="submit" className="admin-login-button" disabled={loading}>
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'register' && 'Register'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </>
              )}
            </button>
          </form>

          <div className="admin-login-switch">
            {mode === 'login' && (
              <>
                <p>Don't have an account? <span onClick={() => setMode('register')}>Register</span></p>
                <p>Forgot password? <span onClick={() => setMode('forgot')}>Reset Password</span></p>
              </>
            )}

            {mode === 'register' && (
              <p>Already have an account? <span onClick={() => setMode('login')}>Sign In</span></p>
            )}

            {mode === 'forgot' && (
              <p>Remembered? <span onClick={() => setMode('login')}>Back to Login</span></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
