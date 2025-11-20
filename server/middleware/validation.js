import { body, validationResult } from 'express-validator';

// List of personal email domains to block
const PERSONAL_EMAIL_DOMAINS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com',
    'gmx.com', 'inbox.com', 'live.com', 'msn.com', 'me.com'
];

/**
 * Validate that email is a work email (not personal)
 */
export const validateWorkEmail = (fieldName = 'email') => {
    return body(fieldName)
        .isEmail()
        .withMessage('Please provide a valid email address')
        .custom((value) => {
            const domain = value.split('@')[1]?.toLowerCase();
            if (PERSONAL_EMAIL_DOMAINS.includes(domain)) {
                throw new Error('Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not allowed.');
            }
            return true;
        });
};

/**
 * Validate required fields for contact form
 */
export const validateContactForm = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required'),

    validateWorkEmail('email'),

    body('company')
        .trim()
        .notEmpty()
        .withMessage('Company name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Company name must be between 2 and 100 characters'),

    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^[\d\s\-\+\(\)]+$/)
        .withMessage('Please provide a valid phone number'),

    body('subject')
        .trim()
        .notEmpty()
        .withMessage('Subject is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Subject must be between 3 and 200 characters'),

    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10, max: 5000 })
        .withMessage('Message must be between 10 and 5000 characters')
];

/**
 * Middleware to check validation results
 */
export const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};
