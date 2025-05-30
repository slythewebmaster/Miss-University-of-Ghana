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
        .from('registrations')
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

  if (loading) return <div className="loading">Loading applicant details...</div>;
  if (!applicant) return <div className="loading">Applicant not found.</div>;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <button className="nav-button" onClick={() => navigate(-1)}>← Back</button>
      </aside>

      <main className="dashboard-main">
        <h1>Applicant Details</h1>
        <div className="details-container">
          <img
            src={applicant.photoUrl || 'https://via.placeholder.com/150'}
            alt={applicant.name}
            className="applicant-detail-photo"
          />
          <div className="faq">
            <p><strong>Name:</strong> {applicant.name}</p>
            <p><strong>Age:</strong> {applicant.age}</p>
            <p><strong>Gender:</strong> {applicant.gender}</p>
            <p><strong>Email:</strong> {applicant.email}</p>
            <p><strong>Phone:</strong> {applicant.phone}</p>
            <p><strong>Hall:</strong> {applicant.hall}</p>
            <p><strong>Program:</strong> {applicant.program}</p>
            <p><strong>Inspiration:</strong> {applicant.inspiration}</p>
            <p><strong>Unique Introduction:</strong> {applicant.uniqueIntro}</p>
            <p><strong>Payment Status:</strong> {applicant.paymentStatus}</p>
            <p><strong>Paystack Ref:</strong> {applicant.paystackRef}</p>
            <p><strong>Registered On:</strong> {new Date(applicant.created_at).toLocaleString()}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicantDetails;
