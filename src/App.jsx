import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
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
import CoreShield from './pages/CoreShield';
import DataGuard from './pages/DataGuard';
import ThreatWatch from './pages/ThreatWatch';
import SecureAPI from './pages/SecureAPI';
import HowItWorks from './pages/HowItWorks';


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
              <Route path="/company/how-it-works" element={<HowItWorks />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Product Pages */}
              <Route path="/product/coreshield" element={<CoreShield />} />
              <Route path="/product/dataguard" element={<DataGuard />} />
              <Route path="/product/threatwatch" element={<ThreatWatch />} />
              <Route path="/product/secureapi" element={<SecureAPI />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      <Analytics />
    </ErrorBoundary>
  );
}

export default App;
