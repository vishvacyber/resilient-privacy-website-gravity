import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cloud, Zap, Lock, Activity, Search, Eye, AlertTriangle, Cpu, Server, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Products = () => {
    const [expandedFeature, setExpandedFeature] = useState(null);

    const toggleFeature = (index) => {
        setExpandedFeature(expandedFeature === index ? null : index);
    };

    const coreShieldFeatures = [
        {
            title: 'API Mapping & Visibility',
            desc: 'Automatically discover every endpoint, shadow API, and undocumented interface.',
            icon: <Eye size={32} color="var(--primary)" />,
            points: [
                'Complete API inventory discovery',
                'Shadow API detection',
                'Undocumented endpoint mapping',
                'Real-time API topology visualization',
                'API dependency mapping',
                'Legacy API identification'
            ],
            details: [
                { title: 'Complete API Inventory Discovery', desc: 'Automatically discover and catalog every API endpoint in your environment, including internal, external, and third-party APIs.' },
                { title: 'Shadow API Detection', desc: 'Identify undocumented and forgotten APIs that pose security risks and compliance challenges.' },
                { title: 'Real-time API Topology Visualization', desc: 'Visualize API relationships, dependencies, and data flows with interactive topology maps.' },
                { title: 'API Dependency Mapping', desc: 'Map complex API dependencies and understand how changes impact your entire API ecosystem.' },
                { title: 'Legacy API Identification', desc: 'Identify outdated and deprecated APIs that need modernization or retirement.' },
                { title: 'API Documentation Generation', desc: 'Automatically generate comprehensive API documentation from discovered endpoints.' }
            ]
        },
        {
            title: 'Continuous API Risk Testing',
            desc: 'Assess APIs for misconfigurations, flaws, and weak authentication flows.',
            icon: <AlertTriangle size={32} color="var(--secondary)" />,
            points: [
                'Automated vulnerability scanning',
                'Authentication flow testing',
                'Configuration drift detection',
                'OWASP API Top 10 compliance',
                'Business logic testing',
                'Zero-day vulnerability detection'
            ],
            details: [
                { title: 'Automated Vulnerability Scanning', desc: 'Continuously scan APIs for known vulnerabilities, misconfigurations, and security flaws.' },
                { title: 'Authentication Flow Testing', desc: 'Test authentication mechanisms, authorization controls, and session management.' },
                { title: 'Configuration Drift Detection', desc: 'Monitor for changes in API configurations that could introduce security risks.' },
                { title: 'OWASP API Top 10 Compliance', desc: 'Ensure compliance with OWASP API Top 10 security standards and best practices.' },
                { title: 'Business Logic Testing', desc: 'Test for business logic flaws and application-specific vulnerabilities.' },
                { title: 'Zero-day Vulnerability Detection', desc: 'Identify previously unknown vulnerabilities using advanced detection techniques.' }
            ]
        },
        {
            title: 'Fraud & Abuse Prevention',
            desc: 'Stop credential stuffing, account takeover attempts, and automated exploitation.',
            icon: <Shield size={32} color="var(--primary)" />,
            points: [
                'Credential stuffing protection',
                'Account takeover prevention',
                'Bot detection and mitigation',
                'Rate limiting and throttling',
                'Behavioral analysis',
                'Real-time fraud scoring'
            ],
            details: [
                { title: 'Credential Stuffing Protection', desc: 'Detect and block automated credential stuffing attacks using advanced pattern recognition.' },
                { title: 'Account Takeover Prevention', desc: 'Identify and prevent account takeover attempts through behavioral analysis and risk scoring.' },
                { title: 'Bot Detection & Mitigation', desc: 'Distinguish between legitimate users and malicious bots using machine learning algorithms.' },
                { title: 'Rate Limiting & Throttling', desc: 'Implement intelligent rate limiting to prevent API abuse while maintaining user experience.' },
                { title: 'Behavioral Analysis', desc: 'Analyze user behavior patterns to identify suspicious activities and potential threats.' },
                { title: 'Real-time Fraud Scoring', desc: 'Generate real-time fraud scores for every API request to enable instant decision making.' }
            ]
        },
        {
            title: 'AI-Aware Protection',
            desc: 'Security tailored for Agentic AI-driven workloads and data pipelines.',
            icon: <Cpu size={32} color="var(--secondary)" />,
            points: [
                'AI workload protection',
                'Data pipeline security',
                'Model inference protection',
                'AI agent monitoring',
                'LLM security controls',
                'AI-specific threat detection'
            ],
            details: [
                { title: 'AI Workload Protection', desc: 'Secure AI training, inference, and deployment pipelines with specialized security controls.' },
                { title: 'Data Pipeline Security', desc: 'Protect data flows between AI systems and ensure data integrity throughout the pipeline.' },
                { title: 'Model Inference Protection', desc: 'Secure AI model endpoints and prevent model extraction, poisoning, and adversarial attacks.' },
                { title: 'AI Agent Monitoring', desc: 'Monitor and secure autonomous AI agents and their interactions with external systems.' },
                { title: 'LLM Security Controls', desc: 'Protect Large Language Models from prompt injection, data extraction, and misuse.' },
                { title: 'AI-Specific Threat Detection', desc: 'Detect AI-specific attacks like model inversion, membership inference, and adversarial examples.' }
            ]
        }
    ];

    return (
        <div className="container section-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
                className="mb-lg"
            >
                <h1 className="text-h1" style={{ marginBottom: '1.5rem' }}>Advanced Security <span className="text-gradient">Platforms</span></h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    Our comprehensive suite of tools designed to secure your digital infrastructure from modern threats.
                </p>
            </motion.div>

            {/* CoreShield Main */}
            <div style={{ marginBottom: '8rem' }}>
                <div className="grid-cols-2 mb-lg" style={{ alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--primary-dim)', color: 'var(--primary)', borderRadius: '20px', marginBottom: '1rem', fontWeight: 'bold' }}>
                            Flagship Platform
                        </div>
                        <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>CoreShield™ API Protection Suite</h2>
                        <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Our flagship platform to uncover and mitigate API risks. CoreShield™ provides complete visibility and control over your API ecosystem, ensuring that no threat goes unnoticed.
                        </p>
                        <Link to="/demo"><Button variant="primary">Request Demo</Button></Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-lg"
                        style={{ background: 'var(--bg-card)', borderRadius: '20px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
                    >
                        <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '100%', height: '100%', background: 'radial-gradient(circle, var(--primary-dim) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                        <Shield size={80} color="var(--primary)" style={{ marginBottom: '2rem', position: 'relative' }} />
                        <h3 className="text-h3" style={{ marginBottom: '1rem', position: 'relative' }}>Total Protection</h3>
                        <p style={{ color: 'var(--text-muted)', position: 'relative' }}>Securing over 10 Billion API calls daily across the globe.</p>
                    </motion.div>
                </div>

                {/* CoreShield Modules */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                    {coreShieldFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}
                        >
                            <div
                                onClick={() => toggleFeature(index)}
                                className="p-lg"
                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div>{feature.icon}</div>
                                    <div>
                                        <h3 className="text-h3" style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                                        <p className="text-body" style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                                    </div>
                                </div>
                                <div style={{ color: 'var(--primary)' }}>
                                    {expandedFeature === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedFeature === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}
                                    >
                                        <div className="p-lg">
                                            <h4 className="text-lg" style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Detailed Capabilities</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                                {feature.details.map((detail, i) => (
                                                    <div key={i}>
                                                        <h5 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: '600' }}>{detail.title}</h5>
                                                        <p className="text-body" style={{ color: 'var(--text-muted)' }}>{detail.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Unified WAAP+ */}
            <div className="grid-cols-2 p-lg" style={{ alignItems: 'center', background: 'linear-gradient(180deg, var(--bg-card), transparent)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(112, 0, 255, 0.1)', color: 'var(--secondary)', borderRadius: '20px', marginBottom: '1rem', fontWeight: 'bold' }}>
                        All-in-One Defense
                    </div>
                    <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Unified WAAP+™</h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Cloud-native, all-in-one defense framework for web apps and APIs. Simplify your security stack without compromising on protection.
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        {[
                            'Multi-cloud protection - Secure apps anywhere.',
                            'Hybrid environment support - On-prem and cloud.',
                            'On-premises deployment - For strict data sovereignty.',
                            'Zero-complexity security - Easy setup and management.'
                        ].map((item, i) => (
                            <li key={i} className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
                                <Cloud size={20} color="var(--secondary)" />
                                <span className="text-body">{item}</span>
                            </li>
                        ))}
                    </ul>
                    <Link to="/demo"><Button variant="outline">Learn More</Button></Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                >
                    <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                        <Server size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                        <div style={{ fontWeight: 'bold' }}>On-Prem</div>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                        <Cloud size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                        <div style={{ fontWeight: 'bold' }}>Cloud</div>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                        <Activity size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                        <div style={{ fontWeight: 'bold' }}>Hybrid</div>
                    </div>
                    <div style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                        <Lock size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                        <div style={{ fontWeight: 'bold' }}>Secure</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Products;
