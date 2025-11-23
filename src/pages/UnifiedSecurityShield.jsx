import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Globe, Server, Cloud, Activity, CheckCircle, Award, Layers } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const UnifiedSecurityShield = () => {
    const protectionFeatures = [
        {
            icon: <Shield size={32} color="var(--primary)" />,
            title: 'OWASP Top-10',
            description: 'Protect against well-known OWASP Top-10 web application security risks and other advanced threats.'
        },
        {
            icon: <Lock size={32} color="var(--secondary)" />,
            title: 'Privacy & API Protection',
            description: 'Defend your APIs and privacy endpoints in seconds without relying on tedious manual configurations.'
        },
        {
            icon: <Activity size={32} color="var(--primary)" />,
            title: 'Credential Stuffing & Brute Force',
            description: 'Stop behavior-based attacks by inspecting and correlating sequences of requests.'
        },
        {
            icon: <Zap size={32} color="var(--secondary)" />,
            title: 'Virtual Patching',
            description: 'Drastically reduce 0-day risks by applying virtual patches to critical issues on the fly.'
        },
        {
            icon: <Globe size={32} color="var(--primary)" />,
            title: 'Block Disallowed Geographies',
            description: 'Serve only trusted regions. Block unwanted geographies to meet compliance requirements.'
        },
        {
            icon: <Layers size={32} color="var(--secondary)" />,
            title: 'Distributed Rate Limiting',
            description: 'Define thresholds and prevent automated tools (such as bots and L7 DDoS) from overwhelming your workloads.'
        }
    ];

    const advantages = [
        {
            title: 'Robust Protection',
            description: 'Resilient Privacy elegantly deploys in any environment to protect thousands of exposed and internal workloads across every environment.'
        },
        {
            title: 'Stop Advanced Threats',
            description: 'Get protection beyond OWASP Top-10 for full coverage against emerging threats: account takeover (ATO), malicious bots, L7 DDoS, and exploitation of 0-day vulnerabilities.'
        },
        {
            title: 'Eliminate False Positives',
            description: 'Scale protection without the burden of traditional solutions. Resilient Privacy provides near-zero false positives — 88% of customers use blocking mode.'
        },
        {
            title: 'Enhanced Incident Response',
            description: 'Leverage your existing DevOps and security tools with a variety of native integrations.'
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
                <h1 className="text-h1" style={{ marginBottom: '1.5rem' }}>
                    Unified Security <span className="text-gradient">Shield</span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                    Get protection beyond OWASP Top 10 for full coverage against emerging threats: account takeover (ATO), malicious bots, L7 DDoS, and exploitation of 0-day vulnerabilities.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Watch Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Contact Sales</Button></Link>
                </div>
            </motion.div>

            {/* Comprehensive Protection */}
            <div style={{ marginBottom: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Comprehensive Protection for <span className="text-gradient">Apps and APIs</span>
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {protectionFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            style={{
                                background: 'var(--bg-card)',
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <div style={{ marginBottom: '1rem' }}>{feature.icon}</div>
                            <h3 className="text-lg" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{feature.title}</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Better Than Traditional Solutions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'linear-gradient(135deg, var(--primary-dim) 0%, var(--bg-card) 100%)',
                    padding: '4rem 3rem',
                    borderRadius: '20px',
                    border: '1px solid var(--primary)',
                    marginBottom: '5rem'
                }}
            >
                <h2 className="text-h2" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    Better Than Any Traditional Solution
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {advantages.map((advantage, i) => (
                        <div key={i}>
                            <h3 className="text-lg" style={{ marginBottom: '0.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                {advantage.title}
                            </h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                {advantage.description}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Hybrid Architecture Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '5rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Improve Security. Maintain <span className="text-gradient">Privacy & Performance</span>
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto' }}>
                        At the foundation of the Resilient Privacy design ethos is privacy, flexibility, and performance. Our hybrid SaaS solution deploys server-side software in your infrastructure within minutes, while our powerful cloud-hosted analytics backend ensures you stay ahead of threats.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                    {[
                        {
                            icon: <CheckCircle size={40} color="var(--primary)" />,
                            title: 'Privacy First',
                            desc: 'Regularly monitor and review new API and web application threats & vulnerabilities 24/7. Quick updates to threat detection & mitigation systems keep you staying ahead of attacks.'
                        },
                        {
                            icon: <Zap size={40} color="var(--secondary)" />,
                            title: 'Flexibility',
                            desc: 'Continuously leverage on-going data collection & analysis for improvements in detection capabilities. Equipped with the best possible protection that evolves with threats.'
                        },
                        {
                            icon: <Activity size={40} color="var(--primary)" />,
                            title: 'Performance',
                            desc: 'Set data-defensible remediation policies that engineers and executives will support. Minimal latency impact with maximum security coverage across all workloads.'
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                background: 'var(--bg-card)',
                                padding: '2.5rem',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>{item.icon}</div>
                            <h3 className="text-h3" style={{ marginBottom: '1rem' }}>{item.title}</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1) 0%, var(--bg-card) 100%)',
                    padding: '4rem 3rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '4rem'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <Award size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Trusted by Enterprises Worldwide
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'center' }}>
                    {[
                        { title: '88% Accuracy', desc: 'Customers use Resilient Privacy in full blocking mode and trust its accuracy' },
                        { title: '15 Minutes', desc: 'Cloud-native, multi-cloud, edge or on-prem - DevOps teams have protection up and running fast' },
                        { title: 'Industry Leader', desc: 'Trusted by customers to protect over 50,000 applications worldwide' }
                    ].map((metric, i) => (
                        <div key={i}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                                {metric.title}
                            </div>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                {metric.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Deployment Options */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'var(--bg-card)',
                    padding: '3rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '4rem'
                }}
            >
                <h2 className="text-h3" style={{ marginBottom: '2rem', textAlign: 'center' }}>Deploy Anywhere</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { icon: <Server size={40} />, label: 'On-Premises' },
                        { icon: <Cloud size={40} />, label: 'Multi-Cloud' },
                        { icon: <Activity size={40} />, label: 'Hybrid' },
                        { icon: <Globe size={40} />, label: 'Edge' }
                    ].map((option, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: '1.5rem' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>{option.icon}</div>
                            <div style={{ fontWeight: 'bold' }}>{option.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <Shield size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Ready to Deploy Unified Security?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Experience comprehensive protection that deploys in minutes and scales with your business.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Get Started</Button></Link>
                    <Link to="/contact"><Button variant="outline">Talk to Expert</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default UnifiedSecurityShield;
