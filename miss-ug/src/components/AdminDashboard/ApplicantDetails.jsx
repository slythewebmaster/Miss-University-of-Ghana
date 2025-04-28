import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './AdminDashboard.css';

const ApplicantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicant = async () => {
      const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching applicant:', error.message);
      } else {
        setApplicant(data);
      }

      setLoading(false);
    };

    fetchApplicant();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading applicant details...</div>;
  }

  if (!applicant) {
    return <div className="loading">Applicant not found.</div>;
  }

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <button className="nav-button" onClick={() => navigate(-1)}>← Back</button>
      </aside>

      <main className="dashboard-main">
        <h1>Applicant Details</h1>

        <div className="faq">
          <p><strong>Full Name:</strong> {applicant.full_name}</p>
          <p><strong>Email:</strong> {applicant.email}</p>
          <p><strong>Phone:</strong> {applicant.phone}</p>
          <p><strong>Registered On:</strong> {new Date(applicant.created_at).toLocaleString()}</p>
          {/* You can add more fields if you have e.g. age, gender, etc */}
        </div>
      </main>
    </div>
  );
};

export default ApplicantDetails;
