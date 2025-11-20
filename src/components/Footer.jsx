import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Mail, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const companyLinks = [
        { to: '/about', label: 'About Us' },
        { to: '/services', label: 'Services' },
        { to: '/contact', label: 'Contact' }
    ];

    const legalLinks = [
        { to: '/privacy-policy', label: 'Privacy Policy' },
        { to: '/terms-of-service', label: 'Terms of Service' }
    ];

    const socialLinks = [
        {
            href: 'https://www.linkedin.com/company/resilientprivacy',
            icon: Linkedin,
            label: 'LinkedIn'
        },
        {
            href: 'https://www.instagram.com/resilientprivacy/',
            icon: Instagram,
            label: 'Instagram'
        }
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img
                                src="/company_logo.jpg"
                                alt="Resilient Privacy Logo"
                                className="footer-logo-img"
                            />
                            <span className="footer-logo-text">
                                Resilient <span className="footer-logo-highlight">Privacy</span>
                            </span>
                        </div>
                        <p className="footer-description">
                            A feature release engine company securing the digital frontier with advanced API protection and a privacy-first approach.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                            <a href="mailto:info@resilientprivacy.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                                <Mail size={16} color="var(--primary)" />
                                <span style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'inherit'}>info@resilientprivacy.com</span>
                            </a>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                                <MapPin size={16} color="var(--primary)" />
                                <span>Wilmington, Delaware</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="footer-links">
                        <div className="footer-links-column">
                            <h4 className="footer-links-title">Company</h4>
                            <ul className="footer-links-list">
                                {companyLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to} className="footer-link">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer-links-column">
                            <h4 className="footer-links-title">Legal</h4>
                            <ul className="footer-links-list">
                                {legalLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link to={link.to} className="footer-link">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} Resilient Privacy Inc. All rights reserved.
                    </p>
                    <div className="footer-social">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-social-link"
                                    aria-label={social.label}
                                >
                                    <Icon size={20} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
