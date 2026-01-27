import express from 'express';
import { getDb } from '../database.js';

import logger from '../utils/logger.js';
import { validateContactForm, checkValidation } from '../middleware/validation.js';

const router = express.Router();

import { sanitizeInput } from '../utils/sanitizer.js';

// ... imports ...

// POST submit contact form (Public)
router.post('/', validateContactForm, checkValidation, async (req, res) => {
    const { name, email, company, phone, subject, message } = req.body;
    const db = getDb();

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email); // Should effectively just match regex, but good to be safe
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedPhone = sanitizeInput(phone);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    try {
        const result = await db.run(
            `INSERT INTO contacts (name, email, company, phone, subject, message) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [sanitizedName, sanitizedEmail, sanitizedCompany, sanitizedPhone, sanitizedSubject, sanitizedMessage]
        );
        res.status(201).json({
            message: 'Message sent successfully',
            id: result.lastID
        });
    } catch (error) {
        logger.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
});



export default router;
