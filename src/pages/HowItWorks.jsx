import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Server, Smartphone, Laptop, Database, Code, Lock, Zap,
    CheckCircle, ArrowRight, Activity, Eye, Brain, Layers, Globe,
    AlertTriangle, TrendingUp, Clock, Users, Skull
} from 'lucide-react';
import SEO from '../components/SEO';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

// SVG Connector Component
const PathConnector = ({ d, color, active, blocked, dashed }) => {
    // Extract start/end for anchor dots
    const parts = d.split(/[ ,MLC]/).filter(Boolean);
    const startX = parseFloat(parts[0]);
    const startY = parseFloat(parts[1]);
    const endX = parseFloat(parts[parts.length - 2]);
    const endY = parseFloat(parts[parts.length - 1]);

    return (
        <g>
            {/* Base Path (Dim) */}
            <path
                d={d}
                stroke={active ? color : '#374151'}
                strokeWidth={active ? "4" : "2"}
                fill="none"
                strokeOpacity={active ? 0.3 : 0.2}
                strokeDasharray={dashed ? "5,5" : "none"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Start Anchor Dot */}
            <circle
                cx={startX}
                cy={startY}
                r="6"
                fill={color}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
            />

            {/* End Anchor Dot (Only if not blocked or for the path that gets blocked) */}
            <circle
                cx={endX}
                cy={endY}
                r="6"
                fill={color}
                opacity={blocked ? 0.3 : 1}
                style={{ filter: `drop-shadow(0 0 8px ${color})`, transition: 'opacity 0.3s' }}
            />

            {/* Active Animated Path */}
            {active && (
                <motion.path
                    d={d}
                    stroke={color}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: blocked ? 0.7 : 1,
                        opacity: 1
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 0.1
                    }}
                    style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                />
            )}

            {/* Moving Particle */}
            {active && (
                <circle r="6" fill="#ffffff" stroke={color} strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px #fff)' }}>
                    <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={d}
                        keyPoints={blocked ? "0;0.7" : "0;1"}
                        keyTimes="0;1"
                        calcMode="linear"
                    />
                </circle>
            )}
        </g>
    );
};

const HowItWorks = () => {
    const [isProtected, setIsProtected] = useState(true);
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            // Calculate scale based on 1250px base width (allowing some padding)
            // We clamp it to max 1 so it doesn't blow up on huge screens
            const newScale = Math.min(1, (window.innerWidth - 32) / 1250);
            setScale(newScale);
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const processSteps = [
        {
            number: '01',
            title: 'Request Capture',
            description: 'Every HTTP/HTTPS request is intercepted at the edge before reaching your infrastructure',
            icon: Activity,
            details: ['DNS-level routing', 'TLS termination', 'Protocol validation']
        },
        {
            number: '02',
            title: 'Deep Inspection',
            description: 'Multi-dimensional analysis of headers, payloads, patterns, and behavioral signatures',
            icon: Eye,
            details: ['Payload analysis', 'Pattern matching', 'Behavioral scoring']
        },
        {
            number: '03',
            title: 'Threat Classification',
            description: 'AI models classify threats with confidence scores and risk levels in microseconds',
            icon: Brain,
            details: ['ML classification', 'Risk scoring', 'Threat categorization']
        },
        {
            number: '04',
            title: 'Automated Response',
            description: 'Instant action based on threat level: block, challenge, rate-limit, or allow',
            icon: Shield,
            details: ['Auto-blocking', 'CAPTCHA challenges', 'Rate limiting']
        }
    ];

    const features = [
        {
            icon: Brain,
            title: 'AI-Powered Detection',
            description: 'Machine learning models trained on billions of requests identify threats in real-time',
            metric: '<1ms',
            metricLabel: 'Detection Time',
            color: '#7C3AED'
        },
        {
            icon: Zap,
            title: 'Edge Computing',
            description: 'Distributed globally across 200+ locations for minimal latency',
            metric: '99.99%',
            metricLabel: 'Uptime SLA',
            color: '#D946EF'
        },
        {
            icon: Layers,
            title: 'Multi-Layer Defense',
            description: 'Seven security layers working in parallel for comprehensive protection',
            metric: '7',
            metricLabel: 'Security Layers',
            color: '#06b6d4'
        },
        {
            icon: TrendingUp,
            title: 'Adaptive Learning',
            description: 'Continuously evolving threat models based on global attack patterns',
            metric: '24/7',
            metricLabel: 'Active Learning',
            color: '#10b981'
        }
    ];

    // -- STYLES --
    const sourceCardStyle = {
        background: '#1f2937',
        border: '2px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '200px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 20
    };

    const statBoxStyle = {
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        padding: '0.75rem',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.05)'
    };

    const backendCardStyle = {
        background: '#1f2937',
        padding: '0.75rem 1rem',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        border: '1px solid #374151'
    };

    return (
        <>
            <SEO
                title="How It Works - Resilient Privacy"
                description="Discover the innovative architecture behind Resilient Privacy's AI-powered security platform with real-time threat detection and zero-latency protection."
                keywords="security architecture, AI security, threat detection, edge computing, API protection"
            />

            <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

                {/* Hero Section with Professional Wallarm-Style Animation */}
                <section style={{
                    position: 'relative',
                    paddingTop: 'clamp(6rem, 15vh, 8rem)',
                    paddingBottom: '2rem',
                    background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, var(--bg-dark) 70%)',
                    overflow: 'visible'
                }}>
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{ textAlign: 'center', marginBottom: '5rem' }}
                        >


                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                                fontWeight: '800',
                                marginBottom: '1.5rem',
                                lineHeight: '1.1',
                                letterSpacing: '-0.02em',
                                color: '#ffffff'
                            }}>
                                API Protection in <span className="text-gradient">Real-Time</span>
                            </h1>

                            <p style={{
                                fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                                color: '#9ca3af',
                                maxWidth: '700px',
                                margin: '0 auto',
                                lineHeight: '1.6'
                            }}>
                                Toggle protection to see how our CoreShield intercepts threats instantly.
                            </p>

                            {/* Protection Toggle Switch */}
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                                <span style={{ color: !isProtected ? '#ef4444' : '#6b7280', fontWeight: !isProtected ? 'bold' : 'normal', transition: 'all 0.3s' }}>Protection OFF</span>

                                <button
                                    onClick={() => setIsProtected(!isProtected)}
                                    style={{
                                        width: '64px',
                                        height: '32px',
                                        background: isProtected ? '#10b981' : '#374151',
                                        borderRadius: '50px',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        border: 'none',
                                        transition: 'background 0.3s ease'
                                    }}
                                >
                                    <motion.div
                                        animate={{ x: isProtected ? 32 : 4 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        style={{
                                            width: '24px', height: '24px',
                                            background: 'white',
                                            borderRadius: '50%',
                                            position: 'absolute',
                                            top: '4px',
                                            left: '0',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                        }}
                                    />
                                </button>

                                <span style={{ color: isProtected ? '#10b981' : '#6b7280', fontWeight: isProtected ? 'bold' : 'normal', transition: 'all 0.3s' }}>Protection ON</span>
                            </div>
                        </motion.div>

                        {/* Animation Container - Desktop vs Mobile */}
                        {isMobile ? (
                            // Mobile: Simplified Vertical Flow
                            <div style={{ padding: '2rem 1rem', maxWidth: '400px', margin: '0 auto' }}>
                                {/* Source */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(17, 17, 17, 0.8))',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        border: '1px solid rgba(124, 58, 237, 0.3)',
                                        marginBottom: '1rem'
                                    }}
                                >
                                    <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Traffic Sources</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                            <Smartphone size={20} color="#10b981" />
                                            <span style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '500' }}>Mobile App</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                            <Laptop size={20} color="#3b82f6" />
                                            <span style={{ color: '#3b82f6', fontSize: '0.9rem', fontWeight: '500' }}>Web Client</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                                            <AlertTriangle size={20} color="#ef4444" />
                                            <span style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: '500' }}>Attacker</span>
                                            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', padding: '2px 8px', background: isProtected ? '#ef4444' : '#f59e0b', borderRadius: '10px', color: '#fff', fontWeight: 'bold' }}>
                                                {isProtected ? 'BLOCKED' : 'BYPASSING'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Animated Flow Arrow 1 */}
                                <div style={{ position: 'relative', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="40" height="60" style={{ overflow: 'visible' }}>
                                        <defs>
                                            <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
                                                <stop offset="50%" stopColor="#7C3AED" stopOpacity="1" />
                                                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <line x1="20" y1="0" x2="20" y2="60" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="2" />
                                        <motion.line
                                            x1="20" y1="0" x2="20" y2="60"
                                            stroke="url(#flowGradient1)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, y: -60 }}
                                            animate={{ pathLength: 1, y: 0 }}
                                            transition={{
                                                pathLength: { duration: 1, repeat: Infinity, ease: "linear" },
                                                y: { duration: 1, repeat: Infinity, ease: "linear" }
                                            }}
                                        />
                                        <motion.circle
                                            cx="20"
                                            cy="30"
                                            r="4"
                                            fill="#7C3AED"
                                            initial={{ cy: 0, opacity: 0 }}
                                            animate={{ cy: 60, opacity: [0, 1, 1, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <polygon points="20,55 15,45 25,45" fill="#7C3AED" />
                                    </svg>
                                </div>

                                {/* CoreShield */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        background: 'linear-gradient(145deg, #2e1065, #000000)',
                                        borderRadius: '20px',
                                        padding: '2rem 1.5rem',
                                        border: '1px solid rgba(139, 92, 246, 0.5)',
                                        boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)',
                                        marginBottom: '1rem',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ marginBottom: '1rem' }}>
                                        <img src="/company_logo.jpg" alt="CoreShield" style={{ width: '60px', height: '60px', borderRadius: '12px', margin: '0 auto', display: 'block' }} />
                                    </div>
                                    <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.5rem' }}>CoreShield</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '1rem' }}>Real-time Analysis</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                                            <div style={{ color: '#34d399', fontSize: '0.9rem', fontWeight: 'bold' }}>0.3ms</div>
                                            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Latency</div>
                                        </div>
                                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '8px' }}>
                                            <div style={{ color: '#818cf8', fontSize: '0.9rem', fontWeight: 'bold' }}>99.9%</div>
                                            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Accuracy</div>
                                        </div>
                                    </div>
                                    <AnimatePresence>
                                        {isProtected && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                style={{ marginTop: '1rem', padding: '0.75rem', background: '#ef4444', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                                            >
                                                <Shield size={14} fill="white" /> Threat Intercepted
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Animated Flow Arrow 2 */}
                                <div style={{ position: 'relative', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg width="40" height="60" style={{ overflow: 'visible' }}>
                                        <defs>
                                            <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor={isProtected ? "#10b981" : "#ef4444"} stopOpacity="0" />
                                                <stop offset="50%" stopColor={isProtected ? "#10b981" : "#ef4444"} stopOpacity="1" />
                                                <stop offset="100%" stopColor={isProtected ? "#10b981" : "#ef4444"} stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <line x1="20" y1="0" x2="20" y2="60" stroke={isProtected ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"} strokeWidth="2" />

                                        {/* Show flowing particles only when protected, blocked X when not */}
                                        {isProtected ? (
                                            <>
                                                <motion.circle
                                                    cx="20"
                                                    cy="30"
                                                    r="4"
                                                    fill="#10b981"
                                                    initial={{ cy: 0, opacity: 0 }}
                                                    animate={{ cy: 60, opacity: [0, 1, 1, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                />
                                                <motion.circle
                                                    cx="20"
                                                    cy="30"
                                                    r="4"
                                                    fill="#3b82f6"
                                                    initial={{ cy: 0, opacity: 0 }}
                                                    animate={{ cy: 60, opacity: [0, 1, 1, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                                />
                                            </>
                                        ) : (
                                            <motion.g
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {/* Blocked indicator - Red X */}
                                                <circle cx="20" cy="30" r="12" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
                                                <line x1="14" y1="24" x2="26" y2="36" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                                                <line x1="26" y1="24" x2="14" y2="36" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                                            </motion.g>
                                        )}

                                        <polygon points="20,55 15,45 25,45" fill={isProtected ? "#10b981" : "#ef4444"} />
                                    </svg>
                                </div>

                                {/* Backend */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(17, 17, 17, 0.8))',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        border: '1px solid rgba(124, 58, 237, 0.3)'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600' }}>Protected Backend</h3>
                                        <div style={{
                                            padding: '4px 12px',
                                            background: !isProtected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                            border: !isProtected ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.2)',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            color: !isProtected ? '#ef4444' : '#10b981',
                                            fontWeight: '600'
                                        }}>
                                            {!isProtected ? 'Under Attack' : 'Protected'}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px' }}>
                                            <Database size={18} color="#10b981" />
                                            <div>
                                                <div style={{ color: '#e5e7eb', fontSize: '0.85rem', fontWeight: '500' }}>Authorized Traffic</div>
                                                <div style={{ color: '#6b7280', fontSize: '0.7rem' }}>Mobile API</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px' }}>
                                            <Server size={18} color="#3b82f6" />
                                            <div>
                                                <div style={{ color: '#e5e7eb', fontSize: '0.85rem', fontWeight: '500' }}>Verified Requests</div>
                                                <div style={{ color: '#6b7280', fontSize: '0.7rem' }}>Web Client</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px' }}>
                                            <Code size={18} color="#ef4444" />
                                            <div>
                                                <div style={{ color: '#e5e7eb', fontSize: '0.85rem', fontWeight: '500' }}>Malicious Traffic</div>
                                                <div style={{ color: '#6b7280', fontSize: '0.7rem' }}>{isProtected ? 'Intercepted & Blocked' : 'Compromising System'}</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            // Desktop: 3D Animation
                            <div style={{
                                position: 'relative',
                                height: `${600 * scale}px`,
                                perspective: '2000px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: scale < 0.6 ? '0' : '-4rem',
                                width: '100%',
                                overflow: 'hidden'
                            }}>
                                {/* Main Rotation Group - Wider Spacing */}
                                <div id="animation-container" style={{
                                    position: 'relative',
                                    width: '1200px', // Increased from 1000px for more space
                                    height: '600px',
                                    transformStyle: 'preserve-3d',
                                    transform: `scale(${scale}) rotateX(5deg) rotateY(-5deg)`, // Apply dynamic scale
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {/* SVG Connector Layer - Full Overlay */}
                                    <svg style={{
                                        position: 'absolute',
                                        top: 0, left: 0,
                                        width: '100%', height: '100%',
                                        pointerEvents: 'none',
                                        overflow: 'visible',
                                        zIndex: 10
                                    }}>
                                        {/* Mobile -> Edge (Aligned Y=220 to Y=250) */}
                                        <PathConnector
                                            d="M 192 220 C 300 220, 350 250, 460 250"
                                            color="#10b981"
                                            active={true}
                                        />
                                        {/* Web -> Edge (Aligned Y=300 to Y=300) */}
                                        <PathConnector
                                            d="M 192 300 L 460 300"
                                            color="#3b82f6"
                                            active={true}
                                        />
                                        {/* Threat -> Edge (Aligned Y=380 to Y=350) */}
                                        <PathConnector
                                            d="M 192 380 C 300 380, 350 350, 460 350"
                                            color="#ef4444"
                                            active={true}
                                            blocked={isProtected}
                                        />
                                        {/* Edge -> Backend (Aligned X=740 to X=885) */}
                                        {/* Stream 1: Mobile Passthrough */}
                                        <PathConnector
                                            d="M 740 250 C 800 250, 820 230, 885 230"
                                            color="#10b981"
                                            active={true}
                                            dashed={false}
                                        />
                                        {/* Stream 2: Web Passthrough */}
                                        <PathConnector
                                            d="M 740 300 L 885 326"
                                            color="#3b82f6"
                                            active={true}
                                            dashed={false}
                                        />
                                        {/* Stream 3: Threat Passthrough */}
                                        <PathConnector
                                            d="M 740 350 C 800 350, 820 425, 885 425"
                                            color="#ef4444"
                                            active={!isProtected}
                                            dashed={false}
                                        />
                                    </svg>

                                    {/* LAYER 1: Traffic Sources (Left) - Shifted Left implicit by container width */}
                                    <div style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '50%',
                                        transform: 'translateY(-50%) translateZ(40px)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.5rem',
                                        zIndex: 20
                                    }}>
                                        <div
                                            id="source-card-0"
                                            style={{
                                                ...sourceCardStyle,
                                                borderColor: '#10b981',
                                                boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
                                            }}
                                        >
                                            <div style={{ background: '#10b98120', padding: '0.75rem', borderRadius: '12px' }}>
                                                <Smartphone size={24} color="#10b981" />
                                            </div>
                                            <div>
                                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>Mobile App</div>
                                            </div>
                                        </div>

                                        <div
                                            id="source-card-1"
                                            style={{
                                                ...sourceCardStyle,
                                                borderColor: '#3b82f6',
                                                boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                                            }}
                                        >
                                            <div style={{ background: '#3b82f620', padding: '0.75rem', borderRadius: '12px' }}>
                                                <Laptop size={24} color="#3b82f6" />
                                            </div>
                                            <div>
                                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>Web Client</div>
                                            </div>
                                        </div>

                                        <div
                                            id="source-card-2"
                                            style={{
                                                ...sourceCardStyle,
                                                borderColor: '#ef4444',
                                                boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
                                            }}
                                        >
                                            <div style={{ background: '#ef444420', padding: '0.75rem', borderRadius: '12px' }}>
                                                <AlertTriangle size={24} color="#ef4444" />
                                            </div>
                                            <div>
                                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>Attacker</div>
                                            </div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                style={{
                                                    position: 'absolute', right: '-10px', top: '-10px',
                                                    background: isProtected ? '#ef4444' : '#f59e0b', // Red for Blocked, Orange for Warning/Passing
                                                    color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '10px'
                                                }}
                                            >
                                                {isProtected ? 'BLOCKED' : 'BYPASSING'}
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* LAYER 2: The CoreShield (Center) - Centered in new width */}
                                    <motion.div
                                        id="edge-card"
                                        style={{
                                            position: 'absolute',
                                            left: '50%', // Center horizontally
                                            marginLeft: '-140px', // Half width to truly center
                                            top: '50%',
                                            marginTop: '-210px',
                                            width: '280px',
                                            height: '420px',
                                            background: 'linear-gradient(145deg, #2e1065, #000000)',
                                            borderRadius: '24px',
                                            border: '1px solid rgba(139, 92, 246, 0.5)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transform: 'translateZ(0px)',
                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.2)',
                                            zIndex: 30
                                        }}
                                    >
                                        {/* Glass sheen */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 40%)',
                                            borderRadius: '24px',
                                            pointerEvents: 'none'
                                        }} />

                                        {/* Top Label */}
                                        <div style={{
                                            position: 'absolute', top: '20px',
                                            color: 'rgba(255,255,255,0.4)',
                                            fontSize: '0.65rem', fontWeight: '600', letterSpacing: '1px'
                                        }}>
                                            EDGE.RESILIENTPRIVACY.COM
                                        </div>

                                        {/* Central Logo - Replaced Shield */}
                                        <motion.div
                                            style={{
                                                marginBottom: '1.5rem',
                                                boxShadow: '0 10px 25px rgba(124, 58, 237, 0.4)',
                                                borderRadius: '16px',
                                                overflow: 'hidden',
                                                background: '#fff'
                                            }}
                                        >
                                            <img
                                                src="/company_logo.jpg"
                                                alt="Resilient Privacy"
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    objectFit: 'cover',
                                                    display: 'block'
                                                }}
                                            />
                                        </motion.div>

                                        <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                                            CoreShield
                                        </h3>
                                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                                            Real-time Analysis
                                        </p>

                                        {/* Stats Grid */}
                                        <div style={{
                                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem',
                                            width: '85%', marginTop: '2rem'
                                        }}>
                                            <div style={statBoxStyle}>
                                                <div style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: 'bold' }}>0.3ms</div>
                                                <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Latency</div>
                                            </div>
                                            <div style={statBoxStyle}>
                                                <div style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: 'bold' }}>99.9%</div>
                                                <div style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Accuracy</div>
                                            </div>

                                            {/* Threat Blocked Toast */}
                                            <AnimatePresence>
                                                {isProtected && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        style={{
                                                            gridColumn: 'span 2',
                                                            marginTop: '10px',
                                                            padding: '0.5rem', background: '#ef4444', borderRadius: '8px',
                                                            color: 'white', fontSize: '0.75rem', fontWeight: '600',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                                                        }}
                                                    >
                                                        <Shield size={12} fill="white" /> Threat Intercepted
                                                    </motion.div>
                                                )}
                                                {!isProtected && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        style={{
                                                            gridColumn: 'span 2',
                                                            marginTop: '10px',
                                                            padding: '0.5rem', background: '#f59e0b', borderRadius: '8px',
                                                            color: 'white', fontSize: '0.75rem', fontWeight: '600',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                                                        }}
                                                    >
                                                        <AlertTriangle size={12} fill="white" /> Protection Inactive
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* CoreShield Content... Removed DOM dots as they are now in SVG */}


                                    </motion.div>

                                    {/* LAYER 3: Protected Backend (Right) */}
                                    <div id="backend-container" style={{
                                        position: 'absolute',
                                        right: '0',
                                        top: '50%',
                                        marginTop: '-190px', // Half height
                                        width: '300px',
                                        height: '380px',
                                        background: '#111827',
                                        borderRadius: '24px',
                                        border: '1px solid #374151',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '1.5rem',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                        transform: 'translateZ(-40px)',
                                        zIndex: 20
                                    }}>
                                        {/* Backend Domain Info... Removed DOM dots as they are now in SVG */}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                            <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>your.domain.com</div>
                                            <div style={{
                                                padding: '4px 12px',
                                                background: !isProtected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                border: !isProtected ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.2)',
                                                borderRadius: '20px',
                                                display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem',
                                                color: !isProtected ? '#ef4444' : '#10b981',
                                                transition: 'all 0.3s'
                                            }}>
                                                <div className={`w-2 h-2 rounded-full ${!isProtected ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
                                                {!isProtected ? 'Under Attack' : 'Protected'}
                                            </div>
                                        </div>

                                        {/* Backend Services */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                                            <div id="backend-card-0" style={backendCardStyle}>
                                                <Database size={20} className="text-green-400" />
                                                <div>
                                                    <div style={{ color: '#e5e7eb', fontSize: '0.9rem', fontWeight: '500' }}>Authorized Traffic</div>
                                                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>Mobile API</div>
                                                </div>
                                            </div>
                                            <div id="backend-card-1" style={backendCardStyle}>
                                                <Server size={20} className="text-blue-400" />
                                                <div>
                                                    <div style={{ color: '#e5e7eb', fontSize: '0.9rem', fontWeight: '500' }}>Verified Requests</div>
                                                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>Web Client</div>
                                                </div>
                                            </div>
                                            <div id="backend-card-2" style={backendCardStyle}>
                                                <Code size={20} className="text-red-400" />
                                                <div>
                                                    <div style={{ color: '#e5e7eb', fontSize: '0.9rem', fontWeight: '500' }}>Malicious Traffic</div>
                                                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{isProtected ? 'Intercepted & Blocked' : 'Compromising System'}</div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        )}


                    </div>
                </section>

                {/* Protection Process */}
                <section style={{
                    position: 'relative',
                    padding: '6rem 0',
                    background: 'linear-gradient(180deg, transparent 0%, rgba(124, 58, 237, 0.05) 50%, transparent 100%)'
                }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{
                                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                fontWeight: '800',
                                marginBottom: '1rem',
                                background: 'linear-gradient(135deg, #ffffff, #7C3AED)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Four-Phase Protection Pipeline
                            </h2>
                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                color: 'var(--text-muted)',
                                maxWidth: '700px',
                                margin: '0 auto'
                            }}>
                                Every request flows through our intelligent security pipeline in microseconds
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2rem',
                            position: 'relative'
                        }}>
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    style={{
                                        background: 'rgba(17, 17, 17, 0.6)',
                                        backdropFilter: 'blur(20px)',
                                        padding: '2.5rem',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(124, 58, 237, 0.2)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={() => setHoveredFeature(index)}
                                    onMouseLeave={() => setHoveredFeature(null)}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '-30px',
                                        right: '-30px',
                                        fontSize: '10rem',
                                        fontWeight: 'bold',
                                        color: 'rgba(124, 58, 237, 0.05)',
                                        lineHeight: 1,
                                        userSelect: 'none'
                                    }}>
                                        {step.number}
                                    </div>

                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{
                                            width: '70px',
                                            height: '70px',
                                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '1.5rem',
                                            boxShadow: hoveredFeature === index ? 'var(--accent-glow)' : 'none',
                                            transition: 'box-shadow 0.3s ease'
                                        }}>
                                            <step.icon size={36} color="#ffffff" />
                                        </div>

                                        <h3 style={{
                                            fontSize: '1.5rem',
                                            fontWeight: '700',
                                            marginBottom: '1rem',
                                            color: 'var(--text-main)'
                                        }}>
                                            {step.title}
                                        </h3>

                                        <p style={{
                                            color: 'var(--text-muted)',
                                            lineHeight: '1.7',
                                            marginBottom: '1.5rem'
                                        }}>
                                            {step.description}
                                        </p>

                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem'
                                        }}>
                                            {step.details.map((detail) => (
                                                <div
                                                    key={detail}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        fontSize: '0.9rem',
                                                        color: 'var(--text-muted)'
                                                    }}
                                                >
                                                    <CheckCircle size={16} color="var(--primary)" />
                                                    {detail}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Key Features */}
                <section style={{
                    position: 'relative',
                    padding: '6rem 0'
                }}>
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{
                                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                fontWeight: '800',
                                marginBottom: '1rem',
                                background: 'linear-gradient(135deg, #ffffff, #D946EF)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                What Makes Us Different
                            </h2>
                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                color: 'var(--text-muted)'
                            }}>
                                Enterprise-grade security with developer-first experience
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2rem'
                        }}>
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    style={{
                                        background: 'rgba(17, 17, 17, 0.6)',
                                        backdropFilter: 'blur(20px)',
                                        padding: '2.5rem',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        textAlign: 'center',
                                        transition: 'transform 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '4px',
                                        background: `linear-gradient(90deg, ${feature.color}, transparent)`
                                    }} />

                                    <div style={{
                                        width: '90px',
                                        height: '90px',
                                        background: `${feature.color}15`,
                                        borderRadius: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                        border: `2px solid ${feature.color}30`
                                    }}>
                                        <feature.icon size={44} color={feature.color} />
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '700',
                                        marginBottom: '1rem',
                                        color: 'var(--text-main)'
                                    }}>
                                        {feature.title}
                                    </h3>

                                    <p style={{
                                        color: 'var(--text-muted)',
                                        lineHeight: '1.7',
                                        marginBottom: '1.5rem'
                                    }}>
                                        {feature.description}
                                    </p>

                                    <div style={{
                                        padding: '1rem',
                                        background: `${feature.color}10`,
                                        borderRadius: '12px',
                                        border: `1px solid ${feature.color}30`
                                    }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            fontWeight: 'bold',
                                            color: feature.color,
                                            marginBottom: '0.25rem'
                                        }}>
                                            {feature.metric}
                                        </div>
                                        <div style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--text-muted)'
                                        }}>
                                            {feature.metricLabel}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={{
                    position: 'relative',
                    padding: '6rem 0',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(217, 70, 239, 0.1))',
                    borderTop: '1px solid rgba(124, 58, 237, 0.2)',
                    borderBottom: '1px solid rgba(124, 58, 237, 0.2)'
                }}>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 style={{
                                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                                fontWeight: '800',
                                marginBottom: '1.5rem'
                            }}>
                                Ready to Experience<br />
                                <span className="text-gradient">Next-Gen Security?</span>
                            </h2>
                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                                color: 'var(--text-muted)',
                                marginBottom: '3rem',
                                maxWidth: '600px',
                                margin: '0 auto 3rem'
                            }}>
                                See how Resilient Privacy protects applications like yours with a personalized demo
                            </p>
                            <div style={{
                                display: 'flex',
                                gap: '1.5rem',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                <Link to="/demo">
                                    <Button variant="primary" style={{
                                        padding: '1.25rem 3rem',
                                        fontSize: '1.1rem',
                                        boxShadow: 'var(--accent-glow)'
                                    }}>
                                        Schedule Demo
                                    </Button>
                                </Link>
                                <Link to="/products">
                                    <Button variant="secondary" style={{
                                        padding: '1.25rem 3rem',
                                        fontSize: '1.1rem'
                                    }}>
                                        Explore Products
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HowItWorks;
