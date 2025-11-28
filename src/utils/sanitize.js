// Input Sanitization Utilities
// Provides sanitization functions to prevent XSS and injection attacks

import SECURITY_CONFIG from '../../security.config.js';

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
 * Removes script tags and dangerous HTML
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export const removeScriptTags = (str) => {
    if (!str || typeof str !== 'string') return '';

    let sanitized = str;

    // Remove script tags
    {
        let prev;
        do {
            prev = sanitized;
            sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        } while (sanitized !== prev);
    }

    // Remove iframe tags
    {
        let prev;
        do {
            prev = sanitized;
            sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
        } while (sanitized !== prev);
    }

    // Remove object tags
    {
        let prev;
        do {
            prev = sanitized;
            sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
        } while (sanitized !== prev);
    }

    // Remove embed tags
    {
        let prev;
        do {
            prev = sanitized;
            sanitized = sanitized.replace(/<embed\b[^<]*>/gi, '');
        } while (sanitized !== prev);
    }

    // Remove event handlers
    // Repeat replace until no more event handlers remain
    let prevSanitized;
    do {
        prevSanitized = sanitized;
        sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    } while (sanitized !== prevSanitized);

    // Remove javascript: protocol
    sanitized = sanitized.replace(/javascript:/gi, '');

    return sanitized;
};

/**
 * Detects potential XSS patterns
 * @param {string} str - String to check
 * @returns {boolean} - True if XSS pattern detected
 */
export const detectXSS = (str) => {
    if (!str || typeof str !== 'string') return false;

    return SECURITY_CONFIG.securityPatterns.xss.some(pattern => pattern.test(str));
};

/**
 * Detects potential SQL injection patterns
 * @param {string} str - String to check
 * @returns {boolean} - True if SQL injection pattern detected
 */
export const detectSQLInjection = (str) => {
    if (!str || typeof str !== 'string') return false;

    return SECURITY_CONFIG.securityPatterns.sql.some(pattern => pattern.test(str));
};

/**
 * Sanitizes user input by removing dangerous content
 * @param {string} str - String to sanitize
 * @param {object} options - Sanitization options
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

    // Trim whitespace if requested
    if (trim) {
        sanitized = sanitized.trim();
    }

    // Remove script tags and dangerous content
    sanitized = removeScriptTags(sanitized);

    // Encode HTML if not allowed
    if (!allowHTML) {
        sanitized = encodeHTML(sanitized);
    }

    // Truncate to max length if specified
    if (maxLength && sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    return sanitized;
};

/**
 * Sanitizes form data object
 * @param {object} formData - Form data to sanitize
 * @returns {object} - Sanitized form data
 */
export const sanitizeFormData = (formData) => {
    const sanitized = {};

    Object.keys(formData).forEach(key => {
        const value = formData[key];

        if (typeof value === 'string') {
            sanitized[key] = sanitizeInput(value, {
                allowHTML: false,
                trim: true,
                maxLength: SECURITY_CONFIG.validation[`max${key.charAt(0).toUpperCase() + key.slice(1)}Length`]
            });
        } else {
            sanitized[key] = value;
        }
    });

    return sanitized;
};

/**
 * Checks if input is safe (no XSS or SQL injection patterns)
 * @param {string} str - String to check
 * @returns {object} - { isSafe: boolean, threats: array }
 */
export const checkInputSafety = (str) => {
    const threats = [];

    if (detectXSS(str)) {
        threats.push('XSS');
    }

    if (detectSQLInjection(str)) {
        threats.push('SQL Injection');
    }

    return {
        isSafe: threats.length === 0,
        threats
    };
};
