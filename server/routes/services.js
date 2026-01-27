import express from 'express';
import { getDb } from '../database.js';

import logger from '../utils/logger.js';

const router = express.Router();

// GET all services (optionally filter by category)
router.get('/', async (req, res) => {
    try {
        const db = getDb();
        const { category } = req.query;

        let query = 'SELECT * FROM services WHERE is_active = 1 ORDER BY display_order ASC, id ASC';
        let params = [];

        if (category) {
            query = 'SELECT * FROM services WHERE category = ? AND is_active = 1 ORDER BY display_order ASC, id ASC';
            params = [category];
        }

        const services = await db.all(query, params);

        // Parse JSON fields
        const parsedServices = services.map(service => ({
            ...service,
            features: JSON.parse(service.features || '[]'),
            highlights: service.highlights ? JSON.parse(service.highlights) : null
        }));

        res.json(parsedServices);
    } catch (error) {
        logger.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// GET single service
router.get('/:id', async (req, res) => {
    try {
        const db = getDb();
        const service = await db.get('SELECT * FROM services WHERE id = ?', [req.params.id]);

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({
            ...service,
            features: JSON.parse(service.features || '[]'),
            highlights: service.highlights ? JSON.parse(service.highlights) : null
        });
    } catch (error) {
        logger.error('Error fetching service:', error);
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});



export default router;
