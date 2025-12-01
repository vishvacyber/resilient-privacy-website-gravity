import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Lock, Search, Zap, Activity, CheckCircle, Globe, Server, Cloud, Key, FileCode } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const SecureAPI = () => {
    const features = [
        {
            icon: <Search size={40} color="var(--primary)" />,
            title: 'API Discovery',
            description: 'Find APIs you didn\'t know existed - shadow APIs, legacy endpoints, and undocumented integrations. Complete visibility across your entire API landscape in minutes.'
        },
        {
            icon: <Shield size={40} color="var(--secondary)" />,
            title: 'Runtime Protection',
            description: 'Block injection attacks, broken authentication, and excessive data exposure in real-time. Protect against OWASP API Top 10 without impacting API performance.'
        },
        {
            icon: <Key size={40} color="var(--primary)" />,
            title: 'Authentication & Authorization',
            description: 'OAuth 2.0, JWT, and API key management with zero-trust authorization policies. Implement RBAC and ABAC without writing authentication code.'
        },
        {
            icon: <Activity size={40} color="var(--secondary)" />,
            title: 'Rate Limiting',
            description: 'Intelligent rate limiting and quota management to prevent API abuse while ensuring legitimate traffic flows smoothly.'
        },
        {
            icon: <FileCode size={40} color="var(--primary)" />,
            title: 'Schema Validation',
            description: 'Automatic validation against OpenAPI and GraphQL schemas. Reject malformed requests before they reach your application code.'
        },
        {
            icon: <Zap size={40} color="var(--secondary)" />,
            title: 'Performance Monitoring',
            description: 'Comprehensive API performance monitoring with latency tracking, error rate analysis, and capacity planning insights.'
        }
    ];

    const apiProtocols = [
        'REST / RESTful',
        'GraphQL',
        'gRPC',
        'SOAP',
        'WebSocket',
        'Server-Sent Events (SSE)'
    ];

    const securityFeatures = [
        'OWASP API Top 10 protection',
        'API specification enforcement (OpenAPI/Swagger)',
        'Sensitive data detection in API responses',
        'API version management and deprecation',
        'Cross-origin resource sharing (CORS) policies',
        'API gateway integration',
        'Microservices security',
        'API threat intelligence'
    ];

    const useCases = [
        {
            icon: <Globe size={32} />,
            title: 'External APIs',
            description: 'Secure public-facing APIs consumed by partners, customers, and third-party developers.'
        },
        {
            icon: <Server size={32} />,
            title: 'Internal APIs',
            description: 'Protect internal microservices and service-to-service communication in distributed architectures.'
        },
        {
            icon: <Cloud size={32} />,
            title: 'Cloud APIs',
            description: 'Secure cloud provider APIs and serverless functions across AWS, Azure, and GCP.'
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
                    SecureAPI<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>™</sup>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '900px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
                    Discover shadow APIs lurking in your infrastructure and secure modern API architectures without slowing development. Developer-friendly protection for REST, GraphQL, and gRPC that integrates invisibly into your CI/CD pipeline while catching threats signature-based tools miss.
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
                        Complete API <span className="text-gradient">Lifecycle Security</span>
                    </h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                        Secure every phase of your API journey with comprehensive protection and management.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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

            {/* Supported Protocols */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1) 0%, var(--bg-card) 100%)',
                    padding: '4rem 3rem',
                    borderRadius: '20px',
                    border: '1px solid var(--secondary)',
                    marginBottom: '4rem'
                }}
            >
                <h2 className="text-h2" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    Support for All API Protocols
                </h2>
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
                    {apiProtocols.map((protocol, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-card)',
                            padding: '1rem 2rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            fontWeight: 'bold',
                            fontSize: '1.1rem'
                        }}>
                            {protocol}
                        </div>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {securityFeatures.map((feature, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <CheckCircle size={20} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                            <span className="text-body" style={{ color: 'var(--text-muted)' }}>{feature}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Use Cases */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '4rem' }}
            >
                <h2 className="text-h2" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    Secure APIs <span className="text-gradient">Everywhere</span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {useCases.map((useCase, i) => (
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
                            <div style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>{useCase.icon}</div>
                            <h3 className="text-h3" style={{ marginBottom: '1rem' }}>{useCase.title}</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                {useCase.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: 'var(--bg-card)',
                    padding: '4rem 3rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '4rem',
                    textAlign: 'center'
                }}
            >
                <Code size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Developer-Friendly Security</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
                    Security that doesn't slow down development. Integrate in minutes with your existing API infrastructure.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                    {[
                        { metric: '< 5 min', label: 'Setup Time' },
                        { metric: '<0.5ms', label: 'Added Latency' },
                        { metric: '100%', label: 'API Coverage' }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                                {stat.metric}
                            </div>
                            <div style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <Lock size={48} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Ready to Secure Your APIs?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Protect your APIs from discovery to deployment with SecureAPI's comprehensive security platform.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/demo"><Button variant="primary">Schedule Demo</Button></Link>
                    <Link to="/contact"><Button variant="outline">Talk to Expert</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default SecureAPI;
