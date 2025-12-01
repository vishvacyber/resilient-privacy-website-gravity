import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Bell, Shield, Target, Zap, Eye, CheckCircle, TrendingUp, Clock, AlertTriangle, BarChart3 } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const ThreatWatch = () => {
    const features = [
        {
            icon: <Eye size={40} color="var(--primary)" />,
            title: '24/7 Threat Monitoring',
            description: 'Always-on infrastructure monitoring with intelligent alert prioritization. See what matters immediately while low-priority events are automatically triaged and documented.'
        },
        {
            icon: <Target size={40} color="var(--secondary)" />,
            title: 'Threat Intelligence',
            description: 'Real-time threat intelligence from global attack patterns combined with behavioral analysis. Know about emerging threats before they target your infrastructure.'
        },
        {
            icon: <Bell size={40} color="var(--primary)" />,
            title: 'Intelligent Alerting',
            description: 'Machine learning correlation reduces alert volume by 90% without missing real threats. Focus on actual security incidents instead of drowning in false positives.'
        },
        {
            icon: <Zap size={40} color="var(--secondary)" />,
            title: 'Automated Response',
            description: 'Pre-configured playbooks respond to common threats automatically within seconds. Contain attacks while your team investigates instead of scrambling to respond.'
        },
        {
            icon: <BarChart3 size={40} color="var(--primary)" />,
            title: 'Security Analytics',
            description: 'Advanced analytics dashboard providing deep insights into security posture, trends, and potential vulnerabilities.'
        },
        {
            icon: <Shield size={40} color="var(--secondary)" />,
            title: 'Threat Hunting',
            description: 'Proactive threat hunting capabilities to uncover hidden threats and advanced persistent threats (APTs) in your environment.'
        }
    ];

    const capabilities = [
        'Real-time security event correlation',
        'Behavioral anomaly detection',
        'Advanced persistent threat (APT) detection',
        'Automated incident investigation',
        'Forensic analysis and reporting',
        'Integration with 100+ security tools',
        'Custom detection rules and policies',
        'Compliance reporting and audit trails'
    ];

    const integrations = [
        { category: 'SIEM', tools: 'Splunk, ELK, QRadar' },
        { category: 'Ticketing', tools: 'Jira, ServiceNow, PagerDuty' },
        { category: 'Cloud', tools: 'AWS, Azure, GCP' },
        { category: 'Communication', tools: 'Slack, Teams, Email' }
    ];

    const stats = [
        { number: '< 2min', label: 'Mean Time to Detect' },
        { number: '90%', label: 'Alert Reduction' },
        { number: '24/7', label: 'Continuous Monitoring' }
    ];

    return (
        <div className="container section-padding">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="product-hero"
            >
                <h1 className="text-h1" style={{ marginBottom: '1.5rem' }}>
                    ThreatWatch<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>™</sup>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                    Cut through alert noise with intelligent threat correlation that reduces false positives by 90%. Our 24/7 monitoring detects real threats in under 2 minutes using contextual analysis, then automates response so your security team can focus on what matters.
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
                        Proactive Threat <span className="text-gradient">Detection</span>
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                        Stay ahead of threats with AI-powered monitoring and automated response capabilities.
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

            {/* Advanced Capabilities */}
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
                    Advanced Security Operations
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

            {/* Integrations */}
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
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <Zap size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        Seamless Integrations
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        Works with your existing security stack for unified threat management.
                    </p>
                </div>
                <div className="integration-grid">
                    {integrations.map((integration, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-dark)',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.75rem' }}>
                                {integration.category}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {integration.tools}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <Activity size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Ready to Elevate Your Security?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Transform your security operations with AI-powered threat detection and automated response.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Schedule Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Talk to Expert</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default ThreatWatch;
