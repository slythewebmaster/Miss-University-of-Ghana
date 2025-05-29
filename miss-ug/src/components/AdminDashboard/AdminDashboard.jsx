import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/admin');
      }
    };

    getUser();
  }, [navigate]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error.message);
      } else {
        setRegistrations(data || []);
      }

      setLoading(false);
    };

    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const adminName = user.user_metadata?.full_name || "Admin";

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">Admin Dashboard</div>
        <div
          className="profile-pic"
          style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg')" }}
        ></div>
        <h3>{adminName}</h3>
        <button className="nav-button active">Dashboard</button>
        <button className="nav-button" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dashboard-main">
        <h1 className="dashboard-title">Welcome, {adminName}</h1>

        <div className="stats">
          <div className="stat-card">
            <h4>Total Registrations</h4>
            <p>{registrations.length}</p>
          </div>
          <div className="stat-card">
            <h4>New This Month</h4>
            <p>{
              registrations.filter(reg => {
                const date = new Date(reg.created_at);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length
            }</p>
          </div>
        </div>

        <h2>Registrations</h2>

        {loading ? (
          <p>Loading registrations...</p>
        ) : registrations.length > 0 ? (
          <table className="applicants-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(reg => (
                <tr
                  key={reg.id || `${reg.email}-${reg.created_at}`}
                  onClick={() => navigate(`/admin/applicant/${reg.id}`)}
                  className="clickable-row"
                >
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>{new Date(reg.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No registrations found.</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
