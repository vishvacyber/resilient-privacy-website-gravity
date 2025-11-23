import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Activity, FileCheck, Eye, Lock, Zap, CheckCircle, Code, Cloud } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const CompletePlatform = () => {
    const pillars = [
        {
            icon: <Search size={48} color="var(--primary)" />,
            title: 'Discover',
            tagline: 'Inventory all your privacy endpoints and AI systems automatically',
            capabilities: [
                'Map and track changes in exposed endpoints and services',
                'Reconstruct infrastructure topology from traffic',
                'Identify sensitive data usage',
                'Discover shadow APIs and undocumented endpoints'
            ],
            link: '#discover'
        },
        {
            icon: <Shield size={48} color="var(--secondary)" />,
            title: 'Protect',
            tagline: 'Secure against OWASP Top 10 and emerging threats',
            capabilities: [
                'Mitigate threats against AI and privacy systems',
                'Block bots and L7 DDoS attacks',
                'Upload and enforce specifications to detect non-compliant requests',
                'Virtual patching for 0-day vulnerabilities'
            ],
            link: '#protect'
        },
        {
            icon: <Activity size={48} color="var(--primary)" />,
            title: 'Respond',
            tagline: 'Monitor threats with complete observability',
            capabilities: [
                'Drill down into malicious requests',
                'Receive alerts on only the incidents that matter',
                'Quantify protected revenue and assets',
                'Automated incident response workflows'
            ],
            link: '#respond'
        },
        {
            icon: <FileCheck size={48} color="var(--secondary)" />,
            title: 'Test',
            tagline: 'Automate security testing in CI/CD',
            capabilities: [
                'Discover misconfiguration issues',
                'Conduct continuous assessments from the cloud',
                'Integration with existing test frameworks',
                'Dev-friendly issue descriptions and remediation guidance'
            ],
            link: '#test'
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
                    Complete Privacy & Security <span className="text-gradient">Platform</span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                    Purpose-built to discover, protect, and test APIs, applications, and AI systems - wherever they are running. An end-to-end approach for privacy and security.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Watch Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Contact Sales</Button></Link>
                </div>
            </motion.div>

            {/* Four Pillars Overview */}
            <div style={{ marginBottom: '5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
                        End-to-End Approach for <span className="text-gradient">Privacy & Security</span>
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8, boxShadow: '0 8px 30px rgba(124, 58, 237, 0.2)' }}
                            style={{
                                background: i % 2 === 0 ? 'linear-gradient(135deg, var(--primary-dim) 0%, var(--bg-card) 100%)' : 'linear-gradient(135deg, rgba(112, 0, 255, 0.1) 0%, var(--bg-card) 100%)',
                                padding: '2.5rem',
                                borderRadius: '16px',
                                border: `1px solid ${i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>{pillar.icon}</div>
                            <h3 className="text-h3" style={{ marginBottom: '0.75rem' }}>{pillar.title}</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                {pillar.tagline}
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {pillar.capabilities.map((cap, idx) => (
                                    <li key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                        <CheckCircle size={16} color={i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                        <span className="text-body" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>{cap}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Discover Section */}
            <motion.div
                id="discover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'var(--bg-card)',
                    padding: '4rem 3rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '3rem'
                }}
            >
                <div className="grid-cols-2" style={{ gap: '3rem', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--primary-dim)', color: 'var(--primary)', borderRadius: '20px', marginBottom: '1rem', fontWeight: 'bold' }}>
                            Discover
                        </div>
                        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Know Your Privacy Portfolio</h2>
                        <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                            Gain visibility across your entire infrastructure to regain control over your attack surface and reduce associated risks.
                        </p>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                'Discover all your endpoints and services automatically',
                                'Leverage OpenAPI specs created from actual traffic',
                                'Monitor sensitive data usage for compliance',
                                'Track changes and new deployments in real-time'
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                    <span className="text-body" style={{ color: 'var(--text-muted)' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary-dim) 0%, transparent 100%)',
                        padding: '3rem',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '300px'
                    }}>
                        <Eye size={120} color="var(--primary)" style={{ opacity: 0.3 }} />
                    </div>
                </div>
            </motion.div>

            {/* Protect Section */}
            <motion.div
                id="protect"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'var(--bg-card)',
                    padding: '4rem 3rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '3rem'
                }}
            >
                <div className="grid-cols-2" style={{ gap: '3rem', alignItems: 'center' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1) 0%, transparent 100%)',
                        padding: '3rem',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '300px'
                    }}>
                        <Lock size={120} color="var(--secondary)" style={{ opacity: 0.3 }} />
                    </div>
                    <div>
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(112, 0, 255, 0.1)', color: 'var(--secondary)', borderRadius: '20px', marginBottom: '1rem', fontWeight: 'bold' }}>
                            Protect
                        </div>
                        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Best-in-Class Security</h2>
                        <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                            Go beyond OWASP Top 10. Get full coverage for privacy-specific threats, account takeover, malicious bots, L7 DDoS, and more — in one platform.
                        </p>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                'Single dashboard for at-a-glance security insights',
                                'Tuning-free protection - no noisy alerts or false positives',
                                'Protect REST, SOAP, gRPC, GraphQL, and WebSocket protocols',
                                'AI-powered threat detection and response'
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <CheckCircle size={20} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                    <span className="text-body" style={{ color: 'var(--text-muted)' }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Respond & Test Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {/* Respond */}
                <motion.div
                    id="respond"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        padding: '3rem',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <Activity size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                    <h2 className="text-h3" style={{ marginBottom: '1rem' }}>Respond to Attacks</h2>
                    <p className="text-body" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                        Streamline incident response with complete visibility and smart triggers.
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                            'Complete visibility into attack sequences',
                            'Automated response with Active Threat Verification',
                            'Native integrations with your Security and DevOps tools'
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <CheckCircle size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                <span className="text-body" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Test */}
                <motion.div
                    id="test"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        padding: '3rem',
                        borderRadius: '16px',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <Code size={40} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                    <h2 className="text-h3" style={{ marginBottom: '1rem' }}>Test Your Security</h2>
                    <p className="text-body" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                        Automate security testing of your applications and APIs. Prioritize remediation for every asset, in every environment.
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                            'Frictionless assessment in CI/CD pipelines',
                            'Dev-friendly issue descriptions and guidance',
                            'Continuous security validation from the cloud'
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <CheckCircle size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                                <span className="text-body" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Fast Deployment */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'linear-gradient(135deg, var(--primary-dim) 0%, var(--bg-card) 100%)',
                    padding: '3rem',
                    borderRadius: '16px',
                    border: '1px solid var(--primary)',
                    marginBottom: '4rem',
                    textAlign: 'center'
                }}
            >
                <Cloud size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Fast Deployment Everywhere</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2rem' }}>
                    Integrated platform for privacy and security. Better security, less complexity, lower cost. Deploy in any environment in under 15 minutes.
                </p>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['Cloud-Native', 'Multi-Cloud', 'On-Premises', 'Hybrid', 'Edge'].map((env, i) => (
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
                <Zap size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Ready to Transform Your Security?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Experience the complete platform approach to privacy and security. Discover, protect, respond, and test - all in one solution.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Schedule Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Contact Sales</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default CompletePlatform;
