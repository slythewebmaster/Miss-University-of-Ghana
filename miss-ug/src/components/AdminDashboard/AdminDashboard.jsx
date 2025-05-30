import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrations = async () => {
      let query = supabase.from('registrations').select('*').order('created_at', { ascending: false });

      if (filter === 'Paid') query = query.eq('paymentStatus', 'Paid');
      if (filter === 'Unpaid') query = query.eq('paymentStatus', 'Unpaid');

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching registrations:', error.message);
      } else {
        setRegistrations(data || []);
      }
      setLoading(false);
    };

    fetchRegistrations();
  }, [filter]);

  const getFilteredCount = (status) => registrations.filter(r => r.paymentStatus === status).length;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">Pageant Admin</div>
        <nav className="nav-links">
          <button className="nav-button active">Dashboard</button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Applicant Dashboard</h1>
          <div className="filter-group">
            <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h4>Total</h4>
            <p>{registrations.length}</p>
          </div>
          <div className="stat-card">
            <h4>Paid</h4>
            <p>{getFilteredCount('Paid')}</p>
          </div>
          <div className="stat-card">
            <h4>Unpaid</h4>
            <p>{getFilteredCount('Unpaid')}</p>
          </div>
        </div>

        {loading ? (
          <p>Loading registrations...</p>
        ) : registrations.length > 0 ? (
          <div className="cards-grid">
            {registrations.map(reg => (
              <div
                key={reg.id}
                className="applicant-card"
                onClick={() => navigate(`/admin/applicant/${reg.id}`)}
              >
                <img
                  src={reg.photoUrl || 'https://via.placeholder.com/100'}
                  alt={reg.name}
                  className="applicant-photo"
                />
                <div className="applicant-info">
                  <h4>{reg.name}</h4>
                  <p>{reg.email}</p>
                  <p>Status: <strong className={reg.paymentStatus === 'Paid' ? 'paid' : 'unpaid'}>{reg.paymentStatus}</strong></p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No registrations found.</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
