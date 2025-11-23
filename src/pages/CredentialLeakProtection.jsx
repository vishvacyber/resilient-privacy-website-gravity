import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, AlertCircle, Key, Search, Ban, Activity, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const CredentialLeakProtection = () => {
    const processSteps = [
        {
            icon: <Search size={48} color="var(--primary)" />,
            title: 'Detect',
            description: 'Resilient Privacy automatically scans dozens of public sources for leaked credentials, which hackers can find and abuse in less than 1 minute.'
        },
        {
            icon: <Ban size={48} color="var(--secondary)" />,
            title: 'Remediate',
            description: 'Resilient Privacy immediately blocks requests using compromised credentials across the entire infrastructure, regardless of protocol.'
        },
        {
            icon: <Shield size={48} color="var(--primary)" />,
            title: 'Protect',
            description: 'Resilient Privacy continuously tracks and blocks any subsequent use of leaked credentials, preventing unauthorized access.'
        }
    ];

    const reasons = [
        'Engineering teams are on ever-tightening schedules, which means shipping faster with less QA coverage.',
        'Tech stacks are getting more complicated – securing both legacy and modern systems, supporting more authentication methods, and covering more environments – which leads to mistakes and accidental leakage.',
        'Software supply chains are getting longer and more complicated, which means these leaks can occur anywhere – by your in-house teams, by your partners, by the open-source code being used, or even by your customers.'
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
                    Credential Leak <span className="text-gradient">Protection</span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                    Resilient Privacy Credential Leak Protection provides comprehensive protection against hacks involving API Keys, credentials, and other sensitive secrets.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/contact"><Button variant="primary">Get Free Assessment</Button></Link>
                    <Link to="/demo"><Button variant="outline">View Demo</Button></Link>
                </div>
            </motion.div>

            {/* Free Assessment Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'linear-gradient(135deg, var(--primary-dim) 0%, var(--bg-card) 100%)',
                    padding: '3rem',
                    borderRadius: '16px',
                    border: '1px solid var(--primary)',
                    marginBottom: '4rem'
                }}
            >
                <h2 className="text-h2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                    Complimentary Credential Leak Assessment
                </h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem', textAlign: 'center' }}>
                    Get a thorough understanding of your risk exposure due to leaked credentials, API keys, and other secrets.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {[
                        { title: 'Register', desc: 'Fill out our assessment form. One of our security specialists will review your request and confirm your information.' },
                        { title: 'Scan', desc: 'We will scout 20+ sources for any leaked credentials and secrets – with no impact on your systems themselves.' },
                        { title: 'Review', desc: 'We deliver your comprehensive report on your risk exposure within 72 hours of confirmation.' }
                    ].map((step, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                margin: '0 auto 1rem'
                            }}>
                                {i + 1}
                            </div>
                            <h3 className="text-lg" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{step.title}</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Problem Statement */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '4rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <AlertCircle size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Do You Need Credential Leak Protection?
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        Credential leak incidents are getting worse! In recent months, the industry has seen a surge in attacks involving leaked API keys, credentials, and other sensitive secrets.
                    </p>
                </div>

                <div style={{
                    background: 'var(--bg-card)',
                    padding: '3rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '2rem'
                }}>
                    <h3 className="text-h3" style={{ marginBottom: '2rem', color: 'var(--text-main)' }}>
                        Why Are Credential Leaks Accelerating?
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {reasons.map((reason, i) => (
                            <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <CheckCircle size={24} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                <span className="text-body" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>{reason}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* Solution Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '4rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Guard Against Leaks of Your <span className="text-gradient">Credentials & Secrets</span>
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        The Resilient Privacy Credential Leak Protection solution provides proactive runtime leak management capabilities delivering continuous automated detection, remediation, and protection.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {processSteps.map((step, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'var(--bg-card)',
                                padding: '2.5rem',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>{step.icon}</div>
                            <h3 className="text-h3" style={{ marginBottom: '1rem' }}>{step.title}</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <Lock size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Ready to Protect Your Credentials?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Get started with a free credential leak assessment and discover your exposure.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/contact"><Button variant="primary">Start Free Assessment</Button></Link>
                    <Link to="/demo"><Button variant="outline">Schedule Demo</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default CredentialLeakProtection;
