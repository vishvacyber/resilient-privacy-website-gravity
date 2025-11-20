import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
    const sections = [
        {
            icon: <Shield size={24} color="var(--primary)" />,
            title: "Information We Collect",
            content: [
                {
                    subtitle: "Personal Information",
                    text: "When you contact us or use our services, we may collect personal information including your name, email address, phone number, company name, and any other information you provide voluntarily."
                },
                {
                    subtitle: "Usage Data",
                    text: "We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, operating system, referring URLs, and pages visited."
                },
                {
                    subtitle: "Cookies and Tracking",
                    text: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie preferences through your browser settings."
                }
            ]
        },
        {
            icon: <Database size={24} color="var(--primary)" />,
            title: "How We Use Your Information",
            content: [
                {
                    subtitle: "Service Delivery",
                    text: "We use your information to provide, maintain, and improve our API security services, respond to your inquiries, and deliver customer support."
                },
                {
                    subtitle: "Communication",
                    text: "We may use your contact information to send you service updates, security alerts, technical notices, and marketing communications (with your consent)."
                },
                {
                    subtitle: "Analytics and Improvement",
                    text: "We analyze usage patterns to improve our website, services, and user experience. This helps us develop new features and enhance security measures."
                },
                {
                    subtitle: "Legal Compliance",
                    text: "We may process your information to comply with legal obligations, enforce our terms of service, and protect our rights and the rights of others."
                }
            ]
        },
        {
            icon: <Lock size={24} color="var(--primary)" />,
            title: "Data Security",
            content: [
                {
                    subtitle: "Security Measures",
                    text: "We implement industry-standard security measures to protect your personal information, including encryption, secure servers, access controls, and regular security audits."
                },
                {
                    subtitle: "Data Retention",
                    text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. Contact form submissions are retained for up to 2 years."
                },
                {
                    subtitle: "Third-Party Security",
                    text: "We carefully vet all third-party service providers and ensure they maintain appropriate security standards and comply with data protection regulations."
                }
            ]
        },
        {
            icon: <Eye size={24} color="var(--primary)" />,
            title: "Information Sharing",
            content: [
                {
                    subtitle: "Service Providers",
                    text: "We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you, provided they agree to keep information confidential."
                },
                {
                    subtitle: "Legal Requirements",
                    text: "We may disclose your information when required by law, court order, or government regulation, or when we believe disclosure is necessary to protect our rights or comply with legal processes."
                },
                {
                    subtitle: "Business Transfers",
                    text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity, subject to the same privacy protections."
                },
                {
                    subtitle: "No Sale of Data",
                    text: "We do not sell, rent, or trade your personal information to third parties for marketing purposes."
                }
            ]
        },
        {
            icon: <UserCheck size={24} color="var(--primary)" />,
            title: "Your Rights",
            content: [
                {
                    subtitle: "Access and Correction",
                    text: "You have the right to access, update, or correct your personal information at any time by contacting us at privacy@resilientprivacy.com."
                },
                {
                    subtitle: "Data Deletion",
                    text: "You may request deletion of your personal information, subject to legal retention requirements. We will respond to deletion requests within 30 days."
                },
                {
                    subtitle: "Opt-Out",
                    text: "You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly."
                },
                {
                    subtitle: "Cookie Control",
                    text: "You can manage cookie preferences through your browser settings or our cookie consent banner. Note that disabling cookies may affect website functionality."
                },
                {
                    subtitle: "Data Portability",
                    text: "You have the right to request a copy of your personal information in a structured, machine-readable format."
                }
            ]
        },
        {
            icon: <FileText size={24} color="var(--primary)" />,
            title: "Cookies Policy",
            content: [
                {
                    subtitle: "Essential Cookies",
                    text: "These cookies are necessary for the website to function properly and cannot be disabled. They include session cookies and security cookies."
                },
                {
                    subtitle: "Analytics Cookies",
                    text: "We use analytics cookies to understand how visitors interact with our website, helping us improve user experience and content."
                },
                {
                    subtitle: "Preference Cookies",
                    text: "These cookies remember your preferences and settings to provide a personalized experience on future visits."
                },
                {
                    subtitle: "Cookie Duration",
                    text: "Cookie consent is stored for 365 days. You can withdraw consent at any time by clearing your browser cookies or updating your preferences."
                }
            ]
        }
    ];

    return (
        <div className="container section-padding">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '900px', margin: '0 auto' }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        Privacy <span className="text-gradient">Policy</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                        Your privacy is our priority. Learn how we collect, use, and protect your information.
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <strong>Last Updated:</strong> November 19, 2025
                    </p>
                </div>

                {/* Introduction */}
                <div style={{
                    background: 'var(--bg-card)',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    marginBottom: '3rem'
                }}>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                        At <strong style={{ color: 'var(--primary)' }}>Resilient Privacy Inc.</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        By using our website, you consent to the practices described in this policy. If you do not agree with our policies and practices, please do not use our services.
                    </p>
                </div>

                {/* Sections */}
                {sections.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{ marginBottom: '3rem' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                background: 'var(--primary-dim)',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {section.icon}
                            </div>
                            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>
                                {section.title}
                            </h2>
                        </div>

                        <div style={{ paddingLeft: '3.5rem' }}>
                            {section.content.map((item, idx) => (
                                <div key={idx} style={{ marginBottom: '1.5rem' }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        color: 'var(--primary)',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600'
                                    }}>
                                        {item.subtitle}
                                    </h3>
                                    <p style={{
                                        color: 'var(--text-muted)',
                                        lineHeight: '1.8',
                                        fontSize: '0.95rem'
                                    }}>
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* International Users */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        marginBottom: '3rem'
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                        International Users
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                        Our services are operated from the United States. If you are accessing our website from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
                    </p>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        We comply with applicable data protection laws, including GDPR for European users and CCPA for California residents. If you are a resident of the European Economic Area (EEA) or California, you have additional rights as outlined in the "Your Rights" section above.
                    </p>
                </motion.div>

                {/* Children's Privacy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        marginBottom: '3rem'
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                        Children's Privacy
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information from our systems.
                    </p>
                </motion.div>

                {/* Changes to Policy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        padding: '2rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        marginBottom: '3rem'
                    }}
                >
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                        Changes to This Privacy Policy
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                        We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                    </p>
                    <ul style={{ color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '2rem' }}>
                        <li>Posting the updated policy on this page</li>
                        <li>Updating the "Last Updated" date at the top of this policy</li>
                        <li>Sending you an email notification (for significant changes)</li>
                        <li>Displaying a prominent notice on our website</li>
                    </ul>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '1rem' }}>
                        Your continued use of our services after any changes indicates your acceptance of the updated policy.
                    </p>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'linear-gradient(135deg, var(--primary-dim) 0%, var(--bg-card) 100%)',
                        padding: '2.5rem',
                        borderRadius: '12px',
                        border: '1px solid var(--primary)',
                        textAlign: 'center'
                    }}
                >
                    <Mail size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                        Questions About Privacy?
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                        <p style={{ color: 'var(--text-main)' }}>
                            <strong>Email:</strong> <a href="mailto:privacy@resilientprivacy.com" style={{ color: 'var(--primary)' }}>privacy@resilientprivacy.com</a>
                        </p>
                        <p style={{ color: 'var(--text-main)' }}>
                            <strong>Address:</strong> 123 Cyber Blvd, Tech City, TC 90210
                        </p>
                        <p style={{ color: 'var(--text-main)' }}>
                            <strong>Phone:</strong> +1 (555) 123-4567
                        </p>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
                        We will respond to all privacy-related inquiries within 30 days.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
