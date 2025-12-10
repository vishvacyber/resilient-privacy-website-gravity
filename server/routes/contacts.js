import express from 'express';
import { getDb } from '../database.js';
import { authenticate } from '../middleware/auth.js';
import { validateContactForm, checkValidation } from '../middleware/validation.js';
import { logActivity } from '../middleware/activityLogger.js';
import logger from '../utils/logger.js';

const router = express.Router();

// POST submit contact form (Public)
router.post('/', validateContactForm, checkValidation, async (req, res) => {
    const { name, email, company, phone, subject, message } = req.body;
    const db = getDb();

    try {
        const result = await db.run(
            `INSERT INTO contacts (name, email, company, phone, subject, message) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email, company, phone, subject, message]
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

// GET all messages (Admin)
router.get('/', authenticate, logActivity('view', 'contact'), async (req, res) => {
    const db = getDb();
    try {
        const messages = await db.all('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json(messages);
    } catch (error) {
        logger.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// PATCH update contact status (Admin)
router.patch('/:id', authenticate, async (req, res) => {
    const { status } = req.body;

    // Validate status value
    const validStatuses = ['new', 'read', 'replied'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
            error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
    }

    const db = getDb();

    try {
        // Check if contact exists
        const existing = await db.get('SELECT id FROM contacts WHERE id = ?', [req.params.id]);
        if (!existing) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        await db.run(
            'UPDATE contacts SET status = ? WHERE id = ?',
            [status, req.params.id]
        );
        res.json({ message: 'Contact status updated successfully' });
    } catch (error) {
        logger.error('Error updating contact status:', error);
        res.status(500).json({ error: 'Failed to update contact status' });
    }
});

export default router;
