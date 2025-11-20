import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setCompanyDropdownOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'Company',
            path: '#',
            dropdown: [
                { name: 'About Us', path: '/company/about' },
                { name: 'Careers', path: '/company/careers' },
            ]
        },
        { name: 'Products', path: '/products' },
        { name: 'Services', path: '/services' },
        { name: 'Resources', path: '/resources' },
    ];

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                transition: 'all 0.3s ease',
                height: 'var(--header-height)',
            }}
        >
            <div className="container flex-between" style={{ height: '100%' }}>
                <Link to="/" className="flex-center" style={{ gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                    <img src="/company_logo.jpg" alt="Resilient Privacy Logo" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                    <span>Resilient <span style={{ color: 'var(--primary)' }}>Privacy</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'none' }}>
                    <ul className="flex-center" style={{ gap: '2rem' }}>
                        {navLinks.map((link) => (
                            <li key={link.name} style={{ position: 'relative' }}
                                onMouseEnter={() => link.dropdown && setCompanyDropdownOpen(true)}
                                onMouseLeave={() => link.dropdown && setCompanyDropdownOpen(false)}
                            >
                                {link.dropdown ? (
                                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
                                        {link.name} <ChevronDown size={16} />
                                    </div>
                                ) : (
                                    <Link
                                        to={link.path}
                                        style={{
                                            color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-muted)',
                                            fontWeight: location.pathname === link.path ? '600' : '400',
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                )}

                                {/* Dropdown */}
                                {link.dropdown && (
                                    <AnimatePresence>
                                        {companyDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: '-1rem',
                                                    background: 'var(--bg-card)',
                                                    border: '1px solid var(--border-color)',
                                                    borderRadius: '8px',
                                                    padding: '1rem',
                                                    minWidth: '200px',
                                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.5rem',
                                                }}
                                            >
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        style={{
                                                            color: 'var(--text-muted)',
                                                            padding: '0.5rem',
                                                            borderRadius: '4px',
                                                            transition: 'background 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.background = 'rgba(255,255,255,0.05)';
                                                            e.target.style.color = 'var(--primary)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.background = 'transparent';
                                                            e.target.style.color = 'var(--text-muted)';
                                                        }}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </li>
                        ))}
                        <li>
                            <Link to="/demo">
                                <Button variant="primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    Get Demo
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ color: 'var(--text-main)' }}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'var(--header-height)',
                        left: 0,
                        right: 0,
                        background: 'var(--bg-dark)',
                        padding: '2rem',
                        borderBottom: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        alignItems: 'center',
                        height: 'calc(100vh - var(--header-height))',
                        overflowY: 'auto',
                    }}
                >
                    {navLinks.map((link) => (
                        <div key={link.name} style={{ width: '100%', textAlign: 'center' }}>
                            {link.dropdown ? (
                                <>
                                    <div style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 'bold' }}>{link.name}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                                        {link.dropdown.map((item) => (
                                            <Link key={item.name} to={item.path} style={{ color: 'var(--text-muted)' }}>
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to={link.path}
                                    style={{
                                        fontSize: '1.2rem',
                                        color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                                    }}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    <Link to="/demo" style={{ width: '100%' }}>
                        <Button variant="primary" style={{ width: '100%' }}>Get Demo</Button>
                    </Link>
                </div>
            )}

            <style>{`
        @media (min-width: 768px) {
          .desktop-menu { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
