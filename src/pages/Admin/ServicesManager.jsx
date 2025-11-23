import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/Button';
import { API_ENDPOINTS } from '../../config/api';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [activeCategory, setActiveCategory] = useState('need');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        category: 'need',
        title: '',
        description: '',
        icon_name: 'Shield',
        features: [''],
        highlights: [''],
        badge: '',
        display_order: 0,
        is_active: true
    });

    const categories = [
        { id: 'need', label: 'By Need' },
        { id: 'consulting', label: 'Consulting' },
        { id: 'industry', label: 'Industry' },
        { id: 'platform', label: 'Platform' }
    ];

    useEffect(() => {
        fetchServices();
    }, [activeCategory]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_ENDPOINTS.services}?category=${activeCategory}`);
            const data = await response.json();
            setServices(data);
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Clean up data
        const submitData = {
            ...formData,
            features: formData.features.filter(f => f.trim() !== ''),
            highlights: formData.highlights.filter(h => h.trim() !== '').length > 0
                ? formData.highlights.filter(h => h.trim() !== '')
                : null
        };

        try {
            const url = editingService
                ? API_ENDPOINTS.servicesById(editingService.id)
                : API_ENDPOINTS.services;

            const response = await fetch(url, {
                method: editingService ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setShowModal(false);
                setEditingService(null);
                resetForm();
                fetchServices();
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error saving service:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(API_ENDPOINTS.servicesById(id), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchServices();
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error deleting service:', error);
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({
            category: service.category,
            title: service.title,
            description: service.description,
            icon_name: service.icon_name || 'Shield',
            features: service.features || [''],
            highlights: service.highlights || [''],
            badge: service.badge || '',
            display_order: service.display_order,
            is_active: service.is_active
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            category: activeCategory,
            title: '',
            description: '',
            icon_name: 'Shield',
            features: [''],
            highlights: [''],
            badge: '',
            display_order: 0,
            is_active: true
        });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const removeFeature = (index) => {
        setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
    };

    const updateFeature = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="text-h2">Services Manager</h1>
                <Button variant="primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    <Plus size={20} /> Add Service
                </Button>
            </div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: activeCategory === cat.id ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                            background: activeCategory === cat.id ? 'var(--primary-dim)' : 'var(--bg-card)',
                            color: activeCategory === cat.id ? 'var(--primary)' : 'var(--text-main)',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {services.map(service => (
                        <div key={service.id} style={{
                            background: 'var(--bg-card)',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 className="text-lg">{service.title}</h3>
                                {service.is_active ? <Eye size={16} color="green" /> : <EyeOff size={16} color="gray" />}
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                {service.description.substring(0, 100)}...
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button variant="outline" onClick={() => handleEdit(service)} style={{ flex: 1 }}>
                                    <Edit size={16} /> Edit
                                </Button>
                                <Button variant="outline" onClick={() => handleDelete(service.id)} style={{ color: 'red' }}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}
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
                            {editingService ? 'Edit Service' : 'Add Service'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', minHeight: '100px' }}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label>Features</label>
                                {formData.features.map((feature, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            style={{ flex: 1, padding: '0.5rem' }}
                                        />
                                        <button type="button" onClick={() => removeFeature(index)} style={{ padding: '0.5rem' }}>
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={addFeature} style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
                                    Add Feature
                                </button>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <Button variant="primary" type="submit" style={{ flex: 1 }}>
                                    {editingService ? 'Update' : 'Create'}
                                </Button>
                                <Button variant="outline" onClick={() => { setShowModal(false); setEditingService(null); }} style={{ flex: 1 }}>
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

export default ServicesManager;
