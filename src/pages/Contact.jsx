import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../components/Button';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formState);
        alert('Thank you for your message! We will get back to you shortly.');
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
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Name</label>
                            <input
                                type="text"
                                required
                                style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }}
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
                            <input
                                type="email"
                                required
                                style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }}
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                placeholder="john@company.com"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Message</label>
                            <textarea
                                required
                                rows="5"
                                style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none', resize: 'none' }}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                placeholder="How can we help you?"
                            />
                        </div>
                        <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                            Send Message <Send size={18} />
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
