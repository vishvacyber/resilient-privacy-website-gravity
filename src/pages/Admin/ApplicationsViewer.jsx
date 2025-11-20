import React, { useState, useEffect } from 'react';
import { Download, Search } from 'lucide-react';

const ApplicationsViewer = () => {
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('/api/applications', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setApplications(data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const filteredApps = applications.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.job_title && app.job_title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h1 className="text-h2">Applications</h1>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '0.75rem 1rem 0.75rem 2.5rem',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            color: 'var(--text-main)',
                            outline: 'none',
                            width: '300px'
                        }}
                    />
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Candidate</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Job Role</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Contact</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date</th>
                            <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApps.map(app => (
                            <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 'bold' }}>{app.name}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        color: '#3b82f6',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '100px',
                                        fontSize: '0.85rem'
                                    }}>
                                        {app.job_title || 'Unknown Job'}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontSize: '0.9rem' }}>{app.email}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{app.phone}</div>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                                    {new Date(app.created_at).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {app.resume_path ? (
                                        <a
                                            href={`/${app.resume_path}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: 'var(--primary)',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <Download size={16} />
                                            Download
                                        </a>
                                    ) : (
                                        <span style={{ color: 'var(--text-muted)' }}>No Resume</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsViewer;
