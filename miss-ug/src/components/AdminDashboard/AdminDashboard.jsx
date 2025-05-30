import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user && session.user.user_metadata?.role === 'admin') {
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
        console.error('Fetch error:', error.message);
      } else {
        setRegistrations(data);
        setFiltered(data);
      }
      setLoading(false);
    };

    if (user) fetchRegistrations();
  }, [user]);

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === 'All') {
      setFiltered(registrations);
    } else {
      setFiltered(registrations.filter(r => r.paymentStatus === status));
    }
  };

  const adminName = user?.user_metadata?.full_name || 'Admin';

  return (
    <div className="admin-dark">
      <aside className="sidebar-dark">
        <div className="logo-dark">Admin</div>
        <div className="admin-meta">
          <img
            src="https://img.freepik.com/premium-vector/anime-cartoon-character-vector-illustration_648489-34.jpg"
            className="admin-avatar"
            alt="Admin"
          />
          <p>{adminName}</p>
        </div>
        <button className="nav-button-dark" onClick={() => navigate('/admin')}>Dashboard</button>
        <button className="nav-button-dark" onClick={async () => {
          await supabase.auth.signOut();
          navigate('/admin');
        }}>Logout</button>
      </aside>

      <main className="dashboard-dark">
        <h1>Dashboard Overview</h1>

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <div className="dashboard-stats">
              <div className="stat-box">
                <h3>Total Applicants</h3>
                <p>{registrations.length}</p>
              </div>
              <div className="stat-box">
                <h3>Paid</h3>
                <p>{registrations.filter(r => r.paymentStatus === 'Paid').length}</p>
              </div>
              <div className="stat-box">
                <h3>Unpaid</h3>
                <p>{registrations.filter(r => r.paymentStatus !== 'Paid').length}</p>
              </div>
            </div>

            <div className="filter-bar">
              {['All', 'Paid', 'Unpaid'].map(status => (
                <button
                  key={status}
                  className={`filter-btn ${filter === status ? 'active' : ''}`}
                  onClick={() => handleFilterChange(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            <table className="dark-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(applicant => (
                  <tr
                    key={applicant.id}
                    onClick={() => navigate(`/admin/applicant/${applicant.id}`)}
                    className="clickable-row"
                  >
                    <td>
                      <img
                        src={applicant.photo || 'https://via.placeholder.com/50'}
                        alt={applicant.name}
                        className="thumb"
                      />
                    </td>
                    <td>{applicant.name}</td>
                    <td>{applicant.email}</td>
                    <td>{applicant.phone}</td>
                    <td className={applicant.paymentStatus === 'Paid' ? 'paid' : 'unpaid'}>
                      {applicant.paymentStatus}
                    </td>
                    <td>{new Date(applicant.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
