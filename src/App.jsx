import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Products from './pages/Products';
import Resources from './pages/Resources';
import Demo from './pages/Demo';

function App() {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
