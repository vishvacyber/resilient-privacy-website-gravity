import express from 'express';
import { getDb } from '../database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

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
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// POST create job (Admin)
router.post('/', authenticate, async (req, res) => {
    const { title, department, location, type, description, requirements } = req.body;

    // Validate required fields
    if (!title || !department || !location || !type || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate requirements is an array
    if (requirements && !Array.isArray(requirements)) {
        return res.status(400).json({ error: 'Requirements must be an array' });
    }

    const db = getDb();
    try {
        const result = await db.run(
            `INSERT INTO jobs (title, department, location, type, description, requirements) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, department, location, type, description, JSON.stringify(requirements || [])]
        );
        res.status(201).json({ id: result.lastID, message: 'Job created successfully' });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
});

// PUT update job (Admin)
router.put('/:id', authenticate, async (req, res) => {
    const { title, department, location, type, description, requirements, is_active } = req.body;

    // Validate required fields
    if (!title || !department || !location || !type || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate requirements is an array
    if (requirements && !Array.isArray(requirements)) {
        return res.status(400).json({ error: 'Requirements must be an array' });
    }

    const db = getDb();
    try {
        // Check if job exists
        const existing = await db.get('SELECT id FROM jobs WHERE id = ?', [req.params.id]);
        if (!existing) {
            return res.status(404).json({ error: 'Job not found' });
        }

        await db.run(
            `UPDATE jobs SET title = ?, department = ?, location = ?, type = ?, description = ?, requirements = ?, is_active = ? 
             WHERE id = ?`,
            [title, department, location, type, description, JSON.stringify(requirements || []), is_active ?? 1, req.params.id]
        );
        res.json({ message: 'Job updated successfully' });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Failed to update job' });
    }
});

// DELETE job (Admin)
router.delete('/:id', authenticate, async (req, res) => {
    const db = getDb();
    try {
        // Check if job exists
        const existing = await db.get('SELECT id FROM jobs WHERE id = ?', [req.params.id]);
        if (!existing) {
            return res.status(404).json({ error: 'Job not found' });
        }

        await db.run('DELETE FROM jobs WHERE id = ?', [req.params.id]);
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Failed to delete job' });
    }
});

export default router;
