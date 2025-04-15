import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
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

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const snapshot = await db.collection("applicants").orderBy("timestamp", "desc").get();
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/admin-login");
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="logo">👑</div>
        <div className="profile-pic" />
        <h3>{user.displayName || user.email}</h3>
        <button onClick={() => navigate("/add-contestant")}>➕ Add Contestant</button>
        <button className="nav-button active">🏠 Home</button>
        <button className="logout" onClick={handleLogout}>🚪 Logout</button>
      </aside>

      <main className="dashboard-main">
        <h1>Admin Dashboard</h1>

        <section className="stats">
          <StatCard title="Registered Applicants" value={applicants.length} />
          <StatCard title="Active Admins" value="3" />
          <StatCard title="Pending Reviews" value="4" />
        </section>

        <section className="faq">
          <h2>Newly Registered Applicants</h2>
          {applicants.length > 0 ? (
            <ul className="applicant-list">
              {applicants.map((applicant) => (
                <li key={applicant.id}>
                  <strong>{applicant.fullName}</strong> — {applicant.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No applicants yet.</p>
          )}
        </section>
      </main>
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
