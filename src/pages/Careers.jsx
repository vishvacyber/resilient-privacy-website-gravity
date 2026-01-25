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
            cover_letter: '',
            work_authorized: '',
            requires_sponsorship: '',
            veteran_status: '',
            disability_status: '',
            gender: '',
            race_ethnicity: '',
            criminal_history: '',
            criminal_history_explanation: '',
            linkedin_url: '',
            current_employer: '',
            years_experience: '',
            education_level: '',
            start_date: '',
            salary_expectations: '',
            willing_to_relocate: '',
            referral_source: '',
            portfolio_url: '',
            references: ''
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
            data.append('work_authorized', formData.work_authorized);
            data.append('requires_sponsorship', formData.requires_sponsorship);
            data.append('veteran_status', formData.veteran_status);
            data.append('disability_status', formData.disability_status);
            data.append('gender', formData.gender);
            data.append('race_ethnicity', formData.race_ethnicity);
            data.append('criminal_history', formData.criminal_history);
            data.append('criminal_history_explanation', formData.criminal_history_explanation);
            data.append('linkedin_url', formData.linkedin_url);
            data.append('current_employer', formData.current_employer);
            data.append('years_experience', formData.years_experience);
            data.append('education_level', formData.education_level);
            data.append('start_date', formData.start_date);
            data.append('salary_expectations', formData.salary_expectations);
            data.append('willing_to_relocate', formData.willing_to_relocate);
            data.append('referral_source', formData.referral_source);
            data.append('portfolio_url', formData.portfolio_url);
            data.append('references', formData.references);
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
            } catch {
                setApplicationStatus('error');
            }
        };

        const inputStyle = {
            padding: '0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            color: 'white',
            width: '100%'
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
                        maxWidth: '650px',
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

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Personal Information */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Personal Information</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <input
                                            placeholder="Full Name *"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            style={inputStyle}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email Address *"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            style={inputStyle}
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number *"
                                            required
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

                                {/* Work Authorization */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Work Authorization</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Are you legally authorized to work in the United States? *
                                            </label>
                                            <select
                                                required
                                                value={formData.work_authorized}
                                                onChange={e => setFormData({ ...formData, work_authorized: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Will you now or in the future require sponsorship for employment visa status? *
                                            </label>
                                            <select
                                                required
                                                value={formData.requires_sponsorship}
                                                onChange={e => setFormData({ ...formData, requires_sponsorship: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Voluntary Self-Identification */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Voluntary Self-Identification</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                                        The following information is requested for compliance with federal Equal Employment Opportunity recordkeeping and reporting requirements. Providing this information is voluntary and will not affect your application or employment. This information will be kept confidential and used only for compliance purposes.
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Veteran Status
                                            </label>
                                            <select
                                                value={formData.veteran_status}
                                                onChange={e => setFormData({ ...formData, veteran_status: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="protected_veteran">I am a protected veteran</option>
                                                <option value="not_veteran">I am not a protected veteran</option>
                                                <option value="prefer_not_to_say">I don't wish to answer</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Disability Status
                                            </label>
                                            <select
                                                value={formData.disability_status}
                                                onChange={e => setFormData({ ...formData, disability_status: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="yes">Yes, I have a disability</option>
                                                <option value="no">No, I don't have a disability</option>
                                                <option value="prefer_not_to_say">I don't wish to answer</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Gender
                                            </label>
                                            <select
                                                value={formData.gender}
                                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="non_binary">Non-binary</option>
                                                <option value="prefer_not_to_say">Prefer not to say</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Race/Ethnicity
                                            </label>
                                            <select
                                                value={formData.race_ethnicity}
                                                onChange={e => setFormData({ ...formData, race_ethnicity: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="hispanic_latino">Hispanic or Latino</option>
                                                <option value="white">White (Not Hispanic or Latino)</option>
                                                <option value="black">Black or African American (Not Hispanic or Latino)</option>
                                                <option value="native_hawaiian">Native Hawaiian or Other Pacific Islander (Not Hispanic or Latino)</option>
                                                <option value="asian">Asian (Not Hispanic or Latino)</option>
                                                <option value="american_indian">American Indian or Alaska Native (Not Hispanic or Latino)</option>
                                                <option value="two_or_more">Two or More Races (Not Hispanic or Latino)</option>
                                                <option value="prefer_not_to_say">Prefer not to say</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Background */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Professional Background</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <input
                                            type="url"
                                            placeholder="LinkedIn Profile URL"
                                            value={formData.linkedin_url}
                                            onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                                            style={inputStyle}
                                        />
                                        <input
                                            placeholder="Current/Most Recent Employer"
                                            value={formData.current_employer}
                                            onChange={e => setFormData({ ...formData, current_employer: e.target.value })}
                                            style={inputStyle}
                                        />
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Years of Professional Experience
                                            </label>
                                            <select
                                                value={formData.years_experience}
                                                onChange={e => setFormData({ ...formData, years_experience: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="0-1">Less than 1 year</option>
                                                <option value="1-3">1-3 years</option>
                                                <option value="3-5">3-5 years</option>
                                                <option value="5-10">5-10 years</option>
                                                <option value="10+">10+ years</option>
                                            </select>
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="Portfolio/Personal Website URL (Optional)"
                                            value={formData.portfolio_url}
                                            onChange={e => setFormData({ ...formData, portfolio_url: e.target.value })}
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

                                {/* Education & Availability */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Education & Availability</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Highest Education Level
                                            </label>
                                            <select
                                                value={formData.education_level}
                                                onChange={e => setFormData({ ...formData, education_level: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="high_school">High School Diploma/GED</option>
                                                <option value="associate">Associate Degree</option>
                                                <option value="bachelor">Bachelor's Degree</option>
                                                <option value="master">Master's Degree</option>
                                                <option value="doctorate">Doctorate/PhD</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Earliest Start Date
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.start_date}
                                                onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                                style={inputStyle}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Compensation & Preferences */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Compensation & Preferences</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Salary Expectations (Annual)
                                            </label>
                                            <select
                                                value={formData.salary_expectations}
                                                onChange={e => setFormData({ ...formData, salary_expectations: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="under_50k">Under $50,000</option>
                                                <option value="50k-75k">$50,000 - $75,000</option>
                                                <option value="75k-100k">$75,000 - $100,000</option>
                                                <option value="100k-125k">$100,000 - $125,000</option>
                                                <option value="125k-150k">$125,000 - $150,000</option>
                                                <option value="150k-200k">$150,000 - $200,000</option>
                                                <option value="200k+">$200,000+</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Are you willing to relocate?
                                            </label>
                                            <select
                                                value={formData.willing_to_relocate}
                                                onChange={e => setFormData({ ...formData, willing_to_relocate: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                                <option value="maybe">Maybe</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* How Did You Hear About Us */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>How Did You Hear About Us?</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <select
                                            value={formData.referral_source}
                                            onChange={e => setFormData({ ...formData, referral_source: e.target.value })}
                                            style={inputStyle}
                                        >
                                            <option value="">Select...</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="indeed">Indeed</option>
                                            <option value="company_website">Company Website</option>
                                            <option value="referral">Employee Referral</option>
                                            <option value="job_board">Job Board</option>
                                            <option value="social_media">Social Media</option>
                                            <option value="recruiter">Recruiter</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Additional Information</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                Have you ever been convicted of a felony?
                                            </label>
                                            <select
                                                value={formData.criminal_history}
                                                onChange={e => setFormData({ ...formData, criminal_history: e.target.value })}
                                                style={inputStyle}
                                            >
                                                <option value="">Select...</option>
                                                <option value="true">Yes</option>
                                                <option value="false">No</option>
                                            </select>
                                        </div>
                                        {formData.criminal_history === 'true' && (
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                    Please explain
                                                </label>
                                                <textarea
                                                    rows="3"
                                                    value={formData.criminal_history_explanation}
                                                    onChange={e => setFormData({ ...formData, criminal_history_explanation: e.target.value })}
                                                    style={inputStyle}
                                                    placeholder="Please provide details..."
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Resume & Cover Letter */}
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Resume & Cover Letter</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

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
        <div className="container section-padding" style={{ position: 'relative' }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(0,0,0,0) 70%)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '6rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-hero" style={{ marginBottom: '1.5rem', fontWeight: '800' }}>
                        Join the <span className="text-gradient">Mission</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                        Help us build the future of API security. We are looking for passionate, curious, and driven individuals to join our global team and make the digital world safer.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Button
                            variant="primary"
                            onClick={() => window.open('https://resilientprivacy.notion.site/Resilient-Privacy-Careers-24b57ead966880b9b019f3d65c3e3efe?source=copy_link', '_blank')}
                        >
                            View Open Roles
                        </Button>
                    </div>
                </motion.div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '6rem'
            }}>
                {[
                    { icon: <Shield size={40} color="var(--primary)" />, title: 'Impact', desc: 'Protect millions of users and critical infrastructure from evolving cyber threats.' },
                    { icon: <Code size={40} color="var(--secondary)" />, title: 'Innovation', desc: 'Work with cutting-edge AI and security technologies to solve complex problems.' },
                    { icon: <Briefcase size={40} color="var(--primary)" />, title: 'Growth', desc: 'Accelerate your career with continuous learning, mentorship, and ownership.' },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '3rem 2rem',
                            borderRadius: '16px',
                            border: '1px solid var(--border-color)',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {item.icon}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <h2 className="text-h2">Open Positions</h2>
            </div>

            {jobs.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '6rem 2rem',
                    color: 'var(--text-muted)',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)'
                }}>
                    <div style={{ marginBottom: '1.5rem', opacity: 0.5 }}><Briefcase size={48} /></div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Explore Opportunities</h3>
                    <p style={{ marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                        Browse our latest openings and find your next role with us.
                    </p>
                    <Button
                        variant="primary"
                        onClick={() => window.open('https://resilientprivacy.notion.site/Resilient-Privacy-Careers-24b57ead966880b9b019f3d65c3e3efe?source=copy_link', '_blank')}
                    >
                        View All Open Positions
                    </Button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {jobs.map((job) => (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.04)' }}
                            style={{
                                background: 'rgba(255,255,255,0.02)',
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onClick={() => handleApply(job)}
                        >
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', fontWeight: '600' }}>{job.title}</h3>
                                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem', alignItems: 'center' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Briefcase size={16} /> {job.department}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }} /> {job.location}</span>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        background: 'rgba(124, 58, 237, 0.1)',
                                        color: 'var(--primary)',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        border: '1px solid rgba(124, 58, 237, 0.2)'
                                    }}>
                                        {job.type}
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" onClick={(e) => { e.stopPropagation(); handleApply(job); }}>Apply Now</Button>
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
