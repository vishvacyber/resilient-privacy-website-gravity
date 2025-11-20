import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Products from './pages/Products';
import Resources from './pages/Resources';
import Demo from './pages/Demo';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Admin Imports
import Login from './pages/Admin/Login';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import JobsManager from './pages/Admin/JobsManager';
import ApplicationsViewer from './pages/Admin/ApplicationsViewer';
import ContactSubmissions from './pages/Admin/ContactSubmissions';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <CookieConsent />
          <Navbar />
          <main style={{ flex: 1, paddingTop: 'var(--header-height)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company/about" element={<About />} />
              <Route path="/company/careers" element={<Careers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobs" element={<JobsManager />} />
                <Route path="applications" element={<ApplicationsViewer />} />
                <Route path="messages" element={<ContactSubmissions />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

