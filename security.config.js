// Security Configuration
// Centralized security settings for the application

export const SECURITY_CONFIG = {
    // Content Security Policy directives
    csp: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // unsafe-inline needed for Vite in dev
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: true
    },

    // Trusted external domains
    trustedDomains: [
        'linkedin.com',
        'instagram.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com'
    ],

    // Form validation limits
    validation: {
        maxNameLength: 100,
        maxEmailLength: 254, // RFC 5321
        maxMessageLength: 5000,
        minMessageLength: 10,
        maxPhoneLength: 20
    },

    // Rate limiting (client-side guidance)
    rateLimiting: {
        formSubmissionCooldown: 5000, // 5 seconds between submissions
        maxAttemptsPerHour: 5
    },

    // Cookie settings
    cookies: {
        consentCookieName: 'cookieConsent',
        consentCookieExpiry: 365, // days
        sameSite: 'Strict',
        secure: true, // Always true for modern security
        httpOnly: true // Prevent JS access to cookies
    },

    // Security patterns to detect
    securityPatterns: {
        // Common XSS patterns
        xss: [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi, // event handlers like onclick=
            /<iframe/gi,
            /<object/gi,
            /<embed/gi
        ],
        // SQL injection patterns (for reference, not applicable to client-only app)
        sql: [
            /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
            /(--|\#|\/\*|\*\/)/g,
            /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi
        ]
    }
};

// Generate CSP header string
export const generateCSPHeader = () => {
    const directives = [];

    Object.entries(SECURITY_CONFIG.csp).forEach(([key, value]) => {
        if (key === 'upgradeInsecureRequests' && value) {
            directives.push('upgrade-insecure-requests');
        } else if (Array.isArray(value)) {
            const directiveName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            directives.push(`${directiveName} ${value.join(' ')}`);
        }
    });

    return directives.join('; ');
};

export default SECURITY_CONFIG;
