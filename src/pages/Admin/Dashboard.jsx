import React, { useState, useEffect } from 'react';
import { Briefcase, FileText, MessageSquare, Activity, TrendingUp, Users, Clock } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        jobs: 0,
        applications: 0,
        messages: 0,
        newApplications: 0,
        unreadMessages: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };

        try {
            const [jobsRes, appsRes, msgsRes, activityRes] = await Promise.all([
                fetch('/api/jobs'),
                fetch('/api/applications', { headers }),
                fetch('/api/contact', { headers }),
                fetch('/api/activity-logs?limit=10', { headers })
            ]);

            const jobs = await jobsRes.json();
            const apps = await appsRes.json();
            const msgs = await msgsRes.json();
            const activityData = await activityRes.json();

            // Calculate stats
            const newApps = apps.filter(app => app.status === 'new').length;
            const unreadMsgs = msgs.filter(msg => msg.status === 'new').length;

            setStats({
                jobs: jobs.length,
                applications: apps.length,
                messages: msgs.length,
                newApplications: newApps,
                unreadMessages: unreadMsgs
            });

            setRecentActivity(activityData.logs || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
        <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', opacity: 0.1 }}>
                <Icon size={80} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                        background: `rgba(${color}, 0.1)`,
                        padding: '0.75rem',
                        borderRadius: '8px',
                        color: `rgb(${color})`
                    }}>
                        <Icon size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{title}</p>
                        <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</h3>
                    </div>
                </div>
                {subtitle && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{subtitle}</p>
                )}
                {trend && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <TrendingUp size={16} color="#22c55e" />
                        <span style={{ color: '#22c55e', fontSize: '0.875rem' }}>{trend}</span>
                    </div>
                )}
            </div>
        </div>
    );

    const ActivityItem = ({ activity }) => {
        const getActionColor = (actionType) => {
            switch (actionType) {
                case 'create': return '#22c55e';
                case 'update': return '#3b82f6';
                case 'delete': return '#ef4444';
                case 'login': return '#8b5cf6';
                default: return 'var(--text-muted)';
            }
        };

        const formatTime = (timestamp) => {
            const date = new Date(timestamp);
            const now = new Date();
            const diff = now - date;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (minutes < 1) return 'Just now';
            if (minutes < 60) return `${minutes}m ago`;
            if (hours < 24) return `${hours}h ago`;
            return `${days}d ago`;
        };

        return (
            <div style={{
                padding: '1rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: getActionColor(activity.action_type),
                    flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        <strong>{activity.admin_username}</strong> {activity.action_type} {activity.resource_type}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Clock size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {formatTime(activity.created_at)}
                    </p>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <p style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="text-h2" style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back! Here's what's happening with your platform.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard
                    title="Active Jobs"
                    value={stats.jobs}
                    icon={Briefcase}
                    color="59, 130, 246"
                    subtitle="Currently hiring"
                />
                <StatCard
                    title="Total Applications"
                    value={stats.applications}
                    icon={FileText}
                    color="16, 185, 129"
                    subtitle={`${stats.newApplications} new`}
                    trend={stats.newApplications > 0 ? `${stats.newApplications} pending review` : null}
                />
                <StatCard
                    title="Messages"
                    value={stats.messages}
                    icon={MessageSquare}
                    color="168, 85, 247"
                    subtitle={`${stats.unreadMessages} unread`}
                />
            </div>

            {/* Activity Feed */}
            <div style={{
                background: 'var(--bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden'
            }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Activity size={20} color="var(--primary)" />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Recent Activity</h2>
                    </div>
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {recentActivity.length > 0 ? (
                        recentActivity.map((activity) => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))
                    ) : (
                        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <Activity size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                            <p>No recent activity</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
