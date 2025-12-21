// Input Validation Utilities
// Provides validation functions for user inputs

import SECURITY_CONFIG from '../../security.config.js';

/**
 * Validates email address according to RFC 5322 simplified pattern
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email
 */
export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;

    // Check length
    if (email.length > SECURITY_CONFIG.validation.maxEmailLength) return false;

    // RFC 5322 simplified regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return emailRegex.test(email);
};

/**
 * Validates name field
 * @param {string} name - Name to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateName = (name) => {
    if (!name || typeof name !== 'string') {
        return { isValid: false, error: 'Name is required' };
    }

    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
        return { isValid: false, error: 'Name cannot be empty' };
    }

    if (trimmedName.length > SECURITY_CONFIG.validation.maxNameLength) {
        return { isValid: false, error: `Name must be less than ${SECURITY_CONFIG.validation.maxNameLength} characters` };
    }

    // Allow letters, spaces, hyphens, apostrophes, and periods
    const nameRegex = /^[a-zA-Z\s\-'.]+$/;
    if (!nameRegex.test(trimmedName)) {
        return { isValid: false, error: 'Name contains invalid characters' };
    }

    return { isValid: true, error: null };
};

/**
 * Validates message content
 * @param {string} message - Message to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateMessage = (message) => {
    if (!message || typeof message !== 'string') {
        return { isValid: false, error: 'Message is required' };
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length < SECURITY_CONFIG.validation.minMessageLength) {
        return { isValid: false, error: `Message must be at least ${SECURITY_CONFIG.validation.minMessageLength} characters` };
    }

    if (trimmedMessage.length > SECURITY_CONFIG.validation.maxMessageLength) {
        return { isValid: false, error: `Message must be less than ${SECURITY_CONFIG.validation.maxMessageLength} characters` };
    }

    return { isValid: true, error: null };
};

/**
 * Validates phone number (international format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone
 */
export const isValidPhone = (phone) => {
    if (!phone || typeof phone !== 'string') return false;

    // Remove common formatting characters
    const cleanPhone = phone.replace(/[\s\-().]/g, '');

    // Check length
    if (cleanPhone.length > SECURITY_CONFIG.validation.maxPhoneLength) return false;

    // Allow + at start and only digits
    const phoneRegex = /^\+?[0-9]{7,20}$/;

    return phoneRegex.test(cleanPhone);
};

/**
 * Validates URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;

    try {
        const urlObj = new URL(url);
        // Only allow http and https protocols
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
};

/**
 * Checks if URL is from a trusted domain
 * @param {string} url - URL to check
 * @returns {boolean} - True if trusted
 */
export const isTrustedDomain = (url) => {
    if (!isValidUrl(url)) return false;

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        return SECURITY_CONFIG.trustedDomains.some(domain =>
            hostname === domain || hostname.endsWith(`.${domain}`)
        );
    } catch {
        return false;
    }
};

/**
 * Validates form data object
 * @param {object} formData - Form data to validate
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateFormData = (formData) => {
    const errors = {};

    // Validate name
    if (formData.name !== undefined) {
        const nameValidation = validateName(formData.name);
        if (!nameValidation.isValid) {
            errors.name = nameValidation.error;
        }
    }

    // Validate email
    if (formData.email !== undefined) {
        if (!isValidEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
    }

    // Validate message
    if (formData.message !== undefined) {
        const messageValidation = validateMessage(formData.message);
        if (!messageValidation.isValid) {
            errors.message = messageValidation.error;
        }
    }

    // Validate phone if present
    if (formData.phone !== undefined && formData.phone.trim() !== '') {
        if (!isValidPhone(formData.phone)) {
            errors.phone = 'Please enter a valid phone number';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
