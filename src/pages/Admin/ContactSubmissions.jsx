import React, { useState, useEffect } from 'react';
import { Mail, Calendar } from 'lucide-react';

const ContactSubmissions = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('/api/contact', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h1 className="text-h2" style={{ marginBottom: '2rem' }}>Contact Messages</h1>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {messages.map(msg => (
                    <div key={msg.id} style={{
                        background: 'var(--bg-card)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(168, 85, 247, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#a855f7'
                                }}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{msg.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{msg.email}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <Calendar size={16} />
                                {new Date(msg.created_at).toLocaleString()}
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '1rem',
                            borderRadius: '8px',
                            borderLeft: '3px solid var(--primary)'
                        }}>
                            <h4 style={{ marginBottom: '0.5rem', fontWeight: '600' }}>{msg.subject || 'No Subject'}</h4>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactSubmissions;
