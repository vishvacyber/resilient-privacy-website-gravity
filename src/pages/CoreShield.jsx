import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Globe, Server, CheckCircle, Award, ArrowRight, AlertTriangle, Activity, Code } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const CoreShield = () => {
    const features = [
        {
            icon: <Shield size={40} color="var(--primary)" />,
            title: 'Web Application Firewall (WAF)',
            description: 'Multi-layered defense against SQL injection, XSS, CSRF, and all OWASP Top 10 vulnerabilities. Automatically updates protection rules as new attack patterns emerge.'
        },
        {
            icon: <Lock size={40} color="var(--secondary)" />,
            title: 'API Security',
            description: 'Secure REST, GraphQL, SOAP, and gRPC endpoints with automatic schema validation. Detects anomalies in API behavior before they become security incidents.'
        },
        {
            icon: <Activity size={40} color="var(--primary)" />,
            title: 'DDoS Protection',
            description: 'Absorb volumetric, protocol, and application-layer DDoS attacks with intelligent traffic analysis. Keeps your services online during sustained attack campaigns.'
        },
        {
            icon: <AlertTriangle size={40} color="var(--secondary)" />,
            title: 'Zero-Day Defense',
            description: 'Virtual patching protects against newly discovered vulnerabilities while you prepare permanent fixes. Behavioral analysis catches exploits that signature-based tools miss.'
        },
        {
            icon: <Zap size={40} color="var(--primary)" />,
            title: 'Bot Mitigation',
            description: 'Advanced bot detection and management to prevent credential stuffing, account takeover, and automated attacks while allowing good bots.'
        },
        {
            icon: <Code size={40} color="var(--secondary)" />,
            title: 'Rate Limiting',
            description: 'Intelligent rate limiting and traffic shaping to prevent API abuse and ensure service availability for legitimate users.'
        }
    ];

    const capabilities = [
        'Real-time threat detection with ML-powered analysis',
        'Custom security rules and policies',
        'Geographic and IP-based access control',
        'SSL/TLS inspection and encryption',
        'Detailed security analytics and reporting',
        'Integration with SIEM and logging platforms'
    ];

    const stats = [
        { number: '99.99%', label: 'Uptime SLA' },
        { number: '<1ms', label: 'Average Latency' },
        { number: '100M+', label: 'Requests Protected Daily' }
    ];

    return (
        <div className="container section-padding">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="product-hero"
            >
                <div className="product-hero-badge" style={{
                    background: 'var(--primary-dim)',
                    color: 'var(--primary)'
                }}>
                    APPLICATION SECURITY PLATFORM
                </div>
                <h1 className="text-h1" style={{ marginBottom: '1.5rem' }}>
                    CoreShield<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>™</sup>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                    Deploy comprehensive application security in minutes without code changes or infrastructure overhauls. CoreShield automatically protects your web applications and APIs from OWASP Top 10 vulnerabilities, zero-day exploits, and DDoS attacks while your security team focuses on strategic initiatives.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Request Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Contact Sales</Button></Link>
                </div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '2.5rem',
                    marginBottom: '4rem'
                }}
            >
                <div className="stats-grid">
                    {stats.map((stat, i) => (
                        <div key={i}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                {stat.number}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Features Grid */}
            <div style={{ marginBottom: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Complete Application <span className="text-gradient">Protection</span>
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                        Multi-layered security architecture designed to protect against all application-layer threats.
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'var(--bg-card)',
                                padding: '2.5rem',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>{feature.icon}</div>
                            <h3 className="text-h3" style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{feature.title}</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Key Capabilities */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="capability-card"
                style={{
                    background: 'linear-gradient(135deg, var(--primary-dim) 0%, var(--bg-card) 100%)',
                    border: '1px solid var(--primary)'
                }}
            >
                <h2 className="text-h2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    Advanced Security Capabilities
                </h2>
                <div className="capability-grid">
                    {capabilities.map((capability, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                            <span className="text-body" style={{ color: 'var(--text-muted)' }}>{capability}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Deployment */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="capability-card"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center'
                }}
            >
                <Globe size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Deploy Anywhere</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2rem' }}>
                    Flexible deployment options to fit your infrastructure - cloud, on-premises, or hybrid.
                </p>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['AWS', 'Azure', 'GCP', 'On-Premises', 'Kubernetes', 'Edge'].map((env, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-dark)',
                            padding: '1rem 2rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            fontWeight: 'bold'
                        }}>
                            {env}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <Shield size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Ready to Secure Your Applications?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Join thousands of organizations protecting their applications with CoreShield.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Schedule Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Talk to Expert</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default CoreShield;
