import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Target, Award, Linkedin, X } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const About = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const team = [
        { name: 'Vishva Patel', role: 'Founder & CEO', fullRole: 'Founder & Chief Executive Officer', bio: 'Visionary leader with over 9 years of experience in cybersecurity and enterprise software. Vishva founded Resilient Privacy with a mission to secure the world\'s API digital infrastructure.', linkedin: 'https://www.linkedin.com/in/vishva-vp', img: '/vishva_patel.png' },
        { name: 'Chief Technology Officer', role: 'Position Open', fullRole: 'Chief Technology Officer - Position Open', bio: 'We\'re seeking an exceptional technology leader to architect our next-generation API security platform. If you\'re passionate about building innovative security solutions, we\'d love to hear from you.', img: '/position_open.jpg', isOpen: true },
        { name: 'Arth Patel', role: 'Chief Operating Officer', fullRole: 'Chief Operating Officer', bio: 'Scaling our global operations and customer success teams. Arth ensures that we deliver value to our customers every single day.', img: '/arth_patel.jpg' },
        { name: 'Aditya Desai', role: 'Chief Information Officer', fullRole: 'Chief Information Officer', bio: 'Overseeing our global information strategy and internal security posture. Aditya ensures that Resilient Privacy practices what it preaches.', img: '/aditya_desai.jpg' },
        { name: 'Rachna Patel', role: 'Chief of Staff', fullRole: 'Chief of Staff', bio: 'Driving operational excellence and strategic initiatives across the organization. Rachna ensures that our teams are aligned and executing on our mission.', img: '/rachna_patel.jpg' },
        { name: 'Siddhi Patel', role: 'Chief Human Resources Officer', fullRole: 'Chief Human Resources Officer', bio: 'Building a world-class culture and talent organization. Siddhi is dedicated to making Resilient Privacy the best place to work in cybersecurity.', img: '/siddhi_patel.jpg' },
    ];

    const advisors = [
        { name: 'Tejas Shroff', role: 'Sr Director Managed Security Services, NTT Data', bio: 'A veteran in managed security services, Tejas provides strategic guidance on our service delivery and market expansion.', img: '/tejas_shroff.jpg' },
    ];

    return (
        <div className="container section-padding">
            <SEO
                title="About Us - Leading API Security Company"
                description="Resilient Privacy Inc. is an enterprise API security company founded in 2025. We provide AI-driven threat detection, WAAP solutions, and zero-trust architecture protecting 10M+ APIs worldwide."
                keywords="About Resilient Privacy, API Security Company, Cybersecurity Company, Enterprise Security, WAAP Provider, Threat Detection"
                canonical="https://www.resilientprivacy.com/company/about"
            />
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
                <h2 className="text-h2" style={{ marginBottom: '1rem' }}>Meet the <span className="text-gradient">Guardians</span></h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
                    The visionary leaders driving innovation in API security
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
                    {[...team, ...advisors.map(advisor => ({ ...advisor, isAdvisor: true }))].map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, scale: 1.03 }}
                            onClick={() => setSelectedMember(member)}
                            style={{
                                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(17, 17, 17, 0.8) 100%)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                overflow: 'visible',
                                border: '1px solid rgba(124, 58, 237, 0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                padding: '2.5rem 2rem 2rem',
                                position: 'relative',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            {/* Decorative gradient orb */}
                            <div style={{
                                position: 'absolute',
                                top: '-50px',
                                right: '-50px',
                                width: '150px',
                                height: '150px',
                                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
                                borderRadius: '50%',
                                pointerEvents: 'none',
                                filter: 'blur(40px)'
                            }} />

                            <div style={{
                                width: '160px',
                                height: '160px',
                                margin: '0 auto 1.5rem',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                padding: '4px',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    background: 'var(--bg-dark)'
                                }}>
                                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    marginBottom: '0.5rem',
                                    color: '#fff',
                                    letterSpacing: '-0.02em'
                                }}>
                                    {member.name} {member.isAdvisor && <span style={{ fontSize: '0.75em', color: 'var(--secondary)', fontWeight: '500', display: 'block', marginTop: '0.25rem' }}>(Strategic Advisor)</span>}
                                </h3>
                                <p style={{
                                    color: member.isAdvisor ? 'var(--secondary)' : 'var(--primary)',
                                    fontSize: '0.95rem',
                                    fontWeight: '500',
                                    marginBottom: '0.5rem'
                                }}>{member.role}</p>
                                <div style={{
                                    width: '40px',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                    margin: '1rem auto 0',
                                    borderRadius: '2px'
                                }} />
                            </div>
                        </motion.div>
                    ))}
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
