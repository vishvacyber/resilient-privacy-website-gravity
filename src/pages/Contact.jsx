import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { validateFormData } from '../utils/validation';
import { sanitizeFormData, checkInputSafety } from '../utils/sanitize';
import SECURITY_CONFIG from '../../security.config';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
    const [honeypot, setHoneypot] = useState(''); // Bot detection
    const lastSubmitTime = useRef(0);

    const handleInputChange = (field, value) => {
        setFormState(prev => ({ ...prev, [field]: value }));
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Bot detection - honeypot field should be empty
        if (honeypot !== '') {
            console.warn('Bot detected - honeypot field filled');
            return;
        }

        // Rate limiting - prevent rapid submissions
        const now = Date.now();
        const timeSinceLastSubmit = now - lastSubmitTime.current;

        if (timeSinceLastSubmit < SECURITY_CONFIG.rateLimiting.formSubmissionCooldown) {
            const waitTime = Math.ceil((SECURITY_CONFIG.rateLimiting.formSubmissionCooldown - timeSinceLastSubmit) / 1000);
            setErrors({
                submit: `Please wait ${waitTime} seconds before submitting again.`
            });
            return;
        }

        // Sanitize inputs
        const sanitizedData = sanitizeFormData(formState);

        // Validate inputs
        const validation = validateFormData(sanitizedData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        // Check for security threats
        const nameCheck = checkInputSafety(sanitizedData.name);
        const messageCheck = checkInputSafety(sanitizedData.message);

        if (!nameCheck.isSafe || !messageCheck.isSafe) {
            setErrors({
                submit: 'Your input contains potentially unsafe content. Please remove any special characters or scripts.'
            });
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sanitizedData)
            });

            console.log('Form submitted (sanitized):', sanitizedData);

            lastSubmitTime.current = Date.now();
            setSubmitStatus('success');
            setFormState({ name: '', email: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setErrors({ submit: 'An error occurred. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container section-padding">
            <div className="grid-cols-2" style={{ gap: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Get in <span className="text-gradient">Touch</span></h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
                        Have questions about our API security solutions? Ready to start your free audit? Reach out to our team of experts.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {[
                            { icon: <Mail size={24} color="var(--primary)" />, title: 'Email Us', value: 'security@resilientprivacy.com' },
                            { icon: <Phone size={24} color="var(--secondary)" />, title: 'Call Us', value: '+1 (555) 123-4567' },
                            { icon: <MapPin size={24} color="var(--primary)" />, title: 'Visit Us', value: '123 Cyber Blvd, Tech City, TC 90210' },
                        ].map((item, index) => (
                            <div key={index} className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
                                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}
                >
                    {submitStatus === 'success' && (
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <CheckCircle size={20} color="#22c55e" />
                            <span style={{ color: '#22c55e' }}>Thank you! We'll get back to you shortly.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Honeypot field - hidden from users, only bots will fill it */}
                        <input
                            type="text"
                            name="website"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            style={{ display: 'none' }}
                            tabIndex="-1"
                            autoComplete="off"
                            aria-hidden="true"
                        />

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                Name <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="text"
                                required
                                maxLength={SECURITY_CONFIG.validation.maxNameLength}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--bg-dark)',
                                    border: `1px solid ${errors.name ? '#ef4444' : 'var(--border-color)'}`,
                                    borderRadius: '4px',
                                    color: 'var(--text-main)',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                value={formState.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="John Doe"
                            />
                            {errors.name && (
                                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <AlertCircle size={16} /> {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                Email <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input
                                type="email"
                                required
                                maxLength={SECURITY_CONFIG.validation.maxEmailLength}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--bg-dark)',
                                    border: `1px solid ${errors.email ? '#ef4444' : 'var(--border-color)'}`,
                                    borderRadius: '4px',
                                    color: 'var(--text-main)',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                value={formState.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="john@company.com"
                            />
                            {errors.email && (
                                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <AlertCircle size={16} /> {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                Message <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <textarea
                                required
                                rows="5"
                                maxLength={SECURITY_CONFIG.validation.maxMessageLength}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--bg-dark)',
                                    border: `1px solid ${errors.message ? '#ef4444' : 'var(--border-color)'}`,
                                    borderRadius: '4px',
                                    color: 'var(--text-main)',
                                    outline: 'none',
                                    resize: 'vertical',
                                    transition: 'border-color 0.2s'
                                }}
                                value={formState.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                placeholder="How can we help you?"
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                {errors.message ? (
                                    <p style={{ color: '#ef4444', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <AlertCircle size={16} /> {errors.message}
                                    </p>
                                ) : (
                                    <span></span>
                                )}
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                    {formState.message.length}/{SECURITY_CONFIG.validation.maxMessageLength}
                                </span>
                            </div>
                        </div>

                        {errors.submit && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '8px',
                                padding: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <AlertCircle size={20} color="#ef4444" />
                                <span style={{ color: '#ef4444' }}>{errors.submit}</span>
                            </div>
                        )}

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                        </Button>

                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                            By submitting this form, you agree to our privacy policy.
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
