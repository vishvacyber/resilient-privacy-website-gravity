import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Code, Lock, Eye, FileCheck, Cpu, Globe, Zap, Search, AlertTriangle, Terminal, Cloud, Heart, DollarSign, ShoppingCart, Database, Layers, Box, GitBranch } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Services = () => {
    const [activeCategory, setActiveCategory] = useState('need');

    const solutionsByNeed = [
        {
            icon: <Search size={48} color="var(--primary)" />,
            title: 'Discover All Assets',
            desc: 'Automatically discover and inventory all APIs, data endpoints, and privacy-sensitive assets across your entire infrastructure.',
            features: ['Complete API discovery', 'Shadow asset detection', 'Data flow mapping', 'Topology visualization']
        },
        {
            icon: <Shield size={48} color="var(--secondary)" />,
            title: 'Detect and Stop Attacks',
            desc: 'Real-time threat detection and automated blocking to stop attacks before they impact your business.',
            features: ['Real-time blocking', 'OWASP Top 10 protection', 'DDoS mitigation', 'Bot detection']
        },
        {
            icon: <AlertTriangle size={48} color="var(--primary)" />,
            title: 'Respond to Incidents',
            desc: 'Streamline incident response with complete visibility, automated workflows, and expert guidance.',
            features: ['24/7 SOC monitoring', 'Automated response', 'Forensics analysis', 'Integration support']
        },
        {
            icon: <FileCheck size={48} color="var(--secondary)" />,
            title: 'Test for Security Issues',
            desc: 'Continuous security testing integrated into your development lifecycle to find vulnerabilities early.',
            features: ['CI/CD integration', 'Automated scanning', 'Compliance testing', 'Remediation guidance']
        },
        {
            icon: <Terminal size={48} color="var(--primary)" />,
            title: 'Conduct Penetration Testing',
            desc: 'Professional penetration testing services to identify weaknesses before attackers do.',
            features: ['External testing', 'Internal assessment', 'Red team exercises', 'Detailed reporting']
        },
        {
            icon: <Cpu size={48} color="var(--secondary)" />,
            title: 'Protect Agentic AI',
            desc: 'Specialized security for AI workloads, LLMs, and autonomous agents against emerging threats.',
            features: ['Model protection', 'Prompt injection prevention', 'AI behavior monitoring', 'Data pipeline security']
        }
    ];

    const solutionsByIndustry = [
        {
            icon: <Code size={48} color="var(--primary)" />,
            title: 'Technology & SaaS',
            desc: 'Security solutions tailored for software companies and SaaS providers with rapid deployment cycles.',
            features: ['API-first security', 'Multi-tenant protection', 'DevSecOps integration', 'Scalable architecture'],
            highlights: ['99.99% uptime SLA', 'Zero-deployment downtime', 'Developer-friendly APIs']
        },
        {
            icon: <Heart size={48} color="var(--secondary)" />,
            title: 'Healthcare',
            desc: 'HIPAA-compliant security solutions protecting sensitive patient data and medical systems.',
            features: ['HIPAA compliance', 'PHI protection', 'Audit logging', 'Access controls'],
            highlights: ['HITRUST certified', 'BAA available', 'Medical device security']
        },
        {
            icon: <DollarSign size={48} color="var(--primary)" />,
            title: 'Financial Services',
            desc: 'Enterprise-grade security meeting the stringent requirements of financial institutions.',
            features: ['PCI DSS compliance', 'Fraud prevention', 'Transaction monitoring', 'Regulatory reporting'],
            highlights: ['SOC 2 Type II', 'PCI Level 1', 'Real-time fraud detection']
        },
        {
            icon: <ShoppingCart size={48} color="var(--secondary)" />,
            title: 'E-Commerce',
            desc: 'Protect customer data and transactions while maintaining seamless shopping experiences.',
            features: ['Payment security', 'Account protection', 'Inventory API security', 'Bot mitigation'],
            highlights: ['Peak traffic handling', 'Cart protection', 'Loyalty program security']
        }
    ];

    const solutionsByPlatform = [
        {
            icon: <Cloud size={48} color="#FF9900" />,
            title: 'Amazon Web Services',
            desc: 'Native integration with AWS services for seamless security across your cloud infrastructure.',
            features: ['VPC integration', 'Lambda protection', 'API Gateway security', 'CloudFormation templates'],
            badge: 'AWS Advanced Partner'
        },
        {
            icon: <Cloud size={48} color="#4285F4" />,
            title: 'Google Cloud Platform',
            desc: 'Protect GCP workloads with native integrations and optimized performance.',
            features: ['GKE security', 'Cloud Run protection', 'Apigee integration', 'Deployment Manager support'],
            badge: 'GCP Partner'
        },
        {
            icon: <Cloud size={48} color="#0078D4" />,
            title: 'Microsoft Azure',
            desc: 'Comprehensive security for Azure environments with native tooling support.',
            features: ['AKS protection', 'Azure Functions security', 'API Management integration', 'ARM templates'],
            badge: 'Azure Certified'
        },
        {
            icon: <Server size={48} color="var(--primary)" />,
            title: 'Kubernetes',
            desc: 'Cloud-native security designed specifically for Kubernetes environments.',
            features: ['Helm charts', 'Ingress controller', 'Service mesh integration', 'Pod-level security'],
            badge: 'CNCF Member'
        },
        {
            icon: <Layers size={48} color="var(--secondary)" />,
            title: 'Kong Gateway',
            desc: 'Seamless integration with Kong for enhanced API gateway security.',
            features: ['Plugin architecture', 'Rate limiting', 'Authentication', 'Traffic control'],
            badge: 'Kong Certified'
        },
        {
            icon: <GitBranch size={48} color="var(--primary)" />,
            title: 'MuleSoft',
            desc: 'Protect MuleSoft APIs and integration flows with enterprise-grade security.',
            features: ['Anypoint integration', 'Policy enforcement', 'Threat protection', 'Analytics'],
            badge: 'MuleSoft Partner'
        }
    ];

    const consultingServices = [
        {
            icon: <Shield size={48} color="var(--primary)" />,
            title: 'SOC as a Service',
            desc: '24/7 Security Operations Center providing continuous monitoring, threat detection, and incident response.',
            features: ['24/7 monitoring', 'Threat intelligence', 'SIEM management', 'Incident response'],
            highlights: ['Expert analysts', 'Real-time alerts', 'Monthly reports']
        },
        {
            icon: <Search size={48} color="var(--secondary)" />,
            title: 'VAPT Services',
            desc: 'Comprehensive Vulnerability Assessment and Penetration Testing to identify and remediate security weaknesses.',
            features: ['Web application testing', 'Network penetration testing', 'API security testing', 'Mobile app testing'],
            highlights: ['OWASP certified', 'Detailed reports', 'Remediation support']
        },
        {
            icon: <AlertTriangle size={48} color="var(--primary)" />,
            title: 'Incident Response',
            desc: 'Expert incident response services to contain, investigate, and recover from security breaches.',
            features: ['Rapid response team', 'Forensics analysis', 'Containment strategies', 'Recovery planning'],
            highlights: ['15-min response SLA', 'Root cause analysis', 'Post-incident review']
        },
        {
            icon: <FileCheck size={48} color="var(--secondary)" />,
            title: 'Compliance Consulting',
            desc: 'Navigate complex regulatory requirements with expert guidance for GDPR, HIPAA, PCI DSS, and more.',
            features: ['Compliance assessments', 'Policy development', 'Audit preparation', 'Continuous monitoring'],
            highlights: ['Multi-framework support', 'Gap analysis', 'Remediation roadmaps']
        },
        {
            icon: <Terminal size={48} color="var(--primary)" />,
            title: 'Security Architecture',
            desc: 'Design and implement robust security architectures tailored to your infrastructure and risk profile.',
            features: ['Architecture reviews', 'Zero trust design', 'Cloud security', 'Network segmentation'],
            highlights: ['Best practices', 'Scalable designs', 'Implementation support']
        },
        {
            icon: <Cloud size={48} color="var(--secondary)" />,
            title: 'Cloud Security Consulting',
            desc: 'Secure your cloud infrastructure with expert consulting for AWS, Azure, GCP, and multi-cloud environments.',
            features: ['Cloud security posture', 'IAM optimization', 'Data protection', 'Compliance automation'],
            highlights: ['Multi-cloud expertise', 'Cost optimization', 'Security automation']
        }
    ];

    const categories = [
        { id: 'need', label: 'By Need' },
        { id: 'consulting', label: 'Consulting Services' },
        { id: 'industry', label: 'By Industry' },
        { id: 'platform', label: 'By Platform' }
    ];

    const getCurrentSolutions = () => {
        switch (activeCategory) {
            case 'need':
                return solutionsByNeed;
            case 'consulting':
                return consultingServices;
            case 'industry':
                return solutionsByIndustry;
            case 'platform':
                return solutionsByPlatform;
            default:
                return solutionsByNeed;
        }
    };

    return (
        <div className="container section-padding">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h1 className="text-h1" style={{ marginBottom: '1rem' }}>
                    Solutions for <span className="text-gradient">Every Need</span>
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                    Comprehensive security and privacy solutions tailored to your specific requirements, industry, and technology stack.
                </p>
            </motion.div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        style={{
                            padding: '0.75rem 2rem',
                            borderRadius: '8px',
                            border: activeCategory === category.id ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                            background: activeCategory === category.id ? 'var(--primary-dim)' : 'var(--bg-card)',
                            color: activeCategory === category.id ? 'var(--primary)' : 'var(--text-main)',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem'
                        }}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Solutions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
                {getCurrentSolutions().map((solution, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'var(--bg-card)',
                            padding: '2.5rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Background Icon */}
                        <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', opacity: 0.05 }}>
                            {React.cloneElement(solution.icon, { size: 120 })}
                        </div>

                        {/* Badge for Platform category */}
                        {solution.badge && (
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                padding: '0.25rem 0.75rem',
                                background: 'var(--primary-dim)',
                                color: 'var(--primary)',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                {solution.badge}
                            </div>
                        )}

                        {/* Icon */}
                        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>{solution.icon}</div>

                        {/* Title & Description */}
                        <h3 className="text-h3" style={{ marginBottom: '1rem', position: 'relative' }}>{solution.title}</h3>
                        <p className="text-body" style={{ color: 'var(--text-muted)', marginBottom: '2rem', position: 'relative' }}>{solution.desc}</p>

                        {/* Features */}
                        <ul style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginBottom: solution.highlights ? '1.5rem' : '0', position: 'relative' }}>
                            {solution.features.map((feature, i) => (
                                <li key={i} className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* Highlights (for Industry category) */}
                        {solution.highlights && (
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', position: 'relative' }}>
                                {solution.highlights.map((highlight, i) => (
                                    <div key={i} style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        margin: '0.25rem',
                                        background: 'rgba(124, 58, 237, 0.1)',
                                        color: 'var(--primary)',
                                        borderRadius: '12px',
                                        fontSize: '0.85rem'
                                    }}>
                                        {highlight}
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* CTA Section */}
            <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--primary-dim) 0%, transparent 100%)', padding: '4rem 2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h2 className="text-h2" style={{ marginBottom: '1.5rem' }}>Need a Custom Solution?</h2>
                <p className="text-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    We understand that every infrastructure is unique. Let's discuss how we can tailor our security platform to your specific requirements.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/contact"><Button variant="primary">Contact Sales</Button></Link>
                    <Link to="/demo"><Button variant="outline">Schedule Demo</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default Services;
