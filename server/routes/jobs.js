import express from 'express';
import { getDb } from '../database.js';

import logger from '../utils/logger.js';

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
        logger.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});



export default router;
