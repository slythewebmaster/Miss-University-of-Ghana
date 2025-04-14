import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/admin-login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/admin-login");
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };


  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to the Admin Dashboard, {user.displayName || user.email}</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-stats">
        <h3>Dashboard Stats</h3>
        <div className="stats">
          <StatCard title="Total Users" value="200" />
          <StatCard title="Active Sessions" value="35" />
          <StatCard title="Pending Approvals" value="5" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

export default AdminDashboard;
