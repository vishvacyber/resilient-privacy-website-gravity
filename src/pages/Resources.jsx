import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Video, Mic } from 'lucide-react';

const Resources = () => {
    return (
        <div className="container section-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Resources</h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                    Stay updated with the latest in API security, whitepapers, and webinars.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[
                    { icon: <FileText size={40} color="var(--primary)" />, title: 'Whitepapers', desc: 'Deep dives into API security trends and best practices.' },
                    { icon: <Video size={40} color="var(--secondary)" />, title: 'Webinars', desc: 'Watch our experts discuss the latest threats and solutions.' },
                    { icon: <Mic size={40} color="var(--primary)" />, title: 'Podcasts', desc: 'Listen to industry leaders discuss the future of cybersecurity.' },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}
                    >
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
