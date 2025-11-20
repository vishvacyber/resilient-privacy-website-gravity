import React, { useState, useEffect } from 'react';
import { Briefcase, FileText, MessageSquare } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        jobs: 0,
        applications: 0,
        messages: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

            try {
                const [jobsRes, appsRes, msgsRes] = await Promise.all([
                    fetch('/api/jobs'),
                    fetch('/api/applications', { headers }),
                    fetch('/api/contact', { headers })
                ]);

                const jobs = await jobsRes.json();
                const apps = await appsRes.json();
                const msgs = await msgsRes.json();

                setStats({
                    jobs: jobs.length,
                    applications: apps.length,
                    messages: msgs.length
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
        }}>
            <div style={{
                background: `rgba(${color}, 0.1)`,
                padding: '1rem',
                borderRadius: '12px',
                color: `rgb(${color})`
            }}>
                <Icon size={32} />
            </div>
            <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{value}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{title}</p>
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-h2" style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <StatCard
                    title="Active Jobs"
                    value={stats.jobs}
                    icon={Briefcase}
                    color="59, 130, 246" // Blue
                />
                <StatCard
                    title="Total Applications"
                    value={stats.applications}
                    icon={FileText}
                    color="16, 185, 129" // Green
                />
                <StatCard
                    title="Messages"
                    value={stats.messages}
                    icon={MessageSquare}
                    color="168, 85, 247" // Purple
                />
            </div>
        </div>
    );
};

export default Dashboard;
