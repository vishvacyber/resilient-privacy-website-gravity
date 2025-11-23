import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, Eye, AlertTriangle, MapPin, Globe, Database, FileCheck, CheckCircle, Award } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const PrivacyAttackSurfaceManagement = () => {
    const features = [
        {
            icon: <Globe size={40} color="var(--primary)" />,
            title: 'External Privacy Endpoint Discovery',
            items: [
                'Discover all external hosts and their privacy endpoints (including hosting information e.g. CDN, IaaS, or PaaS providers)',
                'Identify geolocation and data centers',
                'Gain insights into the specific data protocols in use (JSON-API, GraphQL, XML-RPC, gRPC, REST, and more)',
                'Uncover publicly available sensitive data specifications'
            ]
        },
        {
            icon: <Shield size={40} color="var(--secondary)" />,
            title: 'Identify and Mitigate Credential Leaks',
            items: [
                'Scan public repositories (GitHub, GitLab, etc.) to identify any leaked credentials, including API Keys, PII, authorization tokens (Bearer/JWT), and more',
                'Get automated recommendations and adjust your remediation strategy',
                'Respond by revoking leaked information and keys or applying a virtual patch',
                'Monitor dark web and paste sites for credential exposure'
            ]
        },
        {
            icon: <AlertTriangle size={40} color="var(--primary)" />,
            title: 'Continuous Vulnerability Detection',
            items: [
                'Discover privacy and security vulnerabilities',
                'Test your endpoints for thousands of the most popular web and API-related CVEs',
                'Identify SSL/TLS misconfigurations, database management interface exposure, and much more',
                'Automated priority scoring based on exploitability and business impact'
            ]
        },
        {
            icon: <Eye size={40} color="var(--secondary)" />,
            title: 'Security Coverage Discovery & Testing',
            items: [
                'Discover if privacy endpoints are protected by security solutions',
                'Test types of threats current protections can detect',
                'Get the security score for each discovered endpoint',
                'Identify coverage gaps and shadow endpoints'
            ]
        }
    ];

    const stats = [
        { number: '#1', label: 'In customer reviews' },
        { number: '200K+', label: 'Endpoints protected' },
        { number: 'Billions', label: 'Requests protected, daily' }
    ];

    return (
        <div className="container section-padding">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 className="text-h1" style={{ marginBottom: '1.5rem' }}>
                    Privacy Attack Surface <span className="text-gradient">Management</span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                    Privacy Attack Surface Management (PASM) is an agentless detection solution tailored to the privacy ecosystem, designed to discover external hosts with their privacy endpoints, identify missing security solutions, discover vulnerabilities, and mitigate credential leaks.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Request Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Contact Sales</Button></Link>
                </div>
            </motion.div>

            {/* Features Section */}
            <div style={{ marginBottom: '6rem' }}>
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: 'var(--bg-card)',
                            padding: '3rem',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            marginBottom: '2rem'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{
                                background: index % 2 === 0 ? 'var(--primary-dim)' : 'rgba(112, 0, 255, 0.1)',
                                padding: '1rem',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {feature.icon}
                            </div>
                            <h2 className="text-h3">{feature.title}</h2>
                        </div>
                        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                            {feature.items.map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                    <span className="text-body" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            {/* Trust Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'linear-gradient(135deg, var(--primary-dim) 0%, var(--bg-card) 100%)',
                    padding: '4rem 2rem',
                    borderRadius: '20px',
                    border: '1px solid var(--primary)',
                    marginBottom: '4rem'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <Award size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        The Preferred Choice for Security Teams
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        Security and DevOps teams seeking unparalleled visibility, comprehensive privacy protection, and automated incident response trust Resilient Privacy.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                {stat.number}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Ready to Uncover Your Privacy Risks?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Get complete visibility into your privacy attack surface and start protecting your most sensitive data.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Schedule Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Talk to Expert</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default PrivacyAttackSurfaceManagement;
