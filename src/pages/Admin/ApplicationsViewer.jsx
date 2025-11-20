import React, { useState, useEffect } from 'react';
import { Download, Search, Filter, ChevronDown, Eye, CheckCircle, XCircle } from 'lucide-react';

const ApplicationsViewer = () => {
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterJob, setFilterJob] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const [appsRes, jobsRes] = await Promise.all([
                fetch('/api/applications', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/jobs')
            ]);
            const appsData = await appsRes.json();
            const jobsData = await jobsRes.json();
            setApplications(appsData);
            setJobs(jobsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateStatus = async (id, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            await fetch(`/api/applications/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Filter and sort applications
    let filteredApps = applications.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (app.job_title && app.job_title.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
        const matchesJob = filterJob === 'all' || app.job_id === parseInt(filterJob);

        return matchesSearch && matchesStatus && matchesJob;
    });

    // Sort applications
    filteredApps = filteredApps.sort((a, b) => {
        switch (sortBy) {
            case 'date-desc':
                return new Date(b.created_at) - new Date(a.created_at);
            case 'date-asc':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    const getStatusBadge = (status) => {
        const statusConfig = {
            'new': { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', label: 'New' },
            'reviewed': { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', label: 'Reviewed' },
            'interview': { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', label: 'Interview' },
            'rejected': { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Rejected' },
            'hired': { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', label: 'Hired' }
        };
        const config = statusConfig[status] || statusConfig['new'];

        return (
            <span style={{
                background: config.bg,
                color: config.color,
                padding: '0.25rem 0.75rem',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: '500'
            }}>
                {config.label}
            </span>
        );
    };

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="text-h2" style={{ marginBottom: '0.5rem' }}>Applications</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {filteredApps.length} application{filteredApps.length !== 1 ? 's' : ''} found
                </p>
            </div>

            {/* Search and Filters */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {/* Search */}
                    <div style={{ position: 'relative', flex: '1 1 300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or job..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                color: 'var(--text-main)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: showFilters ? 'var(--primary)' : 'var(--bg-card)',
                            border: `1px solid ${showFilters ? 'var(--primary)' : 'var(--border-color)'}`,
                            borderRadius: '8px',
                            color: showFilters ? 'white' : 'var(--text-main)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Filter size={18} />
                        Filters
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        {/* Status Filter */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                Status
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'var(--bg-dark)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            >
                                <option value="all">All Statuses</option>
                                <option value="new">New</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="interview">Interview</option>
                                <option value="rejected">Rejected</option>
                                <option value="hired">Hired</option>
                            </select>
                        </div>

                        {/* Job Filter */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                Job Position
                            </label>
                            <select
                                value={filterJob}
                                onChange={(e) => setFilterJob(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'var(--bg-dark)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            >
                                <option value="all">All Jobs</option>
                                {jobs.map(job => (
                                    <option key={job.id} value={job.id}>{job.title}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'var(--bg-dark)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            >
                                <option value="date-desc">Newest First</option>
                                <option value="date-asc">Oldest First</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Applications Table */}
            <div style={{ overflowX: 'auto', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '500' }}>Candidate</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '500' }}>Job Role</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '500' }}>Contact</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '500' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '500' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: '500' }}>Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApps.length > 0 ? (
                            filteredApps.map(app => (
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
                                    <td style={{ padding: '1rem' }}>
                                        <select
                                            value={app.status || 'new'}
                                            onChange={(e) => updateStatus(app.id, e.target.value)}
                                            style={{
                                                padding: '0.5rem',
                                                background: 'var(--bg-dark)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '6px',
                                                color: 'var(--text-main)',
                                                fontSize: '0.875rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="new">New</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="interview">Interview</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="hired">Hired</option>
                                        </select>
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No applications found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsViewer;
