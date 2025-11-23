import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, LogOut, Settings, BookOpen } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/jobs', icon: Briefcase, label: 'Jobs' },
        { path: '/admin/applications', icon: FileText, label: 'Applications' },
        { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
        { path: '/admin/services', icon: Settings, label: 'Services' },
        { path: '/admin/documentation', icon: BookOpen, label: 'Documentation' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Sidebar */}
            <div style={{
                width: '250px',
                background: 'var(--bg-card)',
                borderRight: '1px solid var(--border-color)',
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Admin Panel</h2>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '8px',
                                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                    background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        color: '#ff6b6b',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: 'auto'
                    }}
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
