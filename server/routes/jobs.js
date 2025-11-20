import express from 'express';
import { getDb } from '../database.js';
const router = express.Router();

// Middleware to check auth (simplified for now)
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    // In real app, verify token here
    next();
};

// GET all jobs (Public)
router.get('/', async (req, res) => {
    const db = getDb();
    try {
        const jobs = await db.all('SELECT * FROM jobs WHERE is_active = 1 ORDER BY created_at DESC');
        // Parse requirements JSON
        const parsedJobs = jobs.map(job => ({
            ...job,
            requirements: JSON.parse(job.requirements || '[]')
        }));
        res.json(parsedJobs);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST create job (Admin)
router.post('/', authenticate, async (req, res) => {
    const { title, department, location, type, description, requirements } = req.body;
    const db = getDb();
    try {
        const result = await db.run(
            `INSERT INTO jobs (title, department, location, type, description, requirements) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, department, location, type, description, JSON.stringify(requirements)]
        );
        res.status(201).json({ id: result.lastID, message: 'Job created' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT update job (Admin)
router.put('/:id', authenticate, async (req, res) => {
    const { title, department, location, type, description, requirements, is_active } = req.body;
    const db = getDb();
    try {
        await db.run(
            `UPDATE jobs SET title = ?, department = ?, location = ?, type = ?, description = ?, requirements = ?, is_active = ? 
             WHERE id = ?`,
            [title, department, location, type, description, JSON.stringify(requirements), is_active, req.params.id]
        );
        res.json({ message: 'Job updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE job (Admin)
router.delete('/:id', authenticate, async (req, res) => {
    const db = getDb();
    try {
        await db.run('DELETE FROM jobs WHERE id = ?', [req.params.id]);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
