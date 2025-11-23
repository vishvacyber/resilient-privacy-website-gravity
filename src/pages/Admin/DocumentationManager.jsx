import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import Button from '../../components/Button';
import { API_ENDPOINTS } from '../../config/api';

const DocumentationManager = () => {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDoc, setEditingDoc] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        file_path: '',
        category: 'learning-center',
        description: '',
        display_order: 0,
        is_active: true
    });

    useEffect(() => {
        fetchDocs();
    }, []);

    const fetchDocs = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_ENDPOINTS.documentation);
            const data = await response.json();
            setDocs(data);
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error fetching documentation:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const url = editingDoc
                ? API_ENDPOINTS.documentationById(editingDoc.id)
                : API_ENDPOINTS.documentation;

            const response = await fetch(url, {
                method: editingDoc ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowModal(false);
                setEditingDoc(null);
                resetForm();
                fetchDocs();
            } else {
                const error = await response.json();
                alert(error.error || 'Failed to save documentation');
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error saving documentation:', error);
            alert('Failed to save documentation');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this documentation?')) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(API_ENDPOINTS.documentationById(id), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchDocs();
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error deleting documentation:', error);
        }
    };

    const handleEdit = (doc) => {
        setEditingDoc(doc);
        setFormData({
            title: doc.title,
            slug: doc.slug,
            file_path: doc.file_path,
            category: doc.category,
            description: doc.description || '',
            display_order: doc.display_order,
            is_active: doc.is_active
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            file_path: '',
            category: 'learning-center',
            description: '',
            display_order: 0,
            is_active: true
        });
    };

    const generateSlug = (title) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="text-h2">Documentation Manager</h1>
                <Button variant="primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    <Plus size={20} /> Add Documentation
                </Button>
            </div>

            {/* Documentation Table */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ background: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-color)' }}>
                            <tr>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Title</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Slug</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Order</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docs.map(doc => (
                                <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem' }}>{doc.title}</td>
                                    <td style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{doc.slug}</td>
                                    <td style={{ padding: '1rem' }}>{doc.category}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>{doc.display_order}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        {doc.is_active ? (
                                            <span style={{ color: 'green' }}>● Active</span>
                                        ) : (
                                            <span style={{ color: 'gray' }}>○ Inactive</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => window.open(doc.file_path, '_blank')}
                                                style={{
                                                    padding: '0.5rem',
                                                    background: 'var(--bg-dark)',
                                                    border: '1px solid var(--border-color)',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <ExternalLink size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(doc)}
                                                style={{
                                                    padding: '0.5rem',
                                                    background: 'var(--bg-dark)',
                                                    border: '1px solid var(--border-color)',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doc.id)}
                                                style={{
                                                    padding: '0.5rem',
                                                    background: 'var(--bg-dark)',
                                                    border: '1px solid var(--border-color)',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    color: 'red'
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '12px',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <h2 className="text-h3" style={{ marginBottom: '1.5rem' }}>
                            {editingDoc ? 'Edit Documentation' : 'Add Documentation'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData({ ...formData, title: e.target.value });
                                        if (!editingDoc) {
                                            setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                                        }
                                    }}
                                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label>Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label>File Path</label>
                                <input
                                    type="text"
                                    value={formData.file_path}
                                    onChange={(e) => setFormData({ ...formData, file_path: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                    placeholder="/resources/documentation/filename.html"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', minHeight: '80px' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label>Display Order</label>
                                <input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    Active
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <Button variant="primary" type="submit" style={{ flex: 1 }}>
                                    {editingDoc ? 'Update' : 'Create'}
                                </Button>
                                <Button variant="outline" onClick={() => { setShowModal(false); setEditingDoc(null); }} style={{ flex: 1 }}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentationManager;
