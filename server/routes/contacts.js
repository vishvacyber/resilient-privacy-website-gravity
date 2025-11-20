import express from 'express';
import { getDb } from '../database.js';
import { authenticate } from '../middleware/auth.js';
import { validateContactForm, checkValidation } from '../middleware/validation.js';
import { logActivity } from '../middleware/activityLogger.js';

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
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET all messages (Admin)
router.get('/', authenticate, logActivity('view', 'contact'), async (req, res) => {
    const db = getDb();
    try {
        const messages = await db.all('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PATCH update contact status (Admin)
router.patch('/:id', authenticate, async (req, res) => {
    const { status } = req.body;
    const db = getDb();

    try {
        await db.run(
            'UPDATE contacts SET status = ? WHERE id = ?',
            [status, req.params.id]
        );
        res.json({ message: 'Contact status updated' });
    } catch (error) {
        console.error('Error updating contact status:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
