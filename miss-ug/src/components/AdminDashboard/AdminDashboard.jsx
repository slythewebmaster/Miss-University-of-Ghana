import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [applicants, setApplicants] = useState([]);
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
    const fetchApplicants = async () => {
      const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applicants:', error.message);
      } else {
        setApplicants(data || []);
      }

      setLoading(false);
    };

    if (user) {
      fetchApplicants();
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
            <h4>Total Applicants</h4>
            <p>{applicants.length}</p>
          </div>
          <div className="stat-card">
            <h4>New This Month</h4>
            <p>{
              applicants.filter(applicant => {
                const date = new Date(applicant.created_at);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length
            }</p>
          </div>
        </div>

        <h2>Applicants</h2>

        {loading ? (
          <p>Loading applicants...</p>
        ) : applicants.length > 0 ? (
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
              {applicants.map(applicant => (
                <tr
                  key={applicant.id}
                  onClick={() => navigate(`/admin/applicant/${applicant.id}`)}
                  className="clickable-row"
                >
                  <td>{applicant.full_name}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone}</td>
                  <td>{new Date(applicant.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applicants found.</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
