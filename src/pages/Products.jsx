import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Search, Eye, Zap, Globe, CheckCircle, ArrowRight, Star, Users, Award, Layers } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const products = [
        {
            title: 'CoreShield™',
            subtitle: 'Application Security Platform',
            description: 'Deploy application security in minutes, not weeks. Protect web apps and APIs from OWASP Top 10, zero-day exploits, and DDoS attacks without code changes or infrastructure overhauls.',
            icon: <Shield size={48} color="var(--primary)" />,
            link: '/product/coreshield',
            features: ['Web Application Firewall', 'API Security', 'DDoS Protection', 'Zero-Day Defense'],
            gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)'
        },
        {
            title: 'DataGuard™',
            subtitle: 'Data Privacy & Compliance',
            description: 'Privacy-first data protection that discovers sensitive data across your infrastructure and automates compliance workflows. Make GDPR, CCPA, and HIPAA audits effortless with intelligent classification.',
            icon: <Lock size={48} color="var(--secondary)" />,
            link: '/product/dataguard',
            features: ['Data Discovery', 'Privacy Compliance', 'Data Encryption', 'Access Control'],
            gradient: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1) 0%, rgba(112, 0, 255, 0.05) 100%)'
        },
        {
            title: 'ThreatWatch™',
            subtitle: 'Security Monitoring & Response',
            description: 'Cut through alert noise with intelligent threat correlation. Our 24/7 monitoring reduces false positives by 90% while detecting real threats in under 2 minutes with automated contextual analysis.',
            icon: <Eye size={48} color="var(--primary)" />,
            link: '/product/threatwatch',
            features: ['24/7 Monitoring', 'Threat Intelligence', 'Automated Response', 'Security Analytics'],
            gradient: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)'
        },
        {
            title: 'SecureAPI™',
            subtitle: 'API Security & Management',
            description: 'Discover shadow APIs and secure modern architectures without slowing development. Developer-friendly protection for REST, GraphQL, and gRPC that integrates invisibly into your CI/CD pipeline.',
            icon: <Layers size={48} color="var(--secondary)" />,
            link: '/product/secureapi',
            features: ['API Discovery', 'Runtime Protection', 'Authentication', 'Rate Limiting'],
            gradient: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1) 0%, rgba(112, 0, 255, 0.05) 100%)'
        }
    ];

    const benefits = [
        { icon: <Star size={32} />, title: '99.99% Uptime', desc: 'Enterprise-grade reliability' },
        { icon: <Users size={32} />, title: '500+ Customers', desc: 'Trusted globally' },
        { icon: <Zap size={32} />, title: '15 Min Setup', desc: 'Quick deployment' }
    ];

    return (
        <div style={{ background: 'var(--bg-dark)' }}>
            <SEO
                title="API Security Products - CoreShield, DataGuard, ThreatWatch, SecureAPI"
                description="Comprehensive API security product suite including CoreShield WAF, DataGuard privacy compliance, ThreatWatch monitoring, and SecureAPI management. Enterprise-grade protection for modern applications."
                keywords="API Security Products, Web Application Firewall, API Protection, Data Privacy, Security Monitoring, API Management, WAAP, CoreShield, DataGuard, ThreatWatch, SecureAPI"
                canonical="https://www.resilientprivacy.com/products"
            />
            {/* Hero Section */}
            <section style={{
                background: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
                paddingTop: '6rem',
                paddingBottom: '6rem'
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '800',
                            marginBottom: '1.5rem',
                            lineHeight: '1.1',
                            letterSpacing: '-0.02em'
                        }}>
                            Protect Your Digital Infrastructure with <span className="text-gradient">Resilient Privacy</span>
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-muted)',
                            marginBottom: '3rem',
                            lineHeight: '1.7',
                            maxWidth: '700px',
                            margin: '0 auto 3rem'
                        }}>
                            Industry-leading privacy and security platform trusted by enterprises worldwide to protect APIs, applications, and AI workloads.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/demo">
                                <Button variant="primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                    Get Started <ArrowRight size={20} />
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                    Talk to Sales
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section style={{
                background: 'var(--bg-card)',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                padding: '2rem 0'
            }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        textAlign: 'center'
                    }}>
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{benefit.icon}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>{benefit.title}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{benefit.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Showcase */}
            <section className="section-padding">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: '1rem' }}>
                            Our <span className="text-gradient">Product Suite</span>
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                            Choose the perfect solution for your security needs, or combine them for complete protection.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {products.map((product, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                style={{
                                    background: product.gradient,
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '20px',
                                    padding: '3rem 2rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate(product.link)}
                            >
                                {/* Background decoration */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    right: '-20%',
                                    width: '200px',
                                    height: '200px',
                                    background: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                                    opacity: 0.05,
                                    borderRadius: '50%',
                                    filter: 'blur(40px)'
                                }} />

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ marginBottom: '1.5rem' }}>{product.icon}</div>

                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        marginBottom: '0.5rem',
                                        color: 'var(--text-main)'
                                    }}>
                                        {product.title}
                                    </h3>

                                    <p style={{
                                        color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        marginBottom: '1rem'
                                    }}>
                                        {product.subtitle}
                                    </p>

                                    <p style={{
                                        color: 'var(--text-muted)',
                                        lineHeight: '1.7',
                                        marginBottom: '2rem',
                                        fontSize: '0.95rem'
                                    }}>
                                        {product.description}
                                    </p>

                                    <div style={{ marginBottom: '2rem' }}>
                                        {product.features.map((feature, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                marginBottom: '0.75rem'
                                            }}>
                                                <CheckCircle size={16} color={i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'} />
                                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link to={product.link} style={{ textDecoration: 'none' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                                            fontWeight: '600',
                                            fontSize: '0.95rem',
                                            transition: 'gap 0.3s ease'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.gap = '1rem'}
                                            onMouseLeave={(e) => e.currentTarget.style.gap = '0.5rem'}
                                        >
                                            Explore Product <ArrowRight size={18} />
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ background: 'var(--bg-card)', padding: '6rem 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ maxWidth: '1000px', margin: '0 auto' }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: '1rem' }}>
                                Why Choose <span className="text-gradient">Resilient Privacy</span>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                                The platform that enterprises trust for complete privacy and security protection.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem' }}>
                            {[
                                { icon: <Zap />, title: 'Deploy in Minutes', desc: 'Get up and running in under 15 minutes with zero infrastructure changes required.' },
                                { icon: <Shield />, title: 'AI-Powered Protection', desc: '99.99% accuracy with near-zero false positives using neural detection algorithms.' },
                                { icon: <Globe />, title: 'Global Coverage', desc: 'Protect workloads across 250+ edge locations worldwide with low-latency response.' },
                                { icon: <Eye />, title: 'Complete Visibility', desc: 'Real-time dashboards and analytics for comprehensive security insights.' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{ textAlign: 'center' }}
                                >
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        background: 'var(--primary-dim)',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                        color: 'var(--primary)'
                                    }}>
                                        {React.cloneElement(item.icon, { size: 32 })}
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section-padding">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'var(--bg-card)',
                            borderRadius: '24px',
                            border: '1px solid var(--border-color)',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                                Ready to Secure Your Infrastructure?
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
                                Join hundreds of enterprises protecting their critical assets with Resilient Privacy. Start with a free demo today.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link to="/demo">
                                    <Button variant="primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                        Schedule Demo
                                    </Button>
                                </Link>
                                <Link to="/contact">
                                    <Button variant="outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                        Contact Sales
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Products;
