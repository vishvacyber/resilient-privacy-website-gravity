import express from 'express';
import { getDb } from '../database.js';

import logger from '../utils/logger.js';

const router = express.Router();

// GET all documentation (optionally filter by category)
router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const { category } = req.query;

        let query = 'SELECT * FROM documentation WHERE is_active = 1 ORDER BY display_order ASC, id ASC';
        let params = [];

        if (category) {
            query = 'SELECT * FROM documentation WHERE category = ? AND is_active = 1 ORDER BY display_order ASC, id ASC';
            params = [category];
        }

        const docs = await db.all(query, params);
        res.json(docs);
    } catch (error) {
        logger.error('Error fetching documentation:', error);
        res.status(500).json({ error: 'Failed to fetch documentation' });
    }
});

// GET single documentation by slug
router.get('/:slug', async (req, res) => {
    try {
        const db = getDb();
        const doc = await db.get('SELECT * FROM documentation WHERE slug = ?', [req.params.slug]);

        if (!doc) {
            return res.status(404).json({ error: 'Documentation not found' });
        }

        res.json(doc);
    } catch (error) {
        logger.error('Error fetching documentation:', error);
        res.status(500).json({ error: 'Failed to fetch documentation' });
    }
});



export default router;
