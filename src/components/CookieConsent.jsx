import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Cookie } from 'lucide-react';
import SECURITY_CONFIG from '../../security.config';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const CONSENT_VERSION = '1.0'; // Update this when cookie policy changes

    useEffect(() => {
        const consent = localStorage.getItem(SECURITY_CONFIG.cookies.consentCookieName);
        const consentVersion = localStorage.getItem('cookieConsentVersion');

        // Show banner if no consent or version mismatch
        if (!consent || consentVersion !== CONSENT_VERSION) {
            // Small delay to not overwhelm user immediately
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const setCookieConsent = (value) => {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + SECURITY_CONFIG.cookies.consentCookieExpiry);

        // Store consent value
        localStorage.setItem(SECURITY_CONFIG.cookies.consentCookieName, value);
        localStorage.setItem('cookieConsentVersion', CONSENT_VERSION);
        localStorage.setItem('cookieConsentExpiry', expiryDate.toISOString());

        // In production with a backend, you would set an actual HTTP cookie with:
        // - Secure flag (HTTPS only)
        // - SameSite=Strict
        // - HttpOnly (if possible for your use case)
        // Example: document.cookie = `consent=${value}; expires=${expiryDate.toUTCString()}; Secure; SameSite=Strict`;
    };

    const handleAccept = () => {
        setCookieConsent('true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        setCookieConsent('false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '2rem',
                        right: '2rem',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        zIndex: 2000,
                        background: 'rgba(18, 18, 18, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--primary)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <div className="flex-between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--primary-dim)', padding: '0.8rem', borderRadius: '50%' }}>
                                <Cookie size={24} color="var(--primary)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>We value your privacy</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', marginBottom: '0.5rem' }}>
                                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                    By clicking "Accept", you consent to our use of cookies.
                                </p>
                                <Link
                                    to="/privacy-policy"
                                    style={{
                                        color: 'var(--primary)',
                                        fontSize: '0.875rem',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Read our Privacy Policy
                                </Link>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Button variant="outline" onClick={handleDecline} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                Decline
                            </Button>
                            <Button variant="primary" onClick={handleAccept} style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                Accept
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;

