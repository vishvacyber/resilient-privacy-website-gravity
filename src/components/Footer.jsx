import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem' }}>
            <div className="container">
                <div className="grid-cols-2" style={{ gap: '4rem', marginBottom: '4rem' }}>
                    <div>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                            <img src="/company_logo.jpg" alt="Resilient Privacy Logo" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                            <span>Resilient <span style={{ color: 'var(--primary)' }}>Privacy</span></span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
                            Securing the digital frontier with advanced API protection and privacy-first architecture.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                        <div>
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Company</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li><Link to="/about" style={{ color: 'var(--text-muted)' }}>About Us</Link></li>
                                <li><Link to="/services" style={{ color: 'var(--text-muted)' }}>Services</Link></li>
                                <li><Link to="/contact" style={{ color: 'var(--text-muted)' }}>Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Legal</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li><Link to="/" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link></li>
                                <li><Link to="/" style={{ color: 'var(--text-muted)' }}>Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex-between" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        © {new Date().getFullYear()} Resilient Privacy Inc. All rights reserved.
                    </p>
                    <div className="flex-center" style={{ gap: '1.5rem' }}>
                        <a href="#" style={{ color: 'var(--text-muted)' }}><Twitter size={20} /></a>
                        <a href="#" style={{ color: 'var(--text-muted)' }}><Linkedin size={20} /></a>
                        <a href="#" style={{ color: 'var(--text-muted)' }}><Github size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
