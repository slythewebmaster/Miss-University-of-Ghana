import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Register from './components/Register/register';
import ContactUs from './components/Contact/Contact';
import Highlight from './components/Highlight/Highlight';
import Footer from './components/Footer/Footer';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme='colored' />
      <Navbar user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Highlight />
              <Register />
              <ContactUs />
              <Footer />
            </>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;