import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Resources = () => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        fetchDocumentation();
    }, []);

    const fetchDocumentation = async () => {
        try {
            const response = await fetch(`${API_ENDPOINTS.documentation}?category=learning-center`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const data = await response.json();
            setDocs(data);
        } catch (error) {
            setFetchError(error.message);
            // Error handling - only log in development
            if (import.meta.env.DEV) {
                console.error('Error fetching documentation:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const additionalResources = [
        {
            icon: <BookOpen size={48} color="var(--primary)" />,
            title: 'Learning Center',
            desc: 'Educational content about privacy, security concepts, and industry best practices.',
            docs: docs.map(doc => ({ title: doc.title, href: doc.file_path })),
            buttonText: 'View Documentation'
        },
        {
            icon: <Code size={48} color="var(--secondary)" />,
            title: 'Technical Documentation',
            desc: 'Comprehensive technical documentation, API references, and integration guides.',
            comingSoon: true,
            buttonText: 'Coming Soon'
        }
    ];

    return (
        <div className="container section-padding">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                {/* Error Banner */}
                {fetchError && (
                    <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', color: 'var(--error)', marginBottom: '2rem' }}>
                        <strong>Error:</strong> {fetchError}
                    </div>
                )}
                {/* No Docs Placeholder */}
                {!loading && docs.length === 0 && !fetchError && (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>No documentation available at the moment.</p>
                )}
                <h1 className="text-h1" style={{ marginBottom: '1rem' }}>
                    Resource <span className="text-gradient">Library</span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                    Stay updated with the latest in privacy and security. Explore our comprehensive collection of educational resources and documentation.
                </p>
            </motion.div>

            {/* Resources Cards */}
            <div style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {additionalResources.map((item, index) => (
                        item.docs ? (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    padding: '2.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                                <h3 className="text-lg" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>{item.title}</h3>
                                <p className="text-body" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{item.desc}</p>
                                <div style={{ width: '100%', textAlign: 'left' }}>
                                    {item.docs.map((doc, docIndex) => (
                                        <a
                                            key={docIndex}
                                            href={doc.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'block',
                                                padding: '0.75rem 1rem',
                                                marginBottom: '0.5rem',
                                                background: 'var(--bg-dark)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '8px',
                                                color: 'var(--primary)',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = 'var(--primary-dim)';
                                                e.target.style.borderColor = 'var(--primary)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'var(--bg-dark)';
                                                e.target.style.borderColor = 'var(--border-color)';
                                            }}
                                        >
                                            📄 {doc.title}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        ) : item.comingSoon ? (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                style={{
                                    background: 'var(--bg-card)',
                                    padding: '2.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                                <h3 className="text-lg" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>{item.title}</h3>
                                <p className="text-body" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{item.desc}</p>
                                <Button variant="outline" style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }} disabled>{item.buttonText}</Button>
                            </motion.div>
                        ) : (
                            <Link to={item.link} key={index} style={{ textDecoration: 'none' }}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    style={{
                                        background: 'var(--bg-card)',
                                        padding: '2.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border-color)',
                                        textAlign: 'center',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                                    <h3 className="text-lg" style={{ marginBottom: '1rem', fontWeight: 'bold' }}>{item.title}</h3>
                                    <p className="text-body" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{item.desc}</p>
                                    <Button variant="outline" style={{ width: '100%' }}>{item.buttonText}</Button>
                                </motion.div>
                            </Link>
                        )
                    ))}
                </div>
            </div>

            {/* Newsletter Signup */}
            <div style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, var(--primary-dim) 0%, transparent 100%)',
                padding: '4rem 2rem',
                borderRadius: '16px',
                border: '1px solid var(--border-color)'
            }}>
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Stay Informed</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Subscribe to our newsletter for the latest security insights, product updates, and industry trends delivered to your inbox.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto', flexWrap: 'wrap' }}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                            flex: 1,
                            minWidth: '250px',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-main)',
                            fontSize: '1rem'
                        }}
                    />
                    <Button variant="primary">Subscribe</Button>
                </div>
            </div>
        </div>
    );
};

export default Resources;
