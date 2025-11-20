import express from 'express';
import { getDb } from '../database.js';
const router = express.Router();

// Middleware to check auth
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    next();
};

// POST submit contact form (Public)
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;
    const db = getDb();

    try {
        await db.run(
            `INSERT INTO contacts (name, email, subject, message) 
             VALUES (?, ?, ?, ?)`,
            [name, email, subject, message]
        );
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET all messages (Admin)
router.get('/', authenticate, async (req, res) => {
    const db = getDb();
    try {
        const messages = await db.all('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
