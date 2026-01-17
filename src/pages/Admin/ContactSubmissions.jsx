import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Search, Filter, Building, Phone, Eye, CheckCircle } from 'lucide-react';

const ContactSubmissions = () => {
    const [messages, setMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

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

    const updateStatus = async (id, newStatus) => {
        const token = localStorage.getItem('token');
        try {
            await fetch(`/api/contact/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            fetchMessages();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Filter and sort messages
    let filteredMessages = messages.filter(msg => {
        const matchesSearch =
            msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (msg.company && msg.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
            msg.message.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || msg.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Sort messages
    filteredMessages = filteredMessages.sort((a, b) => {
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

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="text-h2" style={{ marginBottom: '0.5rem' }}>Contact Messages</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''} found
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
                            placeholder="Search by name, email, company, subject, or message..."
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
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
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

            {/* Messages Grid */}
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {filteredMessages.length > 0 ? (
                    filteredMessages.map(msg => (
                        <div key={msg.id} style={{
                            background: 'var(--bg-card)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: `1px solid ${msg.status === 'new' ? 'var(--primary)' : 'var(--border-color)'}`,
                            position: 'relative'
                        }}>
                            {/* Status Badge */}
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                <select
                                    value={msg.status || 'new'}
                                    onChange={(e) => updateStatus(msg.id, e.target.value)}
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
                                    <option value="read">Read</option>
                                    <option value="replied">Replied</option>
                                </select>
                            </div>

                            {/* Header */}
                            <div style={{ marginBottom: '1rem', paddingRight: '8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
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

                                {/* Company and Phone */}
                                <div style={{ display: 'flex', gap: '2rem', marginLeft: '3.5rem', marginTop: '0.5rem' }}>
                                    {msg.company && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            <Building size={14} />
                                            {msg.company}
                                        </div>
                                    )}
                                    {msg.phone && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            <Phone size={14} />
                                            {msg.phone}
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                        <Calendar size={14} />
                                        {new Date(msg.created_at).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Message Content */}
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
                    ))
                ) : (
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '3rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        textAlign: 'center',
                        color: 'var(--text-muted)'
                    }}>
                        <Mail size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <p>No messages found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactSubmissions;
