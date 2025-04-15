import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import LegacySection from './components/LegacySection/LegacySection';
import About from './components/About/About';
import AboutSection from './components/AboutSection/AboutSection';
import Register from './components/Register/register';
import SponsorSection from './components/SponsorSection/SponsorSection';
import BecomePartner from './components/BecomePartner/BecomePartner';
import ContactUs from './components/Contact/Contact';
import Highlight from './components/Highlight/Highlight';
import Footer from './components/Footer/Footer';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import { SiVercel } from 'react-icons/si';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  }

  return (
    <Router>
      <ScrollToTop />

      <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <>
          <div id="Hero"><Hero /></div>
          <div id="Legacy"><LegacySection /></div>
          <div id="About"><About /></div>
          <div id="Highlight"><Highlight /></div>
          <div id="Register"><Register /></div>
          <div id="Sponsors"><SponsorSection /></div>
          <div id="Contact"><ContactUs /></div>
            </>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/become-a-partner" element={<BecomePartner />} />
        <Route path="/AboutSection" element={<AboutSection />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;