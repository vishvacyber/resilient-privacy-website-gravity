import React from 'react';
import { motion } from 'framer-motion';
import { Database, Lock, Eye, FileCheck, Shield, CheckCircle, Award, Search, Key, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const DataGuard = () => {
    const features = [
        {
            icon: <Search size={40} color="var(--primary)" />,
            title: 'Data Discovery',
            description: 'Scan databases, file systems, and cloud storage to find sensitive data automatically. Maps your data landscape in hours, not months.'
        },
        {
            icon: <Shield size={40} color="var(--secondary)" />,
            title: 'Privacy Compliance',
            description: 'Continuous compliance monitoring with automated policy enforcement and audit trails. Submit compliance reports with one click instead of weeks of preparation.'
        },
        {
            icon: <Lock size={40} color="var(--primary)" />,
            title: 'Data Encryption',
            description: 'Protect data at rest and in transit with transparent encryption. Automated key management and rotation ensure your encryption stays strong without manual overhead.'
        },
        {
            icon: <Eye size={40} color="var(--secondary)" />,
            title: 'Data Masking',
            description: 'Protect sensitive data in development and testing environments. Dynamic masking ensures third-party vendors never see real customer data.'
        },
        {
            icon: <FileCheck size={40} color="var(--primary)" />,
            title: 'Access Control',
            description: 'Granular access controls with role-based permissions, attribute-based policies, and real-time access monitoring.'
        },
        {
            icon: <AlertCircle size={40} color="var(--secondary)" />,
            title: 'Breach Prevention',
            description: 'Proactive threat detection and prevention with real-time alerts for unauthorized access attempts and data exfiltration.'
        }
    ];

    const complianceFrameworks = [
        {
            name: 'GDPR',
            description: 'General Data Protection Regulation - EU privacy law'
        },
        {
            name: 'CCPA',
            description: 'California Consumer Privacy Act'
        },
        {
            name: 'HIPAA',
            description: 'Health Insurance Portability and Accountability Act'
        },
        {
            name: 'SOC 2',
            description: 'Service Organization Control 2'
        },
        {
            name: 'PCI DSS',
            description: 'Payment Card Industry Data Security Standard'
        },
        {
            name: 'ISO 27001',
            description: 'Information Security Management'
        }
    ];

    const dataTypes = [
        'Personally Identifiable Information (PII)',
        'Protected Health Information (PHI)',
        'Payment Card Data (PCI)',
        'Social Security Numbers',
        'Credit Card Information',
        'Biometric Data',
        'Financial Records',
        'Trade Secrets and IP'
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
                    background: 'rgba(112, 0, 255, 0.1)',
                    color: 'var(--secondary)'
                }}>
                    DATA PRIVACY & COMPLIANCE
                </div>
                <h1 className="text-h1" style={{ marginBottom: '1.5rem' }}>
                    DataGuard<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>™</sup>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                    Privacy-first data protection that finds sensitive data wherever it exists across your infrastructure. Automate compliance workflows, classify data intelligently, and make GDPR, CCPA, and HIPAA audits effortless with continuous monitoring and real-time access controls.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Request Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Contact Sales</Button></Link>
                </div>
            </motion.div>

            {/* Features Grid */}
            <div style={{ marginBottom: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Complete Data <span className="text-gradient">Protection</span>
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                        End-to-end data security from discovery to protection, ensuring privacy compliance at every step.
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

            {/* Compliance Frameworks */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="capability-card"
                style={{
                    background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1) 0%, var(--bg-card) 100%)',
                    border: '1px solid var(--secondary)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <Award size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Compliance Made Simple
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        Automated compliance with major privacy regulations and industry standards.
                    </p>
                </div>
                <div className="integration-grid">
                    {complianceFrameworks.map((framework, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-card)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                                {framework.name}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {framework.description}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Protected Data Types */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="capability-card"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)'
                }}
            >
                <h2 className="text-h2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    Sensitive Data Protection
                </h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                    Automatically identify and protect all types of sensitive data across your organization.
                </p>
                <div className="capability-grid">
                    {dataTypes.map((dataType, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <CheckCircle size={20} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                            <span className="text-body" style={{ color: 'var(--text-muted)' }}>{dataType}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <Database size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Ready to Protect Your Data?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Ensure compliance and protect sensitive data with DataGuard's comprehensive privacy platform.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Schedule Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Talk to Expert</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default DataGuard;
