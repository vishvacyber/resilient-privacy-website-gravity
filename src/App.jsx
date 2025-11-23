import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
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
import PrivacyAttackSurfaceManagement from './pages/PrivacyAttackSurfaceManagement';
import CredentialLeakProtection from './pages/CredentialLeakProtection';
import UnifiedSecurityShield from './pages/UnifiedSecurityShield';
import CompletePlatform from './pages/CompletePlatform';

// Admin Imports
import Login from './pages/Admin/Login';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import JobsManager from './pages/Admin/JobsManager';
import ApplicationsViewer from './pages/Admin/ApplicationsViewer';
import ContactSubmissions from './pages/Admin/ContactSubmissions';
import ServicesManager from './pages/Admin/ServicesManager';
import DocumentationManager from './pages/Admin/DocumentationManager';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
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

              {/* Product Pages */}
              <Route path="/product/privacy-attack-surface-management" element={<PrivacyAttackSurfaceManagement />} />
              <Route path="/product/credential-leak-protection" element={<CredentialLeakProtection />} />
              <Route path="/product/unified-security-shield" element={<UnifiedSecurityShield />} />
              <Route path="/product/complete-platform" element={<CompletePlatform />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobs" element={<JobsManager />} />
                <Route path="applications" element={<ApplicationsViewer />} />
                <Route path="messages" element={<ContactSubmissions />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="documentation" element={<DocumentationManager />} />
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

