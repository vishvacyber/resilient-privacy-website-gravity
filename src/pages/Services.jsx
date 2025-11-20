import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Code, Lock, Eye, FileCheck, Cpu, Globe, Zap, Search, AlertTriangle, Terminal } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            icon: <Cpu size={48} color="var(--primary)" />,
            title: 'AI Security Solutions',
            desc: 'Advanced AI security services including model protection, adversarial defense, and AI-powered threat detection. Secure your AI models from manipulation and theft.',
            features: ['AI model security assessment', 'Adversarial attack protection', 'AI-powered threat detection', 'Secure AI model development']
        },
        {
            icon: <Shield size={48} color="var(--secondary)" />,
            title: 'API Security Services',
            desc: 'Comprehensive API security including authentication, authorization, and threat protection. We ensure your APIs are robust against the OWASP Top 10 threats.',
            features: ['API security assessment', 'OWASP API Top 10 protection', 'API authentication & authorization', 'API threat monitoring']
        },
        {
            icon: <Eye size={48} color="var(--primary)" />,
            title: 'Managed Security Services',
            desc: '24/7 security monitoring and threat response by certified experts. Let our SOC team handle the vigilance while you focus on business growth.',
            features: ['SOC-as-a-Service', 'Threat hunting & detection', 'Incident response', 'Vulnerability management']
        },
        {
            icon: <FileCheck size={48} color="var(--secondary)" />,
            title: 'Cybersecurity Consulting',
            desc: 'Strategic cybersecurity consulting and risk assessment services. We help you build a security-first culture and architecture.',
            features: ['Security strategy development', 'Risk assessments & audits', 'Compliance consulting', 'Security architecture design']
        },
        {
            icon: <Terminal size={48} color="var(--primary)" />,
            title: 'Penetration Testing',
            desc: 'Advanced security testing and vulnerability assessment services. Our red team simulates real-world attacks to find weaknesses before hackers do.',
            features: ['External penetration testing', 'Internal network testing', 'Web application security', 'Red team exercises']
        },
        {
            icon: <AlertTriangle size={48} color="var(--secondary)" />,
            title: 'Incident Response',
            desc: 'Rapid incident response and digital forensics investigation services. When a breach occurs, our team is ready to contain, analyze, and recover.',
            features: ['24/7 emergency response', 'Digital forensics analysis', 'Malware analysis', 'Recovery & remediation']
        }
    ];

    return (
        <div className="container section-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our <span className="text-gradient">Services</span></h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    Comprehensive cybersecurity solutions tailored to your enterprise needs. From AI security to incident response, we have you covered.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: 'var(--bg-card)',
                            padding: '2.5rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', opacity: 0.1 }}>
                            {service.icon}
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>{service.icon}</div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{service.title}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{service.desc}</p>
                        <ul style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            {service.features.map((feature, i) => (
                                <li key={i} className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '6rem', textAlign: 'center', background: 'linear-gradient(180deg, transparent, var(--bg-card))', padding: '4rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Need a Custom Solution?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    We understand that every infrastructure is unique. Let's discuss how we can tailor our security platform to your specific requirements.
                </p>
                <Link to="/contact">
                    <Button variant="primary">Contact Sales</Button>
                </Link>
            </div>
        </div>
    );
};

export default Services;
