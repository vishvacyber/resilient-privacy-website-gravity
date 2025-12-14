import { SECURITY_CONFIG } from '../../security.config.js';

/**
 * Encodes HTML entities to prevent XSS
 * @param {string} str - String to encode
 * @returns {string} - Encoded string
 */
export const encodeHTML = (str) => {
    if (!str || typeof str !== 'string') return '';

    const htmlEntities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    return str.replace(/[&<>"'/]/g, (char) => htmlEntities[char]);
};

/**
 * Sanitizes input string based on options
 * @param {string} str - Input string
 * @param {Object} options - { allowHTML: boolean, maxLength: number, trim: boolean }
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (str, options = {}) => {
    if (!str || typeof str !== 'string') return '';

    const {
        allowHTML = false,
        maxLength = null,
        trim = true
    } = options;

    let sanitized = str;

    if (trim) {
        sanitized = sanitized.trim();
    }

    if (!allowHTML) {
        // Basic XSS prevention by encoding
        sanitized = encodeHTML(sanitized);
    } else {
        // If HTML is allowed, we'd need a robust library like DOMPurify (JSDOM) or sanitize-html
        // For now, we'll assume no HTML allowed in backend for this project context
        // or just minimal stripping if needed.
        // Given the requirement "no vulnerabilities", default to encoding is safer.
        sanitized = encodeHTML(sanitized);
    }

    if (maxLength && sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    return sanitized;
};

/**
 * Middleware to sanitize request body
 * @param {Array<string>} fields - Fields to sanitize
 */
export const sanitizeMiddleware = (fields = []) => {
    return (req, res, next) => {
        if (!req.body) return next();

        fields.forEach(field => {
            if (req.body[field]) {
                req.body[field] = sanitizeInput(req.body[field], {
                    maxLength: SECURITY_CONFIG.validation[`max${field.charAt(0).toUpperCase() + field.slice(1)}Length`]
                });
            }
        });
        next();
    };
};
