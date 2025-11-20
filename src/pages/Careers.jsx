import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import { Briefcase, Code, Shield, X, Upload, CheckCircle } from 'lucide-react';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState(null); // 'submitting', 'success', 'error'

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/jobs');
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const handleApply = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
        setApplicationStatus(null);
    };

    const ApplicationModal = ({ job, onClose }) => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            phone: '',
            cover_letter: ''
        });
        const [resume, setResume] = useState(null);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setApplicationStatus('submitting');

            const data = new FormData();
            data.append('job_id', job.id);
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('cover_letter', formData.cover_letter);
            if (resume) {
                data.append('resume', resume);
            }

            try {
                const res = await fetch('/api/applications', {
                    method: 'POST',
                    body: data
                });

                if (res.ok) {
                    setApplicationStatus('success');
                    setTimeout(() => {
                        onClose();
                        setApplicationStatus(null);
                    }, 2000);
                } else {
                    setApplicationStatus('error');
                }
            } catch (error) {
                setApplicationStatus('error');
            }
        };

        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '1rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '12px',
                        width: '100%',
                        maxWidth: '500px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        position: 'relative',
                        border: '1px solid var(--border-color)'
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <X size={24} />
                    </button>

                    {applicationStatus === 'success' ? (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Application Sent!</h3>
                            <p style={{ color: 'var(--text-muted)' }}>We'll be in touch soon.</p>
                        </div>
                    ) : (
                        <>
                            <h2 style={{ marginBottom: '0.5rem' }}>Apply for {job.title}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{job.location} • {job.type}</p>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    placeholder="Full Name"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                                />

                                <div style={{ border: '1px dashed var(--border-color)', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
                                    <input
                                        type="file"
                                        id="resume-upload"
                                        accept=".pdf,.doc,.docx"
                                        onChange={e => setResume(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="resume-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <Upload size={24} color="var(--primary)" />
                                        <span style={{ color: 'var(--text-muted)' }}>
                                            {resume ? resume.name : 'Upload Resume (PDF/DOC)'}
                                        </span>
                                    </label>
                                </div>

                                <textarea
                                    placeholder="Cover Letter (Optional)"
                                    rows="4"
                                    value={formData.cover_letter}
                                    onChange={e => setFormData({ ...formData, cover_letter: e.target.value })}
                                    style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                                />

                                {applicationStatus === 'error' && (
                                    <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>Failed to submit application. Please try again.</p>
                                )}

                                <Button variant="primary" type="submit" disabled={applicationStatus === 'submitting'}>
                                    {applicationStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                                </Button>
                            </form>
                        </>
                    )}
                </motion.div>
            </div>
        );
    };

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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
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

            {jobs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: '8px' }}>
                    <p>No open positions at the moment. Check back soon!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {jobs.map((job) => (
                        <motion.div
                            key={job.id}
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
                                    <span>{job.department}</span>
                                    <span>•</span>
                                    <span>{job.location}</span>
                                    <span>•</span>
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <Button variant="outline" onClick={() => handleApply(job)}>Apply Now</Button>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && selectedJob && (
                    <ApplicationModal job={selectedJob} onClose={() => setIsModalOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Careers;
