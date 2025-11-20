import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Globe, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            {/* Hero Section */}
            <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                {/* Background Elements */}
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary-dim) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: -1 }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(112, 0, 255, 0.1) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: -1 }} />

                <div className="container">
                    <div className="grid-cols-2 flex-center">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1 variants={itemVariants} className="text-hero" style={{ fontWeight: '800', marginBottom: '1.5rem' }}>
                                Secure Your <br />
                                <span className="text-gradient">Digital Frontier</span>
                            </motion.h1>
                            <motion.p variants={itemVariants} className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px' }}>
                                Advanced API security solutions designed for the modern web. Protect your data, infrastructure, and reputation with Resilient Privacy.
                            </motion.p>
                            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem' }}>
                                <Link to="/contact">
                                    <Button variant="primary">Get Started <ChevronRight size={18} /></Button>
                                </Link>
                                <Link to="/services">
                                    <Button variant="outline">Learn More</Button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex-center animate-float"
                            style={{ position: 'relative' }}
                        >
                            <div style={{ position: 'relative', width: '100%', maxWidth: '500px', aspectRatio: '1/1' }}>
                                {/* Abstract Cyber Graphic */}
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5">
                                        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="100" cy="100" r="60" fill="none" stroke="var(--secondary)" strokeWidth="0.5" opacity="0.5">
                                        <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="15s" repeatCount="indefinite" />
                                    </circle>
                                    <path d="M100,20 L100,180 M20,100 L180,100" stroke="var(--primary)" strokeWidth="0.2" opacity="0.3" />
                                    <rect x="70" y="70" width="60" height="60" rx="10" fill="var(--bg-card)" stroke="var(--primary)" strokeWidth="2" />
                                    <image href="/company_logo.jpg" x="75" y="75" height="50" width="50" clipPath="inset(0% round 10px)" />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding" style={{ background: 'var(--bg-card)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center' }} className="mb-lg">
                        <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Why Choose <span className="text-gradient">Resilient</span>?</h2>
                        <p className="text-body" style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            We provide comprehensive protection against the most sophisticated cyber threats targeting your APIs.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: <Shield size={40} color="var(--primary)" />, title: 'Real-time Protection', desc: 'Instant threat detection and blocking using advanced AI algorithms.' },
                            { icon: <Lock size={40} color="var(--secondary)" />, title: 'Zero Trust Architecture', desc: 'Never trust, always verify. Strict identity verification for every request.' },
                            { icon: <Zap size={40} color="var(--primary)" />, title: 'Low Latency', desc: 'Security that doesn\'t slow you down. Optimized for high-performance APIs.' },
                            { icon: <Globe size={40} color="var(--secondary)" />, title: 'Global Compliance', desc: 'Adhere to GDPR, CCPA, and other global privacy regulations effortlessly.' },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                style={{ background: 'var(--bg-dark)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                            >
                                <div style={{ marginBottom: '1.5rem' }}>{feature.icon}</div>
                                <h3 className="text-h3" style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                                <p className="text-body" style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', background: 'linear-gradient(45deg, var(--bg-dark), #1a1a1a)', zIndex: -1 }} />
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="text-h2" style={{ marginBottom: '2rem' }}>Ready to Secure Your APIs?</h2>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Join leading companies who trust Resilient Privacy for their cybersecurity needs. Get a free audit today.
                    </p>
                    <Link to="/contact">
                        <Button variant="primary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
                            Get Your Free Audit
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;
