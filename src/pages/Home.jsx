import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Globe, ChevronRight, Activity, Server, Users, Cpu, Network, FileCheck } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <>

            {/* Hero Section */}
            <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.03) 0%, transparent 50%)', zIndex: -1 }} />

                <div className="container">
                    <div className="grid-cols-2 flex-center" style={{ gap: '4rem' }}>
                        <motion.div variants={containerVariants} initial="hidden" animate="visible">
                            <motion.div variants={itemVariants} className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '600' }}>
                                    AI-Native Security
                                </span>
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-hero" style={{ fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                                The API Immune System for Your <span className="text-gradient">Digital Infrastructure.</span>
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '540px', lineHeight: '1.7' }}>
                                Autonomous, AI-driven defense that neutralizes threats in nanoseconds. No rules to write. No false positives. Just pure, resilient protection.
                            </motion.p>

                            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem' }}>
                                <Link to="/contact">
                                    <Button variant="primary" style={{ padding: '1rem 2rem' }}>Deploy Shield <ChevronRight size={18} /></Button>
                                </Link>
                                <Link to="/demo">
                                    <Button variant="outline" style={{ padding: '1rem 2rem' }}>Live Attack Demo</Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Hero Visual - Scanning Eye */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
                        >
                            <div className="hero-visual">
                                <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                    <defs>
                                        <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
                                            <stop stopColor="var(--primary)" stopOpacity="0.2" />
                                            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
                                        </radialGradient>
                                        <clipPath id="logoClip">
                                            <circle cx="200" cy="200" r="60" />
                                        </clipPath>
                                        <path id="textCircle" d="M 200, 200 m -170, 0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0" fill="none" />
                                    </defs>

                                    {/* Rotating Rings */}
                                    <circle cx="200" cy="200" r="199" stroke="var(--border-color)" strokeOpacity="0.3" strokeDasharray="4 4">
                                        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="60s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="200" cy="200" r="150" stroke="var(--primary)" strokeOpacity="0.2" strokeWidth="1">
                                        <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="30s" repeatCount="indefinite" />
                                    </circle>

                                    {/* API Data Ring */}
                                    <g opacity="0.7">
                                        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="60s" repeatCount="indefinite" />
                                        <text fontSize="10" fontFamily="monospace" style={{ letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                            <textPath href="#textCircle" startOffset="0%" fill="var(--text-muted)">GET /api/v1/data</textPath>
                                            <textPath href="#textCircle" startOffset="14%" fill="var(--text-muted)">403 FORBIDDEN</textPath>
                                            <textPath href="#textCircle" startOffset="28%" fill="var(--text-muted)">SQL INJECTION BLOCKED</textPath>
                                            <textPath href="#textCircle" startOffset="48%" fill="var(--text-muted)">XSS DETECTED</textPath>
                                            <textPath href="#textCircle" startOffset="60%" fill="var(--text-muted)">200 OK</textPath>
                                            <textPath href="#textCircle" startOffset="70%" fill="var(--text-muted)">RATE LIMIT</textPath>
                                            <textPath href="#textCircle" startOffset="82%" fill="var(--text-muted)">POST /auth/login</textPath>
                                        </text>
                                    </g>

                                    {/* Scanning Effect */}
                                    <path d="M200,200 L400,100 A220,220 0 0,1 400,300 Z" fill="url(#glow)" opacity="0.5">
                                        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="4s" repeatCount="indefinite" />
                                    </path>

                                    {/* Central Logo */}
                                    <image
                                        href="/company_logo.jpg"
                                        x="140"
                                        y="140"
                                        height="120"
                                        width="120"
                                        clipPath="url(#logoClip)"
                                        preserveAspectRatio="xMidYMid slice"
                                    />
                                    <circle cx="200" cy="200" r="60" stroke="var(--primary)" strokeWidth="2" fill="none" />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* API Security Challenges */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                    >
                        <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'var(--primary-dim)', color: 'var(--primary)', borderRadius: '30px', marginBottom: '1.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                            THE API SECURITY CHALLENGE
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: '1rem' }}>
                            APIs Are Under <span className="text-gradient">Constant Attack</span>
                        </h2>
                        <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                            Modern applications rely on APIs, making them the primary attack vector. Traditional security can't keep up.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                icon: <Lock size={40} color="var(--secondary)" />,
                                title: 'Broken Authentication',
                                desc: 'APIs exposed with weak or missing authentication mechanisms allowing unauthorized access to sensitive data.'
                            },
                            {
                                icon: <FileCheck size={40} color="var(--primary)" />,
                                title: 'Data Exposure',
                                desc: 'Excessive data returned by APIs exposing PII, financial records, and confidential business information.'
                            },
                            {
                                icon: <Network size={40} color="var(--secondary)" />,
                                title: 'Injection Attacks',
                                desc: 'SQL, NoSQL, and command injection exploiting API endpoints without proper input validation.'
                            },
                            {
                                icon: <Cpu size={40} color="var(--primary)" />,
                                title: 'Rate Limit Abuse',
                                desc: 'Bots and automated tools overwhelming APIs with excessive requests leading to service degradation.'
                            }
                        ].map((challenge, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(124, 58, 237, 0.15)' }}
                                style={{
                                    background: 'var(--bg-card)',
                                    padding: '2.5rem',
                                    borderRadius: '16px',
                                    border: '1px solid var(--border-color)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ marginBottom: '1.5rem' }}>{challenge.icon}</div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                                    {challenge.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                    {challenge.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Real-Time Threat Detection Showcase */}
            <section style={{ background: 'var(--bg-card)', padding: '3rem 0' }}>
                <div className="container">
                    <div className="grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'rgba(112, 0, 255, 0.1)', color: 'var(--secondary)', borderRadius: '30px', marginBottom: '1.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
                                REAL-TIME DEFENSE
                            </div>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '1.5rem' }}>
                                Detect & Block Threats in <span className="text-gradient">Nanoseconds</span>
                            </h2>
                            <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                                Our AI-powered engine analyzes every API request in real-time, identifying and neutralizing threats before they reach your infrastructure.
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    'Zero-day vulnerability protection without signatures',
                                    'Behavioral analysis detecting anomalous patterns',
                                    'Automated threat response and blocking',
                                    'Sub-millisecond detection with minimal latency'
                                ].map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                                    >
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                                        <span style={{ color: 'var(--text-muted)' }}>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                background: 'var(--bg-dark)',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)',
                                padding: '2rem',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem'
                            }}
                        >
                            <div style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                                THREAT DETECTION LOG
                            </div>
                            {[
                                { time: '18:36:12.453', type: 'SQL Injection', status: 'BLOCKED', color: 'var(--secondary)' },
                                { time: '18:36:12.461', type: 'XSS Attack', status: 'BLOCKED', color: 'var(--secondary)' },
                                { time: '18:36:12.489', type: 'Legitimate Request', status: 'ALLOWED', color: '#10b981' },
                                { time: '18:36:12.512', type: 'Rate Limit Exceeded', status: 'BLOCKED', color: 'var(--secondary)' },
                                { time: '18:36:12.534', type: 'Auth Token Leaked', status: 'BLOCKED', color: 'var(--secondary)' },
                                { time: '18:36:12.567', type: 'Legitimate Request', status: 'ALLOWED', color: '#10b981' }
                            ].map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        background: 'rgba(124, 58, 237, 0.05)',
                                        marginBottom: '0.5rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.time}</span>
                                        <span style={{ color: 'var(--text-main)' }}>{log.type}</span>
                                    </div>
                                    <span style={{ color: log.color, fontWeight: 'bold', fontSize: '0.85rem' }}>
                                        {log.status}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* API Protection Features Grid */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: '1rem' }}>
                            Complete <span className="text-gradient">API Protection</span>
                        </h2>
                        <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                            Every layer of your API infrastructure protected by AI-powered security.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            {
                                icon: <Server size={32} />,
                                title: 'API Discovery',
                                desc: 'Automatically discover all APIs across your infrastructure, including shadow and zombie APIs.'
                            },
                            {
                                icon: <Shield size={32} />,
                                title: 'OWASP Protection',
                                desc: 'Complete coverage for OWASP API Security Top 10 vulnerabilities with zero configuration.'
                            },
                            {
                                icon: <Activity size={32} />,
                                title: 'Bot Mitigation',
                                desc: 'AI-powered bot detection stopping credential stuffing, scraping, and automated attacks.'
                            },
                            {
                                icon: <Zap size={32} />,
                                title: 'Virtual Patching',
                                desc: 'Instant protection for newly discovered vulnerabilities without code changes.'
                            },
                            {
                                icon: <FileCheck size={32} />,
                                title: 'Schema Validation',
                                desc: 'Enforce API specifications automatically, blocking malformed or malicious requests.'
                            },
                            {
                                icon: <Users size={32} />,
                                title: 'Credential Protection',
                                desc: 'Detect and block leaked API keys, tokens, and credentials across public repositories.'
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    background: `linear-gradient(135deg, ${i % 2 === 0 ? 'rgba(124, 58, 237, 0.05)' : 'rgba(112, 0, 255, 0.05)'} 0%, var(--bg-card) 100%)`,
                                    padding: '2rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{ color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)', marginBottom: '1rem' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="section-padding">
                <div className="container">
                    <div className="mb-lg" style={{ textAlign: 'center' }}>
                        <h2 className="text-h2">Defense in <span className="text-gradient">Depth</span></h2>
                        <p className="text-body" style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Comprehensive security layers working in unison.</p>
                    </div>

                    <div className="bento-grid">
                        {/* Card 1: Neural Core (Large) */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="span-2-desktop bento-card"
                        >
                            <Cpu size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                            <h3 className="text-h3" style={{ marginBottom: '1rem' }}>Neural Detection Core</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
                                Our proprietary AI models analyze traffic patterns in real-time, distinguishing between legitimate user behavior and sophisticated bot attacks with 99.99% accuracy.
                            </p>
                        </motion.div>

                        {/* Card 2: Global Shield */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bento-card"
                        >
                            <Globe size={32} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                            <h3 className="text-lg" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Global Edge Network</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                Low-latency protection deployed across 250+ edge locations worldwide.
                            </p>
                        </motion.div>

                        {/* Card 3: Compliance */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bento-card"
                        >
                            <FileCheck size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                            <h3 className="text-lg" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Auto-Compliance</h3>
                            <p className="text-body" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                GDPR, CCPA, and SOC2 compliance baked into every request inspection.
                            </p>
                        </motion.div>

                        {/* Card 4: Zero Trust (Wide) */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="span-2-desktop bento-card"
                        >
                            <div style={{ maxWidth: '400px' }}>
                                <Lock size={40} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                                <h3 className="text-h3" style={{ marginBottom: '1rem' }}>Zero Trust Architecture</h3>
                                <p className="text-body" style={{ color: 'var(--text-muted)' }}>
                                    Every request is treated as hostile until proven otherwise. Identity-aware proxies ensure only authorized traffic reaches your origin.
                                </p>
                            </div>
                            <div style={{ flex: 1, minWidth: '200px', display: 'flex', justifyContent: 'center' }}>
                                <Shield size={100} strokeWidth={0.5} color="var(--text-muted)" style={{ opacity: 0.2 }} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works - Process Flow */}
            <section className="section-padding" style={{ background: 'var(--bg-card)' }}>
                <div className="container">
                    <div className="mb-lg" style={{ textAlign: 'center' }}>
                        <h2 className="text-h2">The <span className="text-gradient">Neutralization</span> Process</h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                        {[
                            { step: '01', title: 'Analyze', desc: 'Traffic ingestion via SDK' },
                            { step: '02', title: 'Detect', desc: 'AI Anomaly Scoring' },
                            { step: '03', title: 'Block', desc: 'Edge-level Mitigation' }
                        ].map((item, i) => (
                            <React.Fragment key={i}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="process-step"
                                >
                                    <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--border-color)', marginBottom: '1rem' }}>{item.step}</div>
                                    <h3 className="text-lg" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
                                </motion.div>
                                {i < 2 && <ChevronRight size={32} color="var(--text-muted)" className="hidden-mobile" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
};

export default Home;
