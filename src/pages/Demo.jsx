import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Send } from 'lucide-react';

const Demo = () => {
    const [formState, setFormState] = useState({ name: '', email: '', company: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! We will contact you shortly to schedule your demo.');
    };

    return (
        <div className="container section-padding">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Request a <span className="text-gradient">Demo</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        See CoreShield™ in action. Fill out the form below and our team will be in touch.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Work Email</label>
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Company</label>
                            <input
                                type="text"
                                required
                                style={{ width: '100%', padding: '1rem', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }}
                                value={formState.company}
                                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                placeholder="Acme Inc."
                            />
                        </div>
                        <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                            Schedule Demo <Send size={18} />
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Demo;
