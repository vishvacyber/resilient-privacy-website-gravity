import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Scale, AlertTriangle, Shield, Users, Mail } from 'lucide-react';

const TermsOfService = () => {
    const sections = [
        {
            icon: <FileText size={24} color="var(--primary)" />,
            title: "Acceptance of Terms",
            content: [
                {
                    subtitle: "Agreement to Terms",
                    text: "By accessing or using the services provided by Resilient Privacy Inc. ('Company', 'we', 'us', or 'our'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, you may not access or use our services."
                },
                {
                    subtitle: "Modifications",
                    text: "We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and updating the 'Last Updated' date. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms."
                },
                {
                    subtitle: "Eligibility",
                    text: "You must be at least 18 years old and have the legal capacity to enter into binding contracts to use our services. By using our services, you represent and warrant that you meet these eligibility requirements."
                }
            ]
        },
        {
            icon: <Shield size={24} color="var(--primary)" />,
            title: "Services Description",
            content: [
                {
                    subtitle: "API Security Services",
                    text: "Resilient Privacy Inc. provides API security solutions, threat detection, vulnerability assessments, and related cybersecurity services ('Services'). The specific features and functionalities of our Services are described on our website and in any applicable service agreements."
                },
                {
                    subtitle: "Service Availability",
                    text: "We strive to maintain high availability of our Services but do not guarantee uninterrupted or error-free operation. We reserve the right to modify, suspend, or discontinue any part of our Services at any time, with or without notice."
                },
                {
                    subtitle: "Beta Features",
                    text: "We may offer beta or experimental features that are provided 'as is' without warranties. These features may be modified or discontinued at any time without notice."
                }
            ]
        },
        {
            icon: <Users size={24} color="var(--primary)" />,
            title: "User Accounts and Responsibilities",
            content: [
                {
                    subtitle: "Account Registration",
                    text: "To access certain features of our Services, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete."
                },
                {
                    subtitle: "Account Security",
                    text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to or use of your account."
                },
                {
                    subtitle: "Prohibited Activities",
                    text: "You agree not to: (a) use our Services for any illegal purpose or in violation of any laws; (b) attempt to gain unauthorized access to our systems or networks; (c) interfere with or disrupt the integrity or performance of our Services; (d) reverse engineer, decompile, or disassemble any part of our Services; (e) use our Services to transmit malware, viruses, or harmful code; (f) violate the intellectual property rights of others; or (g) engage in any activity that could harm our reputation or business interests."
                }
            ]
        },
        {
            icon: <Scale size={24} color="var(--primary)" />,
            title: "Intellectual Property Rights",
            content: [
                {
                    subtitle: "Ownership",
                    text: "All content, features, and functionality of our Services, including but not limited to software, text, graphics, logos, icons, images, audio clips, and data compilations, are owned by Resilient Privacy Inc. or our licensors and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws."
                },
                {
                    subtitle: "Limited License",
                    text: "Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use our Services for your internal business purposes. This license does not include any right to: (a) resell or make commercial use of our Services; (b) modify or make derivative works of our Services; (c) download or copy any content except as expressly permitted; or (d) use any data mining, robots, or similar data gathering tools."
                },
                {
                    subtitle: "Trademarks",
                    text: "The Resilient Privacy name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Resilient Privacy Inc. You may not use such marks without our prior written permission."
                },
                {
                    subtitle: "User Content",
                    text: "You retain ownership of any content, data, or materials you submit to our Services ('User Content'). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing our Services to you."
                }
            ]
        },
        {
            icon: <AlertTriangle size={24} color="var(--primary)" />,
            title: "Payment Terms",
            content: [
                {
                    subtitle: "Fees and Billing",
                    text: "Certain features of our Services may require payment of fees. You agree to pay all applicable fees as described on our website or in your service agreement. All fees are non-refundable unless otherwise stated in writing."
                },
                {
                    subtitle: "Automatic Renewal",
                    text: "If you purchase a subscription, it will automatically renew at the end of each billing period unless you cancel before the renewal date. You authorize us to charge your payment method for the renewal fees."
                },
                {
                    subtitle: "Price Changes",
                    text: "We reserve the right to change our fees at any time. We will provide you with reasonable notice of any fee changes, and such changes will take effect at the start of your next billing period."
                },
                {
                    subtitle: "Taxes",
                    text: "All fees are exclusive of applicable taxes, duties, or similar governmental assessments, including sales, use, or value-added taxes. You are responsible for paying all such taxes except for taxes based on our net income."
                }
            ]
        }
    ];

    const additionalSections = [
        {
            title: "Confidentiality",
            content: "Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of using our Services. This obligation survives termination of these Terms for a period of three (3) years."
        },
        {
            title: "Data Protection and Privacy",
            content: "Our collection, use, and disclosure of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Services, you consent to our privacy practices as described in the Privacy Policy."
        },
        {
            title: "Warranties and Disclaimers",
            content: "OUR SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. YOUR USE OF OUR SERVICES IS AT YOUR SOLE RISK."
        },
        {
            title: "Limitation of Liability",
            content: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, RESILIENT PRIVACY INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR USE OR INABILITY TO USE OUR SERVICES; (B) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS AND/OR ANY PERSONAL INFORMATION STORED THEREIN; (C) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR SERVICES; (D) ANY BUGS, VIRUSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH OUR SERVICES BY ANY THIRD PARTY; OR (E) ANY ERRORS OR OMISSIONS IN ANY CONTENT. IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER."
        },
        {
            title: "Indemnification",
            content: "You agree to indemnify, defend, and hold harmless Resilient Privacy Inc., its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from: (a) your use of our Services; (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) your User Content."
        },
        {
            title: "Termination",
            content: "We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use our Services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability."
        },
        {
            title: "Dispute Resolution and Arbitration",
            content: "Any dispute arising out of or relating to these Terms or our Services shall be resolved through binding arbitration in accordance with the Commercial Arbitration Rules of the American Arbitration Association. The arbitration shall be conducted in Tech City, TC, and judgment on the arbitration award may be entered in any court having jurisdiction. You agree to waive any right to a jury trial or to participate in a class action. This arbitration provision does not preclude either party from seeking injunctive relief in court to prevent irreparable harm."
        },
        {
            title: "Governing Law and Jurisdiction",
            content: "These Terms shall be governed by and construed in accordance with the laws of the State of [State], United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in [County], [State], and you hereby consent to personal jurisdiction and venue therein."
        },
        {
            title: "Export Compliance",
            content: "You agree to comply with all applicable export and import control laws and regulations in your use of our Services. You represent that you are not located in a country subject to U.S. government embargo or designated as a 'terrorist supporting' country, and that you are not on any U.S. government list of prohibited or restricted parties."
        },
        {
            title: "Force Majeure",
            content: "We shall not be liable for any failure or delay in performance under these Terms due to causes beyond our reasonable control, including acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials."
        },
        {
            title: "Severability",
            content: "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable."
        },
        {
            title: "Entire Agreement",
            content: "These Terms, together with our Privacy Policy and any other legal notices or agreements published by us on our website, constitute the entire agreement between you and Resilient Privacy Inc. regarding our Services and supersede all prior or contemporaneous communications and proposals, whether oral or written."
        },
        {
            title: "Assignment",
            content: "You may not assign or transfer these Terms or your rights hereunder, in whole or in part, without our prior written consent. We may assign these Terms at any time without notice to you. Any attempted assignment in violation of this section shall be void."
        },
        {
            title: "Waiver",
            content: "No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision."
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
                        Terms of <span className="text-gradient">Service</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                        Please read these terms carefully before using our services.
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
                        These Terms of Service govern your access to and use of the services, website, and applications provided by <strong style={{ color: 'var(--text-main)' }}>Resilient Privacy Inc.</strong> By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                    </p>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        These Terms constitute a legally binding agreement between you and Resilient Privacy Inc. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
                    </p>
                </div>

                {/* Main Sections */}
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

                {/* Additional Sections */}
                {additionalSections.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'var(--bg-card)',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            marginBottom: '2rem'
                        }}
                    >
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
                            {section.title}
                        </h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            {section.content}
                        </p>
                    </motion.div>
                ))}

                {/* Contact Section */}
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
                        Questions About These Terms?
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                        If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                        <p style={{ color: 'var(--text-main)' }}>
                            <strong>Email:</strong> <a href="mailto:legal@resilientprivacy.com" style={{ color: 'var(--primary)' }}>legal@resilientprivacy.com</a>
                        </p>
                        <p style={{ color: 'var(--text-main)' }}>
                            <strong>Address:</strong> 123 Cyber Blvd, Tech City, TC 90210
                        </p>
                        <p style={{ color: 'var(--text-main)' }}>
                            <strong>Phone:</strong> +1 (555) 123-4567
                        </p>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
                        For your convenience, you may also review our <Link to="/privacy-policy" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Privacy Policy</Link>.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default TermsOfService;
