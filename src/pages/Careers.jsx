import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Briefcase, Code, Shield } from 'lucide-react';

const Careers = () => {
    const openings = [
        { title: 'Senior Security Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
        { title: 'API Product Manager', dept: 'Product', location: 'New York, NY', type: 'Full-time' },
        { title: 'Threat Researcher', dept: 'Security Labs', location: 'London, UK', type: 'Full-time' },
        { title: 'Frontend Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
    ];

    return (
        <div className="container section-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Join the <span className="text-gradient">Mission</span></h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    Help us build the future of API security. We are looking for passionate individuals to join our global team.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                {[
                    { icon: <Shield size={32} color="var(--primary)" />, title: 'Impact', desc: 'Protect millions of users and critical infrastructure.' },
                    { icon: <Code size={32} color="var(--secondary)" />, title: 'Innovation', desc: 'Work with cutting-edge AI and security technologies.' },
                    { icon: <Briefcase size={32} color="var(--primary)" />, title: 'Growth', desc: 'Continuous learning and career development opportunities.' },
                ].map((item, index) => (
                    <div key={index} style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                ))}
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Open Positions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {openings.map((job, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.02)' }}
                        style={{
                            background: 'var(--bg-card)',
                            padding: '2rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}
                    >
                        <div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <span>{job.dept}</span>
                                <span>•</span>
                                <span>{job.location}</span>
                                <span>•</span>
                                <span>{job.type}</span>
                            </div>
                        </div>
                        <Button variant="outline">Apply Now</Button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Careers;
