import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Target, Award, Linkedin, X } from 'lucide-react';
import Button from '../components/Button';

const About = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const team = [
        { name: 'Vishva Patel', role: 'Founder & CEO', fullRole: 'Founder & Chief Executive Officer', bio: 'Visionary leader with over 9 years of experience in cybersecurity and enterprise software. Vishva founded Resilient Privacy with a mission to secure the world\'s API digital infrastructure.', linkedin: 'https://www.linkedin.com/in/vishva-vp', img: '/vishva_patel.png' },
        { name: 'Malay Bhavsar', role: 'Chief Technology Officer', fullRole: 'Chief Technology Officer', bio: 'Architect of the CoreShield™ platform and AI security pioneer. Malay leads our engineering teams in building the next generation of API security solutions.', img: '/malay_bhavsar.jpg' },
        { name: 'Arth Patel', role: 'Chief Operating Officer', fullRole: 'Chief Operating Officer', bio: 'Scaling our global operations and customer success teams. Arth ensures that we deliver value to our customers every single day.', img: '/arth_patel.jpg' },
        { name: 'Aditya Desai', role: 'Chief Information Officer', fullRole: 'Chief Information Officer', bio: 'Overseeing our global information strategy and internal security posture. Aditya ensures that Resilient Privacy practices what it preaches.', img: '/aditya_desai.jpg' },
        { name: 'Rachna Patel', role: 'Chief of Staff', fullRole: 'Chief of Staff', bio: 'Driving operational excellence and strategic initiatives across the organization. Rachna ensures that our teams are aligned and executing on our mission.', img: '/rachna_patel.jpg' },
        { name: 'Siddhi Patel', role: 'Chief Human Resources Officer', fullRole: 'Chief Human Resources Officer', bio: 'Building a world-class culture and talent organization. Siddhi is dedicated to making Resilient Privacy the best place to work in cybersecurity.', img: '/siddhi_patel.jpg' },
    ];

    const advisors = [
        { name: 'Tejas Shroff', role: 'Sr Director Managed Security Services, NTT Data', bio: 'A veteran in managed security services, Tejas provides strategic guidance on our service delivery and market expansion.', img: '/tejas_shroff.jpg' },
        { name: 'Bhagirath Patel', role: 'Civil Criminal and Corporate Lawyer', bio: 'Legal expert specializing in corporate law and compliance. Bhagirath advises on regulatory landscapes and corporate governance.', img: '/bhagirath_patel.jpg' },
    ];

    return (
        <div className="container section-padding">
            {/* Mission Section */}
            <div className="grid-cols-2 mb-lg" style={{ alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-h1" style={{ marginBottom: '1.5rem' }}>We Are <span className="text-gradient">Resilient Privacy</span></h1>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Founded in 2025, Resilient Privacy Inc. was born from a fundamental truth: in a world powered by APIs, securing them is no longer just a priority, it's the cornerstone of digital trust.
                    </p>
                    <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Our mission is to empower businesses to innovate confidently, knowing that the security and privacy of their data is protected at every step. We specialize in building robust API security solutions that act as the first line of defense against evolving cyber threats, ensuring that privacy and security never stand in the way of progress.
                    </p>
                    <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
                        At Resilient Privacy, we're not just securing APIs, we're safeguarding the future of digital innovation.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                >
                    {[
                        { icon: <Users size={32} color="var(--primary)" />, label: 'Expert Team', value: '25+' },
                        { icon: <Target size={32} color="var(--secondary)" />, label: 'APIs Secured', value: '10M+' },
                        { icon: <Shield size={32} color="var(--primary)" />, label: 'Threats Blocked', value: '1B+' },
                    ].map((stat, index) => (
                        <div key={index} style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ marginBottom: '0.5rem' }}>{stat.icon}</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{stat.value}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Team Section */}
            <div style={{ textAlign: 'center' }} className="mb-lg">
                <h2 className="text-h2" style={{ marginBottom: '3rem' }}>Meet the <span className="text-gradient">Guardians</span></h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {[...team, ...advisors.map(advisor => ({ ...advisor, isAdvisor: true }))].map((member, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedMember(member)}
                            style={{ background: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                        >
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 className="text-lg" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    {member.name} {member.isAdvisor && <span style={{ fontSize: '0.8em', color: 'var(--text-muted)', fontWeight: 'normal' }}>(Advisor)</span>}
                                </h3>
                                <p style={{ color: member.isAdvisor ? 'var(--secondary)' : 'var(--primary)', fontSize: '0.9rem' }}>{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Group Photo Section */}
            <div className="section-padding">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ borderRadius: '20px', overflow: 'hidden', border: '3px solid var(--primary)', boxShadow: '0 0 30px var(--primary-dim)', position: 'relative' }}
                    >
                        <img src="/team_photo.jpg" alt="Resilient Privacy Team" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', padding: '4rem 2rem 2rem' }}>
                            <h3 className="text-h3">Our Wonderful Interns</h3>
                            <p style={{ color: 'var(--text-muted)' }}>The future guardians of digital privacy.</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Team Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 2000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: 'var(--bg-card)',
                                borderRadius: '20px',
                                border: '1px solid var(--border-color)',
                                maxWidth: '800px',
                                width: '100%',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                            className="team-modal-grid"
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)', zIndex: 10 }}
                            >
                                <X size={24} />
                            </button>

                            <div style={{ height: '100%', minHeight: '300px' }}>
                                <img
                                    src={selectedMember.img}
                                    alt={selectedMember.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h3 className="text-h2" style={{ marginBottom: '0.5rem' }}>{selectedMember.name}</h3>
                                <p style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                                    {selectedMember.fullRole}
                                </p>
                                <p className="text-body" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                    {selectedMember.bio}
                                </p>
                                {selectedMember.linkedin && (
                                    <a
                                        href={selectedMember.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ display: 'inline-block' }}
                                    >
                                        <Button variant="outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Linkedin size={20} /> Connect on LinkedIn
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    );
};

export default About;
