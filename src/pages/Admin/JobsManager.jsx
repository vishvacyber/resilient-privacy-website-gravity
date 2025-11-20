import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import Button from '../../components/Button';

const JobsManager = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: ''
    });

    const fetchJobs = async () => {
        try {
            const res = await fetch('/api/jobs');
            const data = await res.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const payload = {
            ...formData,
            requirements: formData.requirements.split('\n').filter(r => r.trim())
        };

        try {
            if (editingJob) {
                await fetch(`/api/jobs/${editingJob.id}`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify(payload)
                });
            } else {
                await fetch('/api/jobs', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(payload)
                });
            }
            setIsModalOpen(false);
            setEditingJob(null);
            setFormData({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' });
            fetchJobs();
        } catch (error) {
            console.error('Error saving job:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        const token = localStorage.getItem('token');
        try {
            await fetch(`/api/jobs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchJobs();
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const openEditModal = (job) => {
        setEditingJob(job);
        setFormData({
            ...job,
            requirements: job.requirements.join('\n')
        });
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <h1 className="text-h2">Jobs Manager</h1>
                <Button variant="primary" onClick={() => {
                    setEditingJob(null);
                    setFormData({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' });
                    setIsModalOpen(true);
                }}>
                    <Plus size={20} style={{ marginRight: '0.5rem' }} />
                    Add Job
                </Button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {jobs.map(job => (
                    <div key={job.id} style={{
                        background: 'var(--bg-card)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{job.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                {job.department} • {job.location} • {job.type}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => openEditModal(job)} style={{ padding: '0.5rem', color: 'var(--primary)', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px' }}>
                                <Edit size={18} />
                            </button>
                            <button onClick={() => handleDelete(job.id)} style={{ padding: '0.5rem', color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', borderRadius: '6px' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '12px',
                        width: '90%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{ marginBottom: '1.5rem' }}>{editingJob ? 'Edit Job' : 'Add New Job'}</h2>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                placeholder="Job Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                                required
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    placeholder="Department"
                                    value={formData.department}
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                    style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                                    required
                                />
                                <input
                                    placeholder="Location"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                                    required
                                />
                            </div>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white' }}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Remote">Remote</option>
                            </select>
                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white', minHeight: '100px' }}
                                required
                            />
                            <textarea
                                placeholder="Requirements (one per line)"
                                value={formData.requirements}
                                onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                                style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'white', minHeight: '100px' }}
                                required
                            />
                            <Button variant="primary" type="submit">Save Job</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobsManager;
